'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Module8() {
    const [noise, setNoise] = useState(0)

    return (
        <div className="max-w-[1400px] w-full mx-auto p-6 md:p-12 space-y-12 md:space-y-24 pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-5xl md:text-8xl font-black text-white mb-6">Module 8: Recent Trends & Challenges</h1>
                <p className="text-2xl md:text-4xl text-slate-400 font-medium">Why don't we all have Quantum Laptops yet?</p>
            </header>

            {/* Challenge 1: Decoherence & Noise */}
            <section className="space-y-12">
                <div className="flex items-center gap-6">
                    <div className="bg-red-600/20 p-4 rounded-xl text-4xl">🌫️</div>
                    <h2 className="text-3xl md:text-5xl font-black text-red-500">The Noise Problem (NISQ Era)</h2>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="bg-slate-900 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl text-xl md:text-2xl text-slate-300 flex flex-col justify-center space-y-8">
                        <h3 className="text-4xl font-bold text-white mb-4 border-b-2 border-slate-800 pb-4">Decoherence</h3>
                        <p className="leading-relaxed">
                            We are currently in the <strong>NISQ (Noisy Intermediate-Scale Quantum)</strong> era.
                        </p>
                        <p className="leading-relaxed">
                            Qubits are extremely fragile. Heat, magnets, or radiation will cause the state to collapse prematurely. This is called <strong className="text-red-400 font-bold italic">Decoherence</strong>.
                        </p>
                        <div className="bg-slate-800 p-8 rounded-2xl border-l-8 border-red-500 shadow-inner">
                            <strong className="text-red-400 block mb-4 text-2xl">The Threat:</strong>
                            If noise enters the system, the math breaks and the results become garbage.
                        </div>
                    </div>

                    <div className="bg-slate-800 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl flex flex-col items-center justify-center space-y-8">
                        <h3 className="text-3xl md:text-4xl font-bold text-white text-center">Interactive Lab: Environmental Noise</h3>
                        <p className="text-xl text-slate-400 text-center font-medium">Slide to introduce interference and watch the state reach its limit.</p>

                        <div className="w-full space-y-4">
                            <div className="flex justify-between text-lg font-bold">
                                <span className="text-emerald-400">Pristine</span>
                                <span className="text-red-500">Chaotic</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={noise}
                                onChange={(e) => setNoise(parseInt(e.target.value))}
                                className="w-full h-8 bg-slate-900 rounded-2xl appearance-none cursor-pointer border-2 border-slate-700 shadow-inner accent-red-500"
                            />
                        </div>

                        <div className="w-full h-[300px] md:h-[400px] bg-slate-950 border-4 border-slate-900 rounded-3xl relative overflow-hidden shadow-inner flex items-center justify-center transition-colors duration-500">
                            <div className="text-center z-10 p-6 md:p-10 bg-slate-950/80 rounded-[32px] border border-slate-800 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,1)]">
                                <span className={`text-2xl md:text-4xl font-black transition-all tracking-tighter uppercase ${noise > 50 ? 'text-red-500' : 'text-emerald-400'}`}>
                                    {noise > 80 ? 'CRASH / COLLAPSE' : noise > 50 ? 'ERRONEOUS STATE' : 'Stable Purity |𝜓⟩'}
                                </span>
                            </div>
                            {Array.from({ length: Math.floor(noise * 1.5) }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute bg-white/20 rounded-full blur-[2px]"
                                    style={{
                                        width: Math.random() * 40 + 10 + 'px',
                                        height: Math.random() * 40 + 10 + 'px',
                                        left: Math.random() * 100 + '%',
                                        top: Math.random() * 100 + '%',
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Solutions & Supremacy */}
            <section className="space-y-12">
                <div className="flex items-center gap-6">
                    <div className="bg-emerald-600/20 p-4 rounded-xl text-4xl">🚀</div>
                    <h2 className="text-3xl md:text-5xl font-black text-emerald-500">The Solutions: Looking Forward</h2>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div className="bg-slate-900 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl space-y-8">
                        <h3 className="text-4xl font-bold text-white border-b-2 border-slate-800 pb-4">Error Correction (QEC)</h3>
                        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                            To solve decoherence, we group multiple physical qubits together to form one reliable <strong>"Logical Qubit"</strong>.
                        </p>
                        <div className="bg-indigo-900/30 p-8 rounded-2xl border-l-8 border-indigo-500 shadow-inner">
                            <strong className="text-indigo-400 text-2xl md:text-3xl block mb-4 italic">Topological Qubits:</strong>
                            Microsoft and others are researching qubits made by braiding exotic particles. They are mathematically immune to noise!
                        </div>
                    </div>
                    <div className="bg-slate-900 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl space-y-8">
                        <h3 className="text-4xl font-bold text-white border-b-2 border-slate-800 pb-4">Quantum Supremacy</h3>
                        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                            This is the moment a Quantum Computer solves a problem that no classical machine could EVER solve. Google claimed this milestone in 2019 using their 53-qubit processor.
                        </p>
                        <div className="bg-emerald-900/30 p-8 rounded-2xl border-l-8 border-emerald-500 shadow-inner">
                            <strong className="text-emerald-400 text-2xl md:text-3xl block mb-4 italic">The Future:</strong>
                            We are moving from "proof of concept" to "practical utility."
                        </div>
                    </div>
                </div>
            </section>

            <div className="bg-linear-to-br from-slate-800 to-slate-950 p-12 md:p-32 rounded-[64px] text-center flex flex-col items-center space-y-12 shadow-[0_0_100px_rgba(0,0,0,0.5)] border-4 border-slate-700/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                <h2 className="text-5xl md:text-9xl font-black bg-linear-to-r from-emerald-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent leading-tight pb-4 z-10">Congratulations!</h2>
                <p className="text-xl md:text-4xl text-slate-300 max-w-4xl leading-relaxed font-bold z-10 transition-colors group-hover:text-white">
                    You have journeyed from flipping a quantum coin to understanding hardware trends. You are now prepared for the <strong className="text-white italic">Post-Quantum Era</strong>.
                </p>

                <Link href="/" className="z-10 px-12 md:px-24 py-6 md:py-10 bg-indigo-600 hover:bg-indigo-500 text-white text-2xl md:text-5xl font-black rounded-[40px] shadow-[0_20px_50px_rgba(79,70,229,0.4)] border-b-12 border-indigo-800 transition-all active:border-b-0 active:translate-y-4 active:shadow-none hover:scale-105">
                    Return to Dashboard
                </Link>

                <div className="pt-12 text-slate-500 text-lg md:text-xl font-bold uppercase tracking-[0.5em] z-10">End of Course</div>
            </div>

        </div>
    )
}
