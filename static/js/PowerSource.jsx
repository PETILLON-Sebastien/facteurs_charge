import React from "react";
import Eolienne from "./power-sources/eolienne";
import PanneauSolaire from "./power-sources/panneau-solaire";
import Barrage from "./power-sources/barrage";
import Fossile from "./power-sources/fossile";
import Nucleaire from "./power-sources/nucleaire";
import Bioenergies from "./power-sources/bioenergies";
import PowerSourceKPI from "./PowerSourceKPI";
import LoadBar from "./LoadBar";

class PowerSource extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        const load = this.props.load;
        const production = this.props.production;
        const capacity = this.props.capacity;
        const type = this.props.type;

        const cssClass = this.props.cssClass;

        const kpis = this.buildKPIs(load, production, capacity, cssClass);
        [this.state.svg, this.state.classes, this.state.name] = this.buildProperVisualization(type, load);
        this.state.loadBar = this.buildProgressBar(load);

        this.state.kpis = kpis;

    }

    buildProgressBar(load) {
        if (!isNaN(load)) {
            return <LoadBar load={load} />
        }
    }


    buildKPIs(load, production, capacity, cssClass) {
        let kpis = {};

        if (load != undefined) {
            const loadValue = Math.round(load.value);
            const loadUnit = load.unit;
            const loadKPI = <PowerSourceKPI title="Taux de charge" value={loadValue} unit={loadUnit} cssClass={cssClass} />
            kpis.load = loadKPI;
        }

        if (production != undefined) {
            const productionValue = Math.round(production.value);
            const productionUnit = production.unit;
            const productionKPI = <PowerSourceKPI title="Production" value={productionValue} unit={productionUnit} cssClass={cssClass} />
            kpis.production = productionKPI;
        }

        if (capacity != undefined) {
            const capacityValue = Math.round(capacity.value);
            const capacityUnit = capacity.unit;
            const capacityKPI = <PowerSourceKPI title="Capacité" value={capacityValue} unit={capacityUnit} cssClass={cssClass} />
            kpis.capacity = capacityKPI;
        }

        return kpis;
    }

    buildProperVisualization(type, loadDescription) {

        let load = 50;
        if (loadDescription != undefined) {
            load = loadDescription.value;
        }

        let svg;
        let classes = "legende-moyen-production legende-";
        let name = "DEFAULT";

        switch (type) {
            case "solar":
                svg = <PanneauSolaire pourcentage={load} />;
                name = "Photovoltaïque";
                classes += "solar"
                break;
            case "wind":
                svg = <Eolienne pourcentage={load} />;
                name = "Éolien";
                classes += "wind"
                break;
            case "hydraulic":
                svg = <Barrage pourcentage={load} />;
                name = "Hydraulique";
                classes += "hydraulic"
                break;
            case "nuclear":
                svg = <Nucleaire pourcentage={load} />;
                name = "Nucléaire";
                classes += "nuclear"
                break;
            case "bioenergies":
                svg = <Bioenergies pourcentage={load} />;
                name = "Bioénergies";
                classes += "bioenergies"
                break;
            case "thermal":
                svg = <Fossile pourcentage={load} />;
                name = "Thermique";
                classes += "thermal"
                break;
            default:
                console.warn("A unknown type of power-source has been passed (" + type + "). Defaulting values.");
                svg = <Fossile pourcentage={load} />;
                name = "UNKNOWN TYPE " + type;
                classes += "unknown"
                break;
        }

        return [svg, classes, name];

        // return {
        //     svg:svg,
        //     classes:classes,
        //     name:name
        // }
    }

    render() {

        const cssClass = this.props.cssClass;
        const mirrored = this.props.mirrored == undefined ? false : this.props.mirrored;

        return (
            <React.Fragment>
                <div className={`columns is-gapless is-vcentered ${cssClass}-power-source`}>

                    { !mirrored && 
                        <div className="column is-4-fullhd is-4-widescreen is-4-desktop is-4-tablet is-10-mobile is-offset-2 is-vcentered has-text-centered">
                            <figure className={`image ${cssClass}-logo-mix`}>
                                {this.state.svg}
                            </figure>
                        </div>
                    }
                    <div className="column is-8-fullhd is-8-widescreen is-8-desktop is-8-tablet is-10-mobile is-offset-2">
                        <span className={this.state.classes}></span>
                        <span className={`${cssClass}-source-name`}>{this.state.name}</span>

                        <div className="content statistiques representation-data-text">
                            {this.state.loadBar}
                            {this.state.kpis.load}
                            {this.state.kpis.production}
                            {this.state.kpis.capacity}
                        </div>
                    </div>

                    { mirrored && 
                        <div className="column is-4-fullhd is-4-widescreen is-4-desktop is-4-tablet is-10-mobile is-offset-2 is-vcentered has-text-centered">
                            <figure className={`image ${cssClass}-logo-mix`}>
                                {this.state.svg}
                            </figure>
                        </div>
                    }

                </div>
            </React.Fragment>
        );
    }
}
export default PowerSource;