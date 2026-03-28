'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layout, 
  Database, 
  Activity, 
  Settings, 
  Menu, 
  X, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const NAV_ITEMS = [
  { name: 'Overview', href: '/dashboard/consumer', icon: Layout },
  { name: 'API Keys', href: '/dashboard/keys', icon: Database },
  { name: 'Staking', href: '/dashboard/staker', icon: Activity },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';
  const { address, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const NavContent = () => (
    <div className="flex flex-col h-full bg-obsidian border-r border-white/5 p-6">
      <nav className="flex-grow space-y-2 mt-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const finalHref = isDemo ? `${item.href}?demo=true` : item.href;
          return (
            <Link
              key={item.name}
              href={finalHref}
              onClick={() => setIsMobileOpen(false)}
              className={`group flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-monad-purple/10 text-monad-purple font-medium' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </div>
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="w-1.5 h-1.5 rounded-full bg-monad-purple shadow-[0_0_8px_#836EFB]"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="flex items-center gap-3 mb-6 px-4 py-2 rounded-lg bg-white/5 truncate">
          <div className="w-8 h-8 rounded-full bg-monad-purple/20 flex items-center justify-center text-monad-purple text-xs">
            0x
          </div>
          <div className="flex flex-col gap-0.5 truncate text-xs">
            <span className="text-white/80 font-medium">Connected Wallet</span>
            <span className="text-white/40 truncate">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'No address'}</span>
          </div>
        </div>

        <button 
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 text-white/40 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 sticky top-[73px] h-[calc(100vh-73px)]">
        <NavContent />
      </aside>

      {/* Mobile Trigger */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-monad-purple text-white rounded-full shadow-2xl shadow-monad-purple/40"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 left-0 w-80 shadow-2xl"
            >
              <div className="absolute top-6 right-6">
                <button onClick={() => setIsMobileOpen(false)} className="text-white/40 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <NavContent />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
