import React from "react";
import Map from "./Map";
import zonesDescription from "./regions-descriptions";
import Logo from "./Logo";

const SlideMap = ({ highestLoads, setCurrentZone, build: { number, date } }) => {
    zonesDescription.forEach((e) => {
        const currentZoneId = e.id;
        let ISOZoneId = "FR";

        if (currentZoneId !== 0) {
            ISOZoneId = ISOZoneId.concat("-").concat(currentZoneId);
        }

        var highestLoadForCurrentZone = highestLoads.find((element) => element.zoneId === ISOZoneId);
        if (highestLoadForCurrentZone !== undefined) {
            highestLoadForCurrentZone = highestLoadForCurrentZone.snapshots[0].highest;
        } else {

        }
        e.highestLoad = highestLoadForCurrentZone
    });

    let listOfZonesNames = '';
    let first = true;
    zonesDescription.forEach(element => {
        if (!first) {
            listOfZonesNames = listOfZonesNames.concat(', ');
        }
        first = first && false;
        listOfZonesNames = listOfZonesNames.concat(element.label);
    });


    return (
        <React.Fragment>
            <div className="columns">
                <div className="column is-three-fifths">
                    <div className="columns is-multiline">
                        <div className="column is-full  is-hidden-mobile">
                            <Logo isSmall={false} />
                        </div>
                        <div className="column is-full  is-hidden-mobile">
                            <hr style={{ "backgroundColor": "white", "width": "80%", "height": "2px", "margin": "0" }} />
                        </div>
                        <div className="column is-full">
                            <h1 className="is-size-2 is-hidden-desktop is-hidden-tablet">Bienvenue !</h1>
                            <h1 className="is-size-1 is-hidden-mobile">Bienvenue !</h1>
                        </div>
                    </div>
                    <p style={{ "textAlign": "justify", "marginTop": "8px" }}>
                        Facteurs charge a pour but de rendre accessible au grand public les données des installations électriques française.
                        </p>
                    <p style={{ "textAlign": "justify", "marginTop": "8px" }}>
                        Grâce aux données ouvertes d'Open API,nous avons des données concernant la France et {zonesDescription.length} zones: {listOfZonesNames}.
                        </p>
                    <p className="is-size-5" style={{ "textAlign": "justify", "marginTop": "5%" }}>
                        Commencez par naviguer sur ce site, ou sélectionnez une zone en particulier sur la carte !
                        </p>
                </div>
                <div className="column" style={{ "padding": "3rem" }}>
                    <div>
                        <Map setCurrentZone={setCurrentZone} zonesDescription={zonesDescription} />
                    </div>
                </div>
            </div>
            <div className="columns is-multiline is-centered" style={{ "marginTop": "6%", "color": "#666" }}>
                <div className="column is-full has-text-centered">
                    Projet open-source exploitant les données d’Open API sous license ouverte Etalab. Code source sous license MIT.
                    </div>

                <div className="column is-full has-text-centered" id="build_infos">
                    - Build {number} - {date} -
                    </div>
            </div>
        </React.Fragment>
    );
}

export default SlideMap;
