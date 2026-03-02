'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuantumStore } from '@/store/useQuantumStore'
import { GateName } from '@/physics/gates'

const GATES: GateName[] = ['H', 'X', 'Y', 'Z']

export default function CircuitBuilder() {
    const { applyGate, measure, reset } = useQuantumStore()
    const [circuit, setCircuit] = useState<GateName[]>([])
    const [lastMeasurement, setLastMeasurement] = useState<0 | 1 | null>(null)

    const handleApply = (gate: GateName) => {
        setCircuit((prev) => [...prev, gate])
        applyGate(gate)
        setLastMeasurement(null) // invalidate previous measurement
    }

    const handleMeasure = () => {
        setLastMeasurement(measure())
    }

    const handleReset = () => {
        reset()
        setCircuit([])
        setLastMeasurement(null)
    }

    return (
        <div className="p-8 bg-slate-800 rounded-xl text-white shadow-lg border border-slate-700">
            <h3 className="text-3xl mb-8 font-bold text-slate-200">Quantum Circuit</h3>

            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mb-10">
                <div className="flex flex-wrap gap-4 md:gap-6">
                    {GATES.map((gate) => (
                        <motion.button
                            key={gate}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleApply(gate)}
                            className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 rounded-2xl shadow-xl text-4xl md:text-5xl font-black border-b-8 border-indigo-800 transition-all active:border-b-0 active:translate-y-2"
                        >
                            {gate}
                        </motion.button>
                    ))}
                </div>

                <div className="flex flex-wrap gap-4 w-full xl:w-auto">
                    <button
                        onClick={handleMeasure}
                        className="flex-1 xl:flex-none px-6 md:px-10 py-4 md:py-5 text-xl md:text-3xl bg-emerald-600 hover:bg-emerald-500 font-black rounded-2xl shadow-xl border-b-8 border-emerald-800 active:border-b-0 active:translate-y-2 transition-all"
                    >
                        Measure
                    </button>
                    <button
                        onClick={handleReset}
                        className="flex-1 xl:flex-none px-6 md:px-10 py-4 md:py-5 text-xl md:text-3xl bg-red-600 hover:bg-red-500 font-black rounded-2xl shadow-xl border-b-8 border-red-800 active:border-b-0 active:translate-y-2 transition-all"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Qubit Wire */}
            <div className="flex items-center gap-4 bg-slate-900 p-6 rounded-xl overflow-x-auto min-h-[160px]">
                <span className="font-mono text-4xl mr-6 text-emerald-400 font-bold">|0⟩</span>

                <div className="h-1 bg-slate-600 relative flex items-center" style={{ minWidth: `${Math.max(300, (circuit.length + 2) * 80)}px` }}>
                    {circuit.map((gate, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0, x: -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            className="w-16 h-16 bg-indigo-500 absolute rounded-lg shadow-lg flex items-center justify-center font-bold text-3xl z-10"
                            style={{ left: `${idx * 80}px` }}
                        >
                            {gate}
                        </motion.div>
                    ))}

                    {lastMeasurement !== null && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute w-16 h-16 bg-slate-200 text-slate-900 font-bold text-3xl flex items-center justify-center rounded-full z-20"
                            style={{ left: `${circuit.length * 80 + 20}px` }}
                        >
                            {lastMeasurement}
                        </motion.div>
                    )}
                </div>
            </div>

            {lastMeasurement !== null && (
                <p className="mt-8 text-3xl text-emerald-400 font-bold">Measurement collapsed state to |{lastMeasurement}⟩</p>
            )}
        </div>
    )
}
