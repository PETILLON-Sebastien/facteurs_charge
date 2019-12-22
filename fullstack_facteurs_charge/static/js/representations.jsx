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
      return (
        <div class="regroupement-representations">
            <div class="representation">
                <div class="legende">
                    <span class="legende-moyen-production legende-photovoltaique"></span>
                    <span>Photovoltaïque</span>
                </div>
                <div class="affichage">
                    <PanneauSolaire pourcentage={this.props.donnees.evolution[this.props.index_temps].tch_solaire}/>
                    <div class="statistiques">
                        <div class="titre">Taux de charge :</div>
                        <div>{Math.round(this.props.donnees.evolution[this.props.index_temps].tch_solaire)} %</div>
                        <div class="titre">Production :</div>
                        <div>{Math.round(this.props.donnees.evolution[this.props.index_temps].solaire)} Mwh</div>
                        <div class="titre">Capacites :</div>
                        <div>{Math.round(this.props.donnees.capacites.solaire)} Mw</div>
                    </div>
                </div>
            </div>

            <div class="representation">
                <div class="legende">
                    <span class="legende-moyen-production  legende-eolien"></span>
                    <span>Éolien</span>
                </div>
                <div class="affichage">
                    <Eolienne pourcentage={this.props.donnees.evolution[this.props.index_temps].tch_eolien}/>
                    <div class="statistiques">
                        <div class="titre">Taux de charge :</div>
                        <div>{Math.round(this.props.donnees.evolution[this.props.index_temps].tch_eolien)} %</div>
                        <div class="titre">Production :</div>
                        <div>{Math.round(this.props.donnees.evolution[this.props.index_temps].eolien)} Mwh</div>
                        <div class="titre">Capacites :</div>
                        <div>{Math.round(this.props.donnees.capacites.eolien)} Mw</div>
                    </div>
                </div>
            </div>

            <div class="representation">
                <div class="legende">
                    <span class="legende-moyen-production  legende-hydraulique"></span>
                    <span>Hydraulique</span>
                </div>
                <div class="affichage">
                    <Barrage pourcentage={this.props.donnees.evolution[this.props.index_temps].tch_hydraulique}/>
                    <div class="statistiques">
                        <div class="titre">Taux de charge :</div>
                        <div>{Math.round(this.props.donnees.evolution[this.props.index_temps].tch_hydraulique)} %</div>
                        <div class="titre">Production :</div>
                        <div>{Math.round(this.props.donnees.evolution[this.props.index_temps].hydraulique)} Mwh</div>
                        <div class="titre">Capacites :</div>
                        <div>{Math.round(this.props.donnees.capacites.hydraulique)} Mw</div>
                    </div>
                </div>
            </div>

            <div class="representation">
                <div class="legende">
                    <span class="legende-moyen-production  legende-nucleaire"></span>
                    <span>Nucléaire</span>
                </div>
                <div class="affichage">
                    <Nucleaire pourcentage={this.props.donnees.evolution[this.props.index_temps].tch_nucleaire}/>
                    <div class="statistiques">
                        <div class="titre">Taux de charge :</div>
                        <div>{Math.round(this.props.donnees.evolution[this.props.index_temps].tch_nucleaire)} %</div>
                        <div class="titre">Production :</div>
                        <div>{Math.round(this.props.donnees.evolution[this.props.index_temps].nucleaire)} Mwh</div>
                        <div class="titre">Capacites :</div>
                        <div>{Math.round(this.props.donnees.capacites.nucleaire)} Mw</div>
                    </div>
                </div>
            </div>

            <div class="representation">
                <div class="legende">
                    <span class="legende-moyen-production  legende-bioenergies"></span>
                    <span>Bioénergies</span>
                </div>
                <div class="affichage">
                    <Bioenergies pourcentage={this.props.donnees.evolution[this.props.index_temps].tch_bioenergies}/>
                    <div class="statistiques">
                        <div class="titre">Taux de charge :</div>
                        <div>{Math.round(this.props.donnees.evolution[this.props.index_temps].tch_bioenergies)} %</div>
                        <div class="titre">Production :</div>
                        <div>{Math.round(this.props.donnees.evolution[this.props.index_temps].bioenergies)} Mwh</div>
                        <div class="titre">Capacites :</div>
                        <div>{Math.round(this.props.donnees.capacites.bioenergies)} Mw</div>
                    </div>
                </div>
            </div>
            
            <div class="representation">
                <div class="legende">
                    <span class="legende-moyen-production  legende-thermique"></span>
                    <span>Fossile</span>
                </div>
                <div class="affichage">
                    <Fossile pourcentage={this.props.donnees.evolution[this.props.index_temps].tch_thermique}/>
                    <div class="statistiques">
                        <div class="titre">Taux de charge :</div>
                        <div>{Math.round(this.props.donnees.evolution[this.props.index_temps].tch_thermique)} %</div>
                        <div class="titre">Production :</div>
                        <div>{Math.round(this.props.donnees.evolution[this.props.index_temps].thermique)} Mwh</div>
                        <div class="titre">Capacites :</div>
                        <div>{Math.round(this.props.donnees.capacites.thermique)} Mw</div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Representations;