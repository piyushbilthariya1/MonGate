'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Shield, Check, Eye, EyeOff, Loader2 } from 'lucide-react';

const PROVIDERS = [
  { id: 'google_gemini', name: 'Google Gemini', icon: '✦', color: '#4285F4', models: 'gemini-1.5-pro, flash' },
  { id: 'openai', name: 'OpenAI', icon: '◉', color: '#10A37F', models: 'gpt-4o, gpt-4o-mini' },
  { id: 'anthropic', name: 'Anthropic', icon: '◈', color: '#D97757', models: 'claude-3.5-sonnet, haiku' },
];

const STEPS = ['Provider', 'API Key', 'Spend Limit', 'Confirm'];

export function StakingWizard() {
  const [step, setStep] = useState(0);
  const [provider, setProvider] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [spendLimit, setSpendLimit] = useState(500);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const selectedProvider = PROVIDERS.find((p) => p.id === provider);

  const canAdvance = () => {
    if (step === 0) return !!provider;
    if (step === 1) return apiKey.length >= 10;
    if (step === 2) return spendLimit > 0;
    return true;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate staking submission
    await new Promise((r) => setTimeout(r, 2500));
    setIsSubmitting(false);
    setIsComplete(true);
  };

  const resetWizard = () => {
    setStep(0);
    setProvider(null);
    setApiKey('');
    setSpendLimit(500);
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden p-12 rounded-[2rem] border border-success/30 bg-gradient-to-br from-success/10 via-success/5 to-transparent backdrop-blur-xl shadow-2xl text-center group"
      >
        {/* Animated Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-success/20 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="relative z-10 w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(0,255,163,0.3)] border border-success/40">
          <Check className="w-10 h-10 text-success drop-shadow-[0_0_5px_rgba(0,255,163,0.8)]" />
        </div>
        <h3 className="relative z-10 text-3xl font-extrabold text-white mb-2 tracking-tight">Key Staked Successfully</h3>
        <p className="relative z-10 text-[10px] uppercase font-bold tracking-[0.2em] text-white/50 mb-10">
          Your <span className="text-success">{selectedProvider?.name}</span> key has been encrypted and added to the active pool.
        </p>
        <button
          onClick={resetWizard}
          className="relative z-10 px-8 py-4 text-[10px] uppercase font-extrabold tracking-widest text-[#020202] bg-success rounded-xl hover:shadow-[0_0_25px_#00FFA380] hover:scale-105 active:scale-95 transition-all duration-300 drop-shadow-md"
        >
          Stake Another Key
        </button>
      </motion.div>
    );
  }

  return (
    <div className="relative overflow-hidden p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl shadow-2xl group">
      {/* Animated Glow Effects */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-monad-purple/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-monad-purple/20 transition-colors duration-1000" />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Stake New Key</h3>
          <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Step {step + 1} of {STEPS.length}</p>
        </div>
        <div className="flex items-center gap-1">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step
                    ? 'bg-success text-obsidian'
                    : i === step
                    ? 'bg-monad-purple text-white shadow-[0_0_12px_#836EFB60]'
                    : 'bg-white/5 text-white/20'
                }`}
              >
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-6 h-px ${i < step ? 'bg-success' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="min-h-[200px]"
        >
          {/* Step 0: Provider Selection */}
          {step === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PROVIDERS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProvider(p.id)}
                  className={`relative p-5 rounded-xl border text-left transition-all ${
                    provider === p.id
                      ? 'border-monad-purple bg-monad-purple/10 shadow-[0_0_16px_#836EFB20]'
                      : 'border-white/5 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {provider === p.id && (
                    <div className="absolute top-3 right-3">
                      <Check className="w-4 h-4 text-monad-purple" />
                    </div>
                  )}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-3 font-bold"
                    style={{ backgroundColor: `${p.color}20`, color: p.color }}
                  >
                    {p.icon}
                  </div>
                  <h4 className="font-bold text-white mb-1">{p.name}</h4>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">{p.models}</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 1: API Key Input */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-monad-purple/5 border border-monad-purple/20">
                <Shield className="w-5 h-5 text-monad-purple shrink-0" />
                <p className="text-xs text-white/60">
                  Your key will be encrypted with <span className="font-bold text-monad-purple-light">AES-256-GCM</span> before submission. It is never stored in plaintext.
                </p>
              </div>
              <label className="block text-sm font-bold text-white/60 uppercase tracking-widest">
                {selectedProvider?.name} API Key
              </label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={`Enter your ${selectedProvider?.name} API key`}
                  className="w-full px-4 py-4 pr-12 rounded-xl bg-black/40 border border-white/10 font-mono text-sm text-monad-purple-light placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-monad-purple/40 focus:border-monad-purple/40 transition-all"
                />
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white/30 hover:text-white transition-colors"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-white/20 uppercase tracking-widest">
                Minimum 10 characters • Key will be validated after submission
              </p>
            </div>
          )}

          {/* Step 2: Spend Limit */}
          {step === 2 && (
            <div className="space-y-6">
              <label className="block text-sm font-bold text-white/60 uppercase tracking-widest">
                Monthly Spend Limit (MON)
              </label>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-white">{spendLimit}</span>
                <span className="text-2xl font-bold text-monad-purple">MON</span>
              </div>
              <input
                type="range"
                min={50}
                max={5000}
                step={50}
                value={spendLimit}
                onChange={(e) => setSpendLimit(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-monad-purple bg-white/10"
              />
              <div className="flex justify-between text-[10px] text-white/20 font-bold uppercase tracking-widest">
                <span>50 MON</span>
                <span>5,000 MON</span>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">
                Once this limit is reached, your key will be temporarily removed from the active pool until the next billing cycle.
              </p>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">Stake Summary</h4>
              <div className="space-y-3">
                {[
                  { label: 'Provider', value: selectedProvider?.name || '' },
                  { label: 'Key', value: `${apiKey.slice(0, 6)}${'•'.repeat(12)}${apiKey.slice(-4)}` },
                  { label: 'Monthly Limit', value: `${spendLimit} MON` },
                  { label: 'Encryption', value: 'AES-256-GCM' },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-black/30 border border-white/5"
                  >
                    <span className="text-xs font-bold text-white/30 uppercase tracking-widest">{row.label}</span>
                    <span className="text-sm font-mono text-monad-purple-light">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
        {step > 0 ? (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-white/40 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        ) : (
          <div />
        )}

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canAdvance()}
            className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-monad-purple rounded-lg transition-all hover:bg-monad-purple-light hover:shadow-[0_0_20px_#836EFB] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-monad-purple"
          >
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-4 text-[10px] font-extrabold uppercase tracking-widest text-obsidian bg-success rounded-xl transition-all hover:shadow-[0_0_25px_#00FFA380] hover:scale-105 active:scale-95 disabled:opacity-50 drop-shadow-md relative z-10"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Encrypting & Staking...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" /> Confirm & Stake
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
