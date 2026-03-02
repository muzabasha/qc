'use client'

import React from 'react'
import Link from 'next/link'

export default function Module7() {
    return (
        <div className="max-w-[1400px] w-full mx-auto p-6 md:p-12 space-y-12 md:space-y-24 pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-5xl md:text-8xl font-black text-white mb-6">Module 7: Real-World Applications</h1>
                <p className="text-2xl md:text-4xl text-slate-400 font-medium">Where will Quantum make an impact?</p>
            </header>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* App 1 */}
                <div className="bg-slate-900 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl flex flex-col items-start gap-8 hover:bg-slate-800/80 transition-all cursor-default group hover:-translate-y-2">
                    <div className="bg-blue-600/20 p-6 rounded-2xl w-24 h-24 flex items-center justify-center text-5xl">💊</div>
                    <h2 className="text-4xl md:text-5xl font-black text-white group-hover:text-blue-400 transition-colors">Drug Discovery</h2>
                    <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                        Classical computers struggle to simulate large molecules. Quantum computers can perfectly simulate new drugs and materials atom-by-atom, bypassing decades of lab trials.
                    </p>
                </div>

                {/* App 2 */}
                <div className="bg-slate-900 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl flex flex-col items-start gap-8 hover:bg-slate-800/80 transition-all cursor-default group hover:-translate-y-2">
                    <div className="bg-emerald-600/20 p-6 rounded-2xl w-24 h-24 flex items-center justify-center text-5xl">🔐</div>
                    <h2 className="text-4xl md:text-5xl font-black text-white group-hover:text-emerald-400 transition-colors">Safe Crypto</h2>
                    <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                        Using the BB84 protocol, we send keys encoded in photons. If a hacker tries to look, the quantum state collapses instantly, alerting the receiver of the breach!
                    </p>
                </div>

                {/* App 3 */}
                <div className="bg-slate-900 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl flex flex-col items-start gap-8 hover:bg-slate-800/80 transition-all cursor-default group hover:-translate-y-2">
                    <div className="bg-amber-600/20 p-6 rounded-2xl w-24 h-24 flex items-center justify-center text-5xl">📈</div>
                    <h2 className="text-4xl md:text-5xl font-black text-white group-hover:text-amber-400 transition-colors">Optimization</h2>
                    <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                        From shipping routes to stock portfolios, Quantum Optimization evaluates millions of options simultaneously to find the "Global Minimum" cost.
                    </p>
                </div>

                {/* App 4 */}
                <div className="bg-slate-900 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl flex flex-col items-start gap-8 hover:bg-slate-800/80 transition-all cursor-default group hover:-translate-y-2">
                    <div className="bg-purple-600/20 p-6 rounded-2xl w-24 h-24 flex items-center justify-center text-5xl">🤖</div>
                    <h2 className="text-4xl md:text-5xl font-black text-white group-hover:text-purple-400 transition-colors">Quantum AI</h2>
                    <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                        Quantum kernels can map patterns in high-dimensional data that classical neural networks simply cannot see, massively accelerating AI training limits.
                    </p>
                </div>
            </section>

            <div className="pt-24 flex justify-between">
                <Link href="/modules/6" className="flex items-center gap-4 px-6 md:px-10 py-4 md:py-5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xl font-bold rounded-2xl transition-all group">
                    <span className="group-hover:-translate-x-2 transition-transform">←</span>
                    Back
                </Link>
                <Link href="/modules/8" className="flex items-center gap-4 px-10 py-5 bg-cyan-600 hover:bg-cyan-500 text-white text-2xl md:text-4xl font-black rounded-2xl shadow-2xl border-b-8 border-cyan-800 transition-all active:border-b-0 active:translate-y-2 group">
                    Next: Trends
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
            </div>
        </div>
    )
}
