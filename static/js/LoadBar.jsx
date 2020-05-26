import React from "react";

class LoadBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const load = this.props.load;
        return (
            <div style={{ width: '75%' }}>
                <progress className={`progress`} value={load} max="100">{load}%</progress>
            </div>

        )
    }
}
export default LoadBar;