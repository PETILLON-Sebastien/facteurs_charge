


import React from "react";

function CurrentDateButton({ setShowDateSelection, currentDatesFrom, currentDatesTo }) {
    return (
        <span className="navbar-item">
            <a
                className="button is-dark is-fullwidth"
                onClick={() => setShowDateSelection(true)}
            >
                <span className="icon">
                    <i className="far fa-calendar-alt"></i>
                </span>
                <span className="is-size-6">
                    {currentDatesFrom} - {currentDatesTo}
                </span>
                <span className="icon">
                    <i className="fas fa-chevron-down"></i>
                </span>
            </a >
        </span >
    )
}

export default CurrentDateButton;
