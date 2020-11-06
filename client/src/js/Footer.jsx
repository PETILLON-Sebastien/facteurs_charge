import React from "react";

class APropos extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="aPropos">
            <p>Logiciel sous licence MIT</p>
            <p>
                Cette application s'appuie sur les données fournies par <a href="https://opendata.reseaux-energies.fr" target="_blank"> https://opendata.reseaux-energies.fr</a> (Licence Ouverte - <a href="https://www.etalab.gouv.fr/wp-content/uploads/2014/05/Licence_Ouverte.pdf"> Etalab</a>)

            </p>
            <p>Inspirations :&nbsp;
                <a href="https://www.electricitymap.org">https://www.electricitymap.org</a> et&nbsp;
                <a href="https://nuclear-monitor.fr/#/">https://nuclear-monitor.fr/#/</a>.
            </p>
        </div>);
    }
}

export default APropos;