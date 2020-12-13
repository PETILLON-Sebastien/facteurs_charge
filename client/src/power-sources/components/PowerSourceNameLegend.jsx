import React from "react";
import PowerSourceStyleMap from "./PowerSourceStyleMap";

class PowerSourceNameLegend extends React.Component {
  constructor(props) {
    super(props);
    const type = this.props.type;
    let classes = "legende-moyen-production legende-";
    let powerSourceStyleMap = new PowerSourceStyleMap(type);
    let cssClasses = classes + powerSourceStyleMap.classes;
    let name = powerSourceStyleMap.name || "DEFAULT";

    this.state = { name: name, cssClasses: cssClasses };
  }

  buildProperVisualization(type) {
    let classes = "legende-moyen-production legende-";

    let powerSourceStyleMap = new PowerSourceStyleMap(type);
    return {
      cssClasses: classes + powerSourceStyleMap.classes,
      name: powerSourceStyleMap.name || "DEFAULT",
    };
  }

  render() {
    const cssClass = this.props.cssClass || "";

    return (
      <React.Fragment>
        <span className={this.state.cssClasses}></span>
        <span className={`${cssClass}-source-name`}>{this.state.name}</span>
      </React.Fragment>
    );
  }
}
export default PowerSourceNameLegend;
