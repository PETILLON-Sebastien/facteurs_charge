'use strict';

var utils = require('../utils/writer.js');
var Installation = require('../service/InstallationService');

module.exports.get_breakdowns = function get_breakdowns (req, res, next) {
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_breakdowns(from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_installation = function get_installation (req, res, next) {
  var installationType = req.swagger.params['installationType'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_installation(installationType,from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_installation_capacity = function get_installation_capacity (req, res, next) {
  var installationType = req.swagger.params['installationType'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_installation_capacity(installationType,from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_installation_load = function get_installation_load (req, res, next) {
  var installationType = req.swagger.params['installationType'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_installation_load(installationType,from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_installation_production = function get_installation_production (req, res, next) {
  var installationType = req.swagger.params['installationType'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_installation_production(installationType,from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_installations = function get_installations (req, res, next) {
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_installations(from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_installations_capacity = function get_installations_capacity (req, res, next) {
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_installations_capacity(from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_installations_capacity_breakdown = function get_installations_capacity_breakdown (req, res, next) {
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_installations_capacity_breakdown(from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_installations_load = function get_installations_load (req, res, next) {
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_installations_load(from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_installations_load_last = function get_installations_load_last (req, res, next) {
  var filter = req.swagger.params['filter'].value;
  Installation.get_installations_load_last(filter)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_installations_load_breakdown = function get_installations_load_breakdown (req, res, next) {
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_installations_load_breakdown(from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_installations_production = function get_installations_production (req, res, next) {
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_installations_production(from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_installations_production_breakdown = function get_installations_production_breakdown (req, res, next) {
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_installations_production_breakdown(from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_zone_breakdown = function get_zone_breakdown (req, res, next) {
  var zoneId = req.swagger.params['zoneId'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_zone_breakdown(zoneId,from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_zone_installation = function get_zone_installation (req, res, next) {
  var zoneId = req.swagger.params['zoneId'].value;
  var installationType = req.swagger.params['installationType'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_zone_installation(zoneId,installationType,from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_zone_installation_capacity = function get_zone_installation_capacity (req, res, next) {
  var zoneId = req.swagger.params['zoneId'].value;
  var installationType = req.swagger.params['installationType'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_zone_installation_capacity(zoneId,installationType,from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_zone_installation_load = function get_zone_installation_load (req, res, next) {
  var zoneId = req.swagger.params['zoneId'].value;
  var installationType = req.swagger.params['installationType'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_zone_installation_load(zoneId,installationType,from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_zone_installation_production = function get_zone_installation_production (req, res, next) {
  var zoneId = req.swagger.params['zoneId'].value;
  var installationType = req.swagger.params['installationType'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_zone_installation_production(zoneId,installationType,from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_zone_installations = function get_zone_installations (req, res, next) {
  var zoneId = req.swagger.params['zoneId'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_zone_installations(zoneId,from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_zone_installations_capacity = function get_zone_installations_capacity (req, res, next) {
  var zoneId = req.swagger.params['zoneId'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_zone_installations_capacity(zoneId,from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_zone_installations_capacity_breakdown = function get_zone_installations_capacity_breakdown (req, res, next) {
  var zoneId = req.swagger.params['zoneId'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_zone_installations_capacity_breakdown(zoneId,from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_zone_installations_load = function get_zone_installations_load (req, res, next) {
  var zoneId = req.swagger.params['zoneId'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_zone_installations_load(zoneId,from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_zone_installations_load_breakdown = function get_zone_installations_load_breakdown (req, res, next) {
  var zoneId = req.swagger.params['zoneId'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_zone_installations_load_breakdown(zoneId,from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_zone_installations_production = function get_zone_installations_production (req, res, next) {
  var zoneId = req.swagger.params['zoneId'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_zone_installations_production(zoneId,from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_zone_installations_production_breakdown = function get_zone_installations_production_breakdown (req, res, next) {
  var zoneId = req.swagger.params['zoneId'].value;
  var from = req.swagger.params['from'].value;
  var to = req.swagger.params['to'].value;
  Installation.get_zone_installations_production_breakdown(zoneId,from,to)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
