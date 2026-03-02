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
        <div className="p-6 md:p-8 bg-slate-800 text-white rounded-xl shadow-lg border border-slate-700">
            <h3 className="text-2xl md:text-3xl mb-6 font-bold text-slate-200">State Vector</h3>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-3xl md:text-5xl mt-6 mb-8 md:mb-12 bg-slate-900/50 p-6 md:p-8 rounded-xl flex flex-col items-center overflow-x-auto">
                    <BlockMath math="| \psi \rangle = \alpha | 0 \rangle + \beta | 1 \rangle" />

                    <div
                        className="mt-6 md:mt-8 text-xl md:text-2xl font-mono flex flex-col sm:flex-row gap-4 md:gap-12"
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        <span className="text-emerald-400 p-3 md:p-4 bg-emerald-400/10 rounded-lg">
                            <span className="sr-only">Probability of measuring zero: </span>
                            |α|² = {(p0 * 100).toFixed(1)}%
                        </span>
                        <span className="text-blue-400 p-3 md:p-4 bg-blue-400/10 rounded-lg">
                            <span className="sr-only">Probability of measuring one: </span>
                            |β|² = {(p1 * 100).toFixed(1)}%
                        </span>
                    </div>
                </div>
            </motion.div>

            <div className="text-lg md:text-xl text-slate-300">
                <p className="mb-4"><strong>Interactive interpretation:</strong></p>
                <ul className="list-disc ml-6 md:ml-8 mt-4 space-y-3 md:space-y-4">
                    <li>The coefficients <span className="text-emerald-400 font-bold">α</span> and <span className="text-blue-400 font-bold">β</span> dictate the probability of collapse.</li>
                    <li>Squaring these amplitudes gives you the measurement probability.</li>
                    <li>Note that |α|² + |β|² = 1.</li>
                </ul>
            </div>
        </div>
    )
}
