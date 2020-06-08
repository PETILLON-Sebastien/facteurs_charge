import React from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class TimeSlider extends React.Component {
    constructor(props) {
        super(props);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.mapping = {}; // Represent the mapping between slider-marks and human-readable hours
    }

    handleTimeChange(e) {
        // e represents the marks (e.g. 16, or 32)
        // console.log("Slider: time has been changed to " + this.mapping[e]);
        this.props.onTimeChange(e, this.mapping[e]);
    }

    render() {

        this.mapping = this.props.hours;
        const currentTime = this.props.currentTime;
        const endOfTimeframe = this.props.endOfTimeframe;

console.log("Mapping received", this.mapping);

        return (
            <div style={{"width":"90%", "textAlign":"right","margin":"auto"}}>
                {/* <Slider className="slider-temps" value={this.props.index_temps} marks={this.props.marks} min={0} max={this.props.max} onChange={this.onTimeChange} /> */}

                <Slider
                // className="slider-temps" 
          min={0}
        //   included={false}
          max={100}
          marks={this.mapping}
          defaultValue={0}
          step={null}
          onChange={this.onTimeChange   }
          railStyle={{
            height: 2
          }}
          handleStyle={{
            height: 10,
            width: 10,
            marginLeft: -1,
            marginTop: -3,
            backgroundColor: "green",
            border: "1px solid white"
          }}
          trackStyle={{
            background: "none"
          }}
        />

            </div>
        )
    }
}

export default TimeSlider;