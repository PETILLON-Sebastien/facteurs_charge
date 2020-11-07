import React from "react";

function Twitter({ touchOrDesktop }) {
    return (
        <a
            className={`navbar-item is-size-2 is-hidden-${touchOrDesktop === "touch" ? "desktop" : "touch"}`}
            href="https://twitter.com/FacteursC"
        >
            <span className="icon has-text-white">
                <i className="fab fa-twitter-square"></i>
            </span>
        </a>
    );
}

export default Twitter;