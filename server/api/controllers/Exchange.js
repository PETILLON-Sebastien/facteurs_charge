'use strict';

var utils = require('../utils/writer.js');
var Exchange = require('../service/ExchangeService');

module.exports.get_exchanges = function get_exchanges (req, res, next) {
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Exchange.get_exchanges(from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_zone_exchanges = function get_zone_exchanges (req, res, next) {
  var zoneId = req.swagger.params['zoneId'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Exchange.get_zone_exchanges(zoneId,from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
