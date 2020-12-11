import React from "react";

import PowerSourceProduction from "./slides/power-sources-breakdown/components/PowerSourceProduction";
import GraphPowerSourceBreakdown from "./slides/power-sources-breakdown/components/GraphPowerSourceBreakdown";

import { ZoneContext } from './ZoneContext';
import PowerSourceNameInline from "./power-sources/components/PowerSourceNameInline";
// FIXME import TimeSlider from './TimeSlider'; 
// {/* <TimeSlider hours={this.state.timeMarks} currentTime={0} endOfTimeFrame={this.state.timeMarks[this.state.timeMarks.length - 1]} /> */ }



const SlidePowerSources = ({ powerBreakdownHistory, currentZone: { id, label } }) => {

    const latestPowerBreakdown = powerBreakdownHistory[powerBreakdownHistory.length - 1].breakdown;
    const highestSourceOfPower = findHighestSourceOfPower(latestPowerBreakdown);
    const currentData = latestPowerBreakdown;
    const currentZoneID = id;
    const currentZoneName = label;

    let arrayOfPowerSourceComponents = [];
    Object.keys(currentData).forEach((installationType) => {
        const newComponent =
            <div key={installationType} className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile " style={{ "marginTop": "10px" }}>
                <PowerSourceProduction key={installationType} production={currentData[installationType].power} type={installationType} cssClass="power-sources" />
            </div>;

        arrayOfPowerSourceComponents.push(newComponent);
    });

    return (

        <React.Fragment>
            <div className="section is-medium" id="slide-installations" style={{ "minHeight": "100vh" }}>
                <div className="columns">
                    <div className="column is-full"><h1 className="is-size-1 has-text-centered">Source d'énergie</h1></div>
                </div>
                <div className="columns" style={{ "marginBottom": "2rem" }}>
                    <div className="column is-full has-text-centered">
                        <div className="is-size-6">En <span className="has-background-grey text-inline-highlighted">{currentZoneName}</span>, on produit de l’énergie de différentes manières, c’est ce qu’on appelle un « mix » énergétique.</div>
                        <div className="is-size-5" style={{ "marginTop": "2rem" }}>
                            Actuellement, en <span className="has-background-grey text-inline-highlighted">{currentZoneName}</span>, l’énergie {highestSourceOfPower} est la source de production électrique la plus importante.
                        </div>
                    </div>
                </div>
                <div className="columns is-multiline is-centered">
                    <div className="column is-4-widescreen is-4-full-hd is-4-desktop is-12-tablet is-12-mobile">
                        <div className="columns is-multiline is-mobile is-vcentered">
                            {arrayOfPowerSourceComponents}
                        </div>
                    </div>

                    <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-12-tablet is-12-mobile has-text-centered" style={{ "marginTop": "2rem" }}>
                        <GraphPowerSourceBreakdown productionsOverTime={powerBreakdownHistory} currentZoneName={currentZoneName} />
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}


const findHighestSourceOfPower = (powerBreakdown) => {
    let bestValue = 0, bestComponent = undefined;
    Object.keys(powerBreakdown).forEach((installationType) => {
        if (bestComponent == undefined) {
            bestComponent = <PowerSourceNameInline type={installationType} />;
            bestValue = powerBreakdown[installationType].production.value;
        } else {
            if (powerBreakdown[installationType].production.value > bestValue) {
                bestComponent = <PowerSourceNameInline type={installationType} />;
                bestValue = powerBreakdown[installationType].production.value;
            }
        }
    });

    return bestComponent;
}

export default SlidePowerSources;
