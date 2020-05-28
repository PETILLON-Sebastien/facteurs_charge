import React from "react";
import Zone from "./Zone";

class Map extends React.Component {

  constructor(props) {
    super(props);
    // this.regionsDescriptions = regionDescription;
    
    this.zoneChanged = this.zoneChanged.bind(this);
  }

  zoneChanged(valeur) {
    this.props.zoneChanged(valeur);
  }
  
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    const regionsDescriptions = this.props.zonesDescription;

    let regions = [];
    for (let i = 0; i < regionsDescriptions.length; i++) {
      regions.push(
        <Zone
          key={regionsDescriptions[i].id} 
          description={regionsDescriptions[i]}
          color={this.getRandomColor()}
          zoneChanged={this.zoneChanged}
          // meilleurs_facteurs={this.props.meilleurs_facteurs[this.regionsDescriptions[i].id]}
          // index_temps={this.props.index_temps}
          // zone_selectionnee={this.props.zone_selectionnee} 
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