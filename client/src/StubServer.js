var express = require("express");
var cors = require('cors');
var app = express();

var fs = require('fs');



app.use(cors());
app.options('*', cors()) // include before other routes

const routes = ["/api/v1/zones/installations/load/last", "/api/v1/zones/FR/installations/breakdown", "/api/v1/zones/FR/installations/production/breakdown"];

routes.map((r) => {
    // console.log(r);
    app.get(r, (req, res, next) => {
        const file = "src/" +r.replace(/\//g, "_") + ".json";
        var data;
        console.log(r, file);
        fs.readFile(file, 'utf8', function (err, data) {
        if (err) throw err;
            data = JSON.parse(data);
            res.send(data);
        });    
    });
    
});

app.listen(8080, () => {
 console.log("Server running on port 8080");
});