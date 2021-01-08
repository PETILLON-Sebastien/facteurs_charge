import React from "react";

const LoadBar = ({ load }) => {
  return (
    <div style={{ width: "75%" }}>
      <progress className={`progress`} value={load} max="100">
        {load}%
      </progress>
    </div>
  );
};

export default LoadBar;
