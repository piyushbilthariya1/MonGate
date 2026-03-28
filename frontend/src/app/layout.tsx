import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/providers/web3-provider";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MonKey Vault | AntiGravity API Bridge",
  description: "High-performance AI API marketplace settled on Monad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-monad-purple/30 selection:text-white`}>
        <Web3Provider>
          <div className="flex flex-col min-h-screen bg-obsidian">
            <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 border-b border-white/5 bg-obsidian/80 backdrop-blur-md">
              <Link href="/" className="flex items-center gap-3">
                <span className="text-2xl">🐒🗝️</span>
                <span className="text-xl font-bold tracking-tight text-white">MonKey Vault</span>
              </Link>
              
              <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
                <Link href="/dashboard/consumer" className="transition-colors hover:text-white hover:drop-shadow-[0_0_8px_#836EFB]">Consumer</Link>
                <Link href="/dashboard/staker" className="transition-colors hover:text-white hover:drop-shadow-[0_0_8px_#836EFB]">Staker</Link>
                <Link href="/docs" className="transition-colors hover:text-white hover:drop-shadow-[0_0_8px_#836EFB]">Docs</Link>
              </div>

              <div className="flex items-center gap-4">
                <ConnectButton />
              </div>
            </nav>
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}
