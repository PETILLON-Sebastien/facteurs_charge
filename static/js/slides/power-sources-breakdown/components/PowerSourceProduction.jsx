import React from "react";

import PowerSourceLogo from '../../../power-sources/components/PowerSourceLogo';
import PowerSourceName from "../../../power-sources/components/PowerSourceName";
import PowerSourceKPI from "../../../power-sources/components/PowerSourceKPI";

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
                <div className="column is-5-fullhd is-5-widescreen is-5-desktop is-5-tablet is-10-mobile is-offset-2 is-vcentered ">
                    <PowerSourceLogo type={type} cssClass={cssClass} />
                </div>

                <div className={`column is-7-fullhd is-7-widescreen is-7-desktop is-7-tablet is-10-mobile is-offset-2 has-text-left`}>
                    <PowerSourceName type={type} cssClass={cssClass} />

                    <div className="content statistiques representation-data-text">
                        {this.state.production}
                    </div>
                </div>
            </div>
        );
    }
}
export default PowerSourceProduction;