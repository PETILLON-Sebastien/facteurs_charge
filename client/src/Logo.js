import React from "react";
import logo from './images/logo.png'; // Tell Webpack this JS file uses this image

function Logo() {
    return (
        <span className="navbar-item">
            <img
                style={{ maxHeight: "3.75rem", width: "3.75rem" }}
                src={logo}
                width="128"
                height="128"
            />
        </span>
    );
}

export default Logo;