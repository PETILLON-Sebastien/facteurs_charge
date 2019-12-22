import React from "react";

class Bioenergies extends React.Component {

    constructor(props) {
        super(props);
    }

    pourcentageVersTemps(pourcentage) {
        var temps = 0;
        if(pourcentage > 1) {
            temps = 3 * Math.exp(-0.02 * pourcentage);
        }
        return temps;
    }
    pourcentageVersOpacite(pourcentage) {
        var opacite = 0;
        if(pourcentage > 1) {
            opacite = 0.24 * Math.log(pourcentage) - 0.15;
        }
        return opacite;
    }

    render() {
        const translationStyle = {
            'animationDuration': this.pourcentageVersTemps(this.props.pourcentage) + 's'
        };
        const opacite = this.pourcentageVersOpacite(this.props.pourcentage);

        return (
            <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            viewBox="0 0 95 170"
          >
            <defs>
              <linearGradient id="bioenergies-fe">
                <stop offset="0" stopColor="#1b843c" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#53b900" stopOpacity="1"></stop>
              </linearGradient>
              <linearGradient
                id="bioenergies-fe"
                x1="40.104"
                x2="54.045"
                y1="72.868"
                y2="87.136"
                gradientTransform="matrix(.85478 0 0 .88597 5.71 13.568)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#bioenergies-fe"
              ></linearGradient>
              <linearGradient id="bioenergies-c">
                <stop offset="0" stopColor="#323232" stopOpacity="0.972"></stop>
                <stop offset="1" stopColor="#000" stopOpacity="1"></stop>
              </linearGradient>
              <linearGradient id="bioenergies-b">
                <stop offset="0" stopColor="#1597aa" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#152eaa" stopOpacity="1"></stop>
              </linearGradient>
              <linearGradient id="bioenergies-d">
                <stop offset="0" stopColor="#aaaab4" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#787878" stopOpacity="1"></stop>
              </linearGradient>
              <linearGradient id="bioenergies-a">
                <stop offset="0" stopColor="#bebebe" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#969696" stopOpacity="0.976"></stop>
              </linearGradient>
              <linearGradient
                id="bioenergies-f"
                x1="256.083"
                x2="415.352"
                y1="506.753"
                y2="506.753"
                gradientTransform="matrix(1 0 0 .86754 -72.731 -42.627)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#bioenergies-a"
              ></linearGradient>
              <radialGradient
                id="bioenergies-g"
                cx="47.746"
                cy="102.284"
                r="10.826"
                fx="47.746"
                fy="102.284"
                gradientTransform="matrix(2.7252 -.2507 .1448 1.54605 -97.552 -53.338)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#bioenergies-b"
              ></radialGradient>
              <radialGradient
                id="bioenergies-h"
                cx="20.34"
                cy="120.767"
                r="7.747"
                fx="20.34"
                fy="120.767"
                gradientTransform="matrix(-1.64089 .14081 .16181 1.88566 53.188 -112.294)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#bioenergies-c"
              ></radialGradient>
              <linearGradient
                id="bioenergies-e"
                x1="37.114"
                x2="97.503"
                y1="64.317"
                y2="64.259"
                gradientTransform="matrix(1 0 0 .78638 -19.244 -6.144)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#bioenergies-d"
              ></linearGradient>
              <radialGradient
                id="bioenergies-l"
                cx="49.156"
                cy="89.77"
                r="4.871"
                fx="49.156"
                fy="89.77"
                gradientTransform="matrix(.9806 0 0 3.30622 .282 -197.942)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#bioenergies-r"
              ></radialGradient>
              <radialGradient
                id="bioenergies-i"
                cx="49.156"
                cy="89.77"
                r="4.871"
                fx="49.156"
                fy="89.77"
                gradientTransform="rotate(-45 -190.594 197.488) scale(.9806 3.30622)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#bioenergies-r"
              ></radialGradient>
              <radialGradient
                id="bioenergies-j"
                cx="49.156"
                cy="89.77"
                r="4.871"
                fx="49.156"
                fy="89.77"
                gradientTransform="matrix(0 -.9806 3.30622 0 -248.281 147.07)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#bioenergies-r"
              ></radialGradient>
            </defs>
            <path
              fill="url(#bioenergies-e)"
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
              fill="url(#bioenergies-f)"
              fillOpacity="1"
              stroke="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeOpacity="1"
              strokeWidth="0.931"
              d="M295.781 167.768a114.185 9.296 0 01-.004.04l.01-.04h-.006zm-228.238.494s21.734 84.005 17.217 158.13C80.243 400.519 19.203 607.23 19.203 607.23c-6.06 12.127 72.574 19.004 162.719 19.004 90.144 0 163.221-8.63 160.633-22.285 0 0-59.016-203.771-63.473-277.379-4.312-71.208 15.184-152.537 16.47-157.81a114.185 9.296 0 01-108.82 8.64 114.185 9.296 0 01-119.095-8.877 114.185 9.296 0 01.02-.261h-.114z"
              transform="scale(.26458)"
            ></path>
            <g strokeOpacity="1" transform="translate(-2.646 -21.167)">
              <path
                fill="#646464"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeWidth="0.284"
                d="M42.948 123.651s-.029 19.11.614 20.195c.529.894 13.29.654 13.796-.326.405-.786.54-19.859.54-19.859z"
              ></path>
              <path
                fill="#323232"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeWidth="1"
                d="M186.6 455.398l-.112 5.26-28.178 1.283-3.83 5.434 7.841-.03 56.503.037 7.286.083-3.414-5.85-27.91-1.025-.062-5.192zm1.337 1.163h5.357l.118 4.04-5.557.045z"
                transform="scale(.26458)"
              ></path>
              <path
                fill="#323232"
                fillRule="nonzero"
                strokeDasharray="none"
                strokeMiterlimit="4"
                strokeWidth="0.624"
                d="M46.255 127.383H47.956V139.289H46.255z"
              ></path>
              <path
                fill="#323232"
                fillRule="nonzero"
                strokeDasharray="none"
                strokeMiterlimit="4"
                strokeWidth="0.624"
                d="M49.43 127.383H51.131V139.289H49.43z"
              ></path>
              <path
                fill="#323232"
                fillRule="nonzero"
                strokeDasharray="none"
                strokeMiterlimit="4"
                strokeWidth="0.624"
                d="M52.605 127.383H54.306V139.289H52.605z"
              ></path>
            </g>
            <path
              fill="url(#bioenergies-fe)"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeOpacity="1"
              strokeWidth="0.23"
              d="M44.562 81.72s14.054 6.363 7.834 10.967c-6.219 4.605-13.085-2.763-13.57-15.237-.484-12.474-1.05-2.846 4.524.168 5.573 3.014 9.45 2.009 12.197 4.94 4.855 5.18-1.293 9.627-1.293 9.627s5.089-5.526-9.692-10.465z"
            ></path>

          </svg>
        );
    }
}

export default Bioenergies;
