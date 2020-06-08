import React from "react";

import PowerSourceProduction from "./PowerSourceProduction";
import GraphPowerBalance from "./GraphPowerBalance";
import GraphConsumptionBalance from "./GraphConsumptionBalance";

import { ZoneContext } from '../../../ZoneContext';
import PowerSourceNameInline from "../../../power-sources/components/PowerSourceNameInline";

class SlidePowerBalance extends React.Component {

    constructor(props, context) {
        super(props, context);

        const [productions, consumptions, exchanges] = this.get();

        const [importations, exportations] = this.splitExchange(this.context.currentZone.id, exchanges);

        this.state = {
            productions: productions,
            consumptions: consumptions,
            importations: importations,
            exportations: exportations
        }
    }

    splitExchange(currentZoneId, exchanges) {
        let importations = exchanges.filter((e) => {
            return e.description.targetZone == currentZoneId;
        });

        let exportations = exchanges.filter((e) => {
            return e.description.sourceZone == currentZoneId;
        });

        return [importations, exportations];
    }


    //  Make use of the followiing routes
    // /zones/{zoneId}/installations/production
    // /zones/{zoneId}/consumption
    // /zones/{zoneId}/exchanges
    // WE HARD CODE HERE THAT ZONE ID = 1
    get() {

        const exchanges =
            [
                {
                    "description": {
                        "sourceZone": "2", // import
                        "targetZone": "0",
                        "value": 10,
                        "unit": "GW"
                    },
                    "datetime": "2020-06-03T14:00:00.135Z"
                },
                {
                    "description": {
                        "sourceZone": "0",
                        "targetZone": "2",
                        "value": 0,
                        "unit": "GW"
                    },
                    "datetime": "2020-06-03T14:00:00.135Z"
                },
                {
                    "description": {
                        "sourceZone": "2", // import
                        "targetZone": "0",
                        "value": 2,
                        "unit": "GW"
                    },
                    "datetime": "2020-06-03T15:00:00.135Z"
                },
                {
                    "description": {
                        "sourceZone": "0", // import
                        "targetZone": "2",
                        "value": 0,
                        "unit": "GW"
                    },
                    "datetime": "2020-06-03T15:00:00.135Z"
                },
                {
                    "description": {
                        "sourceZone": "2", // import
                        "targetZone": "0",
                        "value": 0,
                        "unit": "GW"
                    },
                    "datetime": "2020-06-03T16:00:00.135Z"
                },
                {
                    "description": {
                        "sourceZone": "0",
                        "targetZone": "2",// export
                        "value": 4,
                        "unit": "GW"
                    },
                    "datetime": "2020-06-03T16:00:00.135Z"
                },
                {
                    "description": {
                        "sourceZone": "2", // import
                        "targetZone": "0",
                        "value": 2,
                        "unit": "GW"
                    },
                    "datetime": "2020-06-03T17:00:00.135Z"
                },
                {
                    "description": {
                        "sourceZone": "0", // import
                        "targetZone": "2",
                        "value": 0,
                        "unit": "GW"
                    },
                    "datetime": "2020-06-03T17:00:00.135Z"
                },
                {
                    "description": {
                        "sourceZone": "2", // import
                        "targetZone": "0",
                        "value": 2,
                        "unit": "GW"
                    },
                    "datetime": "2020-06-03T18:00:00.135Z"
                },
                {
                    "description": {
                        "sourceZone": "0", // import
                        "targetZone": "2",
                        "value": 0,
                        "unit": "GW"
                    },
                    "datetime": "2020-06-03T18:00:00.135Z"
                }
            ];

        const consumptions = [
            {
                "description": {
                    "used": {
                        "value": 10,
                        "unit": "GW"
                    },
                    "stepStorage": {
                        "value": 0,
                        "unit": "GW"
                    }
                },
                "datetime": "2020-06-03T14:00:00.228Z"
            },
            {
                "description": {
                    "used": {
                        "value": 3,
                        "unit": "GW"
                    },
                    "stepStorage": {
                        "value": 0,
                        "unit": "GW"
                    }
                },
                "datetime": "2020-06-03T15:00:00.228Z"
            },
            {
                "description": {
                    "used": {
                        "value": 4,
                        "unit": "GW"
                    },
                    "stepStorage": {
                        "value": 0,
                        "unit": "GW"
                    }
                },
                "datetime": "2020-06-03T16:00:00.228Z"
            },
            {
                "description": {
                    "used": {
                        "value": 2,
                        "unit": "GW"
                    },
                    "stepStorage": {
                        "value": 0,
                        "unit": "GW"
                    }
                },
                "datetime": "2020-06-03T17:00:00.228Z"
            },
            {
                "description": {
                    "used": {
                        "value": 2,
                        "unit": "GW"
                    },
                    "stepStorage": {
                        "value": 0,
                        "unit": "GW"
                    }
                },
                "datetime": "2020-06-03T18:00:00.228Z"
            }
        ];


        const productions = [
            {
                "installation": {
                    "capacity": {
                        "value": 10,
                        "unit": "string"
                    },
                    "production": {
                        "value": 0,
                        "unit": "string"
                    },
                    "load": {
                        "value": 0
                    }
                },
                "datetime": "2020-06-03T14:00:00.012Z"
            },
            {
                "installation": {
                    "capacity": {
                        "value": 10,
                        "unit": "string"
                    },
                    "production": {
                        "value": 1,
                        "unit": "string"
                    },
                    "load": {
                        "value": 10
                    }
                },
                "datetime": "2020-06-03T15:00:00.012Z"
            },
            {
                "installation": {
                    "capacity": {
                        "value": 10,
                        "unit": "string"
                    },
                    "production": {
                        "value": 8,
                        "unit": "string"
                    },
                    "load": {
                        "value": 50
                    }
                },
                "datetime": "2020-06-03T16:00:00.012Z"
            },
            {
                "installation": {
                    "capacity": {
                        "value": 10,
                        "unit": "string"
                    },
                    "production": {
                        "value": 0,
                        "unit": "string"
                    },
                    "load": {
                        "value": 0
                    }
                },
                "datetime": "2020-06-03T17:00:00.012Z"
            },
            {
                "installation": {
                    "capacity": {
                        "value": 10,
                        "unit": "string"
                    },
                    "production": {
                        "value": 0,
                        "unit": "string"
                    },
                    "load": {
                        "value": 0
                    }
                },
                "datetime": "2020-06-03T18:00:00.012Z"
            }
        ];

        return [productions, consumptions, exchanges];
    }

    render() {
        const currentData = this.state.currentData;
        const currentZoneID = this.context.currentZone.id;
        const currentZoneName = this.context.currentZone.label;

        return (
            <React.Fragment>

                <div className="columns">
                    <div className="column is-full"><h1 className="is-size-1 has-text-centered">Balance énergétique en <span className="has-background-grey text-inline-highlighted">{currentZoneName}</span></h1></div>
                </div>
                <div className="columns" style={{ "marginBottom": "2rem" }}>
                </div>
                <div className="columns is-7 is-multiline is-vcentered">
                    <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-12-tablet is-12-mobile has-text-justified">
                        {/* <div className="column is-full has-text-centered"> */}
                        <div className="is-size-5">
                            Chaque zone consomme de l’énergie. Cette énergie peut-être produite localement, ou prise des surplus d’autres zones, qui l’auraient mis à disposition sur la grille.</div>
                        <div className="is-size-5" style={{ "marginTop": "2rem" }}>
                            Quoi qu’il en soit, le bilan entre les <span className="has-background-danger text-inline-highlighted">apports</span>, (<span className="has-background-orange text-inline-highlighted">production</span> + <span className="has-background-yellow text-inline-highlighted">importation</span> ) et les <span className="has-background-dark-blue has-text-white text-inline-highlighted">retraits</span> (<span className="has-background-blue has-text-black text-inline-highlighted">consommation</span> + <span className="has-background-light-blue text-inline-highlighted">exportation</span>) doit être nul. L’énergie provient  d'une production locale ou importée, pour être à destination d'une consommation locale ou exportée.
                        {/* </div> */}
                        </div>

                        <div className="is-size-5" style={{ "marginTop": "2rem" }}>
                            L'énergie produite localement, et qui n'est pas consommée, et exportée vers d'autres zones.
                            <i>Rien ne se perd, rien ne se crée, tout se transfère.</i>
</div>

                    </div>

                    <div className="column is-6-widescreen is-6-full-hd is-6-desktop is-12-tablet is-12-mobile has-text-centered">
                        <div className="columns is-multiline" >
                            <div className="column is-full">
                                <GraphPowerBalance
                                    productionsOverTime={this.state.productions}
                                    consumptionsOverTime={this.state.consumptions}
                                    importationsOverTime={this.state.importations}
                                    exportationsOverTime={this.state.exportations}
                                    currentZoneName={currentZoneName} />
                            </div>
                            <div className="column is-full">
                                <GraphConsumptionBalance
                                    productionsOverTime={this.state.productions}
                                    consumptionsOverTime={this.state.consumptions}
                                    importationsOverTime={this.state.importations}
                                    exportationsOverTime={this.state.exportations}
                                    currentZoneName={currentZoneName} />
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

SlidePowerBalance.contextType = ZoneContext;

export default SlidePowerBalance;