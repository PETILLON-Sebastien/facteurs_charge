import React from "react";

import WindTurbine from "./basics/WindTurbine";
import SolarPanel from "./basics/SolarPanel";
import HydraulicEnergy from "./basics/HydraulicEnergy";
import FossilEnergy from "./basics/FossilEnergy";
import NuclearPowerPlant from "./basics/NuclearPowerPlant";
import Bioenergies from "./basics/Bioenergies";

class PowerSourceLogo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        const type = this.props.type;
        const load = (this.props.load == undefined) ? 50 : this.props.load;

        this.buildProperVisualization(type, load);
    }

    buildProperVisualization(type, load) {
        let svg;

        switch (type) {
            case "solar":
                svg = <SolarPanel pourcentage={load} />;
                break;
            case "wind":
                svg = <WindTurbine pourcentage={load} />;
                break;
            case "hydraulic":
                svg = <HydraulicEnergy pourcentage={load} />;
                break;
            case "nuclear":
                svg = <NuclearPowerPlant pourcentage={load} />;
                break;
            case "bioenergy":
                svg = <Bioenergies pourcentage={load} />;
                break;
            case "fossil":
                svg = <FossilEnergy pourcentage={load} />;
                break;
            default:
                console.warn("A unknown type of power-source has been passed (" + type + "). Defaulting values.");
                svg = <FossilEnergy pourcentage={load} />;
                break;
        }

        this.state.svg = svg;
    }

    render() {
        const cssClass = this.props.cssClass || '';

        return (
            <span className={`image ${cssClass}-logo`}>
                {this.state.svg}
            </span>
        );
    }
}
export default PowerSourceLogo;