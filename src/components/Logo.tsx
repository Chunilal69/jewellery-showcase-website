import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 60 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* High-quality multi-stop Gold Gradient for realistic metallic look */}
        <linearGradient id="logo-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BF953F" />
          <stop offset="25%" stopColor="#FCF6BA" />
          <stop offset="50%" stopColor="#B38728" />
          <stop offset="75%" stopColor="#FBF5B7" />
          <stop offset="100%" stopColor="#AA771C" />
        </linearGradient>
        
        {/* Soft drop shadow for a 3D medallion look */}
        <filter id="logo-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.12" />
        </filter>

        {/* Circular text paths for text curving */}
        {/* Top arc - Clockwise from left to right */}
        <path id="logo-top-path" d="M 14,50 A 36,36 0 0,1 86,50" fill="none" />
        {/* Bottom arc - Counter-Clockwise from left to right */}
        <path id="logo-bottom-path" d="M 14,50 A 36,36 0 0,0 86,50" fill="none" />
      </defs>

      {/* Medallion Base Shield */}
      <circle cx="50" cy="50" r="48" fill="#FAF8F5" stroke="url(#logo-gold-gradient)" strokeWidth="1.5" filter="url(#logo-shadow)" />
      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#logo-gold-gradient)" strokeWidth="0.75" />
      <circle cx="50" cy="50" r="32.5" fill="none" stroke="url(#logo-gold-gradient)" strokeWidth="1" />

      {/* Curved brand name Swarn Ganga Jewellers along the top */}
      <text className="font-serif font-black uppercase text-[6.5px]" fill="#1A1A1A" letterSpacing="0.8">
        <textPath href="#logo-top-path" startOffset="50%" textAnchor="middle">
          Swarn Ganga Jewellers
        </textPath>
      </text>

      {/* Curved tagline Gold & Silver along the bottom */}
      <text className="font-serif font-bold uppercase text-[5.5px]" fill="#B38728" letterSpacing="1.2">
        <textPath href="#logo-bottom-path" startOffset="50%" textAnchor="middle">
          Gold &amp; Silver
        </textPath>
      </text>

      {/* Center Group */}
      <g transform="translate(0, -1.5)">
        {/* Diamond graphic on top center */}
        <path
          d="M 45,26 L 55,26 L 58,29 L 50,37 L 42,29 Z"
          fill="none"
          stroke="url(#logo-gold-gradient)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M 45,26 L 47,29 L 50,37 L 53,29 L 55,26 M 42,29 L 58,29 M 47,29 L 53,29 M 50,26 L 50,29"
          fill="none"
          stroke="url(#logo-gold-gradient)"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />

        {/* Initials SGJ */}
        <text
          x="50"
          y="54"
          fontFamily="Georgia, serif"
          fontSize="15"
          fontWeight="900"
          fill="url(#logo-gold-gradient)"
          textAnchor="middle"
          letterSpacing="0.5"
        >
          SGJ
        </text>

        {/* BIS Hallmark symbol */}
        <g transform="translate(0, 5)">
          {/* Blue triangle */}
          <polygon
            points="50,57 58,70 42,70"
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Inner divider */}
          <line x1="44.5" x2="55.5" y1="65" y2="65" stroke="#1e3a8a" strokeWidth="0.9" />
          {/* Red dot in center */}
          <circle cx="50" cy="65" r="1.8" fill="#dc2626" />
        </g>
      </g>
    </svg>
  );
}
