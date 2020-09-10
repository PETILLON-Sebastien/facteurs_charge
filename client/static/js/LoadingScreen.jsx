import React from "react";

export default class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const done = this.props.done;
    const steps = this.props.steps;
    return (
      <div
        className={`pageloader is-dark ${done ? "" : "is-active"}`}
        ref="spinner"
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
  }
}
