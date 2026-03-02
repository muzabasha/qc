'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function Module8() {
    const [noise, setNoise] = useState(0)

    return (
        <div className="max-w-[1400px] w-full mx-auto p-12 space-y-24 pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-8xl font-extrabold text-white mb-6">Module 8: Recent Trends & Challenges</h1>
                <p className="text-4xl text-slate-400">Why don't we all have Quantum Laptops yet?</p>
            </header>

            {/* Challenge 1: Decoherence & Noise */}
            <section className="space-y-12">
                <h2 className="text-5xl font-black text-red-500 border-b-2 border-slate-700 pb-8">The Noise Problem (NISQ Era)</h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="bg-slate-900 p-12 rounded-3xl border border-slate-700 shadow-2xl text-2xl text-slate-300">
                        <h3 className="text-4xl font-bold text-white mb-8 border-b-2 border-slate-800 pb-4">Decoherence</h3>
                        <p className="mb-8 leading-relaxed">
                            We are currently in the <strong>NISQ (Noisy Intermediate-Scale Quantum)</strong> era.
                        </p>
                        <p className="mb-12 leading-relaxed">
                            Qubits are extremely fragile. The slightest change in temperature, an electromagnetic wave passing by, or radiation from space will cause the quantum state to collapse prematurely before the algorithm finishes. This is called <strong className="text-red-400 text-3xl block mt-4">Decoherence</strong>.
                        </p>
                    </div>

                    <div className="bg-slate-800 p-12 rounded-3xl border border-slate-700 shadow-2xl flex flex-col items-center justify-center">
                        <h3 className="text-4xl font-bold text-white mb-12">Interactive Lab: Environmental Noise</h3>

                        <p className="text-xl text-slate-400 mb-8 self-start">Slide up the Environmental Noise to see how your delicate Quantum state reacts to interference.</p>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={noise}
                            onChange={(e) => setNoise(parseInt(e.target.value))}
                            className="w-full h-8 mt-4 bg-slate-700 hover:bg-slate-600 rounded-2xl appearance-none cursor-pointer border-2 border-slate-900 shadow-inner accent-red-500"
                        />

                        <div className="mt-16 w-full h-[400px] bg-slate-900 border-4 border-slate-700 rounded-3xl relative overflow-hidden shadow-inner flex items-center justify-center isolate">
                            {/* Simulation visual */}
                            <div className="text-center z-10 p-12 bg-slate-950/80 rounded-2xl border border-slate-800 backdrop-blur-md">
                                <span className={`text-6xl font-black transition-all ${noise > 50 ? 'text-red-500' : 'text-emerald-400'}`}>
                                    {noise > 80 ? 'CRASH / COLLAPSE' : noise > 50 ? 'ERRONEOUS STATE' : 'Stable Purity |𝜓⟩'}
                                </span>
                            </div>

                            {/* Noise overlay */}
                            {Array.from({ length: Math.floor(noise * 1.5) }).map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute bg-white/30 rounded-full"
                                    style={{
                                        width: Math.random() * 40 + 'px',
                                        height: Math.random() * 40 + 'px',
                                        left: Math.random() * 100 + '%',
                                        top: Math.random() * 100 + '%',
                                        animation: `spin ${Math.random() * 2 + 0.5}s infinite linear`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Solutions & Supremacy */}
            <section className="space-y-12">
                <h2 className="text-5xl font-black text-emerald-500 border-b-2 border-slate-700 pb-8">The Solutions: Looking Forward</h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="bg-slate-900 p-12 rounded-3xl border border-slate-700 shadow-2xl">
                        <h3 className="text-4xl font-bold text-white mb-6">Quantum Error Correction (QEC)</h3>
                        <p className="text-2xl text-slate-300 leading-relaxed mb-6">
                            To solve decoherence, scientists group multiple physical qubits together to form one reliable <strong>"Logical Qubit"</strong>. Current models suggest we might need 1,000 physical qubits to stabilize 1 logical qubit.
                        </p>
                        <div className="bg-indigo-900/50 p-8 rounded-2xl mb-8 border-l-8 border-indigo-500">
                            <strong className="text-indigo-400 text-3xl">Topological Qubits:</strong>
                            Microsoft and others are researching qubits made by braiding non-abelian anyons. They are extremely hard to create, but mathematically immune to local noise!
                        </div>
                    </div>
                    <div className="bg-slate-900 p-12 rounded-3xl border border-slate-700 shadow-2xl">
                        <h3 className="text-4xl font-bold text-white mb-6">Quantum Supremacy</h3>
                        <p className="text-2xl text-slate-300 leading-relaxed mb-6">
                            Quantum Supremacy (or Advantage) is the exact moment a Quantum Computer solves a problem that no classical supercomputer on Earth could solve in a reasonable timeframe. Google claimed to have achieved this milestone first in 2019!
                        </p>
                    </div>
                </div>
            </section>

            <div className="flex bg-slate-800 p-12 rounded-3xl text-center items-center flex-col mt-24">
                <h2 className="text-6xl font-black bg-linear-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent mb-8">Course Complete!</h2>
                <p className="text-3xl text-slate-300 mb-12">
                    You have journeyed from the basics of flipping a quantum coin, through mathematics and circuits, to understanding real hardware trends.
                </p>
                <Link href="/" className="px-12 py-6 bg-indigo-600 hover:bg-indigo-500 text-white text-3xl font-black rounded-2xl shadow-2xl border-b-8 border-indigo-800 transition-all active:border-b-0 active:translate-y-2">
                    Return to Dashboard
                </Link>
            </div>

        </div>
    )
}
