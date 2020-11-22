import React, { Fragment, useState } from "react";
import Logo from "./Logo";
import GithubLink from "./GithubLink";
import Twitter from "./Twitter";
import Burger from "./Burger";
import SlideLink from "./SlideNavLink";
import CurrentLocationButton from "./CurrentLocationButton";
import CurrentDateButton from "./CurrentDateButton";

function Nav({ setCurrentSlide, setSelectedDate, setSelectedZone, currentDate, currentZone }) {

    const [inputZone, setInputZone] = useState("");
    const [isMobileMenuShown, setShowMenu] = useState(false);
    const [showLocationSelection, setShowLocationSelection] = useState(false);
    const [showDateSelection, setShowDateSelection] = useState(false);

    const currentDatesFrom = currentDate.from;
    const currentDatesTo = currentDate.to;
    const currentZoneName = currentZone.name;


    const changeZoneHandler = (e) => {
        setInputZone(e.target.value);
    }

    const changeZone = () => {
        setSelectedZone(inputZone);
    }

    // const setCurrentSlide = (slideAnchor) => {
    //     console.log(`Goto slideAnchor`);
    // }

    return (

        <React.Fragment>
            <div className="container">
                <nav
                    className="navbar is-fixed-top"
                    role="navigation"
                    aria-label="main navigation"
                >
                    <div className="navbar-brand">
                        {/* <Logo />
                        <GithubLink touchOrDesktop={"touch"} />
                        <Twitter touchOrDesktop={"touch"} />
                        <Burger isMobileMenuShown={isMobileMenuShown} setShowMenu={setShowMenu} />
                        <SlideLink slideName="Carte" slideAnchor="map" setCurrentSlide={setCurrentSlide} fasLogo={"fa-map-marker-alt"} />
                        <SlideLink slideName="Installations" slideAnchor="installations" setCurrentSlide={setCurrentSlide} fasLogo={"fa-solar-panel"} />
                        <SlideLink slideName="Charge" slideAnchor="load" setCurrentSlide={setCurrentSlide} fasLogo={"fa-percent"} /> */}
                        <span className="navbar-item">
                            <CurrentLocationButton
                                setSelectedZone={setSelectedZone}
                                currentZoneName={currentZoneName}
                            />
                        </span>
                        {/* <CurrentDateButton setShowDateSelection={setShowDateSelection} currentDatesFrom={currentDatesFrom} currentDatesTo={currentDatesTo} /> */}

                        {/* <div className="navbar-end">
                            <GithubLink touchOrDesktop={"desktop"} />
                            <Twitter touchOrDesktop={"desktop"} />
                        </div> */}

                        {/* <h1>Nav</h1>
            <input onChange={changeZoneHandler} type="text"/>
            <button onClick={changeZone}>CHANGE ZONE</button> */}
                    </div>
                </nav>
            </div>
        </React.Fragment>
    );
};

export default Nav;