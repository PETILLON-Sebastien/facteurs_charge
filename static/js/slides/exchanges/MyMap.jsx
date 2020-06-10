import React from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

require("highcharts/modules/map")(Highcharts);


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
      title: {
        text: "Widget click by location",
        style: {
          color: "#fff"
        }
      },
      plotOptions: {
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

      
      series: [
        {
          name: "world map",
          dataLabels: {
            enabled: true,
            color: "#FFFFFF",
            format: "{point.name}",
            style: {
              // textTransform: "uppercase"
            }
          },
          tooltip: {
            ySuffix: " %"
          },
          cursor: "pointer",
          // joinBy: "postal-code",
          data: data,
          // point: {
          //   events: {
          //     click: function (r) {
          //       console.log("click - to open popup as 2nd step");
          //       console.log(r);
          //     }
          //   }
          // }
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
