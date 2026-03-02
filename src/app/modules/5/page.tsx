'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import CodeBlock from '@/components/CodeBlock'

export default function Module5() {
    return (
        <div className="max-w-[1400px] w-full mx-auto p-6 md:p-12 space-y-12 md:space-y-24 pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">Module 5: Quantum Circuits</h1>
                <p className="text-lg md:text-xl text-slate-400 font-medium">Wiring up the Quantum Future: Complex Operations.</p>
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

                    <div className="bg-slate-800 p-4 md:p-8 lg:p-12 rounded-[32px] border border-slate-700 shadow-2xl flex flex-col space-y-6 md:space-y-8">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">The Teleportation Circuit</h3>
                        <p className="text-base md:text-lg lg:text-xl text-slate-400 font-medium">
                            Quantum Teleportation doesn't move matter—it "beams" the exact quantum state information using an entangled bridge!
                        </p>

                        <div className="flex-1 bg-slate-950 rounded-[24px] border-2 border-slate-800 p-4 md:p-6 lg:p-12 flex flex-col justify-center items-center shadow-inner relative overflow-x-auto scrollbar-hide">
                            <div className="w-full min-w-[280px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[700px] py-6 md:py-12 space-y-12 md:space-y-20 relative">

                                {/* Alice Section Label */}
                                <div className="absolute top-0 left-0 text-emerald-500 font-black text-[10px] sm:text-xs md:text-sm uppercase tracking-wider bg-emerald-500/10 px-2 sm:px-3 md:px-4 py-1 rounded-full border border-emerald-500/20 whitespace-nowrap">Alice</div>
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-indigo-400 font-black text-[10px] sm:text-xs md:text-sm uppercase tracking-wider bg-indigo-500/10 px-2 sm:px-3 md:px-4 py-1 rounded-full border border-indigo-500/20 text-center whitespace-nowrap hidden sm:block">Classical</div>
                                <div className="absolute top-0 right-0 text-blue-400 font-black text-[10px] sm:text-xs md:text-sm uppercase tracking-wider bg-blue-500/10 px-2 sm:px-3 md:px-4 py-1 rounded-full border border-blue-500/20 whitespace-nowrap">Bob</div>

                                {/* Wire 1: Input State */}
                                <div className="relative h-1">
                                    <div className="absolute inset-0 bg-slate-800 rounded-full"></div>
                                    <div className="absolute -left-2 sm:-left-4 -top-6 sm:-top-8 text-cyan-400 text-[10px] sm:text-xs font-black uppercase">|𝜓⟩</div>

                                    {/* Alice's Part for Q1 */}
                                    <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-8 sm:w-12 md:w-16 h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-10"></div>
                                    <div className="absolute top-1/2 left-[25%] -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-slate-200 text-slate-900 rounded-full border-2 sm:border-4 border-slate-400 flex items-center justify-center text-base sm:text-lg md:text-xl font-black z-20 shadow-xl">●</div>
                                    <div className="absolute top-1/2 left-[40%] -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-emerald-600 text-white rounded-xl border-b-2 sm:border-b-4 border-emerald-800 flex items-center justify-center text-lg sm:text-xl md:text-2xl font-black z-20 shadow-xl">H</div>
                                    <div className="absolute top-1/2 left-[60%] -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-slate-800 text-slate-400 rounded-lg border-2 border-slate-700 flex items-center justify-center text-lg sm:text-xl md:text-2xl font-black z-20 shadow-xl italic">M</div>

                                    {/* Connection Line to Bob for Q1 result */}
                                    <div className="absolute top-1/2 left-[60%] right-[15%] h-1 border-t-2 sm:border-t-4 border-dashed border-indigo-500/40 -translate-y-1/2 z-0"></div>
                                </div>

                                {/* Wire 2: Alice's half of Bell Pair */}
                                <div className="relative h-1">
                                    <div className="absolute inset-0 bg-slate-800 rounded-full"></div>
                                    <div className="absolute -left-2 sm:-left-4 -top-6 sm:-top-8 text-emerald-400 text-[10px] sm:text-xs font-black uppercase">Bell</div>

                                    {/* CNOT link (Vertical) */}
                                    <div className="absolute top-[-48px] sm:top-[-60px] md:top-[-80px] bottom-0 left-[25%] w-1 bg-indigo-500/40 z-0"></div>
                                    <div className="absolute top-1/2 left-[25%] -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-indigo-600 text-white rounded-full border-b-2 sm:border-b-4 border-indigo-800 flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-black z-20 shadow-xl">⊕</div>

                                    <div className="absolute top-1/2 left-[60%] -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-slate-800 text-slate-400 rounded-lg border-2 border-slate-700 flex items-center justify-center text-lg sm:text-xl md:text-2xl font-black z-20 shadow-xl italic">M</div>

                                    {/* Connection Line to Bob for Q2 result */}
                                    <div className="absolute top-1/2 left-[60%] right-[30%] h-1 border-t-2 sm:border-t-4 border-dashed border-indigo-500/40 -translate-y-1/2 z-0"></div>
                                </div>

                                {/* Wire 3: Bob's half of Bell Pair */}
                                <div className="relative h-1">
                                    <div className="absolute inset-0 bg-slate-800 rounded-full"></div>
                                    <div className="absolute -left-2 sm:-left-4 -top-6 sm:-top-8 text-blue-400 text-[10px] sm:text-xs font-black uppercase">Bob</div>

                                    {/* Entanglement Bridge (Alice and Bob) */}
                                    <div className="absolute left-[5%] right-[90%] top-1/2 -translate-y-1/2 h-1 bg-linear-to-r from-emerald-500 to-transparent"></div>

                                    {/* Bob's Corrections */}
                                    <div className="absolute top-1/2 right-[30%] -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-600 text-white rounded-xl border-b-2 sm:border-b-4 border-blue-800 flex items-center justify-center text-lg sm:text-xl md:text-2xl font-black z-20 shadow-xl group/gate">
                                        X
                                        <div className="absolute top-[-24px] sm:top-[-32px] md:top-[-40px] left-1/2 -translate-x-1/2 h-6 sm:h-8 md:h-10 border-l-2 border-dashed border-indigo-500/40"></div>
                                    </div>
                                    <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-600 text-white rounded-xl border-b-2 sm:border-b-4 border-blue-800 flex items-center justify-center text-lg sm:text-xl md:text-2xl font-black z-20 shadow-xl">
                                        Z
                                        <div className="absolute top-[-72px] sm:top-[-96px] md:top-[-120px] left-1/2 -translate-x-1/2 h-[72px] sm:h-[96px] md:h-[120px] border-l-2 border-dashed border-indigo-500/40"></div>
                                    </div>

                                    {/* Final Output */}
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0.5 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                        className="absolute top-1/2 right-0 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-cyan-500 text-white rounded-full flex items-center justify-center text-lg sm:text-xl md:text-2xl font-black z-30 shadow-[0_0_30px_rgba(6,182,212,0.6)] border-2 sm:border-4 border-white/20"
                                    >
                                        |𝜓⟩
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Code Example */}
            <section className="space-y-8">
                <CodeBlock
                    title="Building a 3-Qubit Quantum Circuit"
                    description="Create a more complex circuit with multiple qubits and gates."
                    code={[
                        {
                            code: "from qiskit import QuantumCircuit",
                            explanation: "Import QuantumCircuit for building multi-qubit circuits."
                        },
                        {
                            code: "from qiskit.visualization import circuit_drawer",
                            explanation: "Import circuit_drawer to visualize our complex circuit."
                        },
                        {
                            code: "",
                            explanation: "Empty line for organization."
                        },
                        {
                            code: "# Create a 3-qubit circuit",
                            explanation: "More qubits = more computational power! 3 qubits can represent 8 states simultaneously."
                        },
                        {
                            code: "qc = QuantumCircuit(3, 3)",
                            explanation: "Initialize circuit with 3 qubits and 3 classical bits. State space is 2³ = 8 dimensional!"
                        },
                        {
                            code: "",
                            explanation: "Spacing before building circuit."
                        },
                        {
                            code: "# Layer 1: Create superposition on all qubits",
                            explanation: "Apply H gates to all qubits to explore the full 8-dimensional state space."
                        },
                        {
                            code: "qc.h(0)",
                            explanation: "Put qubit 0 in superposition."
                        },
                        {
                            code: "qc.h(1)",
                            explanation: "Put qubit 1 in superposition."
                        },
                        {
                            code: "qc.h(2)",
                            explanation: "Put qubit 2 in superposition. Now we have equal superposition of all 8 possible states: |000⟩, |001⟩, ..., |111⟩!"
                        },
                        {
                            code: "",
                            explanation: "Spacing between layers."
                        },
                        {
                            code: "# Layer 2: Create entanglement",
                            explanation: "Use CNOT gates to entangle the qubits."
                        },
                        {
                            code: "qc.cx(0, 1)",
                            explanation: "Entangle qubit 0 (control) with qubit 1 (target)."
                        },
                        {
                            code: "qc.cx(1, 2)",
                            explanation: "Entangle qubit 1 (control) with qubit 2 (target). Now all 3 qubits are entangled!"
                        },
                        {
                            code: "",
                            explanation: "Spacing before measurement."
                        },
                        {
                            code: "# Layer 3: Add a barrier for visualization",
                            explanation: "Barriers don't affect computation but make circuit diagrams clearer."
                        },
                        {
                            code: "qc.barrier()",
                            explanation: "Add a visual barrier in the circuit diagram to separate computation from measurement."
                        },
                        {
                            code: "",
                            explanation: "Spacing before measurement."
                        },
                        {
                            code: "# Measure all qubits",
                            explanation: "Measure all 3 qubits to collapse the quantum state."
                        },
                        {
                            code: "qc.measure([0, 1, 2], [0, 1, 2])",
                            explanation: "Measure qubits 0, 1, 2 and store in classical bits 0, 1, 2 respectively."
                        },
                        {
                            code: "",
                            explanation: "Final spacing."
                        },
                        {
                            code: "# Display the circuit",
                            explanation: "Let's see what our 3-qubit circuit looks like!"
                        },
                        {
                            code: "print(qc.draw())",
                            explanation: "Print the circuit diagram showing all gates, entanglement, and measurements."
                        },
                        {
                            code: "print(f'\\nCircuit depth: {qc.depth()}')",
                            explanation: "Circuit depth is the longest path through the circuit - important for error rates on real quantum computers."
                        },
                        {
                            code: "print(f'Total gates: {qc.size()}')",
                            explanation: "Count total number of gates. More gates = more potential for errors on real hardware."
                        }
                    ]}
                    output={`     ┌───┐          ░ ┌─┐      
q_0: ┤ H ├──■───────░─┤M├──────
     ├───┤┌─┴─┐     ░ └╥┘┌─┐   
q_1: ┤ H ├┤ X ├──■──░──╫─┤M├───
     ├───┤└───┘┌─┴─┐░  ║ └╥┘┌─┐
q_2: ┤ H ├─────┤ X ├░──╫──╫─┤M├
     └───┘     └───┘░  ║  ║ └╥┘
c: 3/═══════════════════╩══╩══╩═
                        0  1  2

Circuit depth: 4
Total gates: 8

Explanation:
- 3 H gates create superposition
- 2 CNOT gates create entanglement
- Barrier (░) separates computation from measurement
- Depth of 4 means 4 time steps needed
- This circuit creates a GHZ state: (|000⟩ + |111⟩)/√2`}
                    language="python"
                />
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
