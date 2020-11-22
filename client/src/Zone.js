import React from "react";
import PowerSourceStyleMap from './power-sources/components/PowerSourceStyleMap';

const Zone = (props) => {
  const hookCallback = props.zoneChanged;
  const zoneDescription = props.description;

  const powerSourceStyleMap = new PowerSourceStyleMap(zoneDescription.highestLoad);

  return (
    <path
      d={zoneDescription.path}
      transform={zoneDescription.transform}
      className={`region region-${powerSourceStyleMap.classes}`}
      onClick={() => hookCallback(zoneDescription.id)}
      strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="9" display="inline">
    </path>
  );
};


export default Zone;