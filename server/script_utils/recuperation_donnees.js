var compute = require('../compute.js');
var moment = require('moment');

var nombre_region = 12;
var nombre_donnees_par_heure = 4;
var nombre_heures = 24 * 7;

function recuperer_donnees() {
    var date_debut = moment("2020-03-13");
    date_debut.subtract(1, "minute");
    var date_fin = moment("2020-03-20");

    while(date_debut.isBefore(date_fin)) {        
        compute.recuperation_donnes_api_date(nombre_region, nombre_donnees_par_heure, date_debut, function (api_response, nom) {
            try {
                var donnees_calculees = compute.construire_donnees(api_response, nombre_donnees_par_heure, nombre_heures, false);
                compute.sauver(donnees_calculees, "../donnees/" + nom);
            } catch (e) {
                console.error(e);
            }
        });
        date_debut = date_debut.add(1, "day");
    }

}

recuperer_donnees();