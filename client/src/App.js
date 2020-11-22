import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./Nav";
import Board from "./Board";

function App() {
  const [selectedDate, setSelectedDate] = useState(Date.now);
  const [selectedZone, setSelectedZone] = useState({ id: 0, name: "France" });
  const [data, setData] = useState({});
  const [loadingIsDone, setLoadingIsDone] = useState(false);

  const setCurrentSlide = () => {
    console.log("slide changed");
  };

  useEffect(() => {
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
  }, [selectedDate, selectedZone]);

  function Body() {
    if (loadingIsDone) {
      return (
        <React.Fragment>
          <Nav
            currentDate={selectedDate}
            currentZone={selectedZone}
            setSelectedDate={setSelectedDate}
            setSelectedZone={setSelectedZone}
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
