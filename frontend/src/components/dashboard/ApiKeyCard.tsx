'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Copy, Check, Lock, ArrowUpRight } from 'lucide-react';

interface ApiKeyCardProps {
  apiKey: string;
}

export function ApiKeyCard({ apiKey }: ApiKeyCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      className="relative overflow-hidden p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl shadow-2xl group flex flex-col justify-between"
    >
      {/* Animated Glow Effects */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-monad-purple/20 blur-[80px] rounded-full group-hover:bg-monad-purple/30 transition-colors duration-700 pointer-events-none" />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-white/10 to-transparent shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] text-white border border-white/10">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white tracking-tight">API Master Key</h3>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mt-1">AES-256 Vaulted</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsVisible(!isVisible)}
            className={`p-2.5 rounded-xl border transition-all duration-300 ${isVisible ? 'bg-monad-purple/20 border-monad-purple/40 text-monad-purple' : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10'}`}
          >
            {isVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          <button 
            onClick={handleCopy}
            className={`p-2.5 rounded-xl border transition-all duration-300 ${copied ? 'bg-success/20 border-success/40 text-success' : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10'}`}
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full mb-6">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-3">Your Secret Token</p>
        <div className="relative h-16 w-full flex items-center px-5 rounded-2xl bg-black/50 border border-monad-purple/20 overflow-hidden shadow-inner group-hover:border-monad-purple/40 transition-colors duration-500">
          <div className={`flex-grow font-mono text-base tracking-widest truncate pr-8 ${isVisible ? 'text-monad-purple-light drop-shadow-[0_0_8px_#836EFB80]' : 'text-white/20'}`}>
            {isVisible ? apiKey : '••••••••••••••••••••••••••••••••••••••••'}
          </div>
          
          <AnimatePresence>
            {!isVisible && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-x-0 inset-y-0 bg-black/80 backdrop-blur-md flex items-center justify-center pointer-events-none"
              >
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <Lock className="w-3.5 h-3.5 text-monad-purple" />
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">Hidden for Security</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="relative z-10 mt-auto pt-4 border-t border-white/10 text-[10px] text-white/40 leading-relaxed uppercase tracking-widest font-medium flex items-center justify-between">
        <span>Use as Bearer token in headers</span>
        <button className="text-monad-purple hover:text-monad-purple-light transition-colors flex items-center gap-1">
          Rotate <ArrowUpRight className="w-3 h-3" />
        </button>
      </p>
    </motion.div>
  );
}
