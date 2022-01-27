import React, { createRef } from 'react'
import Map from "./Map";
import github from './images/github.png';
import buttonOn from './images/buttonon.png';
import buttonOff from './images/buttonoff.png';
import Representations from "./representations"
import GrapheCharge from "./graphe-charge";
import GrapheProduction from "./graphe-production";
import Slider from 'rc-slider';
import APropos from './a-propos'
import 'rc-slider/assets/index.css';
import moment from "moment";
import regionDescription from "./regions-descriptions";
import _ from "lodash";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/fr';

var SERVER_URL = process.env.API_URL; ;
console.warn("Server API's URL was set to", SERVER_URL); // Delete me :)

var that;

export default class Board extends React.Component {

  constructor(props) {
    super(props);
    that = this;
    this.grapheCharge = createRef();
    this.grapheProduction = createRef();
    this.regionsDescriptions = regionDescription;
  }

  updateData() {
    var resource = "/now";
    var date = _.get(this, "date");
    if(date) {
      resource = "/donnees_" + date.format("YYYY-MM-DD") + ".json"; 
    }
    
    fetch(SERVER_URL + resource)
    .then(res => res.json())
    .then((donnees) => {
      this.setState({
        donnees: donnees,
        donnees_zone: donnees[this.state.id_zone_selectionnee],
        index_temps: date ? 0 : donnees[this.state.id_zone_selectionnee].evolution.length - 1,
      });
    })
    .catch(console.log)
  }

  componentDidMount() {
    // Recuperation de la zone
    var path = window.location.pathname;
    var search = window.location.search;
    
    var matchPath = path.match(/(\/region\/([0-9]+))?/);
    var matchSearch = search.match(/(\?date=([0-9]{4}-[0-9]{2}-[0-9]{2}))?/);
    var id_zone = 0;
    var dateUtilise = undefined;
    that.jourSelectionne = new Date();
    
    if(matchSearch[2]) {
      dateUtilise = moment.parseZone(matchSearch[2], "YYYY-MM-DD");
      if(!dateUtilise.isValid()) {
        dateUtilise = undefined;
        window.location.search = "";
      } else {
        that.jourSelectionne = dateUtilise.toDate();
      }
    }
    that.date = dateUtilise;
    if(matchPath[2]) {
      id_zone = Number.parseInt(matchPath[2]);
      if(!_.find(this.regionsDescriptions, {'id': id_zone})) {
        this.props.history.push("/" + window.location.search);
        id_zone = 0;
      }
    }
    this.setState({
      actionsVisibles: true,
      id_zone_selectionnee: id_zone
    });

    this.updateData();
  }

  onSliderChange(valeur) {
    that.setState({
      index_temps: valeur
    });
    that.grapheCharge.current.modifierTemps(valeur);
    that.grapheProduction.current.modifierTemps(valeur);
  }
  onDateChange(day, modifiers = {}) {
    that.jourSelectionne = day;
    console.log(that.jourSelectionne)
    if (modifiers.disabled) {
      return;
    }
    that.date = moment(day);
    var search;
    if(moment().isSame(that.date, 'day')) {
      search = "";
      that.date = undefined;
    } else {
      search = "?date=" + that.date.format("YYYY-MM-DD");
    }
    if(that.state.id_zone_selectionnee == 0) {
      that.props.history.push("/" + search);
    } else {
      that.props.history.push("/region/" + that.state.id_zone_selectionnee + search);
    }
    that.updateData();
  }
  disableDates(date) {
    return date > new Date() || date < new Date(2020, 1, 1);
  }

  handleClick(indice_zone) {
    if(indice_zone == 0) {
      this.props.history.push("/" + window.location.search);
    } else {
      this.props.history.push("/region/" + indice_zone + window.location.search);
    }
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
    if(_.get(this, "state.donnees") === undefined) {
      return "";
    }
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
    let label_date_heure = moment(this.state.donnees_zone.evolution[this.state.index_temps].date_heure).format("DD/MM/YY HH:mm");

    let actions = this.state.actionsVisibles ? 
      (<div className="actions">
        <Map handleClick={(i) => this.handleClick(i)} 
          meilleurs_facteurs={meilleurs_facteurs} 
          zone_selectionnee={this.state.id_zone_selectionnee} 
          index_temps={this.state.index_temps}/>
          <DayPicker selectedDays={that.jourSelectionne} onDayClick={this.onDateChange}
          disabledDays={[{before: new Date(2020, 1, 1), after: new Date()}]} localeUtils={MomentLocaleUtils} locale='fr'/>
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
            <a href="https://twitter.com/FacteursC">
              <img src="https://pbs.twimg.com/profile_images/1224028525113544704/O5tajbCL_400x400.jpg" alt="Profil twitter" title="Profil twitter"/>
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