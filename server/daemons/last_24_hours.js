var fs = require('fs');
var moment = require('moment');
var _ = require('lodash');
var data_retrieval = require('../utils/data_retrieval.js');

const INTERVAL = 5*60*1000;

var update = function() {
    var start = moment().add(-1, 'days').format('YYYY-MM-DD[T]HH:mm:ss');
    var end = moment().format('YYYY-MM-DD[T]HH:mm:ss');
    var current = moment().format('YYYY-MM-DD');
    data_retrieval.retrieve(start, end).then(function(data) {
        _.forOwn(data, function(value, key) {
            var path = __dirname + '\\..\\data\\';
            fs.writeFile(path + current + '_' + key + '.json', JSON.stringify(value), function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log(key + " data saved for " + current);
            });
        });
        setTimeout(update, INTERVAL);
    }).catch(function(error) {
        console.log('Could not store data');
        console.log(error);
    });
}

update();