var async = require("async");
import moment from "moment";

const root_endpoint = process.env.API_URL + "/api/v1";

export default class Server {
    static getPowerSourcesBreakdown(ISOZoneId) {
        return new Promise((resolve) => {
            const targetUrl =
                root_endpoint +
                "/zones/" +
                ISOZoneId +
                "/installations/production/breakdown";
            console.log("Fetching power sources", targetUrl);
            async.waterfall(
                [
                    (cb) => {
                        fetch(targetUrl).then((rawData) => cb(null, rawData));
                    },
                    (rawData, cb) => {
                        rawData.json().then((data) => cb(null, data));
                    },
                ],
                (err, data) => {
                    // Sort data
                    // ISSUE https://github.com/PETILLON-Sebastien/facteurs_charge/issues/52
                    data.sort((breakdownA, breakdownB) => {
                        return (
                            moment(breakdownA.datetime).valueOf() -
                            moment(breakdownB.datetime).valueOf()
                        );
                    });

                    // Handling cases where the server does not send proper data
                    let copyOfData = Object.assign(data);

                    data.forEach((currentData, i) => {
                        const breakdown = currentData.breakdown;

                        Object.keys(breakdown).forEach((installationType) => {
                            if (
                                breakdown[installationType] === {} ||
                                breakdown[installationType].power === undefined
                            ) {
                                console.warn(
                                    "Slide power source, finding highest source of poweer, installation",
                                    installationType,
                                    "is not defined or has no power field"
                                );
                                delete copyOfData[i].breakdown[installationType];
                            }
                        });
                    });

                    data = copyOfData;

                    let now = moment().valueOf();
                    data = data.filter((element) => {
                        return moment(element.datetime).valueOf() < now;
                    });
                    // Remove the last one (likely 0)
                    // https://github.com/PETILLON-Sebastien/facteurs_charge/issues/53
                    // data.pop();
                    // data.pop();
                    // data.pop();
                    // ------------------------------------------------------------------------
                    // resolve(data);
                    Server.sleep(300).then(() => resolve(data));
                }
            );
        });
    }

    static getLoadsBreakdown(ISOZoneId) {
        return new Promise((resolve) => {
            const targetUrl =
                root_endpoint + "/zones/" + ISOZoneId + "/installations/breakdown";
            console.log("Fetching loads", targetUrl);

            async.waterfall(
                [
                    (cb) => {
                        fetch(targetUrl).then((rawData) => cb(null, rawData));
                    },
                    (rawData, cb) => {
                        rawData.json().then((data) => cb(null, data));
                    },
                ],
                (err, data) => {
                    let i = 0,
                        j = 0;

                    for (i = 0; i < data.length; i++) {
                        let currentBreakdown = data[i].breakdown;
                        let keys = Object.keys(currentBreakdown);
                        for (j = 0; j < keys.length; j++) {
                            const currentKey = keys[j];

                            // PATCH https://github.com/PETILLON-Sebastien/facteurs_charge/issues/58
                            // if (currentKey == "nuclear") {
                            //     delete data[i].breakdown["nuclear"];
                            //     continue;
                            // }
                            const currentLoad = currentBreakdown[currentKey];
                            if (currentLoad == undefined) {
                                console.warn(
                                    "Given breakdown does not contains information for",
                                    currentKey
                                );
                                currentBreakdown[currentKey] = {};
                                currentBreakdown[currentKey].load.value = -1;
                            } else if (currentLoad.load == undefined) {
                                console.warn(
                                    "Given breakdown does not contains information for the 'load' of",
                                    currentKey
                                );
                                currentBreakdown[currentKey].load = {};
                                currentBreakdown[currentKey].load.value = -1;
                            } else {
                                currentLoad = currentLoad.load.value;
                                const updatedLoad = currentLoad * 100;
                                currentBreakdown[currentKey].load.value = updatedLoad;
                            }
                        }
                    }
                    Server.sleep(200).then(() => resolve(data));

                    // resolve(data);
                }
            );
        });
    }

    static getLoadsForAllZones() {
        return new Promise((resolve) => {
            const targetUrl =
                root_endpoint + "/zones/installations/load/last?filter=highest";
            console.log("Fetching last loads", targetUrl);

            async.waterfall(
                [
                    (cb) => {
                        fetch(targetUrl).then((rawData) => cb(null, rawData));
                    },
                    (rawData, cb) => {
                        rawData.json().then((data) => cb(null, data));
                    },
                ],
                (err, data) => {
                    let i = 0;

                    let result = {};

                    for (i = 0; i < data.length; i++) {
                        let currentData = data[i];
                        result[currentData.zoneId] = currentData.snapshots[0].highest;
                    }
                    Server.sleep(500).then(() => resolve(data));
                    // resolve(data);
                }
            );
        });
    }
    static sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}