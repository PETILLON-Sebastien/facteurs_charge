import React from "react";
import Map from "./Map";
import github from '../images/github.png';
import Representations from "./representations"
import GrapheCharge from "./graphe-charge";

export default class App extends React.Component {
  constructor() {
    super();
    this.donnees = donnees;
    this.zone_selectionnee = {id: 0};
    this.donnees_zone = this.donnees[this.zone_selectionnee.id];
    this.index_temps = this.donnees_zone.evolution.length - 1;
  }
  handleClick(indice_zone) {
    this.zone_selectionnee.id = indice_zone;
    this.donnees_zone = this.donnees[this.zone_selectionnee.id];
    this.setState({});
  }
  render () {
    let meilleurs_facteurs = {};
    for(var cle_region in this.donnees) {
      meilleurs_facteurs[cle_region] = this.donnees[cle_region]['meilleur_facteur'];
    }
    return (
      <div class="app">
        <div class="bandeau">
          <span>---</span>
          <h1>Taux de charge</h1>
          <div class="liens">
            <a href="https://github.com/PETILLON-Sebastien/facteurs_charge">
              <img src={github} alt="Projet github" title="Projet github"/>
            </a>
            <a href="https://twitter.com/PetillonSebast1">
              <img src="https://pbs.twimg.com/profile_images/1141374395623071744/qmY4xWra_400x400.jpg" alt="Profil twitter" title="Profil twitter"/>
            </a>
          </div>
        </div>
        <Map handleClick={(i) => this.handleClick(i)} meilleurs_facteurs={meilleurs_facteurs} zone_selectionnee={this.zone_selectionnee} index_temps={this.index_temps}/>
        <Representations class="representations" donnees={this.donnees_zone} index_temps={this.index_temps}/>
        <GrapheCharge donnees={this.donnees_zone.evolution} />
      </div>
    );
  }
}