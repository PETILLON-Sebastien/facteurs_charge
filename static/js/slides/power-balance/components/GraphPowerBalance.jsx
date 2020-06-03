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

        let series = [

            {
                name: "Consommation",
                stack: 0,
                color: "#ecf0f1",
                data: consumptionsSerie
            },
            {
                name: "Exportation",
                stack: 0,
                color: "#3298dc",
                data: exportationsSerie
            },
            {
                name: "Importation",
                stack: 1,
                color: "#2ecc71",
                data: importationsSerie
            }, {
                name: "Production",
                stack: 1,
                color: "#f1b70e",
                data: productionsSerie
            }
        ];

        let config = {
            chart: {
                type: 'area',
                color: "#fff",
                backgroundColor: "#0f0f0f",
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
                        maxHeight: 100,

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
                <span>Balance énergétique en <span className="has-background-grey text-inline-highlighted">{currentZoneName}</span> </span>
                <ReactHighcharts config={config} ref={this.chart}></ReactHighcharts>
            </div>
            // <h1>test?</h1>
        );
    }
}

export default ProductionBySourcesGraph;