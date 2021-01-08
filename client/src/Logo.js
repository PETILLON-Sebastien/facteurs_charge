import React from "react";
import logo from './images/logo.png'; // Tell Webpack this JS file uses this image

function Logo({ isSmall }) {

    let logoContent;

    if (isSmall) {
        logoContent = <img
            style={{ maxHeight: "3.75rem", width: "3.75rem" }}
            src={logo}
            width="128"
            height="128"
            alt='Facteur Charge logo'
        />;
    } else {
        logoContent = <figure className="image is-128x128">
            <img src={logo} alt='Facteur Charge logo' />
        </figure>
    }

    return (
        logoContent
    );
}

export default Logo;