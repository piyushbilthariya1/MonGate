'use client';

import React from 'react';
import { motion } from 'framer-motion';

type StatusType = 'active' | 'cooldown' | 'blacklisted' | 'inactive';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  size?: 'sm' | 'md';
}

const STATUS_CONFIG: Record<StatusType, { color: string; glow: string; label: string }> = {
  active:      { color: '#00FFA3', glow: '#00FFA340', label: 'Active' },
  cooldown:    { color: '#FBBF24', glow: '#FBBF2440', label: 'Cooldown' },
  blacklisted: { color: '#EF4444', glow: '#EF444440', label: 'Blacklisted' },
  inactive:    { color: '#6B7280', glow: '#6B728040', label: 'Inactive' },
};

export function StatusBadge({ status, label, size = 'md' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const dotSize = size === 'sm' ? 'w-2 h-2' : 'w-3 h-3';

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <motion.div
          animate={status === 'active' ? { scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className={`absolute inset-0 rounded-full ${dotSize}`}
          style={{ backgroundColor: config.glow }}
        />
        <div
          className={`rounded-full ${dotSize}`}
          style={{ backgroundColor: config.color, boxShadow: `0 0 8px ${config.glow}` }}
        />
      </div>
      <span
        className={`font-bold uppercase tracking-widest ${
          size === 'sm' ? 'text-[9px]' : 'text-[10px]'
        }`}
        style={{ color: config.color }}
      >
        {label || config.label}
      </span>
    </div>
  );
}
