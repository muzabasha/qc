'use client'

import React from 'react'
import Link from 'next/link'
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
    <main className="max-w-[1600px] w-full mx-auto p-4 md:p-8">
      {/* Header section */}
      <header className="mb-12 border-b border-slate-800 pb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 bg-linear-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
            Quantum Learning Platform
          </h1>
          <p className="text-2xl text-slate-300 max-w-4xl">
            An interactive, zero-physics-prerequisite journey into quantum computing. Aligned with NEP 2020 principles: experiential, inquiry-based, and multidisciplinary.
          </p>
        </div>
        <div>
          <a
            href="https://scholar-sparkle-web.lovable.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 text-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow-lg transition-colors inline-block"
          >
            Instructor Profile
          </a>
        </div>
      </header>

      <div className="mb-12 flex justify-center">
        <Link href="/modules/1" className="px-16 py-8 bg-emerald-600 hover:bg-emerald-500 text-white text-4xl font-black rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.5)] border-b-8 border-emerald-800 transition-all active:border-b-0 active:translate-y-2 group flex items-center gap-6">
          Start The Interactive Course
          <span className="group-hover:translate-x-2 transition-transform">→</span>
        </Link>
      </div>

      {/* Main interactive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Visualizers */}
        <section className="space-y-8 flex flex-col">
          <div>
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-4">
              <span className="bg-indigo-600 w-10 h-10 rounded flex items-center justify-center text-xl shadow">1</span>
              Visualize the Qubit
            </h2>
            <p className="text-xl text-slate-300 mb-6">
              The Bloch Sphere represents the quantum state geometrically. Notice how the arrows move when you apply gates!
            </p>
            <BlochSphere />
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-4">
              <span className="bg-indigo-600 w-10 h-10 rounded flex items-center justify-center text-xl shadow">2</span>
              Understand the Math
            </h2>
            <AnimatedMath />
          </div>
        </section>

        {/* Right Column: Interactive Lab */}
        <section className="space-y-8 flex flex-col">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-4">
              <span className="bg-indigo-600 w-10 h-10 rounded flex items-center justify-center text-xl shadow">3</span>
              Build & Experiment
            </h2>
            <p className="text-xl text-slate-300 mb-6">
              Apply quantum gates to watch the state vector rotate.
              <br />
              <strong className="text-emerald-400">X</strong> flips |0⟩ to |1⟩.
              <strong className="text-emerald-400 ml-2">H</strong> creates a superposition.
            </p>
            <CircuitBuilder />
          </div>

          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 flex-1">
            <h3 className="text-3xl font-bold text-slate-200 mb-6">Challenge: Superposition</h3>
            <p className="text-xl text-slate-300 mb-6">
              Can you create a state that has a perfect 50% chance of being measured as |0⟩ or |1⟩?
            </p>
            <ul className="list-disc ml-6 text-xl text-slate-300 space-y-4">
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
