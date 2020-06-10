import React from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

require("highcharts/modules/map")(Highcharts);

import cssVar from '../../../_sass/_variables.scss';

const mapDataRequired = require('@highcharts/map-collection/countries/fr/custom/fr-all-mainland.geo.json');

class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapData: null
    };

    // init to get the map data from api
    this.mapData = mapDataRequired;
    var data = [
      ['fr-bre', 0],
      ['fr-pdl', 1],
      ['fr-pac', 2],
      ['fr-occ', 3],
      ['fr-naq', 4],
      ['fr-bfc', 5],
      ['fr-cvl', 6],
      ['fr-idf', 7],
      ['fr-hdf', 8],
      ['fr-ara', 9],
      ['fr-ges', 10],
      ['fr-nor', 11]
    ];

    // preparing the config of map with empty data
    this.options = {
      chart: {
        backgroundColor: "transparent",
        type: "map",
        map: mapDataRequired
      },
  
      mapNavigation: {
        enabled: false,
        enableButtons: false
      },

      credits: {
        enabled: false
      },

      colors: ["red", "green", "blue"],

      plotOptions: {

        map: {
          allAreas: false,
          joinBy:['hc-key'],
          dataLabels: {
            enabled: true,
            color: '#FFFFFF',
            style: {
              fontWeight: 'bold'
            }
          }
        },

        series: {
          point: {
            events: {
              click: function (e) {
                console.log("CLICKING ZONE");
                console.log(e.point.index);
              }
            }
          }
        }
      },
 


      series: [
        {
          name: "solar-best",

          data: [['fr-bre', 0]],
        },
        {
          name: "helio-best",
          data: [
            ['fr-pdl', 1],
            ['fr-pac', 2],
            ['fr-occ', 3],
            ['fr-naq', 4],
            ['fr-bfc', 5],
            ['fr-cvl', 6],
            ['fr-idf', 7]
          ],
        },
        {
          name: "nuclear-best",
 
          data: [
            ['fr-hdf', 8],
            ['fr-ara', 9],
            ['fr-ges', 10],
            ['fr-nor', 11]
          ],
        }
      ]
    };

    this.state.mapOptions = this.options;
  }

  render() {
    return (
      <div>
        {this.state.mapOptions ? (
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"mapChart"}
            options={this.state.mapOptions}
          />
        ) : (
            ""
          )}
      </div>
    );
  }
}

export default MyMap;
