


import React, { useState } from "react";
import CurrentLocationSelection from "./CurrentLocationSelection";
import PropTypes from 'prop-types'; // ES6

function CurrentLocationButton({ currentZoneName, setSelectedZone }) {
    const [isLocationModalShown, setShowLocationSelection] = useState(false);

    return (
        <React.Fragment>
            <a
                className="button is-dark is-fullwidth"
                onClick={() => setShowLocationSelection(() => true)}
            >
                <span className="icon">
                    <i className="fas fa-map-marker-alt"></i>
                </span>
                <span className="is-size-5">{currentZoneName}</span>
                <span className="icon">
                    <i className="fas fa-chevron-down"></i>
                </span>
            </a>
            {isLocationModalShown &&
                <CurrentLocationSelection
                    setShowLocationSelection={setShowLocationSelection}
                    setSelectedZone={setSelectedZone}
                />
            }
        </React.Fragment>
    )
}

CurrentLocationButton.propTypes = {
    currentZoneName: PropTypes.string.isRequired,
    setSelectedZone: PropTypes.func.isRequired
};

export default CurrentLocationButton;
