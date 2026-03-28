'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, Layers, Zap } from 'lucide-react';

const STATS = [
  { icon: Layers, label: 'Batches Settled', value: '2,847', color: '#836EFB' },
  { icon: Users, label: 'Active Stakers', value: '184', color: '#00FFA3' },
  { icon: Zap, label: 'API Calls Today', value: '127.4k', color: '#A394FF' },
  { icon: Activity, label: 'Avg Latency', value: '24ms', color: '#00FFA3' },
  { icon: Layers, label: 'Total Keys Vaulted', value: '512', color: '#836EFB' },
  { icon: Users, label: 'Total Consumers', value: '1,293', color: '#A394FF' },
];

export function LiveTicker() {
  // Double the items for seamless infinite scroll
  const items = [...STATS, ...STATS, ...STATS, ...STATS]; // Quarduple for better infinite scroll on ultra-wide monitors

  return (
    <div className="relative w-full overflow-hidden border-b border-white/10 bg-black/40 backdrop-blur-xl py-4 z-50">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-obsidian to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-obsidian to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center gap-6 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 45, ease: 'linear', repeat: Infinity }}
      >
        {items.map((stat, i) => (
          <div key={`${stat.label}-${i}`} className="flex items-center gap-2.5 shrink-0 px-5 py-2 rounded-full bg-white/[0.03] border border-white/5 shadow-inner">
            <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
            <span className="text-[10px] font-extrabold text-white/50 uppercase tracking-[0.15em]">{stat.label}</span>
            <span className="text-xs font-bold font-mono drop-shadow-[0_0_8px_currentColor]" style={{ color: stat.color }}>{stat.value}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

