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


    const adjacentMatrix = {
      'fr-hdr': ['fr-idf', 'fr-nor', 'fr-ges'],
      'fr-nor': ['fr-hdf', 'fr-idf', 'fr-cvl', 'fr-bre', 'fr-pdl'],
      'fr-bre': ['fr-nor', 'fr-pdl'],
      'fr-idf': ['fr-nor', 'fr-hdf', 'fr-ges', 'fr-cvl', 'fr-bfc'],
      'fr-ges': ['fr-idf', 'fr-bfc'],
      'fr-pdl': ['fr-bre', 'fr-nor', 'fr-cvl', 'fr-naq'],
      'fr-cvl': ['fr-naq', 'fr-pdl', 'fr-nor', 'fr-idf', 'fr-bfc', 'fr-ara'],
      'fr-bfc': ['fr-ara', 'fr-cvl', 'fr-idf', 'fr-ges'],
      'fr-naq': ['fr-pdl', 'fr-cvl', 'fr-ara', 'fr-occ'],
      'fr-ara': ['fr-occ', 'fr-naq', 'fr-cvl', 'fr-bfc', 'fr-pac'],
      'fr-occ': ['fr-naq', 'fr-ara', 'fr-pac'],
      'fr-pac': ['fr-occ', 'fr-ara']
    }



    // fromID:toID:arrowDesc
    const exchangeZoneIDToArrow = {
      'fr-naq': {
        'fr-ara': {
          x: 4800,
          y: -3500,
          symbol: 'images/arrow-right.png'
        },
        'fr-occ': {
          x: 3700,
          y: -1900,
          symbol: 'images/arrow-diag-down-right.png'
        },
        'fr-cvl': {
          x: 3000,
          y: -4600,
          symbol: 'images/arrow-diag-up-right.png'
        },
        'fr-pdl': {
          x: 2400,
          y: -4000,
          symbol: 'images/arrow-diag-up-left.png'
        }
      },
      'fr-occ': {
        'fr-ara': {
          x: 5300,
          y: -1800,
          symbol: 'images/arrow-diag-up-right.png'
        },
        'fr-naq': {
          x: 3300,
          y: -1200,
          symbol: 'images/arrow-diag-up-left.png'
        },
        'fr-pac': {
          x: 6700,
          y: -1000,
          symbol: 'images/arrow-right.png'
        }
      },
      'fr-ara': {
        'fr-bfc': {
          x: 6500,
          y: -4000,
          symbol: 'images/arrow-up.png'
        },
        'fr-fr-cvl': {
          x: 5200,
          y: -4300,
          symbol: 'images/arrow-diag-up-left.png'
        },
        'fr-naq': {
          x: 4800,
          y: -2800,
          symbol: 'images/arrow-left.png'
        },
        'fr-pac': {
          x: 8000,
          y: -2200,
          symbol: 'images/arrow-diag-down-right.png'
        },
        'fr-occ': {
          x: 6300,
          y: -2000,
          symbol: 'images/arrow-diag-down-left.png'
        }
      },
      'fr-idf': {
        'fr-hdf': {
          x: 5200,
          y: -7500,
          symbol: 'images/arrow-up.png'
        },
        'fr-ges': {
          x: 5700,
          y: -7000,
          symbol: 'images/arrow-right.png'
        },
        'fr-bfc': {
          x: 5300,
          y: -6700,
          symbol: 'images/arrow-diag-down-right.png'
        },
        'fr-nor': {
          x: 4500,
          y: -7400,
          symbol: 'images/arrow-diag-up-left.png'
        },
        'fr-cvl': {
          x: 5000,
          y: -6600,
          symbol: 'images/arrow-diag-down-left.png'
        }
      },
      'fr-bre': {
        'fr-nor': {
          x: 1950,
          y: -6700,
          symbol: 'images/arrow-diag-up-right.png'
        },
        'fr-pdl': {
          x: 1700,
          y: -6200,
          symbol: 'images/arrow-diag-down-right.png'
        }
      },

      'fr-pdl': {
        'fr-bre': {
          x: 1200,
          y: -5800,
          symbol: 'images/arrow-diag-up-left.png'
        },
        'fr-nor': {
          x: 2800,
          y: -6500,
          symbol: 'images/arrow-up.png'
        },
        'fr-cvl': {
          x: 3400,
          y: -5900,
          symbol: 'images/arrow-right.png'
        },
        'fr-naq': {
          x: 2200,
          y: -5100,
          symbol: 'images/arrow-diag-down-right.png'
        }
      },

      // BELOW TODO 
      'fr-nor': {
        'fr-hdf': {
          x: 1200,
          y: -5800,
          symbol: 'images/arrow-diag-up-left.png'
        },
        'fr-idf': {
          x: 2800,
          y: -6500,
          symbol: 'images/arrow-up.png'
        },
        'fr-cvl': {
          x: 3400,
          y: -5900,
          symbol: 'images/arrow-right.png'
        },
        'fr-pdl': {
          x: 2200,
          y: -5100,
          symbol: 'images/arrow-diag-down-right.png'
        },
        'fr-bre': {
          x: 2200,
          y: -5100,
          symbol: 'images/arrow-diag-down-right.png'
        }
      },
    };


    const stubArray = [];
    Object.keys(exchangeZoneIDToArrow).forEach((key) => {
      Object.keys(exchangeZoneIDToArrow[key]).forEach((subKey) => {
        stubArray.push(
          {
            name: '',
            x: exchangeZoneIDToArrow[key][subKey].x,
            y: exchangeZoneIDToArrow[key][subKey].y,
            marker: {
              symbol: 'url(' + exchangeZoneIDToArrow[key][subKey].symbol + ')',
              width: 24,
              height: 24
            }
          }
        );
      });
    });

    // console.log(stubArray);

    this.chart = createRef();


    // init to get the map data from api
    this.mapData = mapDataRequired;

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
          allAreas: true,
          joinBy: ['hc-key'],
          dataLabels: {
            enabled: true,
            color: '#FFFFFF',
            style: {
              fontWeight: 'bold'
            },
            format: '{point.hc-key}'
          },
          tooltip: {
            // useHTML: true,
            // headerFormat: '',
            pointFormat: '{point.hc-key}'
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

          data: [
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
          ],
        },
        {
          "type": "mappoint",
          "name": "Échange",
          "data":
            stubArray

        }

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
