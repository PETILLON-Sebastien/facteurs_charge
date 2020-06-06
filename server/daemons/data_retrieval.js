var _ = require('lodash');
var Q = require('q');
const fs = require('fs');
var moment = require('moment');
var api_provider = require('../utils/api_provider.js');
var format_mapper = require('../utils/format_mapper.js');

var retrieve = function(start, end) {
    var defered = Q.defer();
    api_provider.api_call(start, end)
    .then(function(data) {
        if(_.get(data, '[0].records') === undefined || _.get(data, '[1].records') === undefined) {
            defered.reject("Missing data");
        } else {
            var records = _.concat(data[0].records, data[1].records);
            var consumption = format_mapper.extract_consumption_snapshot_zones(records);
            var production = format_mapper.extract_production_snapshot_zones(records);
            var exchanges = format_mapper.extract_exchanges(records);
            defered.resolve({
                consumption: consumption,
                production: production,
                exchanges: exchanges
            });
        }
    })
    .catch(function(error) {
        defered.reject(error);
    });
    return defered.promise;
};

var store_day_data = function(data, date) {
    var date_formatted = moment(date).format('YYYY-MM-DD');
    _.forOwn(data, function(value, key) {
        var path = __dirname + '\\..\\data\\';
        fs.writeFile(path + date_formatted + '_' + key + '.json', JSON.stringify(value), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(key + " data saved for " + date_formatted);
        });
    });
};

retrieve('2020-06-01T00:00:00', '2020-06-01T23:45:00')
    .then(function(data) {
        store_day_data(data, '2020-06-01');
    });