var url = require('url');
var https = require('https');
var _ = require('lodash');
var moment = require('moment');
const fs = require('fs');

const API_RESEAUX_ENERGIE_HOST = "opendata.reseaux-energies.fr";
const API_RESEAUX_ENERGIE_PATH = 'api/records/1.0/search/';
const sources_energie = ['thermique', 'nucleaire', 'solaire', 'eolien', 'hydraulique', 'bioenergies'];
const autres_donnees = ['ech_physiques', 'consommation', 'pompage'];
const regions_keys = ['0', '11', '24', '27', '28', '32', '44', '52', '53', '75', '76', '84', '93'];

var appel_necessaire = function(dernier_appel, periode_rafraichissement) {
    return dernier_appel === undefined || dernier_appel.isBefore(moment().subtract(5, 'minutes'));
};

var recuperation_donnes_api_date = function(nombre_region, nombre_donnees_par_heure, date_debut, function_success) {
    var date_fin = moment(date_debut).add(1, "day");
    var formatte_min = date_debut.format('YYYY-MM-DDTHH:mm');
    var formatte_max = date_fin.format('YYYY-MM-DDTHH:mm');
    var duree = moment.duration(date_fin.diff(date_debut));
    var rows = nombre_region * nombre_donnees_par_heure * duree.as("hours");
    
    const requestUrl = url.parse(url.format({
        protocol: 'https',
        hostname: API_RESEAUX_ENERGIE_HOST,
        pathname: API_RESEAUX_ENERGIE_PATH,
        query: {
            'dataset': 'eco2mix-regional-tr',
            'facet': 'nature',
            'refine.nature': "Données temps réel",
            'sort': 'date_heure',
            'q': 'date_heure >= ' + formatte_min + ' AND date_heure <= ' + formatte_max,
            'timezone': 'Europe/Paris',
            'rows': rows
        }
    }));

    var nom = "donnees_" + moment(date_debut).add(1, "minute").format("YYYY-MM-DD");
    nom = nom.replace(/:/g, "-");
    
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
            if (_.isFunction(function_success)) {
                function_success(parsed, nom);
            }
        })
    });
}

var recuperation_donnes_api = function(nombre_region, nombre_donnees_par_heure, nombre_heures, function_success) {

    var date_max = moment();
    var date_min = moment(date_max).subtract(nombre_heures, 'hours');
    var formatte_max = date_max.format('YYYY-MM-DDTHH:mm');
    var formatte_min = date_min.format('YYYY-MM-DDTHH:mm');

    const requestUrl = url.parse(url.format({
        protocol: 'https',
        hostname: API_RESEAUX_ENERGIE_HOST,
        pathname: API_RESEAUX_ENERGIE_PATH,
        query: {
            'dataset': 'eco2mix-regional-tr',
            'facet': 'nature',
            'refine.nature': "Données temps réel",
            'sort': 'date_heure',
            'q': 'date_heure >= ' + formatte_min + ' AND date_heure <= ' + formatte_max,
            'timezone': 'Europe/Paris',
            'rows': nombre_region * nombre_donnees_par_heure * nombre_heures
        }
    }));
    
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
            if (_.isFunction(function_success)) {
                function_success(parsed);
            }
        })
    });
};

var get_init_data = function() {
    var donnees = {};
    _.forEach(regions_keys, function(key) {
        donnees[key] = {
            'capacites': {},
            'evolution': []
        }
    });
    return donnees;
}

var calculs_regionaux = function(donnees, api_response, nombre_donnees_par_heure, nombre_heures, verifier_taille_donnees) {
    // Copie et calcul des données pour chaque enregistrement
    _.forEach(_.reverse(api_response.records), function(record) {
        var ligne_donnee = record.fields;
        var nouvelle_donnee = {
            date_heure: ligne_donnee.date_heure,
            libelle_region: ligne_donnee.libelle_region
        };
        var donnees_region = donnees[ligne_donnee['code_insee_region']];

        _.forEach(sources_energie, function(source_energie) {
            var cle_tch = 'tch_' + source_energie;
            
            if(_.get(ligne_donnee, source_energie) !== undefined) {
                nouvelle_donnee[source_energie] = parseFloat(ligne_donnee[source_energie]);
            }
            if(_.get(ligne_donnee, cle_tch) !== undefined) {
                nouvelle_donnee[cle_tch] = parseFloat(ligne_donnee[cle_tch]);
            }
            var source_energie_non_calculee = _.get(donnees_region.capacites, source_energie) === undefined;
            var source_energie_calculable = _.get(nouvelle_donnee, source_energie) !== undefined && _.get(nouvelle_donnee, cle_tch) > 0;
            if (source_energie_non_calculee && source_energie_calculable) {
                var capacite = nouvelle_donnee[source_energie] / nouvelle_donnee[cle_tch] * 100;
                donnees_region.capacites[source_energie] = capacite;
            }
        });

        _.forEach(autres_donnees, function(autre_donnee) {
            if (_.get(ligne_donnee, autre_donnee) !== undefined) {
                nouvelle_donnee[autre_donnee] = parseFloat(ligne_donnee[autre_donnee]);
            }
        });

        donnees_region.evolution.push(nouvelle_donnee);
    });
    
    // Calcul du plus petit nombre de données pour une région
    var nombre_resultats_min = nombre_donnees_par_heure * nombre_heures;
    _.forEach(donnees, function(ligne, key) {
        if (key != 0) {
            var nombre_resultats = ligne.evolution.length;
            if (nombre_resultats < nombre_resultats_min) {
                nombre_resultats_min = nombre_resultats;
            } 
        }
    });

    if(verifier_taille_donnees && nombre_resultats_min < nombre_donnees_par_heure * nombre_heures / 4) {
        throw "Trop peu de données en retour";
    }

    // Conservation du même nombre de données pour chacune des régions
    _.forEach(donnees, function(ligne, key) {
        if (key !== 0) {
            ligne.evolution = _.slice(ligne.evolution, 0, nombre_resultats_min);
        }
    });
};

var calculs_nationaux = function(donnees) {

    // Construction de la structure avec heures au national
    var nombre_resultats = donnees['11'].evolution.length;
    for (var i = 0; i < nombre_resultats; i++) {
        donnees['0'].evolution.push({
            'date_heure': donnees['11'].evolution[i].date_heure
        });
    }

    // Calcul des données agrégées depuis le regional
    _.forEach(sources_energie, function(source_energie) {
        var capacite_source = 0;
        _.forEach(_.keys(donnees), function(key) {
            var capacite = _.get(donnees, key + '.capacites.' + source_energie);
            if (capacite !== undefined) {
                capacite_source += capacite;
            }
        });
        donnees['0'].capacites[source_energie] = capacite_source;

        for (var i = 0; i < nombre_resultats; i++) {
            var valeur_source = 0;
            _.forEach(_.keys(donnees), function(key) {
                var evolutions = donnees[key].evolution;
                var valeur = _.get(evolutions[i], source_energie);
                if (valeur !== undefined) {
                    valeur_source += valeur;
                }
            });
            donnees['0'].evolution[i][source_energie] = valeur_source;

            var cle_tch = 'tch_' + source_energie;
            if (donnees['0'].evolution[i][source_energie] == 0) {
                donnees['0'].evolution[i][cle_tch] = 0;
            } else {
                donnees['0'].evolution[i][cle_tch] = valeur_source / donnees['0'].capacites[source_energie] * 100;
            }
        }
    });

    // Calcul de la consommation et des echanges
    _.forEach(autres_donnees, function(autre_donnee) {
        for (var i = 0; i < nombre_resultats; i++) {
            var valeur_donnee = 0;
            _.forEach(_.keys(donnees), function(key) {
                var valeur = _.get(donnees, key + '.evolution[' + i + '][' + autre_donnee + ']');
                if (valeur !== undefined) {
                    valeur_donnee += parseFloat(valeur);
                }
            });
            donnees['0'].evolution[i][autre_donnee] = valeur_donnee;
        }
    });
};

var calcul_meilleur_facteur = function(donnees) {
    var tch_prefix = 'tch_';
    _.forEach(donnees, function(donnee) {
        donnee.meilleur_facteur = [];
        _.forEach(donnee.evolution, function(donnee_courante) {
            var meilleure_valeur = 0;
            var meilleure_cle = undefined;
            _.forEach(donnee_courante, function(value, key) {
                if (_.includes(key, tch_prefix) && parseFloat(value) > meilleure_valeur) {
                    meilleure_valeur = parseFloat(value);
                    meilleure_cle = _.replace(key, tch_prefix, "");
                }
            });
            donnee.meilleur_facteur.push(meilleure_cle);
        });
    });
};

var sauver = function(donnees, nom) {
    
    var nom_final = nom + ".json";

    fs.writeFile(nom_final, JSON.stringify(donnees), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Données conservées");
    }); 
}

var construire_donnees = function(api_response, nombre_donnees_par_heure, nombre_heures, verifier_taille_donnees) {
    var donnees = get_init_data();
    calculs_regionaux(donnees, api_response, nombre_donnees_par_heure, nombre_heures, verifier_taille_donnees,);
    calculs_nationaux(donnees);
    calcul_meilleur_facteur(donnees);
    return donnees;
};

exports.appel_necessaire = appel_necessaire;
exports.recuperation_donnes_api = recuperation_donnes_api;
exports.recuperation_donnes_api_date = recuperation_donnes_api_date;
exports.construire_donnees = construire_donnees;
exports.sauver = sauver;