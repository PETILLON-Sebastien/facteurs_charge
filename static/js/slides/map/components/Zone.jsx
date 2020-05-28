import React from "react";

class Zone extends React.Component { 
  constructor(props) {
    super(props);
  }

  render() {
    // const selectionnee = this.props.zone_selectionnee === this.props.description.id ? 'selectionnee' : '';
    // const couleur = this.props.meilleurs_facteurs[this.props.index_temps] + '_couleur';

    const hookCallback = this.props.zoneChanged;
    const zoneDescription = this.props.description;
    const color =  this.props.color;

    return (<path
        d={zoneDescription.path}
        transform={zoneDescription.transform}
        className={`region`}
        style={{"fill":color}}
        onClick={() => hookCallback(zoneDescription.id)}
        strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="9" display="inline">
    >
    </path>);
  }
}

export default Zone;