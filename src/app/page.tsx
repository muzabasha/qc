'use client'

import React from 'react'
import dynamic from 'next/dynamic'
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
    <main className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Header section */}
      <header className="mb-12 border-b border-slate-800 pb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-linear-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
            Quantum Learning Platform
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            An interactive, zero-physics-prerequisite journey into quantum computing. Aligned with NEP 2020 principles: experiential, inquiry-based, and multidisciplinary.
          </p>
        </div>
        <div>
          <a
            href="https://scholar-sparkle-web.lovable.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-lg transition-colors inline-block"
          >
            Instructor Profile
          </a>
        </div>
      </header>

      {/* Main interactive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Visualizers */}
        <section className="space-y-8 flex flex-col">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-indigo-600 w-8 h-8 rounded flex items-center justify-center text-sm shadow">1</span>
              Visualize the Qubit
            </h2>
            <p className="text-slate-400 mb-4">
              The Bloch Sphere represents the quantum state geometrically. Notice how the arrows move when you apply gates!
            </p>
            <BlochSphere />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-indigo-600 w-8 h-8 rounded flex items-center justify-center text-sm shadow">2</span>
              Understand the Math
            </h2>
            <AnimatedMath />
          </div>
        </section>

        {/* Right Column: Interactive Lab */}
        <section className="space-y-8 flex flex-col">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-indigo-600 w-8 h-8 rounded flex items-center justify-center text-sm shadow">3</span>
              Build & Experiment
            </h2>
            <p className="text-slate-400 mb-4">
              Apply quantum gates to watch the state vector rotate.
              <br />
              <strong className="text-emerald-400">X</strong> flips |0⟩ to |1⟩.
              <strong className="text-emerald-400 ml-2">H</strong> creates a superposition.
            </p>
            <CircuitBuilder />
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 flex-1">
            <h3 className="text-xl font-bold text-slate-200 mb-4">Challenge: Superposition</h3>
            <p className="text-slate-400 mb-4">
              Can you create a state that has a perfect 50% chance of being measured as |0⟩ or |1⟩?
            </p>
            <ul className="list-disc ml-4 text-sm text-slate-400 space-y-2">
              <li>Reset the circuit.</li>
              <li>Click to apply the <strong>H (Hadamard)</strong> gate.</li>
              <li>Check the math breakdown down below to confirm |α|² = 50% and |β|² = 50%.</li>
              <li>Measure the state a few times to observe the random collapse.</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}
