import React from "react";
import ReactHighcharts from "react-highcharts";
import moment from "moment";

class GrapheProduction extends React.Component {

    constructor(props) {
        super(props);
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
                name: "Nucléaire",
                color: "rgb(174, 184, 0)",
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
            }
        ];

        for(let index in this.props.donnees) {
            let donnee = this.props.donnees[index];
            let date = moment(donnee["date_heure"]).valueOf();
            series[0].data.push([date, Math.round(donnee["solaire"] * 100) / 100]);
            series[1].data.push([date, Math.round(donnee["eolien"] * 100) / 100]);
            series[2].data.push([date, Math.round(donnee["hydraulique"] * 100) / 100]);
            series[3].data.push([date, Math.round(donnee["nucleaire"] * 100) / 100]);
            series[4].data.push([date, Math.round(donnee["bioenergies"] * 100) / 100]);
            series[5].data.push([date, Math.round(donnee["thermique"] * 100) / 100]);
        }
        
        let config = {
            title: {
                text: ''
            },
            tooltip: {
                split: true,
                valueSuffix: ' MWh'
            },
            yAxis: {
                title: {
                    text: 'Production'
                },
                min: 0,
                labels: {
                    formatter: function () {
                        if(this.value > 999) {
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
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    stacking: 'areaspline',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
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
                <ReactHighcharts config = {config}></ReactHighcharts>
            </div>
        );
    }
}

export default GrapheProduction;