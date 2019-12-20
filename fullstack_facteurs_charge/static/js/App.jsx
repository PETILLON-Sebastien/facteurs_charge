import React from "react";
import Map from "./Map";
import github from '../images/github.png';
import Eolienne from "./representations/eolienne";
import PanneauSolaire from "./representations/panneau-solaire";
import Barrage from "./representations/barrage";

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
        <Map handleClick={(i) => this.handleClick(i)} meilleurs_facteurs={meilleurs_facteurs} zone_selectionnee={this.zone_selectionnee}/>
        <div class="informations">
          <PanneauSolaire pourcentage={50}/>
          <Eolienne pourcentage={50}/>
          <Barrage pourcentage={50}/>
        </div>
      </div>
    );
  }
}