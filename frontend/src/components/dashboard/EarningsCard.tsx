'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Coins, TrendingUp, ArrowUpRight, Clock } from 'lucide-react';

interface EarningsCardProps {
  claimable: number;
  lifetime: number;
  pendingBatches?: number;
}

export function EarningsCard({ claimable, lifetime, pendingBatches = 3 }: EarningsCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Claimable Balance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
        className="relative overflow-hidden p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl shadow-2xl group"
      >
        {/* Animated Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-success/20 blur-[80px] rounded-full group-hover:bg-success/30 transition-colors duration-700 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-monad-purple/10 blur-[80px] rounded-full group-hover:bg-monad-purple/20 transition-colors duration-700 pointer-events-none" />
        
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="relative z-10 flex items-start justify-between mb-8">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-success/20 to-success/5 shadow-[inset_0_0_20px_rgba(0,255,163,0.2)] text-success border border-success/20">
            <Coins className="w-7 h-7" />
          </div>
          <button className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-extrabold text-[#020202] bg-success rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_#00FFA380] hover:scale-105 active:scale-95 uppercase tracking-widest drop-shadow-md">
            CLAIM <ArrowUpRight className="w-3.5 h-3.5 font-bold" />
          </button>
        </div>

        <div className="relative z-10 space-y-2 mb-8">
          <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">Claimable Balance</p>
          <div className="flex items-baseline gap-3">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter drop-shadow-md">{claimable.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
            <span className="text-2xl font-bold text-success drop-shadow-[0_0_10px_#00FFA380]">MON</span>
          </div>
        </div>

        <div className="relative z-10 mt-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-black/40 border border-white/10 shadow-inner w-fit">
          <Clock className="w-4 h-4 text-monad-purple-light animate-pulse" />
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">{pendingBatches} batches pending settlement</span>
        </div>
      </motion.div>

      {/* Lifetime Earnings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
        className="relative overflow-hidden p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl shadow-2xl group flex flex-col justify-between"
      >
        {/* Animated Glow Effects */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-monad-purple/20 blur-[80px] rounded-full group-hover:bg-monad-purple/30 transition-colors duration-700 pointer-events-none" />
        
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="relative z-10 flex items-start justify-between mb-8">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-monad-purple/20 to-monad-purple/5 shadow-[inset_0_0_20px_rgba(131,110,251,0.2)] text-monad-purple border border-monad-purple/20">
            <TrendingUp className="w-7 h-7" />
          </div>
        </div>

        <div className="relative z-10 space-y-2 mb-10 mt-6">
          <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">Lifetime Earnings</p>
          <div className="flex items-baseline gap-3">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter drop-shadow-md">{lifetime.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
            <span className="text-2xl font-bold text-monad-purple drop-shadow-[0_0_10px_#836EFB80]">MON</span>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { label: 'This Week', value: '+42.8' },
            { label: 'This Month', value: '+187.3' },
            { label: 'Avg APY', value: '~18.2%' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col justify-center items-center gap-1.5 px-3 py-4 rounded-xl bg-black/40 border border-white/10 shadow-inner group-hover:border-white/20 transition-colors duration-500">
              <span className="text-[9px] font-extrabold text-white/40 uppercase tracking-[0.2em] text-center">{stat.label}</span>
              <span className="text-base font-extrabold text-success drop-shadow-[0_0_5px_rgba(0,255,163,0.3)]">{stat.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
