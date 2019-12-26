import React from "react";
import Zone from "./Zone";
import regionDescription from "./regions-descriptions";

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.regionsDescriptions = regionDescription;

    for(var regionKey in this.regionsDescriptions) {
      let regionDescription = this.regionsDescriptions[regionKey];
      regionDescription.meilleur_facteur = this.props.meilleurs_facteurs[regionDescription.id][this.props.index_temps];
    }
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
          zone_selectionnee={this.props.zone_selectionnee} 
          onClick={(i) => this.handleClick(i)}
        />
      );
    }
    // let classes = 'region ' + this.props.meilleurs_facteurs[0] + '_couleur';
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