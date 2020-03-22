var path = require('path');
var {readdir, createReadStream, createWriteStream} = require('fs');
const { Converter } = require("ffmpeg-stream");

var directoryPath = path.join(__dirname, 'images_generees');

readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    const converter = new Converter()
    // create input writable stream
    const input = converter.createInputStream({ f: "image2pipe", r: 24 })
    // output to file
    converter.createOutputToFile("mois.mp4", {
        vcodec: "libx264",
        pix_fmt: "yuv420p",
    });

    // for every frame create a function that returns a promise
    files
      .map(filename => () =>
        new Promise((resolve, reject) =>
            createReadStream(path.join(__dirname, 'images_generees', filename))
            // pipe to converter, but don't end the input yet
            .on("end", resolve)
            .on("error", reject)
            .pipe(
              input,
              { end: false },
            )
        ),
      )
      // reduce into a single promise, run sequentially
      .reduce((prev, next) => prev.then(next), Promise.resolve())
      // end converter input
      .then(() => input.end());

    converter.run();
});