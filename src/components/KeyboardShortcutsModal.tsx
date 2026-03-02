'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Keyboard } from 'lucide-react'

interface Shortcut {
    keys: string[]
    description: string
    category: string
}

const shortcuts: Shortcut[] = [
    { keys: ['Tab'], description: 'Navigate between interactive elements', category: 'Navigation' },
    { keys: ['Shift', 'Tab'], description: 'Navigate backwards', category: 'Navigation' },
    { keys: ['Enter'], description: 'Activate focused element', category: 'Navigation' },
    { keys: ['Escape'], description: 'Close modals and dialogs', category: 'Navigation' },
    { keys: ['Ctrl', 'Z'], description: 'Undo last circuit action', category: 'Circuit Builder' },
    { keys: ['Ctrl', 'Y'], description: 'Redo circuit action', category: 'Circuit Builder' },
    { keys: ['H'], description: 'Apply Hadamard gate (when focused)', category: 'Circuit Builder' },
    { keys: ['X'], description: 'Apply Pauli-X gate (when focused)', category: 'Circuit Builder' },
    { keys: ['M'], description: 'Measure quantum state (when focused)', category: 'Circuit Builder' },
    { keys: ['R'], description: 'Reset circuit (when focused)', category: 'Circuit Builder' },
    { keys: ['?'], description: 'Show this help dialog', category: 'General' },
]

export default function KeyboardShortcutsModal() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '?' && !e.ctrlKey && !e.altKey && !e.metaKey) {
                e.preventDefault()
                setIsOpen(true)
            }
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen])

    const categories = Array.from(new Set(shortcuts.map(s => s.category)))

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 left-6 z-40 p-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-2xl transition-all hover:scale-110"
                aria-label="Show keyboard shortcuts"
                title="Keyboard shortcuts (?)"
            >
                <Keyboard size={24} aria-hidden="true" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                            onClick={() => setIsOpen(false)}
                            aria-hidden="true"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl max-h-[90vh] bg-slate-900 rounded-3xl border-2 border-indigo-500/30 shadow-2xl z-50 overflow-hidden flex flex-col"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="shortcuts-title"
                        >
                            <div className="flex justify-between items-center p-6 md:p-8 border-b border-slate-800">
                                <h2 id="shortcuts-title" className="text-3xl md:text-4xl font-black text-white flex items-center gap-4">
                                    <Keyboard size={32} className="text-indigo-400" aria-hidden="true" />
                                    Keyboard Shortcuts
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-slate-800 rounded-xl transition-colors"
                                    aria-label="Close dialog"
                                >
                                    <X size={28} aria-hidden="true" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                                {categories.map(category => (
                                    <div key={category}>
                                        <h3 className="text-xl md:text-2xl font-bold text-indigo-400 mb-4 border-b border-slate-800 pb-2">
                                            {category}
                                        </h3>
                                        <div className="space-y-3">
                                            {shortcuts
                                                .filter(s => s.category === category)
                                                .map((shortcut, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors"
                                                    >
                                                        <span className="text-slate-300 text-base md:text-lg">
                                                            {shortcut.description}
                                                        </span>
                                                        <div className="flex gap-2 flex-wrap">
                                                            {shortcut.keys.map((key, keyIdx) => (
                                                                <React.Fragment key={keyIdx}>
                                                                    <kbd className="px-3 py-2 bg-slate-950 border-2 border-slate-700 rounded-lg text-white font-mono text-sm md:text-base font-bold shadow-lg min-w-[3rem] text-center">
                                                                        {key}
                                                                    </kbd>
                                                                    {keyIdx < shortcut.keys.length - 1 && (
                                                                        <span className="text-slate-500 text-xl font-bold self-center">+</span>
                                                                    )}
                                                                </React.Fragment>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-6 md:p-8 border-t border-slate-800 bg-slate-950/50">
                                <p className="text-slate-400 text-center text-sm md:text-base">
                                    Press <kbd className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-white font-mono mx-1">?</kbd> anytime to show this dialog
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
