'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useProgressStore } from '@/store/useProgressStore'
import { CheckCircle, Circle } from 'lucide-react'

export default function ProgressTracker() {
    const { modules, getProgress } = useProgressStore()
    const progress = getProgress()

    const moduleCount = 8
    const completedModules = Object.values(modules).filter(m => m.completed).length

    return (
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 space-y-4" role="region" aria-label="Course Progress">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Your Progress</h3>
                <span className="text-2xl font-black text-emerald-400" aria-live="polite">
                    {progress}%
                </span>
            </div>

            <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Course completion: ${progress}%`}
                />
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400">
                <span>{completedModules} of {moduleCount} modules completed</span>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2">
                {Array.from({ length: moduleCount }, (_, i) => i + 1).map(num => {
                    const isCompleted = modules[num]?.completed
                    return (
                        <div
                            key={num}
                            className={`flex items-center justify-center gap-1 p-2 rounded-lg transition-colors ${isCompleted ? 'bg-emerald-600/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                                }`}
                            title={`Module ${num}: ${isCompleted ? 'Completed' : 'Not completed'}`}
                        >
                            {isCompleted ? <CheckCircle size={16} /> : <Circle size={16} />}
                            <span className="text-xs font-bold">{num}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
