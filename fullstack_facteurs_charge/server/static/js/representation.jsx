import React from "react";
import Eolienne from "./representations/eolienne";
import PanneauSolaire from "./representations/panneau-solaire";
import Barrage from "./representations/barrage";
import Fossile from "./representations/fossile";
import Nucleaire from "./representations/nucleaire";
import Bioenergies from "./representations/bioenergies";

class Representations extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
        const taux_charge = isNaN(this.props.pourcentage) ? "-" : Math.round(this.props.pourcentage);
        const production = isNaN(this.props.production) ? "-" : Math.round(this.props.production);
        const capacites = isNaN(this.props.capacites) ? "-" : Math.round(this.props.capacites);
        let svg;
        let classes = "legende-moyen-production legende-";
        switch (this.props.type) {
            case "Photovoltaïque":
                svg = <PanneauSolaire pourcentage={taux_charge}/>;
                classes += "photovoltaique"
                break;
            case "Éolien":
                svg = <Eolienne pourcentage={taux_charge}/>;
                classes += "eolien"
                break;
            case "Hydraulique":
                svg = <Barrage pourcentage={taux_charge}/>;
                classes += "hydraulique"
                break;
            case "Nucléaire":
                svg = <Nucleaire pourcentage={taux_charge}/>;
                classes += "nucleaire"
                break;
            case "Bioénergies":
                svg = <Bioenergies pourcentage={taux_charge}/>;
                classes += "bioenergies"
                break;
            case "Fossile":
                svg = <Fossile pourcentage={taux_charge}/>;
                classes += "thermique"
                break;
        }
      
        return (
            <div className="representation">
            <div className="legende">
                <span className={classes}></span>
                <span>{this.props.type}</span>
            </div>
            <div className="affichage-representation">
                {svg}
                <div className="statistiques">
                    <div className="titre">Taux de charge&nbsp;:</div>
                    <div><span>{taux_charge} </span><span className="unit">%</span></div>
                    <div className="titre">Production&nbsp;:</div>
                    <div><span>{production} </span> <span className="unit">MWh</span></div>
                    <div className="titre">Capacites&nbsp;:</div>
                    <div><span>{capacites} </span><span className="unit">MW</span></div>
                </div>
            </div>
        </div>
    );
  }
}
export default Representations;