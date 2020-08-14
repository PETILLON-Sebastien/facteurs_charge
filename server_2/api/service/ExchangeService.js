'use strict';
var _ = require('lodash');
var Q = require('q');
var path = require('path');
var api_common = require(path.join('..', 'utils', 'api_common.js'));
var constants = require(path.join('..', '..', 'utils', 'constants.js'));
var file_reading = require(path.join('..', '..', 'utils', 'file_reading.js'));


/**
 * Retrieve exchanges
 *
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_exchanges = function(from,to) {
  var time_window = api_common.manage_time_window(from, to);
  return file_reading.retrieve_period(time_window.from, time_window.to, constants.exchanges);
}


/**
 * Retrieve exchanges of the zone
 *
 * zoneId String Zone to retrieve data from
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_zone_exchanges = function(zoneId, from, to) {
    var defered = Q.defer();
    var time_window = api_common.manage_time_window(from, to);
    file_reading.retrieve_period(time_window.from, time_window.to, constants.exchanges).then(function(data) {
      defered.resolve(_.filter(data, function(snapshot) {
        var source_zone = _.get(snapshot, [constants.api_wording.description, constants.api_wording.source_zone]);
        var target_zone = _.get(snapshot, [constants.api_wording.description, constants.api_wording.target_zone]);
        return source_zone == zoneId || target_zone == zoneId;
      }));
    });
    return defered.promise;
}
