import React from "react";

function Twitter({ showMobileMenu, setMenuToggle }) {
    return (
        <a
            role="button"
            className={`navbar-burger burger ${showMobileMenu ? "is-active" : ""
                }`}
            onClick={setMenuToggle}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
        >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    );
}

export default Twitter;

