import React from "react";

import PowerSourceProduction from "./PowerSourceProduction";
import GraphPowerSourceBreakdown from "./GraphPowerSourceBreakdown";

import { ZoneContext } from '../../../ZoneContext';
import PowerSourceNameInline from "../../../power-sources/components/PowerSourceNameInline";
import TimeSlider from '../../../TimeSlider';
import moment from "moment";


class SlidePowerSources extends React.Component {

    constructor(props) {
        super(props);
    }

    findHighestSourceOfPower(powerBreakdown) {
        let bestValue = 0, bestComponent = undefined;
        Object.keys(powerBreakdown).forEach((installationType) => {
            if (bestComponent == undefined) {
                bestComponent = <PowerSourceNameInline type={installationType} />;
                bestValue = powerBreakdown[installationType].power.value;
            } else {
                //    else {
                if (powerBreakdown[installationType].power.value > bestValue) {
                    bestComponent = <PowerSourceNameInline type={installationType} />;
                    bestValue = powerBreakdown[installationType].power.value;
                }
                // }
            }
        });

        return bestComponent;
    }

    render() {
        const highestSourceOfPower = this.findHighestSourceOfPower(this.props.data.latestPowerBreakdown)
        const currentData = this.props.data.latestPowerBreakdown;
        const currentZoneID = this.props.currentZone.id;
        const currentZoneName = this.props.currentZone.label;


        let arrayOfPowerSourceComponents = [];
        Object.keys(currentData).forEach((installationType) => {
            const newComponent =
                <div  key={installationType} className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile " style={{ "marginTop": "10px" }}>
                    <PowerSourceProduction key={installationType} production={currentData[installationType].power} type={installationType} cssClass="power-sources" />
                </div>;

            arrayOfPowerSourceComponents.push(newComponent);
        });

        return (

            <React.Fragment>
                <div className="section is-medium" id="slide-installations" style={{ "minHeight": "100vh" }}>
                    {/* <div className="container"> */}

                        <div className="columns">
                            <div className="column is-full"><h1 className="is-size-1 has-text-centered">Source d'énergie</h1></div>
                        </div>
                        <div className="columns" style={{ "marginBottom": "2rem" }}>
                            <div className="column is-full has-text-centered">
                                <div className="is-size-6">En <span className="has-background-grey text-inline-highlighted">{currentZoneName}</span>, on produit de l’énergie de différentes manières, c’est ce qu’on appelle un « mix » énergétique.</div>
                                <div className="is-size-5" style={{ "marginTop": "2rem" }}>
                                    Actuellement, en <span className="has-background-grey text-inline-highlighted">{currentZoneName}</span>, l’énergie {highestSourceOfPower} est la production la plus importante.
                        </div>
                            </div>
                        </div>
                        <div className="columns is-multiline is-centered">
                            <div className="column is-4-widescreen is-4-full-hd is-4-desktop is-12-tablet is-12-mobile">
                                <div className="columns is-multiline is-mobile is-vcentered">
                                    {arrayOfPowerSourceComponents}
                                    {/* <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile " style={{ "marginTop": "10px" }}>
                                        <PowerSourceProduction production={currentData.solar.power} type="solar" cssClass="power-sources" />
                                    </div>
                                    <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile" style={{ "marginTop": "10px" }}>
                                        <PowerSourceProduction production={currentData.wind.power} type="wind" cssClass="power-sources" />
                                    </div>
                                    <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile" style={{ "marginTop": "10px" }}>
                                        <PowerSourceProduction production={currentData.hydraulic.power} type="hydraulic" cssClass="power-sources" />
                                    </div>
                                    <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile" style={{ "marginTop": "10px" }}>
                                        <PowerSourceProduction production={currentData.nuclear.power} type="nuclear" cssClass="power-sources" />
                                    </div>
                                    <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile" style={{ "marginTop": "10px" }}>
                                        <PowerSourceProduction production={currentData.bioenergy.power} type="bioenergy" cssClass="power-sources" />
                                    </div>
                                    <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile" style={{ "marginTop": "10px" }}>
                                        <PowerSourceProduction production={currentData.fossil.power} type="fossil" cssClass="power-sources" />
                                    </div> */}
                                </div>
                            </div>

                            <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-12-tablet is-12-mobile has-text-centered" style={{ "marginTop": "2rem" }}>
                                <GraphPowerSourceBreakdown productionsOverTime={this.props.data.powerBreakdownHistory} currentZoneName={currentZoneName} />
                                {/* <TimeSlider hours={this.state.timeMarks} currentTime={0} endOfTimeFrame={this.state.timeMarks[this.state.timeMarks.length - 1]} /> */}
                            </div>
                        </div>
                    {/* </div> */}
                </div>

            </React.Fragment>

        );

    }
}

// SlidePowerSources.contextType = ZoneContext;

export default SlidePowerSources;
