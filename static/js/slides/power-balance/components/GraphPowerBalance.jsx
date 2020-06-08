import React, { createRef } from "react";
import ReactHighcharts from "react-highcharts";
import moment from "moment";

import _config from './graph-config.js';
let config = {};
Object.assign(config, _config);


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


        let series = [
            {
                name: "Apports",
                stack: 0,
                color: 'rgba(255,0,0,0.5)',
                fillColor: 'rgba(255,0,0,0.3)',
                data: apports,
                type: 'areaspline'
            },
            {
                name: "Importation",
                stack: 1,
                color: "#f1d63b",
                data: importationsSerie,
                type: 'spline'
            }, {
                name: "Production locale",
                stack: 2,
                color: "#fca440",
                data: productionsSerie,
                type: 'spline'
            }
        ];

        let chartConfiguration = config;
        chartConfiguration.chart.type = 'areaspline';
        chartConfiguration.chart.height = (9 / 16 * 60) + '%';
        chartConfiguration.xAxis.categories = categories;
        chartConfiguration.series = series;


        return (
            <div className="chart-wrapping">
                <span>Provenance de l'énergie en <span className="has-background-grey text-inline-highlighted">{currentZoneName}</span> </span>
                <ReactHighcharts config={chartConfiguration} ref={this.chart}></ReactHighcharts>
            </div>
        );
    }
}

export default ProductionBySourcesGraph;