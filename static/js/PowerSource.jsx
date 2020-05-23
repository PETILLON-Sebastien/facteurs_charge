import React from "react";
import Eolienne from "./power-sources/eolienne";
import PanneauSolaire from "./power-sources/panneau-solaire";
import Barrage from "./power-sources/barrage";
import Fossile from "./power-sources/fossile";
import Nucleaire from "./power-sources/nucleaire";
import Bioenergies from "./power-sources/bioenergies";

class PowerSource extends React.Component {

    constructor(props) {
        super(props);

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

        this.svg = svg;
        this.classes = classes;
        this.name = name;
        this.taux_charge = taux_charge;
        this.production = production;
        this.capacites = capacites;
    }

    render() {

        return (
            <React.Fragment>
                <div className="column is-4-fullhd is-offset-0-fullhd is-4-widescreen is-offset-0-widescreen is-six-desktop is-offset-0-desktop is-5-tablet is-offset-0-tablet is-5-mobile is-offset-1-mobile">

                    <div className="columns is-gapless  is-vcentered representation">
                        <div className="column is-4-fullhd is-4-widescreen is-4-desktop is-4-tablet is-10-mobile is-offset-2 is-vcentered">
                            <figure className="image logo-mix">
                                {this.svg}
                            </figure></div>
                        <div className="column is-8-fullhd is-8-widescreen is-8-desktop is-8-tablet is-10-mobile is-offset-2">
                            <span className={this.classes}></span>
                            <span className="representation-name is-size-5">{this.name}</span>

                            <div className="content statistiques representation-data-text">
                                <div style={{ width: '75%' }}>
                                    <progress className={`progress`} value={this.taux_charge} max="100">{this.taux_charge}%</progress>
                                </div>
                                <div>
                                    <span className="titre">Taux de charge&nbsp;:</span>
                                    <span>{this.taux_charge} </span>
                                    <span className="unit">%</span>
                                </div>
                                <div>
                                    <span className="titre">Production&nbsp;:</span>
                                    <span>{this.production} </span>
                                    <span className="unit">MW</span>
                                </div>
                                <div>
                                    <span className="titre">Capacites&nbsp;:</span>
                                    <span>{this.capacites} </span>
                                    <span className="unit">MW</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default PowerSource;