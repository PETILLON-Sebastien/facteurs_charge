var _ = require('lodash');
var moment = require('moment');
var Q = require('q');
var api_provider = require('./api_provider.js');
var format_mapper = require('./format_mapper.js');
var constants = require('./constants.js');

var retrieve = function(start, end) {
    var defered = Q.defer();
    api_provider.api_call(start, end)
    .then(function(data) {
        if(_.get(data, '[0].records') === undefined || _.get(data, '[1].records') === undefined) {
            defered.reject('Missing data');
        } else {
            var records = _.concat(data[0].records, data[1].records);
            var consumption = format_mapper.extract_consumption_snapshot_zones(records);
            var production = format_mapper.extract_production_snapshot_zones(records);
            var exchanges = format_mapper.extract_exchanges(records);
            var capacity = format_mapper.extract_capacity_snapshot_zones(records);

            var last_data_date;

            _.forOwn(consumption, function(zone) {
              _.dropRightWhile(zone[constants.api_wording.snapshots], function(snapshot) {
                return snapshot[constants.api_wording.description][constants.api_wording.used] === undefined;
              });
            });
            _.forOwn(production, function(zone) {
              zone[constants.api_wording.snapshots] = _.dropRightWhile(zone[constants.api_wording.snapshots], function(snapshot) {
                return _.reduce(_.keys(snapshot[constants.api_wording.breakdown]), function(result, value, key) {
                  result = result && snapshot[constants.api_wording.breakdown][value][constants.api_wording.production] === undefined;
                  return result;
                }, true);
              });
            });

            _.forOwn(consumption, function(zone) {
              var snapshots = zone[constants.api_wording.snapshots];
              var datetime = snapshots[snapshots.length - 1][constants.api_wording.datetime];
              last_data_date = last_data_date === undefined ? moment(datetime).valueOf() : _.min(last_data_date, moment(datetime).valueOf());
            });
            _.forOwn(production, function(zone) {
              var snapshots = zone[constants.api_wording.snapshots];
              var datetime = snapshots[snapshots.length - 1][constants.api_wording.datetime];
              last_data_date = last_data_date === undefined ? moment(datetime).valueOf() : _.min(last_data_date, moment(datetime).valueOf());
            });

            _.forOwn(consumption, function(zone) {
              _.dropRightWhile(zone[constants.api_wording.snapshots], function(snapshot) {
                var snapshots = zone[constants.api_wording.snapshots];
                var datetime = snapshots[snapshots.length - 1][constants.api_wording.datetime];
                moment(datetime).isAfter(last_data_date);
              });
            });
            _.forOwn(production, function(zone) {
              _.dropRightWhile(zone[constants.api_wording.snapshots], function(snapshot) {
                var snapshots = zone[constants.api_wording.snapshots];
                var datetime = snapshots[snapshots.length - 1][constants.api_wording.datetime];
                moment(datetime).isAfter(last_data_date);
              });
            });

            defered.resolve({
                consumption: consumption,
                production: production,
                capacity: capacity,
                exchanges: exchanges
            });
        }
    })
    .catch(function(error) {
        defered.reject(error);
    });
    return defered.promise;
};

exports.retrieve = retrieve;
