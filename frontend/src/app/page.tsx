import { Terminal } from "@/components/Terminal";
import Link from "next/link";
import { ArrowRight, Key, Zap, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 bg-obsidian text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,#836EFB1A,transparent_50%)]" />
      
      <div className="mx-auto max-w-6xl py-24 sm:py-32 flex flex-col items-center text-center gap-12">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
            Unleash AI Liquidity on <br />
            <span className="text-monad-purple drop-shadow-[0_0_15px_#836EFB80]">Monad Network</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-white/50">
            MonKey Vault is the decentralized bridge for AI APIs. Stake your idle keys or consume premium AI models with sub-second settlement and zero overhead.
          </p>
          
          <div className="flex items-center justify-center gap-6 mt-4">
            <Link href="/dashboard/consumer" className="group relative flex items-center gap-2 px-8 py-3 font-semibold text-white bg-monad-purple rounded-lg transition-all hover:bg-monad-purple-light hover:shadow-[0_0_20px_#836EFB]">
              Start Consuming
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/dashboard/staker" className="flex items-center gap-2 px-8 py-3 font-semibold text-white/80 border border-white/10 rounded-lg transition-all hover:bg-white/5">
              Stake Your Keys
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl opacity-80 mt-8">
          <div className="flex flex-col items-center gap-2 p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
            <Zap className="w-6 h-6 text-monad-purple" />
            <h3 className="font-bold">AntiGravity Sync</h3>
            <p className="text-xs text-center text-white/40">Real-time credit settlement with Monad precision.</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
            <ShieldCheck className="w-6 h-6 text-success" />
            <h3 className="font-bold">AES-256 Vaulting</h3>
            <p className="text-xs text-center text-white/40">Secure hardware encryption for all staked credentials.</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
            <Key className="w-6 h-6 text-monad-purple-light" />
            <h3 className="font-bold">Universal SDK</h3>
            <p className="text-xs text-center text-white/40">Standard OpenAI-compatibility out of the box.</p>
          </div>
        </div>

        {/* Terminal Section */}
        <div className="w-full max-w-4xl mt-12 mb-12">
          <Terminal />
        </div>
      </div>
    </div>
  );
}
