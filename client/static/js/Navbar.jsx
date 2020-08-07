import React from "react";
var that;

import Map from "./slides/map/components/Map";


class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.menuToggle = this.menuToggle.bind(this);
        this.setCurrentSlide = this.setCurrentSlide.bind(this);

        this.state = { showMobileMenu: false, activeTab: 'map', showModal: false };
    }

    componentDidMount() {
        this.menuToggle = this.menuToggle.bind(this);
    }

    menuToggle() {
        this.setState(state => ({
            showMobileMenu: !state.showMobileMenu
        }));
    }

    setCurrentSlide(newSlide) {
        this.setState({ activeTab: newSlide });
    }


    render() {

        const hookZoneChanged = this.props.hookZoneChanged;
        const zonesDescription = this.props.zonesDescription;

        return (
            <React.Fragment>
                <div className="container">
                    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
                        <div className="navbar-brand">
                            <span className="navbar-item">
                                <img style={{ "maxHeight": "3.5rem", "width": "3.5rem" }} src="./images/logo.png" width="64" height="64" />
                            </span>

                            <a className="navbar-item is-size-2 is-hidden-desktop" href="https://github.com/PETILLON-Sebastien/facteurs_charge" target="_blank">
                                <span className="icon has-text-white">
                                    <i className="fab fa-github-square"></i>
                                </span>
                            </a>

                            <a className="navbar-item is-size-2 is-hidden-desktop" href="https://twitter.com/FacteursC">
                                <span className="icon has-text-white">
                                    <i className="fab fa-twitter-square"></i>
                                </span>
                            </a>


                            <a role="button" className={`navbar-burger burger ${this.state.showMobileMenu ? "is-active" : ""}`} onClick={this.menuToggle} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </a>
                        </div>

                        <div id="navbarBasicExample" className={`navbar-menu ${this.state.showMobileMenu ? "is-active" : ""}`}>
                            <div className="navbar-start">

                                <span className="navbar-item">
                                    <a href="#slide-map">
                                        <button className={`${this.state.activeTab == 'map' ? "is-success" : ""} is-primary button is-fullwidth`}
                                            onClick={() => this.setCurrentSlide('map')}>
                                            <span className="icon">
                                                <i className="fas fa-map-marker-alt"></i>
                                            </span>
                                            <span>
                                                Carte
                                        </span>
                                        </button>
                                    </a>
                                </span>

                                <span className="navbar-item">
                                    <a href="#slide-installations" >
                                        <button className={`${this.state.activeTab == 'installations' ? "is-success" : ""} is-primary button is-fullwidth`}
                                            onClick={() => this.setCurrentSlide('installations')}>
                                            <span className="icon">
                                                <i className="fas fa-solar-panel"></i>
                                            </span>
                                            <span>
                                                Installations
                                        </span>
                                        </button>
                                    </a>
                                </span>

{/* THOSE SHOULD A COMPONENT... */}
                                <span className="navbar-item">
                                    <a href="#slide-load">
                                        <button className={`${this.state.activeTab == 'load' ? "is-success" : ""} is-primary button is-fullwidth`}
                                            onClick={() => this.setCurrentSlide('load')}>
                                            <span className="icon">
                                                <i className="fas fa-battery-three-quarters"></i>
                                            </span>
                                            <span>
                                                Charge
                                        </span>
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
                                    <a className="button is-dark is-fullwidth" onClick={() => this.setState({ showModal: true })}>
                                        <span className="icon">
                                            <i className="fas fa-map-marker-alt"></i>
                                        </span>
                                        <span className="is-size-5">{this.props.label_region}</span>
                                        <span className="icon">
                                            <i className="fas fa-chevron-down"></i>
                                        </span>
                                    </a>

                                </span>
                            </div>

                            <div className="navbar-end">
                                <div className="navbar-item">
                                    <a className="navbar-item is-size-2" href="https://github.com/PETILLON-Sebastien/facteurs_charge" target="_blank">
                                        <span className="icon has-text-white is-hidden-touch">
                                            <i className="fab fa-github-square"></i>
                                        </span>
                                    </a>

                                    <a className="navbar-item is-size-2" href="https://twitter.com/FacteursC">
                                        <span className="icon has-text-white is-hidden-touch">
                                            <i className="fab fa-twitter-square"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className={`modal ${this.state.showModal ? "is-active" : ""}`}>
                    <div className="modal-background" onClick={() => this.setState({ showModal: false })}></div>
                    <div className="modal-content">
                        <Map zoneChanged={(value) => this.hideModal(hookZoneChanged, value)} zonesDescription={zonesDescription} />
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={() => this.setState({ showModal: false })}></button>
                </div>
            </React.Fragment>
        )
    }

    hideModal(callBack, value) {
        callBack(value);
        this.setState({ showModal: false });
    }
}

export default Navbar;