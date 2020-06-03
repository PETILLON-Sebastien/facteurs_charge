import React, { createRef } from "react";
import ReactHighcharts from "react-highcharts";
import moment from "moment";

let that;

class ProductionBySourcesGraph extends React.Component {

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

        const currentZoneName = this.props.currentZoneName;

        const productionsOverTime = this.props.productionsOverTime;
        const consumptionsOverTime = this.props.consumptionsOverTime;
        const importationsOverTime = this.props.importationsOverTime;
        const exportationsOverTime = this.props.exportationsOverTime;
    
        let productionsSerie = [];
        productionsOverTime.forEach( (p) => {
            productionsSerie.push(p.installation.production.value);
        });

        let consumptionsSerie = [];
        consumptionsOverTime.forEach( (c) => {
            consumptionsSerie.push(- c.description.used.value - c.description.stepStorage.value);
        });

        let exportationsSerie = [];
        exportationsOverTime.forEach( (e) => {
            exportationsSerie.push(- e.description.value);
        });

        let importationsSerie = [];
        importationsOverTime.forEach( (c) => {
            importationsSerie.push(c.description.value);
        });
        console.log(importationsOverTime);

        let series = [
            {
                name: "Production",
                stack: 0,
                color: "rgb(242, 116, 6)",
                data: productionsSerie
            },
            {
                name: "Consommation",
                stack: 0,
                color: "rgb(116, 205, 185)",
                data: consumptionsSerie
            },
            {
                name: "Exportation",
                stack: 0,
                color: "rgb(39, 114, 178)",
                data: exportationsSerie
            },
            {
                name: "Importation",
                stack: 0,
                color: "rgb(22, 106, 87)",
                data: importationsSerie
            }
        ];

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
                    // formatter: function () {
                    //     if (this.value > 999 || this.value < 999) {
                    //         // return Math.round(this.value / 10) / 100 + " GW";
                    //     }
                    //     return this.value + " MW";
                    // },
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
            plotOptions: {
                series: {
                    connectNulls: true
                },
                stacking: 'normal',
                areaspline: {
                    stacking: 'areaspline',
                    lineColor: '#222',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#222',
                        enabled: false
                    }
                },
                spline: {
                    marker: {
                        lineWidth: 1,
                        lineColor: '#222',
                        enabled: false
                    }
                }
            },
            time: {
                timezoneOffset: -60
            },
            chart: {
                height: 260,

                type: 'areaspline',
                stacking: 'normal',
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
                <span>Balance énergétique en <span className="has-background-grey text-inline-highlighted">{currentZoneName}</span> </span>
                <ReactHighcharts config={config} ref={this.chart}></ReactHighcharts>
            </div>
            // <h1>test?</h1>
        );
    }
}

export default ProductionBySourcesGraph;