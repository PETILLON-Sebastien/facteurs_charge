var express = require("express");
var cors = require('cors');
var app = express();

var fs = require('fs');


app.use(cors());
app.options('*', cors()) // include before other routes

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.get("/api/v1/zones/installations/load/last", (req, res, next) => {
    const file = "stub/_api_v1_zones_installations_load_last.json";
    console.log(file);
    fs.readFile(file, 'utf8', async function (err, data) {
        if (err) throw err;
        data = JSON.parse(data);
        // await sleep(3000);
        res.send(data);
    });
});


app.get("/api/v1/zones/:id/installations/breakdown", (req, res, next) => {
    const file = "stub/_api_v1_zones_FR_installations_breakdown.json";
    console.log(file);
    fs.readFile(file, 'utf8', async function (err, data) {
        if (err) throw err;
        data = JSON.parse(data);
        // await sleep(3000);
        res.send(data);
    });
});


app.get("/api/v1/zones/:id/installations/production/breakdown", (req, res, next) => {
    const file = "stub/_api_v1_zones_FR_installations_breakdown.json";
    console.log(file);
    fs.readFile(file, 'utf8', async function (err, data) {
        if (err) throw err;
        data = JSON.parse(data);
        // await sleep(3000);
        res.send(data);
    });
});


app.listen(8080, () => {
    console.log("Server running on port 8080");
});