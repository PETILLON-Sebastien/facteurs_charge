var _ = require('lodash');
var constants = require('../utils/constants.js');
var api_provider = require('../utils/api_provider.js');
var format_mapper = require('../utils/format_mapper.js');

api_provider.api_call('2020-06-01T12:00:00', '2020-06-01T12:00:00')
    .then(function(data) {
        if(_.get(data, '[0].records') === undefined || _.get(data, '[1].records') === undefined) {
            console.error('ERROR');
            console.error(error);
        } else {
            var records = _.concat(data[0].records, data[1].records);
            var consumption = format_mapper.extract_consumption_snapshot_zones(records);
            var exchanges = format_mapper.extract_exchanges(records);
        }
    })
    .catch(function(error) {
        console.error('ERROR');
        console.error(error);
    });