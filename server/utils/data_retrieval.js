var _ = require('lodash');
var moment = require('moment');
var Q = require('q');
var api_provider = require('./api_provider.js');
var format_mapper = require('./format_mapper.js');
var constants = require('./constants.js');

var find_last_valid_set_date = function(data) {
  var last_valid_date;
  _.forOwn(data, function(zone) {
    var snapshots = zone[constants.api_wording.snapshots];
    var datetime = snapshots[snapshots.length - 1][constants.api_wording.datetime];
    last_valid_date = last_valid_date === undefined ? moment(datetime).valueOf() : _.min(last_valid_date, moment(datetime).valueOf());
  });
  return last_valid_date;
};

var drop_invalid_sets = function(data, last_valid_date) {
  _.forOwn(data, function(zone) {
    _.dropRightWhile(zone[constants.api_wording.snapshots], function(snapshot) {
      var snapshots = zone[constants.api_wording.snapshots];
      var datetime = snapshots[snapshots.length - 1][constants.api_wording.datetime];
      moment(datetime).isAfter(last_valid_date);
    });
  });
};

var remove_empty_sets = function(consumption, production) {
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

  var last_valid_date = _.min(find_last_valid_set_date(consumption), find_last_valid_set_date(production));
  drop_invalid_sets(consumption, last_valid_date);
  drop_invalid_sets(production, last_valid_date);
};

var retrieve = function(start, end) {
  var defered = Q.defer();
  api_provider.api_call(start, end)
  .then(function(data) {
    
    if(_.get(data, '[0].records') === undefined || _.get(data, '[1].records') === undefined) {
      console.error(`Retrieving data from ${start} to ${end} returned ${data}; but [0] or [1] is missing record fields...`);
      defered.reject('Missing data');
    } else {
      var records = _.concat(data[0].records, data[1].records);
      var consumption = format_mapper.extract_consumption_snapshot_zones(records);
      var production = format_mapper.extract_production_snapshot_zones(records);
      var exchanges = format_mapper.extract_exchanges(records);
      var capacity = format_mapper.extract_capacity_snapshot_zones(records);

      remove_empty_sets(consumption, production);

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
