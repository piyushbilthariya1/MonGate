'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

type LinkItem = {
  name: string;
  href: string;
  external?: boolean;
};

const LINKS: Record<string, LinkItem[]> = {
  Product: [
    { name: 'Consumer Dashboard', href: '/dashboard/consumer' },
    { name: 'Staker Portal', href: '/dashboard/staker' },
    { name: 'API Console', href: '/dashboard/keys' },
    { name: 'Documentation', href: '/docs' },
  ],
  Protocol: [
    { name: 'Monad Explorer', href: 'https://explorer.monad.xyz', external: true },
    { name: 'Smart Contracts', href: '#' },
    { name: 'GitHub', href: '#', external: true },
    { name: 'Audit Reports', href: '#' },
  ],
  Community: [
    { name: 'Discord', href: '#', external: true },
    { name: 'Twitter / X', href: '#', external: true },
    { name: 'Telegram', href: '#', external: true },
    { name: 'Blog', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#020202]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 rounded border border-white/20 bg-white/5 flex items-center justify-center">
                <span className="text-white font-bold text-xs">M</span>
              </div>
              <span className="text-xl font-bold text-white">MonGate</span>
            </div>
            <p className="text-xs text-white/30 leading-relaxed mb-6">
              The decentralized marketplace for AI API keys. Powered by AntiGravity settlement on Monad Network.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_6px_#00FFA3]" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors group"
                      >
                        {link.name}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-white/40 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-white/15 uppercase tracking-widest">
            © {new Date().getFullYear()} MonGate Protocol. Built on Monad.
          </p>
          <div className="flex items-center gap-6 text-[10px] text-white/15 uppercase tracking-widest">
            <a href="#" className="hover:text-white/40 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/40 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/40 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
