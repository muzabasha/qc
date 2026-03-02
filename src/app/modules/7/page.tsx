'use client'

import React from 'react'
import Link from 'next/link'

export default function Module7() {
    return (
        <div className="max-w-[1600px] w-full mx-auto p-12 space-y-24 pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-8xl font-extrabold text-white mb-6">Module 7: Real-World Applications</h1>
                <p className="text-4xl text-slate-400">Where will Quantum make an impact?</p>
            </header>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* App 1 */}
                <div className="bg-slate-900 p-12 rounded-3xl border border-slate-700 shadow-2xl flex flex-col items-start gap-8 hover:bg-slate-800 transition-colors cursor-default group">
                    <div className="bg-blue-600/20 p-6 rounded-2xl w-24 h-24 flex items-center justify-center text-5xl">
                        💊
                    </div>
                    <h2 className="text-5xl font-black text-white group-hover:text-blue-400 transition-colors">Drug Discovery</h2>
                    <p className="text-2xl text-slate-300 leading-relaxed">
                        Classical computers struggle to simulate large molecules because chemistry is inherently quantum mechanical. Quantum computers can perfectly simulate new drugs and materials atom-by-atom, leading to breakthroughs in medicine and solar batteries without decades of physical lab trials.
                    </p>
                </div>

                {/* App 2 */}
                <div className="bg-slate-900 p-12 rounded-3xl border border-slate-700 shadow-2xl flex flex-col items-start gap-8 hover:bg-slate-800 transition-colors cursor-default group">
                    <div className="bg-emerald-600/20 p-6 rounded-2xl w-24 h-24 flex items-center justify-center text-5xl">
                        🔐
                    </div>
                    <h2 className="text-5xl font-black text-white group-hover:text-emerald-400 transition-colors">Quantum Cryptography</h2>
                    <p className="text-2xl text-slate-300 leading-relaxed">
                        Using the BB84 protocol, we can send cryptographic keys encoded in polarized photons. Because measuring a quantum state collapses it permanently, if a hacker (Eve) tries to intercept the key, the receiver will instantly know they've been compromised based on physics, not math!
                    </p>
                </div>

                {/* App 3 */}
                <div className="bg-slate-900 p-12 rounded-3xl border border-slate-700 shadow-2xl flex flex-col items-start gap-8 hover:bg-slate-800 transition-colors cursor-default group">
                    <div className="bg-amber-600/20 p-6 rounded-2xl w-24 h-24 flex items-center justify-center text-5xl">
                        📈
                    </div>
                    <h2 className="text-5xl font-black text-white group-hover:text-amber-400 transition-colors">Finance & Logistics</h2>
                    <p className="text-2xl text-slate-300 leading-relaxed">
                        The "Traveling Salesman" problem involves finding the optimal route between thousands of cities. Quantum Optimization algorithms can evaluate millions of logistic paths and financial portfolios simultaneously, saving shipping companies billions in fuel and time.
                    </p>
                </div>

                {/* App 4 */}
                <div className="bg-slate-900 p-12 rounded-3xl border border-slate-700 shadow-2xl flex flex-col items-start gap-8 hover:bg-slate-800 transition-colors cursor-default group">
                    <div className="bg-purple-600/20 p-6 rounded-2xl w-24 h-24 flex items-center justify-center text-5xl">
                        🤖
                    </div>
                    <h2 className="text-5xl font-black text-white group-hover:text-purple-400 transition-colors">Quantum AI & ML</h2>
                    <p className="text-2xl text-slate-300 leading-relaxed">
                        Quantum Machine Learning (QML) involves feeding massive datasets into a parametrized quantum circuit. Quantum kernels can find complex patterns in high-dimensional data that classical neural networks simply cannot map efficiently, massively speeding up AI training limits.
                    </p>
                </div>
            </section>

            <div className="pt-24 flex justify-between">
                <Link href="/modules/6" className="flex items-center gap-4 px-12 py-6 bg-slate-800 hover:bg-slate-700 text-slate-300 text-3xl font-bold rounded-2xl transition-all group">
                    <span className="group-hover:-translate-x-2 transition-transform">←</span>
                    Back: Algorithms
                </Link>
                <Link href="/modules/8" className="flex items-center gap-4 px-12 py-6 bg-cyan-600 hover:bg-cyan-500 text-white text-3xl font-black rounded-2xl shadow-2xl border-b-8 border-cyan-800 transition-all active:border-b-0 active:translate-y-2 group">
                    Next: Recent Trends & Challenges
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
            </div>
        </div>
    )
}
