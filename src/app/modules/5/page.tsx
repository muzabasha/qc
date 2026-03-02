'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function Module5() {
    return (
        <div className="max-w-[1400px] w-full mx-auto p-6 md:p-12 space-y-12 md:space-y-24 pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-5xl md:text-8xl font-black text-white mb-6">Module 5: Quantum Circuits</h1>
                <p className="text-2xl md:text-4xl text-slate-400 font-medium">Wiring up the Quantum Future: Complex Operations.</p>
            </header>

            {/* Topic 8 */}
            <section className="space-y-12">
                <div className="flex items-center gap-6">
                    <div className="bg-emerald-600/20 p-4 rounded-xl text-4xl">🔌</div>
                    <h2 className="text-3xl md:text-5xl font-black text-emerald-400">Topic 8: Building Complex Circuits</h2>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="bg-slate-900 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl text-xl md:text-2xl text-slate-300 flex flex-col justify-center space-y-8">
                        <h3 className="text-4xl font-bold text-white mb-4 border-b-2 border-slate-800 pb-4">Multi-Qubit Gates</h3>
                        <p className="leading-relaxed">
                            A real quantum computer needs many qubits working together. We use multi-qubit gates to entangle them. The most famous is the <strong className="text-cyan-400">CNOT (Controlled-NOT)</strong> gate.
                        </p>
                        <p className="leading-relaxed">
                            A CNOT gate looks at the <strong>Control Qubit</strong>. If the Control is <strong className="text-indigo-400 font-mono">|1⟩</strong>, it flips the <strong>Target Qubit</strong>.
                        </p>

                        <div className="text-4xl md:text-5xl py-12 bg-slate-950 rounded-2xl my-6 flex flex-col gap-8 justify-center items-center shadow-inner overflow-x-auto p-4">
                            <BlockMath math="|00\rangle \xrightarrow{CNOT} |00\rangle" />
                            <BlockMath math="|10\rangle \xrightarrow{CNOT} |11\rangle" />
                        </div>
                    </div>

                    <div className="bg-slate-800 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl flex flex-col space-y-8">
                        <h3 className="text-4xl font-bold text-white">The Teleportation Circuit</h3>
                        <p className="text-xl text-slate-400 font-medium">
                            Quantum Teleportation doesn't move matter—it "beams" the exact quantum state information using an entangled bridge!
                        </p>

                        <div className="flex-1 bg-slate-950 rounded-[24px] border-2 border-slate-800 p-8 md:p-12 flex flex-col justify-center items-center shadow-inner relative overflow-x-auto scrollbar-hide">
                            <div className="w-full min-w-[700px] py-12 space-y-20 relative">

                                {/* Alice Section Label */}
                                <div className="absolute top-0 left-0 text-emerald-500 font-black text-sm uppercase tracking-widest bg-emerald-500/10 px-4 py-1 rounded-full border border-emerald-500/20">Alice (Sender)</div>
                                <div className="absolute top-0 right-[35%] text-indigo-400 font-black text-sm uppercase tracking-widest bg-indigo-500/10 px-4 py-1 rounded-full border border-indigo-500/20 text-center">Classical Channel</div>
                                <div className="absolute top-0 right-0 text-blue-400 font-black text-sm uppercase tracking-widest bg-blue-500/10 px-4 py-1 rounded-full border border-blue-500/20">Bob (Receiver)</div>

                                {/* Wire 1: Input State */}
                                <div className="relative h-1">
                                    <div className="absolute inset-0 bg-slate-800 rounded-full"></div>
                                    <div className="absolute -left-4 -top-8 text-cyan-400 text-xs font-black uppercase">Input |𝜓⟩</div>

                                    {/* Alice's Part for Q1 */}
                                    <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-16 h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-10"></div>
                                    <div className="absolute top-1/2 left-[25%] -translate-y-1/2 w-14 h-14 bg-slate-200 text-slate-900 rounded-full border-4 border-slate-400 flex items-center justify-center text-xl font-black z-20 shadow-xl">●</div>
                                    <div className="absolute top-1/2 left-[40%] -translate-y-1/2 w-14 h-14 bg-emerald-600 text-white rounded-xl border-b-4 border-emerald-800 flex items-center justify-center text-2xl font-black z-20 shadow-xl">H</div>
                                    <div className="absolute top-1/2 left-[60%] -translate-y-1/2 w-16 h-16 bg-slate-800 text-slate-400 rounded-lg border-2 border-slate-700 flex items-center justify-center text-2xl font-black z-20 shadow-xl italic">M</div>

                                    {/* Connection Line to Bob for Q1 result */}
                                    <div className="absolute top-1/2 left-[60%] right-[15%] h-1 border-t-4 border-dashed border-indigo-500/40 -translate-y-1/2 z-0"></div>
                                </div>

                                {/* Wire 2: Alice's half of Bell Pair */}
                                <div className="relative h-1">
                                    <div className="absolute inset-0 bg-slate-800 rounded-full"></div>
                                    <div className="absolute -left-4 -top-8 text-emerald-400 text-xs font-black uppercase">Bell Pair</div>

                                    {/* CNOT link (Vertical) */}
                                    <div className="absolute top-[-80px] bottom-0 left-[25%] w-1 bg-indigo-500/40 z-0"></div>
                                    <div className="absolute top-1/2 left-[25%] -translate-y-1/2 w-14 h-14 bg-indigo-600 text-white rounded-full border-b-4 border-indigo-800 flex items-center justify-center text-3xl font-black z-20 shadow-xl">⊕</div>

                                    <div className="absolute top-1/2 left-[60%] -translate-y-1/2 w-16 h-16 bg-slate-800 text-slate-400 rounded-lg border-2 border-slate-700 flex items-center justify-center text-2xl font-black z-20 shadow-xl italic">M</div>

                                    {/* Connection Line to Bob for Q2 result */}
                                    <div className="absolute top-1/2 left-[60%] right-[30%] h-1 border-t-4 border-dashed border-indigo-500/40 -translate-y-1/2 z-0"></div>
                                </div>

                                {/* Wire 3: Bob's half of Bell Pair */}
                                <div className="relative h-1">
                                    <div className="absolute inset-0 bg-slate-800 rounded-full"></div>
                                    <div className="absolute -left-4 -top-8 text-blue-400 text-xs font-black uppercase">Bob's Qubit</div>

                                    {/* Entanglement Bridge (Alice and Bob) */}
                                    <div className="absolute left-[5%] right-[90%] top-1/2 -translate-y-1/2 h-1 bg-linear-to-r from-emerald-500 to-transparent"></div>

                                    {/* Bob's Corrections */}
                                    <div className="absolute top-1/2 right-[30%] -translate-y-1/2 w-14 h-14 bg-blue-600 text-white rounded-xl border-b-4 border-blue-800 flex items-center justify-center text-2xl font-black z-20 shadow-xl group/gate">
                                        X
                                        <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 h-10 border-l-2 border-dashed border-indigo-500/40"></div>
                                    </div>
                                    <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-14 h-14 bg-blue-600 text-white rounded-xl border-b-4 border-blue-800 flex items-center justify-center text-2xl font-black z-20 shadow-xl">
                                        Z
                                        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 h-[120px] border-l-2 border-dashed border-indigo-500/40"></div>
                                    </div>

                                    {/* Final Output */}
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0.5 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                        className="absolute top-1/2 right-0 -translate-y-1/2 w-20 h-20 bg-cyan-500 text-white rounded-full flex items-center justify-center text-2xl font-black z-30 shadow-[0_0_30px_rgba(6,182,212,0.6)] border-4 border-white/20"
                                    >
                                        |𝜓⟩
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="pt-24 flex justify-between">
                <Link href="/modules/4" className="flex items-center gap-4 px-6 md:px-10 py-4 md:py-5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xl font-bold rounded-2xl transition-all group">
                    <span className="group-hover:-translate-x-2 transition-transform">←</span>
                    Back
                </Link>
                <Link href="/modules/6" className="flex items-center gap-4 px-10 py-5 bg-cyan-600 hover:bg-cyan-500 text-white text-2xl md:text-4xl font-black rounded-2xl shadow-2xl border-b-8 border-cyan-800 transition-all active:border-b-0 active:translate-y-2 group">
                    Next: Quantum Algorithms
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
            </div>
        </div>
    )
}
