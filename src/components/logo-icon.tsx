import React from 'react';

export const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M4 20L12 4L20 20H4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M12 12L8 20" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 12L16 20" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 14H16" stroke="currentColor" strokeWidth="2"/>
    </svg>
);
