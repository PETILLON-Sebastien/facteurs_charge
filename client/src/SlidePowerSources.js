import React from "react";

import PowerSourceProduction from "./slides/power-sources-breakdown/components/PowerSourceProduction";
import GraphPowerSourceBreakdown from "./slides/power-sources-breakdown/components/GraphPowerSourceBreakdown";
import SlideContentLayout from "./SlideContentLayout";
import PowerSourceNameInline from "./power-sources/components/PowerSourceNameInline";
// FIXME import TimeSlider from './TimeSlider'; 
// {/* <TimeSlider hours={this.state.timeMarks} currentTime={0} endOfTimeFrame={this.state.timeMarks[this.state.timeMarks.length - 1]} /> */ }



const SlidePowerSources = ({ powerBreakdownHistory, currentZone: { id, label } }) => {
    const latestPowerBreakdown = powerBreakdownHistory[powerBreakdownHistory.length - 1].breakdown;
    const highestSourceOfPower = findHighestSourceOfPower(latestPowerBreakdown);

    const currentData = latestPowerBreakdown;
    const currentZoneName = label;

    const arrayOfPowerSourceComponents = buildPowerSourceCards(currentData);

    return (

        <React.Fragment>
            <SlideContentLayout anchor="slide-installations">
                <h1 className="is-size-1 has-text-centered">Source d'énergie</h1>
                <React.Fragment>
                    <div className="is-size-6">En <span className="has-background-grey text-inline-highlighted">{currentZoneName}</span>, on produit de l’énergie de différentes manières, c’est ce qu’on appelle un « mix » énergétique.</div>
                    <div className="is-size-5" style={{ "marginTop": "2rem" }}>
                        Actuellement, en <span className="has-background-grey text-inline-highlighted">{currentZoneName}</span>, l’énergie {highestSourceOfPower} est la source de production électrique la plus importante.
                        </div>
                </React.Fragment>
                {arrayOfPowerSourceComponents}
                <GraphPowerSourceBreakdown productionsOverTime={powerBreakdownHistory} currentZoneName={currentZoneName} />
            </SlideContentLayout>
        </React.Fragment>
    );
}

const buildPowerSourceCards = (currentData) => {
    let arrayOfPowerSourceComponents = [];
    Object.keys(currentData).forEach((installationType) => {
        const newComponent =
            <div key={installationType} className="column powerSourceProduction is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile " style={{ "marginTop": "10px" }}>
                <PowerSourceProduction key={installationType} production={currentData[installationType].production} type={installationType} cssClass="power-sources" />
            </div>;

        arrayOfPowerSourceComponents.push(newComponent);
    });

    return arrayOfPowerSourceComponents;
};

const findHighestSourceOfPower = (powerBreakdown) => {
    let bestValue = 0, bestComponent = undefined;
    Object.keys(powerBreakdown).forEach((installationType) => {
        if (bestComponent === undefined) {
            bestComponent = <PowerSourceNameInline type={installationType} />;
            bestValue = powerBreakdown[installationType].production.value;
        } else {
            // fixme this is where the bug is triggered.
            if (powerBreakdown[installationType].production === undefined) {
                console.warn(powerBreakdown[installationType]);
            }
            if (powerBreakdown[installationType].production.value > bestValue) {
                bestComponent = <PowerSourceNameInline type={installationType} />;
                bestValue = powerBreakdown[installationType].production.value;
            }
        }
    });

    return bestComponent;
}

export default SlidePowerSources;
