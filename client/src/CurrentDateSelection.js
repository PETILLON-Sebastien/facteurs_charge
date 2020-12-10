import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CurrentDateSelection({ currentDatesFrom, currentDatesTo, setShowDateSelection, setCurrentDate }) {

    return (
        <div
            className={"modal is-active"}
        >
            {/* Background that closes the modal once clicked */}
            <div
                className="modal-background"
                onClick={() => setShowDateSelection(false)}
            ></div>
            <div className="modal-content">
                {/* MIN DATE HAS BEEN HARDCODED PER @Petillon's requirements due to backend limitation: https://github.com/PETILLON-Sebastien/facteurs_charge/issues/65#issue-688691869  */}
                <Calendar
                    returnDate="range"
                    selectRange={true}
                    maxDate={new Date()}
                    minDate={new Date("2020-02-01T00:00:00.00Z")}
                    onChange={(values) => {
                        setShowDateSelection(false);
                        const newDateFrom = new Date(values[0]).getTime();
                        const newDateTo = new Date(values[1]).getTime();
                        setCurrentDate({ from: newDateFrom, to: newDateTo });
                    }}
                    value={[currentDatesFrom, currentDatesTo]}
                />
            </div>
            <button
                className="modal-close is-large"
                aria-label="close"
                onClick={() => setShowDateSelection(false)}
            ></button>
        </div>
    )

};

export default CurrentDateSelection;