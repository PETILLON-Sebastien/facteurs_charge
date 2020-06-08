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

        const data = JSON.parse(this.get());
        let stub = data[0].production;

        const updatedStub = this.adaptData(stub);
        const bestProductor = this.findBestProductor(updatedStub);
        const timeMarks = this.buildTimeMarks(data);

        this.state = {
            currentData: updatedStub,
            history: data,
            bestProductor: bestProductor,
            timeMarks: timeMarks
        };
    }

    adaptData(stub) {
        let updatedStub = {};
        Object.assign(updatedStub, stub);

        updatedStub.solar = { production: stub.solar };
        updatedStub.wind = { production: stub.wind };
        updatedStub.hydraulic = { production: stub.hydraulic };
        updatedStub.nuclear = { production: stub.nuclear };
        updatedStub.bioenergies = { production: stub.bioenergies };
        updatedStub.fossil = { production: stub.fossil };

        return updatedStub;
    }

    get() {
        return '[{"timestamp":"2020-05-26T12:00:12.853Z","zoneId":"string","production":{"solar":{"value":1200,"unit":"MW"},"wind":{"value":1000,"unit":"MW"},"hydraulic":{"value":1000,"unit":"MW"},"nuclear":{"value":1000,"unit":"MW"},"bioenergies":{"value":1000,"unit":"MW"},"fossil":{"value":1900,"unit":"MW"}}},      {"timestamp":"2020-05-26T12:19:12.853Z","zoneId":"string","production":{"solar":{"value":300,"unit":"MW"},"wind":{"value":330,"unit":"MW"},"hydraulic":{"value":300,"unit":"MW"},"nuclear":{"value":300,"unit":"MW"},"bioenergies":{"value":300,"unit":"MW"},"fossil":{"value":300,"unit":"MW"}}}]';
    }

    buildTimeMarks(history) {
        let marks = {};

        const stepSize = 100 / (history.length-1);
        let nbOfInstants = 0;
        console.log("Step size", stepSize);
        history.forEach((instant) => {
            const currentTimestamp = instant.timestamp;
            const currentTimestampFormatted = moment(currentTimestamp).format("HH:mm");
            const currentInstantIndex = (nbOfInstants * stepSize);
            marks[currentInstantIndex] = currentTimestampFormatted;
            console.log("Pushing", currentTimestampFormatted, "at", currentInstantIndex);
            nbOfInstants++;
        });

        return marks;
    }

    findBestProductor(currentData) {
        let best = undefined;
        Object.keys(currentData).forEach((installation) => {
            if (best == undefined) {
                best = <PowerSourceNameInline type={installation} />;
            } else {
                if (installation.production > best.production) {
                    best = <PowerSourceNameInline type={installation} />;
                }
            }
        });

        return best;
    }

    render() {
        const currentData = this.state.currentData;
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
                            Actuellement, en <span className="has-background-grey text-inline-highlighted">{currentZoneName}</span>, l’énergie {this.state.bestProductor} contribue le plus à la grille.
                        </div>
                    </div>
                </div>
                <div className="columns is-multiline">
                    <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-12-tablet is-12-mobile">
                        <div className="columns is-multiline is-mobile is-vcentered">
                            <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile " style={{ "marginTop": "10px" }}>
                                <PowerSourceProduction production={currentData.solar.production} type="solar" cssClass="power-sources" />
                            </div>
                            <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile" style={{ "marginTop": "10px" }}>
                                <PowerSourceProduction production={currentData.wind.production} type="wind" cssClass="power-sources" />
                            </div>
                            <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile" style={{ "marginTop": "10px" }}>
                                <PowerSourceProduction production={currentData.hydraulic.production} type="hydraulic" cssClass="power-sources" />
                            </div>
                            <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile" style={{ "marginTop": "10px" }}>
                                <PowerSourceProduction production={currentData.nuclear.production} type="nuclear" cssClass="power-sources" />
                            </div>
                            <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile" style={{ "marginTop": "10px" }}>
                                <PowerSourceProduction production={currentData.bioenergies.production} type="bioenergies" cssClass="power-sources" />
                            </div>
                            <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile" style={{ "marginTop": "10px" }}>
                                <PowerSourceProduction production={currentData.fossil.production} type="fossil" cssClass="power-sources" />
                            </div>
                        </div>
                    </div>

                    <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-12-tablet is-12-mobile has-text-centered" style={{ "marginTop": "2rem" }}>
                        <GraphPowerSourceBreakdown productionsOverTime={this.state.history} currentZoneName={currentZoneName} />
                    </div>
                    <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-12-tablet is-12-mobile has-text-centered" style={{ "marginTop": "2rem" }}>
                        <TimeSlider hours={this.state.timeMarks} currentTime={0} endOfTimeFrame={this.state.timeMarks[this.state.timeMarks.length - 1]} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

SlidePowerSources.contextType = ZoneContext;

export default SlidePowerSources;