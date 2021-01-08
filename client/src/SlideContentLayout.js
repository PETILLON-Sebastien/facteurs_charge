import React from 'react';

const SlideContentLayout = ({ children, anchor }) => {
    const [title, text, left, right] = children;
    return (
        <>
            <div className="section is-medium" id={anchor} style={{ "minHeight": "100vh" }}>
                <div className="columns">
                    <div className="column is-full">{title}</div>
                </div>
                <div className="columns" style={{ "marginBottom": "2rem" }}>
                    <div className="column is-full has-text-centered">
                        {text}
                    </div>
                </div>
                <div className="columns is-multiline is-centered">
                    <div className="column is-4-widescreen is-4-full-hd is-4-desktop is-12-tablet is-12-mobile">
                        <div className="columns is-multiline is-mobile is-vcentered">
                            {left}
                        </div>
                    </div>

                    <div
                        className="column is-6-widescreen is-6-full-hd is-6-desktop is-12-tablet is-12-mobile has-text-centered"
                        style={{ marginTop: "2rem" }}
                    >
                        {right}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SlideContentLayout;