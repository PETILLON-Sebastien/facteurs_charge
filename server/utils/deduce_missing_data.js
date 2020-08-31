var _ = require("lodash");
var moment = require("moment");
var Q = require("q");
var api_provider = require("./api_provider.js");
var format_mapper = require("./format_mapper.js");
var constants = require("./constants.js");
var fs = require("fs");
var path = require("path");

var list_data_files = function () {
  var root_directory = path.resolve(__dirname, "..", "data");
  var files = fs.readdirSync(root_directory);
  files = files.filter((file) =>
    file.match(/\d{4}\-\d{2}\-\d{2}_[a-z]+\.json/)
  );
  files = files.sort().reverse();
  return files;
};

var compute_missing_dates = function (files) {
  local_last_date = files[0].split("_")[0];
  local_last_date = moment(local_last_date);
  now = moment();

  console.log(now.diff(local_last_date, "days"), "day(s) of data missing.");

  return [local_last_date, now];
};

var todo = function([from, to]) {
    console.log("Rough timeframe missing is", from.toString(), "to", to.toString());
}

const pipe = (...functions) => args => functions.reduce((arg, fn) => fn(arg), args);

pipe(list_data_files, compute_missing_dates, todo)();
