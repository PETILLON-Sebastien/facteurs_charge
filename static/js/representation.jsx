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
        let name = "DEFAULT";
        switch (this.props.type) {
            case "Photovoltaïque":
                svg = <PanneauSolaire pourcentage={taux_charge} />;
                name = "Photovoltaïque";
                classes += "photovoltaique"
                break;
            case "Éolien":
                svg = <Eolienne pourcentage={taux_charge} />;
                name = "Éolien";
                classes += "eolien"
                break;
            case "Hydraulique":
                svg = <Barrage pourcentage={taux_charge} />;
                name = "Hydraulique";
                classes += "hydraulique"
                break;
            case "Nucléaire":
                svg = <Nucleaire pourcentage={taux_charge} />;
                name = "Nucléaire";
                classes += "nucleaire"
                break;
            case "Bioénergies":
                svg = <Bioenergies pourcentage={taux_charge} />;
                name = "Bioénergies";
                classes += "bioenergies"
                break;
            case "Fossile":
                svg = <Fossile pourcentage={taux_charge} />;
                name = "Thermique";
                classes += "thermique"
                break;
        }

        return (
            // <div className="representation">
            //     <div className="affichage-representation">
            //         {svg}
            //         <div className="statistiques">
            //             <div className="titre">Taux de charge&nbsp;:</div>
            //             <div><span>{taux_charge} </span><span className="unit">%</span></div>
            //             <div className="titre">Production&nbsp;:</div>
            //             <div><span>{production} </span> <span className="unit">MW</span></div>
            //             <div className="titre">Capacites&nbsp;:</div>
            //             <div><span>{capacites} </span><span className="unit">MW</span></div>
            //         </div>
            //     </div>
            //     <div className="legende">
            //         <span className={classes}></span>
            //         <span className="representation-name">{name}</span>
            //     </div>
            // </div>
            <div className="columns is-gapless  is-vcentered representation">
                <div className="column is-4 is-vcentered">
                    <figure className="image logo-mix">
                        {svg}
                    </figure></div>
                <div className="column is-8">
                    <span className={classes}></span>
                    <span className="representation-name is-size-5">{name}</span>

                    <div className="content statistiques representation-data-text">
                        <div>
                        <progress className="progress" value={taux_charge} max="100">{taux_charge}%</progress>
                        </div>
                        <div>
                            <span className="titre">Taux de charge&nbsp;:</span>
                            <span>{taux_charge} </span>
                            <span className="unit">%</span>
                        </div>
                        <div>
                            <span className="titre">Production&nbsp;:</span>
                            <span>{production} </span>
                            <span className="unit">MW</span>
                        </div>
                        <div>
                            <span className="titre">Capacites&nbsp;:</span>
                            <span>{capacites} </span>
                            <span className="unit">MW</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Representations;