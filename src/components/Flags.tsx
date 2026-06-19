import React from "react";

export function MoroccoFlag({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-lg shadow-lg relative aspect-[3/2] border border-red-700/30 ${className}`}>
      <svg viewBox="0 0 900 600" className="w-full h-full">
        {/* Red background */}
        <rect width="900" height="600" fill="#c1272d" />
        {/* Green pentagram */}
        <path
          d="M 450,150 L 513,344 L 348,224 L 552,224 L 387,344 Z"
          fill="none"
          stroke="#006233"
          strokeWidth="24"
          strokeLinejoin="round"
        />
        {/* Shadow border for 3D depth */}
        <rect width="900" height="600" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
      </svg>
    </div>
  );
}

export function ScotlandFlag({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-lg shadow-lg relative aspect-[3/2] border border-blue-900/40 ${className}`}>
      <svg viewBox="0 0 500 300" className="w-full h-full">
        {/* Pantone 300 deep blue background */}
        <rect width="500" height="300" fill="#005EB8" />
        {/* White Saltire (St Andrew's Cross) */}
        <line x1="0" y1="0" x2="500" y2="300" stroke="#ffffff" strokeWidth="60" />
        <line x1="500" y1="0" x2="0" y2="300" stroke="#ffffff" strokeWidth="60" />
        {/* Subtle inner overlay for paper/crest texture */}
        <rect width="500" height="300" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
      </svg>
    </div>
  );
}
