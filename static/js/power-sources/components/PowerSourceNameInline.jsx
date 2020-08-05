
import React from "react";
import PowerSourceStyleMap from './PowerSourceStyleMap';

class PowerSourceNameInline extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        const type = this.props.type;
        this.buildProperVisualization(type);
    }

    buildProperVisualization(type) {
        let powerSourceStyleMap = new PowerSourceStyleMap(type);

        this.state.cssClasses = powerSourceStyleMap.classes;
        this.state.name = powerSourceStyleMap.name || "DEFAULT";
    }

    render() {
        this.buildProperVisualization(this.props.type);
        console.log("Rendering Power Source Name Inline");
        const cssClass = this.props.cssClass || '';

        return (
            <React.Fragment>
                <span className={`${cssClass} power-source-inline-${this.state.cssClasses}`}>{this.state.name}</span>
            </React.Fragment>
        );
    }
}
export default PowerSourceNameInline;

