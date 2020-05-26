import React from "react";
import PowerSource from "./PowerSource";

class SlideLoad extends React.Component {

    constructor(props) {
        super(props);

        const data = JSON.parse(this.get());
        let stub = data[0];

        this.state = {
            currentData: stub.breakdown,
            history: data
        };

        console.log(this.state);
    }

    get() {
        return '[{"timestamp":"2020-05-26T15:40:36.037Z","zoneId":"MW","breakdown":{"solar":{"capacity":{"value":100,"unit":"MW"},"production":{"value":10,"unit":"MW"},"load":{"value":10,"unit":"%"}},"wind":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}},"hydraulic":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}},"nuclear":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}},"bioenergies":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}},"thermal":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}}}},{"timestamp":"2020-05-26T15:54:36.037Z","zoneId":"MW","breakdown":{"solar":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}},"wind":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}},"hydraulic":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}},"nuclear":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}},"bioenergies":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}},"thermal":{"capacity":{"value":0,"unit":"MW"},"production":{"value":0,"unit":"MW"},"load":{"value":0,"unit":"%"}}}}]';
    }

    render() {
        const currentData = this.state.currentData;

        console.log(currentData);

        return (
            <div className="columns">
                <div className="column "></div>
                <div className="column is-one-fifth">
                    <div id="breakdown" className="columns has-text-centered is-variable is-centered is-mobile is-multiline representations-wrapper">
                        <div className="column is-full">
                            <PowerSource
                                load={currentData.solar.load}
                                production={currentData.solar.production}
                                capacity={currentData.solar.capacity}
                                type="solar"
                                cssClass="breakdown"
                            />
                        </div>
                        <div className="column is-full">
                            <PowerSource
                                load={currentData.wind.load}
                                production={currentData.wind.production}
                                capacity={currentData.wind.capacity}
                                type="wind"
                                cssClass="breakdown"
                            />
                        </div>
                        <div className="column is-full">
                            <PowerSource
                                load={currentData.hydraulic.load}
                                production={currentData.hydraulic.production}
                                capacity={currentData.hydraulic.capacity}
                                type="hydraulic"
                                cssClass="breakdown"
                            />
                        </div>
                        <div className="column is-full">
                            <PowerSource
                                load={currentData.nuclear.load}
                                production={currentData.nuclear.production}
                                capacity={currentData.nuclear.capacity}
                                type="nuclear"
                                cssClass="breakdown"
                            />
                        </div>
                        <div className="column is-full">
                            <PowerSource
                                load={currentData.bioenergies.load}
                                production={currentData.bioenergies.production}
                                capacity={currentData.bioenergies.capacity}
                                type="bioenergies"
                                cssClass="breakdown"
                            />
                        </div>
                        <div className="column is-full">
                            <PowerSource
                                load={currentData.thermal.load}
                                production={currentData.thermal.production}
                                capacity={currentData.thermal.capacity}
                                type="thermal"
                                cssClass="breakdown"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SlideLoad;