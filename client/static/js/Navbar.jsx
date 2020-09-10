import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import Map from "./slides/map/components/Map";
import moment from "moment";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.menuToggle = this.menuToggle.bind(this);
    this.setCurrentSlide = this.setCurrentSlide.bind(this);

    this.state = {
      showMobileMenu: false,
      activeTab: "map",
      showLocationModal: false,
      showCalendarModal: false,
    };
  }

  componentDidMount() {
    this.menuToggle = this.menuToggle.bind(this);
  }

  menuToggle() {
    this.setState((state) => ({
      showMobileMenu: !state.showMobileMenu,
    }));
  }

  setCurrentSlide(newSlide) {
    this.setState({ activeTab: newSlide });
  }

  render() {
    const hookZoneChanged = this.props.hookZoneChanged;
    const hookDateChanged = this.props.hookDateChanged;
    const currentDate = this.props.currentDate;
    const zonesDescription = this.props.zonesDescription;

    return (
      <React.Fragment>
        <div className="container">
          <nav
            className="navbar is-fixed-top"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <span className="navbar-item">
                <img
                  style={{ maxHeight: "3.5rem", width: "3.5rem" }}
                  src="./images/logo.png"
                  width="64"
                  height="64"
                />
              </span>

              <a
                className="navbar-item is-size-2 is-hidden-desktop"
                href="https://github.com/PETILLON-Sebastien/facteurs_charge"
                target="_blank"
              >
                <span className="icon has-text-white">
                  <i className="fab fa-github-square"></i>
                </span>
              </a>

              <a
                className="navbar-item is-size-2 is-hidden-desktop"
                href="https://twitter.com/FacteursC"
              >
                <span className="icon has-text-white">
                  <i className="fab fa-twitter-square"></i>
                </span>
              </a>

              <a
                role="button"
                className={`navbar-burger burger ${
                  this.state.showMobileMenu ? "is-active" : ""
                }`}
                onClick={this.menuToggle}
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>

            <div
              id="navbarBasicExample"
              className={`navbar-menu ${
                this.state.showMobileMenu ? "is-active" : ""
              }`}
            >
              <div className="navbar-start">
                <span className="navbar-item">
                  <a href="#slide-map">
                    <button
                      className={`${
                        this.state.activeTab == "map" ? "is-success" : ""
                      } is-primary button is-fullwidth`}
                      onClick={() => this.setCurrentSlide("map")}
                    >
                      <span className="icon">
                        <i className="fas fa-map-marker-alt"></i>
                      </span>
                      <span>Carte</span>
                    </button>
                  </a>
                </span>

                <span className="navbar-item">
                  <a href="#slide-installations">
                    <button
                      className={`${
                        this.state.activeTab == "installations"
                          ? "is-success"
                          : ""
                      } is-primary button is-fullwidth`}
                      onClick={() => this.setCurrentSlide("installations")}
                    >
                      <span className="icon">
                        <i className="fas fa-solar-panel"></i>
                      </span>
                      <span>Installations</span>
                    </button>
                  </a>
                </span>

                {/* THOSE SHOULD A COMPONENT... */}
                <span className="navbar-item">
                  <a href="#slide-load">
                    <button
                      className={`${
                        this.state.activeTab == "load" ? "is-success" : ""
                      } is-primary button is-fullwidth`}
                      onClick={() => this.setCurrentSlide("load")}
                    >
                      <span className="icon">
                        <i className="fas fa-percent"></i>
                      </span>
                      <span>Charge</span>
                    </button>
                  </a>
                </span>

                {/*
                                <span className="navbar-item">
                                    <a href="#slide-balance">
                                        <button className={`${this.state.activeTab == 'balance' ? "is-success" : ""} is-primary button is-fullwidth`}
                                            onClick={() => this.setCurrentSlide('balance')}>
                                            <span className="icon">
                                                <i className="fas fa-balance-scale"></i>
                                            </span>
                                            <span>
                                                Balance
                                        </span>
                                        </button>
                                    </a>
                                </span>

                                <span className="navbar-item">
                                    <a href="#slide-exchanges">
                                        <button className={`${this.state.activeTab == 'exchanges' ? "is-success" : ""} is-primary button is-fullwidth`}
                                            onClick={() => this.setCurrentSlide('exchanges')}>
                                            <span className="icon">
                                            <i className="fas fa-arrows-alt-h"></i>
                                            </span>
                                            <span>
                                                Échanges
                                        </span>
                                        </button>
                                    </a>
                                </span> */}
                <span className="navbar-item">
                  <a
                    className="button is-dark is-fullwidth"
                    onClick={() => this.setState({ showLocationModal: true })}
                  >
                    <span className="icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </span>
                    <span className="is-size-5">{this.props.label_region}</span>
                    <span className="icon">
                      <i className="fas fa-chevron-down"></i>
                    </span>
                  </a>
                </span>

                <span className="navbar-item">
                  <a
                    className="button is-dark is-fullwidth"
                    onClick={() => this.setState({ showCalendarModal: true })}
                  >
                    <span className="icon">
                      <i className="far fa-calendar-alt"></i>
                    </span>
                    <span className="is-size-5"></span>
                    <span className="icon">
                      <i className="fas fa-chevron-down"></i>
                    </span>
                  </a>
                </span>
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <a
                    className="navbar-item is-size-2"
                    href="https://github.com/PETILLON-Sebastien/facteurs_charge"
                    target="_blank"
                  >
                    <span className="icon has-text-white is-hidden-touch">
                      <i className="fab fa-github-square"></i>
                    </span>
                  </a>

                  <a
                    className="navbar-item is-size-2"
                    href="https://twitter.com/FacteursC"
                  >
                    <span className="icon has-text-white is-hidden-touch">
                      <i className="fab fa-twitter-square"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div
          className={`modal ${this.state.showLocationModal ? "is-active" : ""}`}
        >
          <div
            className="modal-background"
            onClick={() => this.setState({ showLocationModal: false })}
          ></div>
          <div className="modal-content">
            <Map
              zoneChanged={(value) => this.hideModal(hookZoneChanged, value)}
              zonesDescription={zonesDescription}
            />
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => this.setState({ showLocationModal: false })}
          ></button>
        </div>

        <div
          className={`modal ${this.state.showCalendarModal ? "is-active" : ""}`}
        >
          <div
            className="modal-background"
            onClick={() => this.setState({ showCalendarModal: false })}
          ></div>
          <div className="modal-content">
            {/* MIN DATE HAS BEEN HARDCODED PER @Petillon's requirements due to backend limitation: https://github.com/PETILLON-Sebastien/facteurs_charge/issues/65#issue-688691869  */}
            <Calendar
              returnDate="range"
              selectRange={true}
              maxDate={new Date()}
              minDate={moment("2020-02-01T00:00:00.00Z").toDate()}
              onChange={(values) => this.hideModal(hookDateChanged, values)}
            />
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => this.setState({ showCalendarModal: false })}
          ></button>
        </div>
      </React.Fragment>
    );
  }

  hideModal(callBack, value) {
    callBack(value);
    this.setState({ showLocationModal: false });
    this.setState({ showCalendarModal: false });
  }
}

export default Navbar;
