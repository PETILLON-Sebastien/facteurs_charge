import React from "react";

class APropos extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
        return (<div className="aPropos">
            <span>Cette application s'appuie sur les données fournies par <a href="https://opendata.reseaux-energies.fr">
                https://opendata.reseaux-energies.fr
            </a>.</span>
            <span>Inspirations :&nbsp; 
                <a href="https://www.electricitymap.org">https://www.electricitymap.org</a> et&nbsp;
                <a href="https://nuclear-monitor.fr/#/">https://nuclear-monitor.fr/#/</a>.
            </span>
        </div>);
    }
}

export default APropos;