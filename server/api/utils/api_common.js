var moment = require('moment');
var _ = require('lodash');
var path = require('path');
var constants = require(path.join('..', '..', 'utils', 'constants.js'));

exports.manage_time_window = function(from, to) {
  var result = {};
  if(!from || !to) {
    result.from = moment();
    result.to = result.from;
  } else {
    result.from = moment(from);
    result.to = moment(to);
  }
  return result;
};

exports.format_values = function(object) {
  var formatted = {};
  _.forOwn(object, function(value, key) {
    var newObject = {};
    newObject[constants.api_wording.unit] = constants.units.mega_watt;
    newObject[constants.api_wording.value] = value;
    formatted[key] = newObject;
  });
  return formatted;
};
