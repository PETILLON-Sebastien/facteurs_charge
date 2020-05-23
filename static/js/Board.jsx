import React, { createRef } from 'react'

import Breakdown from "./Breakdown"
import GrapheCharge from "./graphe-charge";
import GrapheProduction from "./graphe-production";
import Navbar from './Navbar';

import 'rc-slider/assets/index.css';
import moment from "moment";
import regionDescription from "./regions-descriptions";
import _ from "lodash";
import 'react-day-picker/lib/style.css';

import 'moment/locale/fr';

var SERVER_URL = process.env.API_URL;;
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
    if (date) {
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

    // wtf is all this
    if (matchSearch[2]) {
      dateUtilise = moment.parseZone(matchSearch[2], "YYYY-MM-DD");
      if (!dateUtilise.isValid()) {
        dateUtilise = undefined;
        window.location.search = "";
      } else {
        that.jourSelectionne = dateUtilise.toDate();
      }
    }
    that.date = dateUtilise;
    if (matchPath[2]) {
      id_zone = Number.parseInt(matchPath[2]);
      if (!_.find(this.regionsDescriptions, { 'id': id_zone })) {
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



  render() {
    if (_.get(this, "state.donnees") === undefined) {
      return "";
    }

    let meilleurs_facteurs = {};

    for (var cle_region in this.state.donnees) {
      meilleurs_facteurs[cle_region] = this.state.donnees[cle_region]['meilleur_facteur'];
    }

    let marks = {};
    for (var index in this.state.donnees[0].evolution) {
      if (index % 16 === 0) {
        var donnee = this.state.donnees[0].evolution[index];
        marks[index] = (moment(donnee.date_heure)).format("HH:mm");
      }
    }

    let donnee_region_selectionnee = _.find(this.regionsDescriptions, { 'id': this.state.id_zone_selectionnee });
    let label_region = donnee_region_selectionnee.label;
    let label_date_heure = moment(this.state.donnees_zone.evolution[this.state.index_temps].date_heure).format("DD/MM/YY HH:mm");

    return (


 
              <React.Fragment>

                <Navbar that={that} label_region={label_region} label_date_heure={label_date_heure} />

                <div className="container">

                  <Breakdown className="representations representation-name" donnees={this.state.donnees_zone} index_temps={this.state.index_temps} />

                  <div className="columns has-text-centered">
                    <div className="column is-6">

                      <GrapheCharge donnees={this.state.donnees_zone.evolution} index_temps={this.state.index_temps}
                        ref={this.grapheCharge} actionsVisibles={this.state.actionsVisibles} />
                    </div>

                    <div className="column is-6">
                      <GrapheProduction donnees={this.state.donnees_zone.evolution} index_temps={this.state.index_temps}
                        ref={this.grapheProduction} actionsVisibles={this.state.actionsVisibles} />
                    </div>
                  </div>
                </div>
              </React.Fragment>

    )}
}