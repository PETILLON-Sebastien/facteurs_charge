var _ = require("lodash");
var moment = require("moment");
var Q = require("q");
var api_provider = require("./api_provider.js");
var format_mapper = require("./format_mapper.js");
var constants = require("./constants.js");
var fs = require("fs");
var path = require("path");
const lineReader = require("line-reader");

/**
 * Return the moment object of the newest data available locally.
 * This is retrieve either by reading the local flag file (if exists)
 * or find the most fresh data locally available (by looking at filenames)
 */
var get_last_data_date = function () {
  var last_data_date = null;

  // If there is a flag file, get it, otherwise find
  // the most fresh data locally available
  try {
    last_data_date = get_flag_last_update();
  } catch (e) {
    last_data_date = get_local_last_data_date();
  }

  return last_data_date;
};

var get_local_last_data_date = function () {
  var root_directory = path.resolve(__dirname, "..", "data");
  var files = fs.readdirSync(root_directory);

  // Keep all data files in the data folder
  files = files.filter((file) =>
    file.match(/\d{4}\-\d{2}\-\d{2}_[a-z]+\.json/)
  );

  // Find the date of the newest one (the first in the reversed order)
  files = files.sort().reverse();
  var local_last_date = files[0].split("_")[0];
  local_last_date = moment(local_last_date);

  return local_last_date;
};

/**
 * Return the moment object built from the content of the flag file if it exists.
 * Throw an error otherwise
 */
var get_flag_last_update = function () {
  var flag_file = path.resolve(__dirname, "..", "data", "flag_last_update.txt");
  var flag_exists = fs.existsSync(flag_file);

  if (flag_exists) {
    var flag_content = read_flag_content(flag_file);
    return moment(flag_content);
  } else {
    // return null;
    throw new Error(`Flag file ${flag_file} not found`);
  }
};

var read_flag_content = function (file) {
  lineReader.open(file, function (err, lineReader) {
    if (lineReader.hasNextLine()) {
      var last_date_update = lineReader.nextLine();
      return last_date_update;
    }
  });
};

var build_missing_timeframe = function (from) {
  now = moment();
  console.log(now.diff(from, "days"), "day(s) of data missing.");
  return [from, now];
};

var log_missing_timeframe = function ([from, to]) {
  console.log(
    "Rough timeframe missing is",
    from.toString(),
    "to",
    to.toString()
  );

  var minutes_missings = now.diff(from, "minutes");
  var data_points__missings = Math.ceil(minutes_missings / 15); // Data are retrieved each 15 minutes right?
  console.log(`${data_points__missings} data points missings`);
};

const pipe = (...functions) => (args) =>
  functions.reduce((arg, fn) => fn(arg), args);

pipe(get_last_data_date, build_missing_timeframe, log_missing_timeframe)();
