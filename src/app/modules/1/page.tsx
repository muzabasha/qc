'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { prob } from '@/physics/math'
import { useQuantumStore } from '@/store/useQuantumStore'
import { useProgressStore } from '@/store/useProgressStore'
import { useToast } from '@/components/Toast'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

const BlochSphere = dynamic(() => import('@/components/quantum/BlochSphere'), { ssr: false })

export default function Module1() {
    const [isQuantum, setIsQuantum] = useState(false)
    const [coinState, setCoinState] = useState<'Heads' | 'Tails' | 'Spinning...'>('Heads')
    const { markModuleComplete } = useProgressStore()
    const { showToast } = useToast()

    const handleFlip = () => {
        setCoinState('Spinning...')
        setTimeout(() => {
            setCoinState(Math.random() > 0.5 ? 'Heads' : 'Tails')
        }, 1000)
    }

    const { alpha, beta, setAmplitudes, measure } = useQuantumStore()
    const p0 = prob(alpha)

    const [qOutcome, setQOutcome] = useState<number | null>(null)

    const handleCompleteModule = () => {
        markModuleComplete(1)
        showToast('Module 1 completed! 🎉', 'success')
    }

    return (
        <div className="max-w-[1400px] w-full mx-auto p-4 md:p-6 lg:p-12 space-y-12 md:space-y-16 lg:space-y-24 pb-32 md:pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-8 md:pb-12 pt-4 md:pt-8">
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-4 md:mb-6">Module 1: Foundations</h1>
                <p className="text-xl md:text-2xl lg:text-4xl text-slate-400 font-medium">Thinking Quantum: Moving from Classical Certainty to Quantum Probability</p>
            </header>

            {/* Topic 1 */}
            <section className="space-y-12">
                <div className="flex items-center gap-6">
                    <div className="bg-emerald-600/20 p-4 rounded-xl text-4xl">🪙</div>
                    <h2 className="text-3xl md:text-5xl font-black text-emerald-400">Topic 1: Classical vs Quantum Thinking</h2>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="bg-slate-900 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl text-xl md:text-2xl text-slate-300 space-y-8 flex flex-col justify-center">
                        <h3 className="text-4xl font-bold text-white mb-4 border-b-2 border-slate-800 pb-4">The Story: A Magic Coin</h3>
                        <p className="leading-relaxed">
                            Imagine a classical coin. When it lands, it's either <strong className="text-emerald-400">Heads</strong> or <strong className="text-blue-400">Tails</strong>. It's definitive. A classical bit is exactly like this: just 0 or 1.
                        </p>
                        <p className="leading-relaxed">
                            Now imagine a <em className="text-indigo-400 font-bold">Magic Quantum Coin</em>. While spinning in the air, it is simultaneously both Heads and Tails! It only decides its final state the exact moment you catch and observe it.
                        </p>
                        <div className="bg-slate-800 p-8 rounded-2xl border-l-8 border-indigo-500 shadow-inner">
                            <strong className="text-indigo-400 block mb-4 text-2xl md:text-3xl">Analogy Fact:</strong>
                            A classical bit is an immobile switch (OFF or ON). A quantum bit (qubit) is like a spinning coin, holding all possibilities at once!
                        </div>
                    </div>

                    <div className="bg-slate-800 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl flex flex-col items-center justify-center min-h-[600px] space-y-12">
                        <h3 className="text-3xl md:text-4xl font-bold text-white text-center">Interactive Lab: Flip the Coin</h3>

                        <div className="flex gap-4 bg-slate-900 p-3 rounded-2xl">
                            <button
                                className={`px-6 py-3 text-lg md:text-xl font-bold rounded-xl transition-all ${!isQuantum ? 'bg-emerald-600 text-white shadow-lg border-b-4 border-emerald-800' : 'bg-transparent text-slate-400 hover:bg-slate-800'}`}
                                onClick={() => setIsQuantum(false)}
                            >
                                Classical
                            </button>
                            <button
                                className={`px-6 py-3 text-lg md:text-xl font-bold rounded-xl transition-all ${isQuantum ? 'bg-indigo-600 text-white shadow-lg border-b-4 border-indigo-800' : 'bg-transparent text-slate-400 hover:bg-slate-800'}`}
                                onClick={() => setIsQuantum(true)}
                            >
                                Quantum
                            </button>
                        </div>

                        <motion.div
                            key={coinState + isQuantum}
                            initial={coinState === 'Spinning...' ? { rotateY: 0 } : false}
                            animate={coinState === 'Spinning...' ? { rotateY: 360 * 8 } : { rotateY: 0 }}
                            transition={{ duration: 1, ease: "linear" }}
                            className="w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center text-4xl md:text-7xl font-extrabold border-16 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform-style-preserve-3d"
                            style={{
                                backgroundColor: isQuantum && coinState === 'Spinning...' ? '#4f46e5' : '#10b981',
                                borderColor: isQuantum ? '#312e81' : '#064e3b',
                                color: 'white'
                            }}
                        >
                            {isQuantum && coinState === 'Spinning...' ? <span className="text-3xl md:text-5xl">H / T</span> : coinState}
                        </motion.div>

                        <button
                            onClick={handleFlip}
                            disabled={coinState === 'Spinning...'}
                            className="px-10 md:px-16 py-4 md:py-6 text-2xl md:text-4xl bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-2xl border-b-8 border-blue-800 active:border-b-0 active:translate-y-2 transition-all disabled:opacity-50"
                        >
                            {coinState === 'Spinning...' ? 'Observing...' : 'Flip Coin'}
                        </button>
                    </div>
                </div>
            </section>

            {/* Topic 2 */}
            <section className="space-y-12 pt-24 border-t-4 border-slate-800">
                <div className="flex items-center gap-6">
                    <div className="bg-indigo-600/20 p-4 rounded-xl text-4xl">🧬</div>
                    <h2 className="text-3xl md:text-5xl font-black text-indigo-400">Topic 2: What is a Qubit?</h2>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="space-y-12">
                        <div className="bg-slate-900 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl text-xl md:text-2xl text-slate-300 flex flex-col justify-center space-y-8">
                            <h3 className="text-4xl font-bold text-white mb-4 border-b-2 border-slate-800 pb-4">The Math Behind the Magic</h3>
                            <p className="leading-relaxed">
                                A qubit exists in a <strong className="text-white">Superposition</strong>, represented mathematically by a state vector <span className="font-mono text-indigo-400">|ψ⟩</span>:
                            </p>

                            <div className="text-4xl md:text-6xl py-8 bg-slate-950 rounded-2xl my-6 flex justify-center shadow-inner overflow-x-auto p-4">
                                <BlockMath math="| \psi \rangle = \alpha | 0 \rangle + \beta | 1 \rangle" />
                            </div>

                            <ul className="list-disc ml-8 space-y-4">
                                <li><span className="text-emerald-400 font-bold">α</span> and <span className="text-blue-400 font-bold">β</span> are <em>"probability amplitudes"</em>.</li>
                                <li>The probabilities must always balance: <span className="font-mono bg-slate-800 px-2 rounded">|α|² + |β|² = 1</span></li>
                            </ul>
                        </div>

                        <div className="bg-slate-800 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl space-y-8">
                            <h3 className="text-3xl md:text-4xl font-bold text-white">Adjust the Probabilities</h3>
                            <p className="text-xl text-slate-400 font-medium">
                                Drag the sliders and observe how the arrow on the Bloch Sphere moves based on your chosen state.
                            </p>

                            <div className="space-y-8">
                                <div>
                                    <label className="text-xl md:text-2xl font-bold text-emerald-400 flex justify-between mb-4">
                                        <span>Chance of |0⟩</span>
                                        <span className="bg-slate-900 px-4 py-1 rounded-lg">{(p0 * 100).toFixed(0)}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={p0}
                                        onChange={(e) => {
                                            const newP0 = parseFloat(e.target.value)
                                            const newP1 = 1 - newP0
                                            setAmplitudes(
                                                { r: Math.sqrt(newP0), i: 0 },
                                                { r: Math.sqrt(newP1), i: 0 }
                                            )
                                            setQOutcome(null)
                                        }}
                                        className="w-full h-8 bg-slate-700 hover:bg-slate-600 rounded-2xl appearance-none cursor-pointer border-2 border-slate-900 shadow-inner accent-emerald-500"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-900 p-6 rounded-2xl gap-6">
                                <button
                                    onClick={() => setQOutcome(measure())}
                                    className="w-full sm:w-auto px-8 py-4 text-2xl bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl shadow-xl border-b-6 border-indigo-800 active:border-b-0 active:translate-y-1 transition-all text-white"
                                >
                                    Measure State!
                                </button>
                                <div className="h-20 flex items-center justify-center px-8 bg-slate-950 rounded-xl flex-1 shadow-inner border border-slate-800">
                                    {qOutcome !== null ? (
                                        <div className="text-3xl font-extrabold text-white animate-in zoom-in">
                                            Result: <span className={qOutcome === 0 ? "text-emerald-400" : "text-blue-400"}>|{qOutcome}⟩</span>
                                        </div>
                                    ) : (
                                        <span className="text-lg text-slate-600 font-bold uppercase tracking-wider">Awaiting Measurement</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="bg-slate-900 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl h-full flex flex-col space-y-8">
                            <h3 className="text-4xl font-bold text-white mb-4">The Bloch Sphere</h3>
                            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium">
                                The Bloch Sphere represents all possible states of a qubit geometrically. UP is |0⟩, DOWN is |1⟩.
                            </p>
                            <div className="flex-1 min-h-[400px] border-4 border-slate-800 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-slate-950">
                                <BlochSphere />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="pt-16 md:pt-24 flex flex-col sm:flex-row justify-between items-center gap-4">
                <Link
                    href="/"
                    className="flex items-center gap-4 px-6 md:px-10 py-4 md:py-5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-lg md:text-xl font-bold rounded-2xl transition-all group"
                    aria-label="Go back to home page"
                >
                    <span className="group-hover:-translate-x-2 transition-transform" aria-hidden="true">←</span>
                    Home
                </Link>
                <button
                    onClick={handleCompleteModule}
                    className="px-8 md:px-10 py-4 md:py-5 bg-emerald-600 hover:bg-emerald-500 text-white text-lg md:text-xl font-black rounded-2xl shadow-xl border-b-6 border-emerald-800 transition-all active:border-b-0 active:translate-y-2"
                    aria-label="Mark module 1 as complete"
                >
                    ✓ Mark Complete
                </button>
                <Link
                    href="/modules/2"
                    className="flex items-center gap-4 px-8 md:px-10 py-4 md:py-5 bg-cyan-600 hover:bg-cyan-500 text-white text-xl md:text-3xl lg:text-4xl font-black rounded-2xl shadow-2xl border-b-6 md:border-b-8 border-cyan-800 transition-all active:border-b-0 active:translate-y-2 group"
                    aria-label="Proceed to module 2"
                >
                    Proceed to Module 2
                    <span className="group-hover:translate-x-2 transition-transform" aria-hidden="true">→</span>
                </Link>
            </div>
        </div>
    )
}
