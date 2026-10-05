import React from 'react';

// "N." monogram. The same geometry is used for public/favicon.svg and the PNG icons.
export const LogoMark = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="logo-mark">
    <rect width="64" height="64" rx="14" fill="#15171c" />
    <path d="M15 18h6v28h-6zM37 18h6v28h-6zM15 18h6l22 28h-6z" fill="#f5f3ee" />
    <circle cx="50.5" cy="42.4" r="3.6" fill="#1d3fbb" />
  </svg>
);

const Logo = ({ name }) => (
  <span className="logo">
    <LogoMark />
    <span className="logo-word">{name}</span>
  </span>
);

export default Logo;
