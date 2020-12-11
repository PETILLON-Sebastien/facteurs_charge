import React, { useEffect, useState } from "react";
import "./_sass/main.scss";
import Nav from "./Nav";
import BoardJS from "./BoardJS";
import LoadingScreen from "./LoadingScreen";
import Server from "./Server";

function App() {
  const now = Date.now();
  const [currentDates, setCurrentDates] = useState({ from: now, to: now });
  const [currentZone, setCurrentZone] = useState({ id: 0, label: "France" });
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


  // When nothing changes (thus at the first boot), get last installations loads
  useEffect(() => {
    Server.getLoadsForAllZones(
      currentDates.from,
      currentDates.to,
      (d) => {
        setSlideMapData(d);
        setLoadingIsDone(true);
      }, (err) => {
        console.error(err);
      });
    // async.waterfall(
    //   [
    //     (cb) => {
    //       fetch(targetUrl).then((rawData) => cb(null, rawData));
    //     },
    //     (rawData, cb) => {
    //       rawData.json().then((data) => cb(null, data));
    //     },
    //   ],
    //   (err, data) => {

    //   }
    // );

  }, []);

  // useEffect(() => {


  //   console.log("FETCHING DATA...", currentDates.from.toString());
  //   fetch("http://localhost:8080/api/v1/zones/installations/load/last").then(
  //     (data) => {
  //       data.json().then((d) => {
  //         console.log(d);
  //         setData(d);
  //         setLoadingIsDone(true);
  //       });
  //     }
  //   ).catch((e) => {
  //     console.log(e);
  //     // e.text().then(errorMessage => {
  //     //   console.error(errorMessage, "toto");
  //     // });
  //   }
  //   );
  // }, [currentDates, currentZone]);

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
          <BoardJS slideMapData={slideMapData} setCurrentZone={setCurrentZoneHandler} build={{}} />
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
