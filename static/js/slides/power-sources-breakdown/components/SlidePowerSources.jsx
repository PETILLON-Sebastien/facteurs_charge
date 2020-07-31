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


        // this.state = {
        //     latestPowerBreakdown: [],
        //     powerBreakdownHistory: [],
        //     highestSourceOfPower: {},
        //     timeMarks: {},
        //     isLoaded: false
        // }
    }

    // componentDidMount() {
    //     // this.setState({ currentZone: this.context.currentZone });
    //     this.fetchCurrentZoneData();
    // }

    // static getDerivedStateFromProps(props, state) {
    //     const newZoneID = props.currentZoneProp.id;
    //     console.log("getDerivedStateFromProps", props, state);
    //     SlidePowerSources.fetchCurrentZoneData(newZoneID,(data) => {
    //         return {
    //             isLoaded: true,
    //             latestPowerBreakdown: data.latestPowerBreakdown,
    //             powerBreakdownHistory: data.powerBreakdownHistory,
    //             highestSourceOfPower: data.highestSourceOfPower,
    //             timeMarks: data.timeMarks
    //         };
    //     });
    // }

    // componentDidUpdate(prevProps) {
    //     // Typical usage (don't forget to compare props):
    //     // if (this.props.userID !== prevProps.userID) {
    //     //   this.fetchData(this.props.userID);
    //     // }
    //     console.log("componentDidUpdate", this.props.currentZone.id, prevProps);

    //     if (this.props.currentZone.id !== prevProps.currentZone.id) {
    //         this.fetchCurrentZoneData();
    //     }
    // }



    // TODO this should be part of the Graph's responsability
    // buildTimeMarks(history) {
    //     let marks = {};

    //     const stepSize = 100 / (history.length - 1);
    //     let nbOfInstants = 0;

    //     const hardcodedTickTime = [0, 6, 12, 18];

    //     history.forEach((instant) => {
    //         const currentTimestamp = instant.datetime;
    //         // fixme console.log(hardcodedTickTime, moment(currentTimestamp).hours(), (hardcodedTickTime.lastIndexOf(moment(currentTimestamp).hours()) != -1));
    //         if (hardcodedTickTime.lastIndexOf(moment(currentTimestamp).hours()) != -1) {
    //             const currentTimestampFormatted = moment(currentTimestamp).format("HH:mm");
    //             const currentInstantIndex = (nbOfInstants * stepSize);
    //             marks[moment(currentTimestamp).hours()] = currentTimestampFormatted;

    //             nbOfInstants++;
    //         }
    //     });

    //     return marks;
    // }

    findHighestSourceOfPower(powerBreakdown) {
        let bestValue = 0, bestComponent = undefined;
        Object.keys(powerBreakdown).forEach((installationType) => {
            if (bestComponent == undefined) {
                bestComponent = <PowerSourceNameInline type={installationType} />;
                bestValue = powerBreakdown[installationType].power.value;
            } else {
                if (powerBreakdown[installationType].power.value > bestValue) {
                    bestComponent = <PowerSourceNameInline type={installationType} />;
                    bestValue = powerBreakdown[installationType].power.value;
                }
            }
        });

        return bestComponent;
    }

    render() {
        console.log(this.props);
        console.log("Refreshing power source breakdown slide.", this.props.currentZone.id);

        const highestSourceOfPower = this.findHighestSourceOfPower(this.props.data.latestPowerBreakdown)
        // if (this.state.isLoaded) {
            const currentData = this.props.data.latestPowerBreakdown;
            console.log(currentData);
            const currentZoneID = this.props.currentZone.id;
            const currentZoneName = this.props.currentZone.label;

            return (

                <React.Fragment>
                    <div className="section is-medium" id="slide-installations" style={{ "minHeight": "100vh" }}>
                        <div className="container">

                            <div className="columns">
                                <div className="column is-full"><h1 className="is-size-1 has-text-centered">Source d'énergie</h1></div>
                            </div>
                            <div className="columns" style={{ "marginBottom": "2rem" }}>
                                <div className="column is-full has-text-centered">
                                    <div className="is-size-6"><span className="has-background-grey text-inline-highlighted">{currentZoneName}</span> produit de l’énergie de différentes manières, c’est ce qu’on appelle un « mix » énergétique. Ce mix est injecté dans la grille française de production.</div>
                                    <div className="is-size-5" style={{ "marginTop": "2rem" }}>
                                        Actuellement, en <span className="has-background-grey text-inline-highlighted">{currentZoneName}</span>, l’énergie {highestSourceOfPower} contribue le plus à la grille.
                        </div>
                                </div>
                            </div>
                            <div className="columns is-multiline">
                                <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-12-tablet is-12-mobile">
                                    <div className="columns is-multiline is-mobile is-vcentered">
                                        <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile " style={{ "marginTop": "10px" }}>
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
                                        </div>
                                    </div>
                                </div>

                                <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-12-tablet is-12-mobile has-text-centered" style={{ "marginTop": "2rem" }}>
                                    <GraphPowerSourceBreakdown productionsOverTime={this.props.data.powerBreakdownHistory} currentZoneName={currentZoneName} />
                                    {/* <TimeSlider hours={this.state.timeMarks} currentTime={0} endOfTimeFrame={this.state.timeMarks[this.state.timeMarks.length - 1]} /> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </React.Fragment>

            );
        // }
        // else {
        //     return <React.Fragment>
        //         LOADING SA MERE
        //     </React.Fragment>
        // }
    }
}

// SlidePowerSources.contextType = ZoneContext;

export default SlidePowerSources;