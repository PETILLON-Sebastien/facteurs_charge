import React from "react";
import Map from "./Map";
export default class App extends React.Component {
  constructor() {
    super();
    this.donnees = donnees;
    this.donnees_zone = this.donnees[0];
  }
  handleClick(indice_zone) {
    this.donnees_zone = this.donnees[indice_zone];
    console.log(this.donnees_zone);
  }
  render () {
    return (
      <div>
        <p>Données brutes :</p>
        <Map onClick={(i) => this.handleClick(i)}/>
      </div>
    );
  }
}