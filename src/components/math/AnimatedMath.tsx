'use client'

import React from 'react'
import 'katex/dist/katex.min.css'
import { BlockMath } from 'react-katex'
import { motion } from 'framer-motion'
import { useQuantumStore } from '@/store/useQuantumStore'
import { prob } from '@/physics/math'

export default function AnimatedMath() {
    const { alpha, beta } = useQuantumStore()

    const p0 = prob(alpha)
    const p1 = prob(beta)

    return (
        <div className="p-6 bg-slate-800 text-white rounded-xl shadow-lg border border-slate-700">
            <h3 className="text-xl mb-4 font-bold text-slate-200">State Vector</h3>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-2xl mt-4 mb-8 bg-slate-900/50 p-4 rounded-lg flex flex-col items-center">
                    <BlockMath math="| \psi \rangle = \alpha | 0 \rangle + \beta | 1 \rangle" />

                    <div className="mt-4 text-sm font-mono flex gap-8">
                        <span className="text-emerald-400 p-2 bg-emerald-400/10 rounded">
                            |α|² = {(p0 * 100).toFixed(1)}%
                        </span>
                        <span className="text-blue-400 p-2 bg-blue-400/10 rounded">
                            |β|² = {(p1 * 100).toFixed(1)}%
                        </span>
                    </div>
                </div>
            </motion.div>

            <div className="text-sm text-slate-400">
                <p className="mb-2"><strong>Interactive interpretation:</strong></p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>The coefficients <span className="text-emerald-400">α</span> and <span className="text-blue-400">β</span> dictate the probability of collapse.</li>
                    <li>Squaring these amplitudes gives you the measurement probability.</li>
                    <li>Note that |α|² + |β|² = 1.</li>
                </ul>
            </div>
        </div>
    )
}
