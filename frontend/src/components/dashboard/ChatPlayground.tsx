'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, ChevronDown, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  tokens?: number;
  latency?: number;
}

const MODELS = [
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', icon: '✦', color: '#4285F4' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', icon: '✦', color: '#4285F4' },
  { id: 'gpt-4o', name: 'GPT-4o', icon: '◉', color: '#10A37F' },
  { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', icon: '◈', color: '#D97757' },
];

const MOCK_RESPONSES: Record<string, string> = {
  default: "Hello! I'm responding through the MonGate Bridge proxy. Your request was routed through an encrypted staker key, processed in 24ms, and settled on Monad. How can I help you today?",
  hello: "Hey there! 👋 I'm running through MonGate's decentralized API bridge. The request was proxied through an active staker key with AES-256 encryption. Everything is settled on Monad testnet!",
  explain: "MonGate is a decentralized AI API marketplace. Stakers provide their API keys to a secure vault (encrypted with AES-256-GCM). Consumers can then use any AI model through a single unified endpoint. All usage is tracked and settled on-chain via Monad's high-throughput settlement layer.",
};

export function ChatPlayground() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Simulate API response with realistic delay
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    const lower = input.toLowerCase();
    let responseText = MOCK_RESPONSES.default;
    if (lower.includes('hello') || lower.includes('hi')) responseText = MOCK_RESPONSES.hello;
    if (lower.includes('explain') || lower.includes('what is') || lower.includes('how')) responseText = MOCK_RESPONSES.explain;

    const assistantMsg: Message = {
      id: `msg_${Date.now()}_resp`,
      role: 'assistant',
      content: responseText,
      model: selectedModel.name,
      tokens: Math.floor(50 + Math.random() * 200),
      latency: Math.floor(18 + Math.random() * 40),
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  return (
    <div className="relative flex flex-col rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl shadow-2xl overflow-hidden h-[600px] group">
      {/* Animated Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-monad-purple/10 blur-[100px] rounded-full group-hover:bg-monad-purple/20 transition-colors duration-700 pointer-events-none" />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-white/10 to-transparent shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] text-monad-purple border border-white/10">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight">API Playground</h3>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mt-0.5">Live proxy testing</p>
          </div>
        </div>

        {/* Model Selector */}
        <div className="relative">
          <button
            onClick={() => setIsModelOpen(!isModelOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-black/30 text-sm font-medium text-white/70 hover:bg-white/5 transition-all"
          >
            <span style={{ color: selectedModel.color }}>{selectedModel.icon}</span>
            {selectedModel.name}
            <ChevronDown className={`w-4 h-4 text-white/30 transition-transform ${isModelOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isModelOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute right-0 top-full mt-2 w-56 py-2 rounded-xl border border-white/10 bg-[#0A0A0A] shadow-2xl z-10"
              >
                {MODELS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { setSelectedModel(m); setIsModelOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-all ${
                      selectedModel.id === m.id ? 'bg-monad-purple/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span style={{ color: m.color }}>{m.icon}</span>
                    {m.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 scrollbar-thin">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4 opacity-40">
            <Bot className="w-12 h-12 text-monad-purple" />
            <div>
              <p className="text-sm font-bold text-white">Start a conversation</p>
              <p className="text-xs text-white/40 mt-1">Messages are proxied through the MonGate bridge</p>
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-monad-purple/20 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-monad-purple" />
                </div>
              )}
              <div className={`max-w-[75%] ${msg.role === 'user' ? 'ml-auto' : ''}`}>
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-monad-purple text-white rounded-br-md'
                      : 'bg-white/5 text-white/80 border border-white/5 rounded-bl-md'
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === 'assistant' && msg.tokens && (
                  <div className="flex items-center gap-3 mt-1.5 text-[9px] font-mono text-white/20">
                    <span>via {msg.model}</span>
                    <span>•</span>
                    <span>{msg.tokens} tokens</span>
                    <span>•</span>
                    <span>{msg.latency}ms</span>
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-white/40" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-monad-purple/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-monad-purple" />
            </div>
            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/5 rounded-bl-md">
              <Loader2 className="w-4 h-4 animate-spin text-monad-purple" />
              <span className="text-xs text-white/30">Routing through MonGate...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Type a message to test the bridge..."
            className="flex-grow px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-monad-purple/40 focus:border-monad-purple/40 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3 rounded-xl bg-monad-purple text-white transition-all hover:bg-monad-purple-light hover:shadow-[0_0_16px_#836EFB] disabled:opacity-30 disabled:hover:shadow-none disabled:hover:bg-monad-purple"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
