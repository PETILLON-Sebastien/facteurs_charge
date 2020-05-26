import React from "react";

class PowerSourceKPI extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const title = this.props.title;
        const value = Number(this.props.value).toLocaleString('fr');
        const unit = this.props.unit;

        return (
            <div>
                <span className="titre">{title}&nbsp;:</span>
                <span>{value} </span>
                <span className="unit">{unit}</span>
            </div>
        );
    }
}
export default PowerSourceKPI;