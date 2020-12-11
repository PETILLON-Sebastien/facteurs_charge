import React from "react";
import SlideMap from "./SlideMap";

function BoardJS({ setCurrentZone, slideMapData, buildInfos = { number: -1, date: new Date().getTime() } }) {
    return (
        <React.Fragment>
            <div
                className="section is-small"
                id="slide-map"
                style={{ marginTop: "0rem" }}
            >
                <div className="container">

                    <SlideMap
                        setCurrentZone={setCurrentZone} // setter pass throught
                        highestLoads={slideMapData} // props
                        build={buildInfos}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default BoardJS;