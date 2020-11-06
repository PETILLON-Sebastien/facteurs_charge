import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./Nav";
import Board from "./Board";

function App() {
  const [selectedDate, setSelectedDate] = useState(Date.now);
  const [selectedZone, setSelectedZone] = useState(0);
  const [data, setData] = useState({});
  const [loadingIsDone, setLoadingIsDone] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/zones/installations/load/last").then(
      async (data) => {
        const d = await data.json();
        console.log(d);
        setData(d);
        setLoadingIsDone(true);
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
          />
          <Board data={data} />
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
