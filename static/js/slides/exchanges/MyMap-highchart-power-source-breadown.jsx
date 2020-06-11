import React, { createRef } from "react";

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

    const mappingIDZonesHighchartFacteurCharges = {

    };


    // fromID:toID:arrowDesc
    const exchangeZoneIDToArrow = {
      3: {
        1:
        {
          "type": "mappoint",
          "name": "Hubs",
          "data": [
            {
              name: 'Import',
              x: 4500,
              y: -3000,
              marker: {
                symbol: 'url(images/arrow.png)',
                width: 64,
                height: 64
              }
            }
          ]
        }

      }

    };


    this.chart = createRef();


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

      title: {
        text: ''
      },
      mapNavigation: {
        enabled: false,
        enableButtons: false
      },

      credits: {
        enabled: false
      },

      colors: [cssVar.solar, cssVar.wind, cssVar.nuclear],

      plotOptions: {

        map: {
          allAreas: false,
          joinBy: ['hc-key'],
          dataLabels: {
            enabled: false,
            color: '#FFFFFF',
            style: {
              fontWeight: 'bold'
            }
          },
          tooltip: {
            // useHTML: true,
            // headerFormat: '',
            pointFormat: '{point.name}'
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
          name: "Photovoltaique",

          data: [['fr-bre', 0]],
        },
        {
          name: "Heolien",
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
          name: "Nucléaire",

          data: [
            ['fr-hdf', 8],
            ['fr-ara', 9],
            ['fr-ges', 10],
            ['fr-nor', 11]
          ],
        },
        exchangeZoneIDToArrow[3][1],

        // {
        //   "type": "mapline",
        //   "name": "Links",
        //   "color": "#c77"
        // },
        // {
        //   "type": "mappoint",
        //   "name": "Hubs",
        //   "data": [
        //     {
        //       "x": 0,
        //       "y": 0,
        //       "name": "Hub1"
        //     },
        //     {
        //       "x": 2000,
        //       "y": -2000,
        //       "name": "Hub2"
        //     },
        //     {
        //       "x": 4000,
        //       "y": -4000,
        //       "name": "Hub3"
        //     }
        //   ]
        // },

        // {
        //   "type": "mappoint",
        //   "name": "Nodes",
        //   "color": "grey",
        //   "data": [
        //     {
        //       "x": -400,
        //       "y": -1600,
        //       "name": "Node1",
        //       "hub": "Hub1"
        //     },
        //     {
        //       "x": 800,
        //       "y": -2800,
        //       "name": "Node2",
        //       "hub": "Hub1"
        //     },
        //     {
        //       "x": 2400,
        //       "y": -1300,
        //       "name": "Node3",
        //       "hub": "Hub1"
        //     },
        //     {
        //       "x": 4000,
        //       "y": -1700,
        //       "name": "Node4",
        //       "hub": "Hub2"
        //     },
        //     {
        //       "x": 7000,
        //       "y": -2000,
        //       "name": "Node5",
        //       "hub": "Hub2"
        //     },
        //     {
        //       "x": 8000,
        //       "y": -5700,
        //       "name": "Node6",
        //       "hub": "Hub2"
        //     },
        //     {
        //       "x": 5800,
        //       "y": -7000,
        //       "name": "Node7",
        //       "hub": "Hub2"
        //     },
        //     {
        //       "x": 3000,
        //       "y": -6000,
        //       "name": "Node8",
        //       "hub": "Hub2"
        //     },
        //     {
        //       "lat": 52.52,
        //       "lon": 13.405,
        //       "name": "Berlin",
        //       "hub": "Hub3"
        //     },
        //     {
        //       "lat": 53.551964,
        //       "lon": 9.983436,
        //       "name": "Hamburg",
        //       "hub": "Hub3"
        //     },
        //     {
        //       "lat": 52.3701,
        //       "lon": 4.899301,
        //       "name": "Amsterdam",
        //       "hub": "Hub3"
        //     }
        //   ]
        // }

      ]
    };

    this.state.mapOptions = this.options;
  }

  render() {
    return (
      <React.Fragment>
        <div className="columns is-centered" >
          <div className="column is-5 ">
            <div className="columns is-multiline">
              <div className="column is-full has-text-centered">
                <h1 className="is-size-1">Échanges inter-régions</h1>
              </div>
              <div className="column is-full has-text-justified">
                Les régions 'échangent' de l'énergie en exportant des surplus locaux de production, en important pour combler des surplus locaux de consommation, ou encore pour faire zone-tampon entre une zone surproductrice et une (ou plusieurs) zone en demande.
              </div>

              <div className="column is-full has-text-justified">
                La région PACA importe 78GW d'électricité depuis la région BOVBJ
              </div>
              <div className="column is-full has-text-justified">
                La région PACA importe 78GW d'électricité depuis la région BOVBJ
              </div>
            </div>
          </div>

          <div className="column is-7 has-text-centered">
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={"mapChart"}
              options={this.state.mapOptions}
              ref={this.chart}
            />
          </div>
        </div>

      </React.Fragment>

    );
  }
}

export default MyMap;
