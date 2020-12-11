import React from "react";
import SlideMap from "./SlideMap";
import SlidePowerSources from "./SlidePowerSources";

function BoardJS({
    currentZone,
    setCurrentZone,
    slideMapData,
    slidePowerSourcesData,
    buildInfos = { number: -1, date: new Date().getTime() }
}) {
    return (
        <React.Fragment>
            <div className="section is-small" id="slide-map" >
                <div className="container" style={{ width: "90%" }}>
                    <SlideMap
                        setCurrentZone={setCurrentZone} // setter pass throught
                        highestLoads={slideMapData} // props
                        build={buildInfos}
                    />
                    <SlidePowerSources powerBreakdownHistory={slidePowerSourcesData} currentZone={currentZone} />
                </div>
            </div>
        </React.Fragment>
    );
};

export default BoardJS;