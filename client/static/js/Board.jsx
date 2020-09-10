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
import moment from "moment";

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
    that = this;

    this.zonesDescription = this.getZoneDescriptions();
    this.zoneChanged = this.zoneChanged.bind(this);

    const buildNumber = "BUILD_NUMBER_PLACEHOLDER";
    const buildDate = "BUILD_DATE_PLACEHOLDER";
    console.log("Build number:", buildNumber);
    this.state = {
      buildNumber: buildNumber,
      buildDate: buildDate,
      currentZone: { id: "xxx", label: "xxxx" }, //fixme,
      isLoaded: false,
      loadingStatuses: [],
    };

    this.state.loadingStatuses.push({
      name: "fetching power source breakdown",
      status: "...",
    });
    this.state.loadingStatuses.push({
      name: "fetching load breakdown",
      status: "...",
    });
    this.state.loadingStatuses.push({
      name: "fetching load for all zones",
      status: "...",
    });

    console.log("Board built.", "isLoaded?", this.state.isLoaded);
  }

  getZoneDescriptions() {
    return stubZonesDescription;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const shouldBoardUpdate =
      nextState.isLoaded &&
      this.state.currentZone.id != nextState.currentZone.id;
    console.log("Should Board update?", shouldBoardUpdate);
    console.log(this.state, nextState);
    return shouldBoardUpdate;
  }

  componentDidMount() {
    console.log("Board mounted.");
    this.zoneChanged(0);
  }
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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

    const loadBreakdown = Server.getLoadsBreakdown(ISOZoneId);
    const powerSourcesBreadown = Server.getPowerSourcesBreakdown(ISOZoneId);
    const loadsBreakdownForAllZones = Server.getLoadsForAllZones(ISOZoneId);

    Promise.all([
      loadBreakdown,
      powerSourcesBreadown,
      loadsBreakdownForAllZones,
    ]).then((values) => {
      console.log(values);
      let loadBreakdown = values[0];
      let powerSourceData = values[1];
      let loadDataForAllZones = values[2];

      const powerSourcesLatestData =
        powerSourceData[powerSourceData.length - 1].breakdown;

      // PRECONDITION: Considering timely ordered data
      const latestBreakdownData =
        loadBreakdown[loadBreakdown.length - 1].breakdown;
      console.log("Lastest breakdown", latestBreakdownData);

      // PRECONDITION: Considering timely ordered data
      const latestLoads = loadBreakdown[loadBreakdown.length - 1].breakdown;

      console.log(
        "Modifying state of Board and setting loading state of power source slide to loaded."
      );
      this.setState({
        currentZone: { id: ISOZoneId, label: labelCurrentZone },
        isLoaded: true,
        powerSourceBreakdown: {
          isLoaded: true,
          latestPowerBreakdown: powerSourcesLatestData,
          powerBreakdownHistory: powerSourceData,
        },
        loadBreakdown: {
          isLoaded: true,
          latestBreakdownData: latestBreakdownData,
          breakdownHistory: loadBreakdown,
        }, // this can be built in the callback of the async.parallel
        highestLoads: loadDataForAllZones,
      });
    });
  }

  render() {
    console.log("Rendering Board...");

    if (!this.state.isLoaded) {
      console.log(
        "Board has not been fully loaded yet, aborting the rendering and displaying loading screen instead."
      );
      return (
        <div
          className={`pageloader is-dark ${this.state.done ? "" : "is-active"}`}
          ref="spinner"
        >
          <span className="title">
            Facteurs charge préchauffe... On arrive !
          </span>
          <div>
            <ul>
              {this.state.loadingStatuses.map((item, i) => {
                return (
                  <li key={i}>
                    <span>{item.name}</span>
                    <span>{item.status}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    }

    let powerSourceSlide = null;
    if (this.state.powerSourceBreakdown.isLoaded) {
      powerSourceSlide = (
        <SlidePowerSources
          currentZone={this.state.currentZone}
          data={this.state.powerSourceBreakdown}
        />
      );
    } else {
      powerSourceSlide = (
        <div className="section is-medium" style={{ minHeight: "100vh" }}>
          <div className="container">
            <div
              className="columns is-vcentered has-text-centered"
              style={{ marginTop: "30vh" }}
            >
              <div className="column is-full">
                <div className="lds-dual-ring"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    let loadBreakdownSlide = null;
    if (this.state.loadBreakdown.isLoaded) {
      loadBreakdownSlide = (
        <SlideLoad
          currentZone={this.state.currentZone}
          data={this.state.loadBreakdown}
        />
      );
    } else {
      loadBreakdownSlide = (
        <div className="section is-medium" style={{ minHeight: "100vh" }}>
          <div className="container">
            <div
              className="columns is-vcentered has-text-centered"
              style={{ marginTop: "30vh" }}
            >
              <div className="column is-full">
                <div className="lds-dual-ring"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

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
