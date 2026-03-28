'use client';

import React from 'react';
import { CreditCard } from '@/components/dashboard/CreditCard';
import { ApiKeyCard } from '@/components/dashboard/ApiKeyCard';
import { UsageChart } from '@/components/dashboard/UsageChart';
import { motion } from 'framer-motion';
import { ExternalLink, Terminal as TerminalIcon, Sparkles } from 'lucide-react';

export default function ConsumerOverview() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-monad-purple mb-1 text-sm font-bold uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Consumer Portal</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-white tracking-tight"
          >
            Dashboard Overview
          </motion.h1>
        </div>
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="flex items-center gap-3 text-xs font-bold text-white/40 uppercase tracking-widest"
        >
          <span>Monad Testnet</span>
          <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_#10B981]" />
        </motion.div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CreditCard balance={1245.50} />
        <ApiKeyCard apiKey="mk_vault_7729_a3d2e1f4b9c8d7e6" />
      </div>

      {/* Chart Section */}
      <div className="w-full">
        <UsageChart />
      </div>

      {/* Quick Actions / Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* API Docs Panel */}
        <div className="relative overflow-hidden p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl shadow-xl flex flex-col gap-6 group cursor-pointer hover:border-monad-purple/30 hover:scale-[1.01] transition-all duration-300">
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-monad-purple/10 blur-[50px] rounded-full group-hover:bg-monad-purple/20 transition-colors duration-700 pointer-events-none" />

          <div className="relative z-10 p-4 rounded-2xl bg-monad-purple/10 text-monad-purple w-fit group-hover:bg-monad-purple group-hover:text-white group-hover:shadow-[0_0_20px_#836EFB80] transition-all duration-300 border border-monad-purple/20">
            <TerminalIcon className="w-7 h-7" />
          </div>
          <div className="relative z-10">
            <h4 className="font-extrabold text-white text-lg tracking-tight mb-2">API SDK Setup</h4>
            <p className="text-xs text-white/40 leading-relaxed uppercase tracking-[0.15em] font-medium">Integrate MonGate dynamically in your local environment. Works out-of-the-box with OpenAI-compatible clients.</p>
          </div>
          <div className="relative z-10 mt-auto flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-[10px] font-bold text-monad-purple uppercase tracking-[0.2em] group-hover:text-monad-purple-light transition-colors">View Documentation</span>
            <ExternalLink className="w-4 h-4 text-monad-purple group-hover:text-monad-purple-light transition-colors" />
          </div>
        </div>

        {/* Proxy Engine Status */}
        <div className="md:col-span-2 relative overflow-hidden p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl shadow-xl flex flex-col justify-center group hover:border-success/30 hover:scale-[1.01] transition-all duration-300">
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-success/5 blur-[60px] rounded-full group-hover:bg-success/10 transition-colors duration-700 pointer-events-none" />

          <div className="relative z-10 flex items-end justify-between mb-8">
            <div>
              <h4 className="font-extrabold text-white text-lg tracking-tight">Monad Proxy Engine</h4>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Real-time bridge throughput</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-success/10 border border-success/30">
              <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_#10B981] animate-pulse" />
              <span className="text-[10px] font-extrabold text-success uppercase tracking-[0.3em] drop-shadow-[0_0_5px_rgba(0,255,163,0.5)]">Operational</span>
            </div>
          </div>

          <div className="relative z-10 flex gap-1.5 h-16 items-end mt-4">
            {[...Array(40)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ height: 4 }}
                animate={{ height: [8, 24, 16, 40, 8][i % 5] * (1 + Math.random() * 0.5) }}
                transition={{ repeat: Infinity, duration: 1.5 + Math.random(), ease: "easeInOut" }}
                className={`flex-grow rounded-t-sm ${i % 3 === 0 ? 'bg-success/60 shadow-[0_0_8px_rgba(0,255,163,0.5)]' : 'bg-success/20'}`}
              />
            ))}
          </div>

          <div className="relative z-10 mt-6 flex items-center justify-between pt-4 border-t border-white/10">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
              Global Node Latency
            </p>
            <p className="text-[10px] font-mono text-white/80 border border-white/10 bg-black/40 px-3 py-1.5 rounded-lg shadow-inner">
              Avg: <span className="text-success font-bold text-xs ml-1">24ms</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
