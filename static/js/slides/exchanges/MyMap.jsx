import React from "react";
import mapData from "./mapData";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

require("highcharts/modules/map")(Highcharts);

class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapData: null
    };

    // init to get the map data from api
    this.mapData = new mapData();
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
                console.log(e.point.name);
              }
            }
          }
        } 
      },
      chart: {
        backgroundColor: "transparent",
        type: "map",
        map: null
      },
      mapNavigation: {
        enabled: false,
        enableButtons: false
      },
      credits: {
        enabled: false
      },
      colorAxis: {
        dataClasses: [
          // {
          //   from: 1,
          //   color: "#C40401",
          //   name: "widget name one"
          // },
          // {
          //   from: 2,
          //   color: "#0200D0",
          //   name: "widget name two"
          // }
        ]
      },
      tooltip: {
        pointFormatter: function () {
          return this.name;
        }
      },
      legend: {
        align: "right",
        verticalAlign: "top",
        x: -100,
        y: 70,
        floating: true,
        layout: "vertical",
        valueDecimals: 0,
        backgroundColor:
          // theme
          (Highcharts.defaultOptions &&
            Highcharts.defaultOptions.legend &&
            Highcharts.defaultOptions.legend.backgroundColor) ||
          "rgba(255, 255, 255, 0.85)"
      },
      series: [
        {
          name: "world map",
          dataLabels: {
            enabled: true,
            color: "#FFFFFF",
            format: "{point.postal-code}",
            style: {
              textTransform: "uppercase"
            }
          },
          tooltip: {
            ySuffix: " %"
          },
          cursor: "pointer",
          joinBy: "postal-code",
          data: [],
          point: {
            events: {
              click: function (r) {
                console.log("click - to open popup as 2nd step");
                console.log(r);
              }
            }
          }
        }
      ]
    };

    // get the world map data
    this.mapData.getWorld().then(r => {
      this.setState({ mapData: r.data }, () => {
        this.options.series[0].data = []; //make sure data is empty before  fill
        this.options["chart"]["map"] = this.state.mapData; // set the map data of the graph (using the world graph)

        // filling up some dummy data with values 1 and 2
        // instead of using the google sheet
        for (let i in this.state.mapData["features"]) {
          let mapInfo = this.state.mapData["features"][i];
          if (mapInfo["id"]) {
            var postalCode = mapInfo.properties["postal-code"];

            var name = mapInfo["properties"]["name"];
            var value = (i % 2) + 1;
            var type = value === 1 ? "widget name one" : "widget name two";
            var row = i;
            this.options.series[0].data.push({
              value: value,
              name: name,
              "postal-code": postalCode,
              row: row,
              type: type
            });
          }
        }

        this.options.plotOptions = {
          series: {
            // point: {
  
              events: {
                click: function (e) {
                  console.log("CLICKING ZONE");
                  console.log(e.point.name);
                }
              }
            // }
          } 
        };

        // updating the map options
        this.setState({ mapOptions: this.options });
      });
    });
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
