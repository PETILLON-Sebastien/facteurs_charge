import React from "react";
import PowerSource from "./PowerSource";

class Breakdown extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="columns is-0 is-variable is-centered is-mobile is-multiline representations-wrapper has-text-centered">
                <PowerSource
                    pourcentage={this.props.donnees.evolution[this.props.index_temps].tch_solaire}
                    production={this.props.donnees.evolution[this.props.index_temps].solaire}
                    capacites={this.props.donnees.capacites.solaire}
                    type="Photovoltaïque"
                />

                <PowerSource
                    pourcentage={this.props.donnees.evolution[this.props.index_temps].tch_eolien}
                    production={this.props.donnees.evolution[this.props.index_temps].eolien}
                    capacites={this.props.donnees.capacites.eolien}
                    type="Éolien"
                />

                <PowerSource
                    pourcentage={this.props.donnees.evolution[this.props.index_temps].tch_hydraulique}
                    production={this.props.donnees.evolution[this.props.index_temps].hydraulique}
                    capacites={this.props.donnees.capacites.hydraulique}
                    type="Hydraulique"
                />

                <PowerSource
                    pourcentage={this.props.donnees.evolution[this.props.index_temps].tch_nucleaire}
                    production={this.props.donnees.evolution[this.props.index_temps].nucleaire}
                    capacites={this.props.donnees.capacites.nucleaire}
                    type="Nucléaire"
                />

                <PowerSource
                    pourcentage={this.props.donnees.evolution[this.props.index_temps].tch_bioenergies}
                    production={this.props.donnees.evolution[this.props.index_temps].bioenergies}
                    capacites={this.props.donnees.capacites.bioenergies}
                    type="Bioénergies"
                />

                <PowerSource
                    pourcentage={this.props.donnees.evolution[this.props.index_temps].tch_thermique}
                    production={this.props.donnees.evolution[this.props.index_temps].thermique}
                    capacites={this.props.donnees.capacites.thermique}
                    type="Fossile"
                />
            </div>
        );
    }
}

export default Breakdown;