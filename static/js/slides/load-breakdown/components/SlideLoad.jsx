import React from "react";
import PowerSourceLoad from './PowerSourceLoad';
import GraphLoadEvolution from "./GraphLoadEvolution";
import {ZoneContext} from '../../../ZoneContext';

class SlideLoad extends React.Component {

    constructor(props) {
        super(props);


        const fakeData = this.get();
        const [loadHistory, data] = [JSON.parse(fakeData[0]), JSON.parse(fakeData[1])];
        let stub = data[0];

        this.state = {
            breakdown: stub.breakdown,
            loadHistory: loadHistory
        };
    }

    get() {
        const loadHistory = '[{"timestamp":"2020-05-26T12:00:12.853Z","zoneId":"string","load":{"solar":{"value":1200,"unit":"%"},"wind":{"value":1000,"unit":"%"},"hydraulic":{"value":1000,"unit":"%"},"nuclear":{"value":1000,"unit":"%"},"bioenergies":{"value":1000,"unit":"%"},"thermal":{"value":1900,"unit":"%"}}},      {"timestamp":"2020-05-26T12:19:12.853Z","zoneId":"string","load":{"solar":{"value":300,"unit":"%"},"wind":{"value":330,"unit":"%"},"hydraulic":{"value":300,"unit":"%"},"nuclear":{"value":300,"unit":"%"},"bioenergies":{"value":300,"unit":"%"},"thermal":{"value":300,"unit":"%"}}}]';
        const breakdown = '[{"timestamp":"2020-05-26T15:40:36.037Z","zoneId":"MW","breakdown":{"solar":{"capacity":{"value":100,"unit":"MW"},"production":{"value":10,"unit":"MW"},"load":{"value":10,"unit":"%"}},"wind":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}},"hydraulic":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}},"nuclear":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}},"bioenergies":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}},"thermal":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}}}},{"timestamp":"2020-05-26T15:54:36.037Z","zoneId":"MW","breakdown":{"solar":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}},"wind":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}},"hydraulic":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}},"nuclear":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}},"bioenergies":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}},"thermal":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}}}}]';
        return [loadHistory, breakdown];
    }

    render() {
        const currentData = this.state.breakdown;
        const currentZoneID = this.context.currentZone.id;
        const currentZoneName = this.context.currentZone.label;
        return (
            <React.Fragment>
                <div className="columns is-centered" >
                    <div className="column has-text-centered">
                        <h1 className="is-size-1">Facteur de charge</h1>
                    </div>
                </div>
                <div className="columns  is-centered" style={{ "marginBottom": "4rem" }}>
                    <div className="column is-three-quarters has-text-centered">
                        Une source d’énergie peut produire énormément en quantité, mais être sous-utilisé ! À l’inverse, une source peut être à 100% de sa capacité, et n’avoir qu’un petit impact sur l’apport à la grille…
                        C’est ce qu’on appelle le facteur charge ! Il représente le taux d’utilisation de chacune des sources d’énergie.
                        Actuellement, en {currentZoneName} (#{currentZoneID}), le SOLAIRE est a son maximum et le NUCLAIRE a son minimum
                     </div>
                </div>
                <div className="columns is-centered">
                    <div className="column is-one-fifth">
                        <div id="breakdown" className="columns has-text-centered is-variable is-centered is-mobile is-multiline representations-wrapper">
                            <div className="column is-full">
                                <PowerSourceLoad
                                    load={currentData.solar.load}
                                    production={currentData.solar.production}
                                    capacity={currentData.solar.capacity}
                                    type="solar"
                                    cssClass="load"
                                    mirrored={false}
                                />
                            </div>
                            <div className="column is-full">
                                <PowerSourceLoad
                                    load={currentData.wind.load}
                                    production={currentData.wind.production}
                                    capacity={currentData.wind.capacity}
                                    type="wind"
                                    cssClass="load"
                                    mirrored={false}
                                />
                            </div>
                            <div className="column is-full">
                                <PowerSourceLoad
                                    load={currentData.hydraulic.load}
                                    production={currentData.hydraulic.production}
                                    capacity={currentData.hydraulic.capacity}
                                    type="hydraulic"
                                    cssClass="load"
                                    mirrored={false}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="column is-6">
                        <GraphLoadEvolution loadsOverTime={this.state.loadHistory} />

                    </div>
                    <div className="column is-one-fifth">
                        <div id="breakdown" className="columns has-text-centered is-variable is-centered is-mobile is-multiline representations-wrapper">
                            <div className="column is-full">
                                <PowerSourceLoad
                                    load={currentData.nuclear.load}
                                    production={currentData.nuclear.production}
                                    capacity={currentData.nuclear.capacity}
                                    type="nuclear"
                                    cssClass="load"
                                    mirrored={true}
                                />
                            </div>
                            <div className="column is-full">
                                <PowerSourceLoad
                                    load={currentData.bioenergies.load}
                                    production={currentData.bioenergies.production}
                                    capacity={currentData.bioenergies.capacity}
                                    type="bioenergies"
                                    cssClass="load"
                                    mirrored={true}
                                />
                            </div>
                            <div className="column is-full">
                                <PowerSourceLoad
                                    load={currentData.thermal.load}
                                    production={currentData.thermal.production}
                                    capacity={currentData.thermal.capacity}
                                    type="thermal"
                                    cssClass="load"
                                    mirrored={true}
                                />
                            </div>
                        </div>
                    </div>
                </div >
            </React.Fragment >
        );
    }
}

SlideLoad.contextType = ZoneContext;

export default SlideLoad;