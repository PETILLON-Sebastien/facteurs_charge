import React from "react";
import Zone from "./Zone";

class Map extends React.Component {

  constructor(props) {
    super(props);
    // this.regionsDescriptions = regionDescription;
    this.state = {
      data: this.get()
    }
    this.zoneChanged = this.zoneChanged.bind(this);
  }

  zoneChanged(valeur) {
    this.props.zoneChanged(valeur);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  get() {
    const installationsArray = ["solar", "wind", "nuclear", "hydraulic", "fossil", "bioenergies"];
    let data = [];
    for (let i = 0; i < 14; i++) {
      data.push({
        "id": i,
        "highestLoad": {
          "installation": installationsArray[this.getRandomInt(installationsArray.length - 1)],
          "value": this.getRandomInt(101)
        }
      })
    }

    return data;
  }


  render() {
    const regionsDescriptions = this.props.zonesDescription;

    // fixme
    // link zone with highestload (fake data)
    regionsDescriptions.forEach((e, i) => {
      e.highestLoad = this.state.data[i].highestLoad.installation
    });

    let regions = [];
    for (let i = 0; i < regionsDescriptions.length; i++) {
      regions.push(
        <Zone
          key={regionsDescriptions[i].id}
          description={regionsDescriptions[i]}
          zoneChanged={this.zoneChanged}
          onClick={(i) => this.zoneChanged(i)}
        />
      );
    }

    return (
      <div className="map">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" display="inline" version="1" viewBox="0 0 650 520">
          {regions}
        </svg>
      </div>
    );
  }
}

export default Map;