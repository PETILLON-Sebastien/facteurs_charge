var moment = require('moment');
var _ = require('lodash');
var path = require('path');
var constants = require(path.join('..', '..', 'utils', 'constants.js'));

exports.manage_time_window = function(from, to) {
  var result = {};
  if(!from || !to) {
    result.from = moment().add(-1, 'day');
    result.to = moment();
  } else {
    result.from = moment(from);
    result.to = moment(to);
  }
  return result;
};
exports.manage_time_window_day_before = function(from, to) {
  var result = {};
  if(!from || !to) {
    result.from = moment().add(-2, 'day');
    result.to = moment();
  } else {
    result.from = moment(from).add(-1, 'day');
    result.to = moment(to);
  }
  return result;
};

exports.format_values = function(object) {
  var formatted = {};
  _.forOwn(object, function(value, key) {
    if(key === constants.api_wording.production || key == constants.api_wording.capacity || key == constants.api_wording.load) {
      var number_of_properties = _.filter(_.keys(object), function(key) {
        return key == constants.api_wording.production || key == constants.api_wording.capacity || key == constants.api_wording.load;
      }).length;
      var newObject = {};
      if(key == constants.api_wording.production || key == constants.api_wording.capacity) {
        newObject[constants.api_wording.unit] = constants.units.mega_watt;
      }
      newObject[constants.api_wording.value] = value;
      var used_key = key == constants.api_wording.load
        ? constants.api_wording.load
        : (number_of_properties == 1 ? constants.api_wording.power : key);
      formatted[used_key] = newObject;
    } else {
      formatted[key] = value;
    }
  });
  return formatted;
};
