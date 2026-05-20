import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Terminal as TerminalIcon, Cpu, Lock, Globe, Mail, Github, Linkedin, Briefcase, GraduationCap, Award, Search, Info } from 'lucide-react';

type CommandOutput = {
  type: 'command' | 'text' | 'component';
  content: any;
  command?: string;
};

export default function TerminalInterface() {
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [input, setInput] = useState('');
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Welcome message
    const welcome = [
      { type: 'text', content: 'KALI LINUX OS v2026.1 - SESSION_SC_001' },
      { type: 'text', content: 'INITIALIZING SECURITY PROTOCOLS...' },
      { type: 'text', content: 'SYSTEM STATUS: OPTIMAL' },
      { type: 'text', content: '---------------------------------------------------' },
      { type: 'text', content: 'GREETINGS. I AM SOUVIK CHOWDHURY.' },
      { type: 'text', content: 'CYBERSECURITY ANALYST // BACKEND ARCHITECT' },
      { type: 'text', content: 'SPECIALIZING IN SECURE SYSTEMS & SCALABLE INFRASTRUCTURE.' },
      { type: 'text', content: '---------------------------------------------------' },
      { type: 'text', content: 'Type "help" to list available commands.' },
    ];
    setHistory(welcome as CommandOutput[]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.toLowerCase().trim();
    let response: CommandOutput[] = [];

    // Add command to history
    setHistory(prev => [...prev, { type: 'command', content: cleanCmd, command: cleanCmd }]);
    setInputHistory(prev => [cleanCmd, ...prev]);
    setHistoryIndex(-1);

    switch (cleanCmd) {
      case 'help':
        response = [
          { type: 'component', content: 'help' }
        ];
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'skills':
        response = [{ type: 'component', content: 'skills' }];
        break;
      case 'whoami':
        response = [{ type: 'component', content: 'about' }];
        break;
      case 'cat projects':
      case 'projects':
        response = [{ type: 'component', content: 'projects' }];
        break;
      case 'history':
        response = [{ type: 'component', content: 'experience' }];
        break;
      case 'vault':
        response = [{ type: 'component', content: 'certs' }];
        break;
      case 'edu':
        response = [{ type: 'component', content: 'education' }];
        break;
      case 'contact':
        response = [{ type: 'component', content: 'contact' }];
        break;
      default:
        response = [{ type: 'text', content: `Command not found: ${cleanCmd}. Type "help" for assistance.` }];
    }

    setHistory(prev => [...prev, ...response]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < inputHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(inputHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(inputHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput('');
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className="flex-1 glass-panel border-cyber-emerald/20 flex flex-col overflow-hidden cursor-text min-h-0"
      onClick={focusInput}
    >
      {/* Terminal Header */}
      <div className="bg-cyber-gray border-b border-cyber-border px-4 py-1.5 flex items-center justify-between shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_5px_rgba(255,95,86,0.3)]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_5px_rgba(255,189,46,0.3)]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_5px_rgba(39,201,63,0.3)]" />
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-cyber-emerald/60">
          <TerminalIcon className="w-3 h-3" />
          <span>souvik@kali-corp: ~</span>
        </div>
        <div className="w-12" />
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-black/80 scroll-smooth min-h-0"
      >
        <AnimatePresence mode="popLayout">
          {history.map((entry, i) => (
            <motion.div 
              key={`${entry.type}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {entry.type === 'command' && (
                <div className="flex flex-col gap-1 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-cyber-emerald font-bold tracking-tight text-xs md:text-sm">┌──(root㉿kali)-[~]</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-xs md:text-sm">└─$</span>
                    <span className="text-cyber-cyan font-mono text-xs md:text-sm">{entry.content}</span>
                  </div>
                </div>
              )}
              {entry.type === 'text' && (
                <div className="text-slate-300 ml-2 md:ml-4 font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
                  {entry.content}
                </div>
              )}
              {entry.type === 'component' && (
                <div className="ml-2 md:ml-4 py-2 md:py-4">
                  <SectionOutput type={entry.content} />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current Prompt */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-1 pb-10">
           <div className="flex items-center gap-2">
              <span className="text-cyber-emerald font-bold tracking-tight text-xs md:text-sm">┌──(root㉿kali)-[~]</span>
           </div>
           <div className="flex items-center gap-2 relative">
              <span className="text-white text-xs md:text-sm">└─$</span>
              <div className="flex-1 flex items-center relative">
                <input
                  ref={inputRef}
                  autoFocus
                  className="absolute inset-0 bg-transparent border-none outline-none text-transparent caret-transparent font-mono w-full text-xs md:text-sm"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                />
                <div className="font-mono text-cyber-emerald flex items-center pointer-events-none text-xs md:text-sm">
                  <span>{input}</span>
                  <div className="w-2 h-4 bg-cyber-emerald animate-pulse ml-0.5" />
                </div>
              </div>
           </div>
        </form>
      </div>

      {/* Footer Info */}
      <div className="bg-cyber-gray/50 px-4 py-1.5 md:py-1 flex flex-col md:flex-row items-start md:items-center justify-between border-t border-cyber-border font-mono text-[8px] md:text-[9px] text-slate-500 gap-1 md:gap-0">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span>HOST: LUCIFER</span>
          <span>LAT: 24.0988° N</span>
          <span>LONG: 88.2679° E</span>
        </div>
        <div className="flex gap-2 items-center self-end md:self-auto">
          <div className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-pulse" />
          <span>SESSION: ACTIVE</span>
        </div>
      </div>
    </div>
  );
}

// Sub-component to render sections as terminal outputs
function SectionOutput({ type }: { type: string }) {
  switch (type) {
    case 'help':
      return (
        <div className="space-y-4 font-mono text-xs md:text-sm max-w-2xl">
          <div className="text-slate-300 mb-4 select-none italic opacity-80">Available commands:</div>
          <div className="space-y-2">
            {[
              { cmd: 'whoami', desc: 'Display identity briefing' },
              { cmd: 'skills', desc: 'Load capability matrix' },
              { cmd: 'cat projects', desc: 'Open project logs' },
              { cmd: 'history', desc: 'View professional timeline' },
              { cmd: 'vault', desc: 'Access security certifications' },
              { cmd: 'edu', desc: 'Show academic records' },
              { cmd: 'contact', desc: 'Establish secure communication' },
              { cmd: 'clear', desc: 'Clear terminal screen' }
            ].map(item => (
              <div key={item.cmd} className="grid grid-cols-[110px_1fr] md:grid-cols-[140px_1fr] gap-2">
                <span className="text-white font-bold">{item.cmd}</span>
                <span className="text-slate-400">
                  <span className="hidden xs:inline mr-2">-</span>
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    case 'about':
      return (
        <div className="space-y-4 font-mono text-xs md:text-sm">
          <div className="text-cyber-emerald font-bold border-b border-cyber-emerald/20 pb-1 mb-2 tracking-widest uppercase text-[10px] md:text-xs">
            [ IDENTITY_BRIEFING // SC_001 ]
          </div>
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <p className="text-slate-300 leading-relaxed max-w-2xl text-justify text-xs md:text-sm">
                <span className="text-cyber-emerald mr-2 underline underline-offset-4">SUMMARY:</span> CompTIA Security+ (SY0-701) certified cybersecurity professional with a focus on SIEM, IAM, and Incident Response. Specialized in securing REST APIs, cloud deployments (AWS/Azure), and container orchestration.
              </p>
              <p className="text-slate-300 leading-relaxed max-w-2xl text-justify text-xs md:text-sm">
                Proven track record in engineering resilient digital fortresses through Secure SDLC, Vulnerability Assessment, and robust Backend Engineering with Spring Boot and Node.js.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-cyber-emerald/70 pl-3 md:pl-4 border-l border-cyber-emerald/30 text-[11px] md:text-sm">
              <div>&gt; ROLE: CYBER_SEC_ANALYST</div>
              <div>&gt; ROLE: BACKEND_ENGINEER</div>
              <div>&gt; CERT: CompTIA_Security+</div>
              <div>&gt; STATUS: OPEN_TO_MISSION</div>
            </div>
          </div>
        </div>
      );
    case 'skills':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl font-mono text-xs md:text-sm">
          {[
            { title: 'CYBERSECURITY', skills: ['SIEM / SOC', 'IAM / EDR', 'OWASP TOP 10', 'INCIDENT_RESPONSE', 'BURP_SUITE', 'NMAP'] },
            { title: 'DEVELOPMENT', skills: ['JAVA / PYTHON', 'SPRING_BOOT', 'DJANGO', 'NODE_JS', 'REACT / TS', 'POSTGRESQL'] },
            { title: 'INFRASTRUCTURE', skills: ['KUBERNETES', 'DOCKER', 'AWS / AZURE', 'TERRAFORM', 'CI / CD'] }
          ].map(group => (
            <div key={group.title}>
              <div className="text-cyber-emerald font-bold mb-2 uppercase select-none text-xs md:text-sm">
                +--[ {group.title} ]
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 pl-3 md:pl-4 border-l border-cyber-emerald/20">
                {group.skills.map(s => (
                  <div key={s} className="text-slate-400 py-0.5 md:py-0">
                    <span className="text-cyber-emerald/50 mr-2 opacity-50">|</span>{s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case 'projects':
      return (
        <div className="space-y-6 max-w-3xl font-mono text-xs md:text-sm">
          {[
            { 
              id: '001', 
              name: 'VELVETBUG', 
              desc: 'Secure Greeting Card Editor. Full-stack platform with React canvas editor, REST APIs, and admin dashboard. Dockerized services deployed to AWS EC2 via GitHub Actions CI/CD. Implemented screenshot-protection and least-privilege IAM.', 
              tech: 'React, AWS EC2, Docker, CI/CD', 
              sec: 'SCR_PROT, IAM_HARDENING',
              links: [
                { label: 'REPO', url: 'https://github.com/Souvik0001/Velvet-Bug-Backend' }
              ]
            },
            { 
              id: '002', 
              name: 'RESPIR_AI', 
              desc: 'AI+IoT Suffocation Detection. Built secure Node.js backend for MQTT/HTTP ingestion and ML inference API to detect suffocation risk. Conducted vuln assessment and pen-testing.', 
              tech: 'Node.js, MQTT, ML, React', 
              sec: 'VULN_ASSESS, PEN_TESTING',
              links: [
                { label: 'REPO', url: 'https://github.com/sahilmurhekar/RespirAI' }
              ]
            },
            { 
              id: '003', 
              name: 'CY_RENTAL', 
              desc: 'Rental Cycle Service Backend. Spring Boot with PostgreSQL. JWT auth (access/refresh), RBAC, and secured booking APIs via Spring Security filter chain. Enhanced logging for anomaly detection.', 
              tech: 'Spring Boot, PostgreSQL, JWT', 
              sec: 'SPRING_SECURITY, SOC_LOGGING',
              links: [
                { label: 'REPO', url: 'https://github.com/Souvik0001/Rental_Cycle_Service_Backend' }
              ]
            }
          ].map(proj => (
            <div key={proj.name} className="border border-cyber-emerald/30 p-3 md:p-4 relative bg-cyber-emerald/[0.02] hover:border-cyber-emerald/60 transition-colors">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 border-b border-cyber-emerald/10 pb-2 gap-1 sm:gap-0">
                <div className="text-white font-bold text-base md:text-lg">{proj.name} <span className="text-cyber-emerald/40 font-normal text-[9px] md:text-[10px]">v1.2.0</span></div>
                <div className="text-[9px] md:text-[10px] text-cyber-emerald/60">REF_ID: MISSION_{proj.id}</div>
              </div>
              <div className="grid grid-cols-1 gap-3 text-[10px] md:text-xs">
                <div><span className="text-slate-500 uppercase mr-2">DESC:</span> <span className="text-slate-300 leading-relaxed">{proj.desc}</span></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                  <div><span className="text-slate-500 uppercase mr-2">STACK:</span> <span className="text-cyber-emerald/70">{proj.tech}</span></div>
                  <div><span className="text-slate-500 uppercase mr-2">SECURITY:</span> <span className="text-cyber-emerald/70">{proj.sec}</span></div>
                </div>
                <div className="flex flex-wrap gap-4 pt-3 mt-1 border-t border-cyber-emerald/10">
                  {proj.links.map(link => (
                    <a 
                      key={link.label} 
                      href={link.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-cyber-emerald hover:text-white flex items-center gap-2 group/link font-bold"
                    >
                      <Github className="w-3 h-3" />
                      {link.label}
                      <span className="text-[9px] md:text-[10px] opacity-40">&gt;</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    case 'experience':
      return (
        <div className="space-y-8 max-w-2xl font-mono text-sm">
          <div className="text-cyber-emerald font-bold border-b border-cyber-emerald/20 pb-1 mb-4 uppercase tracking-widest">
            [ PROFESSIONAL_LOGS // REVERSE_CHRONOLOGICAL ]
          </div>
          <div className="relative pl-6 space-y-8 border-l border-cyber-emerald/20">
            <div className="relative">
              <div className="absolute -left-[30px] top-1.5 w-2 h-2 bg-cyber-emerald rounded-full glow-emerald" />
              <div className="text-cyber-emerald/60 text-xs mb-1">21.01.2026 - 26.06.2026</div>
              <h4 className="text-white font-bold uppercase">Deloitte India, Bengaluru (Online)</h4>
              <p className="text-slate-500 italic mb-2 text-xs">Cyber Strategy & Transformation Intern</p>
              <div className="text-slate-400 space-y-2 text-xs">
                <div>[+] Structured training: Cyber Strategy, Risk Assessment, GRC</div>
                <div>[+] ISO 27001 & NIST frameworks mapping for enterprise</div>
                <div>[+] Securing digital assets via SDLC-aligned IAM concepts</div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'education':
      return (
        <div className="space-y-6 max-w-3xl font-mono text-xs md:text-sm">
           <div className="text-cyber-emerald font-bold mb-4 flex items-center gap-2 text-[10px] md:text-sm">
             <span className="animate-pulse">[!]</span> ACADEMIC_RECORDS_STATUS: VERIFIED
           </div>
           <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full text-[10px] md:text-xs border-collapse border border-cyber-emerald/20 min-w-[450px] md:min-w-0">
               <thead>
                 <tr className="bg-cyber-emerald/10 text-cyber-emerald uppercase">
                   <th className="border border-cyber-emerald/20 p-2 text-left">Level</th>
                   <th className="border border-cyber-emerald/20 p-2 text-left">Institution</th>
                   <th className="border border-cyber-emerald/20 p-2 text-left">Duration</th>
                   <th className="border border-cyber-emerald/20 p-2 text-left">Result</th>
                 </tr>
               </thead>
               <tbody>
                 {[
                   { lvl: 'B.Tech CSE (Info Sec)', inst: 'VIT Vellore', date: '2022-2026', res: '9.13 CGPA' },
                   { lvl: '12th (WBCHSE)', inst: 'S.M.C.V. School', date: '2019-2021', res: '90.2%' },
                   { lvl: '10th (ICSE)', inst: 'Mary Immaculate School', date: '2006-2019', res: '95.4%' }
                 ].map((row, i) => (
                   <tr key={i} className="hover:bg-cyber-emerald/5 transition-colors">
                     <td className="border border-cyber-emerald/20 p-2 text-white">{row.lvl}</td>
                     <td className="border border-cyber-emerald/20 p-2 text-slate-400">{row.inst}</td>
                     <td className="border border-cyber-emerald/20 p-2 text-slate-500">{row.date}</td>
                     <td className="border border-cyber-emerald/20 p-2 text-cyber-emerald font-bold">{row.res}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      );
    case 'certs':
      return (
        <div className="flex flex-col gap-2 font-mono text-xs md:text-sm max-w-md">
           <div className="text-cyber-emerald font-bold mb-2 uppercase tracking-tighter text-[10px] md:text-sm">/VAULT/CERTIFICATIONS/</div>
           {[
             { title: 'CompTIA Security+ SY0-701', code: 'CompTIA', status: 'VAL', url: 'https://www.credly.com/badges/2f9b8f4a-1f27-4ef2-b071-020d63e1c66a/linked_in_profile' },
             { title: 'Google Cybersecurity Certificate', code: 'COURSERA', status: 'VAL', url: 'https://www.credly.com/badges/2b1fc6a5-8028-4266-acdb-628e972f444c/linked_in_profile' },
             { title: 'Digital Forensics Essentials (DFE)', code: 'EC-COUNCIL', status: 'VAL', url: 'https://aspen.eccouncil.org/VerifyBadge?type=certification&a=zIdbY7NmouyyOat6Gxyc2+DdYMJq5zh1Kn2exfo+TH4=' }
           ].map(cert => (
             <a 
               key={cert.title} 
               href={cert.url} 
               target="_blank" 
               rel="noreferrer"
               className="flex items-center gap-3 md:gap-4 p-2 border-l-2 border-cyber-emerald/30 bg-cyber-emerald/5 group hover:bg-cyber-emerald/20 transition-all cursor-pointer"
             >
               <div className="w-8 h-8 flex shrink-0 items-center justify-center border border-cyber-emerald/20 text-cyber-emerald text-[9px] md:text-[10px] group-hover:border-cyber-emerald font-bold">VER</div>
               <div className="flex-1 min-w-0">
                 <div className="text-white font-bold uppercase text-[10px] md:text-[11px] group-hover:text-cyber-emerald leading-tight truncate md:whitespace-normal">{cert.title}</div>
                 <div className="text-[8px] md:text-[9px] text-slate-500 uppercase">{cert.code} | STATUS: {cert.status}</div>
                 <div className="text-[8px] text-cyber-emerald/40 group-hover:text-cyber-emerald mt-1 font-bold italic tracking-wider">
                   &gt; CLICK HERE TO VERIFY_
                 </div>
               </div>
               <Award className="w-3 h-3 md:w-4 md:h-4 text-cyber-emerald/40 group-hover:text-cyber-emerald shrink-0" />
             </a>
           ))}
        </div>
      );
    case 'contact':
      return (
        <div className="space-y-6 font-mono text-xs md:text-sm">
           <div className="text-cyber-emerald font-bold uppercase border-b border-cyber-emerald/20 pb-1 mb-4 flex items-center justify-between text-[11px] md:text-sm">
             <span>SECURE_UPLINK</span>
             <span className="text-[10px] opacity-60 hidden xs:inline">Handshake: established</span>
           </div>
           <div className="space-y-4 md:space-y-3">
              <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-3">
                <span className="text-slate-500 xs:w-24 text-[10px] md:text-xs">ADDR_SMTP:</span>
                <a href="mailto:souvikchowdhury095@gmail.com" className="text-cyber-emerald hover:text-white transition-colors break-all">souvikchowdhury095@gmail.com</a>
              </div>
              <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-3">
                <span className="text-slate-500 xs:w-24 text-[10px] md:text-xs">LNK_ID:</span>
                <a href="https://linkedin.com/in/souvik-chowdhury-200bb425b" target="_blank" rel="noreferrer" className="text-cyber-emerald hover:text-white transition-colors underline decoration-dotted decoration-cyber-emerald/30 break-all line-clamp-1 xs:line-clamp-none">/in/souvik-chowdhury-200bb425b</a>
              </div>
              <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-3">
                <span className="text-slate-500 xs:w-24 text-[10px] md:text-xs">ROOT_GH:</span>
                <a href="https://github.com/Souvik0001" target="_blank" rel="noreferrer" className="text-cyber-emerald hover:text-white transition-colors underline decoration-dotted decoration-cyber-emerald/30 break-all">/github/Souvik0001</a>
              </div>
           </div>
           <div className="mt-8 p-3 md:p-4 border border-dashed border-cyber-emerald/30 bg-cyber-emerald/5">
              <div className="text-[9px] md:text-[10px] text-cyber-emerald/60 uppercase">System: Handshake complete. Encrypted channel ready...</div>
           </div>
        </div>
      );
    default:
      return null;
  }
}
