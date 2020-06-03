import React from "react";

import PowerSourceLogo from '../../../power-sources/components/PowerSourceLogo';
import PowerSourceKPI from "../../../power-sources/components/PowerSourceKPI";
import PowerSourceNameLegend from "../../../power-sources/components/PowerSourceNameLegend";

class PowerSourceProduction extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            type: this.props.type,
            cssClass: this.props.cssClass || '',
            kpis: {}
        };

        const production = this.props.production;
        const cssClass = this.props.cssClass;

        this.buildKPI("Production", production, cssClass);
    }

    buildKPI(kpiName, kpiDescription, cssClass = '') {
        if (kpiDescription != undefined) {
            const kpiValue = Math.round(kpiDescription.value);
            const kpiUnit = kpiDescription.unit;
            const kpi = <PowerSourceKPI title={kpiName} value={kpiValue} unit={kpiUnit} cssClass={cssClass} />
            this.state.production = kpi;
        }
    }

    render() {
        const cssClass = this.state.cssClass;
        const type = this.state.type;

        return (
            <div className={`columns is-gapless is-vcentered ${cssClass}-power-source`}>
                <div className="column is-3-fullhd is-3-widescreen is-3-desktop is-4-tablet is-12-mobile has-text-centered is-vcentered ">
                    <PowerSourceLogo type={type} cssClass={cssClass} />
                </div>

                <div className={`column is-9-fullhd is-9-widescreen is-9-desktop is-8-tablet is-12-mobile has-text-left has-text-centered-mobile`}>
                    <PowerSourceNameLegend type={type} cssClass={cssClass} />

                    <div className="content statistiques representation-data-text">
                        {this.state.production}
                    </div>
                </div>
            </div>
        );
    }
}
export default PowerSourceProduction;