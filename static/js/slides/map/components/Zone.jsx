import React from "react";
import PowerSourceStyleMap from '../../../power-sources/components/PowerSourceStyleMap';

class Zone extends React.Component { 
  constructor(props) {
    super(props);
  }

  render() {
    const hookCallback = this.props.zoneChanged;
    const zoneDescription = this.props.description;

    const powerSourceStyleMap = new PowerSourceStyleMap(zoneDescription.highestLoad);

    return (<path
        d={zoneDescription.path}
        transform={zoneDescription.transform}
        className={`region region-${powerSourceStyleMap.classes}`}
        onClick={() => hookCallback(zoneDescription.id)}
        strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="9" display="inline">
    >
    </path>);
  }
}

export default Zone;