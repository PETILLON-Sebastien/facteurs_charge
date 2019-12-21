import React from "react";

class Fossile extends React.Component {

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
            'animation-duration': this.pourcentageVersTemps(this.props.pourcentage) + 's'
        };
        const opacite = this.pourcentageVersOpacite(this.props.pourcentage);

        return (
            <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            viewBox="0 0 90 170"
          >
            <defs>
              <linearGradient id="fossile-c">
                <stop offset="0" stopColor="#323232" stopOpacity="0.972"></stop>
                <stop offset="1" stopColor="#000" stopOpacity="1"></stop>
              </linearGradient>
              <linearGradient id="fossile-b">
                <stop offset="0" stopColor="#1597aa" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#152eaa" stopOpacity="1"></stop>
              </linearGradient>
              <linearGradient id="fossile-d">
                <stop offset="0" stopColor="#aaaab4" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#787878" stopOpacity="1"></stop>
              </linearGradient>
              <linearGradient id="fossile-a">
                <stop offset="0" stopColor="#bebebe" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#969696" stopOpacity="0.976"></stop>
              </linearGradient>
              <linearGradient
                id="fossile-f"
                x1="256.083"
                x2="415.352"
                y1="506.753"
                y2="506.753"
                gradientTransform="matrix(1 0 0 .86754 -72.731 -42.627)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#fossile-a"
              ></linearGradient>
              <radialGradient
                id="fossile-g"
                cx="47.746"
                cy="102.284"
                r="10.826"
                fx="47.746"
                fy="102.284"
                gradientTransform="matrix(2.7252 -.2507 .1448 1.54605 -97.552 -53.338)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#fossile-b"
              ></radialGradient>
              <radialGradient
                id="fossile-h"
                cx="20.34"
                cy="120.767"
                r="7.747"
                fx="20.34"
                fy="120.767"
                gradientTransform="matrix(-1.64089 .14081 .16181 1.88566 53.188 -112.294)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#fossile-c"
              ></radialGradient>
              <linearGradient
                id="fossile-e"
                x1="37.114"
                x2="97.503"
                y1="64.317"
                y2="64.259"
                gradientTransform="matrix(1 0 0 .78638 -19.244 -6.144)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#fossile-d"
              ></linearGradient>
            </defs>
            <path
              fill="url(#fossile-e)"
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
              fill="url(#fossile-f)"
              fillOpacity="1"
              stroke="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeOpacity="1"
              strokeWidth="0.931"
              d="M295.781 167.768a114.185 9.296 0 01-.004.04l.01-.04h-.006zm-228.238.494s21.734 84.005 17.217 158.13C80.243 400.519 19.203 607.23 19.203 607.23c-6.06 12.127 72.574 19.004 162.719 19.004 90.144 0 163.221-8.63 160.633-22.285 0 0-59.016-203.771-63.473-277.379-4.312-71.208 15.184-152.537 16.47-157.81a114.185 9.296 0 01-108.82 8.64 114.185 9.296 0 01-119.095-8.877 114.185 9.296 0 01.02-.261h-.114z"
              transform="scale(.26458)"
            ></path>
            <path
              fill="url(#fossile-g)"
              fillOpacity="1"
              stroke="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeOpacity="1"
              strokeWidth="0.198"
              d="M45.747 96.306c-3.422-1.995-5.782-3.403-5.882-8.59-.101-5.187 4.776-6.929 6.642-15.012 0 0 9.762 4.688 9.662 13.765-.1 9.077-6.34 9.829-6.34 9.829s7.244-5.145-.605-14.667c0 0 2.462 4.566-1.669 7.37 0 0 .08-2.412-2.02-2.903 0 0 1.421 1.864-.61 4.264-2.276 2.691.822 5.944.822 5.944z"
            ></path>
            <g
              stroke="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeOpacity="1"
            >
              <path
                fill="url(#fossile-h)"
                fillOpacity="1"
                strokeWidth="0.198"
                d="M37.1 125.802c3.352-.081 6.4-3.157 5.669-8.293-.635-4.452-4.405-5.737-4.4-13.888 0 0-7.58 7.321-8.125 13.966-.547 6.645 3.504 8.296 6.856 8.215z"
                transform="translate(-1.89 -4.63)"
              ></path>
              <path
                fill="#fff"
                fillOpacity="0.973"
                strokeWidth="0.265"
                d="M32.857 116.066s-1.133 4.168-.292 5.116c.841.949 1.044.063.72-1.513-.325-1.577-.428-3.603-.428-3.603z"
                transform="translate(-1.89 -4.63)"
              ></path>
            </g>
            <g fillOpacity="1" stroke="none" strokeOpacity="1">
              <path
                fill="#646464"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeWidth="0.265"
                d="M52.728 110.327l2.976 7.607h15.45l2.457-7.56z"
                transform="matrix(1.04525 0 0 1.27406 -5.977 -31.626) translate(-.542 -.816)"
              ></path>
              <path
                fill="#000004"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeWidth="0.265"
                d="M55.931 110.327s-.614-.992.047-1.465c.662-.472 1.37.048 1.512-.33.142-.378.33-1.182.756-1.229.425-.047 1.56-1.417 2.551-1.37.993.047 1.796.85 2.221.992.425.142 1.465-1.181 2.315-1.181.85 0 1.465.189 1.512.567.047.378.709.283.945.614.236.33.85.142 1.181.85.33.71.709.568.709.568s.898-.473 1.087.425c.189.898.945.661.85 1.606l-15.686-.047z"
                transform="matrix(1.04525 0 0 1.27406 -5.977 -31.626) translate(-.542 -.816)"
              ></path>
              <path
                fill="#323232"
                fillRule="nonzero"
                strokeDasharray="none"
                strokeMiterlimit="4"
                strokeWidth="0.887"
                d="M62.95 118.278a3.337 2.82 0 01-3.188 2.942 3.337 2.82 0 01-3.48-2.694 3.337 2.82 0 013.187-2.942 3.337 2.82 0 013.48 2.694l-3.333.124zM70.516 118.257a3.337 2.82 0 01-3.188 2.942 3.337 2.82 0 01-3.48-2.694 3.337 2.82 0 013.187-2.942 3.337 2.82 0 013.48 2.694l-3.333.124z"
                transform="matrix(1.04525 0 0 1.27406 -5.977 -31.626) translate(-.542 -.816)"
              ></path>
            </g>
          </svg>
        );
    }
}

export default Fossile;
