import React, { useCallback, useEffect, useState } from "react";
import "./_sass/main.scss";
import Nav from "./Nav";
import BoardJS from "./BoardJS";
import LoadingScreen from "./LoadingScreen";
import Server from "./Server";
var async = require("async");

function App() {
  const now = Date.now();
  const [currentDates, setCurrentDates] = useState({ from: now, to: now });
  const [currentZone, setCurrentZone] = useState({ id: 0, label: "France" });
  // const [slidePowerSourcesData, setSlidePowerSourceBreakdownData] = useState({});
  // const [slideLoadBreakdownData, setSlideLoadBreakdownData] = useState({});
  // const [slideMapData, setSlideMapData] = useState({});
  const [data, setData] = useState({});
  const [loadingIsDone, setLoadingIsDone] = useState(false);

  const setCurrentSlide = () => {
    console.log("slide changed");
  };

  const setCurrentZoneHandler = (value) => {
    console.log("CURRENT ZONE CHANGED", value, Date.now().toString());
    setCurrentZone(value);
  };

  const setCurrentDateHandler = (values) => {
    console.log("CURRENT DATES CHANGED", values);
    setCurrentDates(values);
  };


  const updateLatestLoads = (agregator, cb) => {
    Server.getLoadsForAllZones(
      currentDates.from,
      currentDates.to,
      (d) => {
        // setSlideMapData(d);
        agregator.slideMapData = d;
        cb(null, agregator);
      }, (err) => {
        console.error(err);
      });
  };

  const updatePowerSourceBreadowns = (agregator, cb) => {
    Server.getPowerSourcesBreakdown(
      currentZone.id,
      currentDates.from,
      currentDates.to,
      (d) => {
        // setSlidePowerSourceBreakdownData(d);
        agregator.slidePowerSourcesData = d;
        cb(null, agregator);
      }, (err) => {
        console.error(err);
      });
  };

  const updateLoadBreadowns = (agregator, cb) => {
    Server.getLoadsBreakdown(
      currentZone.id,
      currentDates.from,
      currentDates.to,
      (d) => {
        // setSlideLoadBreakdownData(d);
        agregator.slideLoadBreakdownData = d;
        cb(null, agregator);
      }, (err) => {
        console.error(err);
      });
  };

  // When nothing changes (thus at the first boot), get last installations loads
  // useEffect(() => {
  //   updateLatestLoads({}, () => { });
  // }, []);

  // When date or zone change, and at the first boot get slides information
  useEffect(() => {

    /*
      If each element of the waterfall set a piece of state, this will trigger as much
      renders as element in the waterfall. To avoid this, each waterfall function will 
      set a var, that, once the waterfall ended, is used to update a state
    */

    async.waterfall(
      [
        (cb) => {
          updatePowerSourceBreadowns({}, cb);
        },
        (agregator, cb) => {
          updateLatestLoads(agregator, cb);
        },
        (agregator, cb) => {
          updateLoadBreadowns(agregator, cb);
        },
      ],
      (err, data) => {
        // console.log("SETDATA");
        setData(data);
        // console.log("SETLOADING");
        // setLoadingIsDone(true);

      }
    );
  }, [currentDates, currentZone]);

  function Body() {
    // console.log(data);
    if (data !== undefined && Object.keys(data).length > 0 && data.constructor === Object) {
      return (
        <React.Fragment>
          <Nav
            currentDates={currentDates}
            currentZone={currentZone}
            setCurrentDate={setCurrentDateHandler}
            setCurrentZone={setCurrentZoneHandler}
            setCurrentSlide={setCurrentSlide}
          />
          <BoardJS
            slideMapData={data.slideMapData}
            slidePowerSourcesData={data.slidePowerSourcesData}
            slideLoadBreakdownData={data.slideLoadBreakdownData}
            setCurrentZone={setCurrentZoneHandler}
            build={{}}
            currentZone={currentZone} />
        </React.Fragment>
      );
    } else {
      return <LoadingScreen />
    }
  }

  return (
    <div className="App">
      <Body />
    </div>
  );
}

export default App;
