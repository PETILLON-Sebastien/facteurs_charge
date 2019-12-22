import React from "react";

class PanneauSolaire extends React.Component {

    constructor(props) {
        super(props);
    }
    pourcentageVersPositionY(pourcentage) {
        if(pourcentage !== undefined) {
            return 50 - 2 * Math.exp(pourcentage / 35);
        }
        return 0;
    }
    pourcentageVersPositionX(pourcentage) {
        if(pourcentage !== undefined) {
            return 50 + 2 * Math.exp(pourcentage / 35);
        }
        return 0;
    }


    render() {
        var yPosition = this.pourcentageVersPositionY(this.props.pourcentage);
        var xPosition = this.pourcentageVersPositionX(this.props.pourcentage);
        return (
            <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            viewBox="0 0 95 60"
            >
            <defs>
                <linearGradient id="panneau-solaire-b">
                <stop offset="0" stopColor="#e6e6e6" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#9696aa" stopOpacity="1"></stop>
                </linearGradient>
                <linearGradient id="panneau-solaire-c">
                <stop offset="0" stopColor="#c8c8c8" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#646464" stopOpacity="1"></stop>
                </linearGradient>
                <linearGradient id="panneau-solaire-a">
                <stop offset="0" stopColor="#0024a1" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#002453" stopOpacity="1"></stop>
                </linearGradient>
                <linearGradient
                id="panneau-solaire-i"
                x1="19.698"
                x2="379.312"
                y1="18.928"
                y2="193.684"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-a"
                ></linearGradient>
                <linearGradient
                id="panneau-solaire-k"
                x1="19.698"
                x2="379.312"
                y1="18.928"
                y2="193.684"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-a"
                ></linearGradient>
                <linearGradient
                id="panneau-solaire-m"
                x1="19.698"
                x2="379.312"
                y1="18.928"
                y2="193.684"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-a"
                ></linearGradient>
                <linearGradient
                id="panneau-solaire-h"
                x1="19.698"
                x2="379.312"
                y1="18.928"
                y2="193.684"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-a"
                ></linearGradient>
                <linearGradient
                id="panneau-solaire-j"
                x1="19.698"
                x2="379.312"
                y1="18.928"
                y2="193.684"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-a"
                ></linearGradient>
                <linearGradient
                id="panneau-solaire-l"
                x1="19.698"
                x2="379.312"
                y1="18.928"
                y2="193.684"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-a"
                ></linearGradient>
                <linearGradient
                id="panneau-solaire-o"
                x1="19.698"
                x2="379.312"
                y1="18.928"
                y2="193.684"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-a"
                ></linearGradient>
                <linearGradient
                id="panneau-solaire-n"
                x1="19.698"
                x2="379.312"
                y1="18.928"
                y2="193.684"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-a"
                ></linearGradient>
                <linearGradient
                id="panneau-solaire-t"
                x1="19.698"
                x2="379.312"
                y1="18.928"
                y2="193.684"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-a"
                ></linearGradient>
                <linearGradient
                id="panneau-solaire-s"
                x1="19.698"
                x2="379.312"
                y1="18.928"
                y2="193.684"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-a"
                ></linearGradient>
                <linearGradient
                id="panneau-solaire-p"
                x1="19.698"
                x2="379.312"
                y1="18.928"
                y2="193.684"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-a"
                ></linearGradient>
                <linearGradient
                id="panneau-solaire-u"
                x1="19.698"
                x2="379.312"
                y1="18.928"
                y2="193.684"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-a"
                ></linearGradient>
                <linearGradient
                id="panneau-solaire-q"
                x1="19.698"
                x2="379.312"
                y1="18.928"
                y2="193.684"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-a"
                ></linearGradient>
                <linearGradient
                id="panneau-solaire-v"
                x1="19.698"
                x2="379.312"
                y1="18.928"
                y2="193.684"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-a"
                ></linearGradient>
                <linearGradient
                id="panneau-solaire-w"
                x1="19.698"
                x2="379.312"
                y1="18.928"
                y2="193.684"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-a"
                ></linearGradient>
                <linearGradient
                id="panneau-solaire-r"
                x1="19.698"
                x2="379.312"
                y1="18.928"
                y2="193.684"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-a"
                ></linearGradient>
                <linearGradient
                id="panneau-solaire-f"
                x1="48.667"
                x2="49.795"
                y1="-24.057"
                y2="1.256"
                gradientTransform="matrix(1.03995 0 0 1.05468 -1.266 -1.67)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-b"
                ></linearGradient>
                <linearGradient
                id="panneau-solaire-e"
                x1={xPosition}
                x2={yPosition}
                y1="-27.043"
                y2="1.256"
                gradientTransform="matrix(.76623 0 0 1 11.881 0)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-c"
                ></linearGradient>
                <linearGradient
                id="panneau-solaire-d"
                x1={xPosition}
                x2={yPosition}
                y1="-25.84"
                y2="2.459"
                gradientTransform="translate(.406 -1.203)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-b"
                ></linearGradient>
                <linearGradient
                id="panneau-solaire-g"
                x1={xPosition}
                x2={yPosition}
                y1="-27.043"
                y2="1.256"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#panneau-solaire-a"
                ></linearGradient>
            </defs>
            <path
                fill="url(#panneau-solaire-d)"
                fillOpacity="1"
                stroke="none"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeOpacity="1"
                strokeWidth="0.265"
                d="M39.428 45.366l-7.35 8.552h34.611l-6.548-8.552z"
            ></path>
            <path
                fill="url(#panneau-solaire-e)"
                fillOpacity="1"
                fillRule="nonzero"
                stroke="none"
                strokeDasharray="none"
                strokeMiterlimit="4"
                strokeOpacity="1"
                strokeWidth="1.807"
                d="M45.569 40.689H53.453V49.108000000000004H45.569z"
            ></path>
            <path
                fill="url(#panneau-solaire-f)"
                fillOpacity="1"
                stroke="none"
                strokeDasharray="none"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="4"
                strokeOpacity="1"
                strokeWidth="2.095"
                d="M19.26 2.81L2.772 43.823l91.164.02L77.6 2.549z"
            ></path>
            <g
                fill="url(#panneau-solaire-g)"
                fillOpacity="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeOpacity="1"
                strokeWidth="1"
            >
                <path
                stroke="url(#panneau-solaire-h)"
                d="M290.824 12.729l-34.804.027 4.793 15.074 35.654-.045z"
                transform="scale(.26458)"
                ></path>
                <path
                stroke="url(#panneau-solaire-i)"
                d="M252.584 12.76l-41.17.023 2.156 15.108 43.73-.055z"
                transform="scale(.26458)"
                ></path>
                <path
                stroke="none"
                d="M207.547 12.787l-41.485.024-2.322 15.144 45.916-.059zM162.463 12.814l-47.658.034-5.149 15.175 50.41-.064zM111.373 12.852l-36.775.025-5.81 15.2 37.358-.048z"
                transform="scale(.26458)"
                ></path>
                <path
                stroke="url(#panneau-solaire-j)"
                d="M261.658 30.49l7.365 23.16 37.122-.046-8.665-23.114c-11.838-.001-22.718-.016-35.822 0z"
                transform="scale(.26458)"
                ></path>
                <path
                stroke="url(#panneau-solaire-k)"
                d="M258.133 30.498c-14.19.019-29.249.057-44.178.092l3.3 23.127 48.124-.063z"
                transform="scale(.26458)"
                ></path>
                <path
                stroke="none"
                d="M210.033 30.598c-15.821.037-30.938.076-46.717.125l-3.537 23.066 53.483-.068z"
                transform="scale(.26458)"
                ></path>
                <path
                fillRule="nonzero"
                stroke="none"
                d="M159.627 30.734c-17.55.055-34.613.11-50.947.17l-7.79 22.961 55.087-.07z"
                transform="scale(.26458)"
                ></path>
                <path
                stroke="none"
                d="M105.152 30.918c-13.366.05-25.739.098-37.507.146l-8.737 22.854 38.34-.049z"
                transform="scale(.26458)"
                ></path>
                <path
                stroke="url(#panneau-solaire-l)"
                d="M272.201 56.305c-.745 0-1.586.003-2.334.004l8.444 26.554 38.78-.049-9.935-26.51c-11.588 0-22.166-.015-34.955 0z"
                transform="scale(.26458)"
                ></path>
                <path
                stroke="url(#panneau-solaire-m)"
                d="M266.213 56.316c-15.665.022-32.101.062-48.572.102l3.785 26.518 53.094-.067z"
                transform="scale(.26458)"
                ></path>
                <path
                stroke="none"
                d="M213.639 56.426c-18.439.046-36.162.099-54.29.158l-4.052 26.437 62.043-.08zM155.533 56.596c-19.821.066-37.93.13-55.637.199l-8.925 26.309 60.379-.079zM96.236 56.809c-15.018.059-26.292.103-38.492.156L47.73 83.16l39.45-.05z"
                transform="scale(.26458)"
                ></path>
                <path
                stroke="url(#panneau-solaire-n)"
                d="M272.201 85.531c-16.082.02-33.337.063-50.39.104l4.626 32.424 59.069-.075-10.154-32.453c-1.145.002-1.998-.001-3.15 0z"
                transform="scale(.26458)"
                ></path>
                <path
                stroke="url(#panneau-solaire-o)"
                d="M279.16 85.531l10.317 32.448 40.775-.053-12.143-32.395c-12.374-.008-24.919-.014-38.949 0z"
                transform="scale(.26458)"
                ></path>
                <path
                stroke="url(#panneau-solaire-p)"
                d="M217.717 85.645c-21.313.051-41.96.11-62.85.18l-4.957 32.331 72.334-.092z"
                transform="scale(.26458)"
                ></path>
                <path
                stroke="url(#panneau-solaire-q)"
                d="M150.904 85.838c-21.953.074-41.891.146-60.937.223l-10.918 32.187 66.74-.086z"
                transform="scale(.26458)"
                ></path>
                <path
                stroke="url(#panneau-solaire-r)"
                d="M86.158 86.074c-18.648.075-26.296.107-39.605.166l-12.256 32.065 40.781-.053z"
                transform="scale(.26458)"
                ></path>
                <path
                stroke="url(#panneau-solaire-s)"
                d="M263.582 120.672c-11.732.014-24.437.05-36.76.076l5.367 37.615 65.866-.271-11.707-37.42c-7.859.003-14.437-.01-22.766 0z"
                transform="scale(.26458)"
                ></path>
                <path
                stroke="url(#panneau-solaire-t)"
                d="M290.334 120.672l11.889 37.392 43.002-.187-13.94-37.191c-11.946-.026-26.617-.018-40.951-.014z"
                transform="scale(.26458)"
                ></path>
                <path
                stroke="url(#panneau-solaire-u)"
                d="M222.62 120.756c-24.603.054-48.749.119-73.14.2l-5.793 37.776 84.186-.341z"
                transform="scale(.26458)"
                ></path>
                <path
                stroke="url(#panneau-solaire-v)"
                d="M145.346 120.969c-24.305.08-46.552.16-67.303.244l-12.852 37.88 74.172-.333z"
                transform="scale(.26458)"
                ></path>
                <path
                stroke="url(#panneau-solaire-w)"
                d="M74.053 121.229c-20.438.083-27.43.112-40.942.173l-14.488 37.905 42.383-.186z"
                transform="scale(.26458)"
                ></path>
            </g>
            </svg>
        );
    }
}


export default PanneauSolaire;
