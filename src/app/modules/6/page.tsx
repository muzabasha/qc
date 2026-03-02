'use client'

import React from 'react'
import Link from 'next/link'

export default function Module6() {
    return (
        <div className="max-w-[1400px] w-full mx-auto p-12 space-y-24 pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-8xl font-extrabold text-white mb-6">Module 6: Quantum Algorithms</h1>
                <p className="text-4xl text-slate-400">Why are Quantum Computers actually faster?</p>
            </header>

            {/* Algorithm 1: Deutsch */}
            <section className="space-y-12">
                <h2 className="text-5xl font-black text-emerald-400 border-b-2 border-slate-700 pb-8">1. Deutsch Algorithm: The Coin Test</h2>
                <div className="bg-slate-900 p-12 rounded-3xl border border-slate-700 shadow-2xl grid xl:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-4xl font-bold text-white mb-6">Classical Problem</h3>
                        <p className="text-2xl text-slate-300 leading-relaxed mb-6">
                            Imagine you have a coin hidden in a box. It could be a normal coin (Heads on one side, Tails on the other) OR a fake coin (Heads on both sides).
                        </p>
                        <div className="bg-slate-800 p-8 rounded-2xl mb-8 border-l-8 border-red-500">
                            <strong className="text-red-400 text-3xl">Classical Method:</strong><br />
                            You must look at BOTH sides of the coin to know for sure. That takes <strong>2 steps</strong>.
                        </div>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-white mb-6">Quantum Solution</h3>
                        <p className="text-2xl text-slate-300 leading-relaxed mb-6">
                            David Deutsch proved that by putting the "coin checker" inside a quantum superposition (looking at it with a wave instead of a particle), you can find the answer instantly!
                        </p>
                        <div className="bg-indigo-900/50 p-8 rounded-2xl mb-8 border-l-8 border-indigo-400">
                            <strong className="text-indigo-400 text-3xl">Quantum Method:</strong><br />
                            It only takes <strong>1 step</strong>! This was the first proof that Quantum Computers can do things fundamentally faster than Classical ones.
                        </div>
                    </div>
                </div>
            </section>

            {/* Algorithm 2: Grovers */}
            <section className="space-y-12">
                <h2 className="text-5xl font-black text-blue-400 border-b-2 border-slate-700 pb-8">2. Grover's Search: Finding the Needle</h2>
                <div className="bg-slate-900 p-12 rounded-3xl border border-slate-700 shadow-2xl grid xl:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-4xl font-bold text-white mb-6">The Phonebook Problem</h3>
                        <p className="text-2xl text-slate-300 leading-relaxed mb-6">
                            Imagine a completely unorganized, unsorted phonebook with 1,000,000 names. You are looking for a specific person.
                        </p>
                        <div className="bg-slate-800 p-8 rounded-2xl border-l-8 border-red-500 shadow-inner">
                            <strong className="text-red-400 block mb-4 text-3xl">Classical Search (O(N)):</strong>
                            You have to check every single page one-by-one. On average, it will take you <strong>500,000 checks</strong>.
                        </div>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-white mb-6">Amplitude Amplification</h3>
                        <p className="text-2xl text-slate-300 leading-relaxed mb-6">
                            Lov Grover invented an algorithm that uses quantum entanglement to "amplify" the probability of the correct answer, and shrink the probability of all wrong answers simultaneously.
                        </p>
                        <div className="bg-emerald-900/40 p-8 rounded-2xl border-l-8 border-emerald-500 shadow-inner">
                            <strong className="text-emerald-400 block mb-4 text-3xl">Quantum Search (O(√N)):</strong>
                            A quantum computer only needs to check the phonebook <strong>1,000 times!</strong> (The square root of a million).
                        </div>
                    </div>
                </div>
            </section>

            {/* Algorithm 3: Shors */}
            <section className="space-y-12">
                <h2 className="text-5xl font-black text-purple-400 border-b-2 border-slate-700 pb-8">3. Shor's Algorithm: Breaking the Internet</h2>
                <div className="bg-slate-900 p-12 rounded-3xl border border-slate-700 shadow-2xl">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-12">
                        <div>
                            <h3 className="text-4xl font-bold text-white mb-6">RSA Encryption</h3>
                            <p className="text-2xl text-slate-300 leading-relaxed">
                                The security of the entire internet (banks, passwords, messaging) relies on multiplying two massive prime numbers together. For classical computers, taking that massive result and guessing the two original primes is practically impossible (it would take millions of years).
                            </p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-white mb-6">Quantum Period Finding</h3>
                            <p className="text-2xl text-slate-300 leading-relaxed">
                                Peter Shor realized that finding prime factors is deeply related to finding repeating patterns (frequencies) in mathematics. Quantum computers are exceptionally good at discovering global frequencies (using the Quantum Fourier Transform).
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-950 p-12 rounded-2xl border border-red-900/50 shadow-inner text-center">
                        <h4 className="text-4xl font-black text-red-500 mb-6 uppercase tracking-widest">The Quantum Threat</h4>
                        <p className="text-3xl text-slate-300">
                            A powerful enough Quantum Computer running Shor's Algorithm could crack modern RSA encryption algorithms in <strong className="text-white text-4xl">Minutes instead of Millennia</strong>. This is why "Post-Quantum Cryptography" is a booming research field today!
                        </p>
                    </div>
                </div>
            </section>

            <div className="pt-24 flex justify-between">
                <Link href="/modules/5" className="flex items-center gap-4 px-12 py-6 bg-slate-800 hover:bg-slate-700 text-slate-300 text-3xl font-bold rounded-2xl transition-all group">
                    <span className="group-hover:-translate-x-2 transition-transform">←</span>
                    Back: Quantum Circuits
                </Link>
                <Link href="/modules/7" className="flex items-center gap-4 px-12 py-6 bg-cyan-600 hover:bg-cyan-500 text-white text-3xl font-black rounded-2xl shadow-2xl border-b-8 border-cyan-800 transition-all active:border-b-0 active:translate-y-2 group">
                    Next: Real-World Applications
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
            </div>
        </div>
    )
}
