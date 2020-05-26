import React from "react";
import PowerSource from "./PowerSource";

class Breakdown extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="breakdown" className="columns is-3 is-variable is-centered is-mobile is-multiline representations-wrapper has-text-centered">
                <PowerSource
                    load={this.props.donnees.evolution[this.props.index_temps].tch_solaire}
                    production={this.props.donnees.evolution[this.props.index_temps].solaire}
                    capacity={this.props.donnees.capacites.solaire}
                    type="solar"
                />

                <PowerSource
                    load={this.props.donnees.evolution[this.props.index_temps].tch_eolien}
                    production={this.props.donnees.evolution[this.props.index_temps].eolien}
                    capacity={this.props.donnees.capacites.eolien}
                    type="wind"
                />

                <PowerSource
                    load={this.props.donnees.evolution[this.props.index_temps].tch_hydraulique}
                    production={this.props.donnees.evolution[this.props.index_temps].hydraulique}
                    capacity={this.props.donnees.capacites.hydraulique}
                    type="hydraulic"
                />

                <PowerSource
                    load={this.props.donnees.evolution[this.props.index_temps].tch_nucleaire}
                    production={this.props.donnees.evolution[this.props.index_temps].nucleaire}
                    capacity={this.props.donnees.capacites.nucleaire}
                    type="nuclear"
                />

                <PowerSource
                    load={this.props.donnees.evolution[this.props.index_temps].tch_bioenergies}
                    production={this.props.donnees.evolution[this.props.index_temps].bioenergies}
                    capacity={this.props.donnees.capacites.bioenergies}
                    type="bioenergies"
                />

                <PowerSource
                    load={this.props.donnees.evolution[this.props.index_temps].tch_thermique}
                    production={this.props.donnees.evolution[this.props.index_temps].thermique}
                    capacity={this.props.donnees.capacites.thermique}
                    type="thermal"
                />
            </div>
        );
    }
}

export default Breakdown;