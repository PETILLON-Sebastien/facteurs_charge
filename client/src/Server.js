var async = require("async");
const api_url = process.env.REACT_APP_API_URL || "http://localhost:8080";
const root_endpoint = `${api_url}/api/v1`;

export default class Server {

    static convertDates(from, to) {
        return [new Date(from).toISOString(), new Date(to).toISOString()];
    }

    static getPowerSourcesBreakdown(ISOZoneId, from, to, callback, error) {
        [from, to] = this.convertDates(from, to);

        ISOZoneId = this.convertZoneID(ISOZoneId);


        // return new Promise((resolve) => {
        const targetUrl = `${root_endpoint}/zones/${ISOZoneId}/installations/production/breakdown?from=${from}&to=${to}`;
        console.log("Fetching power sources", targetUrl);
        async.waterfall(
            [
                (cb) => {
                    try {
                        fetch(targetUrl).then((rawData) => cb(null, rawData)).catch((e) => {
                            let message = `Failed to fetch server data when fetching ${targetUrl}.`
                            let stack = new Error(message).stack;
                            // e.stack = stack;
                            e.stack = stack.split('\n').slice(0, 2).join('\n') + '\n' + e.stack;
                            // throw e
                            error(e);
                        });
                    }
                    catch (err) {
                        cb(err);
                    }
                },
                (rawData, cb) => {
                    try {
                        rawData.json().then((data) => cb(null, data)).catch((e) => {
                            let message = `Failed to fetch server data when fetching ${targetUrl}.`
                            let stack = new Error(message).stack;
                            // e.stack = stack;
                            e.stack = stack.split('\n').slice(0, 2).join('\n') + '\n' + e.stack;
                            // throw e
                            error(e);
                        });
                    }
                    catch (err) {
                        cb(err);
                    }
                },
            ],
            (err, data) => {
                if (err) {
                    console.error("AIE");
                    error(err);
                    return;
                }
                // Sort data
                // ISSUE https://github.com/PETILLON-Sebastien/facteurs_charge/issues/52
                data.sort((breakdownA, breakdownB) => {
                    return (
                        new Date(breakdownA.datetime).valueOf() -
                        new Date(breakdownB.datetime).valueOf()
                    );
                });

                // Handling cases where the server does not send proper data
                let copyOfData = Object.assign(data);

                data.forEach((currentData, i) => {
                    const breakdown = currentData.breakdown;

                    Object.keys(breakdown).forEach((installationType) => {
                        if (
                            breakdown[installationType] === {} ||
                            breakdown[installationType].production === undefined
                        ) {
                            // FIXME IT THIS SUPPOSED TO BE .production OR .power ?!
                            console.warn(
                                "Slide power source, finding highest source of power, installation",
                                installationType,
                                "is not defined or has no production field"
                            );
                            // fall back to power field
                            breakdown[installationType].production = breakdown[installationType].power;
                            // delete copyOfData[i].breakdown[installationType];
                        }
                    });
                });

                data = copyOfData;

                let now = new Date().valueOf();
                data = data.filter((element) => {
                    return new Date(element.datetime).valueOf() < now;
                });
                // Remove the last one (likely 0)
                // https://github.com/PETILLON-Sebastien/facteurs_charge/issues/53
                // data.pop();
                // data.pop();
                // data.pop();
                // ------------------------------------------------------------------------
                callback(data);
                // Server.sleep(800).then(() => resolve(data));
            }
        );
        // });
    }

    static getLoadsBreakdown(ISOZoneId, from, to, callback, error) {
        [from, to] = this.convertDates(from, to);

        ISOZoneId = this.convertZoneID(ISOZoneId);

        // return new Promise((resolve) => {
        const targetUrl = `${root_endpoint}/zones/${ISOZoneId}/installations/breakdown?from=${from}&to=${to}`;
        console.log("Fetching loads", targetUrl);

        async.waterfall(
            [
                (cb) => {
                    try {
                        fetch(targetUrl).then((rawData) => cb(null, rawData)).catch((e) => {
                            let message = `Failed to fetch server data when fetching ${targetUrl}.`
                            let stack = new Error(message).stack;
                            // e.stack = stack;
                            e.stack = stack.split('\n').slice(0, 2).join('\n') + '\n' + e.stack;
                            // throw e
                            error(e);
                        });
                    }
                    catch (err) {
                        cb(err);
                    }
                },
                (rawData, cb) => {
                    try {

                        rawData.json().then((data) => cb(null, data)).catch((e) => {
                            let message = `Failed to fetch server data when fetching ${targetUrl}.`
                            let stack = new Error(message).stack;
                            // e.stack = stack;
                            e.stack = stack.split('\n').slice(0, 2).join('\n') + '\n' + e.stack;
                            // throw e
                            error(e);
                        });
                    }
                    catch (err) {
                        cb(err);
                    }
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
                        if (currentLoad === undefined) {
                            console.warn(
                                "Protocol Issue: the given breakdown does not contains information for",
                                currentKey
                            );

                            delete data[i].breakdown[currentKey];
                            currentBreakdown[currentKey].production = {};
                            currentBreakdown[currentKey].production.value = -1;


                        } else if (currentLoad.load === undefined) {
                            console.warn(
                                "Protocol Issue: the given breakdown does not contains 'load' field for",
                                currentKey
                            );
                            currentBreakdown[currentKey].load = {};
                            currentBreakdown[currentKey].load.value = -1;

                            if (currentLoad.production === undefined && currentLoad.power !== undefined) {
                                console.warn(`Protocol Issue: the breakdown of ${currentKey} had a power field and not a production field. Patching this to continue...`);
                                currentLoad.production = currentLoad.power;
                                currentLoad.capacity = currentLoad.power;
                                console.warn(`Current load: ${currentLoad}`);
                            }
                        } else {
                            const updatedLoad = currentLoad.load.value * 100;
                            currentBreakdown[currentKey].load.value = updatedLoad;
                        }
                    }
                }
                // Server.sleep(1500).then(() => resolve(data));
                // resolve(data);
                callback(data);
            }
        );
        // });
    }

    static getLoadsForAllZones(from, to, callback, error) {
        [from, to] = this.convertDates(from, to);
        const targetUrl = `${root_endpoint}/zones/installations/load/last?filter=highest&from=${from}&to=${to}`;
        console.log("Fetching last loads", targetUrl);

        async.waterfall(
            [
                (cb) => {
                    try {
                        fetch(targetUrl).then((rawData) => cb(null, rawData)).catch((e) => {
                            let message = `Failed to fetch server data when fetching ${targetUrl}.`
                            let stack = new Error(message).stack;
                            // e.stack = stack;
                            e.stack = stack.split('\n').slice(0, 2).join('\n') + '\n' + e.stack;
                            // throw e
                            error(e);
                        });
                    } catch (err) {
                        cb(err);
                    }
                },
                (rawData, cb) => {
                    try {
                        rawData.json().then((data) => cb(null, data)).catch((e) => {
                            let message = `Server returned data that can't be parsed when fetching ${targetUrl}.`
                            let stack = new Error(message).stack;
                            // e.stack = stack;
                            e.stack = stack.split('\n').slice(0, 2).join('\n') + '\n' + e.stack;
                            // throw e
                            error(e);
                        });
                    }
                    catch (err) {
                        cb(err);
                    }
                },
            ],
            (err, data) => {
                if (err) {
                    error(err);
                    return;
                }
                let i = 0;

                let result = {};

                for (i = 0; i < data.length; i++) {
                    let currentData = data[i];
                    result[currentData.zoneId] = currentData.snapshots[0].highest;
                }
                callback(data);
            }
        );
    }

    static convertZoneID(ISOZoneId) {
        // let currentZoneSelected = this.zonesDescription.find((element) => element.id == ISOZoneId);

        let result = "FR";

        if (ISOZoneId !== 0) {
            result = result.concat("-").concat(ISOZoneId);
        }

        return result;
    }
}

