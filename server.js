var http = require('http');
var fs = require('fs');
var _ = require('lodash');
var moment = require('moment');
var compute = require('./compute.js');
var express = require('express')
var app = express()

let envIsTest = (process.env.ENVIRONMENT == 'test');
let stubs = '';
if (envIsTest) {
    stubs = fs.readFileSync('data.stub.json', 'utf8');
}


var dernier_appel = undefined;
var donnees = undefined;
var nombre_region = 12;
var nombre_donnees_par_heure = 4;
var nombre_heures = 25;
var periode_rafraichissement = 5;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

function serveData(res) {
    if (envIsTest) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(stubs);
        return;
    }

    if (compute.appel_necessaire(dernier_appel, periode_rafraichissement)) {
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

function serveFrontEnd(res) {
    fs.readFile('./static/facteurscharge.html', function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
            return;
        }
    });
}

app.use(express.static("static"));
app.use(express.static("donnees"));

app.get('/', function (req, res) {
    serveFrontEnd(res);
});
app.get('/region/[0-9]+', function (req, res) {
    serveFrontEnd(res);
});
app.get('/now', (req, res) => {
    serveData(res);
});

app.listen(8080, () => console.log(`Application lancée`));