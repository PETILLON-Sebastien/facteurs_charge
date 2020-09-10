import React, { createRef } from "react";

import Navbar from "./Navbar";
import Server from "./Server";

import SlidePowerSources from "./slides/power-sources-breakdown/components/SlidePowerSources";
import SlideLoad from "./slides/load-breakdown/components/SlideLoad";
import SlideMap from "./slides/map/components/SlideMap";
import SlidePowerBalance from "./slides/power-balance/components/SlidePowerBalance";
import MyMap from "./slides/exchanges/MyMap";

import stubZonesDescription from "./regions-descriptions";

import _ from "lodash";

import "moment/locale/fr";

import { ZoneContext } from "./ZoneContext";
import { element } from "prop-types";
import LoadingScreen from "./LoadingScreen";

var that;

/**
 * Avoid the use of async
 * Data are fetched (this is an async call) but one should not await for it
 * Each time data are fetched, the "isloaded" global flag is checked, triggering (or not) the shutdown of the loading page
 */

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.zonesDescription = this.getZoneDescriptions();
    this.zoneChanged = this.zoneChanged.bind(this);

    const buildNumber = "BUILD_NUMBER_PLACEHOLDER";
    const buildDate = "BUILD_DATE_PLACEHOLDER";
    console.log("Build number:", buildNumber);
    this.state = {
      buildNumber: buildNumber,
      buildDate: buildDate,
      currentZone: { id: "xxx", label: "xxxx" }, //fixme,
      isLoading: true,
      steps: this.getSteps(),
    };

    console.log("Board built.", "isLoading?", this.state.isLoading);
  }

  getSteps() {
    return [
      { name: "Récupération de la carte", done: false },
      {
        name: "Récupération des informations de sources d'énergie",
        done: false,
      },
      { name: "Récupération des informations de charges", done: false },
    ];
  }

  getZoneDescriptions() {
    return stubZonesDescription;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const shouldBoardUpdate =
      nextState.isLoading ||
      this.state.currentZone.id != nextState.currentZone.id;
    console.log("Should Board update?", shouldBoardUpdate);
    console.log(this.state, nextState);
    return shouldBoardUpdate;
  }

  componentDidMount() {
    console.log("Board mounted.");
    this.zoneChanged(0);
  }

  dateChanged(newDate) {
    console.log("WOW DATE CHANGED", newDate);
  }
  
  zoneChanged(newZoneID) {
    let currentZoneSelected = _.find(this.zonesDescription, { id: newZoneID });
    let labelCurrentZone = currentZoneSelected.label;

    let ISOZoneId = "FR";

    if (newZoneID != 0) {
      ISOZoneId = ISOZoneId.concat("-").concat(newZoneID);
    }

    console.log(
      "Zone has changed!",
      "Old:",
      this.state.currentZone.id,
      "New:",
      ISOZoneId
    );

    if (this.state.currentZone.id == ISOZoneId) {
      console.log("Zone hasn't changed.");
      return;
    }
    
    // update(ISOZoneID, toDate) {...

    else {
      this.setState({ isLoading: true });
    }

    Server.getLoadsBreakdown(ISOZoneId).then((breakdownHistory) => {
      // PRECONDITION: Considering timely ordered data
      this.latestBreakdownData =
        breakdownHistory[breakdownHistory.length - 1].breakdown;
      this.breakdownHistory = breakdownHistory;
      this.updateStepState(0);
      this.checkIfStillLoading(ISOZoneId, labelCurrentZone);
    });

    Server.getPowerSourcesBreakdown(ISOZoneId).then((powerSourceData) => {
      this.latestPowerBreakdown =
        powerSourceData[powerSourceData.length - 1].breakdown;
      this.powerBreakdownHistory = powerSourceData;
      this.updateStepState(1);
      this.checkIfStillLoading(ISOZoneId, labelCurrentZone);
    });

    Server.getLoadsForAllZones(ISOZoneId).then((loadDataForAllZones) => {
      this.highestLoads = loadDataForAllZones;
      this.updateStepState(2);
      this.checkIfStillLoading(ISOZoneId, labelCurrentZone);
    });
  }

  updateStepState(stepIndex) {
    console.log("Step", stepIndex, "done");
    var steps = Object.assign(this.state.steps);
    steps[stepIndex].done = true;
    this.setState({ steps: steps });
  }

  checkIfStillLoading(ISOZoneId, labelCurrentZone) {
    const isStillLoading =
      this.state.steps.find((elem) => !elem.done) != undefined;

    if (!isStillLoading) {
      const newState = {
        currentZone: { id: ISOZoneId, label: labelCurrentZone },
        isLoading: isStillLoading,
        powerSourceBreakdown: {
          isLoaded: true,
          latestPowerBreakdown: this.latestPowerBreakdown,
          powerBreakdownHistory: this.powerBreakdownHistory,
        },
        loadBreakdown: {
          isLoaded: true,
          latestBreakdownData: this.latestBreakdownData,
          breakdownHistory: this.breakdownHistory,
        },
        highestLoads: this.highestLoads,
        steps:this.getSteps()
      };
      console.log("Changing state because everything is loaded", newState);

      this.setState(newState);
    }
  }

  render() {
    console.log("Rendering Board...");

    if (this.state.isLoading) {
      console.log(
        "Board has not been fully loaded yet, aborting the rendering and displaying loading screen instead."
      );
      return <LoadingScreen steps={this.state.steps} done={this.state.done} />;
    } else {
      return (
        <React.Fragment>
          <header>
            <Navbar
              that={that}
              label_region={this.state.currentZone.label}
              hookZoneChanged={this.zoneChanged}
              hookDateChanged={this.dateChanged}
              zonesDescription={this.zonesDescription}
            />
          </header>
          <div
            className="section is-small"
            id="slide-map"
            style={{ marginTop: "0rem" }}
          >
            <div className="container">
              <SlideMap
                zoneChanged={this.zoneChanged}
                zonesDescription={this.zonesDescription}
                highestLoads={this.state.highestLoads}
                buildNumber={this.state.buildNumber}
                buildDate={this.state.buildDate}
              />
            </div>
          </div>
          <SlidePowerSources
            currentZone={this.state.currentZone}
            data={this.state.powerSourceBreakdown}
          />
          <SlideLoad
            currentZone={this.state.currentZone}
            data={this.state.loadBreakdown}
          />
        </React.Fragment>
      );
    }
  }
}
