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
        productionsOverTime.forEach((p) => {
            productionsSerie.push(p.installation.production.value);
        });

        let consumptionsSerie = [];
        consumptionsOverTime.forEach((c) => {
            consumptionsSerie.push(- c.description.used.value - c.description.stepStorage.value);
        });

        let exportationsSerie = [];
        exportationsOverTime.forEach((e) => {
            exportationsSerie.push(- e.description.value);
        });

        let importationsSerie = [];
        importationsOverTime.forEach((c) => {
            importationsSerie.push(c.description.value);
        });

        let categories = [];
        importationsOverTime.forEach((i) => {
            categories.push(moment(i.datetime).format("HH:mm"));
        });

        let apports = [];
        importationsOverTime.forEach((i, index) => {
            apports.push(i.description.value + productionsSerie[index]);
        });


        let retraits = [];
        consumptionsOverTime.forEach((i, index) => {
            retraits.push(-i.description.used.value + exportationsSerie[index]);
        });

        console.log(apports);

        let series = [

            {
                name: "Apports",
                stack: 0,
                color: 'rgba(255,0,0,0.5)',
                fillColor: 'rgba(255,0,0,0.3)',
                                data: apports,
                type:'areaspline'
            },

            // {
            //     name: "Retraits",
            //     stack: 5,
            //     color: 'rgba(0,0,0,0)',
            //     fillColor: 'rgba(0,0,255,0.3)',
            //                     data: retraits,
            //     type:'areaspline'
            // },
            // {
            //     name: "Consommation",
            //     stack: 0,
            //     color: "#ecf0f1",
            //     data: consumptionsSerie,
            //     type:'spline'

            // },
            // {
            //     name: "Exportation",
            //     stack: 1,
            //     color: "#3298dc",
            //     data: exportationsSerie,
            //     type:'spline'
            // },
            {
                name: "Importation",
                stack: 1,
                color: "#f1d63b",
                data: importationsSerie,
                type:'spline'
            }, {
                name: "Production locale",
                stack: 2,
                color: "#fca440",
                data: productionsSerie,
                type:'spline'
            }
        ];

        let config = {
            chart: {
                type: 'areaspline',
                color: "#fff",
                backgroundColor: "#0f0f0f",
                height: (9 / 16 * 65) + '%',
                annotations: [{
                    labelOptions: {
                        style: { "color": "#fff" }
                    }
                }],
            },
            yAxis: {
                tickColor: '#fff',
                labels: {
                    style: {
                        color: '#fff',
                        font: '11px Trebuchet MS, Verdana, sans-serif'
                    }
                },
            },
            title: {
                text: '',
                style: {
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                }
            },
            legend: {
                itemStyle: {
                   font: '8pt Trebuchet MS, Verdana, sans-serif',
                   color: '#ccc'
                },
                itemHoverStyle: {
                   color: '#FFF'
                },
                itemHiddenStyle: {
                   color: '#444'
                }
             
          },
            xAxis: {
                categories: ['7:00', '10:00', '12:00', '15:00', '18:00'],
                labels: {
                    style: {
                        color: '#fff',
                        font: '11px Trebuchet MS, Verdana, sans-serif'
                    }
                },

            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: series,
            responsive: {
                rules: [{
                    condition: {
                        maxHeight: 50,

                    },
                    chartOptions: {
                        yAxis: {
                            title: {
                                text: "Valeur (GW)"
                            }
                        }
                    }
                }]
            }
        }
        return (
            <div className="chart-wrapping">
                <span>Provenance de l'énergie en <span className="has-background-grey text-inline-highlighted">{currentZoneName}</span> </span>
                <ReactHighcharts config={config} ref={this.chart}></ReactHighcharts>
            </div>
            // <h1>test?</h1>
        );
    }
}

export default ProductionBySourcesGraph;