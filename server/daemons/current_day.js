var fs = require('fs');
var moment = require('moment');
var _ = require('lodash');
var path = require('path');
var data_retrieval = require('../utils/data_retrieval.js');

var update = function() {
    var start = moment().startOf('day').format('YYYY-MM-DD[T]HH:mm:ss');
    var end = moment().format('YYYY-MM-DD[T]HH:mm:ss');
    var current = moment().format('YYYY-MM-DD');
    data_retrieval.retrieve(start, end).then(function(data) {
        _.forOwn(data, function(value, key) {
            var pathToFile = path.resolve(__dirname, '..', 'data', 'current_' + key + '.json');
            fs.writeFile(pathToFile , JSON.stringify(value), function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log('current ' + key + ' data saved at ' + moment().format('YYYY-MM-DD[T]HH:mm:ss'));
            });
        });
    }).catch(function(error) {
        console.log('Could not store data');
        console.log(error);
    });
}

update();
