var fs = require("fs");
moment = require("moment");
exporter = require("highcharts-export-server");
moment.locale('fr');

function pad3(num){ return ('000' + num).substr(-3); }

var exporter_jour = function(date) { 
    var charts = [];
    var donnees = require('../donnees/donnees_' + date.format("YYYY-MM-DD") + '.json');
    var tailleTotale = donnees[0].evolution.length;

    for(var i = 0; i < tailleTotale; i++) {
        let donnee = donnees[0].evolution[i];
        let moment_date =  moment(donnee["date_heure"]);
        let date = moment_date.valueOf();
        let chartDetails = {
            type: "png",
            options: {
                exporting: {
                    sourceWidth: 1080,
                    sourceHeight: 720
                },
                chart: {
                    type: "column",
                    backgroundColor: "#222",
                    legend: {
                        itemStyle: { "color": "#FFF"}
                    }
                },
                legend: {
                    itemStyle: {
                        color: '#FFF'
                    }
                },
                yAxis: [
                    {
                        title: {
                            text: 'Consommation (GW)',
                            style: { "color": "#FFF"}
                        },
                        max: 100,
                        min: -20,
                        tickAmount: 7,
                        tickInterval: 20,
                        labels: {
                            enabled: true,
                            style: { "color": "#FFF"},
                        }
                    },
                    {
                        title: {
                            text: 'Taux de charge (%)',
                            style: { "color": "#FFF"}
                        },
                        max: 100,
                        min: -20,
                        tickAmount: 7,
                        tickInterval: 20,
                        opposite: true,
                        labels: {
                            enabled: true,
                            style: { "color": "#FFF"},
                            formatter: function () {
                                if(this.value >= 0) {
                                    return this.value;
                                }
                                return undefined;
                            }
                        }
                    }
                ],
                xAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    }
                },
                title: {
                    text: "Réseau électrique français, " + moment_date.format("MMMM YYYY"),
                    style: { "color": "#FFF"}
                },
                subtitle: {
                    text: "facteurs-charge.fr : (6h/s) : " + moment_date.format("dddd DD/MM/YYYY HH:mm"),
                    style: { "color": "#FFF"}
                },
                plotOptions: {
                },
                series: [
                    {
                        name: "Nucléaire",
                        color: "rgba(174, 184, 0, 0.3)",
                        data: []
                    },
                    {
                        name: "Taux Nucléaire",
                        color: "rgb(174, 184, 0)",
                        data: [],
                        yAxis: 1
                    },
                    {
                        name: "Hydraulique",
                        color: "rgba(39, 114, 178, 0.3)",
                        data: []
                    },
                    {
                        name: "Taux Hydraulique",
                        color: "rgb(39, 114, 178)",
                        data: [],
                        yAxis: 1
                    },
                    {
                        name: "Photovoltaïque",
                        color: "rgba(242, 116, 6, 0.3)",
                        data: []
                    },
                    {
                        name: "Taux Photovoltaïque",
                        color: "rgb(242, 116, 6)",
                        data: [],
                        yAxis: 1
                    },
                    {
                        name: "Éolien",
                        color: "rgba(116, 205, 185, 0.3)",
                        data: []
                    },
                    {
                        name: "Taux Éolien",
                        color: "rgb(116, 205, 185)",
                        data: [],
                        yAxis: 1
                    },
                    {
                        name: "Bioénergies",
                        color: "rgba(22, 106, 87, 0.3)",
                        data: []
                    },
                    {
                        name: "Taux Bioénergies",
                        color: "rgb(22, 106, 87)",
                        data: [],
                        yAxis: 1
                    },
                    {
                        name: "Fossile",
                        color: "rgba(134, 125, 102, 0.3)",
                        data: []
                    },
                    {
                        name: "Taux Fossile",
                        color: "rgb(134, 125, 102)",
                        data: [],
                        yAxis: 1
                    },
                    {
                        name: "Pompage hydraulique",
                        color: "rgb(39, 114, 255)",
                        data: []
                    },
                    {
                        name: "Echanges",
                        stack: 0,
                        color: "rgb(0, 0, 0)",
                        data: []
                    },
                    {
                        name: "Consommation",
                        color: "rgb(0, 0, 0)",
                        data: []
                    }
                ]
            }
        };

        chartDetails.options.series[0].data.push([donnee["nucleaire"] / 1000]);
        chartDetails.options.series[1].data.push([donnee["tch_nucleaire"]]);
        chartDetails.options.series[2].data.push([donnee["hydraulique"] / 1000]);
        chartDetails.options.series[3].data.push([donnee["tch_hydraulique"]]);
        chartDetails.options.series[4].data.push([donnee["solaire"] / 1000]);
        chartDetails.options.series[5].data.push([donnee["tch_solaire"]]);
        chartDetails.options.series[6].data.push([donnee["eolien"] / 1000]);
        chartDetails.options.series[7].data.push([donnee["tch_eolien"]]);
        chartDetails.options.series[8].data.push([donnee["bioenergies"] / 1000]);
        chartDetails.options.series[9].data.push([donnee["tch_bioenergies"]]);
        chartDetails.options.series[10].data.push([donnee["thermique"] / 1000]);
        chartDetails.options.series[11].data.push([donnee["tch_thermique"]]);
        chartDetails.options.series[12].data.push([donnee["pompage"] / 1000]);
        chartDetails.options.series[13].data.push([donnee["ech_physiques"] / 1000]);
        chartDetails.options.series[14].data.push([donnee["consommation"] / 1000]);
        charts.push(chartDetails);
    }

    let promises = [];

    exporter.initPool({
        maxWorkers: 256,
        initialWorkers: 8,
        workLimit: 4 * 24 * 31,
        queueSize: 4 * 24 * 31,
        timeoutThreshold: 120000
    });

    charts.forEach((chart, i) => {
        promises.push(
            new Promise((resolve, reject) => {
                exporter.export(chart, (err, res) => {
                    if (err) return reject(err);
                    let imageb64 = res.data;
                    let outputFile = "images_generees/" + date.format("YYYY-MM-DD") + "_" + pad3(i) + ".png";
                    fs.writeFileSync(outputFile, imageb64, "base64", function(err) {
                        if (err) console.log(err);
                    });
                    resolve();
                });
            })
        );
    });

    return Promise.all(promises)
    .then(() => {
        exporter.killPool();
        return Promise.resolve();
    })
    .catch(e => {
        console.log(e);
        exporter.killPool();
        return Promise.reject(e);
    });
}

exports.exporter_jour = exporter_jour;

exporter_jour(new moment("2020-02-01"));