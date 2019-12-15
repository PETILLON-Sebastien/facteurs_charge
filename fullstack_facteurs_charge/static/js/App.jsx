import React from "react";
import Map from "./Map";
import Eolienne from "./representations/eolienne";

export default class App extends React.Component {
  constructor() {
    super();
    this.donnees = donnees;
    this.zone_selectionnee = {id: 0};
    this.donnees_zone = this.donnees[this.zone_selectionnee];
  }
  handleClick(indice_zone) {
    this.zone_selectionnee.id = indice_zone;
    this.donnees_zone = this.donnees[this.zone_selectionnee.id];
    console.log(this.donnees_zone);
    this.setState({});
  }
  render () {
    let meilleurs_facteurs = {};
    for(var cle_region in this.donnees) {
      meilleurs_facteurs[cle_region] = this.donnees[cle_region]['meilleur_facteur'];
    }
    return (
      <div>
        <Map handleClick={(i) => this.handleClick(i)} meilleurs_facteurs={meilleurs_facteurs} zone_selectionnee={this.zone_selectionnee}/>
        {/* <Eolienne pourcentage={70}/> */}
      </div>
    );
  }
}