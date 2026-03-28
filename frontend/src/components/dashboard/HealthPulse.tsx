'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StatusBadge } from './StatusBadge';
import { Activity, BarChart3, Clock, Trash2 } from 'lucide-react';

type KeyStatus = 'active' | 'cooldown' | 'blacklisted' | 'inactive';

interface StakedKey {
  id: string;
  provider: string;
  providerIcon: string;
  providerColor: string;
  status: KeyStatus;
  usage: number;
  limit: number;
  lastUsed: string;
}

const MOCK_KEYS: StakedKey[] = [
  { id: 'sk_001', provider: 'Google Gemini', providerIcon: '✦', providerColor: '#4285F4', status: 'active', usage: 1240, limit: 2000, lastUsed: '2 min ago' },
  { id: 'sk_002', provider: 'OpenAI', providerIcon: '◉', providerColor: '#10A37F', status: 'active', usage: 890, limit: 1500, lastUsed: '8 min ago' },
  { id: 'sk_003', provider: 'Anthropic', providerIcon: '◈', providerColor: '#D97757', status: 'cooldown', usage: 500, limit: 500, lastUsed: '23 min ago' },
  { id: 'sk_004', provider: 'Google Gemini', providerIcon: '✦', providerColor: '#4285F4', status: 'active', usage: 320, limit: 3000, lastUsed: '1 min ago' },
  { id: 'sk_005', provider: 'OpenAI', providerIcon: '◉', providerColor: '#10A37F', status: 'blacklisted', usage: 0, limit: 1000, lastUsed: '2 days ago' },
  { id: 'sk_006', provider: 'Google Gemini', providerIcon: '✦', providerColor: '#4285F4', status: 'active', usage: 1780, limit: 2500, lastUsed: '30 sec ago' },
];

export function HealthPulse() {
  const activeCount = MOCK_KEYS.filter((k) => k.status === 'active').length;

  return (
    <div className="relative overflow-hidden p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl shadow-2xl group">
      {/* Animated Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[150px] bg-monad-purple/10 blur-[100px] rounded-full group-hover:bg-monad-purple/15 transition-colors duration-700 pointer-events-none" />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-white/10 to-transparent shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] text-white border border-white/10 group-hover:bg-white/10 transition-colors duration-500">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white tracking-tight">Health Pulse</h3>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mt-1">
              <span className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{activeCount}/{MOCK_KEYS.length}</span> nodes operational
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[10px] font-extrabold uppercase tracking-[0.2em] px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 shadow-inner">
          <span className="flex items-center gap-1.5 text-success"><span className="w-2 h-2 rounded-full bg-success drop-shadow-[0_0_8px_#10B981] animate-pulse" /> Active</span>
          <span className="flex items-center gap-1.5 text-yellow-400"><span className="w-2 h-2 rounded-full bg-yellow-400 drop-shadow-[0_0_8px_#FACC15]" /> Cooldown</span>
          <span className="flex items-center gap-1.5 text-red-400"><span className="w-2 h-2 rounded-full bg-red-400 drop-shadow-[0_0_8px_#F87171]" /> Blocked</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_KEYS.map((key, i) => {
          const usagePercent = key.limit > 0 ? (key.usage / key.limit) * 100 : 0;

          return (
            <motion.div
              key={key.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`relative p-4 rounded-xl border transition-all ${
                key.status === 'active'
                  ? 'border-white/5 bg-white/[0.03] hover:bg-white/[0.06]'
                  : key.status === 'cooldown'
                  ? 'border-yellow-500/10 bg-yellow-500/[0.02]'
                  : 'border-red-500/10 bg-red-500/[0.02] opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: `${key.providerColor}20`, color: key.providerColor }}
                  >
                    {key.providerIcon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{key.provider}</p>
                    <p className="text-[9px] font-mono text-white/20">{key.id}</p>
                  </div>
                </div>
                <StatusBadge status={key.status} size="sm" />
              </div>

              {/* Usage Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1 text-[9px] font-bold text-white/30 uppercase tracking-widest">
                    <BarChart3 className="w-3 h-3" /> Usage
                  </div>
                  <span className="text-[9px] font-mono text-white/40">
                    {key.usage}/{key.limit} MON
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${usagePercent}%` }}
                    transition={{ duration: 1, delay: i * 0.06, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      usagePercent > 90
                        ? 'bg-red-400'
                        : usagePercent > 70
                        ? 'bg-yellow-400'
                        : 'bg-monad-purple'
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[9px] text-white/20 font-medium">
                  <Clock className="w-3 h-3" /> {key.lastUsed}
                </div>
                {key.status !== 'blacklisted' && (
                  <button className="p-1.5 text-white/10 hover:text-red-400 transition-colors rounded-md hover:bg-red-400/10">
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
