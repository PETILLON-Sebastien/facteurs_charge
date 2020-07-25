'use strict';


/**
 * Retrieve the breadkdowns
 *
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_breakdowns = function(from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "snapshots" : [ {
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
  } ],
  "zoneId" : "zoneId"
}, {
  "snapshots" : [ {
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
 * Retrieve the specified installations
 *
 * installationType String Installation type
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_installation = function(installationType,from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "snapshots" : [ {
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
  } ],
  "zoneId" : "zoneId"
}, {
  "snapshots" : [ {
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
 * Retrieve the capacity of the specified installation
 *
 * installationType String Installation type
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_installation_capacity = function(installationType,from,to) {
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
 * Retrieve the load of the specified installation
 *
 * installationType String Installation type
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_installation_load = function(installationType,from,to) {
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
 * Retrieve the production of the specified installation
 *
 * installationType String Installation type
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_installation_production = function(installationType,from,to) {
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
 * Retrieve installations
 *
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_installations = function(from,to) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "snapshots" : [ {
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
  } ],
  "zoneId" : "zoneId"
}, {
  "snapshots" : [ {
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
 * Retrieve the capacity of the installations
 *
 * from Date Start of the period (optional)
 * to Date End of the period (optional)
 * returns List
 **/
exports.get_installations_capacity = function(from,to) {
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
exports.get_zone_installations_production_breakdown = function(zoneId,from,to) {
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

