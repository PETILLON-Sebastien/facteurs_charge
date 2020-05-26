import React from "react";
import PowerSource from "./PowerSource";

class Breakdown extends React.Component {

    constructor(props) {
        super(props);

        let stub = JSON.parse(this.get())[0].production;

        this.adaptData(stub);

        this.state = {
            currentData: stub
        };
    }

    adaptData(stub) {
        stub.solar = { production: stub.solar };
        stub.wind = { production: stub.wind };
        stub.hydraulic = { production: stub.hydraulic };
        stub.nuclear = { production: stub.nuclear };
        stub.bioenergies = { production: stub.bioenergies };
        stub.thermal = { production: stub.thermal };
    }

    get() {
        return '[{"timestamp":"2020-05-26T12:19:12.853Z","zoneId":"string","production":{"solar":{"value":1000,"unit":"MW"},"wind":{"value":1000,"unit":"MW"},"hydraulic":{"value":1000,"unit":"MW"},"nuclear":{"value":1000,"unit":"MW"},"bioenergies":{"value":1000,"unit":"MW"},"thermal":{"value":1000,"unit":"MW"}}}]';
    }

    render() {
        const currentData = this.state.currentData;

        return (
            <div className="columns">
                <div className="column is-7">
                    <div className="columns is-1 is-multiline is-variable">
                        <div className="column is-6">
                            <PowerSource production={currentData.solar.production} type="solar" cssClass="power-sources"/>
                        </div>
                        <div className="column is-6">
                            <PowerSource production={currentData.wind.production} type="wind"  cssClass="power-sources"/>
                        </div>
                        <div className="column is-6">
                            <PowerSource production={currentData.hydraulic.production} type="hydraulic" cssClass="power-sources"/>
                        </div>
                        <div className="column is-6">
                            <PowerSource production={currentData.nuclear.production} type="nuclear" cssClass="power-sources"/>
                        </div>
                        <div className="column is-6">
                            <PowerSource production={currentData.bioenergies.production} type="bioenergies" cssClass="power-sources"/>
                        </div>
                        <div className="column is-6">
                            <PowerSource production={currentData.thermal.production} type="thermal" cssClass="power-sources" />
                        </div>
                    </div>
                </div>
                <div className="column is-5"></div>
            </div>
        );
    }
}

export default Breakdown;