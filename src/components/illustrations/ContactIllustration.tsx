import React from 'react';

export const ContactIllustration = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 200 100"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g transform="translate(10, 10) scale(1.5)">
      <path d="M16 16.0234C16 14.9624 15.5562 13.9453 14.7773 13.1664C13.9984 12.3875 13.0047 11.9438 11.9438 11.9438C10.8828 11.9438 9.88906 12.3875 9.11016 13.1664C8.33125 13.9453 7.8875 14.9624 7.8875 16.0234" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
      <path d="M11.9437 8.94375C13.5937 8.94375 14.9437 7.59375 14.9437 5.94375C14.9437 4.29375 13.5937 2.94375 11.9437 2.94375C10.2937 2.94375 8.94375 4.29375 8.94375 5.94375C8.94375 7.59375 10.2937 8.94375 11.9437 8.94375Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
      <path d="M5.3375,21C5.3375,19.3375 10.125,18.475 11.9375,18.475" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
      <path d="M17.4125 14.425C18.9 15.0625 20 16.275 20 17.75V19.25" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
    </g>
    <g transform="translate(100, 20) scale(0.8)">
        <path d="M30 40L50 20L70 40" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="50" y1="20" x2="50" y2="60" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="80" cy="55" r="3" fill="currentColor" opacity="0.5"/>
        <circle cx="15" cy="65" r="2" fill="currentColor" opacity="0.4"/>
    </g>
    <g transform="translate(50, 50) scale(0.5)">
        <path d="M3 8V7C3 5.61929 4.11929 4.5 5.5 4.5H18.5C19.8807 4.5 21 5.61929 21 7V17C21 18.3807 19.8807 19.5 18.5 19.5H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 15L11 11L13.5 13.5L17 10" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 20.5L6.5 22L7 18.5L10 20.5Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
     <g transform="translate(140, 60) scale(0.4)">
      <path d="M21.5 12H18.5C18.2239 12 18 11.7761 18 11.5V2.5C18 2.22386 18.2239 2 18.5 2H21.5C21.7761 2 22 2.22386 22 2.5V11.5C22 11.7761 21.7761 12 21.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 7H16.5C16.2239 7 16 7.22386 16 7.5V11.5C16 11.7761 16.2239 12 16.5 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 9H14.5C14.2239 9 14 9.22386 14 9.5V11.5C14 11.7761 14.2239 12 14.5 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  </svg>
);
