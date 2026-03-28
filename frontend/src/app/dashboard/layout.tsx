'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { useAuth } from '@/hooks/use-auth';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Loader2, Play } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected, isAuthenticated, authenticate, address } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemoMode = searchParams.get('demo') === 'true';

  // 1. Protection Logic: Redirect to home if wallet disconnects and not in demo mode
  useEffect(() => {
    if (!isConnected && !isDemoMode) {
      router.push('/');
    }
  }, [isConnected, router, isDemoMode]);

  // 2. Auth Flow: Trigger signature if not authenticated
  const handleAuth = async () => {
    setIsAuthenticating(true);
    const success = await authenticate();
    setIsAuthenticating(false);
    if (!success) {
      router.push('/');
    }
  };

  if (isDemoMode) {
    return (
      <div className="flex min-h-screen bg-[#020202]">
        <Sidebar />
        <main className="flex-grow p-4 md:p-8 lg:p-12 overflow-x-hidden relative">
          <div className="absolute top-0 right-0 mt-4 mr-4 px-3 py-1 bg-monad-purple/20 border border-monad-purple/30 rounded-full text-[10px] font-bold text-monad-purple-light uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_15px_#836EFB30] z-50">
            <Play className="w-3 h-3" /> Demo Mode
          </div>
          <div className="mx-auto max-w-7xl pt-8 lg:pt-0">
            {children}
          </div>
        </main>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-obsidian text-white/40">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-monad-purple" />
        <p>Connecting to Monad...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-obsidian text-white p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md text-center shadow-2xl"
        >
          <div className="w-16 h-16 rounded-full bg-monad-purple/10 border border-monad-purple/30 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-monad-purple drop-shadow-[0_0_12px_#836EFB80]" />
          </div>
          <h1 className="text-2xl font-extrabold mb-3 tracking-tight">Verify Ownership</h1>
          <p className="text-white/40 text-sm mb-8 leading-relaxed">
            Accessing your vault requires a one-time signature to confirm you own this wallet: <br />
            <span className="font-mono text-xs text-monad-purple-light break-all px-4 py-2 bg-black/50 border border-white/5 rounded-lg block mt-3">{address}</span>
          </p>
          <button
            onClick={handleAuth}
            disabled={isAuthenticating}
            className="w-full py-4 bg-monad-purple text-white font-bold rounded-xl transition-all hover:bg-monad-purple-light hover:shadow-[0_0_20px_#836EFB] disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isAuthenticating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing...
              </>
            ) : (
              'Sign Message & Enter Dashboard'
            )}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#020202]">
      <Sidebar />
      <main className="flex-grow p-4 md:p-8 lg:p-12 overflow-x-hidden">
        <div className="mx-auto max-w-7xl pt-8 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}
