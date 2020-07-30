import React from "react";

import PowerSourceProduction from "./PowerSourceProduction";
import GraphPowerSourceBreakdown from "./GraphPowerSourceBreakdown";

import { ZoneContext } from '../../../ZoneContext';
import PowerSourceNameInline from "../../../power-sources/components/PowerSourceNameInline";
import TimeSlider from '../../../TimeSlider';
import moment from "moment";

// TODO this should be shared accross components somehow
const root_endpoint = process.env.API_URL + "/api/v1";

class SlidePowerSources extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            latestPowerBreakdown: [],
            powerBreakdownHistory: [],
            highestSourceOfPower: {},
            timeMarks: {},
            isLoaded: false
        }
    }

    componentDidMount() {
        const currentZoneId =  this.context.currentZone.id; // todo this is the internal mapping
        fetch(root_endpoint + "/zones/FR-11/installations/production/breakdown")
            .then((data) => data.json()).then((data) => {
                // PRECONDITION: Considering timely ordered data
                const latestData = data[data.length-1].powerBreakdown;
                const highestSourceOfPower = this.findHighestSourceOfPower(latestData);
                const timeMarks = this.buildTimeMarks(data);

                this.setState({ 
                    isLoaded: true,
                    latestPowerBreakdown: latestData,
                    powerBreakdownHistory: data,
                    highestSourceOfPower: highestSourceOfPower,
                    timeMarks:timeMarks
                 });
            });
    }


    buildTimeMarks(history) {
        let marks = {};

        const stepSize = 100 / (history.length - 1);
        let nbOfInstants = 0;

        history.forEach((instant) => {
            const currentTimestamp = instant.datetime;
            const currentTimestampFormatted = moment(currentTimestamp).format("HH:mm");
            const currentInstantIndex = (nbOfInstants * stepSize);
            marks[currentInstantIndex] = currentTimestampFormatted;

            nbOfInstants++;
        });

        return marks;
    }

    findHighestSourceOfPower(powerBreakdown) {
        let bestValue = 0, bestComponent = undefined;
        Object.keys(powerBreakdown).forEach((installationType) => {

            if (bestComponent == undefined) {
                bestComponent = <PowerSourceNameInline type={installationType} />;
                bestValue = powerBreakdown[installationType];
            } else {
                if (powerBreakdown[installationType] > bestValue) {
                    bestComponent = <PowerSourceNameInline type={installationType} />;
                    bestValue = powerBreakdown[installationType];
                }
            }
        });

        return bestComponent;
    }

    render() {

        if (this.state.isLoaded) {
            const currentData = this.state.latestPowerBreakdown;
            const currentZoneID = this.context.currentZone.id;
            const currentZoneName = this.context.currentZone.label;

            return (
                <React.Fragment>

                    <div className="columns">
                        <div className="column is-full"><h1 className="is-size-1 has-text-centered">Source d'énergie</h1></div>
                    </div>
                    <div className="columns" style={{ "marginBottom": "2rem" }}>
                        <div className="column is-full has-text-centered">
                            <div className="is-size-6"><span className="has-background-grey text-inline-highlighted">{currentZoneName}</span> produit de l’énergie de différentes manières, c’est ce qu’on appelle un « mix » énergétique. Ce mix est injecté dans la grille française de production.</div>
                            <div className="is-size-5" style={{ "marginTop": "2rem" }}>
                                Actuellement, en <span className="has-background-grey text-inline-highlighted">{currentZoneName}</span>, l’énergie {this.state.highestSourceOfPower} contribue le plus à la grille.
                        </div>
                        </div>
                    </div>
                    <div className="columns is-multiline">
                        <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-12-tablet is-12-mobile">
                            <div className="columns is-multiline is-mobile is-vcentered">
                                <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile " style={{ "marginTop": "10px" }}>
                                    <PowerSourceProduction production={currentData.solar} type="solar" cssClass="power-sources" />
                                </div>
                                <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile" style={{ "marginTop": "10px" }}>
                                    <PowerSourceProduction production={currentData.wind} type="wind" cssClass="power-sources" />
                                </div>
                                <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile" style={{ "marginTop": "10px" }}>
                                    <PowerSourceProduction production={currentData.hydraulic} type="hydraulic" cssClass="power-sources" />
                                </div>
                                <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile" style={{ "marginTop": "10px" }}>
                                    <PowerSourceProduction production={currentData.nuclear} type="nuclear" cssClass="power-sources" />
                                </div>
                                <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile" style={{ "marginTop": "10px" }}>
                                    <PowerSourceProduction production={currentData.bioenergy} type="bioenergy" cssClass="power-sources" />
                                </div>
                                <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile" style={{ "marginTop": "10px" }}>
                                    <PowerSourceProduction production={currentData.fossil} type="fossil" cssClass="power-sources" />
                                </div>
                            </div>
                        </div>

                        <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-12-tablet is-12-mobile has-text-centered" style={{ "marginTop": "2rem" }}>
                            <GraphPowerSourceBreakdown productionsOverTime={this.state.powerBreakdownHistory} currentZoneName={currentZoneName} />
                            <TimeSlider hours={this.state.timeMarks} currentTime={0} endOfTimeFrame={this.state.timeMarks[this.state.timeMarks.length - 1]} />
                        </div>
                    </div>
                </React.Fragment>
            );
        }
        else {
            return <React.Fragment>
                LOADING SA MERE
            </React.Fragment>
        }
    }
}

SlidePowerSources.contextType = ZoneContext;

export default SlidePowerSources;