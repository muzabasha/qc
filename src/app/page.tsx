'use client'

import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import AnimatedMath from '@/components/math/AnimatedMath'
import CircuitBuilder from '@/components/quantum/CircuitBuilder'

// Dynamic import for WebGL/Three.js components to prevent SSR issues
const BlochSphere = dynamic(() => import('@/components/quantum/BlochSphere'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-slate-800 rounded-xl flex items-center justify-center animate-pulse border border-slate-700">
      <p className="text-slate-400 font-mono">Initializing Quantum State Simulator...</p>
    </div>
  )
})

export default function Home() {
  return (
    <main className="max-w-[1400px] w-full mx-auto p-6 md:p-12 space-y-16 animate-in fade-in duration-1000">
      {/* Header section */}
      <header className="border-b-4 border-slate-800 pb-12 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none bg-linear-to-r from-emerald-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            Quantum<br />Lab
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed font-medium">
            An interactive, zero-physics-prerequisite journey into quantum computing. Aligned with <span className="text-emerald-400">NEP 2020</span> principles: experiential and inquiry-based.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 w-full xl:w-auto">
          <a
            href="https://scholar-sparkle-web.lovable.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 xl:flex-none px-6 py-3 text-base bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-xl border-b-4 border-indigo-800 transition-all active:border-b-0 active:translate-y-1 text-center"
          >
            Instructor Profile
          </a>
          <Link href="/modules/1" className="flex-1 xl:flex-none px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-base font-bold rounded-xl shadow-xl border-b-4 border-emerald-800 transition-all active:border-b-0 active:translate-y-1 text-center">
            Go To Course
          </Link>
        </div>
      </header>

      <div className="py-8 flex justify-center">
        <Link href="/modules/1" className="w-full max-w-3xl px-8 md:px-12 py-6 md:py-8 bg-linear-to-br from-emerald-600 to-cyan-700 hover:from-emerald-500 hover:to-cyan-600 text-white text-xl md:text-2xl font-bold rounded-2xl shadow-[0_10px_40px_rgba(16,185,129,0.3)] border-b-6 border-emerald-900 transition-all active:border-b-0 active:translate-y-2 group flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
          <div className="flex-1">
            <span className="block text-emerald-200 text-sm md:text-base mb-1 font-semibold uppercase tracking-wide">Experiential Learning</span>
            Start The Interactive Course
          </div>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-3xl md:text-4xl"
          >
            →
          </motion.div>
        </Link>
      </div>

      {/* Main interactive grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 pt-12">
        {/* Left Column: Visualizers */}
        <section className="space-y-12 flex flex-col">
          <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-4">
              <span className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-lg shrink-0">1</span>
              Visualize the Qubit
            </h2>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed">
              The Bloch Sphere represents the quantum state geometrically. Notice how the arrows move when you apply gates!
            </p>
            <div className="pt-4">
              <BlochSphere />
            </div>
          </div>

          <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-4">
              <span className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-lg shrink-0">2</span>
              Understand the Math
            </h2>
            <AnimatedMath />
          </div>
        </section>

        {/* Right Column: Interactive Lab */}
        <section className="space-y-12 flex flex-col">
          <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-4">
              <span className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-lg shrink-0">3</span>
              Build & Experiment
            </h2>
            <p className="text-base md:text-lg text-slate-400 mb-4 leading-relaxed">
              Apply quantum gates to watch the state vector rotate.
              <br />
              <strong className="text-emerald-400">X</strong> flips |0⟩ to |1⟩.
              <strong className="text-emerald-400 ml-2">H</strong> creates a superposition.
            </p>
            <CircuitBuilder />
          </div>

          <div className="bg-indigo-950/30 p-6 md:p-8 rounded-2xl border-2 border-indigo-500/30 shadow-xl flex-1 backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-bold text-indigo-300 mb-4 border-b border-indigo-500/20 pb-3">Challenge: Superposition</h3>
            <p className="text-base md:text-lg text-slate-300 mb-6 leading-relaxed">
              Can you create a state that has a perfect 50% chance of being measured as |0⟩ or |1⟩?
            </p>
            <ul className="space-y-3">
              {[
                "Reset the circuit.",
                "Click to apply the H (Hadamard) gate.",
                "Check the math breakdown to confirm |α|² = 50%.",
                "Measure the state multiple times to observe randomness."
              ].map((step, i) => (
                <li key={i} className="flex gap-3 text-sm md:text-base text-slate-400">
                  <span className="text-indigo-500 font-bold">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}
