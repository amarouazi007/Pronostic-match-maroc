import React from "react";
import lionImage from "../assets/images/atlas_lion_victory_1781898346077.jpg";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Mag5starsLogo({ className = "", size = 120 }: LogoProps) {
  const LION_IMAGE_URL = lionImage;

  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
      style={{ width: size, height: size }}
      id="mag5stars-logo-container"
    >
      {/* Outer Glow (Green & Red Pulse) */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/20 via-red-500/30 to-amber-500/20 blur-xl animate-pulse" />
      
      {/* Outer Golden/White Premium Border Ring */}
      <div className="absolute inset-0 rounded-full border-4 border-amber-500/40 p-1 flex items-center justify-center bg-[#070b19] shadow-[0_0_20px_rgba(239,68,68,0.2)]">
        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/80">
          
          {/* Main Logo Image (The Atlas Lion Victory) */}
          <img 
            src={LION_IMAGE_URL} 
            alt="Mag5stars Official Logo" 
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />

          {/* Semi-transparent dark gradient overlay on bottom of the image for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />

          {/* Curved Header Emblem */}
          <div className="absolute top-1.5 inset-x-0 flex justify-center z-20">
            <span className="text-[8px] tracking-[0.15em] font-extrabold font-sans text-yellow-400 bg-black/60 px-1.5 py-0.5 rounded border border-yellow-500/30 uppercase">
              MAG 5
            </span>
          </div>

          {/* Curved Footer Emblem */}
          <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-20">
            <span className="text-[8px] tracking-[0.2em] font-extrabold font-mono text-emerald-400 bg-black/60 px-2 py-0.5 rounded border border-emerald-500/30 uppercase animate-pulse">
              ★ STARS ★
            </span>
          </div>

        </div>
      </div>

      {/* Decorative Outer Stats & Orbit Dots */}
      <div className="absolute -inset-1.5 rounded-full border border-dashed border-white/10 animate-[spin_40s_linear_infinite]" />
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50 z-20" />
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 z-20" />
    </div>
  );
}
