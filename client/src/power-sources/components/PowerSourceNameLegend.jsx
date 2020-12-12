import React from "react";
import PowerSourceStyleMap from "./PowerSourceStyleMap";

class PowerSourceNameLegend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const type = this.props.type;
    this.buildProperVisualization(type);
  }

  buildProperVisualization(type) {
    let classes = "legende-moyen-production legende-";

    let powerSourceStyleMap = new PowerSourceStyleMap(type);

    this.setState({
      cssClasses: classes + powerSourceStyleMap.classes,
      name: powerSourceStyleMap.name || "DEFAULT",
    });
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
