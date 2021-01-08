import React from "react";

const PowerSourceKPI = ({ title, value, unit, cssClass }) => {

  const valueLocale = Number(value).toLocaleString("fr");

  return (
    <div className={`${cssClass}-power-source-wrapper`}>
      <span className="value">{title}&nbsp;:</span>
      <span className="value_value">{valueLocale} </span>
      <span className="unit">{unit}</span>
    </div>
  );
}
export default PowerSourceKPI;
