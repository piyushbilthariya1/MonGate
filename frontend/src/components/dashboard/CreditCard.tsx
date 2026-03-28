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
      className="relative overflow-hidden p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md"
    >
      {/* Glow Effect */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-monad-purple/20 blur-3xl rounded-full" />
      
      <div className="flex items-start justify-between mb-8">
        <div className="p-3 rounded-xl bg-monad-purple/10 text-monad-purple">
          <Wallet className="w-6 h-6" />
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold text-monad-purple hover:text-monad-purple-light transition-colors">
          TOP UP <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-1 mb-8">
        <p className="text-sm font-medium text-white/40 uppercase tracking-widest">Available Credits</p>
        <div className="flex items-baseline gap-2">
          <h2 className="text-4xl font-bold text-white tracking-tight">{balance.toLocaleString()}</h2>
          <span className="text-xl font-bold text-monad-purple">MON</span>
        </div>
      </div>

      <div className="flex items-center gap-4 py-3 px-4 rounded-xl bg-black/40 border border-white/5">
        <div className="p-2 rounded-lg bg-success/20 text-success">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">Current Value</span>
          <span className="text-sm font-mono text-white/80">${(balance * parseFloat(monadPrice)).toFixed(2)} USD</span>
        </div>
      </div>
    </motion.div>
  );
}
