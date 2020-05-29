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
            if(!first) {
            listOfZonesNames = listOfZonesNames.concat(', ');}
            first = first && false;
            listOfZonesNames = listOfZonesNames.concat(element.label);
        }); 


        const hookZoneChanged = this.props.zoneChanged;

        return (
            <React.Fragment>
                <h1>Carte de zones</h1>
            <span>
                Nous avons des données concernant {zonesDescription.length} zones: {listOfZonesNames}.
            </span>
            <div>
                <Map zoneChanged={hookZoneChanged} zonesDescription={zonesDescription}/>
            </div>
            </React.Fragment>
        );
    }

}
export default SlideMap;