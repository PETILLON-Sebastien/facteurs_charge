import React from "react";

class NuclearPowerPlant extends React.Component {

    constructor(props) {
        super(props);
    }

    pourcentageVersTemps() {
        var temps = 0;
        if(this.props.pourcentage > 1) {
            temps = 3 * Math.exp(-0.02 * this.props.pourcentage);
        }
        return temps;
    }
    pourcentageVersOpacite() {
        var opacite = 0;
        if(this.props.pourcentage > 1) {
            opacite = 0.24 * Math.log(this.props.pourcentage) - 0.15;
        }
        return opacite;
    }

    render() {
        const translationStyle = {
            'animationDuration': this.pourcentageVersTemps() + 's'
        };
        const opacite = this.pourcentageVersOpacite();

        return (
            <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            viewBox="0 0 95 170"
          >
            <defs>
              <linearGradient id="nucleaire-r">
                <stop offset="0" stopColor="#000" stopOpacity="0.009"></stop>
                <stop offset="0.927" stopColor="#000" stopOpacity="0"></stop>
                <stop offset="0.94" stopColor="#000" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#000" stopOpacity="0.995"></stop>
              </linearGradient>
              <linearGradient id="nucleaire-c">
                <stop offset="0" stopColor="#323232" stopOpacity="0.972"></stop>
                <stop offset="1" stopColor="#000" stopOpacity="1"></stop>
              </linearGradient>
              <linearGradient id="nucleaire-b">
                <stop offset="0" stopColor="#1597aa" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#152eaa" stopOpacity="1"></stop>
              </linearGradient>
              <linearGradient id="nucleaire-d">
                <stop offset="0" stopColor="#aaaab4" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#787878" stopOpacity="1"></stop>
              </linearGradient>
              <linearGradient id="nucleaire-a">
                <stop offset="0" stopColor="#bebebe" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#969696" stopOpacity="0.976"></stop>
              </linearGradient>
              <linearGradient
                id="nucleaire-f"
                x1="256.083"
                x2="415.352"
                y1="506.753"
                y2="506.753"
                gradientTransform="matrix(1 0 0 .86754 -72.731 -42.627)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#nucleaire-a"
              ></linearGradient>
              <radialGradient
                id="nucleaire-g"
                cx="47.746"
                cy="102.284"
                r="10.826"
                fx="47.746"
                fy="102.284"
                gradientTransform="matrix(2.7252 -.2507 .1448 1.54605 -97.552 -53.338)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#nucleaire-b"
              ></radialGradient>
              <radialGradient
                id="nucleaire-h"
                cx="20.34"
                cy="120.767"
                r="7.747"
                fx="20.34"
                fy="120.767"
                gradientTransform="matrix(-1.64089 .14081 .16181 1.88566 53.188 -112.294)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#nucleaire-c"
              ></radialGradient>
              <linearGradient
                id="nucleaire-e"
                x1="37.114"
                x2="97.503"
                y1="64.317"
                y2="64.259"
                gradientTransform="matrix(1 0 0 .78638 -19.244 -6.144)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#nucleaire-d"
              ></linearGradient>
              <radialGradient
                id="nucleaire-l"
                cx="49.156"
                cy="89.77"
                r="4.871"
                fx="49.156"
                fy="89.77"
                gradientTransform="matrix(.9806 0 0 3.30622 .282 -197.942)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#nucleaire-r"
              ></radialGradient>
              <radialGradient
                id="nucleaire-i"
                cx="49.156"
                cy="89.77"
                r="4.871"
                fx="49.156"
                fy="89.77"
                gradientTransform="rotate(-45 -190.594 197.488) scale(.9806 3.30622)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#nucleaire-r"
              ></radialGradient>
              <radialGradient
                id="nucleaire-j"
                cx="49.156"
                cy="89.77"
                r="4.871"
                fx="49.156"
                fy="89.77"
                gradientTransform="matrix(0 -.9806 3.30622 0 -248.281 147.07)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#nucleaire-r"
              ></radialGradient>
              <radialGradient
                id="nucleaire-k"
                cx="49.156"
                cy="89.77"
                r="4.871"
                fx="49.156"
                fy="89.77"
                gradientTransform="rotate(-135 7.367 197.768) scale(.9806 3.30622)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#nucleaire-r"
              ></radialGradient>
            </defs>
            <path
              fill="url(#nucleaire-e)"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              strokeDasharray="none"
              strokeMiterlimit="4"
              strokeOpacity="1"
              strokeWidth="1.54"
              d="M78.259 44.389a30.211 2.46 0 01-28.853 2.565 30.211 2.46 0 01-31.511-2.35 30.211 2.46 0 0128.852-2.565 30.211 2.46 0 0131.512 2.35l-30.182.108z"
            ></path>
            <path
              style={translationStyle}
              fill="#fff"
              fillOpacity={opacite}
              stroke="none"
              strokeDasharray="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="4"
              strokeOpacity="0.588"
              strokeWidth="0.225"
              className="fumee"
              d="M24.035-30.014c.167 12.409 10.971 16.631 10.432 23.655C33.927.665 23.45 2.693 23.554 8.158c.167 12.409 10.97 16.631 10.432 23.655-.54 7.024-11.017 9.052-10.913 14.517.167 12.409 10.97 16.631 10.431 23.655-.539 7.023-11.016 9.052-10.912 14.517l43.532.086c.615-4.517 6.138-7.22 6.388-15.95S66.5 53.823 66.605 46.416c.615-4.518 6.138-7.222 6.388-15.951.25-8.73-6.012-14.814-5.907-22.221.615-4.518 6.138-7.222 6.388-15.951.25-8.73-6.011-14.814-5.906-22.222z"
            ></path>
            <path
              fill="url(#nucleaire-f)"
              fillOpacity="1"
              stroke="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeOpacity="1"
              strokeWidth="0.931"
              d="M295.781 167.768a114.185 9.296 0 01-.004.04l.01-.04h-.006zm-228.238.494s21.734 84.005 17.217 158.13C80.243 400.519 19.203 607.23 19.203 607.23c-6.06 12.127 72.574 19.004 162.719 19.004 90.144 0 163.221-8.63 160.633-22.285 0 0-59.016-203.771-63.473-277.379-4.312-71.208 15.184-152.537 16.47-157.81a114.185 9.296 0 01-108.82 8.64 114.185 9.296 0 01-119.095-8.877 114.185 9.296 0 01.02-.261h-.114z"
              transform="scale(.26458)"
            ></path>

            <g strokeDasharray="none" strokeMiterlimit="4" strokeOpacity="1">
              <g strokeLinecap="butt" strokeLinejoin="miter" strokeWidth="0.57">
                <path
                  fill="url(#nucleaire-i)"
                  d="M37.737 92.742c2.856 5.872 11.102 13.75 16.792 16.763 5.327 2.82 7.376.661 4.673-4.58-2.986-5.788-10.491-13.31-16.792-16.762-5.334-2.923-7.17-.553-4.673 4.579z"
                  transform="translate(-.54 -8.285)"
                ></path>
                <path
                  fill="url(#nucleaire-j)"
                  d="M36.594 102.143c6.173 2.132 17.574 1.873 23.727-.02 5.761-1.772 5.684-4.748.067-6.543-6.205-1.982-16.83-1.993-23.727.02-5.838 1.706-5.46 4.68-.067 6.543z"
                  transform="translate(-.54 -8.285)"
                ></path>
                <path
                  fill="url(#nucleaire-k)"
                  d="M42.403 109.615c5.872-2.856 13.75-11.102 16.763-16.792 2.82-5.327.661-7.376-4.58-4.673-5.788 2.986-13.31 10.491-16.762 16.792-2.923 5.334-.553 7.17 4.579 4.673z"
                  transform="translate(-.54 -8.285)"
                ></path>
                <path
                  fill="url(#nucleaire-l)"
                  d="M45.209 86.933c-2.132 6.173-1.872 17.574.02 23.727 1.773 5.762 4.749 5.684 6.543.067 1.982-6.204 1.993-16.83-.02-23.727-1.706-5.838-4.68-5.46-6.543-.066z"
                  transform="translate(-.54 -8.285)"
                ></path>
              </g>
              <path
                fill="#000"
                fillRule="nonzero"
                strokeWidth="0.575"
                d="M50.335 98.669a1.77 1.77 0 01-1.691 1.846 1.77 1.77 0 01-1.847-1.69 1.77 1.77 0 011.69-1.848 1.77 1.77 0 011.848 1.691l-1.77.078z"
                transform="translate(-.54 -8.285)"
              ></path>
            </g>
          </svg>
        );
    }
}

export default NuclearPowerPlant;
