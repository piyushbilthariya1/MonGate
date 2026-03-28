import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/providers/web3-provider";
import { CustomConnectButton } from "@/components/CustomConnectButton";
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
  title: "MonGate | AI API Bridge",
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
            <nav className="sticky top-0 z-[100] flex items-center justify-between px-8 py-4 border-b border-white/5 bg-[#030303]/80 backdrop-blur-md">
              {/* Left: Logo */}
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity z-10">
                <div className="w-8 h-8 rounded-lg bg-monad-purple flex items-center justify-center shadow-[0_0_15px_#836EFB60]">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-white">MonGate</span>
              </Link>
              
              {/* Center: Glassmorphic Nav Pill perfectly aligned */}
              <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl">
                <Link href="/dashboard/consumer" className="px-5 py-2 rounded-xl text-sm font-bold text-white/50 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_#ffffff10] transition-all duration-300">Consumer</Link>
                <Link href="/dashboard/staker" className="px-5 py-2 rounded-xl text-sm font-bold text-white/50 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_#ffffff10] transition-all duration-300">Staker</Link>
                <Link href="/docs" className="px-5 py-2 rounded-xl text-sm font-bold text-white/50 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_#ffffff10] transition-all duration-300">Docs</Link>
              </div>

              {/* Right: Wallet Connect */}
              <div className="flex items-center gap-4 z-10">
                <CustomConnectButton />
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
