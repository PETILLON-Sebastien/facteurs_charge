import React, { createRef } from "react";
import ReactHighcharts from "react-highcharts";
import moment from "moment";

let that;

class LoadBySourcesGraph extends React.Component {

    constructor(props) {
        super(props);
        that = this;
        this.chart = createRef();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.donnees != this.props.donnees || nextProps.actionsVisibles != this.props.actionsVisibles;
    }

    modifierTemps(valeur) {
        that.chart.current.chart.update({
            xAxis: {
                plotLines: [{
                    color: '#FFF',
                    width: 1,
                    value: moment(this.props.donnees[valeur]["date_heure"]).valueOf()
                }]
            }
        });
    }

    render() {
  
        var sourcesSimples = ["solar", "wind", "hydraulic", "bioenergies", "thermal", "nuclear"];

        const dataArray = this.props.loadsOverTime;
        let loadsArrayPerSource = {};

        // For each moment in time in the data
        dataArray.forEach((datedData) => {

            // For each type of production recorded that moment
            Object.keys(datedData.load).forEach((typeOfSource) => {
                let overallLoadsForCurrentSource = loadsArrayPerSource[typeOfSource] || [];

                // Add the value of production of this source for the given time
                const productionOfThisSourceThatDay = datedData.load[typeOfSource].value;
                const date = moment(datedData.timestamp).valueOf();
                overallLoadsForCurrentSource.push([date, productionOfThisSourceThatDay]);
                loadsArrayPerSource[typeOfSource] = overallLoadsForCurrentSource;
            });
        });

        // console.log(loadsArrayPerSource);

        let series = [
            {
                name: "Photovoltaïque",
                stack: 0,
                color: "rgb(242, 116, 6)",
                data: loadsArrayPerSource.solar
            },
            {
                name: "Éolien",
                stack: 0,
                color: "rgb(116, 205, 185)",
                data: loadsArrayPerSource.wind
            },
            {
                name: "Hydraulique",
                stack: 0,
                color: "rgb(39, 114, 178)",
                data: loadsArrayPerSource.hydraulic
            },
            {
                name: "Bioénergies",
                stack: 0,
                color: "rgb(22, 106, 87)",
                data: loadsArrayPerSource.bioenergies
            },
            {
                name: "Fossile",
                stack: 0,
                color: "rgb(134, 125, 102)",
                data: loadsArrayPerSource.thermal
            },
            {
                name: "Nucléaire",
                stack: 0,
                color: "rgb(174, 184, 0)",
                data: loadsArrayPerSource.nuclear
            }
        ];

        // console.log(series);

        // for (let index in this.props.donnees) {
        //     let donnee = this.props.donnees[index];
        //     let date = moment(donnee["date_heure"]).valueOf();
        //     for (let i = 0; i < sourcesSimples.length; i++) {
        //         series[i].data.push([date, Math.round(donnee[sourcesSimples[i]])]);
        //     }
        // }

        // let heure_courante = moment(this.props.donnees[this.props.index_temps]["date_heure"]).valueOf();

        let config = {
            title: {
                text: ''
            },
            tooltip: {
                valueSuffix: ' MW'
            },
            yAxis: {
                title: {
                    text: 'Charge'
                },
                labels: {
                    formatter: function () {
                        if (this.value > 999 || this.value < 999) {
                            return Math.round(this.value / 10) / 100 + " GW";
                        }
                        return this.value + " MW";
                    },
                    style: {
                        color: "#ffffff"
                    }
                }
            },
            xAxis: {
                type: 'datetime',
            //     title: {
            //         text: 'Heure'
            //     },
            //     // plotLines: [{
            //     //     color: '#FFF',
            //     //     width: 1,
            //     //     value: heure_courante
            //     // }],
                labels: {
                    style: {
                        color: "#ffffff"
                    }
                }
            },
            legend: {
                enabled: false
            },
            // plotOptions: {
            //     series: {
            //         connectNulls: true
            //     },
            //     stacking: 'normal',
            //     areaspline: {
            //         stacking: 'areaspline',
            //         lineColor: '#222',
            //         lineWidth: 1,
            //         marker: {
            //             lineWidth: 1,
            //             lineColor: '#222',
            //             enabled: false
            //         }
            //     },
            //     spline: {
            //         marker: {
            //             lineWidth: 1,
            //             lineColor: '#222',
            //             enabled: false
            //         }
            //     }
            // },
            time: {
                timezoneOffset: -60
            },
            chart: {        height: 280,

                // type: 'areaspline',
                // stacking: 'normal',
                backgroundColor: "rgba(0,0,0,0)"
            },
            series: series,
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        yAxis: {
                            title: {
                                text: null
                            }
                        }
                    }
                }]
            }
        }
        return (
            <div className="chart-wrapping">
                <span>Facteurs de charge</span>
                <ReactHighcharts config={config} ref={this.chart}></ReactHighcharts>
            </div>
            // <h1>test?</h1>
        );
    }
}

export default LoadBySourcesGraph;