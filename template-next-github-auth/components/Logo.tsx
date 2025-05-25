
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center shadow-md">
        {/* Simple code bracket icon */}
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="12" y1="2" x2="12" y2="22" />
        </svg>
      </div>
      <span className="text-2xl font-extrabold text-white tracking-tight" style={{fontFamily: 'Inter, monospace'}}>
        CodeSolve
      </span>
    </div>
  );
};

export default Logo;
