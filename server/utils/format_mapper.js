var constants = require('../utils/constants.js');
var _ = require('lodash');

/**
 * Get the value of the field from the snapshot
 * @param {Object} snapshot
 * @param {String} field_name
 */
var field_getter = function(snapshot, field_name) {
    return _.get(snapshot, constants.opendatareseaux_wording.fields + '.' + field_name);
};

/**
 * Compute the zone id from the snapshot's information
 * @param {Object} snapshot
 */
var snapshot_zone_id_getter = function(snapshot) {
    var country = constants.zones[0].country;
    var code = _.get(snapshot, constants.opendatareseaux_wording.fields + '.' + constants.opendatareseaux_wording.code_insee_region);
    var zone_id = country;
    if(code !== undefined) {
        zone_id += '-' + code;
    }
    return zone_id;
};

/**
 * Compute the zone id from the zone's name
 * @param {String} name
 */
var zone_id_getter = function(name) {
    var zone_id;
    var zone = _.find(constants.zones, _.matchesProperty('name', name));
    zone_id = zone.country;
    if(zone.code_insee_region !== null) {
        zone_id += '-' + zone.code_insee_region;
    }
    return zone_id;
};

/**
 * Extract a single consumption snapshot
 * @param {Object} snapshot
 */
var extract_consumption_snapshot = function(snapshot) {
    var consumption = {};
    _.set(consumption, [constants.api_wording.datetime], field_getter(snapshot, constants.opendatareseaux_wording.date_hour));
    _.set(consumption, [constants.api_wording.description, constants.api_wording.used], field_getter(snapshot, constants.opendatareseaux_wording.consumption));
    _.set(consumption, [constants.api_wording.description, constants.api_wording.step_storage], Math.abs(field_getter(snapshot, constants.opendatareseaux_wording.step_storage)));
    return consumption;
};

/**
 * Extracts all the consumption records by zone
 * @param {Array[Object]} records
 */
var extract_consumption_snapshot_zones = function(records) {
    var records_zones = _.values(_.reduce(records, function(result, snapshot) {
        var zone_id = snapshot_zone_id_getter(snapshot);
        if(!result[zone_id]) {
            _.set(result, [zone_id, constants.api_wording.zone_id], zone_id);
            _.set(result, [zone_id, constants.api_wording.snapshots], []);
        }
        var snapshot_extraction = extract_consumption_snapshot(snapshot);
        result[zone_id][constants.api_wording.snapshots] = result[zone_id][constants.api_wording.snapshots].concat(snapshot_extraction);
        return result;
    }, {}));
    return records_zones;
};

/**
 * Extract an installation production from a snapshot
 * @param {Object} installation
 * @param {Object} snapshot
 */
var extract_installation_production = function(installation, snapshot) {
    var extraction = {};
    var value = field_getter(snapshot, installation.name);
    var production = value === undefined ? undefined : _.floor(value);

    // If installation has details and the zone is France
    if(installation.details !== undefined && snapshot[constants.opendatareseaux_wording.fields][constants.opendatareseaux_wording.code_insee_region] === undefined) {
        var recompute_sum = production === 0;
        _.forOwn(installation.details, function(detail) {
            _.set(extraction, [constants.api_wording.details, detail.api_name], extract_installation_production(detail, snapshot));
            // Compute fossil data as the national API does not serve it anymore
            if(recompute_sum) {
              production += field_getter(snapshot, detail.name);
            }
        });
    }
    _.set(extraction, [constants.api_wording.production], production);
    return extraction;
};

/**
 * Extract the production from a snapshot
 * @param {Object} snapshot
 */
var extract_production_snapshot = function(snapshot) {
    var extraction = {};
    _.forOwn(constants.power_sources, function(installation) {
        _.set(extraction, [constants.api_wording.breakdown, installation.api_name], extract_installation_production(installation, snapshot));
    });
    _.set(extraction, [constants.api_wording.datetime], field_getter(snapshot, constants.opendatareseaux_wording.date_hour));
    return extraction;
};

/**
 * Extract all the production from the records
 * @param {Array[Object]} records
 */
var extract_production_snapshot_zones = function(records) {
    var records_zones = _.values(_.reduce(records, function(result, snapshot) {
        var zone_id = snapshot_zone_id_getter(snapshot);
        if(!result[zone_id]) {
            _.set(result, [zone_id, constants.api_wording.zone_id], zone_id);
            _.set(result, [zone_id, constants.api_wording.snapshots], []);
        }
        var snapshot_extraction = extract_production_snapshot(snapshot);
        result[zone_id][constants.api_wording.snapshots] = result[zone_id][constants.api_wording.snapshots].concat(snapshot_extraction);
        return result;
    }, {}));
    return records_zones;
};

/**
 * Keep the higher estimation of capacity of the installation
 * @param {Object} capacity1
 * @param {Object} capacity2
 */
var merge_installation_capacity = function(capacity1, capacity2) {
    var result = {};
    result[constants.api_wording.capacity] = _.max([capacity1[constants.api_wording.capacity], capacity2[constants.api_wording.capacity], 0]);
    if(capacity1[constants.api_wording.details] !== undefined) {
        _.forOwn(capacity1[constants.api_wording.details], function(value, key) {
            var c1 = capacity1[constants.api_wording.details][key];
            var c2 = capacity2[constants.api_wording.details][key];
            _.set(result, [constants.api_wording.details, key], merge_installation_capacity(c1, c2));
        });
    }
    return result;
};

/**
 * Keep the higher estimation of capacity
 * @param {Object} capacity1
 * @param {Object} capacity2
 */
var merge_capacity = function(capacity1, capacity2) {
    if(capacity1 === undefined) {
        return capacity2;
    }
    var capacity = {};
    _.set(capacity, [constants.api_wording.breakdown], {});
    _.forOwn(capacity1[constants.api_wording.breakdown], function(value, key) {
        var c1 = capacity1[constants.api_wording.breakdown][key];
        var c2 = capacity2[constants.api_wording.breakdown][key];
        _.set(capacity, [constants.api_wording.breakdown, key], merge_installation_capacity(c1, c2));
    });
    return capacity;
};


/**
 * Extract an installation capacity from a snapshot
 * @param {Object} installation
 * @param {Object} snapshot
 */
var extract_installation_capacity = function(installation, snapshot) {
    var extraction = {};
    var value = field_getter(snapshot, installation.name);
    var production = value === undefined ? undefined : _.floor(value);
    var load = field_getter(snapshot, constants.opendatareseaux_wording.load_prefix + installation.name);
    var capacity = _.round(production / load * 100, 2);
    _.set(extraction, [constants.api_wording.capacity], capacity);

    // If installation has details and the zone is France
    if(installation.details !== undefined && snapshot[constants.opendatareseaux_wording.fields][constants.opendatareseaux_wording.code_insee_region] === undefined) {
        var sum = 0;
        _.forOwn(installation.details, function(detail) {
            _.set(extraction, [constants.api_wording.details, detail.api_name], extract_installation_capacity(detail, snapshot));
        });
    }
    return extraction;
};

/**
 * Extract the capacity from a snapshot
 * @param {Object} snapshot
 */
var extract_capacity_snapshot = function(snapshot) {
    var extraction = {};
    _.forOwn(constants.power_sources, function(installation) {
        _.set(extraction, [constants.api_wording.breakdown, installation.api_name], extract_installation_capacity(installation, snapshot));
    });
    return extraction;
}

/**
 * Extract the capacity from the records
 * @param {Array[Object]} records
 */
var extract_capacity_snapshot_zones = function(records) {
    var records_zones = _.reduce(records, function(result, snapshot) {
        var zone_id = snapshot_zone_id_getter(snapshot);
        _.set(result, [zone_id], merge_capacity(result[zone_id], extract_capacity_snapshot(snapshot)));
        return result;
    }, {});
    _.set(records_zones, constants.api_wording.datetime, field_getter(records[records.length - 1], constants.opendatareseaux_wording.date_hour));
    return records_zones;
}

/**
 * Extract exchanges from a single snapshot
 * @param {Object} snapshot
 */
var extract_exchanges_snapshot = function(snapshot) {
    var exchanges = [];
    var zone_id = snapshot_zone_id_getter(snapshot);
    _.forOwn(snapshot[constants.opendatareseaux_wording.fields], function(value, name) {
        if(_.startsWith(name, constants.opendatareseaux_wording.flow)) {
            var zones = _.split(name, constants.opendatareseaux_wording.to);
            zones[0] = _.replace(zones[0], constants.opendatareseaux_wording.flow, '');
            var zone_source_id = zone_id_getter(zones[0]);
            // Exclude auto-exchanges
            if(!_.includes(zones[1], zones[0]) && !_.includes(zones[0], zones[1])) {
                var zone_target_id = zone_id_getter(zones[1]);
                if(_.isNumber(value)) {
                    var saved_value = Math.abs(value);
                    var exchange = {};
                    _.set(exchange, [constants.api_wording.datetime], field_getter(snapshot, constants.opendatareseaux_wording.date_hour));
                    _.set(exchange, [constants.api_wording.description, constants.api_wording.source_zone], zone_source_id);
                    _.set(exchange, [constants.api_wording.description, constants.api_wording.target_zone], zone_target_id);
                    _.set(exchange, [constants.api_wording.description, constants.api_wording.value], saved_value);
                    exchanges.push(exchange);
                }
            }
        }
    });
    return exchanges;
};

/**
 * Extract all the exchanges from the records
 * @param {Array[Object]} records
 */
var extract_exchanges = function(records) {
    return _.flatten(_.map(records, extract_exchanges_snapshot));
};

exports.extract_consumption_snapshot_zones = extract_consumption_snapshot_zones;
exports.extract_production_snapshot_zones = extract_production_snapshot_zones;
exports.extract_capacity_snapshot_zones = extract_capacity_snapshot_zones;
exports.extract_exchanges = extract_exchanges;
