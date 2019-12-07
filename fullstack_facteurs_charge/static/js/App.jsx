import React from "react";
import Map from "./Map";
export default class App extends React.Component {
  constructor() {
      super();
  }
  handleClick(i) {
    alert(i);
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