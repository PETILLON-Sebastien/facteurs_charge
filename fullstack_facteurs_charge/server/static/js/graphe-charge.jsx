import React, { createRef } from "react";
import ReactHighcharts from "react-highcharts";
import moment from "moment";

let that;

class GrapheCharge extends React.Component {

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

    redessiner() {
        that.chart.current.chart.redraw();
    }

    render() {
        let series = [
            {
                name: "Photovoltaïque",
                color: "rgb(242, 116, 6)",
                type: "spline",
                data: []
            },
            {
                name: "Éolien",
                color: "rgb(116, 205, 185)",
                type: "spline",
                data: []
            },
            {
                name: "Hydraulique",
                color: "rgb(39, 114, 178)",
                type: "spline",
                data: []
            },
            {
                name: "Nucléaire",
                color: "rgb(174, 184, 0)",
                type: "spline",
                data: []
            },
            {
                name: "Bioénergies",
                color: "rgb(22, 106, 87)",
                type: "spline",
                data: []
            },
            {
                name: "Fossile",
                color: "rgb(134, 125, 102)",
                type: "spline",
                data: []
            }
        ];

        for(let index in this.props.donnees) {
            let donnee = this.props.donnees[index];
            let date = moment(donnee["date_heure"]).valueOf();
            series[0].data.push([date, Math.round(donnee["tch_solaire"] * 100) / 100]);
            series[1].data.push([date, Math.round(donnee["tch_eolien"] * 100) / 100]);
            series[2].data.push([date, Math.round(donnee["tch_hydraulique"] * 100) / 100]);
            series[3].data.push([date, Math.round(donnee["tch_nucleaire"] * 100) / 100]);
            series[4].data.push([date, Math.round(donnee["tch_bioenergies"] * 100) / 100]);
            series[5].data.push([date, Math.round(donnee["tch_thermique"] * 100) / 100]);
        }

        let heure_courante = moment(this.props.donnees[this.props.index_temps]["date_heure"]).valueOf();
        
        this.config = {
            title: {
                text: ''
            },
            tooltip: {
                split: true,
                valueSuffix: ' %'
            },
            yAxis: {
                title: {
                    text: 'Taux de charge (%)'
                },
                tickAmount: 0,
                min: 0,
                max: 100
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Heure'
                },
                plotLines: [{
                    color: '#FFF',
                    width: 1,
                    value: heure_courante
                }]
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: false
                    }
                },
                series: {
                    label: {
                        connectorAllowed: false
                    },
                }
            },
            time: {
                timezoneOffset: -60
            },
            chart: {
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
                <span>Taux de charge</span>
                <ReactHighcharts config = {this.config} ref={this.chart}></ReactHighcharts>
            </div>
        );
    }
}

export default GrapheCharge;