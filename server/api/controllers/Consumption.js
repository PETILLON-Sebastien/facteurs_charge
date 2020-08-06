'use strict';

var utils = require('../utils/writer.js');
var Consumption = require('../service/ConsumptionService');

module.exports.get_consumptions = function get_consumptions (req, res, next) {
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Consumption.get_consumptions(from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_zone_consumptions = function get_zone_consumptions (req, res, next) {
  var zoneId = req.swagger.params['zoneId'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Consumption.get_zone_consumptions(zoneId,from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
