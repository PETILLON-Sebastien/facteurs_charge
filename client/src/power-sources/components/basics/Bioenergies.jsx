import React from "react";

class Bioenergies extends React.Component {
  pourcentageVersTemps() {
    var temps = 0;
    if (this.props.pourcentage > 1) {
      temps = 3 * Math.exp(-0.02 * this.props.pourcentage);
    }
    return temps;
  }
  pourcentageVersOpacite() {
    var opacite = 0;
    if (this.props.pourcentage > 1) {
      opacite = 0.24 * Math.log(this.props.pourcentage) - 0.15;
    }
    return opacite;
  }

  render() {
    const translationStyle = {
      animationDuration: this.pourcentageVersTemps() + "s",
    };
    const opacite = this.pourcentageVersOpacite();

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="210mm"
        height="297mm"
        version="1.1"
        viewBox="40 0 60 155"
      >
        <defs>
          <linearGradient id="bioenergies-d">
            <stop offset="0" stopColor="#bebebe" stopOpacity="1"></stop>
            <stop offset="1" stopColor="#969696" stopOpacity="1"></stop>
          </linearGradient>
          <linearGradient id="bioenergies-e">
            <stop offset="0" stopColor="#bebebe" stopOpacity="1"></stop>
            <stop offset="1" stopColor="#969696" stopOpacity="1"></stop>
          </linearGradient>
          <linearGradient id="bioenergies-b">
            <stop offset="0" stopColor="#323232" stopOpacity="0.972"></stop>
            <stop offset="1" stopColor="#000" stopOpacity="1"></stop>
          </linearGradient>
          <linearGradient id="bioenergies-c">
            <stop offset="0" stopColor="#bebebe" stopOpacity="1"></stop>
            <stop offset="1" stopColor="#969696" stopOpacity="0.976"></stop>
          </linearGradient>
          <radialGradient
            id="bioenergies-m"
            cx="20.34"
            cy="120.767"
            r="7.747"
            fx="20.34"
            fy="120.767"
            gradientTransform="matrix(-1.64089 .14081 .16181 1.88566 53.188 -112.294)"
            gradientUnits="userSpaceOnUse"
            xlinkHref="#bioenergies-b"
          ></radialGradient>
          <linearGradient
            id="bioenergies-h"
            x1="36.932"
            x2="47.893"
            y1="46.642"
            y2="46.642"
            gradientTransform="matrix(3.77953 0 0 3.77953 -22.789 115.703)"
            gradientUnits="userSpaceOnUse"
            xlinkHref="#bioenergies-c"
          ></linearGradient>
          <linearGradient
            id="bioenergies-j"
            x1="14.309"
            x2="133.315"
            y1="110.656"
            y2="110.656"
            gradientUnits="userSpaceOnUse"
            xlinkHref="#bioenergies-d"
          ></linearGradient>
          <linearGradient
            id="bioenergies-f"
            x1="36.932"
            x2="47.893"
            y1="46.642"
            y2="46.642"
            gradientTransform="matrix(3.77953 0 0 3.77953 -22.789 115.703)"
            gradientUnits="userSpaceOnUse"
            xlinkHref="#bioenergies-c"
          ></linearGradient>
          <linearGradient
            id="bioenergies-i"
            x1="18.057"
            x2="137.793"
            y1="89.187"
            y2="89.187"
            gradientTransform="matrix(1.00011 0 0 1 -.002 0)"
            gradientUnits="userSpaceOnUse"
            xlinkHref="#bioenergies-e"
          ></linearGradient>
          <linearGradient
            id="bioenergies-k"
            x1="40.104"
            x2="54.045"
            y1="72.868"
            y2="87.136"
            gradientTransform="matrix(.62605 0 0 .6489 55.828 57.435)"
            gradientUnits="userSpaceOnUse"
            xlinkHref="#feuille"
          ></linearGradient>
          <linearGradient id="feuille">
            <stop offset="0" stopColor="#1b843c" stopOpacity="1"></stop>
            <stop offset="1" stopColor="#53b900" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
        <ellipse
          cx="36.38"
          cy="45.934"
          fill="#505050"
          fillOpacity="1"
          stroke="none"
          strokeDasharray="none"
          strokeMiterlimit="4"
          strokeOpacity="1"
          strokeWidth="0.129"
          opacity="1"
          rx="5.482"
          ry="1.56"
        ></ellipse>
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
          strokeWidth="0.049"
          gradientUnits="userSpaceOnUse"
          className="fumee-petite"
          d="M31.925-.43c.032 4.906 2.11 6.576 2.006 9.353-.103 2.777-2.118 3.58-2.098 5.74.032 4.907 2.11 6.576 2.006 9.353-.104 2.777-2.119 3.579-2.099 5.74.032 4.906 2.11 6.575 2.006 9.352-.103 2.778-2.118 3.58-2.098 5.74.032 4.907 2.11 6.576 2.006 9.354-.104 2.777-2.119 3.58-2.099 5.74.032 4.906 2.11 6.576 2.006 9.353-.104 2.777-2.118 3.58-2.099 5.74.033 4.906 2.11 6.576 2.007 9.353-.104 2.777-2.119 3.579-2.099 5.74l8.372.034c.118-1.786 1.18-2.855 1.228-6.307.048-3.452-1.156-5.857-1.136-8.786.118-1.786 1.18-2.855 1.229-6.307.048-3.452-1.156-5.857-1.136-8.786.118-1.786 1.18-2.855 1.228-6.306.048-3.452-1.156-5.859-1.136-8.787.119-1.787 1.18-2.855 1.229-6.307.048-3.451-1.157-5.857-1.136-8.786.118-1.786 1.18-2.855 1.228-6.307.048-3.451-1.156-5.857-1.136-8.786.118-1.786 1.18-2.855 1.229-6.307.048-3.452-1.156-5.857-1.136-8.786z"
        ></path>
        <g clipPath="none" transform="translate(0 -1.058)">
          <g
            id="bioenergies-g"
            fillOpacity="1"
            stroke="#ccc"
            strokeWidth="0.5"
            strokeDasharray="none"
            strokeMiterlimit="4"
            strokeOpacity="1"
          >
            <path
              fill="url(#bioenergies-f)"
              strokeWidth="0.624"
              d="M116.797 177.346v.093a20.72 5.896 0 01.015-.093zm0 .093v229.194h41.428V177.506a20.72 5.896 0 01-20.71 5.83 20.72 5.896 0 01-20.718-5.897z"
              opacity="1"
              transform="scale(.26458)"
            ></path>
          </g>
        </g>
        <use
          width="100%"
          height="100%"
          x="0"
          y="0"
          transform="translate(0 -1.058)"
          xlinkHref="#bioenergies-g"
        ></use>
        <ellipse
          cx="69.189"
          cy="45.934"
          fill="#505050"
          fillOpacity="1"
          stroke="none"
          strokeDasharray="none"
          strokeMiterlimit="4"
          strokeOpacity="1"
          strokeWidth="0.129"
          opacity="1"
          rx="5.482"
          ry="1.56"
        ></ellipse>
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
          strokeWidth="0.049"
          gradientUnits="userSpaceOnUse"
          className="fumee-petite"
          d="M64.908-.43c.032 4.908 2.063 6.578 1.961 9.356-.101 2.779-2.07 3.581-2.051 5.743.031 4.908 2.062 6.578 1.961 9.356-.101 2.778-2.071 3.58-2.052 5.742.032 4.908 2.063 6.578 1.962 9.356-.102 2.778-2.072 3.581-2.052 5.743.031 4.908 2.062 6.578 1.961 9.356-.101 2.778-2.071 3.581-2.052 5.743.032 4.908 2.063 6.578 1.961 9.356-.101 2.778-2.07 3.58-2.051 5.743.031 4.908 2.062 6.578 1.96 9.356-.1 2.778-2.07 3.58-2.05 5.742l8.183.034c.116-1.787 1.154-2.856 1.201-6.31.047-3.452-1.13-5.859-1.11-8.789.115-1.787 1.154-2.856 1.2-6.31.048-3.452-1.13-5.859-1.11-8.788.116-1.787 1.154-2.856 1.201-6.31.047-3.452-1.13-5.86-1.11-8.79.115-1.786 1.154-2.855 1.2-6.308.048-3.453-1.13-5.86-1.11-8.79.115-1.786 1.154-2.856 1.2-6.309.048-3.453-1.13-5.86-1.11-8.79.116-1.786 1.154-2.856 1.201-6.309.047-3.453-1.13-5.86-1.11-8.79z"
        ></path>
        <g
          fillOpacity="1"
          stroke="none"
          strokeDasharray="none"
          strokeMiterlimit="4"
          strokeOpacity="1"
          clipPath="none"
        >
          <path
            fill="url(#bioenergies-h)"
            strokeWidth="0.624"
            d="M116.797 177.346v.093a20.72 5.896 0 01.015-.093zm0 .093v229.194h41.428V177.506a20.72 5.896 0 01-20.71 5.83 20.72 5.896 0 01-20.718-5.897z"
            opacity="1"
            transform="translate(32.808 -1.058) scale(.26458)"
          ></path>
        </g>
        <use
          width="100%"
          height="100%"
          x="0"
          y="0"
          transform="translate(32.808 -1.058)"
          xlinkHref="#bioenergies-g"
        ></use>
        <g clipPath="none" transform="translate(-8.168 29.02)">
          <g id="bioenergies-k" fillOpacity="1">
            <path
              fill="url(#bioenergies-i)"
              stroke="none"
              strokeDasharray="none"
              strokeMiterlimit="4"
              strokeOpacity="1"
              strokeWidth="0.165"
              d="M18.057 61.124H137.807V117.251H18.057z"
              opacity="1"
            ></path>
            <path
              fill="#828282"
              stroke="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeOpacity="1"
              strokeWidth="0.265"
              d="M18.057 61.18l4.337-3.742 120.013-.267-4.614 4.009z"
            ></path>
            <path
              fill="#a0a0a0"
              stroke="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeOpacity="1"
              strokeWidth="0.265"
              d="M142.407 57.17l.197 54.735-4.81 5.345V61.124z"
            ></path>
            <path
              fill="url(#bioenergies-j)"
              stroke="none"
              strokeDasharray="none"
              strokeMiterlimit="4"
              strokeOpacity="1"
              strokeWidth="0.101"
              d="M14.309 99.936H133.315V121.376H14.309z"
              opacity="1"
            ></path>
            <path
              fill="#828282"
              stroke="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeOpacity="1"
              strokeWidth="0.299"
              d="M14.31 99.936l3.795-5.002 119.692-.135-4.515 5.137z"
            ></path>
            <path
              fill="#a0a0a0"
              stroke="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeOpacity="1"
              strokeWidth="0.169"
              d="M137.797 94.799l-.004 22.451-4.478 4.126-.033-21.44z"
            ></path>
            <path
              fill="#56c8c9"
              stroke="#000"
              strokeDasharray="none"
              strokeMiterlimit="4"
              strokeOpacity="0.588"
              strokeWidth="0.165"
              d="M19.399 104.313H128.63400000000001V112.062H19.399z"
              opacity="1"
            ></path>
          </g>
        </g>
        <use
          width="100%"
          height="100%"
          x="0"
          y="0"
          transform="translate(-8.168 29.02)"
          xlinkHref="#bioenergies-k"
        ></use>
        <g
          fillOpacity="1"
          stroke="none"
          strokeOpacity="1"
          transform="translate(20.033 21.967) scale(.64462)"
        >
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
          fill="url(#bioenergies-k)"
          fillOpacity="1"
          stroke="#000"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="0.588"
          strokeWidth="0.169"
          d="M84.283 107.35s10.293 4.66 5.738 8.033c-4.555 3.372-9.584-2.024-9.938-11.16-.355-9.136-.77-2.085 3.312.123 4.082 2.207 6.922 1.471 8.933 3.617 3.557 3.795-.946 7.052-.946 7.052s3.727-4.047-7.1-7.665z"
        ></path>
      </svg>
    );
  }
}

export default Bioenergies;
