'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, ArrowUpRight } from 'lucide-react';

interface CreditCardProps {
  balance: number;
  monadPrice?: string;
}

export function CreditCard({ balance, monadPrice = '1.24' }: CreditCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      className="relative overflow-hidden p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl shadow-2xl group"
    >
      {/* Animated Glow Effects */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-monad-purple/30 blur-[80px] rounded-full group-hover:bg-monad-purple/40 transition-colors duration-700" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-success/10 blur-[80px] rounded-full group-hover:bg-success/20 transition-colors duration-700" />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 flex items-start justify-between mb-12">
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-monad-purple/20 to-monad-purple/5 shadow-[inset_0_0_20px_rgba(131,110,251,0.2)] text-monad-purple border border-monad-purple/20">
          <Wallet className="w-7 h-7" />
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-monad-purple hover:border-monad-purple hover:shadow-[0_0_20px_#836EFB80] transition-all duration-300 uppercase tracking-wider backdrop-blur-md">
          Top Up <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="relative z-10 space-y-2 mb-10">
        <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">Available Credits</p>
        <div className="flex items-baseline gap-3">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter drop-shadow-md">
            {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <span className="text-2xl font-bold text-monad-purple-light drop-shadow-[0_0_10px_#836EFB80]">MON</span>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between py-4 px-5 rounded-2xl bg-black/40 border border-white/10 shadow-inner">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-success/20 text-success shadow-[0_0_10px_rgba(0,255,163,0.2)]">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-white/50 uppercase font-bold tracking-[0.2em]">Fiat Value</span>
            <span className="text-sm font-mono text-white font-medium">${(balance * parseFloat(monadPrice)).toFixed(2)} USD</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-white/50 uppercase font-bold tracking-[0.2em]">Monad Price</span>
          <span className="text-sm font-mono text-white/80">${monadPrice}</span>
        </div>
      </div>
    </motion.div>
  );
}
