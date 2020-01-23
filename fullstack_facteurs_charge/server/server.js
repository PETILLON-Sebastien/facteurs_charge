var http = require('http');
var fs = require('fs');
var _ = require('lodash');
var moment = require('moment');
var compute = require('./compute.js');

var dernier_appel = undefined;
var donnees = undefined;
var nombre_region = 12
var nombre_donnees_par_heure = 4
var nombre_heures = 25
var periode_rafraichissement = 5


function serveData(res) {
    res.writeHead(200, {"Content-Type": "application/javascript"});
    if(compute.appel_necessaire(dernier_appel, periode_rafraichissement)) {
        dernier_appel = moment();
        compute.recuperation_donnes_api(nombre_region, nombre_donnees_par_heure, nombre_heures, function (api_response) {
            donnees = compute.construct_data(api_response, nombre_donnees_par_heure, nombre_heures);
            res.end("var donnees = " + JSON.stringify(donnees) + ";");
        });
    } else {
        res.end("var donnees = " + JSON.stringify(donnees) + ";");
    }
}

function serveStaticFile(url, res) {
    fs.readFile('./static/' + url, function (err, data) {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }
        if (_.endsWith(url, '.css')) {
            res.writeHead(200, {"Content-Type": "text/css"});
        } else if (_.endsWith(url, '.html')) {
            res.writeHead(200, {"Content-Type": "text/html"});
        } else if (_.endsWith(url, '.js')) {
            res.writeHead(200, {"Content-Type": "application/javascript"});
        } else {
            res.writeHead(200);
        }
        res.end(data);
      });
}

var server = http.createServer(function(req, res) {
    if (_.endsWith(req.url, 'data.js')) {
        serveData(res);
    } else if (_.isEqual(req.url, "/")) {
        serveStaticFile('facteurscharge.html', res);
    } else {
        serveStaticFile(req.url, res);
    }

});
server.listen(8080);