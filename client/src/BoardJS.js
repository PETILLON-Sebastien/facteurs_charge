import React from "react";
import SlideMap from "./SlideMap";
import SlidePowerSources from "./SlidePowerSources";
import SlideLoad from "./slides/load-breakdown/components/SlideLoad";

var buildNumber = "BUILD_NUMBER_PLACEHOLDER";
var buildDate = "BUILD_DATE_PLACEHOLDER";

function BoardJS({
    currentZone,
    setCurrentZone,
    slideMapData,
    slidePowerSourcesData,
    slideLoadBreakdownData,
    buildInfos = { number: buildNumber, date: buildDate }
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
                </div>
            </div>

            <SlidePowerSources powerBreakdownHistory={slidePowerSourcesData} currentZone={currentZone} />

            <SlideLoad
                currentZone={currentZone}
                data={slideLoadBreakdownData}
            />

        </React.Fragment >
    );
};

export default BoardJS;