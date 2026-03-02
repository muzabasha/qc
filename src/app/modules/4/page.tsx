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
        <div className="max-w-[1600px] w-full mx-auto p-12 space-y-24 pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-8xl font-extrabold text-white mb-6">Module 4: Entanglement</h1>
                <p className="text-4xl text-slate-400">Spooky Action at a Distance</p>
            </header>

            {/* Topic 7 */}
            <section className="space-y-12">
                <h2 className="text-5xl font-black text-emerald-400">Topic 7: The Bell State</h2>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="space-y-12">
                        <div className="bg-slate-900 p-12 rounded-3xl border border-slate-700 shadow-2xl text-2xl text-slate-300">
                            <h3 className="text-4xl font-bold text-white mb-8 border-b-2 border-slate-800 pb-4">The Invisible Connection</h3>
                            <p className="mb-8 leading-relaxed">
                                Two qubits can become linked together in a way that the state of one instantly determines the state of the other, no matter how far apart they are in the universe. Einstein called this <strong className="text-blue-400">"spooky action at a distance."</strong>
                            </p>

                            <div className="text-6xl py-12 bg-slate-950 rounded-2xl my-10 flex justify-center items-center shadow-inner overflow-x-auto">
                                <BlockMath math="| \Phi^+ \rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)" />
                            </div>

                            <p className="mt-8 leading-relaxed">
                                This equation says that the system is in an equal superposition of BOTH qubits being <strong className="text-emerald-400 font-mono">0</strong>, or BOTH qubits being <strong className="text-blue-400 font-mono">1</strong>.
                            </p>
                        </div>

                        <div className="bg-slate-800 p-12 rounded-3xl border border-slate-700 shadow-2xl flex flex-col items-center justify-center">
                            <h3 className="text-4xl font-bold text-white mb-8">Set Global System State</h3>
                            <div className="flex gap-6 bg-slate-900 p-4 rounded-2xl">
                                <button
                                    className={`px-8 py-4 text-2xl font-bold rounded-xl transition-colors ${!isEntangled ? 'bg-red-600 text-white shadow-lg border-b-4 border-red-800' : 'bg-transparent text-slate-400 hover:bg-slate-800'}`}
                                    onClick={() => { setIsEntangled(false); handleReset(); }}
                                >
                                    Separated (Classical)
                                </button>
                                <button
                                    className={`px-8 py-4 text-2xl font-bold rounded-xl transition-colors ${isEntangled ? 'bg-indigo-600 text-white shadow-lg border-b-4 border-indigo-800' : 'bg-transparent text-slate-400 hover:bg-slate-800'}`}
                                    onClick={() => { setIsEntangled(true); handleReset(); }}
                                >
                                    Entangled (|Φ+⟩ State)
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800 p-12 rounded-3xl border border-slate-700 shadow-2xl min-h-[700px] flex flex-col relative overflow-hidden">
                        <h3 className="text-4xl font-bold text-white mb-12">Interactive Lab: The Twin Trap</h3>

                        <button
                            onClick={handleReset}
                            className="self-end mb-8 px-6 py-3 text-xl font-bold rounded-lg transition-colors bg-slate-700 hover:bg-slate-600 text-slate-300"
                        >
                            Reset Qubits
                        </button>

                        <div className="flex-1 flex flex-col sm:flex-row items-center justify-between relative mt-16 px-12">

                            {/* Connecting Line (Only if Entangled) */}
                            {isEntangled && (
                                <div className="absolute top-1/2 left-32 right-32 h-4 -translate-y-1/2 bg-blue-500/20 z-0">
                                    <motion.div
                                        className="h-full bg-blue-400/50"
                                        animate={{
                                            opacity: qubitA !== '?' || qubitB !== '?' ? [0.8, 0, 0] : [0.2, 0.8, 0.2]
                                        }}
                                        transition={{ repeat: qubitA === '?' && qubitB === '?' ? Infinity : 0, duration: 1 }}
                                    />
                                </div>
                            )}

                            {/* Qubit A */}
                            <div className="flex flex-col items-center z-10">
                                <h4 className="text-3xl font-bold text-slate-300 mb-8">Qubit A</h4>
                                <motion.div
                                    className="w-48 h-48 rounded-full flex items-center justify-center text-7xl font-extrabold border-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-slate-900 border-indigo-500 mb-12"
                                    animate={{
                                        rotateY: qubitA === '?' ? 360 * 10 : 0,
                                        borderColor: qubitA === '0' ? '#10b981' : qubitA === '1' ? '#3b82f6' : '#6366f1'
                                    }}
                                    transition={{ duration: qubitA === '?' ? 20 : 0.5, ease: "linear", repeat: qubitA === '?' ? Infinity : 0 }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    {qubitA === '?' ? (
                                        <span className="text-indigo-400 animate-pulse">?</span>
                                    ) : (
                                        <span className={qubitA === '0' ? "text-emerald-400" : "text-blue-400"}>|{qubitA}⟩</span>
                                    )}
                                </motion.div>
                                <button
                                    onClick={handleMeasureA}
                                    disabled={qubitA !== '?'}
                                    className="px-10 py-5 text-2xl font-bold rounded-xl text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed bg-emerald-600 hover:bg-emerald-500 border-b-8 border-emerald-800 active:border-b-0 active:translate-y-2 transition-all"
                                >
                                    Measure A
                                </button>
                            </div>

                            {/* Explanation floating center */}
                            {isEntangled && qubitA !== '?' && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full bg-blue-600 text-white px-6 py-3 rounded-full text-2xl font-bold shadow-2xl z-20 whitespace-nowrap"
                                >
                                    Insant Collapse!
                                </motion.div>
                            )}

                            {/* Qubit B */}
                            <div className="flex flex-col items-center z-10">
                                <h4 className="text-3xl font-bold text-slate-300 mb-8">Qubit B</h4>
                                <motion.div
                                    className="w-48 h-48 rounded-full flex items-center justify-center text-7xl font-extrabold border-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-slate-900 border-indigo-500 mb-12"
                                    animate={{
                                        rotateY: qubitB === '?' ? 360 * 10 : 0,
                                        borderColor: qubitB === '0' ? '#10b981' : qubitB === '1' ? '#3b82f6' : '#6366f1'
                                    }}
                                    transition={{ duration: qubitB === '?' ? 20 : 0.5, ease: "linear", repeat: qubitB === '?' ? Infinity : 0 }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    {qubitB === '?' ? (
                                        <span className="text-indigo-400 animate-pulse">?</span>
                                    ) : (
                                        <span className={qubitB === '0' ? "text-emerald-400" : "text-blue-400"}>|{qubitB}⟩</span>
                                    )}
                                </motion.div>
                                <button
                                    onClick={handleMeasureB}
                                    disabled={qubitB !== '?'}
                                    className="px-10 py-5 text-2xl font-bold rounded-xl text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed bg-emerald-600 hover:bg-emerald-500 border-b-8 border-emerald-800 active:border-b-0 active:translate-y-2 transition-all"
                                >
                                    Measure B
                                </button>
                            </div>

                        </div>

                        <div className="mt-16 bg-slate-900/50 p-8 rounded-2xl flex items-center justify-center text-2xl text-slate-300 border-t-2 border-slate-700">
                            {isEntangled ? (
                                <p><strong>Entangled Mode:</strong> If you measure one, the other immediately collapses to the exact same state to satisfy the <strong className="font-mono text-cyan-400">|Φ+⟩</strong> criteria.</p>
                            ) : (
                                <p><strong>Separated Mode:</strong> They act like normal classical/quantum coins. They have a 50% chance of matching and a 50% chance of being different.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className="pt-24 flex justify-between">
                <Link href="/modules/3" className="flex items-center gap-4 px-12 py-6 bg-slate-800 hover:bg-slate-700 text-slate-300 text-3xl font-bold rounded-2xl transition-all group">
                    <span className="group-hover:-translate-x-2 transition-transform">←</span>
                    Back: Quantum Gates
                </Link>
                <Link href="/modules/5" className="flex items-center gap-4 px-12 py-6 bg-cyan-600 hover:bg-cyan-500 text-white text-3xl font-black rounded-2xl shadow-2xl border-b-8 border-cyan-800 transition-all active:border-b-0 active:translate-y-2 group">
                    Next: Quantum Circuits
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
            </div>
        </div>
    )
}
