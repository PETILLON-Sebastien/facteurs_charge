var Q = require("q");
var moment = require("moment");
var _ = require("lodash");
var expjour = require("./exportation_images_jour.js")

var jours = [];
var premierJour = moment().subtract(1, "month").startOf("month");
var jourCourant = moment(premierJour);

while(jourCourant.month() == premierJour.month()) {
    jours.push(moment(jourCourant));
    jourCourant.add(1, "day");
}
var funcs = _.map(jours, function(jour) {
    return function() {
        var deferred = Q.defer();
        expjour.exporter_jour(jour).then(function () {
            console.log("Terminé " + jour.format("YYYY-MM-DD"));
            deferred.resolve(); 
        });
        return deferred.promise;
    }
});

var result = Q();
funcs.forEach(function (f) {
    result = result.then(f);
});
return result;