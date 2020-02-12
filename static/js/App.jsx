import React, { createRef } from 'react'
import Map from "./Map";
import github from '../images/github.png';
import buttonOn from '../images/buttonon.png';
import buttonOff from '../images/buttonoff.png';
import Representations from "./representations"
import GrapheCharge from "./graphe-charge";
import GrapheProduction from "./graphe-production";
import Slider from 'rc-slider';
import APropos from './a-propos'
import 'rc-slider/assets/index.css';
import moment from "moment";
import regionDescription from "./regions-descriptions";
import _ from "lodash";

var that;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    that = this;
    this.grapheCharge = createRef();
    this.grapheProduction = createRef();
    this.regionsDescriptions = regionDescription;
    this.state = {
      donnees: donnees,
      actionsVisibles: true,
      id_zone_selectionnee: 0,
      donnees_zone: donnees[0],
      index_temps: donnees[0].evolution.length - 1
    }
  }

  onSliderChange(valeur) {
    that.setState({
      index_temps: valeur
    });
    that.grapheCharge.current.modifierTemps(valeur);
    that.grapheProduction.current.modifierTemps(valeur);
  }

  handleClick(indice_zone) {
    this.setState({
      id_zone_selectionnee: indice_zone,
      donnees_zone: this.state.donnees[indice_zone]
    });
  }

  changerVisibiliteActions() {
    that.setState({
      actionsVisibles: !that.state.actionsVisibles 
    });
  }

  render() {
    let meilleurs_facteurs = {};
    for(var cle_region in this.state.donnees) {
      meilleurs_facteurs[cle_region] = this.state.donnees[cle_region]['meilleur_facteur'];
    }
    let marks = {};
    for(var index in this.state.donnees[0].evolution) {
      if(index % 16 === 0) {
        var donnee = this.state.donnees[0].evolution[index];
        marks[index] = (moment(donnee.date_heure)).format("HH:mm");
      }
    }
    
    let donnee_region_selectionnee = _.find(this.regionsDescriptions, {'id': this.state.id_zone_selectionnee});
    let label_region = donnee_region_selectionnee.label;
    console.log("Index")
    console.log(this.state.index_temps)
    console.log("Evolution")
    console.log(this.state.donnees_zone.evolution);
    let label_date_heure = moment(this.state.donnees_zone.evolution[this.state.index_temps].date_heure).format("DD/MM/YY HH:mm");

    let actions = this.state.actionsVisibles ? 
      (<div className="actions">
        <Map handleClick={(i) => this.handleClick(i)} 
              meilleurs_facteurs={meilleurs_facteurs} 
              zone_selectionnee={this.state.id_zone_selectionnee} 
              index_temps={this.state.index_temps}/>
        <Slider className="slider-temps" value={this.state.index_temps} marks={marks}
          min={0} max={this.state.donnees[0].evolution.length - 1} onChange={this.onSliderChange}/>
      </div>)
      : null;

    let boutonActions = this.state.actionsVisibles ? 
      <img src={buttonOff} className="buttonOff" onClick={this.changerVisibiliteActions} alt="Cacher les actions" title="Cacher les actions"/>
      : <img src={buttonOn} className="buttonOn" onClick={this.changerVisibiliteActions} alt="Montrer les actions" title="Montrer les actions"/>;

    let classNameAffichage = this.state.actionsVisibles ? "affichage" : "affichage seul";

    return (
      <div className="app">
        <div className="bandeau">
          {boutonActions}
          <div className="titre">
            <span className="label-region">{label_region}</span>
            <span className="label-date-heure">{label_date_heure}</span>
          </div>
          <div className="liens">
            <a href="https://github.com/PETILLON-Sebastien/facteurs_charge">
              <img src={github} alt="Projet github" title="Projet github"/>
            </a>
            <a href="https://twitter.com/PetillonSebast1">
              <img src="https://pbs.twimg.com/profile_images/1141374395623071744/qmY4xWra_400x400.jpg" alt="Profil twitter" title="Profil twitter"/>
            </a>
          </div>
        </div>
        {actions}
        <div className={classNameAffichage}>
          <Representations className="representations" donnees={this.state.donnees_zone} index_temps={this.state.index_temps} />
        </div>
        <div className={classNameAffichage}>
          <GrapheCharge donnees={this.state.donnees_zone.evolution} index_temps={this.state.index_temps}
            ref={this.grapheCharge} actionsVisibles={this.state.actionsVisibles} />
          <GrapheProduction donnees={this.state.donnees_zone.evolution} index_temps={this.state.index_temps}
            ref={this.grapheProduction} actionsVisibles={this.state.actionsVisibles} />
        </div>
        <APropos />
      </div>
    );
  }
}