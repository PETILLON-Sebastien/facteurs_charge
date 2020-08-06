import React from "react";
import PowerSourceLoad from './PowerSourceLoad';
import GraphLoadEvolution from "./GraphLoadEvolution";
import { ZoneContext } from '../../../ZoneContext';
import PowerSourceNameInline from "../../../power-sources/components/PowerSourceNameInline";


// TODO this should be shared accross components somehow
const root_endpoint = process.env.API_URL + "/api/v1";

class SlideLoad extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            latestBreakdownData: [],
            breakdownHistory: [],
            mostLoadedInstallation: {},
            leastLoadedInstallation: {},
            timeMarks: {},
            isLoaded: false
        }
    }


    componentDidMount() {
        const currentZoneId = this.context.currentZone.id; // todo this is the internal mapping
        fetch(root_endpoint + "/zones/"+currentZoneId+"/installations/breakdown")
            .then((data) => data.json()).then((data) => {
                console.log("Receiving breakdown of installations for zone", currentZoneId, data);
                // PRECONDITION: Considering timely ordered data
                const latestBreakdownData = data[data.length - 1].breakdown;
                const mostLoadedInstallation = this.findMostLoaded(latestBreakdownData);
                const leastLoadedInstallation = this.findLeastLoaded(latestBreakdownData);

                this.setState({
                    latestBreakdownData: latestBreakdownData,
                    breakdownHistory: data,
                    mostLoadedInstallation: mostLoadedInstallation,
                    leastLoadedInstallation: leastLoadedInstallation,
                    isLoaded: true
                });
            });
    }

    findMostLoaded(breakdownData) {
        let bestComponent = undefined, bestLoadValue = undefined;
        Object.keys(breakdownData).forEach((installationType) => {
            console.log(breakdownData, installationType);
            const currentLoadValue = breakdownData[installationType].load.value;

            if (bestComponent == undefined) {
                bestComponent = <PowerSourceNameInline type={installationType} />;
                bestLoadValue = currentLoadValue;
            } else {
                if (currentLoadValue > bestLoadValue) {
                    bestComponent = <PowerSourceNameInline type={installationType} />;
                    bestLoadValue = currentLoadValue;
                }
            }
        });

        return bestComponent;
    }

    findLeastLoaded(breakdownData) {
        let bestComponent = undefined;
        let best = undefined;
        Object.keys(breakdownData).forEach((installationType) => {
            if (best == undefined) {
                bestComponent = <PowerSourceNameInline type={installationType} />;
                best = breakdownData[installationType];
            } else {
                if (breakdownData[installationType].load.value < best.load.value) {
                    bestComponent = <PowerSourceNameInline type={installationType} />;
                    best = breakdownData[installationType];
                }
            }
        });

        return bestComponent;
    }


    render() {
        if (this.state.isLoaded) {
            const currentData = this.state.latestBreakdownData;
            const currentZoneID = this.context.currentZone.id;
            const currentZoneName = this.context.currentZone.label;
            return (
                <React.Fragment>
                    <div className="columns is-centered" >
                        <div className="column has-text-centered">
                            <h1 className="is-size-1">Facteur de charge ({currentZoneID})</h1>
                        </div>
                    </div>
                    <div className="columns  is-centered" style={{ "marginBottom": "4rem" }}>
                        <div className="column is-three-quarters has-text-centered">
                            <div className="is-size-6">
                                Une source d’énergie peut produire énormément en quantité, mais être sous-utilisé ! À l’inverse, une source peut être à 100% de sa capacité, et n’avoir qu’un petit impact sur l’apport à la grille…
                        </div>
                            <div className="is-size-5" style={{ "marginTop": "2rem" }}>

                                C’est ce qu’on appelle le facteur charge ! Il représente le taux d’utilisation de chacune des sources d’énergie.
                        Actuellement, en <span className="has-background-grey text-inline-highlighted">{currentZoneName}</span>, les installations {this.state.mostLoadedInstallation} sont à leur maximum et les installations {this.state.leastLoadedInstallation} à leur minimum.
                        </div>

                        </div>
                    </div>
                    <div className="columns is-multiline is-centered">
                        <div className="column is-one-fifth">
                            <div id="breakdown" className="columns has-text-centered is-variable is-centered is-mobile is-multiline representations-wrapper">
                                <div className="column is-12-widescreen is-12-full-hd is-12-desktop is-4-tablet is-4-mobile ">
                                    <PowerSourceLoad
                                        load={currentData.solar.load}
                                        production={currentData.solar.production}
                                        capacity={currentData.solar.capacity}
                                        type="solar"
                                        cssClass="load"
                                        mirrored={false}
                                    />
                                </div>
                                <div className="column is-12-widescreen is-12-full-hd is-12-desktop is-4-tablet is-4-mobile ">
                                    <PowerSourceLoad
                                        load={currentData.wind.load}
                                        production={currentData.wind.production}
                                        capacity={currentData.wind.capacity}
                                        type="wind"
                                        cssClass="load"
                                        mirrored={false}
                                    />
                                </div>
                                <div className="column is-12-widescreen is-12-full-hd is-12-desktop is-4-tablet is-4-mobile ">
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
                            <GraphLoadEvolution loadsOverTime={this.state.breakdownHistory} />

                        </div>
                        <div className="column is-one-fifth">
                            <div id="breakdown" className="columns has-text-centered is-variable is-centered is-mobile is-multiline representations-wrapper">
                                <div className="column is-12-widescreen is-12-full-hd is-12-desktop is-4-tablet is-4-mobile ">
                                    <PowerSourceLoad
                                        load={currentData.nuclear.load}
                                        production={currentData.nuclear.production}
                                        capacity={currentData.nuclear.capacity}
                                        type="nuclear"
                                        cssClass="load"
                                        mirrored={true}
                                    />
                                </div>
                                <div className="column is-12-widescreen is-12-full-hd is-12-desktop is-4-tablet is-4-mobile ">
                                    <PowerSourceLoad
                                        load={currentData.bioenergy.load}
                                        production={currentData.bioenergy.production}
                                        capacity={currentData.bioenergy.capacity}
                                        type="bioenergy"
                                        cssClass="load"
                                        mirrored={true}
                                    />
                                </div>
                                <div className="column is-12-widescreen is-12-full-hd is-12-desktop is-4-tablet is-4-mobile ">
                                    <PowerSourceLoad
                                        load={currentData.fossil.load}
                                        production={currentData.fossil.production}
                                        capacity={currentData.fossil.capacity}
                                        type="fossil"
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
        else {
            return <h1>LOADING BITCH</h1>
        }
    }
}

SlideLoad.contextType = ZoneContext;

export default SlideLoad;