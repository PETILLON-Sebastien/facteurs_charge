import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./Nav";

function App() {
  const [selectedDate, setSelectedDate] = useState(Date.now);
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

  useEffect(() => {
    console.log("FETCHING DATA...", Date.now().toString());
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
  }, [selectedDate, currentZone]);

  function Body() {
    if (loadingIsDone) {
      return (
        <React.Fragment>
          <Nav
            currentDate={selectedDate}
            currentZone={currentZone}
            setSelectedDate={setSelectedDate}
            setCurrentZone={setCurrentZoneHandler}
            setCurrentSlide={setCurrentSlide}
          />
          {/* <Board data={data} /> */}
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
