var fs = require('fs');
var _ = require('lodash');
var Q = require('q');
var path = require('path');
var moment = require('moment');
var constants = require('./constants.js');

var get_string_list_dates = function(start, end) {
  var start_date = moment(start);
  var end_date = moment(end);
  var dates = [start_date.format('YYYY-MM-DD')];
  if(end_date.isBefore(end_date)) {
    return dates;
  }
  while(start_date.isBefore(end_date)) {
    start_date = moment(start_date.add(1, 'day'));
      dates.push(start_date.format('YYYY-MM-DD'));
  }
  if(end_date.isSame(moment(), 'day')) {
    dates.push('current');
  }
  return dates;
};

var customizer = function(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return _.uniqWith(objValue.concat(srcValue), _.isEqual);
  }
};

var compute_consumption_production = function(input_files) {
  var files = _.map(input_files, function(file) { return _.keyBy(file, constants.api_wording.zone_id); });
  return _.values(_.reduce(files, function(aggreg, list) {
    _.forOwn(list, function(value, key) {
      aggreg[key] = _.mergeWith(aggreg[key], value, customizer);
    });
    return aggreg;
  }));
};

var compute_capactity = function(input_files) {
  return _.reduce(input_files, function(result, file) {
    var key = moment(_.get(file, constants.api_wording.datetime)).format('YYYY-MM-DD');
    _.set(result, key, file);
    return result;
  }, {});
};

var compute_exchanges = function(input_files) {
  return _.uniqWith(_.flatten(_.merge(input_files)), _.isEqual);
}

var retrieve_period = function(start, end, data_type) {
  var dates = get_string_list_dates(start, end);
  var global_defered = Q.defer();

  var files_requests = Q.all(_.map(dates, function(date) {
    var file_name = path.resolve(__dirname, '..', 'data', date + '_' + data_type + '.json');
    var defered = Q.defer();
    try {
      fs.readFile(file_name, 'UTF-8', function(err, data) {
        defered.resolve(data);
      });
    } catch (error) {
      defered.resolve();
    }
    return defered.promise;
  }));

  files_requests.then(function(data) {
    var files = _.map(_.reject(data, _.isUndefined), JSON.parse);
    var result;
    if(data_type === constants.consumption || data_type === constants.production) {
      global_defered.resolve(compute_consumption_production(files))
    } else if (data_type === constants.capacity) {
      global_defered.resolve(compute_capactity(files));
    } else {
      global_defered.resolve(compute_exchanges(files));
    }
  });
  return global_defered.promise;
};

exports.retrieve_period = retrieve_period;
