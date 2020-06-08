import React, { createRef } from "react";
import ReactHighcharts from "react-highcharts";
import moment from "moment";
import cssVar from '../../../../_sass/_variables.scss';


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

        console.log(apports);

        let series = [
            {
                name: "Retraits",
                stack: 0,
                color: 'rgba(50,9,230,0.5)',
                fillColor: cssVar.darkBlueBackgroundRGBA,
                                data: retraits,
                type:'areaspline'
            },
            {
                name: "Consommation locale",
                stack: 1,
                color: cssVar.blueBackground,
                data: consumptionsSerie,
                type:'spline'

            },
            {
                name: "Exportation",
                stack: 2,
                color: cssVar.lightBlueBackground,
                data: exportationsSerie,
                type:'spline'
            }
        ];

        let chartConfiguration = config;
        chartConfiguration.chart.type = 'areaspline';
        chartConfiguration.chart.height = (9 / 16 * 60) + '%';
        chartConfiguration.xAxis.categories = categories;
        chartConfiguration.series = series;


        return (
            <div className="chart-wrapping">
                <span>Destination de l'énergie en <span className="has-background-grey text-inline-highlighted">{currentZoneName}</span> </span>
                <ReactHighcharts config={chartConfiguration} ref={this.chart}></ReactHighcharts>
            </div>
            // <h1>test?</h1>
        );
    }
}

export default ProductionBySourcesGraph;