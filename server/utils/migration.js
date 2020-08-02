const fs = require('fs');
var moment = require('moment');
var _ = require('lodash');
var path = require('path');
var constants = require('./constants.js');

var mapping = {
  thermique : _.find(constants.power_sources, {name: 'thermique'}).api_name,
  nucleaire : _.find(constants.power_sources, {name: 'nucleaire'}).api_name,
  solaire : _.find(constants.power_sources, {name: 'solaire'}).api_name,
  eolien : _.find(constants.power_sources, {name: 'eolien'}).api_name,
  hydraulique : _.find(constants.power_sources, {name: 'hydraulique'}).api_name,
  bioenergies : _.find(constants.power_sources, {name: 'bioenergies'}).api_name,
}

var migrate_capacity = function(date) {
  var file_name = path.join(__dirname, '..', '..', 'donnees', 'donnees_' + moment(date).format('YYYY-MM-DD') + '.json');
  fs.readFile(file_name, 'UTF-8', function(err, data) {
    var data = JSON.parse(data);
    var capacities_to_store = {};
    _.forEach(constants.zones, function(zone) {
      if(zone.country === 'FR') {
        var code_insee_region = zone.code_insee_region || 0;
        var output_code = zone.country + ((code_insee_region !== 0) ? ('-' + code_insee_region) : '');
        _.forEach(mapping, function(value, key) {
          _.set(capacities_to_store, [output_code, constants.api_wording.breakdown, value, constants.api_wording.capacity], data[code_insee_region].capacites[key]);
        });
      }
    });
    var output_file = path.join(__dirname, '..', 'data', moment(date).format('YYYY-MM-DD') + '_' + constants.api_wording.capacity + '.json');
    fs.writeFile(output_file , JSON.stringify(capacities_to_store), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(output_file + ' file saved');
    });
  });
};


var migrate_consumption_production = function(date) {
  var file_name = path.join(__dirname, '..', '..', 'donnees', 'donnees_' + moment(date).format('YYYY-MM-DD') + '.json');
  fs.readFile(file_name, 'UTF-8', function(err, data) {
    var data = JSON.parse(data);
    var consumption_to_store = [];
    var production_to_store = [];
    _.forEach(constants.zones, function(zone) {
      if(zone.country === 'FR') {
        var code_insee_region = zone.code_insee_region || 0;
        var output_code = zone.country + ((code_insee_region !== 0) ? ('-' + code_insee_region) : '');
        var evolutions = data[code_insee_region]['evolution'];

        var consumptionZoneObject = {};
        _.set(consumptionZoneObject, [constants.api_wording.zone_id], output_code);
        _.set(consumptionZoneObject, [constants.api_wording.snapshots], []);
        consumption_to_store.push(consumptionZoneObject);

        var productionZoneObject = {};
        _.set(productionZoneObject, [constants.api_wording.zone_id], output_code);
        _.set(productionZoneObject, [constants.api_wording.snapshots], []);
        production_to_store.push(productionZoneObject);

        _.forEach(evolutions, function(evolution) {
          var find_object = {};
          _.set(find_object, [constants.api_wording.zone_id], output_code);

          var current_consumption_zone = _.find(consumption_to_store, find_object);
          var consumption_snapshot = {};
          _.set(consumption_snapshot, [constants.api_wording.datetime], evolution.date_heure);
          _.set(consumption_snapshot, [constants.api_wording.description, constants.api_wording.step_storage], -evolution.pompage);
          _.set(consumption_snapshot, [constants.api_wording.description, constants.api_wording.used], evolution.consommation);
          current_consumption_zone[constants.api_wording.snapshots].push(consumption_snapshot);

          var current_production_zone = _.find(production_to_store, find_object);
          var production_snapshot = {};
          _.set(production_snapshot, [constants.api_wording.datetime], evolution.date_heure);
          _.forEach(mapping, function(value, key) {
            _.set(production_snapshot, [constants.api_wording.breakdown, value, constants.production], evolution[key]);

          });
          current_production_zone[constants.api_wording.snapshots].push(production_snapshot);
        });
      }
    });

    var consumption_output_file = path.join(__dirname, '..', 'data', moment(date).format('YYYY-MM-DD') + '_' + constants.consumption + '.json');
    fs.writeFile(consumption_output_file , JSON.stringify(consumption_to_store), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(consumption_output_file + ' file saved');
    });
    var production_output_file = path.join(__dirname, '..', 'data', moment(date).format('YYYY-MM-DD') + '_' + constants.production + '.json');
    fs.writeFile(production_output_file , JSON.stringify(production_to_store), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(production_output_file + ' file saved');
    });
  });
};

var day = moment(process.env.DAY)
if(day.isValid()) {
  migrate_consumption_production(day);
  migrate_capacity(day);
}
