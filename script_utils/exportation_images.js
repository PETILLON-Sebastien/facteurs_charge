var donnees = require('../donnees/donnees_2020-02-01.json'),
fs = require("fs");
moment = require("moment");
chartExporter = require("highcharts-export-server");
moment.locale('fr');

chartExporter.initPool();

for(var i = 0; i < donnees[0].evolution.length; i++) {
    let donnee = donnees[0].evolution[i];
    let moment_date =  moment(donnee["date_heure"]);
    let date = moment_date.valueOf();
    var chartDetails = {
        type: "png",
        options: {
            chart: {
                type: "column"
            },
            yAxis: {
                title: {
                    text: 'Taux de charge (%)'
                },
                max: 100
            },
            xAxis: {
                title: {
                    text: null
                },
                labels: {
                    enabled: false
                }
            },
            title: {
                text: moment_date.format("dddd DD/MM/YYYY HH:mm")
            },
            plotOptions: {
            },
            series: [
                {
                    name: "Photovoltaïque",
                    color: "rgb(242, 116, 6)",
                    data: []
                },
                {
                    name: "Éolien",
                    color: "rgb(116, 205, 185)",
                    data: []
                },
                {
                    name: "Hydraulique",
                    color: "rgb(39, 114, 178)",
                    data: []
                },
                {
                    name: "Nucléaire",
                    color: "rgb(174, 184, 0)",
                    data: []
                },
                {
                    name: "Bioénergies",
                    color: "rgb(22, 106, 87)",
                    data: []
                },
                {
                    name: "Fossile",
                    color: "rgb(134, 125, 102)",
                    data: []
                }
            ]
        }
    };

    chartDetails.options.series[0].data.push([date, Math.round(donnee["tch_solaire"] * 100) / 100]);
    chartDetails.options.series[1].data.push([date, Math.round(donnee["tch_eolien"] * 100) / 100]);
    chartDetails.options.series[2].data.push([date, Math.round(donnee["tch_hydraulique"] * 100) / 100]);
    chartDetails.options.series[3].data.push([date, Math.round(donnee["tch_nucleaire"] * 100) / 100]);
    chartDetails.options.series[4].data.push([date, Math.round(donnee["tch_bioenergies"] * 100) / 100]);
    chartDetails.options.series[5].data.push([date, Math.round(donnee["tch_thermique"] * 100) / 100]);

    chartExporter.export(chartDetails, (err, res) => {
        if(err) {
            console.log(err);
        } else {
            // Get the image data (base64)
            let imageb64 = res.data;
            // Filename of the output
            let outputFile = "images_generees/" + moment_date.format("YYYY-MM-DD-HH-mm") + ".png";
            // Save the image to file
            fs.writeFileSync(outputFile, imageb64, "base64", function(err) {
                if (err) console.log(err);
            });
        }
    });
}
// chartExporter.killPool();