import React, { Fragment, useState } from "react";
import Logo from "./Logo";
import GithubLink from "./GithubLink";
import Twitter from "./Twitter";
import Burger from "./Burger";
import SlideLink from "./SlideNavLink";
import CurrentLocationButton from "./CurrentLocationButton";
import CurrentDateButton from "./CurrentDateButton";

function Nav({ setCurrentSlide, setCurrentDate, setCurrentZone, currentDates, currentZone }) {

    const [inputZone, setInputZone] = useState("");
    const [isMobileMenuShown, setShowMenu] = useState(false);
    const [showLocationSelection, setShowLocationSelection] = useState(false);
    const [showDateSelection, setShowDateSelection] = useState(false);

    const currentDatesFrom = currentDates.from;
    const currentDatesTo = currentDates.to;
    const currentZoneName = currentZone.label;

    const menuToggle = () => {
        setShowMenu(!isMobileMenuShown);
    }


    // const setCurrentSlide = (slideAnchor) => {
    //     console.log(`Goto slideAnchor`);
    // }

    return (

        <React.Fragment>
            <header>
                <div className="container">
                    <nav
                        className="navbar is-fixed-top"
                        role="navigation"
                        aria-label="main navigation"
                    >
                        <div className="navbar-brand">
                            <Logo />
                            <GithubLink touchOrDesktop={"touch"} />
                            <Twitter touchOrDesktop={"touch"} />
                            <Burger isMobileMenuShown={isMobileMenuShown} setShowMenu={menuToggle} />
                        </div>
                        <div className={`navbar-menu ${isMobileMenuShown ? "is-active" : ""}`} id="navMenu">
                            <div className="navbar-start">
                                <SlideLink slideName="Carte" slideAnchor="map" setCurrentSlide={setCurrentSlide} fasLogo={"fa-map-marker-alt"} />
                                <SlideLink slideName="Installations" slideAnchor="installations" setCurrentSlide={setCurrentSlide} fasLogo={"fa-solar-panel"} />
                                <SlideLink slideName="Charge" slideAnchor="load" setCurrentSlide={setCurrentSlide} fasLogo={"fa-percent"} />
                                <span className="navbar-item">
                                    <CurrentLocationButton
                                        setCurrentZone={setCurrentZone}
                                        currentZoneName={currentZoneName}
                                    />
                                </span>
                                <span className="navbar-item">
                                    <CurrentDateButton
                                        currentDatesFrom={currentDatesFrom}
                                        currentDatesTo={currentDatesTo}
                                        setCurrentDate={setCurrentDate} />
                                </span>

                            </div>
                            <div className="navbar-end">
                                <GithubLink touchOrDesktop={"desktop"} />
                                <Twitter touchOrDesktop={"desktop"} />
                            </div>

                            {/* <h1>Nav</h1>
            <input onChange={changeZoneHandler} type="text"/>
            <button onClick={changeZone}>CHANGE ZONE</button> */}
                        </div>
                    </nav>
                </div>
            </header>

        </React.Fragment>
    );
};

export default Nav;