import React from 'react';

export const FinancialChart = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        {/* Main shape */}
        <path 
            d="M20 80C20 60 30 50 40 50C50 50 60 60 60 80" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            opacity="0.3"
        />
        <path 
            d="M40 80C40 70 45 65 50 65C55 65 60 70 60 80" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            opacity="0.3"
        />
        
        {/* Accent Arrow */}
        <path 
            d="M30 40L50 20L70 40" 
            stroke="hsl(var(--accent))" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
        <line 
            x1="50" y1="20" x2="50" y2="60" 
            stroke="hsl(var(--accent))" 
            strokeWidth="4" 
            strokeLinecap="round"
        />
        
        {/* Decorative dots */}
        <circle cx="80" cy="55" r="3" fill="currentColor" opacity="0.5" />
        <circle cx="15" cy="65" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="85" cy="25" r="2" fill="hsl(var(--accent))" opacity="0.6" />
    </svg>
);
