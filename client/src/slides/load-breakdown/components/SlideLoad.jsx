import React from "react";
import PowerSourceLoad from "./PowerSourceLoad";
import GraphLoadEvolution from "./GraphLoadEvolution";
import { ZoneContext } from "../../../ZoneContext";
import PowerSourceNameInline from "../../../power-sources/components/PowerSourceNameInline";
import SlideContentLayout from "../../../SlideContentLayout";

class SlideLoad extends React.Component {
  findMostLoaded(breakdownData) {
    let bestComponent = undefined,
      bestLoadValue = undefined;
    Object.keys(breakdownData).forEach((installationType) => {
      // FIXME .breakdown WAS NOT THERE BEFORE?
      const currentLoadValue = breakdownData[installationType].load.value;

      if (bestComponent === undefined) {
        bestComponent = <PowerSourceNameInline type={installationType} />;
        bestLoadValue = currentLoadValue;
      } else {
        if (currentLoadValue > bestLoadValue) {
          bestComponent = <PowerSourceNameInline type={installationType} />;
          bestLoadValue = currentLoadValue;
        }
      }
    });

    return bestComponent;
  }

  findLeastLoaded(breakdownData) {
    let bestComponent = undefined;
    let best = undefined;
    Object.keys(breakdownData).forEach((installationType) => {
      if (best === undefined) {
        bestComponent = <PowerSourceNameInline type={installationType} />;
        best = breakdownData[installationType];
      } else {
        if (breakdownData[installationType].load.value < best.load.value) {
          bestComponent = <PowerSourceNameInline type={installationType} />;
          best = breakdownData[installationType];
        }
      }
    });

    return bestComponent;
  }

  render() {
    const currentData = this.props.data[this.props.data.length - 1].breakdown;
    const currentZoneName = this.props.currentZone.label;
    const mostLoadedInstallation = this.findMostLoaded(currentData);
    const leastLoadedInstallation = this.findLeastLoaded(currentData);

    const keys = Object.keys(currentData);
    const firstHalfOfKeys = keys.splice(0, keys.length);

    let firstColumn = [];
    for (let i = 0; i < firstHalfOfKeys.length; i++) {
      const installationType = firstHalfOfKeys[i];
      const currentDataForInstallation = currentData[installationType];
      const newComponent = (
        <div
          key={installationType}
          className="column powerSourceProduction is-6-widescreen is-6-full-hd is-6-desktop is-4-tablet is-6-mobile "
          style={{ marginTop: "10px" }}
        >
          <PowerSourceLoad
            key={installationType}
            load={currentDataForInstallation.load}
            production={currentDataForInstallation.production}
            capacity={currentDataForInstallation.capacity}
            type={installationType}
            cssClass="load"
            mirrored={false}
          />
        </div>
      );
      firstColumn.push(newComponent);
    }

    return (
      <React.Fragment>
        <SlideContentLayout anchor="slide-load">
          <h1 className="is-size-1 has-text-centered">Facteur de charge</h1>
          <React.Fragment>
            <div className="is-size-6">
              Le taux de charge correspond au rapport production effective /
              capacité installée. Si un moyen de production fonctionne à moitié
              de ses capacités, on dit qu'il a un taux de charge de 50%.
            </div>
            <div className="is-size-6">
              Certaines sources sont intrisèquement intermittentes (
              <PowerSourceNameInline type="solar" />,{" "}
              <PowerSourceNameInline type="wind" /> et{" "}
              <PowerSourceNameInline type="hydraulic" /> au fil de l'eau).
              <br />
              D'autres sont pilotables (
              <PowerSourceNameInline type="fossil" />,{" "}
              <PowerSourceNameInline type="bioenergy" />,{" "}
              <PowerSourceNameInline type="nuclear" /> et{" "}
              <PowerSourceNameInline type="hydraulic" /> en STEP).
            </div>

            <div className="is-size-6">
              Dans un cas, le taux de charge est subi, dans l'autre choisi.
              <br />
              Les pannes, maintenances et accidents influent également les
              disponibilités et affectent toute les sources de production
              électrique.
              <br />
            </div>

            <div className="is-size-5" style={{ marginTop: "2rem" }}>
              Actuellement, en{" "}
              <span className="has-background-grey text-inline-highlighted">
                {currentZoneName}
              </span>
              , le parc {mostLoadedInstallation} a le meilleur taux de charge et
              le parc {leastLoadedInstallation} le plus faible.
            </div>
          </React.Fragment>
          {firstColumn}
          <GraphLoadEvolution loadsOverTime={this.props.data} />
        </SlideContentLayout>
        {/* </div> */}
      </React.Fragment>
    );
  }
}

SlideLoad.contextType = ZoneContext;

export default SlideLoad;
