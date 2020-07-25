'use strict';


/**
 * Retrieve consumptions
 *
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_consumptions = function(from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "snapshots" : [ {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "description" : {
      "stepStorage" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "used" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    }
  }, {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "description" : {
      "stepStorage" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "used" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    }
  } ],
  "zoneId" : "zoneId"
}, {
  "snapshots" : [ {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "description" : {
      "stepStorage" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "used" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    }
  }, {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "description" : {
      "stepStorage" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "used" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    }
  } ],
  "zoneId" : "zoneId"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve consumptions for the zone
 *
 * zoneId String Zone to retrieve data from
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_zone_consumptions = function(zoneId,from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "description" : {
    "stepStorage" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    },
    "used" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  }
}, {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "description" : {
    "stepStorage" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    },
    "used" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

