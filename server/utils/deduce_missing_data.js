var _ = require("lodash");
var moment = require("moment");
var Q = require("q");
var api_provider = require("./api_provider.js");
var format_mapper = require("./format_mapper.js");
var constants = require("./constants.js");
var fs = require("fs");
var path = require("path");
const lineReader = require('line-reader');


var get_last_data_date = function() {
    var last_data_date = null;

    // If there is a flag file, get it, otherwise find
    // the most fresh data locally available
    try {
        last_data_date = get_flag_last_update();
    } catch(e) {
        last_data_date = get_local_last_data_date();
    }

    return last_data_date;
}


var get_local_last_data_date = function () {
  var root_directory = path.resolve(__dirname, "..", "data");
  var files = fs.readdirSync(root_directory);
  files = files.filter((file) =>
    file.match(/\d{4}\-\d{2}\-\d{2}_[a-z]+\.json/)
  );
  files = files.sort().reverse();

  var local_last_date = files[0].split("_")[0];
  local_last_date = moment(local_last_date);

  return local_last_date;
};

var compute_missing_dates = function (from) {
  now = moment();
  console.log(now.diff(from, "days"), "day(s) of data missing.");
  return [from, now];
};

var get_flag_last_update = function() {
    var flag_file = path.resolve(__dirname, "..", "data","flag_last_update.txt");
    var flag_exists = fs.existsSync(flag_file);

    if (flag_exists) {
        var flag_content = read_flag_content(flag_file);
        return moment(flag_content);
    } else {
        // return null;
        throw new Error(`Flag file ${flag_file} not found`);
    }
}

var read_flag_content = function(file) {
    lineReader.open(file, function(err, lineReader) {
         if(lineReader.hasNextLine()) {
             var last_date_update =lineReader.nextLine();
             return last_date_update;
         }
    });
}


var todo = function([from, to]) {
    console.log("Rough timeframe missing is", from.toString(), "to", to.toString());
}

const pipe = (...functions) => args => functions.reduce((arg, fn) => fn(arg), args);

pipe(get_last_data_date, compute_missing_dates, todo)();
