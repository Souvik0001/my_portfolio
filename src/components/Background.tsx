import React from 'react';
import { motion } from 'motion/react';

export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-cyber-black pointer-events-none">
      {/* Grid Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden h-[100%] opacity-50">
        <div className="w-full h-[3px] bg-cyber-emerald/10 blur-[1px] animate-scanline" />
      </div>

      {/* Subtle Digital Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-emerald/5 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
