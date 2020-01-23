var http = require('http');
var fs = require('fs');
var _ = require('lodash');

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
        serveStaticFile('js/mock.js', res);
    } else if (_.isEqual(req.url, "/")) {
        serveStaticFile('facteurscharge.html', res);
    } else {
        serveStaticFile(req.url, res);
    }

});
server.listen(8080);