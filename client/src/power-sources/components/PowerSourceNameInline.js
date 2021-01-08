import React from "react";
import PowerSourceStyleMap from "./PowerSourceStyleMap";

const PowerSourceNameInline = ({ type, cssClass }) => {

  let powerSourceStyleMap = new PowerSourceStyleMap(type);
  const cssClasses = powerSourceStyleMap.classes || "";
  const name = powerSourceStyleMap.name || "DEFAULT";

  return (
    <React.Fragment>
      <span
        className={`${cssClass} power-source-inline-${cssClasses}`}
      >
        {name}
      </span>
    </React.Fragment>
  );
}
export default PowerSourceNameInline;
