'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function Module5() {
    return (
        <div className="max-w-[1400px] w-full mx-auto p-12 space-y-24 pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-8xl font-extrabold text-white mb-6">Module 5: Quantum Circuits</h1>
                <p className="text-4xl text-slate-400">Wiring up the Quantum Future</p>
            </header>

            {/* Topic 8 */}
            <section className="space-y-12">
                <h2 className="text-5xl font-black text-emerald-400">Topic 8: Building Complex Circuits</h2>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="bg-slate-900 p-12 rounded-3xl border border-slate-700 shadow-2xl text-2xl text-slate-300">
                        <h3 className="text-4xl font-bold text-white mb-8 border-b-2 border-slate-800 pb-4">Multi-Qubit Gates</h3>
                        <p className="mb-8 leading-relaxed">
                            A real quantum computer has many qubits. We use multi-qubit gates to entangle them. The most famous is the <strong className="text-cyan-400">CNOT (Controlled-NOT)</strong> gate.
                        </p>
                        <p className="mb-8 leading-relaxed">
                            A CNOT gate looks at the <strong>Control Qubit</strong>. If the Control is <strong className="text-indigo-400 font-mono">|1⟩</strong>, it flips the <strong>Target Qubit</strong>. If the Control is <strong className="text-emerald-400 font-mono">|0⟩</strong>, it does nothing!
                        </p>

                        <div className="text-5xl py-12 bg-slate-950 rounded-2xl my-10 flex flex-col gap-6 justify-center items-center shadow-inner overflow-x-auto">
                            <BlockMath math="|00\rangle \xrightarrow{CNOT} |00\rangle" />
                            <BlockMath math="|10\rangle \xrightarrow{CNOT} |11\rangle" />
                        </div>
                    </div>

                    <div className="bg-slate-800 p-12 rounded-3xl border border-slate-700 shadow-2xl flex flex-col">
                        <h3 className="text-4xl font-bold text-white mb-12">The Teleportation Circuit</h3>

                        <p className="text-2xl text-slate-400 mb-12">
                            Quantum Teleportation isn't beaming physical matter like Star Trek. Instead, it "teleports" the exact quantum state information of a qubit from Alice to Bob using an Entangled pair (a Bell State) as the bridge!
                        </p>

                        <div className="flex-1 bg-slate-950 rounded-2xl border-2 border-slate-700 p-8 flex flex-col justify-center items-center shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-x-auto">

                            <div className="flex flex-col gap-12 w-full min-w-[700px] max-w-[800px] font-mono text-3xl font-bold text-slate-300">
                                {/* Alice Qubit 1 */}
                                <div className="flex items-center gap-6">
                                    <span className="text-cyan-400">|𝜓⟩ Alice</span>
                                    <div className="h-2 bg-slate-600 flex-1 relative rounded-full">
                                        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-16 h-16 bg-slate-200 text-slate-900 rounded-full border-4 border-slate-400 flex items-center justify-center tracking-tighter">●</div>
                                        <div className="absolute top-1/2 left-2/4 -translate-y-1/2 -translate-x-1/2 w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center text-white border-b-4 border-emerald-800">H</div>
                                        <div className="absolute top-1/2 left-3/4 -translate-y-1/2 -translate-x-1/2 w-20 h-20 bg-slate-200 text-slate-900 rounded-full border-4 border-slate-400 flex items-center justify-center text-5xl">M</div>
                                    </div>
                                </div>

                                {/* Alice Qubit 2 (Entangled ½) */}
                                <div className="flex items-center gap-6">
                                    <span className="text-emerald-400 w-44">|0⟩ Alice (Bell)</span>
                                    <div className="h-2 bg-slate-600 flex-1 relative rounded-full">
                                        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center text-white border-b-4 border-emerald-800">H</div>
                                        {/* Vertical line connecting H to Alice Qubit 3 X */}
                                        <div className="absolute top-0 bottom-[-60px] w-2 bg-indigo-500 left-12 z-0 opacity-50"></div>
                                        <div className="absolute top-1/2 left-12 -translate-y-1/2 -translate-x-1/2 w-16 h-16 bg-slate-200 text-slate-900 rounded-full border-4 border-slate-400 flex items-center justify-center tracking-tighter z-10">●</div>

                                        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white border-b-4 border-indigo-800">⊕</div>
                                        <div className="absolute top-1/2 left-3/4 -translate-y-1/2 -translate-x-1/2 w-20 h-20 bg-slate-200 text-slate-900 rounded-full border-4 border-slate-400 flex items-center justify-center text-5xl">M</div>
                                    </div>
                                </div>

                                {/* Bob Qubit 3 (Entangled ½) */}
                                <div className="flex items-center gap-6 mt-12 bg-slate-900 rounded-2xl p-4 shadow-xl">
                                    <span className="text-indigo-400 w-40">|0⟩ Bob (Bell)</span>
                                    <div className="h-2 bg-slate-600 flex-1 relative rounded-full">
                                        {/* CNOT Target from Entanglement */}
                                        <div className="absolute top-1/2 left-12 -translate-y-1/2 -translate-x-1/2 w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white border-b-4 border-indigo-800 z-10">⊕</div>

                                        <div className="absolute top-1/2 left-[60%] -translate-y-1/2 -translate-x-1/2 w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white border-b-4 border-blue-800">X</div>
                                        <div className="absolute top-1/2 left-[80%] -translate-y-1/2 -translate-x-1/2 w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white border-b-4 border-blue-800">Z</div>
                                        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-20 h-20 bg-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)] rounded-full flex items-center justify-center text-3xl">|𝜓⟩</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <div className="pt-24 flex justify-between">
                <Link href="/modules/4" className="flex items-center gap-4 px-12 py-6 bg-slate-800 hover:bg-slate-700 text-slate-300 text-3xl font-bold rounded-2xl transition-all group">
                    <span className="group-hover:-translate-x-2 transition-transform">←</span>
                    Back: Entanglement
                </Link>
                <Link href="/modules/6" className="flex items-center gap-4 px-12 py-6 bg-cyan-600 hover:bg-cyan-500 text-white text-3xl font-black rounded-2xl shadow-2xl border-b-8 border-cyan-800 transition-all active:border-b-0 active:translate-y-2 group">
                    Next: Quantum Algorithms
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
            </div>
        </div>
    )
}
