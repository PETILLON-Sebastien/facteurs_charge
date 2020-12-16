import React from "react";

import PowerSourceLogo from "../../../power-sources/components/PowerSourceLogo";
import PowerSourceKPI from "../../../power-sources/components/PowerSourceKPI";
import PowerSourceNameLegend from "../../../power-sources/components/PowerSourceNameLegend";

const PowerSourceProduction = ({ type, production, cssClass }) => {
  const kpiValue = Math.round(production.value);
  const kpiUnit = production.unit || "%"; //fixme this clause was added to patch the fact that the server does not provide a unit when returning load values
  const kpi = (
    <PowerSourceKPI
      title={"Production"}
      value={kpiValue}
      unit={kpiUnit}
      cssClass={cssClass}
    />
  );

  return (
    <div className={`columns is-gapless is-vcentered ${cssClass}-power-source`}>
      <div className="column is-3-fullhd is-3-widescreen is-3-desktop is-4-tablet is-12-mobile has-text-centered is-vcentered ">
        <PowerSourceLogo type={type} cssClass={cssClass} />
      </div>

      <div
        className={`column is-9-fullhd is-9-widescreen is-9-desktop is-8-tablet is-12-mobile has-text-left has-text-centered-mobile`}
      >
        <PowerSourceNameLegend type={type} cssClass={cssClass} />

        <div className="content statistiques representation-data-text">
          {kpi}
        </div>
      </div>
    </div>
  );
};

export default PowerSourceProduction;
