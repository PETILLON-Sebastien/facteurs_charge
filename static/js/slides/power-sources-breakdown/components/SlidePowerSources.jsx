import React from "react";

import PowerSourceProduction from "./PowerSourceProduction";
import GraphPowerSourceBreakdown from "./GraphPowerSourceBreakdown";

import {ZoneContext} from '../../../ZoneContext';

class SlidePowerSources extends React.Component {

    constructor(props) {
        super(props);

        const data = JSON.parse(this.get());
        let stub = data[0].production;

        const updatedStub = this.adaptData(stub);

        this.state = {
            currentData: updatedStub,
            history: data
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
        updatedStub.thermal = { production: stub.thermal };

        return updatedStub;
    }

    get() {
        return '[{"timestamp":"2020-05-26T12:00:12.853Z","zoneId":"string","production":{"solar":{"value":1200,"unit":"MW"},"wind":{"value":1000,"unit":"MW"},"hydraulic":{"value":1000,"unit":"MW"},"nuclear":{"value":1000,"unit":"MW"},"bioenergies":{"value":1000,"unit":"MW"},"thermal":{"value":1900,"unit":"MW"}}},      {"timestamp":"2020-05-26T12:19:12.853Z","zoneId":"string","production":{"solar":{"value":300,"unit":"MW"},"wind":{"value":330,"unit":"MW"},"hydraulic":{"value":300,"unit":"MW"},"nuclear":{"value":300,"unit":"MW"},"bioenergies":{"value":300,"unit":"MW"},"thermal":{"value":300,"unit":"MW"}}}]';
    }

    render() {
        const currentData = this.state.currentData;
        const currentZoneID = this.context.currentZone.id;
        const currentZoneName = this.context.currentZone.label;

        return (
            <React.Fragment>

                <div className="columns" style={{"marginTop":"3rem"}}>
                    <div className="column is-full"><h1 className="is-size-1 has-text-centered">Source d'énergie</h1></div>
                </div>
                <div className="columns" style={{"marginBottom":"3rem"}}>
                    <div className="column is-full  has-text-centered"><span className="is-size-4">La FRANCE produit de l’énergie de différentes manières, c’est ce qu’on appelle un « mix » énergétique.
                    Ce mix est injecté dans la grille française de production.
Actuellement, en <span className="has-background-info" style={{"paddingLeft":"0.5rem","paddingRight":"0.5rem", "borderRadius":"3px"}}>{currentZoneName}</span> (#{currentZoneID}), l’énergie NUCLEAIRE contribue le plus à la grille.</span></div>
                </div>
                <div className="columns is-multiline">
                    <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-11-tablet is-11-mobile is-offset-1-mobile">
                        <div className="columns is-multiline is-mobile is-vcentered">
                            <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile" style={{ "marginTop": "10px" }}>
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
                                <PowerSourceProduction production={currentData.thermal.production} type="thermal" cssClass="power-sources" />
                            </div>
                        </div>
                    </div>
                    <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-12-tablet is-12-mobile has-text-centered">
                        <GraphPowerSourceBreakdown productionsOverTime={this.state.history} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

SlidePowerSources.contextType = ZoneContext;

export default SlidePowerSources;