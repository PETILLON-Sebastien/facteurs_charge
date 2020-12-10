import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./Nav";
import BoardJS from "./BoardJS";

function App() {
  const now = Date.now();
  const [currentDates, setCurrentDates] = useState({ from: now, to: now });
  const [currentZone, setCurrentZone] = useState({ id: 0, label: "France" });
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

  useEffect(() => {
    console.log("FETCHING DATA...", currentDates.from.toString());
    fetch("http://localhost:8080/api/v1/zones/installations/load/last").then(
      (data) => {
        data.json().then((d) => {
          setData(d);
          setLoadingIsDone(true);
        });
      }
    ).catch((e) => {
      console.log(e);
      // e.text().then(errorMessage => {
      //   console.error(errorMessage, "toto");
      // });
    }
    );
  }, [currentDates, currentZone]);

  function Body() {
    if (loadingIsDone) {
      return (
        <React.Fragment>
          {/* <header> */}
          <Nav
            currentDates={currentDates}
            currentZone={currentZone}
            setCurrentDate={setCurrentDateHandler}
            setCurrentZone={setCurrentZoneHandler}
            setCurrentSlide={setCurrentSlide}
          />
          {/* </header> */}
          <BoardJS data={data} />
        </React.Fragment>
      );
    } else {
      return <h1>Loading my love</h1>;
    }
  }

  return (
    <div className="App">
      <Body />
    </div>
  );
}

export default App;
