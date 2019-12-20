import React from "react";

class Barrage extends React.Component {

    constructor(props) {
        super(props);
    }

    pourcentageVersLargeur(pourcentage) {
        return pourcentage / 100;
    }

    render() {
        const largeur = this.pourcentageVersLargeur(this.props.pourcentage);

        return (
            <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="210mm"
            height="297mm"
            version="1.1"
            viewBox="0 0 210 297"
            >
            <defs>
                <linearGradient id="barrage-c">
                <stop offset="0" stopColor="#9edbff" stopOpacity="1"></stop>
                <stop offset="0.582" stopColor="#ccf1ff" stopOpacity="0.972"></stop>
                <stop offset="1" stopColor="#9edbf8" stopOpacity="0"></stop>
                </linearGradient>
                <linearGradient id="barrage-b">
                <stop offset="0" stopColor="#9edbff" stopOpacity="1"></stop>
                <stop offset="0.954" stopColor="#ccf1ff" stopOpacity="0.972"></stop>
                <stop offset="1" stopColor="#9edbf8" stopOpacity="0"></stop>
                </linearGradient>
                <linearGradient id="barrage-a">
                <stop offset="0" stopColor="#000" stopOpacity="1"></stop>
                <stop offset="0.857" stopColor="#323232" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#969696" stopOpacity="1"></stop>
                </linearGradient>
                <radialGradient
                id="barrage-d"
                cx="31.443"
                cy="19.943"
                r="6.26"
                fx="31.443"
                fy="19.943"
                gradientTransform="matrix(.72972 0 0 .63824 15.572 13.772)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#barrage-a"
                ></radialGradient>
                <radialGradient
                id="barrage-h"
                cx="29.403"
                cy="54.322"
                r="10.089"
                fx="29.403"
                fy="54.322"
                gradientTransform="matrix(.00327 -4.73457 .9333 .00203 -12.047 209.381)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#barrage-b"
                ></radialGradient>
                <radialGradient
                id="barrage-i"
                cx="29.134"
                cy="51.216"
                r="10.089"
                fx="29.134"
                fy="51.216"
                gradientTransform="matrix(.00313 -4.73457 .89394 .00203 16.413 209.381)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#barrage-b"
                ></radialGradient>
                <linearGradient
                id="barrage-e"
                x1="57.656"
                x2="57.591"
                y1="76.099"
                y2="82.129"
                gradientTransform="translate(5.267 -1.254)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#barrage-c"
                ></linearGradient>
                <radialGradient
                id="barrage-f"
                cx="31.443"
                cy="19.943"
                r="6.26"
                fx="31.443"
                fy="19.943"
                gradientTransform="matrix(.72972 0 0 .63824 39.384 13.772)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#barrage-a"
                ></radialGradient>
                <radialGradient
                id="barrage-g"
                cx="31.443"
                cy="19.943"
                r="6.26"
                fx="31.443"
                fy="19.943"
                gradientTransform="matrix(.72972 0 0 .63824 63.197 13.772)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#barrage-a"
                ></radialGradient>
                <radialGradient
                id="barrage-j"
                cx="29.403"
                cy="54.322"
                r="10.089"
                fx="29.403"
                fy="54.322"
                gradientTransform="matrix(-.00327 -4.73457 -.9333 .00203 137.518 209.381)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#barrage-b"
                ></radialGradient>
            </defs>
            <g fillOpacity="1" stroke="none" strokeOpacity="1">
                <path
                fill="#787882"
                fillRule="nonzero"
                strokeDasharray="none"
                strokeMiterlimit="4"
                strokeWidth="1.634"
                d="M23.382 16.198H101.32900000000001V74.807H23.382z"
                ></path>
                <ellipse
                cx="38.516"
                cy="26.501"
                fill="url(#barrage-d)"
                fillRule="nonzero"
                strokeDasharray="none"
                strokeMiterlimit="4"
                strokeWidth="1.227"
                rx="4.568"
                ry="3.996"
                ></ellipse>
                <path
                fill="#9696a0"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeWidth="0.257"
                d="M23.382 19.506v55.301l-5.686 6.46-.134-68.822 5.88-6.543zM101.336 19.506l-.007 55.301 5.694 6.46.134-68.822-5.88-6.543z"
                ></path>
                <path
                fill="#787882"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeWidth="0.265"
                d="M17.562 12.445H10.88L7.54 81.268h10.156zM107.156 12.445h6.682l3.34 68.822h-10.155z"
                ></path>
                <path
                fill="#aaaab4"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeWidth="0.265"
                d="M10.88 12.446l6.682-.001 5.88-6.543-7.071.078zM113.838 12.446l-6.682-.001-5.88-6.543 7.072.078z"
                ></path>
                <path
                fill="#aaaab4"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeWidth="0.186"
                d="M23.382 16.198l.065-1.398h77.864l.018 1.398z"
                ></path>
                <path
                fill="url(#barrage-e)"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeWidth="0.265"
                d="M17.696 81.267l5.686-6.46h77.947l5.694 6.46z"
                ></path>
                <ellipse
                cx="62.329"
                cy="26.501"
                fill="url(#barrage-f)"
                fillRule="nonzero"
                strokeDasharray="none"
                strokeMiterlimit="4"
                strokeWidth="1.227"
                rx="4.568"
                ry="3.996"
                ></ellipse>
                <ellipse
                cx="86.141"
                cy="26.501"
                fill="url(#barrage-g)"
                fillRule="nonzero"
                strokeDasharray="none"
                strokeMiterlimit="4"
                strokeWidth="1.227"
                rx="4.568"
                ry="3.996"
                ></ellipse>
                <path
                fill="url(#barrage-h)"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeWidth="0.26"
                className="ecoulement-gauche"
                transform={'scale(' + largeur + ' 1)'}
                d="M28.228 28.343l-5.375 46.464 21.028.184-1.126-46.648z"
                ></path>
                <path
                fill="url(#barrage-i)"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeWidth="0.255"
                className="ecoulement-central"
                transform={'scale(' + largeur + ' 1)'}
                d="M54.988 28.343l-3.056 46.772 20.178-.124-3.207-46.648z"
                ></path>
                <path
                fill="url(#barrage-j)"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeWidth="0.26"
                className="ecoulement-droite"
                transform={'scale(' + largeur + ' 1)'}
                d="M97.244 28.343l5.375 46.464-21.029.184 1.127-46.648z"
                ></path>
            </g>
            </svg>
        );
    }
}
export default Barrage;
