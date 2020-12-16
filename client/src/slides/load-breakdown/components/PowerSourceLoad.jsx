import React from "react";

import PowerSourceLogo from "../../../power-sources/components/PowerSourceLogo";
import PowerSourceNameLegend from "../../../power-sources/components/PowerSourceNameLegend";
import PowerSourceKPI from "../../../power-sources/components/PowerSourceKPI";
import LoadBar from "../../../power-sources/components/LoadBar";

class PowerSourceLoad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type,
      cssClass: this.props.cssClass || "",
      kpis: [],
    };

    const load = this.props.load;
    const production = this.props.production;
    const capacity = this.props.capacity;
    const cssClass = this.props.cssClass;

    const loadBar = this.buildProgressBar(load);

    let kpis = [];
    kpis.push(this.buildKPI("Taux de charge", load, cssClass));
    kpis.push(this.buildKPI("Production", production, cssClass));
    kpis.push(this.buildKPI("Capacité", capacity, cssClass));

    this.state.kpis = kpis;
    this.state.loadBar = loadBar;
  }

  buildProgressBar(load) {
    if (!isNaN(load)) {
      const loadBar = <LoadBar load={load} />;
      return loadBar;
    }
  }

  buildKPI(kpiName, kpiDescription, cssClass = "") {
    if (kpiDescription !== undefined) {
      const kpiValue = Math.round(kpiDescription.value);
      const kpiUnit = kpiDescription.unit || "%"; //fixme this clause was added to patch the fact that the server does not provide a unit when returning load values
      const kpi = (
        <PowerSourceKPI
          title={kpiName}
          value={kpiValue}
          unit={kpiUnit}
          cssClass={cssClass}
        />
      );
      // this.state.kpis.push(kpi);
      return kpi;
    }
  }

  render() {
    const cssClass = this.state.cssClass;
    const type = this.state.type;
    const load = this.props.load.value;

    return (
      <div
        className={`columns is-gapless is-vcentered ${cssClass}-power-source`}
      >
        <div className="column is-3-fullhd is-3-widescreen is-3-desktop is-4-tablet is-12-mobile has-text-centered is-vcentered ">
          <PowerSourceLogo type={type} load={load} cssClass={cssClass} />
        </div>

        <div
          className={`column is-9-fullhd is-9-widescreen is-9-desktop is-8-tablet is-12-mobile has-text-left has-text-centered-mobile`}
        >
          <PowerSourceNameLegend type={type} cssClass={cssClass} />

          <div className="content statistiques representation-data-text">
            {this.state.loadBar}
            {this.state.kpis[0]}
            {this.state.kpis[1]}
            {this.state.kpis[2]}
          </div>
        </div>
      </div>
    );
  }
}
export default PowerSourceLoad;
