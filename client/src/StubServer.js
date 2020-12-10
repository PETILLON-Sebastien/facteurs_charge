var express = require("express");
var cors = require('cors');
var app = express();

var fs = require('fs');



app.use(cors());
app.options('*', cors()) // include before other routes

const routes = ["/api/v1/zones/installations/load/last", "/api/v1/zones/FR/installations/breakdown", "/api/v1/zones/FR/installations/production/breakdown"];
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

routes.map((r) => {
    // console.log(r);
    app.get(r, (req, res, next) => {
        const file = "src/" + r.replace(/\//g, "_") + ".json";
        console.log(r, file);
        fs.readFile(file, 'utf8', async function (err, data) {
            if (err) throw err;
            data = JSON.parse(data);
            // await sleep(3000);
            res.send(data);
        });
    });

});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});