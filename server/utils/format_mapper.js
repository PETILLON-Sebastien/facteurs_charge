var constants = require('../utils/constants.js');
var _ = require('lodash');

/**
 * Get the value of the field from the snapshot
 * @param {Object} snapshot 
 * @param {String} field_name 
 */
var field_getter = function(snapshot, field_name) {
    return _.get(snapshot, constants.opendatareseaux_wording.fields + '.' + field_name, 0);
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
 * Extract an installation from a snapshot
 * @param {Object} installation 
 * @param {Object} snapshot 
 */
var extract_installation = function(installation, snapshot) {
    var extraction = {};
    var production = _.floor(field_getter(snapshot, installation.name));
    var load = _.round(field_getter(snapshot, constants.opendatareseaux_wording.load_prefix + installation.name), 2);
    _.set(extraction, [constants.api_wording.production], production);
    _.set(extraction, [constants.api_wording.load], load);

    // If installation has details and the zone is France
    if(installation.details !== undefined && snapshot[constants.opendatareseaux_wording.fields][constants.opendatareseaux_wording.code_insee_region] === undefined) {
        _.forOwn(installation.details, function(detail) {
            _.set(extraction, [constants.api_wording.details, detail.api_name], extract_installation(detail, snapshot));
        });
    }
    return extraction;
};

/**
 * Extract the production from a snapshot
 * @param {Object} snapshot 
 */
var extract_production_snapshot = function(snapshot) {
    var extraction = {};
    _.forOwn(constants.power_sources, function(installation) {
        _.set(extraction, [constants.api_wording.breakdown, installation.api_name], extract_installation(installation, snapshot));
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
 * Extract exchanges from a single snapshot
 * @param {Object} snapshot 
 */
var extract_exchanges_snapshot = function(snapshot) {
    var exchanges = [];
    var zone_id = snapshot_zone_id_getter(snapshot);
    var target_zone;
    var source_zone;
    _.forOwn(snapshot[constants.opendatareseaux_wording.fields], function(value, name) {
        if(_.startsWith(name, constants.opendatareseaux_wording.import) || _.startsWith(name, constants.opendatareseaux_wording.export)) {
            var zone_name = _.replace(name, _.split(name, '_')[0] + '_', '');
            var field_zone_id = zone_id_getter(zone_name);
            if(_.startsWith(name, constants.opendatareseaux_wording.import)) {
                source_zone = field_zone_id;
                target_zone = zone_id;
            } else {
                source_zone = zone_id;
                target_zone = field_zone_id;
            }
            if(_.isNumber(value)) {
                var saved_value = Math.abs(value);
                var exchange = {};
                _.set(exchange, [constants.api_wording.datetime], field_getter(snapshot, constants.opendatareseaux_wording.date_hour));
                _.set(exchange, [constants.api_wording.description, constants.api_wording.source_zone], source_zone);
                _.set(exchange, [constants.api_wording.description, constants.api_wording.target_zone], target_zone);
                _.set(exchange, [constants.api_wording.description, constants.api_wording.value], saved_value);
                exchanges.push(exchange);
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
exports.extract_exchanges = extract_exchanges;