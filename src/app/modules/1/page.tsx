'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { prob } from '@/physics/math'
import { useQuantumStore } from '@/store/useQuantumStore'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

const BlochSphere = dynamic(() => import('@/components/quantum/BlochSphere'), { ssr: false })

export default function Module1() {
    const [isQuantum, setIsQuantum] = useState(false)
    const [coinState, setCoinState] = useState<'Heads' | 'Tails' | 'Spinning...'>('Heads')

    const handleFlip = () => {
        setCoinState('Spinning...')
        setTimeout(() => {
            setCoinState(Math.random() > 0.5 ? 'Heads' : 'Tails')
        }, 1000)
    }

    const { alpha, beta, setAmplitudes, measure } = useQuantumStore()
    const p0 = prob(alpha)

    const [qOutcome, setQOutcome] = useState<number | null>(null)

    return (
        <div className="max-w-[1400px] w-full mx-auto p-12 space-y-24 pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-8xl font-extrabold text-white mb-6">Module 1: Foundations</h1>
                <p className="text-4xl text-slate-400">Thinking Quantum: Moving from Classical Certainty to Quantum Probability</p>
            </header>

            {/* Topic 1 */}
            <section className="space-y-12">
                <h2 className="text-5xl font-black text-emerald-400">Topic 1: Classical vs Quantum Thinking</h2>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="bg-slate-900 p-12 rounded-3xl border border-slate-700 shadow-2xl text-2xl text-slate-300">
                        <h3 className="text-4xl font-bold text-white mb-8 border-b-2 border-slate-800 pb-4">The Story: A Magic Coin</h3>
                        <p className="mb-8 leading-relaxed">
                            Imagine a classical coin. When it lands, it's either <strong className="text-emerald-400">Heads</strong> or <strong className="text-blue-400">Tails</strong>. It's definitive. A classical bit is exactly like this: just 0 or 1.
                        </p>
                        <p className="mb-12 leading-relaxed">
                            Now imagine a <em className="text-indigo-400 font-bold">Magic Quantum Coin</em>. While spinning in the air, it is simultaneously both Heads and Tails! It only decides its final state the exact moment you catch and observe it.
                        </p>
                        <div className="bg-slate-800 p-8 rounded-2xl border-l-8 border-indigo-500 shadow-inner">
                            <strong className="text-indigo-400 block mb-4 text-3xl">Analogy Fact:</strong>
                            A classical bit is an immobile switch (OFF or ON). A quantum bit (qubit) is like a spinning coin, holding all possibilities at once!
                        </div>
                    </div>

                    <div className="bg-slate-800 p-12 rounded-3xl border border-slate-700 shadow-2xl flex flex-col items-center justify-center min-h-[600px]">
                        <h3 className="text-4xl font-bold text-white mb-12">Interactive Lab: Flip the Coin</h3>

                        <div className="flex gap-6 mb-16 bg-slate-900 p-4 rounded-2xl">
                            <button
                                className={`px-8 py-4 text-2xl font-bold rounded-xl transition-colors ${!isQuantum ? 'bg-emerald-600 text-white shadow-lg border-b-4 border-emerald-800' : 'bg-transparent text-slate-400 hover:bg-slate-800'}`}
                                onClick={() => setIsQuantum(false)}
                            >
                                Classical Mode
                            </button>
                            <button
                                className={`px-8 py-4 text-2xl font-bold rounded-xl transition-colors ${isQuantum ? 'bg-indigo-600 text-white shadow-lg border-b-4 border-indigo-800' : 'bg-transparent text-slate-400 hover:bg-slate-800'}`}
                                onClick={() => setIsQuantum(true)}
                            >
                                Quantum Mode
                            </button>
                        </div>

                        <motion.div
                            key={coinState + isQuantum}
                            initial={coinState === 'Spinning...' ? { rotateY: 0 } : false}
                            animate={coinState === 'Spinning...' ? { rotateY: 360 * 8 } : { rotateY: 0 }}
                            transition={{ duration: 1, ease: "linear" }}
                            className="w-80 h-80 rounded-full flex items-center justify-center text-7xl font-extrabold border-16 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform-style-preserve-3d"
                            style={{
                                backgroundColor: isQuantum && coinState === 'Spinning...' ? '#4f46e5' : '#10b981',
                                borderColor: isQuantum ? '#312e81' : '#064e3b',
                                color: 'white'
                            }}
                        >
                            {isQuantum && coinState === 'Spinning...' ? <span className="text-5xl">H / T</span> : coinState}
                        </motion.div>

                        <button
                            onClick={handleFlip}
                            disabled={coinState === 'Spinning...'}
                            className="mt-20 px-10 md:px-16 py-4 md:py-6 text-2xl md:text-4xl bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-2xl border-b-8 border-blue-800 active:border-b-0 active:translate-y-2 transition-all"
                        >
                            {coinState === 'Spinning...' ? 'Observing...' : 'Flip Coin'}
                        </button>

                        {isQuantum && coinState !== 'Spinning...' && (
                            <p className="mt-8 text-2xl text-indigo-400 font-bold animate-pulse">It was simultaneously both until you measured it!</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Topic 2 */}
            <section className="space-y-12 pt-24 border-t-4 border-slate-800">
                <h2 className="text-5xl font-black text-emerald-400">Topic 2: What is a Qubit?</h2>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="space-y-12">
                        <div className="bg-slate-900 p-12 rounded-3xl border border-slate-700 shadow-2xl text-2xl text-slate-300">
                            <h3 className="text-4xl font-bold text-white mb-8 border-b-2 border-slate-800 pb-4">The Math Behind the Magic</h3>
                            <p className="mb-8 leading-relaxed">
                                A classical bit is just <span className="font-mono text-emerald-400 font-bold">0</span> or <span className="font-mono text-blue-400 font-bold">1</span>. A qubit exists in a <strong className="text-white">Superposition</strong>, represented mathematically by a state vector <span className="font-mono text-indigo-400">|ψ⟩</span>:
                            </p>

                            <div className="text-6xl py-12 bg-slate-950 rounded-2xl my-10 flex justify-center shadow-inner overflow-x-auto">
                                <BlockMath math="| \psi \rangle = \alpha | 0 \rangle + \beta | 1 \rangle" />
                            </div>

                            <ul className="list-disc ml-10 space-y-6">
                                <li><span className="text-emerald-400 font-bold text-3xl">α</span> and <span className="text-blue-400 font-bold text-3xl">β</span> are called <em>"probability amplitudes"</em>.</li>
                                <li><span className="font-mono bg-slate-800 px-2 rounded">|α|²</span> dictates the probability of it acting like a 0 when measured.</li>
                                <li>They must always balance out perfectly: <span className="font-mono bg-slate-800 px-2 rounded">|α|² + |β|² = 1</span></li>
                            </ul>
                        </div>

                        <div className="bg-slate-800 p-12 rounded-3xl border border-slate-700 shadow-2xl">
                            <h3 className="text-4xl font-bold text-white mb-8">Adjust the Probabilities Manually</h3>
                            <p className="text-2xl text-slate-400 mb-12">
                                Drag the sliders to change α and β manually, then measure! See how changing probabilities moves the arrow on the Bloch Sphere.
                            </p>

                            <div className="space-y-12 mb-12">
                                <div>
                                    <label className="text-3xl font-bold text-emerald-400 flex justify-between mb-6">
                                        <span>Probability of measuring |0⟩</span>
                                        <span className="bg-slate-900 px-4 py-2 rounded-lg">{(p0 * 100).toFixed(0)}%</span>
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
                                            setQOutcome(null) // Reset measurement result on change
                                        }}
                                        className="w-full h-8 mt-4 bg-slate-700 hover:bg-slate-600 rounded-2xl appearance-none cursor-pointer border-2 border-slate-900 shadow-inner"
                                    />
                                    <div className="flex justify-between text-lg text-slate-500 mt-4 font-bold">
                                        <span>Definitely |1⟩ (0%)</span>
                                        <span>Equal Superposition (50%)</span>
                                        <span>Definitely |0⟩ (100%)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-900 p-8 rounded-2xl gap-8">
                                <button
                                    onClick={() => setQOutcome(measure())}
                                    className="w-full sm:w-auto px-10 py-6 text-3xl bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl shadow-xl border-b-6 border-indigo-800 active:border-b-0 active:translate-y-[6px] transition-all text-white"
                                >
                                    Measure State!
                                </button>
                                <div className="h-24 flex items-center justify-center px-8 bg-slate-950 rounded-xl min-w-[200px] shadow-inner border border-slate-800">
                                    {qOutcome !== null ? (
                                        <div className="text-5xl font-extrabold text-white animate-in zoom-in">
                                            Result: <span className={qOutcome === 0 ? "text-emerald-400" : "text-blue-400"}>|{qOutcome}⟩</span>
                                        </div>
                                    ) : (
                                        <span className="text-2xl text-slate-600 font-bold">Awaiting Measurement</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="bg-slate-900 p-12 rounded-3xl border border-slate-700 shadow-2xl h-full flex flex-col">
                            <h3 className="text-4xl font-bold text-white mb-6">The Bloch Sphere</h3>
                            <p className="text-2xl text-slate-400 mb-8 flex-1">
                                This sphere represents all possible states of a single qubit geographically. The arrow shows the current state based on your slider values! Notice that when Probability of |0⟩ is 100%, the arrow points straight UP.
                            </p>
                            <div className="mt-8 border-4 border-slate-800 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                <BlochSphere />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="pt-24 flex justify-end">
                <Link href="/modules/2" className="flex items-center gap-4 px-12 py-6 bg-cyan-600 hover:bg-cyan-500 text-white text-3xl font-black rounded-2xl shadow-2xl border-b-8 border-cyan-800 transition-all active:border-b-0 active:translate-y-2 group">
                    Proceed to Module 2
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
            </div>
        </div>
    )
}
