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
                stack: 0,
                color: "rgb(242, 116, 6)",
                data: []
            },
            {
                name: "Éolien",
                stack: 0,
                color: "rgb(116, 205, 185)",
                data: []
            },
            {
                name: "Hydraulique",
                stack: 0,
                color: "rgb(39, 114, 178)",
                data: []
            },
            {
                name: "Bioénergies",
                stack: 0,
                color: "rgb(22, 106, 87)",
                data: []
            },
            {
                name: "Fossile",
                stack: 0,
                color: "rgb(134, 125, 102)",
                data: []
            },
            {
                name: "Nucléaire",
                stack: 0,
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
                name: "Pompage hydraulique",
                stack: 1,
                color: "rgb(39, 114, 178)",
                data: []
            },
            {
                name: "Imports",
                stack: 0,
                color: "rgb(0, 0, 0)",
                data: []
            },
            {
                name: "Exports",
                stack: 1,
                color: "rgb(0, 0, 0)",
                data: []
            },
        ];

        var sourcesSimples = ["solaire", "eolien", "hydraulique", "bioenergies", "thermique", "nucleaire", "consommation", "pompage"];
        for(let index in this.props.donnees) {
            let donnee = this.props.donnees[index];
            let date = moment(donnee["date_heure"]).valueOf();
            for(let i = 0; i < sourcesSimples.length; i++) {
                series[i].data.push([date, Math.round(donnee[sourcesSimples[i]])]);
            }
            let echanges = Math.round(donnee["ech_physiques"]);
            if(echanges > 0) {
                series[8].data.push([date, Math.round(donnee["ech_physiques"])]);
                series[9].data.push([date, null]);
            } else {
                series[8].data.push([date, null]);
                series[9].data.push([date, Math.round(donnee["ech_physiques"])]);
            }
        }
        
        
        let heure_courante = moment(this.props.donnees[this.props.index_temps]["date_heure"]).valueOf();

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
                        if(this.value > 999 || this.value < 999) {
                            return Math.round(this.value / 10) / 100 + " GW";
                        }
                        return this.value + " MW";
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
                <span>Production & Consommation</span>
                <ReactHighcharts config = {config} ref={this.chart}></ReactHighcharts>
            </div>
        );
    }
}

export default GrapheProduction;