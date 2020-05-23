import React from "react";
import Slider from 'rc-slider';

class TimeSlider extends React.Component {
    constructor(props) {
        super(props);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.mapping = {}; // Represent the mapping between slider-marks and human-readable hours
    }

    handleTimeChange(e) {
        // e represents the marks (e.g. 16, or 32)
        console.log("Slider: time has been changed to " + this.mapping[e]);
        this.props.onTimeChange(e, this.mapping[e]);
    }

    render() {
        this.mapping = this.props.hours;

        return (
            <React.Fragment>
                {/* <Slider className="slider-temps" value={this.props.index_temps} marks={this.props.marks} min={0} max={this.props.max} onChange={this.onTimeChange} /> */}

                <Slider className="slider-temps" value={16} marks={this.mapping} min={16} max={80} onChange={this.handleTimeChange} />

            </React.Fragment>
        )
    }
}

export default TimeSlider;