import React, { createRef } from "react";
import HighchartsReact from "highcharts-react-official";
import cssVar from "../../../_sass/_variables.scss";
import l from "./titt.scss";
import PowerSourceStyleMap from "../../../power-sources/components/PowerSourceStyleMap.js";

let that;

class ProductionBySourcesGraph extends React.Component {
  constructor(props) {
    console.log("LLLLL", l);
    super(props);
    that = this;
    this.chart = createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // return nextProps.donnees != this.props.donnees || nextProps.actionsVisibles != this.props.actionsVisibles;
    return true;
  }

  modifierTemps(valeur) {
    that.chart.current.chart.update({
      xAxis: {
        plotLines: [
          {
            color: "#FFF",
            width: 1,
            value: new Date(this.props.donnees[valeur]["date_heure"]).valueOf(),
          },
        ],
      },
    });
  }

  render() {
    const currentZoneName = this.props.currentZoneName;

    let dataArray = this.props.productionsOverTime;

    let productionsArrayPerSource = {};

    // For each moment in time in the data
    dataArray.forEach((datedData) => {
      const currentBreakdown = datedData.breakdown;

      // For each type of production recorded that moment
      Object.keys(currentBreakdown).forEach((typeOfSource) => {
        let overallProductionsForCurrentSource =
          productionsArrayPerSource[typeOfSource] || [];

        // Add the value of production of this source for the given time
        const productionOfThisSourceThatDay =
          currentBreakdown[typeOfSource].power.value;
        const date = new Date(datedData.datetime).valueOf();
        overallProductionsForCurrentSource.push([
          date,
          productionOfThisSourceThatDay,
        ]);
        productionsArrayPerSource[
          typeOfSource
        ] = overallProductionsForCurrentSource;
      });
    });

    // Check if data is ordered
    // ISSUE https://github.com/PETILLON-Sebastien/facteurs_charge/issues/53 and https://github.com/PETILLON-Sebastien/facteurs_charge/issues/52
    let targetArray = productionsArrayPerSource.solar;

    let lowest = targetArray[0][0];
    for (let i = 1; i < targetArray.length; i++) {
      let current = targetArray[i][0];
      if (current < lowest) {
        console.log("ERROR", i, current, lowest);
      }
      lowest = current;
    }
    // ------------------------------------------------------------------------

    let series = [
      {
        name: new PowerSourceStyleMap("solar").name,
        stack: 0,
        color: cssVar.solar,
        data: productionsArrayPerSource.solar,
      },
      {
        name: new PowerSourceStyleMap("wind").name,
        stack: 0,
        color: cssVar.wind,
        data: productionsArrayPerSource.wind,
      },
      {
        name: new PowerSourceStyleMap("hydraulic").name,
        stack: 0,
        color: cssVar.hydraulic,
        data: productionsArrayPerSource.hydraulic,
      },
      {
        name: new PowerSourceStyleMap("bioenergy").name,
        stack: 0,
        color: cssVar.bioenergies,
        data: productionsArrayPerSource.bioenergy,
      },
      {
        name: new PowerSourceStyleMap("fossil").name,
        stack: 0,
        color: cssVar.fossil,
        data: productionsArrayPerSource.fossil,
      },
      {
        name: new PowerSourceStyleMap("nuclear").name,
        stack: 0,
        color: cssVar.nuclear,
        data: productionsArrayPerSource.nuclear,
      },
    ];

    // for (let index in this.props.donnees) {
    //     let donnee = this.props.donnees[index];
    //     let date = moment(donnee["date_heure"]).valueOf();
    //     for (let i = 0; i < sourcesSimples.length; i++) {
    //         series[i].data.push([date, Math.round(donnee[sourcesSimples[i]])]);
    //     }
    // }

    // let heure_courante = moment(this.props.donnees[this.props.index_temps]["date_heure"]).valueOf();

    let config = {
      title: {
        text: "",
      },
      tooltip: {
        valueSuffix: "",
      },
      yAxis: {
        title: {
          text: "Production (GW)",
        },
        labels: {
          formatter: function () {
            if (this.value > 999 || this.value < 999) {
              return Math.round(this.value / 10) / 100 + "";
            }
            return this.value + "";
          },
          style: {
            color: "#ffffff",
          },
        },
      },
      xAxis: {
        type: "datetime",
        //     title: {
        //         text: 'Heure'
        //     },
        //     // plotLines: [{
        //     //     color: '#FFF',
        //     //     width: 1,
        //     //     value: heure_courante
        //     // }],
        labels: {
          style: {
            color: "#ffffff",
          },
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        //     series: {
        //         connectNulls: true
        //     },
        //     stacking: 'normal',
        //     areaspline: {
        //         stacking: 'areaspline',
        //         lineColor: '#222',
        //         lineWidth: 1,
        //         marker: {
        //             lineWidth: 1,
        //             lineColor: '#222',
        //             enabled: false
        //         }
        //     },
        line: {
          marker: {
            enabled: false,
          },
        },
      },
      time: {
        timezoneOffset: -60,
      },
      chart: {
        height: 260,

        type: "line",
        // stacking: 'normal',
        backgroundColor: "rgba(0,0,0,0)",
      },
      series: series,
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              yAxis: {
                title: {
                  text: null,
                },
              },
            },
          },
        ],
      },
    };
    return (
      <div className="chart-wrapping">
        <span>
          Répartition de la production en{" "}
          <span className="has-background-grey text-inline-highlighted">
            {currentZoneName}
          </span>{" "}
        </span>
        <HighchartsReact options={config} ref={this.chart}></HighchartsReact>
        {/*   <HighchartsReact
        highcharts={Highcharts}
	options={options}
      />*/}
      </div>
      // <h1>test?</h1>
    );
  }
}

export default ProductionBySourcesGraph;
