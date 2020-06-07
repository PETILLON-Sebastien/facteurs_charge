var _ = require('lodash');
var Q = require('q');
var api_provider = require('./api_provider.js');
var format_mapper = require('./format_mapper.js');

var retrieve = function(start, end) {
    var defered = Q.defer();
    api_provider.api_call(start, end)
    .then(function(data) {
        if(_.get(data, '[0].records') === undefined || _.get(data, '[1].records') === undefined) {
            defered.reject("Missing data");
            console.log(data)
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

exports.retrieve = retrieve;