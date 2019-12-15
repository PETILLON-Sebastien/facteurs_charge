import React from "react";

class Zone extends React.Component { 
  constructor(props) {
    super(props);
  }

  render() {
    const selectionnee = this.props.description.estSelectionnee ? 'selectionnee' : '';
    const couleur = this.props.description.meilleur_facteur + '_couleur';
    return (<path
        d={this.props.description.path}
        transform={this.props.description.transform}
        className={selectionnee + ' ' + couleur + ' region'}
        onClick={() => this.props.onClick(this.props.description.id)}
        strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4" display="inline">
    >
    </path>);
  }
}

export default Zone;