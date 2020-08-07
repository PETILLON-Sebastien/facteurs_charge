import React, { createRef } from "react";
import HighchartsReact from "highcharts-react-official";
import PowerSourceStyleMap from '../../../power-sources/components/PowerSourceStyleMap.js';
import cssVar from '../../../../_sass/_variables.scss';

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
        const dataArray = this.props.loadsOverTime;
        let loadsArrayPerSource = {};

        // For each moment in time in the data
        dataArray.forEach((datedData) => {
            const currentBreakdown = datedData.breakdown;

            // For each type of installation recorded that moment
            Object.keys(currentBreakdown).forEach((typeOfSource) => {
                let overallLoadsForCurrentSource = loadsArrayPerSource[typeOfSource] || [];

                // Add the value of production of this source for the given time
                const productionOfThisSourceThatDay = currentBreakdown[typeOfSource].load.value;
                const date = moment(datedData.datetime).valueOf();
                overallLoadsForCurrentSource.push([date, productionOfThisSourceThatDay]);
                loadsArrayPerSource[typeOfSource] = overallLoadsForCurrentSource;
            });
        });

        console.log("Load array per source", loadsArrayPerSource);

        let series = [
            {
                name: new PowerSourceStyleMap("solar").name,
                stack: 0,
                color: cssVar.solar,
                data: loadsArrayPerSource.solar
            },
            {
                name: new PowerSourceStyleMap("wind").name,
                stack: 0,
                color: cssVar.wind,
                data: loadsArrayPerSource.wind
            },
            {
                name: new PowerSourceStyleMap("hydraulic").name,
                stack: 0,
                color: cssVar.hydraulic,
                data: loadsArrayPerSource.hydraulic
            },
            {
                name: new PowerSourceStyleMap("bioenergy").name,
                stack: 0,
                color: cssVar.bioenergy,
                data: loadsArrayPerSource.bioenergy
            },
            {
                name: new PowerSourceStyleMap("fossil").name,
                stack: 0,
                color: cssVar.fossil,
                data: loadsArrayPerSource.fossil
            },
            {
                name: new PowerSourceStyleMap("nuclear").name,
                stack: 0,
                color: cssVar.nuclear,
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
                <HighchartsReact options={config} ref={this.chart}></HighchartsReact>
            </div>
            // <h1>test?</h1>
        );
    }
}

export default LoadBySourcesGraph;