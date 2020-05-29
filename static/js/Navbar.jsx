import React from "react";
var that;

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        that = this;
        this.state = { showMobileMenu: false, activeTab: 'mix' };
    }

    componentDidMount() {
        this.menuToggle = this.menuToggle.bind(this);
    }

    menuToggle() {
        that.setState(state => ({
            showMobileMenu: !state.showMobileMenu
        }));
    }


    render() {


        return (

            <div className="container">
                <nav className="navbar  is-fixed-top" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <span className="navbar-item">
                            Facteurs Charge
                            </span>
                        <a className="navbar-item is-size-2" href="https://github.com/PETILLON-Sebastien/facteurs_charge" target="_blank">
                            <span className="icon has-text-white	is-hidden-desktop">
                                <i className="fab fa-github-square"></i>
                            </span>
                        </a>

                        <a className="navbar-item is-size-2" href="https://twitter.com/FacteursC">
                            <span className="icon has-text-white	is-hidden-desktop">
                                <i className="fab fa-twitter-square"></i>
                            </span>
                        </a>


                        <a role="button" className={`navbar-burger burger ${that.state.showMobileMenu ? "is-active" : ""}`} onClick={this.menuToggle} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" className={`navbar-menu ${that.state.showMobileMenu ? "is-active" : ""}`}>
                        <div className="navbar-start">

                        <span className="navbar-item">
                                <a href="#slide-map">
                                    <button class={`${that.state.activeTab == 'map' ? "is-active" : ""} is-dark button`}>
                                        Carte
                                </button>
                                </a>
                            </span>

                            <span className="navbar-item">
                                <a href="#slide-installations">
                                    <button class={`${that.state.activeTab == 'installations' ? "is-active" : ""} is-dark button`}>
                                        Installations
                                </button>
                                </a>
                            </span>

                            <span className="navbar-item">
                                <a href="#slide-load">
                                    <button class={`${that.state.activeTab == 'load' ? "is-active" : ""} is-dark button`}>
                                        Charge
                                </button>
                                </a>
                            </span>

                            <span className="navbar-item">
                                <span className="navbar-item-name">
                                    {this.props.label_region}
                                </span>
                            </span>

                            {/* <span className="navbar-item">
                                <span className="navbar-item-name">
                                    {this.props.label_date_heure}
                                </span>
                            </span> */}
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
        )
    }
}

export default Navbar;