var http = require('http');
var fs = require('fs');
var _ = require('lodash');
var moment = require('moment');
var compute = require('./compute.js');
var express = require('express')
var app = express()
var cors = require('cors')
app.use(cors())


var dernier_appel = undefined;
var donnees = undefined;
var nombre_region = 12;
var nombre_donnees_par_heure = 4;
var nombre_heures = 25;
var periode_rafraichissement = 5;

function serveData(res) {
    res.writeHead(200, {"Content-Type": "application/json"});
    if(compute.appel_necessaire(dernier_appel, periode_rafraichissement)) {
        compute.recuperation_donnes_api(nombre_region, nombre_donnees_par_heure, nombre_heures, function (api_response) {
            try {
                var donnees_calculees = compute.construire_donnees(api_response, nombre_donnees_par_heure, nombre_heures, true);
                donnees = donnees_calculees;
                dernier_appel = moment();
            } catch (e) {
                console.error(e);
            }
            res.end(JSON.stringify(donnees));
        });
    } else {
        res.end(JSON.stringify(donnees));
    }
}

app.use(express.static("donnees"));

app.get('/now', (req, res) => {
    serveData(res);
});


app.get('/', (req, res) => {
    serveData(res);
});

app.listen(8080, () => console.log(`Serveur lancé`));