const fs = require('fs');
var moment = require('moment');
var _ = require('lodash');
var path = require('path');
var data_retrieval = require('../utils/data_retrieval.js');

var store_day_data = function(date) {
    var start = moment(date).startOf('day').format('YYYY-MM-DD[T]HH:mm:ss');
    var end = moment(date).endOf('day').format('YYYY-MM-DD[T]HH:mm:ss');
    var date_formatted = moment(date).format('YYYY-MM-DD');
    data_retrieval.retrieve(start, end).then(function(data) {
        _.forOwn(data, function(value, key) {
            var pathToFile = path.resolve(__dirname, '..', 'data', current + '_' + key + '.json');
            fs.writeFile(pathToFile, JSON.stringify(value), function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log(key + " data saved for " + date_formatted);
            });
        });
    }).catch(function(error) {
        console.log('Could not store data');
        console.log(error);
    });
};

store_day_data(moment().subtract(1, 'day'));
