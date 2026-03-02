'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

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
