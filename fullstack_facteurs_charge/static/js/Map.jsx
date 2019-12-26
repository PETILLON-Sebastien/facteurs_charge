import React from "react";
import Zone from "./Zone";
import regionDescription from "./regions-descriptions";

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.regionsDescriptions = regionDescription;
  }

  handleClick(valeur) {
    this.props.handleClick(valeur);
  }

  render() {
    this.regions = [];
    for (let i = 0; i < this.regionsDescriptions.length; i++) {
      this.regions.push(
        <Zone
          key={this.regionsDescriptions[i].id} 
          description={this.regionsDescriptions[i]}
          meilleurs_facteurs={this.props.meilleurs_facteurs[this.regionsDescriptions[i].id]}
          index_temps={this.props.index_temps}
          zone_selectionnee={this.props.zone_selectionnee} 
          onClick={(i) => this.handleClick(i)}
        />
      );
    }
    
    return (
      <div className="map">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" display="inline" version="1" viewBox="0 0 650 520">
          {this.regions}
        </svg>
      </div>
    );
  }
}

export default Map;