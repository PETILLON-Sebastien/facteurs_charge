import React from "react";

function GithubLink() {
    return (
        <a
            className="navbar-item is-size-2 is-hidden-desktop"
            href="https://github.com/PETILLON-Sebastien/facteurs_charge"
            target="_blank"
        >
            <span className="icon has-text-white">
                <i className="fab fa-github-square"></i>
            </span>
        </a>
    );
}

export default GithubLink;