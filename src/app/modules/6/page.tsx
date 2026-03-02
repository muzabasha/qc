'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Cpu, Zap, CheckCircle } from 'lucide-react'

export default function Module6() {
    const [activeAlgorithm, setActiveAlgorithm] = useState<number | null>(null)

    return (
        <div className="max-w-[1400px] w-full mx-auto p-6 md:p-12 space-y-12 md:space-y-24 pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">Module 6: Quantum Algorithms</h1>
                <p className="text-lg md:text-xl text-slate-400 font-medium">Why are Quantum Computers actually faster?</p>
                <div className="mt-8 bg-indigo-900/30 border border-indigo-500/50 rounded-2xl p-6">
                    <p className="text-lg text-slate-300">
                        <strong className="text-indigo-400">Input → Processing → Output Model:</strong> Each algorithm below shows how quantum computers transform input data through quantum operations to produce results faster than classical computers.
                    </p>
                </div>
            </header>

            {/* Algorithm 1: Deutsch */}
            <section className="space-y-12">
                <div className="flex items-center gap-6">
                    <div className="bg-emerald-600/20 p-4 rounded-xl text-4xl">🪙</div>
                    <h2 className="text-3xl md:text-5xl font-black text-emerald-400">1. Deutsch Algorithm: The Coin Test</h2>
                </div>

                {/* Input → Processing → Output Model */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 rounded-[32px] border-2 border-emerald-500/30 shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* INPUT */}
                        <div className="bg-slate-950/50 p-6 rounded-2xl border-2 border-blue-500 space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <Cpu size={24} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-blue-400">INPUT</h3>
                            </div>
                            <div className="space-y-3">
                                <p className="text-lg text-slate-300"><strong className="text-white">Problem:</strong> Hidden function f(x)</p>
                                <p className="text-base text-slate-400">Is it Constant or Balanced?</p>
                                <div className="bg-slate-800 p-4 rounded-xl mt-4">
                                    <p className="text-sm text-slate-400 mb-2">Possible functions:</p>
                                    <p className="text-base text-emerald-400">• f(0)=0, f(1)=0 (Constant)</p>
                                    <p className="text-base text-emerald-400">• f(0)=1, f(1)=1 (Constant)</p>
                                    <p className="text-base text-purple-400">• f(0)=0, f(1)=1 (Balanced)</p>
                                    <p className="text-base text-purple-400">• f(0)=1, f(1)=0 (Balanced)</p>
                                </div>
                            </div>
                        </div>

                        {/* PROCESSING */}
                        <div className="bg-slate-950/50 p-6 rounded-2xl border-2 border-purple-500 space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-purple-600 p-2 rounded-lg">
                                    <Zap size={24} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-purple-400">PROCESSING</h3>
                            </div>
                            <div className="space-y-3">
                                <p className="text-lg text-slate-300"><strong className="text-white">Quantum Circuit:</strong></p>
                                <div className="bg-slate-800 p-4 rounded-xl space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-base text-slate-400">1.</span>
                                        <span className="text-base text-white">|0⟩ → H gate → Superposition</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base text-slate-400">2.</span>
                                        <span className="text-base text-white">Apply f(x) to both states</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base text-slate-400">3.</span>
                                        <span className="text-base text-white">H gate again → Interference</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base text-slate-400">4.</span>
                                        <span className="text-base text-white">Measure result</span>
                                    </div>
                                </div>
                                <div className="bg-indigo-900/40 p-3 rounded-lg mt-4">
                                    <p className="text-sm text-indigo-300">⚡ Quantum Advantage: Evaluates f(0) and f(1) simultaneously!</p>
                                </div>
                            </div>
                        </div>

                        {/* OUTPUT */}
                        <div className="bg-slate-950/50 p-6 rounded-2xl border-2 border-emerald-500 space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-emerald-600 p-2 rounded-lg">
                                    <CheckCircle size={24} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-emerald-400">OUTPUT</h3>
                            </div>
                            <div className="space-y-3">
                                <p className="text-lg text-slate-300"><strong className="text-white">Result:</strong></p>
                                <div className="bg-slate-800 p-4 rounded-xl space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">📊</span>
                                        <span className="text-base text-white">Measure |0⟩ → Constant</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">📊</span>
                                        <span className="text-base text-white">Measure |1⟩ → Balanced</span>
                                    </div>
                                </div>
                                <div className="bg-emerald-900/40 p-4 rounded-xl mt-4 space-y-2">
                                    <p className="text-base text-emerald-300 font-bold">✅ Classical: 2 queries needed</p>
                                    <p className="text-base text-emerald-300 font-bold">⚡ Quantum: 1 query only!</p>
                                    <p className="text-sm text-slate-400 mt-2">50% speedup - proof of quantum advantage!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comparison */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <div className="bg-red-950/20 p-6 rounded-2xl border-l-8 border-red-500">
                            <strong className="text-red-400 text-xl block mb-3">Classical Method:</strong>
                            <p className="text-lg text-slate-300">Must check BOTH sides → <strong className="text-white">2 lookups</strong></p>
                        </div>
                        <div className="bg-indigo-900/40 p-6 rounded-2xl border-l-8 border-indigo-400">
                            <strong className="text-indigo-400 text-xl block mb-3">Quantum Method:</strong>
                            <p className="text-lg text-slate-300">Superposition checks both at once → <strong className="text-white">1 lookup</strong></p>
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

                {/* Input → Processing → Output Model */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 rounded-[32px] border-2 border-blue-500/30 shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* INPUT */}
                        <div className="bg-slate-950/50 p-6 rounded-2xl border-2 border-blue-500 space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <Cpu size={24} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-blue-400">INPUT</h3>
                            </div>
                            <div className="space-y-3">
                                <p className="text-lg text-slate-300"><strong className="text-white">Problem:</strong> Unsorted Database</p>
                                <div className="bg-slate-800 p-4 rounded-xl mt-4">
                                    <p className="text-sm text-slate-400 mb-2">Search space:</p>
                                    <p className="text-base text-white">N = 1,000,000 items</p>
                                    <p className="text-sm text-slate-400 mt-3">Goal:</p>
                                    <p className="text-base text-emerald-400">Find 1 specific item</p>
                                    <div className="mt-4 p-3 bg-slate-900 rounded-lg">
                                        <p className="text-xs text-slate-500">Example: Phone book with no alphabetical order</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PROCESSING */}
                        <div className="bg-slate-950/50 p-6 rounded-2xl border-2 border-purple-500 space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-purple-600 p-2 rounded-lg">
                                    <Zap size={24} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-purple-400">PROCESSING</h3>
                            </div>
                            <div className="space-y-3">
                                <p className="text-lg text-slate-300"><strong className="text-white">Grover Iteration:</strong></p>
                                <div className="bg-slate-800 p-4 rounded-xl space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-base text-slate-400">1.</span>
                                        <span className="text-sm text-white">Create superposition of all N states</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base text-slate-400">2.</span>
                                        <span className="text-sm text-white">Oracle marks target (phase flip)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base text-slate-400">3.</span>
                                        <span className="text-sm text-white">Diffusion operator amplifies marked state</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base text-slate-400">4.</span>
                                        <span className="text-sm text-white">Repeat √N times</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base text-slate-400">5.</span>
                                        <span className="text-sm text-white">Measure to get answer</span>
                                    </div>
                                </div>
                                <div className="bg-indigo-900/40 p-3 rounded-lg mt-4">
                                    <p className="text-sm text-indigo-300">⚡ Amplitude Amplification: Wrong answers cancel, right answer amplifies!</p>
                                </div>
                            </div>
                        </div>

                        {/* OUTPUT */}
                        <div className="bg-slate-950/50 p-6 rounded-2xl border-2 border-emerald-500 space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-emerald-600 p-2 rounded-lg">
                                    <CheckCircle size={24} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-emerald-400">OUTPUT</h3>
                            </div>
                            <div className="space-y-3">
                                <p className="text-lg text-slate-300"><strong className="text-white">Result:</strong></p>
                                <div className="bg-slate-800 p-4 rounded-xl space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">🎯</span>
                                        <span className="text-base text-white">Target item found!</span>
                                    </div>
                                    <p className="text-sm text-slate-400">With high probability (&gt;99%)</p>
                                </div>
                                <div className="bg-emerald-900/40 p-4 rounded-xl mt-4 space-y-2">
                                    <p className="text-base text-orange-300 font-bold">Classical: O(N) = 500,000 tries</p>
                                    <p className="text-base text-emerald-300 font-bold">⚡ Quantum: O(√N) = 1,000 tries</p>
                                    <div className="mt-3 pt-3 border-t border-slate-700">
                                        <p className="text-2xl font-black text-emerald-400">500× Faster!</p>
                                        <p className="text-xs text-slate-400 mt-1">Quadratic speedup</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comparison */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <div className="bg-orange-950/20 p-6 rounded-2xl border-l-8 border-orange-500">
                            <strong className="text-orange-400 text-xl block mb-3">Classical (O(N)):</strong>
                            <p className="text-lg text-slate-300">Average: <strong className="text-white">500,000 tries</strong> for 1M items</p>
                            <p className="text-sm text-slate-400 mt-2">Linear search - check one by one</p>
                        </div>
                        <div className="bg-emerald-900/40 p-6 rounded-2xl border-l-8 border-emerald-500">
                            <strong className="text-emerald-400 text-xl block mb-3">Quantum (O(√N)):</strong>
                            <p className="text-lg text-slate-300">Only <strong className="text-white">1,000 tries</strong> needed!</p>
                            <p className="text-sm text-slate-400 mt-2">Amplitude amplification - quantum interference</p>
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

                {/* Input → Processing → Output Model */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 rounded-[32px] border-2 border-purple-500/30 shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* INPUT */}
                        <div className="bg-slate-950/50 p-6 rounded-2xl border-2 border-blue-500 space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <Cpu size={24} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-blue-400">INPUT</h3>
                            </div>
                            <div className="space-y-3">
                                <p className="text-lg text-slate-300"><strong className="text-white">Problem:</strong> Factor Large Number</p>
                                <div className="bg-slate-800 p-4 rounded-xl mt-4">
                                    <p className="text-sm text-slate-400 mb-2">Given:</p>
                                    <p className="text-base text-white">N = p × q</p>
                                    <p className="text-xs text-slate-500 mt-2">(where p and q are large primes)</p>
                                    <div className="mt-4 p-3 bg-red-950/30 rounded-lg border border-red-900/50">
                                        <p className="text-sm text-red-400">Example: N = 15</p>
                                        <p className="text-xs text-slate-400 mt-1">Find: p = 3, q = 5</p>
                                    </div>
                                    <div className="mt-3 p-3 bg-slate-900 rounded-lg">
                                        <p className="text-xs text-slate-400">RSA-2048: 617 digit number</p>
                                        <p className="text-xs text-red-400">Classical: Billions of years</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PROCESSING */}
                        <div className="bg-slate-950/50 p-6 rounded-2xl border-2 border-purple-500 space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-purple-600 p-2 rounded-lg">
                                    <Zap size={24} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-purple-400">PROCESSING</h3>
                            </div>
                            <div className="space-y-3">
                                <p className="text-lg text-slate-300"><strong className="text-white">Quantum Period Finding:</strong></p>
                                <div className="bg-slate-800 p-4 rounded-xl space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-base text-slate-400">1.</span>
                                        <span className="text-sm text-white">Choose random a &lt; N</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base text-slate-400">2.</span>
                                        <span className="text-sm text-white">Create superposition of all x</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base text-slate-400">3.</span>
                                        <span className="text-sm text-white">Compute f(x) = a^x mod N</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base text-slate-400">4.</span>
                                        <span className="text-sm text-white">Quantum Fourier Transform</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base text-slate-400">5.</span>
                                        <span className="text-sm text-white">Measure to find period r</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base text-slate-400">6.</span>
                                        <span className="text-sm text-white">Use r to find factors</span>
                                    </div>
                                </div>
                                <div className="bg-indigo-900/40 p-3 rounded-lg mt-4">
                                    <p className="text-sm text-indigo-300">⚡ QFT finds hidden periodicity exponentially faster!</p>
                                </div>
                            </div>
                        </div>

                        {/* OUTPUT */}
                        <div className="bg-slate-950/50 p-6 rounded-2xl border-2 border-emerald-500 space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-emerald-600 p-2 rounded-lg">
                                    <CheckCircle size={24} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-emerald-400">OUTPUT</h3>
                            </div>
                            <div className="space-y-3">
                                <p className="text-lg text-slate-300"><strong className="text-white">Result:</strong></p>
                                <div className="bg-slate-800 p-4 rounded-xl space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">🔓</span>
                                        <span className="text-base text-white">Prime factors: p, q</span>
                                    </div>
                                    <div className="mt-3 p-3 bg-emerald-950/30 rounded-lg border border-emerald-900/50">
                                        <p className="text-sm text-emerald-400">Example: 15 = 3 × 5</p>
                                        <p className="text-xs text-slate-400 mt-1">Period r = 4 found</p>
                                    </div>
                                </div>
                                <div className="bg-red-900/40 p-4 rounded-xl mt-4 space-y-2">
                                    <p className="text-base text-red-300 font-bold">Classical: Exponential time</p>
                                    <p className="text-sm text-slate-400">O(exp(n^1/3)) - billions of years</p>
                                    <p className="text-base text-emerald-300 font-bold mt-2">⚡ Quantum: Polynomial time</p>
                                    <p className="text-sm text-slate-400">O(n³) - minutes to hours!</p>
                                    <div className="mt-3 pt-3 border-t border-slate-700">
                                        <p className="text-xl font-black text-purple-400">Exponential Speedup!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* The Warning */}
                    <div className="bg-red-950/20 p-8 md:p-12 rounded-[24px] border-2 border-red-900/50 shadow-inner space-y-6">
                        <h4 className="text-3xl md:text-4xl font-black text-red-500 uppercase tracking-tight flex items-center gap-4">
                            <span className="text-4xl">⚠️</span>
                            The Cryptographic Threat
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-900/50 p-6 rounded-xl">
                                <h5 className="text-xl font-bold text-red-400 mb-3">Current RSA Security</h5>
                                <p className="text-base text-slate-300">Based on factoring being hard</p>
                                <p className="text-sm text-slate-400 mt-2">2048-bit RSA: ~300 trillion years to crack classically</p>
                            </div>
                            <div className="bg-slate-900/50 p-6 rounded-xl">
                                <h5 className="text-xl font-bold text-purple-400 mb-3">With Quantum Computer</h5>
                                <p className="text-base text-emerald-300">Shor's algorithm breaks it</p>
                                <p className="text-sm text-slate-400 mt-2">Same 2048-bit RSA: Minutes to hours!</p>
                            </div>
                        </div>
                        <div className="bg-emerald-950/30 p-6 rounded-xl border border-emerald-900/50 mt-6">
                            <h5 className="text-xl font-bold text-emerald-400 mb-3">🛡️ Solution: Post-Quantum Cryptography</h5>
                            <p className="text-base text-slate-300">New encryption methods resistant to quantum attacks:</p>
                            <ul className="mt-3 space-y-2 text-sm text-slate-400">
                                <li>• Lattice-based cryptography</li>
                                <li>• Hash-based signatures</li>
                                <li>• Code-based cryptography</li>
                                <li>• Multivariate polynomial cryptography</li>
                            </ul>
                        </div>
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
