import React, { createRef } from 'react'

import Navbar from './Navbar';

import SlidePowerSources from "./slides/power-sources-breakdown/components/SlidePowerSources";
import SlideLoad from './slides/load-breakdown/components/SlideLoad';
import SlideMap from './slides/map/components/SlideMap';
import SlidePowerBalance from './slides/power-balance/components/SlidePowerBalance';
import MyMap from './slides/exchanges/MyMap';


import stubZonesDescription from "./regions-descriptions";

import _ from "lodash";
import moment from "moment";

import 'moment/locale/fr';


import { ZoneContext } from './ZoneContext';
import { element } from 'prop-types';
const root_endpoint = process.env.API_URL + "/api/v1";


var that;

export default class Board extends React.Component {

  constructor(props) {
    super(props);
    that = this;

    this.zonesDescription = this.getZoneDescriptions();
    this.zoneChanged = this.zoneChanged.bind(this);
    this.state = {
      currentZone: { id: "xxx", label: "xxxx" }, //fixme,
      isLoaded: false
    };

    console.log("Board built.", "isLoaded?", this.state.isLoaded);
  }

  getZoneDescriptions() {
    return stubZonesDescription;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const shouldBoardUpdate = (this.state.isLoaded && nextState.isLoaded) || this.state.currentZone.id != nextState.currentZone.id;
    console.log("Should Board update?", shouldBoardUpdate);
    console.log(this.state, nextState);
    return shouldBoardUpdate;
  }

  async componentDidMount() {
    console.log("Board mounted.");
    await this.zoneChanged(11);
  }

  async zoneChanged(newZoneID) {
    let currentZoneSelected = _.find(this.zonesDescription, { 'id': newZoneID });
    let labelCurrentZone = currentZoneSelected.label;

    let ISOZoneId = "FR";

    if (newZoneID != 0) {
      ISOZoneId = ISOZoneId.concat("-").concat(newZoneID);
    }
    console.log("Zone has changed!", "Old:", this.state.currentZone.id, "New:", ISOZoneId);

    if (this.state.currentZone.id == ISOZoneId) {
      console.log("Zone hasn't changed.");
      this.setState({ powerSourceBreakdown: { isLoaded: true } });
      return;
    }

    console.log("Putting the slide power source breakdown in loading mode...");
    this.setState({ powerSourceBreakdown: { isLoaded: false }, loadBreakdown: { isLoaded: false } });

    let powerSourceData = await this.fetchPowerSourcesBreakdown(ISOZoneId);
    console.log("Power sources Data fetched.");

    // PRECONDITION: Considering timely ordered data
    const powerSourcesLatestData = powerSourceData[powerSourceData.length - 1].breakdown;



    let loadData = await this.fetchLoadsBreakdown(ISOZoneId);
    console.log("Load data fetched");

    // PRECONDITION: Considering timely ordered data
    const latestBreakdownData = loadData[loadData.length - 1].breakdown;





    console.log("Modifying state of Board and setting loading state of power source slide to loaded.");
    this.setState({
      currentZone: { id: ISOZoneId, label: labelCurrentZone },
      isLoaded: true,
      powerSourceBreakdown: {
        isLoaded: true,
        latestPowerBreakdown: powerSourcesLatestData,
        powerBreakdownHistory: powerSourceData,
      },
      loadBreakdown:
      {
        isLoaded: true,
        latestBreakdownData: latestBreakdownData,
        breakdownHistory: loadData
      }
    });
  }


  async fetchPowerSourcesBreakdown(ISOZoneId) {
    const targetUrl = root_endpoint + "/zones/" + ISOZoneId + "/installations/production/breakdown";
    console.log("Fetching power sources", targetUrl);

    let data = await fetch(targetUrl);
    data = await data.json();

    // Sort data 
    // ISSUE https://github.com/PETILLON-Sebastien/facteurs_charge/issues/52
    data.sort((breakdownA, breakdownB) => {
      return moment(breakdownA.datetime).valueOf() - moment(breakdownB.datetime).valueOf();
    });

    let now = moment().valueOf();
    data = data.filter((element) => {
      return moment(element.datetime).valueOf() < now;
    });
    // Remove the last one (likely 0)
    // https://github.com/PETILLON-Sebastien/facteurs_charge/issues/53
    data.pop();
    data.pop();
    data.pop();
    // ------------------------------------------------------------------------

    return data;
  }

  async fetchLoadsBreakdown(ISOZoneId) {
    const targetUrl = root_endpoint + "/zones/" + ISOZoneId + "/installations/breakdown";
    console.log("Fetching loads", targetUrl);

    let data = await fetch(targetUrl);

    data = await data.json();

    data.pop();
    data.pop();
    data.pop();
    data.pop();

    let i = 0, j = 0;

    for (i = 0; i < data.length; i++) {
      let currentBreakdown = data[i].breakdown;
      // console.log("CurrentBreakdown", currentBreakdown);
      let keys = Object.keys(currentBreakdown);
      for (j = 0; j < keys.length; j++) {
        const currentKey = keys[j];

        const currentLoad = currentBreakdown[currentKey].load.value;
        if (currentKey == "fossil") {
          console.log(currentBreakdown, currentLoad, currentKey);
          const updatedLoad = currentLoad * 100;
          currentBreakdown[currentKey].load.value = updatedLoad;
        } else {
        const updatedLoad = currentLoad * 100;
        currentBreakdown[currentKey].load.value = updatedLoad;
        }
      }
    }

    // data.forEach(breakdown => {
    //   Object.keys(breakdown.breakdown).forEach((installationBreakdown) => {
    //     let currentLoad = breakdown.breakdown[installationBreakdown].load;
    //     if (currentLoad == null || currentLoad.value == null) {
    //       console.error("Load specified is NULL", breakdown.breakdown, installationBreakdown, breakdown.breakdown[installationBreakdown],currentLoad, currentLoad.value, breakdown.breakdown[installationBreakdown].load.value, i, j);
    //     }
    //     console.log(currentLoad.value, currentLoad.value * 100);
    //     currentLoad.value = currentLoad.value * 100;
    //   });
    // });


    return data;
  }


  render() {
    console.log("Rendering Board...");

    if (!this.state.isLoaded) {
      console.log("Board has not been fully loaded yet, aborting the rendering and displaying loading screen instead.");
      return <div className={`pageloader is-dark ${this.state.done ? "" : "is-active"}`} ref="spinner"><span className="title">Facteurs charge préchauffe... On arrive!</span></div>
    }

    let powerSourceSlide = null;
    if (this.state.powerSourceBreakdown.isLoaded) {
      powerSourceSlide = <SlidePowerSources currentZone={this.state.currentZone} data={this.state.powerSourceBreakdown} />
    } else {
      powerSourceSlide =
        <div className="section is-medium" style={{ "minHeight": "100vh" }}>
          <div className="container">
            <div className="columns is-vcentered has-text-centered" style={{ "marginTop": "30vh" }}>
              <div className="column is-full">
                <div className="lds-dual-ring"></div>
              </div>
            </div>
          </div>
        </div>
    }

    let loadBreakdownSlide = null;
    if (this.state.loadBreakdown.isLoaded) {
      loadBreakdownSlide = <SlideLoad currentZone={this.state.currentZone} data={this.state.loadBreakdown} />

    } else {
      loadBreakdownSlide =
        <div className="section is-medium" style={{ "minHeight": "100vh" }}>
          <div className="container">
            <div className="columns is-vcentered has-text-centered" style={{ "marginTop": "30vh" }}>
              <div className="column is-full">
                <div className="lds-dual-ring"></div>
              </div>
            </div>
          </div>
        </div>
    }


    return (
      <React.Fragment>
        <header >
          <Navbar that={that} label_region={this.state.currentZone.label} hookZoneChanged={this.zoneChanged} zonesDescription={this.zonesDescription} />
        </header>

        <div className="section is-medium" id="slide-map" style={{ "marginTop": "0rem" }}>
          <div className="container">
            <SlideMap zoneChanged={this.zoneChanged} zonesDescription={this.zonesDescription} />
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
    )
  }
}