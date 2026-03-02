'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import CodeBlock from '@/components/CodeBlock'

export default function Module4() {
    const [isEntangled, setIsEntangled] = useState(false)
    const [qubitA, setQubitA] = useState<'?' | '0' | '1'>('?')
    const [qubitB, setQubitB] = useState<'?' | '0' | '1'>('?')

    const handleMeasureA = () => {
        const outcome = Math.random() > 0.5 ? '0' : '1'
        setQubitA(outcome)

        if (isEntangled) {
            // Instant change on Qubit B based on Bell State |Φ+⟩ = 1/√2(|00⟩ + |11⟩)
            setQubitB(outcome)
        }
    }

    const handleMeasureB = () => {
        const outcome = Math.random() > 0.5 ? '0' : '1'
        setQubitB(outcome)

        if (isEntangled) {
            // Instant change on Qubit A based on Bell State
            setQubitA(outcome)
        }
    }

    const handleReset = () => {
        setQubitA('?')
        setQubitB('?')
    }

    return (
        <div className="max-w-[1400px] w-full mx-auto p-6 md:p-12 space-y-12 md:space-y-24 pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">Module 4: Entanglement</h1>
                <p className="text-lg md:text-xl text-slate-400 font-medium">Spooky Action at a Distance: Connecting Qubits Across Space.</p>
            </header>

            {/* Topic 7 */}
            <section className="space-y-12">
                <div className="flex items-center gap-6">
                    <div className="bg-emerald-600/20 p-4 rounded-xl text-4xl">🔗</div>
                    <h2 className="text-3xl md:text-5xl font-black text-emerald-400">Topic 7: The Bell State</h2>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="bg-slate-900 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl text-xl md:text-2xl text-slate-300 flex flex-col justify-center space-y-8">
                        <h3 className="text-4xl font-bold text-white mb-4 border-b-2 border-slate-800 pb-4">The Invisible Connection</h3>
                        <p className="leading-relaxed">
                            Two qubits can become linked together in a way that the state of one instantly determines the state of the other, no matter how far apart they are. Einstein famously called this <strong className="text-blue-400">"spooky action at a distance."</strong>
                        </p>

                        <div className="text-4xl md:text-6xl py-12 bg-slate-950 rounded-2xl my-6 flex justify-center items-center shadow-inner overflow-x-auto p-4">
                            <BlockMath math="| \Phi^+ \rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)" />
                        </div>

                        <div className="bg-slate-800 p-8 rounded-2xl border-l-8 border-indigo-500 shadow-inner">
                            <strong className="text-indigo-400 block mb-4 text-2xl md:text-3xl">The Logic:</strong>
                            This system is in a superposition of BOTH being <strong className="text-emerald-400 font-mono">0</strong>, or BOTH being <strong className="text-blue-400 font-mono">1</strong>. They are perfectly synced!
                        </div>
                    </div>

                    <div className="bg-slate-800 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl flex flex-col items-center justify-center min-h-[700px] space-y-12 relative overflow-hidden">
                        <h3 className="text-3xl md:text-4xl font-bold text-white text-center z-10">Interactive Lab: Twin Qubits</h3>

                        <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-900/50 p-6 rounded-3xl z-10 border border-slate-700">
                            <button
                                className={`px-6 py-3 text-lg md:text-xl font-bold rounded-xl transition-all ${!isEntangled ? 'bg-red-600 text-white shadow-lg border-b-4 border-red-800' : 'bg-transparent text-slate-400 hover:bg-slate-800'}`}
                                onClick={() => { setIsEntangled(false); handleReset(); }}
                            >
                                Separated
                            </button>
                            <button
                                className={`px-6 py-3 text-lg md:text-xl font-bold rounded-xl transition-all ${isEntangled ? 'bg-indigo-600 text-white shadow-lg border-b-4 border-indigo-800' : 'bg-transparent text-slate-400 hover:bg-slate-800'}`}
                                onClick={() => { setIsEntangled(true); handleReset(); }}
                            >
                                Entangled
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 relative z-10 w-full justify-center lg:px-12">
                            {/* Qubit A */}
                            <div className="flex flex-col items-center gap-6">
                                <motion.div
                                    className="w-40 h-40 md:w-48 md:h-48 rounded-full flex items-center justify-center text-4xl md:text-6xl font-extrabold border-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-slate-900 border-indigo-500"
                                    animate={{
                                        rotateY: qubitA === '?' ? 360 * 10 : 0,
                                        borderColor: qubitA === '0' ? '#10b981' : qubitA === '1' ? '#3b82f6' : '#6366f1'
                                    }}
                                    transition={{ duration: qubitA === '?' ? 20 : 0.5, ease: "linear", repeat: qubitA === '?' ? Infinity : 0 }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    {qubitA === '?' ? <span className="text-indigo-400 animate-pulse">?</span> : <span className={qubitA === '0' ? "text-emerald-400" : "text-blue-400"}>|{qubitA}⟩</span>}
                                </motion.div>
                                <button
                                    onClick={handleMeasureA}
                                    disabled={qubitA !== '?'}
                                    className="w-full px-8 py-4 text-xl font-bold rounded-xl text-white bg-emerald-600 hover:bg-emerald-500 border-b-6 border-emerald-800 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50"
                                >
                                    Measure A
                                </button>
                            </div>

                            {/* Connecting Line */}
                            <div className="w-1 md:w-24 h-12 md:h-1 bg-slate-700 relative overflow-hidden flex items-center justify-center">
                                {isEntangled && (
                                    <motion.div
                                        className="absolute inset-0 bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.8)]"
                                        animate={{ opacity: [0.2, 1, 0.2] }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                    />
                                )}
                            </div>

                            {/* Qubit B */}
                            <div className="flex flex-col items-center gap-6">
                                <motion.div
                                    className="w-40 h-40 md:w-48 md:h-48 rounded-full flex items-center justify-center text-4xl md:text-6xl font-extrabold border-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-slate-900 border-indigo-500"
                                    animate={{
                                        rotateY: qubitB === '?' ? 360 * 10 : 0,
                                        borderColor: qubitB === '0' ? '#10b981' : qubitB === '1' ? '#3b82f6' : '#6366f1'
                                    }}
                                    transition={{ duration: qubitB === '?' ? 20 : 0.5, ease: "linear", repeat: qubitB === '?' ? Infinity : 0 }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    {qubitB === '?' ? <span className="text-indigo-400 animate-pulse">?</span> : <span className={qubitB === '0' ? "text-emerald-400" : "text-blue-400"}>|{qubitB}⟩</span>}
                                </motion.div>
                                <button
                                    onClick={handleMeasureB}
                                    disabled={qubitB !== '?'}
                                    className="w-full px-8 py-4 text-xl font-bold rounded-xl text-white bg-emerald-600 hover:bg-emerald-500 border-b-6 border-emerald-800 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50"
                                >
                                    Measure B
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-6 z-10 w-full">
                            <button
                                onClick={handleReset}
                                className="px-10 py-4 bg-slate-700 md:text-2xl font-bold rounded-xl text-slate-300 hover:bg-slate-600 transition-all border-b-4 border-slate-900 active:border-b-0 active:translate-y-1"
                            >
                                Reset Qubits
                            </button>

                            <div className="bg-slate-900 p-6 rounded-2xl text-lg md:text-xl text-slate-400 text-center border border-slate-700 shadow-inner w-full max-w-2xl">
                                {isEntangled ? (
                                    <p><strong>Entangled:</strong> Measuring one qubit instantly determines the other's state!</p>
                                ) : (
                                    <p><strong>Separated:</strong> Each qubit is independent. Outcomes are random and separate.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Code Example */}
            <section className="space-y-8">
                <CodeBlock
                    title="Creating Entangled Qubits (Bell State)"
                    description="Learn how to create quantum entanglement using H and CNOT gates."
                    code={[
                        {
                            code: "from qiskit import QuantumCircuit, transpile",
                            explanation: "Import Qiskit components. We'll need 2 qubits for entanglement!"
                        },
                        {
                            code: "from qiskit_aer import Aer",
                            explanation: "Import simulator to run our entanglement circuit."
                        },
                        {
                            code: "",
                            explanation: "Empty line for organization."
                        },
                        {
                            code: "# Create circuit with 2 qubits and 2 classical bits",
                            explanation: "Entanglement requires at least 2 qubits. We need 2 classical bits to measure both."
                        },
                        {
                            code: "qc = QuantumCircuit(2, 2)",
                            explanation: "Initialize circuit with 2 qubits (both start in |00⟩) and 2 classical bits."
                        },
                        {
                            code: "",
                            explanation: "Spacing before creating entanglement."
                        },
                        {
                            code: "# Step 1: Create superposition on first qubit",
                            explanation: "First, we put qubit 0 into superposition. This is the setup for entanglement."
                        },
                        {
                            code: "qc.h(0)",
                            explanation: "Apply H gate to qubit 0. Now it's in state (|0⟩ + |1⟩)/√2. Qubit 1 is still |0⟩."
                        },
                        {
                            code: "",
                            explanation: "Spacing between steps."
                        },
                        {
                            code: "# Step 2: Entangle qubits with CNOT",
                            explanation: "CNOT (Controlled-NOT) is the magic gate that creates entanglement!"
                        },
                        {
                            code: "qc.cx(0, 1)",
                            explanation: "Apply CNOT with qubit 0 as control, qubit 1 as target. This creates the Bell state (|00⟩ + |11⟩)/√2. The qubits are now entangled!"
                        },
                        {
                            code: "",
                            explanation: "Spacing before measurement."
                        },
                        {
                            code: "# Measure both qubits",
                            explanation: "When we measure entangled qubits, their results are correlated!"
                        },
                        {
                            code: "qc.measure([0, 1], [0, 1])",
                            explanation: "Measure both qubits. If qubit 0 is 0, qubit 1 will also be 0. If qubit 0 is 1, qubit 1 will be 1. They're perfectly correlated!"
                        },
                        {
                            code: "",
                            explanation: "Spacing before simulation."
                        },
                        {
                            code: "# Simulate the entangled circuit",
                            explanation: "Let's run this 1000 times to see the correlation."
                        },
                        {
                            code: "simulator = Aer.get_backend('qasm_simulator')",
                            explanation: "Get the simulator backend."
                        },
                        {
                            code: "compiled = transpile(qc, simulator)",
                            explanation: "Compile the circuit for execution."
                        },
                        {
                            code: "job = simulator.run(compiled, shots=1000)",
                            explanation: "Run 1000 shots to observe the entanglement pattern."
                        },
                        {
                            code: "result = job.result()",
                            explanation: "Get the simulation results."
                        },
                        {
                            code: "counts = result.get_counts()",
                            explanation: "Extract measurement counts. We should only see '00' and '11', never '01' or '10'!"
                        },
                        {
                            code: "",
                            explanation: "Final spacing."
                        },
                        {
                            code: "print(f'Entanglement results: {counts}')",
                            explanation: "Print results. Notice: only '00' and '11' appear! The qubits are perfectly correlated - that's entanglement!"
                        },
                        {
                            code: "print(f'\\nCircuit:\\n{qc.draw()}')",
                            explanation: "Show the circuit diagram: H on qubit 0, then CNOT connecting both qubits."
                        }
                    ]}
                    output={`Entanglement results: {'00': 514, '11': 486}

Circuit:
     ┌───┐     ┌─┐   
q_0: ┤ H ├──■──┤M├───
     └───┘┌─┴─┐└╥┘┌─┐
q_1: ─────┤ X ├─╫─┤M├
          └───┘ ║ └╥┘
c: 2/═══════════╩══╩═
                0  1

Explanation:
- We ONLY see '00' and '11', never '01' or '10'
- This proves the qubits are entangled!
- When one is measured as 0, the other is always 0
- When one is measured as 1, the other is always 1
- This correlation exists even if qubits are separated!
- Einstein called this "spooky action at a distance"`}
                    language="python"
                />
            </section>

            <div className="pt-24 flex justify-between">
                <Link href="/modules/3" className="flex items-center gap-4 px-6 md:px-10 py-4 md:py-5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xl font-bold rounded-2xl transition-all group">
                    <span className="group-hover:-translate-x-2 transition-transform">←</span>
                    Back
                </Link>
                <Link href="/modules/5" className="flex items-center gap-4 px-10 py-5 bg-cyan-600 hover:bg-cyan-500 text-white text-2xl md:text-4xl font-black rounded-2xl shadow-2xl border-b-8 border-cyan-800 transition-all active:border-b-0 active:translate-y-2 group">
                    Next: Quantum Circuits
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
            </div>
        </div>
    )
}
