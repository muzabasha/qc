'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import CircuitBuilder from '@/components/quantum/CircuitBuilder'
import dynamic from 'next/dynamic'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import CodeBlock from '@/components/CodeBlock'

const BlochSphere = dynamic(() => import('@/components/quantum/BlochSphere'), { ssr: false })

export default function Module3() {

    return (
        <div className="max-w-[1400px] w-full mx-auto p-6 md:p-12 space-y-12 md:space-y-24 pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">Module 3: Quantum Gates</h1>
                <p className="text-lg md:text-xl text-slate-400 font-medium">Manipulating Reality: How to change a Qubit's state.</p>
            </header>

            {/* Topic 5 */}
            <section className="space-y-12">
                <div className="flex items-center gap-6">
                    <div className="bg-emerald-600/20 p-4 rounded-xl text-4xl">🕹️</div>
                    <h2 className="text-3xl md:text-5xl font-black text-emerald-400">Topic 5: The Pauli Gates (X, Y, Z)</h2>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="bg-slate-900 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl text-xl md:text-2xl text-slate-300 flex flex-col justify-center space-y-8">
                        <h3 className="text-4xl font-bold text-white mb-4 border-b-2 border-slate-800 pb-4">The Quantum NOT Gate</h3>
                        <p className="leading-relaxed">
                            In classical computing, a <strong className="text-white">NOT</strong> gate flips a 0 to 1, and 1 to 0.
                        </p>
                        <p className="leading-relaxed">
                            In quantum computing, this is the <strong className="text-emerald-400">Pauli-X Gate</strong>. It rotates the qubit state 180 degrees around the X-axis.
                        </p>

                        <div className="text-4xl md:text-6xl py-12 bg-slate-950 rounded-2xl my-6 flex justify-center shadow-inner overflow-x-auto p-4">
                            <BlockMath math="X = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}" />
                        </div>

                        <div className="bg-slate-800 p-8 rounded-2xl border-l-8 border-indigo-500 shadow-inner">
                            <strong className="text-indigo-400 block mb-4 text-2xl md:text-3xl">Action:</strong>
                            Apply the <strong className="text-white">X</strong> gate in the circuit builder to see the vector flip between Top |0⟩ and Bottom |1⟩.
                        </div>
                    </div>

                    <div className="bg-slate-800 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl space-y-8">
                        <h3 className="text-3xl md:text-4xl font-bold text-white">Interactive Lab: Flip the Vector</h3>
                        <div className="flex-1 min-h-[500px] border-4 border-slate-800 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-slate-950">
                            <BlochSphere />
                        </div>
                    </div>
                </div>
            </section>

            {/* Topic 6 */}
            <section className="space-y-12 pt-24 border-t-4 border-slate-800">
                <div className="flex items-center gap-6">
                    <div className="bg-indigo-600/20 p-4 rounded-xl text-4xl">🌟</div>
                    <h2 className="text-3xl md:text-5xl font-black text-indigo-400">Topic 6: The Hadamard Gate</h2>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="space-y-12">
                        <div className="bg-slate-900 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl text-xl md:text-2xl text-slate-300 h-full flex flex-col justify-center space-y-8">
                            <h3 className="text-4xl font-bold text-white mb-4 border-b-2 border-slate-800 pb-4">Entering Superposition</h3>
                            <p className="leading-relaxed">
                                The <strong className="text-cyan-400 font-bold">Hadamard (H)</strong> gate is the most important tool. It creates a perfect superposition.
                            </p>
                            <p className="leading-relaxed">
                                If you apply <strong className="text-white">H</strong> to |0⟩, it splits reality so you have a 50% chance of measuring |0⟩ or |1⟩.
                            </p>

                            <div className="text-4xl md:text-6xl py-12 bg-slate-950 rounded-2xl my-6 flex justify-center shadow-inner overflow-x-auto p-4">
                                <BlockMath math="H = \frac{1}{\sqrt{2}} \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}" />
                            </div>

                            <div className="bg-slate-800 p-8 rounded-2xl border-l-8 border-yellow-500 shadow-inner">
                                <strong className="text-yellow-400 block mb-4 text-2xl md:text-3xl">Fun Fact:</strong>
                                Applying H visually flips the vector to point straight along the X-axis (the equator)!
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="bg-slate-800 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl h-full flex flex-col space-y-8">
                            <h3 className="text-3xl md:text-4xl font-bold text-white">The Circuit Builder</h3>
                            <p className="text-lg md:text-xl text-slate-400 font-medium">
                                A quantum circuit applies gates sequentially from left to right. Click the buttons below to build your circuit.
                            </p>

                            <div className="mt-4 bg-slate-900 rounded-2xl p-4 md:p-8 border border-slate-700 shadow-inner">
                                <CircuitBuilder />
                            </div>

                            <div className="bg-slate-900/50 p-6 md:p-8 rounded-2xl border-l-8 border-emerald-500 shadow-inner space-y-6">
                                <h4 className="text-2xl md:text-3xl font-bold text-emerald-400">Mini Challenge:</h4>
                                <ul className="list-decimal ml-6 space-y-4 text-lg md:text-xl text-slate-300">
                                    <li>Reset the circuit and apply <strong className="text-white">H</strong>.</li>
                                    <li>Measure it a few times. Notice it's random.</li>
                                    <li>Apply <strong className="text-white">H</strong> twice. What happens?</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Python Code Example */}
            <section className="space-y-8 pt-24 border-t-4 border-slate-800">
                <div className="flex items-center gap-6">
                    <div className="bg-purple-600/20 p-4 rounded-xl text-4xl">💻</div>
                    <h2 className="text-3xl md:text-5xl font-black text-purple-400">Code It Yourself: Quantum Gates</h2>
                </div>
                <p className="text-xl text-slate-400">
                    Apply different quantum gates and observe how they transform qubit states. See the power of X, H, and other gates in action!
                </p>
                <CodeBlock
                    title="Exploring Quantum Gates"
                    description="Apply different quantum gates and observe how they transform qubit states."
                    code={[
                        {
                            code: "from qiskit import QuantumCircuit, transpile",
                            explanation: "Import necessary Qiskit components for building and optimizing circuits."
                        },
                        {
                            code: "from qiskit_aer import Aer",
                            explanation: "Import Aer simulator to run our quantum gates."
                        },
                        {
                            code: "",
                            explanation: "Empty line for readability."
                        },
                        {
                            code: "# Create circuit with 1 qubit and 1 classical bit",
                            explanation: "We need a classical bit to store measurement results."
                        },
                        {
                            code: "qc = QuantumCircuit(1, 1)",
                            explanation: "Initialize circuit. Qubit starts in |0⟩ state."
                        },
                        {
                            code: "",
                            explanation: "Spacing before gate application."
                        },
                        {
                            code: "# Apply X gate (NOT gate - flips |0⟩ to |1⟩)",
                            explanation: "The X gate is like a classical NOT gate - it flips the qubit state."
                        },
                        {
                            code: "qc.x(0)",
                            explanation: "Apply X gate to qubit 0. This transforms |0⟩ → |1⟩ and |1⟩ → |0⟩."
                        },
                        {
                            code: "",
                            explanation: "Spacing between operations."
                        },
                        {
                            code: "# Apply H gate (creates superposition)",
                            explanation: "Hadamard gate creates or removes superposition."
                        },
                        {
                            code: "qc.h(0)",
                            explanation: "Apply H gate. Since we're in |1⟩, this creates (|0⟩ - |1⟩)/√2 - note the minus sign!"
                        },
                        {
                            code: "",
                            explanation: "Spacing before measurement."
                        },
                        {
                            code: "# Measure the qubit",
                            explanation: "Collapse the superposition to get a definite result."
                        },
                        {
                            code: "qc.measure(0, 0)",
                            explanation: "Measure qubit 0, store result in classical bit 0."
                        },
                        {
                            code: "",
                            explanation: "Spacing before simulation."
                        },
                        {
                            code: "# Run the circuit multiple times",
                            explanation: "Run 1000 times to see the probability distribution."
                        },
                        {
                            code: "simulator = Aer.get_backend('qasm_simulator')",
                            explanation: "Get the quantum assembly simulator."
                        },
                        {
                            code: "compiled = transpile(qc, simulator)",
                            explanation: "Optimize the circuit for the simulator."
                        },
                        {
                            code: "job = simulator.run(compiled, shots=1000)",
                            explanation: "Execute 1000 shots (repetitions) of the circuit."
                        },
                        {
                            code: "result = job.result()",
                            explanation: "Wait for completion and retrieve results."
                        },
                        {
                            code: "counts = result.get_counts()",
                            explanation: "Get the count of how many times we measured 0 vs 1."
                        },
                        {
                            code: "",
                            explanation: "Final spacing."
                        },
                        {
                            code: "print(f'Results: {counts}')",
                            explanation: "Print the measurement counts. You should see roughly 50-50 distribution again!"
                        },
                        {
                            code: "print(f'Circuit diagram:\\n{qc.draw()}')",
                            explanation: "Print a text diagram of the circuit showing X → H → Measure sequence."
                        }
                    ]}
                    output={`Results: {'0': 489, '1': 511}
Circuit diagram:
     ┌───┐┌───┐┌─┐
q_0: ┤ X ├┤ H ├┤M├
     └───┘└───┘└╥┘
c: 1/═══════════╩═
                0

Explanation:
- X gate flipped |0⟩ to |1⟩
- H gate created superposition from |1⟩
- Result: ~50-50 distribution
- The circuit diagram shows the gate sequence visually!`}
                    language="python"
                />
            </section>

            <div className="pt-24 flex justify-between">
                <Link href="/modules/2" className="flex items-center gap-4 px-6 md:px-10 py-4 md:py-5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xl font-bold rounded-2xl transition-all group">
                    <span className="group-hover:-translate-x-2 transition-transform">←</span>
                    Back
                </Link>
                <Link href="/modules/4" className="flex items-center gap-4 px-10 py-5 bg-cyan-600 hover:bg-cyan-500 text-white text-2xl md:text-4xl font-black rounded-2xl shadow-2xl border-b-8 border-cyan-800 transition-all active:border-b-0 active:translate-y-2 group">
                    Next: Entanglement
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
            </div>
        </div>
    )
}
