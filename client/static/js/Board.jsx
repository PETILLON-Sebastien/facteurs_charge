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
      steps: [
        { name: "Récupération de la carte", done: false },
        {
          name: "Récupération des informations de sources d'énergie",
          done: false,
        },
        { name: "Récupération des informations de charges", done: false },
      ],
    };

    console.log("Board built.", "isLoaded?", this.state.isLoaded);
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

  checkIfStillLoading(ISOZoneId, labelCurrentZone) {
    const isStillLoading =
      this.state.steps.find((elem) => !elem.done) != undefined;

    this.setState({ isLoading: isStillLoading });

    if (!isStillLoading) {
      const newState = {
        currentZone: { id: ISOZoneId, label: labelCurrentZone },
        isLoaded: true,
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
      };
      console.log("Changing state because everything is loaded", newState);

      this.setState(newState);
    }
  }

  updateStepState(stepIndex) {
    console.log("Step", stepIndex, "done");
    var steps = Object.assign(this.state.steps);
    steps[stepIndex].done = true;
    this.setState({ steps: steps });
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
      this.setState({ powerSourceBreakdown: { isLoaded: true } });
      return;
    }

    console.log("Putting the slide power source breakdown in loading mode...");
    this.setState({
      powerSourceBreakdown: { isLoaded: false },
      loadBreakdown: { isLoaded: false },
    });

    // Trigger network calls
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

  render() {
    // return (
    //   <div>
    //     <h1>
    //       {!this.state.isLoading && (
    //         <span>Everything has been retrieved! We can go on!</span>
    //       )}
    //     </h1>
    //     <h1>{this.state.isLoading && <span>...</span>}</h1>
    //     <ul>
    //       {this.state.steps.map((item, i) => {
    //         return (
    //           <li key={i}>
    //             <span>{item.name}</span>
    //             <span>{item.done && <h1>Done</h1>}</span>
    //             <span>{!item.done && <h1>Pending</h1>}</span>
    //           </li>
    //         );
    //       })}
    //     </ul>
    //   </div>
    // );
    console.log("Rendering Board...");

    if (this.state.isLoading) {
      console.log(
        "Board has not been fully loaded yet, aborting the rendering and displaying loading screen instead."
      );
      return (
        <div
          className={`pageloader is-dark ${this.state.done ? "" : "is-active"}`}
          ref="spinner"
        >
          <div className="title has-text-centered">
            <span>Facteurs charge préchauffe... On arrive !</span>
            <ul
              className="has-text-left"
              style={{
                color: "#838383",
                whiteSpace: "break-spaces",
                marginTop: "2rem",
              }}
            >
              {this.state.steps.map((item, i) => {
                return (
                  <li key={i}>
                    <div className="columns is-mobile">
                      <div className="column is-1">
                        <span>
                          {item.done && (
                            <span className="icon">
                              {" "}
                              <i className="fas fa-check"></i>
                            </span>
                          )}
                        </span>
                        <span>{!item.done && <span></span>}</span>
                      </div>
                      <div className="column">
                        <span>{item.name}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    } else {
      let powerSourceSlide = null;
      // if (!this.state.powerSourceBreakdown.isLoading) {
      powerSourceSlide = (
        <SlidePowerSources
          currentZone={this.state.currentZone}
          data={this.state.powerSourceBreakdown}
        />
      );
      // } else {
      //   powerSourceSlide = (
      //     <div className="section is-medium" style={{ minHeight: "100vh" }}>
      //       <div className="container">
      //         <div
      //           className="columns is-vcentered has-text-centered"
      //           style={{ marginTop: "30vh" }}
      //         >
      //           <div className="column is-full">
      //             <div className="lds-dual-ring"></div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   );
      // }

      let loadBreakdownSlide = null;
      // if (this.state.loadBreakdown.isLoaded) {
      loadBreakdownSlide = (
        <SlideLoad
          currentZone={this.state.currentZone}
          data={this.state.loadBreakdown}
        />
      );
      // } else {
      //   loadBreakdownSlide = (
      //     <div className="section is-medium" style={{ minHeight: "100vh" }}>
      //       <div className="container">
      //         <div
      //           className="columns is-vcentered has-text-centered"
      //           style={{ marginTop: "30vh" }}
      //         >
      //           <div className="column is-full">
      //             <div className="lds-dual-ring"></div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   );
      // }

      return (
        <React.Fragment>
          <header>
            <Navbar
              that={that}
              label_region={this.state.currentZone.label}
              hookZoneChanged={this.zoneChanged}
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

          {powerSourceSlide}
          {loadBreakdownSlide}
          {/* <ZoneContext.Provider value={{ currentZone: this.state.currentZone }}> */}

          {/* <div className="section is-medium" id="slide-load" style={{ "minHeight": "100vh" }}>
            <SlideLoad />
          </div>
          <div className="section is-medium" id="slide-balance" style={{ "minHeight": "100vh" }}>
            <div className="container">
              <SlidePowerBalance />
            </div>
          </div>
          <div className="section is-medium" id="slide-exchanges" style={{ "minHeight": "100vh" }}>
            <div className="container">
              <MyMap />
            </div>
          </div> */}
          {/* </ZoneContext.Provider> */}
        </React.Fragment>
      );
    }
  }
}
