var constants = require('../utils/constants.js');
var https = require('https');
var url = require('url');
var moment = require('moment');
var _ = require('lodash');
var Q = require('q');

const ECO2MIX_API = {
    hostname: 'opendata.reseaux-energies.fr',
    pathname: 'api/records/1.0/search/',
    protocol: 'https'
};
const ECO2MIX_REGIONAL_OPTIONS = {
    dataset: 'eco2mix-regional-tr',
    facet: 'nature',
    'refine.nature': 'Données temps réel',
    sort: '-' + constants.api_wording.date_hour,
    timezone: 'Europe/Paris'
};
const ECO2MIX_NATIONAL_OPTIONS = {
    dataset: 'eco2mix-national-tr',
    facet: 'nature',
    'refine.nature': 'Données temps réel',
    sort: '-' + constants.api_wording.date_hour,
    timezone: 'Europe/Paris'
};

var construct_regional_api_call = function(from_date, to_date) {
    var defered = Q.defer();

    var from = moment(from_date);
    var to = moment(to_date);
    var from_format = from.format('YYYY-MM-DDTHH:mm');
    var to_format = to.format('YYYY-MM-DDTHH:mm');
    var duration = moment.duration(to.diff(from));
    
    var options = _.clone(ECO2MIX_API);
    options.query = _.clone(ECO2MIX_REGIONAL_OPTIONS);
    options.query.q = constants.api_wording.date_hour + ' >= ' + from_format
        + ' AND ' + constants.api_wording.date_hour + ' <= ' + to_format;
    options.query.rows = constants.french_regions_count * constants.data_per_hour * duration.as("hours");

    const requestUrl = url.parse(url.format(options));
    const req = https.get({
        hostname: requestUrl.hostname,
        path: requestUrl.path,
    }, (res) => {
        var body = "";
        res.on('data', function(d) {
            body += d;
        });
        res.on('end', function() {
            var parsed = JSON.parse(body);
            defered.resolve(parsed);
        })
    }, (error) => {
        defered.reject(error);
    });

    return defered.promise;
}

construct_regional_api_call('2020-05-01', '2020-05-02').then(function(data) {console.log(data)});