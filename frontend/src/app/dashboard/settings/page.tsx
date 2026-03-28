'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { Settings as SettingsIcon, Shield, Bell, Globe, LogOut, Copy, Check, ExternalLink } from 'lucide-react';

export default function SettingsPage() {
  const { address, logout } = useAuth();
  const [copiedAddr, setCopiedAddr] = React.useState(false);

  const handleCopyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopiedAddr(true);
    setTimeout(() => setCopiedAddr(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      <header>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-monad-purple mb-1 text-[10px] font-bold uppercase tracking-[0.2em]"
        >
          <SettingsIcon className="w-4 h-4" />
          <span>System Config</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-white tracking-tight"
        >
          Account Settings
        </motion.h1>
      </header>

      {/* Wallet Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl shadow-2xl group"
      >
        {/* Animated Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-monad-purple/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-monad-purple/20 transition-colors duration-1000" />
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="relative z-10 flex items-center gap-4 mb-8">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-white/10 to-transparent shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] text-white border border-white/10">
            <Shield className="w-6 h-6 text-monad-purple" />
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">Wallet & Identity</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-white/5">
            <div>
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1">Connected Wallet</span>
              <span className="font-mono text-sm text-monad-purple-light break-all">{address || '0x...'}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyAddress}
                className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all"
              >
                {copiedAddr ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              </button>
              <a
                href={`https://explorer.monad.xyz/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-white/30 hover:text-monad-purple hover:bg-monad-purple/10 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-white/5">
            <div>
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1">Network</span>
              <span className="text-sm text-white/70 font-medium">Monad Testnet</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_6px_#00FFA3]" />
              <span className="text-[10px] font-bold text-success uppercase tracking-widest">Connected</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-white/5">
            <div>
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1">Session Status</span>
              <span className="text-sm text-white/70 font-medium">Authenticated via Wallet Signature</span>
            </div>
            <span className="text-[10px] font-bold text-monad-purple-light uppercase tracking-widest">Active</span>
          </div>
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl shadow-2xl group"
      >
        {/* Animated Glow Effects */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-success/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-success/10 transition-colors duration-1000" />
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="relative z-10 flex items-center gap-4 mb-8">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-white/10 to-transparent shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] text-white border border-white/10">
            <Bell className="w-6 h-6 text-monad-purple" />
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">Preferences</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Email Notifications', description: 'Receive alerts for key health changes and earnings', enabled: true },
            { label: 'Auto-Claim Rewards', description: 'Automatically claim earnings when balance exceeds 100 MON', enabled: false },
            { label: 'Zero-Knowledge Logging', description: 'Never store request/response bodies, only token counts', enabled: true },
          ].map((pref) => (
            <div key={pref.label} className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-white/5">
              <div>
                <span className="text-sm font-bold text-white/80 block">{pref.label}</span>
                <span className="text-[10px] text-white/30 uppercase tracking-widest">{pref.description}</span>
              </div>
              <button
                className={`relative w-12 h-7 rounded-full transition-all ${
                  pref.enabled ? 'bg-monad-purple' : 'bg-white/10'
                }`}
              >
                <motion.div
                  animate={{ x: pref.enabled ? 20 : 2 }}
                  className="absolute top-1 left-0 w-5 h-5 rounded-full bg-white shadow-md"
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* API Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl shadow-2xl group"
      >
        {/* Animated Glow Effects */}
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-monad-purple/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-monad-purple/20 transition-colors duration-1000" />
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="relative z-10 flex items-center gap-4 mb-8">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-white/10 to-transparent shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] text-white border border-white/10">
            <Globe className="w-6 h-6 text-monad-purple" />
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">API Configuration</h3>
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-black/30 border border-white/5">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-2">Bridge Endpoint</span>
            <code className="text-sm font-mono text-monad-purple-light">https://api.mongate.xyz/v1/chat/completions</code>
          </div>
          <div className="p-4 rounded-xl bg-black/30 border border-white/5">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-2">SDK Installation</span>
            <code className="text-sm font-mono text-white/60">npm install @mongate/sdk</code>
          </div>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative overflow-hidden p-8 rounded-[2rem] border border-red-500/10 bg-gradient-to-br from-red-500/5 via-white/[0.01] to-transparent backdrop-blur-xl shadow-2xl group"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-red-500/10 transition-colors" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <h3 className="relative z-10 text-xl font-extrabold text-red-400 mb-2 tracking-tight">Danger Zone</h3>
        <p className="relative z-10 text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 mb-8 leading-relaxed">
          Signing out will clear your local session data entirely. You will need to re-authenticate with your wallet to regain access.
        </p>
        <button
          onClick={logout}
          className="relative z-10 flex items-center gap-2 px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-extrabold text-red-100 bg-red-400/20 border border-red-500/30 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 drop-shadow-md"
        >
          <LogOut className="w-4 h-4" /> Terminate Session
        </button>
      </motion.div>
    </div>
  );
}
