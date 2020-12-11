import React, { useEffect, useState } from "react";
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
  const [slidePowerSourcesData, setSlidePowerSourceBreakdownData] = useState({});
  const [slideMapData, setSlideMapData] = useState({});
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


  const updateLatestLoads = (cb) => {
    Server.getLoadsForAllZones(
      currentDates.from,
      currentDates.to,
      (d) => {
        setSlideMapData(d);
        cb(null, slideMapData);
      }, (err) => {
        console.error(err);
      });
  };

  const updatePowerSourceBreadowns = (cb) => {
    Server.getPowerSourcesBreakdown(
      currentZone.id,
      currentDates.from,
      currentDates.to,
      (d) => {
        setSlidePowerSourceBreakdownData(d);
        cb(null, slidePowerSourcesData);
      }, (err) => {
        console.error(err);
      });
  };


  // const updatePowerSourceBreadowns = (cb) => {
  //   Server.getPowerSourcesBreakdown(
  //     currentZone.id,
  //     currentDates.from,
  //     currentDates.to,
  //     (d) => {
  //       setSlidePowerSourceBreakdownData(d);
  //       cb(null, slidePowerSourcesData);
  //     }, (err) => {
  //       console.error(err);
  //     });
  // };



  // When nothing changes (thus at the first boot), get last installations loads
  useEffect(() => {
    updateLatestLoads(() => { });
  }, []);

  // When date or zone change, and at the first boot get slides information
  useEffect(() => {

    async.waterfall(
      [
        (cb) => {
          updatePowerSourceBreadowns(cb);
        },
        (_, cb) => {
          updateLatestLoads(cb);
        },
        // (_, cb) => {
        //   updateLatestLoads(cb);
        // },
        // (_, cb) => {
        //   updateLatestLoads(cb);
        // },
      ],
      (err, data) => {
        setLoadingIsDone(true);
      }
    );


  }, [currentDates, currentZone]);

  function Body() {
    if (loadingIsDone) {
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
            slideMapData={slideMapData}
            slidePowerSourcesData={slidePowerSourcesData}
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
