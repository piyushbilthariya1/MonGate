'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_FLOW = [
  { type: 'request', text: 'POST /v1/chat/completions' },
  { type: 'payload', text: '{ "model": "gemini-1.5-flash", "messages": [...] }' },
  { type: 'status', text: 'Proxying to MonGate Node...' },
  { type: 'response', text: '{ "id": "chatcmpl-mg1", "choices": [{ "message": { "content": "Hello! How can I help you today?" } }] }' },
];

export function Terminal() {
  const [lines, setLines] = useState<typeof MOCK_FLOW>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prev) => {
        if (prev.length >= 8) return [MOCK_FLOW[index % MOCK_FLOW.length]];
        return [...prev, MOCK_FLOW[index % MOCK_FLOW.length]];
      });
      setIndex((i) => i + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="w-full max-w-3xl mx-auto overflow-hidden rounded-2xl border border-white/10 bg-[#050505]/80 backdrop-blur-3xl shadow-2xl shadow-monad-purple/20">
      {/* Mac-style Window Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_8px_#FF5F5660]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_8px_#FFBD2E60]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_8px_#27C93F60]" />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 px-4 py-1 rounded-md bg-white/5 border border-white/5">
          <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.2em]">mongate-bridge-v1</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-white/20 font-mono">
          <span>bash</span>
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="p-6 md:p-8 font-mono text-sm md:text-base min-h-[300px] md:min-h-[350px] flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {lines.map((line, i) => (
            <motion.div
              key={`${line.type}-${i}`}
              initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
              transition={{ duration: 0.4 }}
              className="flex gap-4 items-start"
            >
              <span className={`shrink-0 mt-0.5 ${
                line.type === 'request' ? 'text-monad-purple drop-shadow-[0_0_8px_#836EFB]' :
                line.type === 'status' ? 'text-success drop-shadow-[0_0_8px_#00FFA3]' :
                'text-white/20'
              }`}>
                {line.type === 'request' ? '➜' : ' ' }
              </span>
              <span className={`leading-relaxed ${
                line.type === 'request' ? 'text-white font-bold tracking-wide' :
                line.type === 'payload' ? 'text-white/50 bg-white/5 px-2 py-0.5 rounded-md border border-white/5' :
                line.type === 'status' ? 'text-success italic font-bold tracking-wider uppercase text-xs' :
                'text-[#A394FF] bg-[#836EFB]/10 px-3 py-1.5 rounded-lg border border-[#836EFB]/20 shadow-[0_0_15px_#836EFB20]'
              }`}>
                {line.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2.5 h-6 bg-monad-purple shadow-[0_0_12px_#836EFB]"
        />
      </div>
    </div>
  );
}
