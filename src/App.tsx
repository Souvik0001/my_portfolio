import React from 'react';
import TerminalInterface from './components/TerminalInterface';
import Background from './components/Background';

export default function App() {
  return (
    <div className="relative antialiased h-screen w-screen flex flex-col overflow-hidden bg-cyber-black selection:bg-cyber-emerald/30">
      <Background />
      
      {/* Decorative Kali Frame */}
      <div className="absolute inset-0 pointer-events-none z-[100] border-[2px] border-cyber-emerald/10" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-cyber-emerald/20 z-[101]" />
      
      <main className="flex-1 min-h-0 relative z-10 p-4 md:p-8 flex flex-col overflow-hidden">
        <TerminalInterface />
      </main>

      {/* Decorative Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[50] opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_4px,3px_100%]" />
      </div>
    </div>
  );
}

