import React from "react";

function Logo() {
    return (
        <span className="navbar-item">
            <img
                style={{ maxHeight: "3.5rem", width: "3.5rem" }}
                src="./images/logo.png"
                width="64"
                height="64"
            />
        </span>
    );
}

export default Logo;