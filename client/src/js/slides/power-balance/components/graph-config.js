
let config = {
    chart: {
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
        labels: {
            style: {
                color: '#fff',
                font: '11px Trebuchet MS, Verdana, sans-serif'
            }
        },

    },
    yAxis: {
        title: {
            text: "Valeur (GW)"
        },
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
    responsive: {
        rules: [{
            condition: {
                maxHeight: 50
            }
        }]
    }
}

export default config;