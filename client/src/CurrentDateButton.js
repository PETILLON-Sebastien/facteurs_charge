


import React, { useState } from "react";
import CurrentDateSelection from "./CurrentDateSelection";
import PropTypes from 'prop-types'; // ES6

function CurrentDateButton({ currentDatesFrom, currentDatesTo, setCurrentDate }) {
    const [isDateModalShown, setShowDateSelection] = useState(false);

    const fromFormat = new Date(currentDatesFrom).toLocaleDateString();
    const toFormat = new Date(currentDatesTo).toLocaleDateString();
    return (
        <React.Fragment>
            <span className="navbar-item">
                <a
                    className="button is-dark is-fullwidth"
                    onClick={() => setShowDateSelection(true)}
                >
                    <span className="icon">
                        <i className="far fa-calendar-alt"></i>
                    </span>
                    <span className="is-size-6">
                        {fromFormat} - {toFormat}
                    </span>
                    <span className="icon">
                        <i className="fas fa-chevron-down"></i>
                    </span>
                </a >
            </span >
            {
                isDateModalShown &&
                <CurrentDateSelection
                    currentDatesFrom={currentDatesFrom}
                    currentDatesTo={currentDatesTo}
                    setShowDateSelection={setShowDateSelection}
                    setCurrentDate={setCurrentDate}
                />
            }
        </React.Fragment >

    )
}

CurrentDateButton.propTypes = {
    currentDatesFrom: PropTypes.number.isRequired,  // Timestamp
    currentDatesTo: PropTypes.number.isRequired,    // Timestamp
    setCurrentDate: PropTypes.func.isRequired
};


export default CurrentDateButton;
