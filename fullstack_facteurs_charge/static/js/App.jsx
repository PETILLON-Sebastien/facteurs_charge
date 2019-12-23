import React from "react";
import Map from "./Map";
import github from '../images/github.png';
import Representations from "./representations"
import GrapheCharge from "./graphe-charge";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      donnees: donnees,
      id_zone_selectionnee: 0,
      donnees_zone: donnees[0],
      index_temps: donnees[0].evolution.length - 1
    }
  }

  handleClick(indice_zone) {
    this.setState({
      id_zone_selectionnee: indice_zone,
      donnees_zone: this.state.donnees[indice_zone],
      index_temps: this.state.donnees[indice_zone].evolution.length - 1
    });
  }

  render() {
    let meilleurs_facteurs = {};
    
    for(var cle_region in this.state.donnees) {
      meilleurs_facteurs[cle_region] = this.state.donnees[cle_region]['meilleur_facteur'];
    }

    return (
      <div className="app">
        <div className="bandeau">
          <span>---</span>
          <h1>Taux de charge</h1>
          <div className="liens">
            <a href="https://github.com/PETILLON-Sebastien/facteurs_charge">
              <img src={github} alt="Projet github" title="Projet github"/>
            </a>
            <a href="https://twitter.com/PetillonSebast1">
              <img src="https://pbs.twimg.com/profile_images/1141374395623071744/qmY4xWra_400x400.jpg" alt="Profil twitter" title="Profil twitter"/>
            </a>
          </div>
        </div>
        <div className="actions">
          <Map  handleClick={(i) => this.handleClick(i)} 
                meilleurs_facteurs={meilleurs_facteurs} 
                zone_selectionnee={this.state.id_zone_selectionnee} 
                index_temps={this.state.index_temps}/>
        </div>
        <div className="affichage">
          <Representations className="representations" donnees={this.state.donnees_zone} index_temps={this.state.index_temps}/>
          <GrapheCharge donnees={this.state.donnees_zone.evolution} />
        </div>
      </div>
    );
  }
}