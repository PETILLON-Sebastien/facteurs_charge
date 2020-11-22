import React from "react";
import CurrentLocationButton from "./CurrentLocationButton";
import PropTypes from 'prop-types'; // ES6

import Map from "./Map"
// I dont know if this component should be conditionnally rendered, or if it should decide to be displayed via is-active css toggle...
// Same goes for Calendar selection.
function CurrentLocationSelection({ zonesDescription, setShowLocationSelection, setSelectedZone }) {


    return (

        <div
            className="modal is-active"
        >
            <div
                className="modal-background"
                onClick={() => setShowLocationSelection(false)}
            ></div>
            <div className="modal-content">
                <Map
                    zoneChanged={(value) => setSelectedZone(value)}
                />
            </div>
            <button
                className="modal-close is-large"
                aria-label="close"
                onClick={() => setShowLocationSelection(false)}
            ></button>
        </div>

    )
};

CurrentLocationSelection.propTypes = {
    setShowLocationSelection: PropTypes.func.isRequired,
    setSelectedZone: PropTypes.func.isRequired,
};

export default CurrentLocationSelection;

