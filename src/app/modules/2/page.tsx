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
        <div className="max-w-[1400px] w-full mx-auto p-6 md:p-12 space-y-12 md:space-y-24 pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 text-center md:text-left">Module 2: Core Concepts</h1>
                <p className="text-lg md:text-xl text-slate-400 font-medium text-center md:text-left">Superposition and the Collapse of Probability</p>
            </header>

            {/* Topic 3 */}
            <section className="space-y-12">
                <div className="flex items-center gap-6">
                    <div className="bg-emerald-600/20 p-4 rounded-xl text-4xl">🎵</div>
                    <h2 className="text-3xl md:text-5xl font-black text-emerald-400">Topic 3: Understanding Superposition</h2>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="bg-slate-900 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl text-xl md:text-2xl text-slate-300 space-y-8 flex flex-col justify-center">
                        <h3 className="text-4xl font-bold text-white mb-4 border-b-2 border-slate-800 pb-4">The Musical Analogy</h3>
                        <p className="leading-relaxed">
                            If classical states |0⟩ and |1⟩ are single musical notes (like a C and an E), a <strong>Superposition</strong> is playing <strong className="text-indigo-400">both notes at the same time</strong> to create a chord!
                        </p>
                        <p className="leading-relaxed">
                            In quantum mechanics, a particle behaves like a wave of probabilities. It exists everywhere and nowhere simultaneously until you force it to interact with the world (measurement).
                        </p>
                        <div className="bg-slate-800 p-8 rounded-2xl border-l-8 border-yellow-500 shadow-inner">
                            <strong className="text-yellow-400 block mb-4 text-2xl md:text-3xl">Visualizing Collapse:</strong>
                            When you measure the system, the wave collapses into a single classical particle. Click the button to trigger reality!
                        </div>
                    </div>

                    <div className="bg-slate-800 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl flex flex-col items-center justify-center min-h-[500px] space-y-12">
                        <h3 className="text-3xl md:text-4xl font-bold text-white text-center">Interactive Lab: Wave vs Particle</h3>

                        <div className="h-64 w-full flex items-center justify-center relative bg-slate-950 rounded-[24px] overflow-hidden shadow-inner border border-slate-700">
                            {superPositionState === 'Wave' ? (
                                <div className="flex gap-2 md:gap-4 overflow-hidden px-4">
                                    {[...Array(20)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ height: [40, 160, 40] }}
                                            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1, ease: "easeInOut" }}
                                            className="w-2 md:w-4 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ scale: 5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-7xl md:text-8xl font-black bg-white rounded-full w-40 h-40 md:w-48 md:h-48 flex items-center justify-center text-slate-900 shadow-[0_0_50px_rgba(255,255,255,1)]"
                                >
                                    {Math.random() > 0.5 ? '0' : '1'}
                                </motion.div>
                            )}

                            <div className="absolute top-4 left-4 bg-slate-900/80 px-4 py-2 rounded-lg text-lg font-bold text-slate-400 border border-slate-700 backdrop-blur-sm">
                                <span className={superPositionState === 'Wave' ? 'text-indigo-400' : 'text-emerald-400'}>{superPositionState === 'Wave' ? 'Superposition (Wave)' : 'Collapsed (Particle)'}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setSuperpositionState(prev => prev === 'Wave' ? 'Particle' : 'Wave')}
                            className={`px-10 md:px-16 py-4 md:py-6 text-2xl md:text-4xl font-black rounded-2xl shadow-2xl border-b-8 active:border-b-0 active:translate-y-2 transition-all ${superPositionState === 'Wave'
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
                <div className="flex items-center gap-6">
                    <div className="bg-indigo-600/20 p-4 rounded-xl text-4xl">📊</div>
                    <h2 className="text-3xl md:text-5xl font-black text-indigo-400">Topic 4: The Law of Large Numbers</h2>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="space-y-12">
                        <div className="bg-slate-900 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl text-xl md:text-2xl text-slate-300 flex flex-col justify-center space-y-8">
                            <h3 className="text-4xl font-bold text-white mb-4 border-b-2 border-slate-800 pb-4">Probabiility Theory</h3>
                            <p className="leading-relaxed">
                                How do we prove superposition exists if we only see <strong className="font-mono text-emerald-400">0</strong> or <strong className="font-mono text-blue-400">1</strong>?
                            </p>
                            <p className="leading-relaxed">
                                Statistics! By measuring the exact same state hundreds of times, the distribution converges on the mathematical probability amplitudes!
                            </p>

                            <div className="text-4xl md:text-6xl py-12 bg-slate-950 rounded-2xl my-6 flex flex-col gap-8 justify-center items-center shadow-inner overflow-x-auto p-4">
                                <BlockMath math="P(0) = |\alpha|^2" />
                                <BlockMath math="P(1) = |\beta|^2" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="bg-slate-800 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl h-full flex flex-col space-y-8">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                <h3 className="text-3xl font-bold text-white">Monte Carlo Simulation</h3>
                                <button
                                    onClick={() => setMeasurementHistory([])}
                                    className="px-6 py-2 bg-red-600 hover:bg-red-500 font-bold text-white rounded-lg transition-colors border-b-4 border-red-800 active:border-b-0 active:translate-y-1"
                                >
                                    Clear Data
                                </button>
                            </div>

                            <p className="text-lg md:text-xl text-slate-400 font-medium">
                                We've prepared a 50/50 superposition. Run the experiment multiple times and watch the law of large numbers in action.
                            </p>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <button onClick={() => runSimulation(1)} className="py-4 bg-indigo-600 hover:bg-indigo-500 font-bold text-xl text-white rounded-xl shadow-lg border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1 transition-all">1x</button>
                                <button onClick={() => runSimulation(10)} className="py-4 bg-indigo-600 hover:bg-indigo-500 font-bold text-xl text-white rounded-xl shadow-lg border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1 transition-all">10x</button>
                                <button onClick={() => runSimulation(100)} className="py-4 bg-indigo-600 hover:bg-indigo-500 font-bold text-xl text-white rounded-xl shadow-lg border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1 transition-all">100x</button>
                                <button onClick={() => runSimulation(1000)} className="py-4 bg-indigo-600 hover:bg-indigo-500 font-bold text-xl text-white rounded-xl shadow-lg border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1 transition-all">1000x</button>
                            </div>

                            <div className="flex-1 min-h-[400px] bg-slate-950 rounded-2xl p-6 border border-slate-700 flex flex-col justify-end gap-12 relative">
                                {/* Target Lines */}
                                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-12 px-6">
                                    <div className="border-b border-dashed border-slate-700 w-full relative h-0">
                                        <span className="absolute -top-4 right-0 text-slate-600 font-bold text-sm">100%</span>
                                    </div>
                                    <div className="border-b-2 border-dashed border-emerald-500/30 w-full relative h-0">
                                        <span className="absolute -top-5 right-0 text-emerald-500/50 font-bold text-xs uppercase tracking-widest">Expected 50%</span>
                                    </div>
                                    <div className="border-b border-dashed border-slate-700 w-full relative h-0">
                                        <span className="absolute -top-4 right-0 text-slate-600 font-bold text-sm">0%</span>
                                    </div>
                                </div>

                                <div className="flex items-end justify-around h-64 relative z-10 w-full">
                                    {/* Bar 0 */}
                                    <div className="flex flex-col items-center w-1/3 group">
                                        <div className="text-2xl font-bold mb-4 text-emerald-400 font-mono">{(actualP0 * 100).toFixed(1)}%</div>
                                        <motion.div
                                            className="w-full bg-emerald-500 rounded-t-xl shadow-[0_-5px_20px_rgba(16,185,129,0.3)] relative"
                                            initial={{ height: 0 }}
                                            animate={{ height: `${actualP0 * 100}%` }}
                                            transition={{ type: "spring", stiffness: 50 }}
                                        >
                                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </motion.div>
                                        <div className="mt-6 text-3xl font-extrabold text-white">|0⟩</div>
                                        <div className="mt-2 text-sm text-slate-500 font-mono">Count: {count0}</div>
                                    </div>

                                    {/* Bar 1 */}
                                    <div className="flex flex-col items-center w-1/3 group">
                                        <div className="text-2xl font-bold mb-4 text-blue-400 font-mono">{(actualP1 * 100).toFixed(1)}%</div>
                                        <motion.div
                                            className="w-full bg-blue-500 rounded-t-xl shadow-[0_-5px_20px_rgba(59,130,246,0.3)] relative"
                                            initial={{ height: 0 }}
                                            animate={{ height: `${actualP1 * 100}%` }}
                                            transition={{ type: "spring", stiffness: 50 }}
                                        >
                                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </motion.div>
                                        <div className="mt-6 text-3xl font-extrabold text-white">|1⟩</div>
                                        <div className="mt-2 text-sm text-slate-500 font-mono">Count: {count1}</div>
                                    </div>
                                </div>

                                <div className="text-center mt-8 pt-8 border-t border-slate-800 text-2xl font-bold text-slate-400">
                                    Total Data Points: <span className="text-white bg-indigo-600 px-4 py-1 rounded-lg">{totalMeasurements}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="pt-24 flex justify-between">
                <Link href="/modules/1" className="flex items-center gap-4 px-6 md:px-10 py-4 md:py-5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xl font-bold rounded-2xl transition-all group">
                    <span className="group-hover:-translate-x-2 transition-transform">←</span>
                    Back
                </Link>
                <Link href="/modules/3" className="flex items-center gap-4 px-10 py-5 bg-cyan-600 hover:bg-cyan-500 text-white text-2xl md:text-4xl font-black rounded-2xl shadow-2xl border-b-8 border-cyan-800 transition-all active:border-b-0 active:translate-y-2 group">
                    Next: Quantum Gates
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
            </div>
        </div>
    )
}
