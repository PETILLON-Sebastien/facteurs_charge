import React, { createRef } from "react";

const LoadingScreen = ({ done, steps = [] }) => {
  const spinnerRef = createRef();
  return (
    <div
      className="pageloader is-dark is-active"
      ref={spinnerRef}
    >
      <div className="title has-text-centered">
        <span>Facteurs charge préchauffe... On arrive !</span>
        <ul
          className="has-text-left"
          style={{
            color: "#838383",
            whiteSpace: "break-spaces",
            marginTop: "2rem",
          }}
        >
          {steps.map((item, i) => {
            return (
              <li key={i}>
                <div className="columns is-mobile">
                  <div className="column is-1">
                    <span>
                      {item.done && (
                        <span className="icon">
                          {" "}
                          <i className="fas fa-check"></i>
                        </span>
                      )}
                    </span>
                    <span>
                      {!item.done && (
                        <span className="icon">
                          <i className="far fa-circle"></i>
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="column">
                    <span>{item.name}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default LoadingScreen;
