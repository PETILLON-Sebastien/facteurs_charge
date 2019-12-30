import React, { createRef } from "react";
import ReactHighcharts from "react-highcharts";
import moment from "moment";

let that;

class GrapheProduction extends React.Component {

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
        let series = [
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
                name: "Bioénergies",
                color: "rgb(22, 106, 87)",
                data: []
            },
            {
                name: "Fossile",
                color: "rgb(134, 125, 102)",
                data: []
            },
            {
                name: "Nucléaire",
                color: "rgb(174, 184, 0)",
                data: []
            },
            {
                name: "Consommation",
                color: "rgb(0, 0, 0)",
                data: [],
                type: 'spline'
            },
            {
                name: "Echanges",
                color: "rgb(0, 0, 0)",
                fillOpacity: "0.4",
                data: []
            },
        ];

        for(let index in this.props.donnees) {
            let donnee = this.props.donnees[index];
            let date = moment(donnee["date_heure"]).valueOf();
            series[0].data.push([date, Math.round(donnee["solaire"] * 100) / 100]);
            series[1].data.push([date, Math.round(donnee["eolien"] * 100) / 100]);
            series[2].data.push([date, Math.round(donnee["hydraulique"] * 100) / 100]);
            series[3].data.push([date, Math.round(donnee["bioenergies"] * 100) / 100]);
            series[4].data.push([date, Math.round(donnee["thermique"] * 100) / 100]);
            series[5].data.push([date, Math.round(donnee["nucleaire"] * 100) / 100]);
            series[6].data.push([date, Math.round(donnee["consommation"] * 100) / 100]);
            series[7].data.push([date, Math.round(donnee["ech_physiques"] * 100) / 100]);
        }
        
        let heure_courante = moment(this.props.donnees[this.props.index_temps]["date_heure"]).valueOf();

        let config = {
            title: {
                text: ''
            },
            tooltip: {
                valueSuffix: ' MWh'
            },
            yAxis: {
                title: {
                    text: 'Production'
                },
                labels: {
                    formatter: function () {
                        if(this.value > 999 || this.value < 999) {
                            return Math.round(this.value / 10) / 100 + " GWh";
                        }
                        return this.value + " MWh";
                    }
                }
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
                marker: { enabled: false },
                stacking: 'normal',
                areaspline: {
                    stacking: 'areaspline',
                    lineColor: '#222',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#222'
                    }
                }
            },
            chart: {
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
                <span>Production</span>
                <ReactHighcharts config = {config} ref={this.chart}></ReactHighcharts>
            </div>
        );
    }
}

export default GrapheProduction;