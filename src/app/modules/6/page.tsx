'use client'

import React from 'react'
import Link from 'next/link'

export default function Module6() {
    return (
        <div className="max-w-[1400px] w-full mx-auto p-6 md:p-12 space-y-12 md:space-y-24 pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-5xl md:text-8xl font-black text-white mb-6">Module 6: Quantum Algorithms</h1>
                <p className="text-2xl md:text-4xl text-slate-400 font-medium">Why are Quantum Computers actually faster?</p>
            </header>

            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-5xl md:text-8xl font-black text-white mb-6">Module 6: Quantum Algorithms</h1>
                <p className="text-2xl md:text-4xl text-slate-400 font-medium">Why are Quantum Computers actually faster?</p>
            </header>

            {/* Algorithm 1: Deutsch */}
            <section className="space-y-12">
                <div className="flex items-center gap-6">
                    <div className="bg-emerald-600/20 p-4 rounded-xl text-4xl">🪙</div>
                    <h2 className="text-3xl md:text-5xl font-black text-emerald-400">1. Deutsch Algorithm: The Coin Test</h2>
                </div>
                <div className="bg-slate-900 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h3 className="text-4xl font-bold text-white mb-6 border-b-2 border-slate-800 pb-4">Classical Problem</h3>
                        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                            Imagine a hidden coin. It's either <strong className="text-white">Constant</strong> (same on both sides) or <strong className="text-white">Balanced</strong> (Heads/Tails).
                        </p>
                        <div className="bg-slate-800 p-8 rounded-2xl border-l-8 border-red-500 shadow-xl space-y-4">
                            <strong className="text-red-400 text-2xl md:text-3xl">Classical Method:</strong>
                            <p className="text-xl text-slate-300">You must check BOTH sides. That's <strong className="text-white">2 lookups</strong>.</p>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <h3 className="text-4xl font-bold text-white mb-6 border-b-2 border-slate-800 pb-4">Quantum Solution</h3>
                        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                            David Deutsch proved that by using superposition, you can sample both possibilities at once.
                        </p>
                        <div className="bg-indigo-900/40 p-8 rounded-2xl border-l-8 border-indigo-400 shadow-xl space-y-4">
                            <strong className="text-indigo-400 text-2xl md:text-3xl">Quantum Method:</strong>
                            <p className="text-xl text-slate-300">It only takes <strong className="text-white">1 lookup</strong>! This is the proof of speedup.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Algorithm 2: Grovers */}
            <section className="space-y-12">
                <div className="flex items-center gap-6">
                    <div className="bg-blue-600/20 p-4 rounded-xl text-4xl">🔍</div>
                    <h2 className="text-3xl md:text-5xl font-black text-blue-400">2. Grover's Search: The Haystack</h2>
                </div>
                <div className="bg-slate-900 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h3 className="text-4xl font-bold text-white mb-6 border-b-2 border-slate-800 pb-4">Phonebook Search</h3>
                        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                            Searching an unsorted list of 1,000,000 entries.
                        </p>
                        <div className="bg-slate-800 p-8 rounded-2xl border-l-8 border-orange-500 shadow-xl space-y-4">
                            <strong className="text-orange-400 block text-2xl md:text-3xl">Classical (O(N)):</strong>
                            <p className="text-xl text-slate-300">Average: <strong className="text-white">500,000 tries</strong>.</p>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <h3 className="text-4xl font-bold text-white mb-6 border-b-2 border-slate-800 pb-4">Amplitude Amplification</h3>
                        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                            Interference makes the "wrong" answers cancel out and the "right" answer glow brighter.
                        </p>
                        <div className="bg-emerald-900/40 p-8 rounded-2xl border-l-8 border-emerald-500 shadow-xl space-y-4">
                            <strong className="text-emerald-400 block text-2xl md:text-3xl">Quantum (O(√N)):</strong>
                            <p className="text-xl text-slate-300">Only <strong className="text-white">1,000 tries</strong>! (Square root speedup).</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Algorithm 3: Shors */}
            <section className="space-y-12">
                <div className="flex items-center gap-6">
                    <div className="bg-purple-600/20 p-4 rounded-xl text-4xl">🔐</div>
                    <h2 className="text-3xl md:text-5xl font-black text-purple-400">3. Shor's Algorithm: Crack Enigma</h2>
                </div>
                <div className="bg-slate-900 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl space-y-12">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="text-4xl font-bold text-white mb-6 border-b-2 border-slate-800 pb-4">The RSA Barrier</h3>
                            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                                Modern security relies on the fact that factoring huge numbers takes billions of years.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-4xl font-bold text-white mb-6 border-b-2 border-slate-800 pb-4">The Period Finder</h3>
                            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                                Shor proved quantum computers can find the "period" or pattern of these numbers instantly.
                            </p>
                        </div>
                    </div>

                    <div className="bg-red-950/20 p-8 md:p-12 rounded-[24px] border-2 border-red-900/50 shadow-inner text-center space-y-6">
                        <h4 className="text-3xl md:text-5xl font-black text-red-500 uppercase tracking-tighter">The Warning</h4>
                        <p className="text-2xl md:text-3xl text-slate-300 leading-relaxed max-w-4xl mx-auto">
                            A quantum machine could factor these numbers in <strong className="text-white">Minutes</strong>. This forces us to invent <strong className="text-emerald-400 font-bold">Post-Quantum Cryptography</strong>.
                        </p>
                    </div>
                </div>
            </section>

            <div className="pt-24 flex justify-between">
                <Link href="/modules/5" className="flex items-center gap-4 px-6 md:px-10 py-4 md:py-5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xl font-bold rounded-2xl transition-all group">
                    <span className="group-hover:-translate-x-2 transition-transform">←</span>
                    Back
                </Link>
                <Link href="/modules/7" className="flex items-center gap-4 px-10 py-5 bg-cyan-600 hover:bg-cyan-500 text-white text-2xl md:text-4xl font-black rounded-2xl shadow-2xl border-b-8 border-cyan-800 transition-all active:border-b-0 active:translate-y-2 group">
                    Next: Application
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
            </div>
        </div>
    )
}
