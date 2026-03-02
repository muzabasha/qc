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

                        <div className="flex-1 bg-slate-950 rounded-2xl border-2 border-slate-700 p-6 md:p-8 flex flex-col justify-center items-center shadow-inner relative overflow-x-auto">
                            <div className="flex flex-col gap-12 w-full min-w-[600px] max-w-[800px] font-mono text-2xl md:text-3xl font-bold text-slate-300">
                                {/* Alice Qubit 1 */}
                                <div className="flex items-center gap-6">
                                    <span className="text-cyan-400 w-32 uppercase text-base">State |𝜓⟩</span>
                                    <div className="h-2 bg-slate-700 flex-1 relative rounded-full">
                                        <div className="absolute top-1/2 left-[15%] -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-slate-200 text-slate-900 rounded-full border-2 border-slate-400 flex items-center justify-center text-xs">●</div>
                                        <div className="absolute top-1/2 left-[45%] -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center text-white border-b-4 border-emerald-800 text-lg">H</div>
                                        <div className="absolute top-1/2 left-[85%] -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-slate-200 text-slate-900 rounded-full border-2 border-slate-400 flex items-center justify-center text-lg italic">M</div>
                                    </div>
                                </div>

                                {/* Alice Qubit 2 */}
                                <div className="flex items-center gap-6">
                                    <span className="text-emerald-400 w-32 uppercase text-base">Bell A</span>
                                    <div className="h-2 bg-slate-700 flex-1 relative rounded-full">
                                        <div className="absolute top-1/2 left-[5%] -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center text-white border-b-4 border-emerald-800 text-lg">H</div>
                                        <div className="absolute top-0 bottom-[-50px] w-1 bg-indigo-500/30 left-[15%] z-0"></div>
                                        <div className="absolute top-1/2 left-[15%] -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-slate-200 text-slate-900 rounded-full border-2 border-slate-400 flex items-center justify-center text-xs z-10">●</div>
                                        <div className="absolute top-1/2 left-[30%] -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white border-b-4 border-indigo-800 text-2xl">⊕</div>
                                        <div className="absolute top-1/2 left-[85%] -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-slate-200 text-slate-900 rounded-full border-2 border-slate-400 flex items-center justify-center text-lg italic">M</div>
                                    </div>
                                </div>

                                {/* Bob Qubit 3 */}
                                <div className="flex items-center gap-6 bg-slate-900/50 p-4 rounded-xl">
                                    <span className="text-indigo-400 w-24 uppercase text-base">Bob</span>
                                    <div className="h-2 bg-slate-700 flex-1 relative rounded-full">
                                        <div className="absolute top-1/2 left-[15%] -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white border-b-4 border-indigo-800 text-2xl">⊕</div>
                                        <div className="absolute top-1/2 left-[60%] -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white border-b-4 border-blue-800 text-lg">X</div>
                                        <div className="absolute top-1/2 left-[75%] -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white border-b-4 border-blue-800 text-lg">Z</div>
                                        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-16 h-16 bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] rounded-full flex items-center justify-center text-xl">|𝜓⟩</div>
                                    </div>
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
