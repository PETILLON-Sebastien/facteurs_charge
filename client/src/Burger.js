import React from "react";

function Twitter({ isMobileMenuShown, setShowMenu }) {
    return (
        <button
            // role="button"
            className={`button is-dark navbar-burger burger ${isMobileMenuShown ? "is-active" : ""
                }`}
            onClick={setShowMenu}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            style={{ marginTop: "1rem" }}
        >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </button>
    );
}

export default Twitter;

