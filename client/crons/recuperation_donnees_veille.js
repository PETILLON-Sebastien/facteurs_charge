var compute = require('../compute.js');
var moment = require('moment');

var nombre_region = 12;
var nombre_donnees_par_heure = 4;
var nombre_heures = 24 * 7;

function recuperer_donnees() {
    var date_debut = moment().subtract(1, 'day').startOf('day').subtract(1, "minute");
    compute.recuperation_donnes_api_date(nombre_region, nombre_donnees_par_heure, date_debut, function (api_response, nom) {
        try {
            var donnees_calculees = compute.construire_donnees(api_response, nombre_donnees_par_heure, nombre_heures, false);
            compute.sauver(donnees_calculees, "/home/facteus/www/donnees/" + nom);
        } catch (e) {
            console.error(e);
        }
    });
}

recuperer_donnees();
