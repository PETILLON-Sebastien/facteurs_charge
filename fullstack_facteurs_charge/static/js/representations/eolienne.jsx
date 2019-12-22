import React from "react";


class Eolienne extends React.Component {

    constructor(props) {
        super(props);
    }

    pourcentageVersTemps(pourcentage) {
        var temps = 0;
        if(this.props.pourcentage > 1) {
            temps = 53 * Math.exp(-0.04 * this.props.pourcentage);
        }
        return temps;
    }

    render() {
        const rotationStyle = {
            'animationDuration': this.pourcentageVersTemps(this.props.pourcentage) + 's'
        };
        return (
            <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            viewBox="35 10 110 120"
            >
                <defs>    
                    <linearGradient id="eolienne-c">
                    <stop offset="0" stopColor="#c8c8c8" stopOpacity="1"></stop>
                    <stop offset="1" stopColor="#969696" stopOpacity="1"></stop>
                    </linearGradient>
                    <linearGradient id="eolienne-b">
                    <stop offset="0" stopColor="#c8c8c8" stopOpacity="1"></stop>
                    <stop offset="1" stopColor="#fafafa" stopOpacity="1"></stop>
                    </linearGradient>
                    <linearGradient
                    x1="85.524"
                    x2="92.496"
                    y1="77.386"
                    y2="77.386"
                    gradientUnits="userSpaceOnUse"
                    xlinkHref="#eolienne-a"
                    ></linearGradient>
                    <radialGradient
                    cx="90.115"
                    cy="77.849"
                    r="3.486"
                    fx="90.115"
                    fy="77.849"
                    gradientTransform="matrix(1.73663 .12093 -.50317 7.22608 -28.172 -532.261)"
                    gradientUnits="userSpaceOnUse"
                    xlinkHref="#eolienne-a"
                    ></radialGradient>
                    <radialGradient
                    id="eolienne-d"
                    cx="90.115"
                    cy="77.849"
                    r="3.486"
                    fx="90.115"
                    fy="77.849"
                    gradientTransform="matrix(-.7636 -1.56443 6.50955 -3.17728 -368.758 461.646)"
                    gradientUnits="userSpaceOnUse"
                    xlinkHref="#eolienne-b"
                    ></radialGradient>
                    <radialGradient
                    id="eolienne-e"
                    cx="90.115"
                    cy="77.849"
                    r="3.486"
                    fx="90.115"
                    fy="77.849"
                    gradientTransform="matrix(-.97304 1.4435 -6.00638 -4.0488 662.078 259.68)"
                    gradientUnits="userSpaceOnUse"
                    xlinkHref="#eolienne-b"
                    ></radialGradient>
                    <radialGradient
                    id="eolienne-h"
                    cx="79.659"
                    cy="63.05"
                    r="2.79"
                    fx="79.659"
                    fy="63.05"
                    gradientTransform="matrix(1.89643 0 0 1 -62.93 -.112)"
                    gradientUnits="userSpaceOnUse"
                    xlinkHref="#eolienne-b"
                    ></radialGradient>
                    <radialGradient
                    id="eolienne-g"
                    cx="88.425"
                    cy="93.465"
                    r="2.12"
                    fx="88.425"
                    fy="93.465"
                    gradientTransform="matrix(1 0 0 13.45755 0 -1164.347)"
                    gradientUnits="userSpaceOnUse"
                    xlinkHref="#eolienne-c"
                    ></radialGradient>
                    <radialGradient
                    id="eolienne-f"
                    cx="90.115"
                    cy="77.849"
                    r="3.486"
                    fx="90.115"
                    fy="77.849"
                    gradientTransform="matrix(1.73663 .12093 -.50317 7.22608 -28.172 -532.261)"
                    gradientUnits="userSpaceOnUse"
                    xlinkHref="#eolienne-b"
                    ></radialGradient>
            </defs>
            <g
                fillOpacity="1"
                stroke="#000"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeOpacity="1"
            >
                <path
                    fill="url(#eolienne-g)"
                    strokeDasharray="none"
                    strokeMiterlimit="4"
                    strokeWidth="0.165"
                    d="M87.952 65.173l-1.512 56.696h3.97l-1.702-56.79z"
                ></path>
                <g fillRule="nonzero" strokeWidth="0.103" className="pales" style={rotationStyle}>
                    <path
                        fill="url(#eolienne-d)"
                        d="M44.497 87.902c11.782-4.69 20.881-11.045 33.274-15.41.426-.103 11.066-8.439 10.756-9.112-.582-1.26-2.28.41-7.7 3.186-7.807 3.999-36.47 21.125-36.33 21.336z"
                    ></path>
                    <path
                        fill="url(#eolienne-e)"
                        d="M131.779 88.662c-9.952-7.859-20.006-12.561-29.983-21.111-.302-.317-12.84-5.365-13.269-4.759-.8 1.134 1.494 1.769 6.61 5.075 7.366 4.762 36.53 21.022 36.642 20.795z"
                    ></path>
                    <path
                        fill="url(#eolienne-f)"
                        d="M88.873 12.5c-1.83 12.548-.876 23.606-3.292 36.521-.123.42 1.775 13.803 2.514 13.87 1.382.127.784-2.177 1.09-8.26.441-8.761-.06-42.147-.312-42.131z"
                    ></path>
                </g>
            </g>
            <circle
                cx="88.332"
                cy="63.047"
                r="2.74"
                fill="url(#eolienne-h)"
                fillOpacity="1"
                stroke="#000"
                strokeDasharray="none"
                strokeMiterlimit="4"
                strokeOpacity="1"
                strokeWidth="0.1"
                opacity="1"
            ></circle>
            </svg>
        );
    }
}

export default Eolienne;
