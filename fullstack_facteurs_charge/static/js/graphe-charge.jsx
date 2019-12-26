import React from "react";
import ReactHighcharts from "react-highcharts";
import moment from "moment";

class GrapheCharge extends React.Component {

    constructor(props) {
        super(props);
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
        
        let config = {
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
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                }
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
                <ReactHighcharts config = {config}></ReactHighcharts>
            </div>
        );
    }
}

export default GrapheCharge;