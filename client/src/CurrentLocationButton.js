


import React from "react";

function CurrentLocationButton({ setShowLocationSelection, currentZoneName }) {
    return (
        <span className="navbar-item">
            <a
                className="button is-dark is-fullwidth"
                onClick={() => setShowLocationSelection(true)}
            >
                <span className="icon">
                    <i className="fas fa-map-marker-alt"></i>
                </span>
                <span className="is-size-5">{currentZoneName}</span>
                <span className="icon">
                    <i className="fas fa-chevron-down"></i>
                </span>
            </a>
        </span>
    )
}

export default CurrentLocationButton;
