'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuantumStore } from '@/store/useQuantumStore'
import { prob } from '@/physics/math'
import Link from 'next/link'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function Module2() {
    const { alpha, beta, measure, setAmplitudes } = useQuantumStore()

    // Set up an equal superposition when the page loads
    useEffect(() => {
        setAmplitudes(
            { r: 1 / Math.SQRT2, i: 0 },
            { r: 1 / Math.SQRT2, i: 0 }
        )
    }, [setAmplitudes])

    const [measurementHistory, setMeasurementHistory] = useState<(0 | 1)[]>([])

    const p0 = prob(alpha)
    const p1 = prob(beta)

    const count0 = measurementHistory.filter(r => r === 0).length
    const count1 = measurementHistory.filter(r => r === 1).length

    const totalMeasurements = measurementHistory.length
    const actualP0 = totalMeasurements > 0 ? count0 / totalMeasurements : 0
    const actualP1 = totalMeasurements > 0 ? count1 / totalMeasurements : 0

    const runSimulation = (times: number) => {
        const results: (0 | 1)[] = []

        // Using true probabilistic math instead of mutating Zustand to keep it fast for 1000 runs
        for (let i = 0; i < times; i++) {
            results.push(Math.random() < p0 ? 0 : 1)
        }

        setMeasurementHistory(prev => [...prev, ...results])
    }

    const [superPositionState, setSuperpositionState] = useState<'Wave' | 'Particle'>('Wave')

    return (
        <div className="max-w-[1400px] w-full mx-auto p-12 space-y-24 pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-8xl font-extrabold text-white mb-6">Module 2: The Core of Quantum Mechanics</h1>
                <p className="text-4xl text-slate-400">Superposition and the Collapse of Probability</p>
            </header>

            {/* Topic 3 */}
            <section className="space-y-12">
                <h2 className="text-5xl font-black text-emerald-400">Topic 3: Understanding Superposition</h2>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="bg-slate-900 p-12 rounded-3xl border border-slate-700 shadow-2xl text-2xl text-slate-300">
                        <h3 className="text-4xl font-bold text-white mb-8 border-b-2 border-slate-800 pb-4">The Musical Analogy</h3>
                        <p className="mb-8 leading-relaxed">
                            If classical states |0⟩ and |1⟩ are single musical notes (like a C and an E), a <strong>Superposition</strong> isn't playing one note after another. It is playing <strong className="text-indigo-400">both notes at the same time</strong> to create a chord!
                        </p>
                        <p className="mb-12 leading-relaxed">
                            In quantum mechanics, a particle behaves like a wave of probabilities. It exists everywhere and nowhere simultaneously until you force it to interact with the world (measurement).
                        </p>
                        <div className="bg-slate-800 p-8 rounded-2xl border-l-8 border-yellow-500 shadow-inner">
                            <strong className="text-yellow-400 block mb-4 text-3xl">Visualizing Collapse:</strong>
                            When you measure the system, the wave collapses into a single classical particle. Click the button entirely to change reality!
                        </div>
                    </div>

                    <div className="bg-slate-800 p-12 rounded-3xl border border-slate-700 shadow-2xl flex flex-col items-center justify-center min-h-[500px]">
                        <h3 className="text-4xl font-bold text-white mb-12">Interactive Lab: Wave vs Particle</h3>

                        <div className="h-64 w-full flex items-center justify-center relative bg-slate-950 rounded-3xl overflow-hidden shadow-inner border border-slate-700 mb-12">
                            {superPositionState === 'Wave' ? (
                                <div className="flex gap-4">
                                    {[...Array(20)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ height: [40, 160, 40] }}
                                            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1, ease: "easeInOut" }}
                                            className="w-4 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ scale: 5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-8xl font-black bg-white rounded-full w-48 h-48 flex items-center justify-center text-slate-900 shadow-[0_0_50px_rgba(255,255,255,1)]"
                                >
                                    {Math.random() > 0.5 ? '0' : '1'}
                                </motion.div>
                            )}

                            <div className="absolute top-4 left-4 bg-slate-900/80 px-4 py-2 rounded-lg text-xl font-bold text-slate-400 border border-slate-700">
                                Current State: <span className={superPositionState === 'Wave' ? 'text-indigo-400' : 'text-emerald-400'}>{superPositionState === 'Wave' ? 'Superposition (Wave)' : 'Collapsed (Particle)'}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setSuperpositionState(prev => prev === 'Wave' ? 'Particle' : 'Wave')}
                            className={`px-16 py-6 text-4xl font-black rounded-2xl shadow-2xl border-b-8 active:border-b-0 active:translate-y-2 transition-all ${superPositionState === 'Wave'
                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-800'
                                    : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-800'
                                }`}
                        >
                            {superPositionState === 'Wave' ? 'Measure System' : 'Reset to Superposition'}
                        </button>
                    </div>
                </div>
            </section>

            {/* Topic 4 */}
            <section className="space-y-12 pt-24 border-t-4 border-slate-800">
                <h2 className="text-5xl font-black text-emerald-400">Topic 4: The Mathematics of Measurement (Monte Carlo Simulation)</h2>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="space-y-12">
                        <div className="bg-slate-900 p-12 rounded-3xl border border-slate-700 shadow-2xl text-2xl text-slate-300">
                            <h3 className="text-4xl font-bold text-white mb-8 border-b-2 border-slate-800 pb-4">Probabiility Theory</h3>
                            <p className="mb-8 leading-relaxed">
                                How do we prove superposition exists if we can only ever measure <strong className="font-mono text-emerald-400">0</strong> or <strong className="font-mono text-blue-400">1</strong>?
                            </p>
                            <p className="mb-8 leading-relaxed">
                                We use statistics! By preparing the exact same quantum state and measuring it hundreds of times, the statistical distribution converges on the mathematical probability amplitudes!
                            </p>

                            <div className="text-6xl py-12 bg-slate-950 rounded-2xl my-10 flex flex-col gap-6 justify-center items-center shadow-inner overflow-x-auto">
                                <BlockMath math="P(0) = |\alpha|^2" />
                                <BlockMath math="P(1) = |\beta|^2" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="bg-slate-800 p-12 rounded-3xl border border-slate-700 shadow-2xl h-full flex flex-col">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-4xl font-bold text-white">Live Monte Carlo Simulation</h3>
                                <button
                                    onClick={() => setMeasurementHistory([])}
                                    className="px-6 py-3 bg-red-600 hover:bg-red-500 font-bold text-white rounded-lg transition-colors border-b-4 border-red-800 active:border-b-0 active:translate-y-1"
                                >
                                    Clear Data
                                </button>
                            </div>

                            <p className="text-2xl text-slate-400 mb-8 border-b-2 border-slate-700 pb-8">
                                We have prepared a qubit in an equal (50/50) superposition. Run the experiment multiple times to see the Law of Large Numbers in action.
                            </p>

                            <div className="flex gap-4 mb-12">
                                <button onClick={() => runSimulation(1)} className="flex-1 py-6 bg-indigo-600 hover:bg-indigo-500 font-bold text-2xl text-white rounded-xl shadow-lg border-b-6 border-indigo-800 active:border-b-0 active:translate-y-2">Run 1x</button>
                                <button onClick={() => runSimulation(10)} className="flex-1 py-6 bg-indigo-600 hover:bg-indigo-500 font-bold text-2xl text-white rounded-xl shadow-lg border-b-6 border-indigo-800 active:border-b-0 active:translate-y-2">Run 10x</button>
                                <button onClick={() => runSimulation(100)} className="flex-1 py-6 bg-indigo-600 hover:bg-indigo-500 font-bold text-2xl text-white rounded-xl shadow-lg border-b-6 border-indigo-800 active:border-b-0 active:translate-y-2">Run 100x</button>
                                <button onClick={() => runSimulation(1000)} className="flex-1 py-6 bg-indigo-600 hover:bg-indigo-500 font-bold text-2xl text-white rounded-xl shadow-lg border-b-6 border-indigo-800 active:border-b-0 active:translate-y-2">Run 1000x</button>
                            </div>

                            <div className="flex-1 bg-slate-950 rounded-2xl p-8 border border-slate-700 flex flex-col justify-end gap-12 relative">

                                {/* Target Lines */}
                                <div className="absolute top-0 bottom-0 left-8 right-8 pointer-events-none flex flex-col justify-between py-8">
                                    <div className="border-b border-dashed border-slate-600 w-full relative h-0">
                                        <span className="absolute -top-4 right-0 text-slate-500 font-bold">100%</span>
                                    </div>
                                    <div className="border-b border-dashed border-emerald-500/50 w-full relative h-0">
                                        <span className="absolute -top-4 right-0 text-emerald-500/80 font-bold">Expected (50%)</span>
                                    </div>
                                    <div className="border-b border-dashed border-slate-600 w-full relative h-0">
                                        <span className="absolute -top-4 right-0 text-slate-500 font-bold">0%</span>
                                    </div>
                                </div>

                                <div className="flex items-end justify-around h-64 relative z-10 w-full">
                                    {/* Bar 0 */}
                                    <div className="flex flex-col items-center w-1/3 group">
                                        <div className="text-3xl font-bold mb-4 text-emerald-400 font-mono">{(actualP0 * 100).toFixed(1)}%</div>
                                        <motion.div
                                            className="w-full bg-emerald-500 rounded-t-xl shadow-[0_-5px_20px_rgba(16,185,129,0.3)] relative"
                                            initial={{ height: 0 }}
                                            animate={{ height: `${actualP0 * 100}%` }}
                                            transition={{ type: "spring", stiffness: 50 }}
                                        >
                                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </motion.div>
                                        <div className="mt-6 text-4xl font-extrabold text-white">|0⟩</div>
                                        <div className="mt-2 text-xl text-slate-400 font-mono">Count: {count0}</div>
                                    </div>

                                    {/* Bar 1 */}
                                    <div className="flex flex-col items-center w-1/3 group">
                                        <div className="text-3xl font-bold mb-4 text-blue-400 font-mono">{(actualP1 * 100).toFixed(1)}%</div>
                                        <motion.div
                                            className="w-full bg-blue-500 rounded-t-xl shadow-[0_-5px_20px_rgba(59,130,246,0.3)] relative"
                                            initial={{ height: 0 }}
                                            animate={{ height: `${actualP1 * 100}%` }}
                                            transition={{ type: "spring", stiffness: 50 }}
                                        >
                                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </motion.div>
                                        <div className="mt-6 text-4xl font-extrabold text-white">|1⟩</div>
                                        <div className="mt-2 text-xl text-slate-400 font-mono">Count: {count1}</div>
                                    </div>
                                </div>

                                <div className="text-center mt-8 pt-8 border-t border-slate-800 text-3xl font-bold text-slate-300">
                                    Total Measurements: <span className="text-white bg-indigo-600 px-4 py-2 rounded-lg">{totalMeasurements}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="pt-24 flex justify-between">
                <Link href="/modules/1" className="flex items-center gap-4 px-12 py-6 bg-slate-800 hover:bg-slate-700 text-slate-300 text-3xl font-bold rounded-2xl transition-all group">
                    <span className="group-hover:-translate-x-2 transition-transform">←</span>
                    Back: Foundations
                </Link>
                <Link href="/modules/3" className="flex items-center gap-4 px-12 py-6 bg-cyan-600 hover:bg-cyan-500 text-white text-3xl font-black rounded-2xl shadow-2xl border-b-8 border-cyan-800 transition-all active:border-b-0 active:translate-y-2 group">
                    Next: Quantum Gates (The Circuit Builder)
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
            </div>
        </div>
    )
}
