'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import CircuitBuilder from '@/components/quantum/CircuitBuilder'
import dynamic from 'next/dynamic'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

const BlochSphere = dynamic(() => import('@/components/quantum/BlochSphere'), { ssr: false })

export default function Module3() {

    return (
        <div className="max-w-[1600px] w-full mx-auto p-12 space-y-24 pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-8xl font-extrabold text-white mb-6">Module 3: Quantum Gates</h1>
                <p className="text-4xl text-slate-400">Manipulating Reality: How to change a Qubit's state.</p>
            </header>

            {/* Topic 5 */}
            <section className="space-y-12">
                <h2 className="text-5xl font-black text-emerald-400">Topic 5: The Pauli Gates (X, Y, Z)</h2>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="bg-slate-900 p-12 rounded-3xl border border-slate-700 shadow-2xl text-2xl text-slate-300 flex flex-col justify-center">
                        <h3 className="text-4xl font-bold text-white mb-8 border-b-2 border-slate-800 pb-4">The Quantum NOT Gate</h3>
                        <p className="mb-8 leading-relaxed">
                            In classical computing, a <strong className="text-white">NOT</strong> gate flips a 0 to 1, and 1 to 0.
                        </p>
                        <p className="mb-8 leading-relaxed">
                            In quantum computing, this is called the <strong className="text-emerald-400">Pauli-X Gate</strong>. It rotates the qubit state around the X-axis of the Bloch Sphere by 180 degrees.
                        </p>

                        <div className="text-5xl py-12 bg-slate-950 rounded-2xl my-10 flex flex-col lg:flex-row gap-12 justify-center items-center shadow-inner overflow-x-auto">
                            <BlockMath math="X = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}" />
                        </div>

                        <div className="bg-slate-800 p-8 rounded-2xl border-l-8 border-indigo-500 shadow-inner mt-8">
                            <strong className="text-indigo-400 block mb-4 text-3xl">Action:</strong>
                            Apply the <strong className="text-white">X</strong> gate in the circuit builder to see the vector flip from Top |0⟩ to Bottom |1⟩.
                        </div>
                    </div>

                    <div className="bg-slate-800 p-12 rounded-3xl border border-slate-700 shadow-2xl">
                        <h3 className="text-4xl font-bold text-white mb-12">Interactive Lab: Flip the Vector</h3>

                        <div className="h-[600px] border-4 border-slate-800 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                            <BlochSphere />
                        </div>
                    </div>
                </div>
            </section>

            {/* Topic 6 */}
            <section className="space-y-12 pt-24 border-t-4 border-slate-800">
                <h2 className="text-5xl font-black text-emerald-400">Topic 6: The Hadamard Gate</h2>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="space-y-12">
                        <div className="bg-slate-900 p-12 rounded-3xl border border-slate-700 shadow-2xl text-2xl text-slate-300 h-full">
                            <h3 className="text-4xl font-bold text-white mb-8 border-b-2 border-slate-800 pb-4">Entering Superposition</h3>
                            <p className="mb-8 leading-relaxed">
                                The <strong className="text-cyan-400 font-bold">Hadamard (H)</strong> gate is the most important gate in Quantum Computing. It creates a perfect
                                superposition.
                            </p>
                            <p className="mb-8 leading-relaxed">
                                If you apply <strong className="text-white">H</strong> to |0⟩, it splits the probability so that you have a 50% chance of measuring |0⟩ and a 50% chance of measuring |1⟩.
                            </p>

                            <div className="text-5xl py-12 bg-slate-950 rounded-2xl my-10 flex justify-center shadow-inner overflow-x-auto">
                                <BlockMath math="H = \frac{1}{\sqrt{2}} \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}" />
                            </div>

                            <div className="bg-slate-800 p-8 rounded-2xl border-l-8 border-yellow-500 shadow-inner mt-8">
                                <strong className="text-yellow-400 block mb-4 text-3xl">Fun Fact:</strong>
                                Applying visually flips the vector to point straight alongside the X-axis (between top and bottom)!
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="bg-slate-800 p-12 rounded-3xl border border-slate-700 shadow-2xl h-full flex flex-col">
                            <h3 className="text-4xl font-bold text-white mb-8">The Circuit Builder</h3>
                            <p className="text-2xl text-slate-400 mb-12">
                                A quantum circuit applies gates sequentially from left to right. Click the buttons below to build your circuit.
                            </p>

                            <div className="mt-8">
                                <CircuitBuilder />
                            </div>

                            <div className="mt-12 bg-slate-900 p-8 rounded-2xl border-l-8 border-emerald-500 shadow-inner">
                                <h4 className="text-3xl font-bold text-emerald-400 mb-6">Mini Challenge:</h4>
                                <ul className="list-decimal ml-6 space-y-4 text-xl text-slate-300">
                                    <li>Reset the circuit.</li>
                                    <li>Apply <strong className="text-white">H</strong> to create a superposition.</li>
                                    <li>Measure it a few times. Notice it's random.</li>
                                    <li>Reset again. Apply <strong className="text-white">H</strong>... and then apply <strong className="text-white">H</strong> <em>again!</em></li>
                                    <li>Now measure. What happens? (Hint: The operations reverse each other!)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="pt-24 flex justify-between">
                <Link href="/modules/2" className="flex items-center gap-4 px-12 py-6 bg-slate-800 hover:bg-slate-700 text-slate-300 text-3xl font-bold rounded-2xl transition-all group">
                    <span className="group-hover:-translate-x-2 transition-transform">←</span>
                    Back: Superposition
                </Link>
                <Link href="/modules/4" className="flex items-center gap-4 px-12 py-6 bg-cyan-600 hover:bg-cyan-500 text-white text-3xl font-black rounded-2xl shadow-2xl border-b-[8px] border-cyan-800 transition-all active:border-b-0 active:translate-y-2 group">
                    Next: Entanglement LAB
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
            </div>
        </div>
    )
}
