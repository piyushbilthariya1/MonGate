'use client';

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'framer-motion';

const MOCK_DATA = [
  { day: 'Mon', tokens: 12400 },
  { day: 'Tue', tokens: 15600 },
  { day: 'Wed', tokens: 9800 },
  { day: 'Thu', tokens: 23000 },
  { day: 'Fri', tokens: 18900 },
  { day: 'Sat', tokens: 13200 },
  { day: 'Sun', tokens: 21000 },
];

export function UsageChart() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative overflow-hidden p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl shadow-2xl group"
    >
      {/* Animated Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[150px] bg-monad-purple/10 blur-[100px] rounded-full group-hover:bg-monad-purple/20 transition-colors duration-700 pointer-events-none" />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">Consumption History</h3>
          <p className="text-[10px] text-white/40 mt-1 uppercase tracking-[0.2em] font-bold">Daily Token Usage (7-Day Period)</p>
        </div>
        <div className="flex flex-col items-start md:items-end">
          <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em] mb-1">Total Tokens</span>
          <span className="text-3xl font-extrabold text-monad-purple drop-shadow-[0_0_15px_#836EFB60]">113.9k</span>
        </div>
      </div>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_DATA}>
            <defs>
              <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#836EFB" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#836EFB" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 600 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 600 }}
              hide
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#050505', 
                border: '1px solid rgba(255,255,255,0.05)', 
                borderRadius: '8px',
                fontSize: '12px',
                color: 'white'
              }}
              itemStyle={{ color: '#836EFB' }}
              cursor={{ stroke: '#836EFBI0', strokeWidth: 1 }}
            />
            <Area 
              type="monotone" 
              dataKey="tokens" 
              stroke="#836EFB" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTokens)" 
              animationBegin={500}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex items-center justify-between text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
        <span>Current Avg: 16,271 / Day</span>
        <span className="text-monad-purple-light underline underline-offset-4 cursor-pointer hover:text-white transition-colors">Download Detailed Logs</span>
      </div>
    </motion.div>
  );
}
