'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuantumStore } from '@/store/useQuantumStore'
import { GateName } from '@/physics/gates'
import { Undo, Redo } from 'lucide-react'
import { useToast } from '@/components/Toast'

const GATES: GateName[] = ['H', 'X', 'Y', 'Z']

const GATE_DESCRIPTIONS: Partial<Record<GateName, string>> = {
    H: 'Hadamard gate - Creates superposition',
    X: 'Pauli-X gate - Quantum NOT, flips state',
    Y: 'Pauli-Y gate - Rotates around Y-axis',
    Z: 'Pauli-Z gate - Phase flip'
}

export default function CircuitBuilder() {
    const { applyGate, measure, reset } = useQuantumStore()
    const [circuit, setCircuit] = useState<GateName[]>([])
    const [history, setHistory] = useState<GateName[][]>([[]])
    const [historyIndex, setHistoryIndex] = useState(0)
    const [lastMeasurement, setLastMeasurement] = useState<0 | 1 | null>(null)
    const { showToast } = useToast()

    const handleApply = (gate: GateName) => {
        const newCircuit = [...circuit, gate]
        setCircuit(newCircuit)

        // Update history
        const newHistory = history.slice(0, historyIndex + 1)
        newHistory.push(newCircuit)
        setHistory(newHistory)
        setHistoryIndex(newHistory.length - 1)

        applyGate(gate)
        setLastMeasurement(null)
        showToast(`Applied ${gate} gate`, 'success')
    }

    const handleUndo = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1
            setHistoryIndex(newIndex)
            const previousCircuit = history[newIndex]
            setCircuit(previousCircuit)

            // Rebuild quantum state
            reset()
            previousCircuit.forEach(gate => applyGate(gate))
            setLastMeasurement(null)
            showToast('Undone last action', 'info')
        }
    }

    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1
            setHistoryIndex(newIndex)
            const nextCircuit = history[newIndex]
            setCircuit(nextCircuit)

            // Rebuild quantum state
            reset()
            nextCircuit.forEach(gate => applyGate(gate))
            setLastMeasurement(null)
            showToast('Redone action', 'info')
        }
    }

    const handleMeasure = () => {
        const result = measure()
        setLastMeasurement(result)
        showToast(`Measured: |${result}⟩`, 'success')
    }

    const handleReset = () => {
        reset()
        setCircuit([])
        setHistory([[]])
        setHistoryIndex(0)
        setLastMeasurement(null)
        showToast('Circuit reset', 'info')
    }

    return (
        <div className="p-6 md:p-8 bg-slate-800 rounded-xl text-white shadow-lg border border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-200">Quantum Circuit</h3>

                <div className="flex gap-2">
                    <button
                        onClick={handleUndo}
                        disabled={historyIndex === 0}
                        className="p-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl transition-colors"
                        aria-label="Undo last gate"
                        title="Undo (Ctrl+Z)"
                    >
                        <Undo size={20} aria-hidden="true" />
                    </button>
                    <button
                        onClick={handleRedo}
                        disabled={historyIndex === history.length - 1}
                        className="p-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl transition-colors"
                        aria-label="Redo last undone action"
                        title="Redo (Ctrl+Y)"
                    >
                        <Redo size={20} aria-hidden="true" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
                <div className="flex flex-wrap gap-3 md:gap-4" role="group" aria-label="Quantum gates">
                    {GATES.map((gate) => (
                        <motion.button
                            key={gate}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleApply(gate)}
                            className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 rounded-2xl shadow-xl text-3xl md:text-4xl font-black border-b-6 border-indigo-800 transition-all active:border-b-0 active:translate-y-2"
                            aria-label={GATE_DESCRIPTIONS[gate] || `${gate} gate`}
                            title={GATE_DESCRIPTIONS[gate] || `${gate} gate`}
                        >
                            {gate}
                        </motion.button>
                    ))}
                </div>

                <div className="flex flex-wrap gap-3 w-full xl:w-auto">
                    <button
                        onClick={handleMeasure}
                        className="flex-1 xl:flex-none px-6 md:px-8 py-3 md:py-4 text-lg md:text-2xl bg-emerald-600 hover:bg-emerald-500 font-black rounded-2xl shadow-xl border-b-6 border-emerald-800 active:border-b-0 active:translate-y-2 transition-all"
                        aria-label="Measure quantum state"
                    >
                        Measure
                    </button>
                    <button
                        onClick={handleReset}
                        className="flex-1 xl:flex-none px-6 md:px-8 py-3 md:py-4 text-lg md:text-2xl bg-red-600 hover:bg-red-500 font-black rounded-2xl shadow-xl border-b-6 border-red-800 active:border-b-0 active:translate-y-2 transition-all"
                        aria-label="Reset circuit to initial state"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Qubit Wire */}
            <div
                className="flex items-center gap-4 bg-slate-900 p-4 md:p-6 rounded-xl overflow-x-auto min-h-[140px] md:min-h-[160px]"
                role="img"
                aria-label={`Quantum circuit with ${circuit.length} gates applied`}
            >
                <span className="font-mono text-3xl md:text-4xl mr-4 md:mr-6 text-emerald-400 font-bold" aria-label="Initial state zero">|0⟩</span>

                <div className="h-1 bg-slate-600 relative flex items-center" style={{ minWidth: `${Math.max(300, (circuit.length + 2) * 80)}px` }}>
                    {circuit.map((gate, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0, x: -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            className="w-14 h-14 md:w-16 md:h-16 bg-indigo-500 absolute rounded-lg shadow-lg flex items-center justify-center font-bold text-2xl md:text-3xl z-10"
                            style={{ left: `${idx * 80}px` }}
                            aria-label={`Gate ${idx + 1}: ${GATE_DESCRIPTIONS[gate] || gate}`}
                        >
                            {gate}
                        </motion.div>
                    ))}

                    {lastMeasurement !== null && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute w-14 h-14 md:w-16 md:h-16 bg-slate-200 text-slate-900 font-bold text-2xl md:text-3xl flex items-center justify-center rounded-full z-20"
                            style={{ left: `${circuit.length * 80 + 20}px` }}
                            aria-label={`Measurement result: ${lastMeasurement}`}
                        >
                            {lastMeasurement}
                        </motion.div>
                    )}
                </div>
            </div>

            {lastMeasurement !== null && (
                <p className="mt-6 md:mt-8 text-2xl md:text-3xl text-emerald-400 font-bold" role="status" aria-live="polite">
                    Measurement collapsed state to |{lastMeasurement}⟩
                </p>
            )}
        </div>
    )
}
