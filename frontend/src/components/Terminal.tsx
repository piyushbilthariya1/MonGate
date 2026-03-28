'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_FLOW = [
  { type: 'request', text: 'POST /v1/chat/completions' },
  { type: 'payload', text: '{ "model": "gemini-1.5-flash", "messages": [...] }' },
  { type: 'status', text: 'Proxying to AntiGravity Node...' },
  { type: 'response', text: '{ "id": "chatcmpl-ag1", "choices": [{ "message": { "content": "Hello! How can I help you today?" } }] }' },
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
    <div className="w-full max-w-2xl mx-auto overflow-hidden rounded-xl border border-white/10 bg-[#050505] shadow-2xl shadow-monad-purple/20">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
        <span className="ml-2 text-xs font-mono text-white/40 uppercase tracking-widest">antigravity-bridge-v1</span>
      </div>
      
      <div className="p-6 font-mono text-sm min-h-[300px] flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {lines.map((line, i) => (
            <motion.div
              key={`${line.type}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex gap-3"
            >
              <span className={`shrink-0 ${
                line.type === 'request' ? 'text-monad-purple' :
                line.type === 'status' ? 'text-success' :
                'text-white/40'
              }`}>
                {line.type === 'request' ? '➜' : ' ' }
              </span>
              <span className={
                line.type === 'request' ? 'text-white font-bold' :
                line.type === 'payload' ? 'text-white/60' :
                line.type === 'status' ? 'text-success' :
                'text-monad-purple-light underline underline-offset-4'
              }>
                {line.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-5 bg-monad-purple/60"
        />
      </div>
    </div>
  );
}
