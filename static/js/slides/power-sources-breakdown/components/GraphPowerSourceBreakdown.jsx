import React, { createRef } from "react";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

let that;

class ProductionBySourcesGraph extends React.Component {

    constructor(props) {
        super(props);
        that = this;
        this.chart = createRef();
    }

    shouldComponentUpdate(nextProps, nextState) {
        // return nextProps.donnees != this.props.donnees || nextProps.actionsVisibles != this.props.actionsVisibles;
        return true; 
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
        console.log(this.props);
    
        const currentZoneName = this.props.currentZoneName;

        const dataArray = this.props.productionsOverTime;
        let productionsArrayPerSource = {};

        // For each moment in time in the data
        dataArray.forEach((datedData) => {
            const currentBreakdown = datedData.breakdown;

            // For each type of production recorded that moment
            Object.keys(currentBreakdown).forEach((typeOfSource) => {
                let overallProductionsForCurrentSource = productionsArrayPerSource[typeOfSource] || [];

                // Add the value of production of this source for the given time
                const productionOfThisSourceThatDay = currentBreakdown[typeOfSource].power.value;
                const date = moment(datedData.datetime).valueOf();
                overallProductionsForCurrentSource.push([date, productionOfThisSourceThatDay]);
                productionsArrayPerSource[typeOfSource] = overallProductionsForCurrentSource;
            });
        });

        console.log(productionsArrayPerSource);


        let series = [
            {
                name: "Photovoltaïque",
                stack: 0,
                color: "rgb(242, 116, 6)",
                data: productionsArrayPerSource.solar
            },
            {
                name: "Éolien",
                stack: 0,
                color: "rgb(116, 205, 185)",
                data: productionsArrayPerSource.wind
            },
            {
                name: "Hydraulique",
                stack: 0,
                color: "rgb(39, 114, 178)",
                data: productionsArrayPerSource.hydraulic
            },
            {
                name: "Bioénergies",
                stack: 0,
                color: "rgb(22, 106, 87)",
                data: productionsArrayPerSource.bioenergy
            },
            {
                name: "Fossile",
                stack: 0,
                color: "rgb(134, 125, 102)",
                data: productionsArrayPerSource.thermal
            },
            {
                name: "Nucléaire",
                stack: 0,
                color: "rgb(174, 184, 0)",
                data: productionsArrayPerSource.nuclear
            }
        ];

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
                    text: 'Production'
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
            chart: {
                height: 260,

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
                <span>Répartition de la production en <span className="has-background-grey text-inline-highlighted">{currentZoneName}</span> </span>
                <HighchartsReact options={config} ref={this.chart}></HighchartsReact>
            </div>
            // <h1>test?</h1>
        );
    }
}

export default ProductionBySourcesGraph;