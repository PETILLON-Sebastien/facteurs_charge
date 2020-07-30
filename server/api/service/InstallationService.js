'use strict';
var _ = require('lodash');
var Q = require('q');
var path = require('path');
var api_common = require(path.join('..', 'utils', 'api_common.js'));
var constants = require(path.join('..', '..', 'utils', 'constants.js'));
var file_reading = require(path.join('..', '..', 'utils', 'file_reading.js'));

var customizer = function(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return _.uniqWith(objValue.concat(srcValue), _.isEqual);
  }
};

function fulfill(production, capacity) {
  _.mergeWith(production, capacity, customizer);
  _.forOwn(production, function(value, key) {
    if(value[constants.api_wording.details]) {
      fulfill(value[constants.api_wording.details], capacity[key][constants.api_wording.details]);
    } else {
      if (_.isNumber(value[constants.api_wording.production])
        && _.isNumber(value[constants.api_wording.capacity])) {
        value[constants.api_wording.load] = value[constants.api_wording.production] / value[constants.api_wording.capacity];
      }
      production[key] = api_common.format_values(value);
    }
  });
}

function retrieve_all(from, to) {
  var defered = Q.defer();
  var time_window = api_common.manage_time_window(from, to);
  var time_window_day_before = api_common.manage_time_window_day_before(from, to);
  var production = file_reading.retrieve_period(time_window.from, time_window.to, constants.production);
  var capacity = file_reading.retrieve_period(time_window_day_before.from, time_window_day_before.to, constants.capacity);
  Q.all([production, capacity]).then(function(data) {
    var production = data[0];
    var capacity = data[1];
    _.forOwn(production, function(zone) {
      var zone_id = zone[constants.api_wording.zone_id];
      _.forOwn(zone[constants.api_wording.snapshots], function(snapshot) {
        var date = snapshot[constants.api_wording.datetime].slice(0, 10);
        fulfill(snapshot[constants.api_wording.breakdown], capacity[date][zone_id][constants.api_wording.breakdown]);
      });
    });
    defered.resolve(production);
  });
  return defered.promise;
};

function format_capacity(data) {
  var zones = {};
  _.forOwn(data, function(date_value, date_key) {
    _.forOwn(date_value, function(zone_value, zone_key) {
      if(zone_key !== constants.api_wording.datetime) {
        if(!zones[zone_key]) {
          zones[zone_key] = {};
          zones[zone_key][constants.api_wording.zone_id] = zone_key;
          zones[zone_key][constants.api_wording.snapshots] = [];
        }
        var snapshot = {};
        snapshot[constants.api_wording.datetime] = date_key;
        snapshot[constants.api_wording.breakdown] = zone_value[constants.api_wording.breakdown];
        zones[zone_key][constants.api_wording.snapshots].push(snapshot);
      }
    });
  });
  return _.values(zones);
}

function filter_load(all_data) {
  _.forOwn(all_data, function(part) {
    if(_.isObject(part) && (part[constants.api_wording.load] != undefined || part[constants.api_wording.production] != undefined || part[constants.api_wording.consumption] != undefined)) {
      delete part[constants.api_wording.production];
      delete part[constants.api_wording.capacity];
    }
    if (_.isObject(part)) {
      filter_load(part);
    }
  });
  return all_data;
}

function filter_installation_type(all_data, installationType) {
  _.forOwn(all_data, function(part) {
    if(part[constants.api_wording.breakdown]) {
      _.merge(part, part[constants.api_wording.breakdown][installationType]);
      delete part[constants.api_wording.breakdown];
    } else if (_.isObject(part)) {
      filter_installation_type(part, installationType);
    }
  });
}

function format_all_values(all_data) {
  _.forOwn(all_data, function(part, key) {
    if(_.isObject(part) && (part[constants.api_wording.capacity] != undefined || part[constants.api_wording.production] != undefined || part[constants.api_wording.load] != undefined)) {
      all_data[key] = api_common.format_values(part);
    }
    if (_.isObject(part)) {
      format_all_values(part);
    }
  });
}

function sum_all(data) {
  _.forOwn(data, function(zone) {
    _.forOwn(zone[constants.api_wording.snapshots], function(snapshot) {
      var init = {};
      _.set(init, [constants.api_wording.production, constants.api_wording.value], 0);
      _.set(init, [constants.api_wording.capacity, constants.api_wording.value], 0);
      snapshot[constants.api_wording.installation] = _.reduce(snapshot[constants.api_wording.breakdown], function(result, value, key) {
        var production_value = _.get(value, [constants.api_wording.production, constants.api_wording.value]);
        var capacity_value = _.get(value, [constants.api_wording.capacity, constants.api_wording.value]);
        result[constants.api_wording.production][constants.api_wording.value] += production_value ? production_value : 0;
        if(production_value && !result[constants.api_wording.production][constants.api_wording.unit]) {
          result[constants.api_wording.production][constants.api_wording.unit] = value[constants.api_wording.production][constants.api_wording.unit];
        }
        result[constants.api_wording.capacity][constants.api_wording.value] += capacity_value ? capacity_value : 0;
        if(capacity_value && !result[constants.api_wording.capacity][constants.api_wording.unit]) {
          result[constants.api_wording.capacity][constants.api_wording.unit] = value[constants.api_wording.capacity][constants.api_wording.unit];
        }
        return result;
      }, init);
      delete snapshot[constants.api_wording.breakdown];
    });
  });
}

function sum_all_capacity(data) {
  _.forOwn(data, function(zone) {
    _.forOwn(zone[constants.api_wording.snapshots], function(snapshot) {
      var init = {};
      _.set(init, [constants.api_wording.value], 0);
      snapshot[constants.api_wording.power] = _.reduce(snapshot[constants.api_wording.breakdown], function(result, value, key) {
        var capacity_value = _.get(value, [constants.api_wording.capacity]);
        result[constants.api_wording.value] += capacity_value ? capacity_value : 0;
        result[constants.api_wording.unit] = constants.units.mega_watt;
        return result;
      }, init);
      delete snapshot[constants.api_wording.breakdown];
    });
  });
}

function keep_zone(data, zone_id) {
  var to_find = {};
  to_find[constants.api_wording.zone_id] = zone_id;
  return _.get(_.find(data, to_find), constants.api_wording.snapshots);
}

/**
 * Retrieve the breadkdowns
 *
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_breakdowns = function(from, to) {
  var time_window = api_common.manage_time_window(from, to);
  return retrieve_all(time_window.from, time_window.to);
}


/**
 * Retrieve the specified installations
 *
 * installationType String Installation type
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_installation = function(installationType, from, to) {
  var defered = Q.defer();
  var time_window = api_common.manage_time_window(from, to);
  retrieve_all(time_window.from, time_window.to).then(function (data) {
    filter_installation_type(data, installationType);
    format_all_values(capacity_formatted);
    defered.resolve(data);
  });
  return defered.promise;
}


/**
 * Retrieve the capacity of the specified installation
 *
 * installationType String Installation type
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_installation_capacity = function(installationType, from, to) {
    var defered = Q.defer();
    var time_window = api_common.manage_time_window(from, to);
    file_reading.retrieve_period(time_window.from, time_window.to, constants.capacity).then(function(data) {
      var capacity_formatted = format_capacity(data);
      filter_installation_type(capacity_formatted, installationType);
      format_all_values(capacity_formatted);
      defered.resolve(capacity_formatted);
    });
    return defered.promise;
}


/**
 * Retrieve the load of the specified installation
 *
 * installationType String Installation type
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_installation_load = function(installationType, from, to) {
    var defered = Q.defer();
    var time_window = api_common.manage_time_window(from, to);
    retrieve_all(time_window.from, time_window.to).then(function(data) {
      var load = filter_load(data, constants.api_wording.load);
      filter_installation_type(load, installationType);
      defered.resolve(load);
    });
    return defered.promise;
}

/**
 * Retrieve the production of the specified installation
 *
 * installationType String Installation type
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_installation_production = function(installationType, from, to) {
      var defered = Q.defer();
      var time_window = api_common.manage_time_window(from, to);
      file_reading.retrieve_period(time_window.from, time_window.to, constants.production).then(function(data) {
        filter_installation_type(data, installationType);
        format_all_values(data);
        defered.resolve(data);
      });
      return defered.promise;
}


/**
 * Retrieve installations
 *
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_installations = function(from,to) {
      var defered = Q.defer();
      var time_window = api_common.manage_time_window(from, to);
      retrieve_all(time_window.from, time_window.to).then(function(data) {
        sum_all(data);
        defered.resolve(data);
      });
      return defered.promise;
}


/**
 * Retrieve the capacity of the installations
 *
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_installations_capacity = function(from,to) {
    var defered = Q.defer();
    var time_window = api_common.manage_time_window(from, to);
    file_reading.retrieve_period(time_window.from, time_window.to, constants.capacity).then(function(data) {;
      var capacity_formatted = format_capacity(data);
      sum_all_capacity(capacity_formatted)
      format_all_values(capacity_formatted);
      defered.resolve(capacity_formatted);
    });
    return defered.promise;
}


/**
 * Retrieve the capacity breakdown of the installations
 *
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_installations_capacity_breakdown = function(from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "snapshots" : [ {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "powerBreakdown" : {
      "hydraulic" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "bioenergy" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "solar" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "nuclear" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "fossil" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "wind" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    }
  }, {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "powerBreakdown" : {
      "hydraulic" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "bioenergy" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "solar" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "nuclear" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "fossil" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "wind" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    }
  } ],
  "zoneId" : "zoneId"
}, {
  "snapshots" : [ {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "powerBreakdown" : {
      "hydraulic" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "bioenergy" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "solar" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "nuclear" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "fossil" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "wind" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    }
  }, {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "powerBreakdown" : {
      "hydraulic" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "bioenergy" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "solar" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "nuclear" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "fossil" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "wind" : {
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
 * Retrieve the load of the installations
 *
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_installations_load = function(from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "snapshots" : [ {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "load" : {
      "value" : 0.8008281904610115
    },
    "details" : [ {
      "load" : {
        "value" : 0.8008281904610115
      },
      "name" : "name",
      "details" : [ null, null ]
    }, {
      "load" : {
        "value" : 0.8008281904610115
      },
      "name" : "name",
      "details" : [ null, null ]
    } ]
  }, {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "load" : {
      "value" : 0.8008281904610115
    },
    "details" : [ {
      "load" : {
        "value" : 0.8008281904610115
      },
      "name" : "name",
      "details" : [ null, null ]
    }, {
      "load" : {
        "value" : 0.8008281904610115
      },
      "name" : "name",
      "details" : [ null, null ]
    } ]
  } ],
  "zoneId" : "zoneId"
}, {
  "snapshots" : [ {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "load" : {
      "value" : 0.8008281904610115
    },
    "details" : [ {
      "load" : {
        "value" : 0.8008281904610115
      },
      "name" : "name",
      "details" : [ null, null ]
    }, {
      "load" : {
        "value" : 0.8008281904610115
      },
      "name" : "name",
      "details" : [ null, null ]
    } ]
  }, {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "load" : {
      "value" : 0.8008281904610115
    },
    "details" : [ {
      "load" : {
        "value" : 0.8008281904610115
      },
      "name" : "name",
      "details" : [ null, null ]
    }, {
      "load" : {
        "value" : 0.8008281904610115
      },
      "name" : "name",
      "details" : [ null, null ]
    } ]
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
 * Retrieve the load breakdown of the installations
 *
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_installations_load_breakdown = function(from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "snapshots" : [ {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "loadBreakdown" : {
      "hydraulic" : {
        "value" : 0.8008281904610115
      },
      "bioenergy" : {
        "value" : 0.8008281904610115
      },
      "solar" : {
        "value" : 0.8008281904610115
      },
      "nuclear" : {
        "value" : 0.8008281904610115
      },
      "fossil" : {
        "value" : 0.8008281904610115
      },
      "wind" : {
        "value" : 0.8008281904610115
      }
    }
  }, {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "loadBreakdown" : {
      "hydraulic" : {
        "value" : 0.8008281904610115
      },
      "bioenergy" : {
        "value" : 0.8008281904610115
      },
      "solar" : {
        "value" : 0.8008281904610115
      },
      "nuclear" : {
        "value" : 0.8008281904610115
      },
      "fossil" : {
        "value" : 0.8008281904610115
      },
      "wind" : {
        "value" : 0.8008281904610115
      }
    }
  } ],
  "zoneId" : "zoneId"
}, {
  "snapshots" : [ {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "loadBreakdown" : {
      "hydraulic" : {
        "value" : 0.8008281904610115
      },
      "bioenergy" : {
        "value" : 0.8008281904610115
      },
      "solar" : {
        "value" : 0.8008281904610115
      },
      "nuclear" : {
        "value" : 0.8008281904610115
      },
      "fossil" : {
        "value" : 0.8008281904610115
      },
      "wind" : {
        "value" : 0.8008281904610115
      }
    }
  }, {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "loadBreakdown" : {
      "hydraulic" : {
        "value" : 0.8008281904610115
      },
      "bioenergy" : {
        "value" : 0.8008281904610115
      },
      "solar" : {
        "value" : 0.8008281904610115
      },
      "nuclear" : {
        "value" : 0.8008281904610115
      },
      "fossil" : {
        "value" : 0.8008281904610115
      },
      "wind" : {
        "value" : 0.8008281904610115
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
 * Retrieve the production of the installations
 *
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_installations_production = function(from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "snapshots" : [ {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "details" : [ {
      "name" : "name",
      "details" : [ null, null ],
      "power" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    }, {
      "name" : "name",
      "details" : [ null, null ],
      "power" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    } ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  }, {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "details" : [ {
      "name" : "name",
      "details" : [ null, null ],
      "power" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    }, {
      "name" : "name",
      "details" : [ null, null ],
      "power" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    } ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  } ],
  "zoneId" : "zoneId"
}, {
  "snapshots" : [ {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "details" : [ {
      "name" : "name",
      "details" : [ null, null ],
      "power" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    }, {
      "name" : "name",
      "details" : [ null, null ],
      "power" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    } ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  }, {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "details" : [ {
      "name" : "name",
      "details" : [ null, null ],
      "power" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    }, {
      "name" : "name",
      "details" : [ null, null ],
      "power" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    } ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
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
 * Retrieve the production breakdown of the installations
 *
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_installations_production_breakdown = function(from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "snapshots" : [ {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "powerBreakdown" : {
      "hydraulic" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "bioenergy" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "solar" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "nuclear" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "fossil" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "wind" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    }
  }, {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "powerBreakdown" : {
      "hydraulic" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "bioenergy" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "solar" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "nuclear" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "fossil" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "wind" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    }
  } ],
  "zoneId" : "zoneId"
}, {
  "snapshots" : [ {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "powerBreakdown" : {
      "hydraulic" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "bioenergy" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "solar" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "nuclear" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "fossil" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "wind" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    }
  }, {
    "datetime" : "2000-01-23T04:56:07.000+00:00",
    "powerBreakdown" : {
      "hydraulic" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "bioenergy" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "solar" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "nuclear" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "fossil" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "wind" : {
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
 * Retrieve the breadkdown for this zone
 *
 * zoneId String Zone to retrieve data from
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_zone_breakdown = function(zoneId,from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "breakdown" : {
    "hydraulic" : {
      "load" : {
        "value" : 0.8008281904610115
      },
      "production" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "capacity" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    },
    "bioenergy" : {
      "load" : {
        "value" : 0.8008281904610115
      },
      "production" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "capacity" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    },
    "solar" : {
      "load" : {
        "value" : 0.8008281904610115
      },
      "production" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "capacity" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    },
    "nuclear" : {
      "load" : {
        "value" : 0.8008281904610115
      },
      "production" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "capacity" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    },
    "fossil" : {
      "load" : {
        "value" : 0.8008281904610115
      },
      "production" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "capacity" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    },
    "wind" : {
      "load" : {
        "value" : 0.8008281904610115
      },
      "production" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "capacity" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    }
  }
}, {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "breakdown" : {
    "hydraulic" : {
      "load" : {
        "value" : 0.8008281904610115
      },
      "production" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "capacity" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    },
    "bioenergy" : {
      "load" : {
        "value" : 0.8008281904610115
      },
      "production" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "capacity" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    },
    "solar" : {
      "load" : {
        "value" : 0.8008281904610115
      },
      "production" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "capacity" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    },
    "nuclear" : {
      "load" : {
        "value" : 0.8008281904610115
      },
      "production" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "capacity" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    },
    "fossil" : {
      "load" : {
        "value" : 0.8008281904610115
      },
      "production" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "capacity" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
    },
    "wind" : {
      "load" : {
        "value" : 0.8008281904610115
      },
      "production" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      },
      "capacity" : {
        "unit" : "unit",
        "value" : 0.80082819046101150206595775671303272247314453125
      }
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


/**
 * Retrieve the specified installation for this zone
 *
 * zoneId String Zone to retrieve data from
 * installationType String Installation type
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_zone_installation = function(zoneId,installationType,from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "installation" : {
    "load" : {
      "value" : 0.8008281904610115
    },
    "production" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    },
    "capacity" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  }
}, {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "installation" : {
    "load" : {
      "value" : 0.8008281904610115
    },
    "production" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    },
    "capacity" : {
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


/**
 * Retrieve the capacity of the specified installation for this zone
 *
 * zoneId String Zone to retrieve data from
 * installationType String Installation type
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_zone_installation_capacity = function(zoneId,installationType,from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "details" : [ {
    "name" : "name",
    "details" : [ null, null ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  }, {
    "name" : "name",
    "details" : [ null, null ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  } ],
  "power" : {
    "unit" : "unit",
    "value" : 0.80082819046101150206595775671303272247314453125
  }
}, {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "details" : [ {
    "name" : "name",
    "details" : [ null, null ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  }, {
    "name" : "name",
    "details" : [ null, null ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  } ],
  "power" : {
    "unit" : "unit",
    "value" : 0.80082819046101150206595775671303272247314453125
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve the load of the specified installation for this zone
 *
 * zoneId String Zone to retrieve data from
 * installationType String Installation type
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_zone_installation_load = function(zoneId,installationType,from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "load" : {
    "value" : 0.8008281904610115
  },
  "details" : [ {
    "load" : {
      "value" : 0.8008281904610115
    },
    "name" : "name",
    "details" : [ null, null ]
  }, {
    "load" : {
      "value" : 0.8008281904610115
    },
    "name" : "name",
    "details" : [ null, null ]
  } ]
}, {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "load" : {
    "value" : 0.8008281904610115
  },
  "details" : [ {
    "load" : {
      "value" : 0.8008281904610115
    },
    "name" : "name",
    "details" : [ null, null ]
  }, {
    "load" : {
      "value" : 0.8008281904610115
    },
    "name" : "name",
    "details" : [ null, null ]
  } ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve the production of the specified installation for this zone
 *
 * zoneId String Zone to retrieve data from
 * installationType String Installation type
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_zone_installation_production = function(zoneId,installationType,from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "details" : [ {
    "name" : "name",
    "details" : [ null, null ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  }, {
    "name" : "name",
    "details" : [ null, null ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  } ],
  "power" : {
    "unit" : "unit",
    "value" : 0.80082819046101150206595775671303272247314453125
  }
}, {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "details" : [ {
    "name" : "name",
    "details" : [ null, null ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  }, {
    "name" : "name",
    "details" : [ null, null ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  } ],
  "power" : {
    "unit" : "unit",
    "value" : 0.80082819046101150206595775671303272247314453125
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve installation for this zone
 *
 * zoneId String Zone to retrieve data from
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_zone_installations = function(zoneId,from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "installation" : {
    "load" : {
      "value" : 0.8008281904610115
    },
    "production" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    },
    "capacity" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  }
}, {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "installation" : {
    "load" : {
      "value" : 0.8008281904610115
    },
    "production" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    },
    "capacity" : {
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


/**
 * Retrieve the capacity of the installations for this zone
 *
 * zoneId String Zone to retrieve data from
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_zone_installations_capacity = function(zoneId,from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "details" : [ {
    "name" : "name",
    "details" : [ null, null ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  }, {
    "name" : "name",
    "details" : [ null, null ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  } ],
  "power" : {
    "unit" : "unit",
    "value" : 0.80082819046101150206595775671303272247314453125
  }
}, {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "details" : [ {
    "name" : "name",
    "details" : [ null, null ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  }, {
    "name" : "name",
    "details" : [ null, null ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  } ],
  "power" : {
    "unit" : "unit",
    "value" : 0.80082819046101150206595775671303272247314453125
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve the capacity breakdown of the installations for this zone
 *
 * zoneId String Zone to retrieve data from
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_zone_installations_capacity_breakdown = function(zoneId,from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "powerBreakdown" : {
    "hydraulic" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    },
    "bioenergy" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    },
    "solar" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    },
    "nuclear" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    },
    "fossil" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    },
    "wind" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  }
}, {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "powerBreakdown" : {
    "hydraulic" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    },
    "bioenergy" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    },
    "solar" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    },
    "nuclear" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    },
    "fossil" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    },
    "wind" : {
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


/**
 * Retrieve the load of the installations for this zone
 *
 * zoneId String Zone to retrieve data from
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_zone_installations_load = function(zoneId,from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "load" : {
    "value" : 0.8008281904610115
  },
  "details" : [ {
    "load" : {
      "value" : 0.8008281904610115
    },
    "name" : "name",
    "details" : [ null, null ]
  }, {
    "load" : {
      "value" : 0.8008281904610115
    },
    "name" : "name",
    "details" : [ null, null ]
  } ]
}, {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "load" : {
    "value" : 0.8008281904610115
  },
  "details" : [ {
    "load" : {
      "value" : 0.8008281904610115
    },
    "name" : "name",
    "details" : [ null, null ]
  }, {
    "load" : {
      "value" : 0.8008281904610115
    },
    "name" : "name",
    "details" : [ null, null ]
  } ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve the load breakdown of the installations for this zone
 *
 * zoneId String Zone to retrieve data from
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_zone_installations_load_breakdown = function(zoneId,from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "loadBreakdown" : {
    "hydraulic" : {
      "value" : 0.8008281904610115
    },
    "bioenergy" : {
      "value" : 0.8008281904610115
    },
    "solar" : {
      "value" : 0.8008281904610115
    },
    "nuclear" : {
      "value" : 0.8008281904610115
    },
    "fossil" : {
      "value" : 0.8008281904610115
    },
    "wind" : {
      "value" : 0.8008281904610115
    }
  }
}, {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "loadBreakdown" : {
    "hydraulic" : {
      "value" : 0.8008281904610115
    },
    "bioenergy" : {
      "value" : 0.8008281904610115
    },
    "solar" : {
      "value" : 0.8008281904610115
    },
    "nuclear" : {
      "value" : 0.8008281904610115
    },
    "fossil" : {
      "value" : 0.8008281904610115
    },
    "wind" : {
      "value" : 0.8008281904610115
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


/**
 * Retrieve the production of the installations for this zone
 *
 * zoneId String Zone to retrieve data from
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_zone_installations_production = function(zoneId,from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "details" : [ {
    "name" : "name",
    "details" : [ null, null ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  }, {
    "name" : "name",
    "details" : [ null, null ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  } ],
  "power" : {
    "unit" : "unit",
    "value" : 0.80082819046101150206595775671303272247314453125
  }
}, {
  "datetime" : "2000-01-23T04:56:07.000+00:00",
  "details" : [ {
    "name" : "name",
    "details" : [ null, null ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  }, {
    "name" : "name",
    "details" : [ null, null ],
    "power" : {
      "unit" : "unit",
      "value" : 0.80082819046101150206595775671303272247314453125
    }
  } ],
  "power" : {
    "unit" : "unit",
    "value" : 0.80082819046101150206595775671303272247314453125
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve the production breakdown of the installations for this zone
 *
 * zoneId String Zone to retrieve data from
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_zone_installations_production_breakdown = function(zoneId, from, to) {
    var defered = Q.defer();
    var time_window = api_common.manage_time_window(from, to);
    file_reading.retrieve_period(time_window.from, time_window.to, constants.production).then(function(data) {
      format_all_values(data);
      defered.resolve(keep_zone(data, zoneId));
    });
    return defered.promise;
}
