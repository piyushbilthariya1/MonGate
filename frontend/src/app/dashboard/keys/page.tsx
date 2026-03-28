'use client';

import React from 'react';
import { ChatPlayground } from '@/components/dashboard/ChatPlayground';
import { TransactionTable } from '@/components/dashboard/TransactionTable';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';

export default function ApiKeysConsole() {
  return (
    <div className="flex flex-col gap-10 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-monad-purple mb-1 text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            <Database className="w-4 h-4" />
            <span>Interactive Console</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-white tracking-tight"
          >
            Playground & Logs
          </motion.h1>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]"
        >
          <span>Bridge Status: <span className="text-success drop-shadow-[0_0_5px_rgba(0,255,163,0.5)]">Online</span></span>
          <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_#10B981] animate-pulse" />
        </motion.div>
      </header>

      {/* Chat Playground */}
      <ChatPlayground />

      {/* Transaction History */}
      <TransactionTable />
    </div>
  );
}
