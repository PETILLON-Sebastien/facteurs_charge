import React from "react";
import PowerSourceStyleMap from "./PowerSourceStyleMap";

const PowerSourceNameLegend = ({ type, cssClass = "" }) => {
  let classes = "legende-moyen-production legende-";
  let powerSourceStyleMap = new PowerSourceStyleMap(type);
  let cssClasses = classes + powerSourceStyleMap.classes;
  let name = powerSourceStyleMap.name || "DEFAULT";

  return (
    <React.Fragment>
      <span className={cssClasses}></span>
      <span className={`${cssClass}-source-name`}>{name}</span>
    </React.Fragment>
  );
};
export default PowerSourceNameLegend;
