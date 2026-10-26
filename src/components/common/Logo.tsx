import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  to?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
  to = '/'
}) => {
  const sizeClasses = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', badge: 'text-xs px-1' },
    md: { icon: 'w-9 h-9', text: 'text-xl', badge: 'text-xs px-1.5' },
    lg: { icon: 'w-11 h-11', text: 'text-2xl', badge: 'text-xs px-2' }
  }[size];

  const content = (
    <div className={`flex items-center gap-2.5 font-sans select-none ${className}`}>
      {/* Agricultural Leaf + Connected Digital Nodes Symbol */}
      <div className={`relative shrink-0 ${sizeClasses.icon} flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 shadow-md shadow-emerald-900/10 text-white p-1.5 transition-transform duration-200 hover:scale-105`}>
        <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
          {/* Stylized Leaf Silhouette */}
          <path
            d="M16 4C9 4 6 11 6 18C6 24 10 27 16 28C22 27 26 24 26 18C26 11 23 4 16 4Z"
            fill="currentColor"
            fillOpacity="0.25"
          />
          {/* Leaf central digital stem line */}
          <path
            d="M16 6V26"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Digital circuit branches */}
          <path
            d="M16 13L22 9"
            stroke="#FEF08A"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M16 19L10 15"
            stroke="#FEF08A"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          {/* Digital Network Nodes */}
          <circle cx="22" cy="9" r="2.2" fill="#FEF08A" />
          <circle cx="10" cy="15" r="2.2" fill="#FEF08A" />
          <circle cx="16" cy="6" r="2.2" fill="#FFFFFF" />
          <circle cx="16" cy="26" r="2" fill="#FFFFFF" />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-extrabold tracking-tight text-slate-900 ${sizeClasses.text}`}>
              Crop <span className="text-emerald-700">Nexus</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
