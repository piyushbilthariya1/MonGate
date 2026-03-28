'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface Transaction {
  id: string;
  model: string;
  provider: string;
  tokensIn: number;
  tokensOut: number;
  cost: number;
  txHash: string | null;
  status: 'settled' | 'pending' | 'batched';
  timestamp: string;
}

const MOCK_TXS: Transaction[] = [
  { id: 'log_001', model: 'gemini-1.5-flash', provider: 'Google', tokensIn: 120, tokensOut: 340, cost: 0.023, txHash: '0x1a2b3c...7d8e9f', status: 'settled', timestamp: '2 min ago' },
  { id: 'log_002', model: 'gpt-4o', provider: 'OpenAI', tokensIn: 85, tokensOut: 210, cost: 0.045, txHash: '0x4d5e6f...1a2b3c', status: 'settled', timestamp: '8 min ago' },
  { id: 'log_003', model: 'gemini-1.5-pro', provider: 'Google', tokensIn: 200, tokensOut: 580, cost: 0.038, txHash: null, status: 'batched', timestamp: '12 min ago' },
  { id: 'log_004', model: 'claude-3.5-sonnet', provider: 'Anthropic', tokensIn: 150, tokensOut: 420, cost: 0.056, txHash: null, status: 'pending', timestamp: '18 min ago' },
  { id: 'log_005', model: 'gemini-1.5-flash', provider: 'Google', tokensIn: 60, tokensOut: 180, cost: 0.012, txHash: '0x7g8h9i...4d5e6f', status: 'settled', timestamp: '25 min ago' },
  { id: 'log_006', model: 'gpt-4o', provider: 'OpenAI', tokensIn: 310, tokensOut: 890, cost: 0.098, txHash: '0xa1b2c3...7g8h9i', status: 'settled', timestamp: '32 min ago' },
  { id: 'log_007', model: 'gemini-1.5-flash', provider: 'Google', tokensIn: 45, tokensOut: 120, cost: 0.008, txHash: null, status: 'pending', timestamp: '41 min ago' },
];

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  settled: { bg: 'bg-success/10', text: 'text-success' },
  batched: { bg: 'bg-monad-purple/10', text: 'text-monad-purple-light' },
  pending: { bg: 'bg-yellow-500/10', text: 'text-yellow-400' },
};

export function TransactionTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl shadow-2xl overflow-hidden group"
    >
      {/* Animated Glow Effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-success/5 blur-[100px] rounded-full group-hover:bg-success/10 transition-colors duration-700 pointer-events-none" />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-white/[0.01]">
        <div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">Transaction History</h3>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mt-1">Recent outbound calls with on-chain settlement</p>
        </div>
        <button className="flex items-center gap-2 text-[10px] font-bold text-monad-purple uppercase tracking-[0.2em] hover:text-monad-purple-light transition-colors">
          View All <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              {['Model', 'Tokens', 'Cost', 'Status', 'Tx Hash', 'Time'].map((h) => (
                <th key={h} className="px-6 py-3 text-[10px] font-bold text-white/20 uppercase tracking-widest text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_TXS.map((tx, i) => {
              const style = STATUS_STYLES[tx.status];
              return (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-mono font-medium text-white/80">{tx.model}</span>
                      <span className="text-[9px] text-white/30 uppercase tracking-widest">{tx.provider}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-mono text-white/60">{(tx.tokensIn + tx.tokensOut).toLocaleString()}</span>
                      <span className="text-[9px] text-white/20">{tx.tokensIn}↑ {tx.tokensOut}↓</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-monad-purple-light">{tx.cost.toFixed(3)} MON</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${style.bg} ${style.text}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {tx.txHash ? (
                      <a
                        href={`https://explorer.monad.xyz/tx/${tx.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs text-monad-purple-light hover:text-white transition-colors group"
                      >
                        {tx.txHash}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <span className="text-xs text-white/15 italic">Awaiting batch</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-white/30">{tx.timestamp}</span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
