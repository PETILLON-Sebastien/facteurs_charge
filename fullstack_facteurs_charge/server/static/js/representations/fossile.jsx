import React from "react";

class Fossile extends React.Component {

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
        width="210mm"
        height="297mm"
        version="1.1"
        viewBox="40 0 60 155"
      >
        <defs>
          <linearGradient id="fossile-d">
            <stop offset="0" stopColor="#bebebe" stopOpacity="1"></stop>
            <stop offset="1" stopColor="#969696" stopOpacity="1"></stop>
          </linearGradient>
          <linearGradient id="fossile-e">
            <stop offset="0" stopColor="#bebebe" stopOpacity="1"></stop>
            <stop offset="1" stopColor="#969696" stopOpacity="1"></stop>
          </linearGradient>
          <linearGradient id="fossile-b">
            <stop offset="0" stopColor="#323232" stopOpacity="0.972"></stop>
            <stop offset="1" stopColor="#000" stopOpacity="1"></stop>
          </linearGradient>
          <linearGradient id="fossile-a">
            <stop offset="0" stopColor="#1597aa" stopOpacity="1"></stop>
            <stop offset="1" stopColor="#152eaa" stopOpacity="1"></stop>
          </linearGradient>
          <linearGradient id="fossile-c">
            <stop offset="0" stopColor="#bebebe" stopOpacity="1"></stop>
            <stop offset="1" stopColor="#969696" stopOpacity="0.976"></stop>
          </linearGradient>
          <radialGradient
            id="fossile-l"
            cx="47.746"
            cy="102.284"
            r="10.826"
            fx="47.746"
            fy="102.284"
            gradientTransform="matrix(2.7252 -.2507 .1448 1.54605 -79.935 -30.495)"
            gradientUnits="userSpaceOnUse"
            xlinkHref="#fossile-a"
          ></radialGradient>
          <radialGradient
            id="fossile-m"
            cx="20.34"
            cy="120.767"
            r="7.747"
            fx="20.34"
            fy="120.767"
            gradientTransform="matrix(-1.64089 .14081 .16181 1.88566 53.188 -112.294)"
            gradientUnits="userSpaceOnUse"
            xlinkHref="#fossile-b"
          ></radialGradient>
          <linearGradient
            id="fossile-h"
            x1="36.932"
            x2="47.893"
            y1="46.642"
            y2="46.642"
            gradientTransform="matrix(3.77953 0 0 3.77953 -22.789 115.703)"
            gradientUnits="userSpaceOnUse"
            xlinkHref="#fossile-c"
          ></linearGradient>
          <linearGradient
            id="fossile-j"
            x1="14.309"
            x2="133.315"
            y1="110.656"
            y2="110.656"
            gradientUnits="userSpaceOnUse"
            xlinkHref="#fossile-d"
          ></linearGradient>
          <linearGradient
            id="fossile-f"
            x1="36.932"
            x2="47.893"
            y1="46.642"
            y2="46.642"
            gradientTransform="matrix(3.77953 0 0 3.77953 -22.789 115.703)"
            gradientUnits="userSpaceOnUse"
            xlinkHref="#fossile-c"
          ></linearGradient>
          <linearGradient
            id="fossile-i"
            x1="18.057"
            x2="137.793"
            y1="89.187"
            y2="89.187"
            gradientTransform="matrix(1.00011 0 0 1 -.002 0)"
            gradientUnits="userSpaceOnUse"
            xlinkHref="#fossile-e"
          ></linearGradient>
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
        <g clip-path="none" transform="translate(0 -1.058)">
          <g
            id="fossile-g"
            fillOpacity="1"
            stroke="#ccc"
            stroke-width="0.5"
            strokeDasharray="none"
            strokeMiterlimit="4"
            strokeOpacity="1"
          >
            <path
              fill="url(#fossile-f)"
              strokeWidth="0.624"
              d="M116.797 177.346v.093a20.72 5.896 0 01.015-.093zm0 .093v229.194h41.428V177.506a20.72 5.896 0 01-20.71 5.83 20.72 5.896 0 01-20.718-5.897z"
              opacity="1"
              transform="scale(.26458)"
            ></path>
            <path
              fill="red"
              strokeWidth="0.192"
              d="M30.903 53.044v.01a5.482 1.56 0 01.002-.01zm10.956 0a5.482 1.56 0 01.005.032v-.032zm.005.032a5.482 1.56 0 01-5.483 1.56 5.482 1.56 0 01-5.478-1.527v4.971a5.482 1.56 0 005.475 1.509 5.482 1.56 0 005.482-1.56 5.482 1.56 0 00-.004-.033h.004v1.701h.004zM30.903 62.04v.009a5.482 1.56 0 01.002-.009zm10.956 0a5.482 1.56 0 01.005.032v-.032zm.005.032a5.482 1.56 0 01-5.483 1.56 5.482 1.56 0 01-5.478-1.527v4.971a5.482 1.56 0 005.475 1.508 5.482 1.56 0 005.482-1.56 5.482 1.56 0 00-.004-.032h.004v1.7h.004zM30.903 71.036v.009a5.482 1.56 0 01.002-.009zm10.956 0a5.482 1.56 0 01.005.032v-.032zm.005.032a5.482 1.56 0 01-5.483 1.56 5.482 1.56 0 01-5.478-1.527v4.97a5.482 1.56 0 005.475 1.51 5.482 1.56 0 005.482-1.56 5.482 1.56 0 00-.004-.033h.004v1.7h.004z"
              opacity="1"
            ></path>
          </g>
        </g>
        <use
          width="100%"
          height="100%"
          x="0"
          y="0"
          transform="translate(0 -1.058)"
          xlinkHref="#fossile-g"
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
          clip-path="none"
        >
          <path
            fill="url(#fossile-h)"
            strokeWidth="0.624"
            d="M116.797 177.346v.093a20.72 5.896 0 01.015-.093zm0 .093v229.194h41.428V177.506a20.72 5.896 0 01-20.71 5.83 20.72 5.896 0 01-20.718-5.897z"
            opacity="1"
            transform="translate(32.808 -1.058) scale(.26458)"
          ></path>
          <path
            fill="red"
            strokeWidth="0.192"
            d="M30.903 53.044v.01a5.482 1.56 0 01.002-.01zm10.956 0a5.482 1.56 0 01.005.032v-.032zm.005.032a5.482 1.56 0 01-5.483 1.56 5.482 1.56 0 01-5.478-1.527v4.971a5.482 1.56 0 005.475 1.509 5.482 1.56 0 005.482-1.56 5.482 1.56 0 00-.004-.033h.004v1.701h.004zM30.903 62.04v.009a5.482 1.56 0 01.002-.009zm10.956 0a5.482 1.56 0 01.005.032v-.032zm.005.032a5.482 1.56 0 01-5.483 1.56 5.482 1.56 0 01-5.478-1.527v4.971a5.482 1.56 0 005.475 1.508 5.482 1.56 0 005.482-1.56 5.482 1.56 0 00-.004-.032h.004v1.7h.004zM30.903 71.036v.009a5.482 1.56 0 01.002-.009zm10.956 0a5.482 1.56 0 01.005.032v-.032zm.005.032a5.482 1.56 0 01-5.483 1.56 5.482 1.56 0 01-5.478-1.527v4.97a5.482 1.56 0 005.475 1.51 5.482 1.56 0 005.482-1.56 5.482 1.56 0 00-.004-.033h.004v1.7h.004z"
            opacity="1"
            transform="translate(32.808 -1.058)"
          ></path>
        </g>
        <use
          width="100%"
          height="100%"
          x="0"
          y="0"
          transform="translate(32.808 -1.058)"
          xlinkHref="#fossile-g"
        ></use>
        <g clip-path="none" transform="translate(-8.168 29.02)">
          <g id="fossile-k" fillOpacity="1">
            <path
              fill="url(#fossile-i)"
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
              fill="url(#fossile-j)"
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
          xlinkHref="#fossile-k"
        ></use>
        <path
          fill="url(#fossile-l)"
          fillOpacity="1"
          stroke="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.198"
          d="M63.364 119.15c-3.422-1.996-5.782-3.404-5.882-8.591-.101-5.187 4.776-6.929 6.642-15.013 0 0 9.763 4.689 9.662 13.766-.1 9.077-6.34 9.829-6.34 9.829s7.244-5.145-.605-14.667c0 0 2.462 4.566-1.669 7.37 0 0 .08-2.412-2.02-2.903 0 0 1.421 1.864-.61 4.264-2.276 2.691.822 5.944.822 5.944z"
        ></path>
        <g
          stroke="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
        >
          <path
            fill="url(#fossile-m)"
            fillOpacity="1"
            strokeWidth="0.198"
            d="M37.1 125.802c3.352-.081 6.4-3.157 5.669-8.293-.635-4.452-4.405-5.737-4.4-13.888 0 0-7.58 7.321-8.125 13.966-.547 6.645 3.504 8.296 6.856 8.215z"
            transform="matrix(.67222 0 0 .67222 7.3 30.868)"
          ></path>
          <path
            fill="#fff"
            fillOpacity="0.973"
            strokeWidth="0.265"
            d="M32.857 116.066s-1.133 4.168-.292 5.116c.841.949 1.044.063.72-1.513-.325-1.577-.428-3.603-.428-3.603z"
            transform="matrix(.67222 0 0 .67222 7.3 30.868)"
          ></path>
        </g>
        <g fillOpacity="1" stroke="none" strokeOpacity="1">
          <path
            fill="#646464"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeWidth="0.265"
            d="M52.728 110.327l2.976 7.607h15.45l2.457-7.56z"
            transform="matrix(.7466 0 0 .91004 53.57 6.772) translate(-.542 -.816)"
          ></path>
          <path
            fill="#000004"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeWidth="0.265"
            d="M55.931 110.327s-.614-.992.047-1.465c.662-.472 1.37.048 1.512-.33.142-.378.33-1.182.756-1.229.425-.047 1.56-1.417 2.551-1.37.993.047 1.796.85 2.221.992.425.142 1.465-1.181 2.315-1.181.85 0 1.465.189 1.512.567.047.378.709.283.945.614.236.33.85.142 1.181.85.33.71.709.568.709.568s.898-.473 1.087.425c.189.898.945.661.85 1.606l-15.686-.047z"
            transform="matrix(.7466 0 0 .91004 53.57 6.772) translate(-.542 -.816)"
          ></path>
          <path
            fill="#323232"
            fillRule="nonzero"
            strokeDasharray="none"
            strokeMiterlimit="4"
            strokeWidth="0.887"
            d="M62.95 118.278a3.337 2.82 0 01-3.188 2.942 3.337 2.82 0 01-3.48-2.694 3.337 2.82 0 013.187-2.942 3.337 2.82 0 013.48 2.694l-3.333.124zM70.516 118.257a3.337 2.82 0 01-3.188 2.942 3.337 2.82 0 01-3.48-2.694 3.337 2.82 0 013.187-2.942 3.337 2.82 0 013.48 2.694l-3.333.124z"
            transform="matrix(.7466 0 0 .91004 53.57 6.772) translate(-.542 -.816)"
          ></path>
        </g>
      </svg>
    );
  }
}

export default Fossile;
