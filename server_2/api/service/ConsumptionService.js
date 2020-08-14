'use strict';
var _ = require('lodash');
var Q = require('q');
var path = require('path');
var api_common = require(path.join('..', 'utils', 'api_common.js'));
var constants = require(path.join('..', '..', 'utils', 'constants.js'));
var file_reading = require(path.join('..', '..', 'utils', 'file_reading.js'));


function format_description(snapshot) {
    snapshot[constants.api_wording.description] = api_common.format_values(snapshot[constants.api_wording.description]);
    return snapshot;
};

/**
 * Retrieve consumptions
 *
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_consumptions = function(from, to) {
  var defered = Q.defer();
  var time_window = api_common.manage_time_window(from, to);
  file_reading.retrieve_period(time_window.from, time_window.to, constants.consumption).then(function(data) {
    _.forOwn(data, function(value) {
      value[constants.api_wording.snapshots] = _.map(value[constants.api_wording.snapshots], format_description);
    });
    defered.resolve(data);
  });
  return defered.promise;
}

/**
 * Retrieve consumptions for the zone
 *
 * zoneId String Zone to retrieve data from
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_zone_consumptions = function(zoneId, from, to) {
  var defered = Q.defer();
  var time_window = api_common.manage_time_window(from, to);
  file_reading.retrieve_period(time_window.from, time_window.to, constants.consumption).then(function(data) {
    var result = _.get(_.find(data, constants.api_wording.zoneId, zoneId), constants.api_wording.snapshots);
    result = _.map(result, format_description);
    defered.resolve(result);
  });
  return defered.promise;
}
