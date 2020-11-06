

import React from "react";

function SlideNavLink({ slideName, setCurrentSlide, slideAnchor }) {
    <span className="navbar-item">
        <a href="#slide-map">
            <button
                className={`${this.state.activeTab == slideAnchor ? "is-success" : ""
                    } is-primary button is-fullwidth`}
                onClick={() => setCurrentSlide(slideAnchor)}
            >
                <span className="icon">
                    <i className="fas fa-map-marker-alt"></i>
                </span>
                <span>{slideName}</span>
            </button>
        </a>
    </span>
}

export default SlideNavLink;
