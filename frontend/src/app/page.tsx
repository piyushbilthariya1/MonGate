import { Terminal } from "@/components/Terminal";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Key, Zap, ShieldCheck, Play } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-obsidian text-white overflow-hidden relative selection:bg-monad-purple/30 selection:text-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-monad-purple/10 via-transparent to-transparent opacity-50 mix-blend-screen" />
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] pt-32 pb-20 px-6 lg:px-12 z-10 w-full">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center gap-10 animate-fade-in-up">
          <div className="inline-flex justify-center mb-2">
            <span className="relative overflow-hidden px-4 py-2 rounded-full border border-monad-purple/40 bg-gradient-to-r from-monad-purple/10 to-transparent text-[10px] font-extrabold text-monad-purple-light uppercase tracking-[0.3em] backdrop-blur-md shadow-[0_0_15px_#836EFB20]">
              <div className="absolute inset-0 w-full h-full bg-monad-purple/20 animate-pulse pointer-events-none blur-md" />
              <span className="relative z-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-monad-purple drop-shadow-[0_0_5px_#836EFB]" />
                Public Testnet is Live
              </span>
            </span>
          </div>
          
          <h1 className="text-6xl font-extrabold tracking-tight sm:text-[7rem] leading-[1.05] pb-2">
            Unleash AI Liquidity on <br />
            <span className="bg-gradient-to-r from-monad-purple via-monad-purple-light to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_#836EFB60]">Monad Network</span>
          </h1>
          
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/50">
            MonGate is the decentralized bridge for AI APIs. Stake your idle keys or consume premium AI models with sub-second settlement and zero overhead.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <Link href="/dashboard/consumer" className="group relative flex items-center gap-2 px-8 py-4 font-extrabold text-[#020202] text-xs uppercase tracking-widest bg-monad-purple rounded-xl transition-all hover:bg-monad-purple-light hover:shadow-[0_0_30px_#836EFB80] hover:-translate-y-1 active:scale-95 drop-shadow-md">
              Start Consuming
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/dashboard/staker" className="flex items-center gap-2 px-8 py-4 font-bold text-white text-xs uppercase tracking-widest border border-white/20 rounded-xl bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 active:scale-95 shadow-lg">
              Stake Your Keys
            </Link>
            <Link href="/dashboard/consumer" className="flex items-center gap-2 px-8 py-4 font-extrabold text-[#020202] text-xs uppercase tracking-widest border border-success/50 rounded-xl bg-success shadow-[0_0_20px_#00FFA340] transition-all hover:bg-success hover:shadow-[0_0_30px_#00FFA380] hover:-translate-y-1 active:scale-95">
              <Play className="w-4 h-4 fill-obsidian stroke-obsidian" /> View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="relative w-full z-10 py-32 px-6 lg:px-12 bg-black/20 border-y border-white/5">
        <div className="w-full max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12 w-full">
            <div className="relative flex flex-col items-center text-center gap-6 p-12 xl:p-16 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl hover:border-monad-purple/40 hover:-translate-y-2 transition-all duration-500 group shadow-2xl overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-monad-purple/10 blur-[60px] rounded-full group-hover:bg-monad-purple/30 transition-colors duration-700 pointer-events-none" />
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-monad-purple/20 to-monad-purple/5 border border-monad-purple/20 flex items-center justify-center group-hover:shadow-[0_0_20px_#836EFB60] transition-shadow duration-500">
                <Zap className="w-8 h-8 text-monad-purple" />
              </div>
              <div className="relative z-10 space-y-2">
                <h3 className="font-extrabold text-xl text-white tracking-tight">MonGate Sync</h3>
                <p className="text-[10px] text-white/50 uppercase tracking-[0.15em] font-bold leading-relaxed">Real-time credit settlement modeled for Monad's 10k TPS precision.</p>
              </div>
            </div>
            
            <div className="relative flex flex-col items-center text-center gap-6 p-12 xl:p-16 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl hover:border-success/40 hover:-translate-y-2 transition-all duration-500 group shadow-2xl overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-success/10 blur-[60px] rounded-full group-hover:bg-success/20 transition-colors duration-700 pointer-events-none" />
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-success/20 to-success/5 border border-success/20 flex items-center justify-center group-hover:shadow-[0_0_20px_#00FFA360] transition-shadow duration-500">
                <ShieldCheck className="w-8 h-8 text-success" />
              </div>
              <div className="relative z-10 space-y-2">
                <h3 className="font-extrabold text-xl text-white tracking-tight">AES-256 Vaulting</h3>
                <p className="text-[10px] text-white/50 uppercase tracking-[0.15em] font-bold leading-relaxed">Secure hardware encryption for all staked credentials. Never exposed.</p>
              </div>
            </div>

            <div className="relative flex flex-col items-center text-center gap-6 p-12 xl:p-16 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-xl hover:border-monad-purple-light/40 hover:-translate-y-2 transition-all duration-500 group shadow-2xl overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-monad-purple-light/10 blur-[60px] rounded-full group-hover:bg-monad-purple-light/20 transition-colors duration-700 pointer-events-none" />
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-monad-purple-light/20 to-monad-purple-light/5 border border-monad-purple-light/20 flex items-center justify-center group-hover:shadow-[0_0_20px_#A394FF60] transition-shadow duration-500">
                <Key className="w-8 h-8 text-monad-purple-light" />
              </div>
              <div className="relative z-10 space-y-2">
                <h3 className="font-extrabold text-xl text-white tracking-tight">Universal SDK</h3>
                <p className="text-[10px] text-white/50 uppercase tracking-[0.15em] font-bold leading-relaxed">Standard OpenAI-compatibility out of the box. Drop-in replacement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal Section */}
      <section className="relative w-full z-10 py-32 px-6 lg:px-12 backdrop-blur-md">
        <div className="w-full max-w-[1400px] mx-auto">
          <Terminal />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative w-full z-10 py-32 px-6 lg:px-12 bg-black/40 border-t border-white/5">
        <div className="w-full max-w-[1600px] mx-auto relative p-16 md:p-32 rounded-[4rem] border border-white/10 bg-gradient-to-b from-white/5 via-black/40 to-black/80 backdrop-blur-2xl shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-64 bg-monad-purple/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-monad-purple/10 transition-colors duration-1000" />
          
          <h2 className="relative z-10 text-4xl md:text-5xl font-extrabold text-white mb-3 text-center tracking-tight drop-shadow-md">How It Works</h2>
          <p className="relative z-10 text-[10px] text-white/40 text-center uppercase tracking-[0.3em] mb-24 font-bold">Three steps to decentralized AI</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 relative z-10">
            {/* Connector line for desktop */}
            <div className="hidden md:block absolute top-[3rem] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            {[
              { step: '01', title: 'Connect Wallet', desc: 'Sign in with your Monad wallet. No passwords, no accounts — pure Web3.', color: '#836EFB' },
              { step: '02', title: 'Deposit or Stake', desc: 'Consumers deposit MON for credits. Stakers vault their API keys to earn.', color: '#00FFA3' },
              { step: '03', title: 'Use Any AI Model', desc: 'One endpoint, every model. Requests are proxied and settled on-chain.', color: '#A394FF' },
            ].map((item) => (
              <div key={item.step} className="relative flex flex-col items-center text-center group/item">
                <div className="w-24 h-24 mb-10 rounded-full border border-white/10 bg-black/80 backdrop-blur-md flex items-center justify-center shadow-xl relative z-10 group-hover/item:scale-110 group-hover/item:border-white/30 transition-all duration-500">
                  <div className="absolute inset-0 rounded-full blur-[20px] opacity-30 group-hover/item:opacity-60 transition-opacity duration-500" style={{ backgroundColor: item.color }} />
                  <span className="text-3xl font-extrabold tracking-tighter" style={{ color: item.color, textShadow: `0 0 15px ${item.color}80` }}>{item.step}</span>
                </div>
                <h4 className="text-xl font-extrabold text-white mb-4 tracking-tight">{item.title}</h4>
                <p className="text-[11px] text-white/50 leading-relaxed font-bold uppercase tracking-[0.1em] max-w-[250px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
