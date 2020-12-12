


import React, { useState } from "react";
import CurrentLocationSelection from "./CurrentLocationSelection";
import PropTypes from 'prop-types'; // ES6

function CurrentLocationButton({ currentZoneName, setCurrentZone }) {
    const [isLocationModalShown, setShowLocationSelection] = useState(false);

    return (
        <React.Fragment>
            <button
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
            </button>
            {isLocationModalShown &&
                <CurrentLocationSelection
                    setShowLocationSelection={setShowLocationSelection}
                    setCurrentZone={setCurrentZone}
                />
            }
        </React.Fragment>
    )
}

CurrentLocationButton.propTypes = {
    currentZoneName: PropTypes.string.isRequired,
    setCurrentZone: PropTypes.func.isRequired
};

export default CurrentLocationButton;
