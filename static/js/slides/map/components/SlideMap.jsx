import React from "react";
import Map from "./Map";

class SlideMap extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const zonesDescription = this.props.zonesDescription;


        let listOfZonesNames = '';
        let first = true;
        zonesDescription.forEach(element => {
            if (!first) {
                listOfZonesNames = listOfZonesNames.concat(', ');
            }
            first = first && false;
            listOfZonesNames = listOfZonesNames.concat(element.label);
        });


        const hookZoneChanged = this.props.zoneChanged;

        return (
            <React.Fragment>
                <div className="columns">
                    <div className="column is-three-fifths">
                        <div className="columns is-multiline">
                            <div className="column is-full">
                                <figure className="image is-128x128">
                                    <img src="./images/logo.png" />
                                </figure>
                            </div>
                            <div className="column is-full">
                                <hr style={{ "backgroundColor": "white", "width": "80%", "height": "2px", "margin": "0" }} />
                            </div>
                            <div className="column is-full">
                                <h1 className="is-size-1">Bienvenue !</h1>
                            </div>
                        </div>
                        <p style={{ "textAlign": "justify", "marginTop":"8px" }}>
                            Facteurs charge a pour but de rendre accessible au grand public les données des installations eléctriques française.
                        </p>
                        <p style={{ "textAlign": "justify", "marginTop":"8px" }}>
                            Grâce aux données ouvertes d'Open API,nous avons des données concernant {zonesDescription.length} zones: {listOfZonesNames}.
                        </p>
                        <p className="is-size-5" style={{ "textAlign": "justify", "marginTop":"8px" }}>
                            Commencez par naviguer sur ce site, ou sélectionnez une zone en particulier sur la carte !
                        </p>
                    </div>
                    <div className="column" style={{"padding":"3rem"}}>
                        <div>
                            <Map zoneChanged={hookZoneChanged} zonesDescription={zonesDescription} />
                        </div>
                    </div>
                </div>
                <div className="columns is-centered" style={{ "marginTop": "7.5rem", "color":"#888" }}>
                    <div className="column is-full has-text-centered">
                        Projet open-source exploitant les données d’Open API sous license ouverte Etalab. Code source sous license MIT
                    </div>
                </div>
            </React.Fragment>
        );
    }

}
export default SlideMap;