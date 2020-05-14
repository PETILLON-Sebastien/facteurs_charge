import React from "react";
import Representation from "./representation";

class Representations extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className="columns is-8 is-mobile is-multiline representations-wrapper">
                {/* THIS DIV WRAPPER SHOULD BE PART OF REPRESENTATION COMPONENT */}
                <div className="column is-4 is-six-mobile">
                    <Representation
                        pourcentage={this.props.donnees.evolution[this.props.index_temps].tch_solaire}
                        production={this.props.donnees.evolution[this.props.index_temps].solaire}
                        capacites={this.props.donnees.capacites.solaire}
                        type="Photovoltaïque"
                    />
                </div>
                <div className="column is-4 is-six-mobile">
                    <Representation
                        pourcentage={this.props.donnees.evolution[this.props.index_temps].tch_eolien}
                        production={this.props.donnees.evolution[this.props.index_temps].eolien}
                        capacites={this.props.donnees.capacites.eolien}
                        type="Éolien"
                    />
                </div>
                <div className="column is-4 is-six-mobile">
                    <Representation
                        pourcentage={this.props.donnees.evolution[this.props.index_temps].tch_hydraulique}
                        production={this.props.donnees.evolution[this.props.index_temps].hydraulique}
                        capacites={this.props.donnees.capacites.hydraulique}
                        type="Hydraulique"
                    />
                </div>
                <div className="column is-4 is-six-mobile">
                    <Representation
                        pourcentage={this.props.donnees.evolution[this.props.index_temps].tch_nucleaire}
                        production={this.props.donnees.evolution[this.props.index_temps].nucleaire}
                        capacites={this.props.donnees.capacites.nucleaire}
                        type="Nucléaire"
                    />
                </div>
                <div className="column is-4">
                    <Representation
                        pourcentage={this.props.donnees.evolution[this.props.index_temps].tch_bioenergies}
                        production={this.props.donnees.evolution[this.props.index_temps].bioenergies}
                        capacites={this.props.donnees.capacites.bioenergies}
                        type="Bioénergies"
                    />
                </div>
                <div className="column is-4">
                    <Representation
                        pourcentage={this.props.donnees.evolution[this.props.index_temps].tch_thermique}
                        production={this.props.donnees.evolution[this.props.index_temps].thermique}
                        capacites={this.props.donnees.capacites.thermique}
                        type="Fossile"
                    />
                </div>
            </div>
        );
    }
}

export default Representations;