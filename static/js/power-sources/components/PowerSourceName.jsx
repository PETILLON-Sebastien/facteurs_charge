
import React from "react";

class PowerSourceName extends React.Component  {

    constructor(props) {
        super(props);

        this.state = {};

        const type = this.props.type;

        this.buildProperVisualization(type);
    }

    buildProperVisualization(type) {
        let classes = "legende-moyen-production legende-";
        let name = "DEFAULT";

        switch (type) {
            case "solar":
                name = "Photovoltaïque";
                classes += "solar"
                break;
            case "wind":
                name = "Éolien";
                classes += "wind"
                break;
            case "hydraulic":
                name = "Hydraulique";
                classes += "hydraulic"
                break;
            case "nuclear":
                name = "Nucléaire";
                classes += "nuclear"
                break;
            case "bioenergies":
                name = "Bioénergies";
                classes += "bioenergies"
                break;
            case "thermal":
                name = "Thermique";
                classes += "thermal"
                break;
            default:
                console.warn("A unknown type of power-source has been passed (" + type + "). Defaulting values.");
                name = "UNKNOWN TYPE " + type;
                classes += "unknown"
                break;
        }

        this.state.cssClasses = classes;
        this.state.name = name;
    }

    render() {
        const cssClass = this.props.cssClass || '';

        return (
            <React.Fragment>
                <span className={this.state.cssClasses}></span>
                <span className={`${cssClass}-source-name`}>{this.state.name}</span>
            </React.Fragment>
        );
    }
}
export default PowerSourceName;

