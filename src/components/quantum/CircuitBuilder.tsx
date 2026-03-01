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
        <div className="p-6 bg-slate-800 rounded-xl text-white shadow-lg border border-slate-700">
            <h3 className="text-xl mb-4 font-bold text-slate-200">Quantum Circuit</h3>

            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-4">
                    {GATES.map((gate) => (
                        <motion.button
                            key={gate}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleApply(gate)}
                            className="w-12 h-12 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg text-lg font-bold border-b-4 border-indigo-800 transition-colors"
                        >
                            {gate}
                        </motion.button>
                    ))}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleMeasure}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 font-bold rounded shadow border-b-4 border-emerald-800"
                    >
                        Measure
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 font-bold rounded shadow border-b-4 border-red-800"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Qubit Wire */}
            <div className="flex items-center gap-2 bg-slate-900 p-4 rounded-lg overflow-x-auto min-h-[100px]">
                <span className="font-mono text-xl mr-4 text-emerald-400 font-bold">|0⟩</span>

                <div className="h-1 bg-slate-600 flex-1 relative flex items-center min-w-[300px]">
                    {circuit.map((gate, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0, x: -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            className="w-10 h-10 bg-indigo-500 absolute rounded-md shadow-md flex items-center justify-center font-bold text-lg z-10"
                            style={{ left: `${idx * 60}px` }}
                        >
                            {gate}
                        </motion.div>
                    ))}

                    {lastMeasurement !== null && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute w-10 h-10 bg-slate-200 text-slate-900 font-bold flex items-center justify-center rounded-full z-20"
                            style={{ left: `${circuit.length * 60 + 20}px` }}
                        >
                            {lastMeasurement}
                        </motion.div>
                    )}
                </div>
            </div>

            {lastMeasurement !== null && (
                <p className="mt-4 text-emerald-400">Measurement collapsed state to |{lastMeasurement}⟩</p>
            )}
        </div>
    )
}
