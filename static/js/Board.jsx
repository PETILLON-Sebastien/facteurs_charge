import React, { createRef } from 'react'

import Navbar from './Navbar';

import SlidePowerSources from "./slides/power-sources-breakdown/components/SlidePowerSources";
import SlideLoad from './slides/load-breakdown/components/SlideLoad';
import SlideMap from './slides/map/components/SlideMap';
import SlidePowerBalance from './slides/power-balance/components/SlidePowerBalance';
import MyMap from './slides/exchanges/MyMap';


import stubZonesDescription from "./regions-descriptions";

import _ from "lodash";

import 'moment/locale/fr';


import { ZoneContext } from './ZoneContext';
const root_endpoint = process.env.API_URL + "/api/v1";


var that;

export default class Board extends React.Component {

  constructor(props) {
    super(props);
    that = this;

    this.zonesDescription = this.getZoneDescriptions();
    this.zoneChanged = this.zoneChanged.bind(this);
    this.state = {
      currentZone: { id: "FR", label: "France" }, //fixme,
      powerSourceBreakdown: { isLoaded: false }
    };

  }

  getZoneDescriptions() {
    return stubZonesDescription;
  }

  async componentDidMount() {

    let data = await this.fetchPowerSourcesBreakdown("FR");
    // PRECONDITION: Considering timely ordered data
    const latestData = data[data.length - 1].breakdown;

    this.setState({
      actionsVisibles: true,
      currentZone: { id: "FR", label: "France" }, //fixme
      powerSourceBreakdown: {
        isLoaded: true,
        latestPowerBreakdown: latestData,
        powerBreakdownHistory: data,
      }
    });
  }

  async zoneChanged(newZoneID) {
    let currentZoneSelected = _.find(this.zonesDescription, { 'id': newZoneID });
    let labelCurrentZone = currentZoneSelected.label;

    let ISOZoneId = "FR";

    if (newZoneID != 0) {
      ISOZoneId = ISOZoneId.concat("-").concat(newZoneID);
    }

    console.log("New zone : ", ISOZoneId);

    // this.setState({ });

    let data = await this.fetchPowerSourcesBreakdown(ISOZoneId);
    console.log(data.length);
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

    console.log(data.length);
    // PRECONDITION: Considering timely ordered data
    const latestData = data[data.length - 1].breakdown;

    this.setState({
      currentZone: { id: ISOZoneId, label: labelCurrentZone },
      powerSourceBreakdown: {
        isLoaded: true,
        latestPowerBreakdown: latestData,
        powerBreakdownHistory: data,
      }
    });
  }


  async fetchPowerSourcesBreakdown(ISOZoneId) {
    const targetUrl = root_endpoint + "/zones/" + ISOZoneId + "/installations/production/breakdown?from=2020-07-29&to=2020-07-30";
    console.log("Fetching data", targetUrl);

    const data = await fetch(targetUrl);
    return await data.json();
  }


  render() {

    let powerSourceSlide = null;
    if (this.state.powerSourceBreakdown.isLoaded) {
      powerSourceSlide = <SlidePowerSources currentZone={this.state.currentZone} data={this.state.powerSourceBreakdown} />
    } else {
      powerSourceSlide = <h1>I AM LOADING</h1>
    }

    return (
      <React.Fragment>
        <header >
          <Navbar that={that} label_region={this.state.currentZone.label} hookZoneChanged={this.zoneChanged} zonesDescription={this.zonesDescription} />
        </header>

        <div className="section is-medium" id="slide-map" style={{ "marginTop": "3rem" }}>
          <div className="container">
            <SlideMap zoneChanged={this.zoneChanged} zonesDescription={this.zonesDescription} />
          </div>
        </div>

        {powerSourceSlide}
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