import React from "react";
import Zone from "./Zone";
import zonesDescription from "./regions-descriptions";


function Map({ setCurrentZone }) {
    let regions = [];
    for (let i = 0; i < zonesDescription.length; i++) {
        regions.push(
            <Zone
                key={zonesDescription[i].id}
                description={zonesDescription[i]}
                zoneChanged={setCurrentZone}
            />
        );
    }

    return (
        <div className="map">
            <svg xmlns="http://www.w3.org/2000/svg"
                width="100%" display="inline" version="1"
                viewBox="0 0 650 520">
                {regions}
            </svg>
        </div>
    );
}

export default Map;