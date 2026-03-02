'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, BookOpen } from 'lucide-react'
import Link from 'next/link'

interface SearchResult {
    title: string
    module: number
    topic: string
    excerpt: string
    url: string
}

const searchableContent: SearchResult[] = [
    { title: 'Classical vs Quantum', module: 1, topic: 'Think Quantum', excerpt: 'Classical bit vs quantum qubit, superposition basics', url: '/modules/1' },
    { title: 'What is a Qubit?', module: 1, topic: 'Think Quantum', excerpt: 'State vector, probability amplitudes, Bloch sphere', url: '/modules/1' },
    { title: 'Understanding Superposition', module: 2, topic: 'Superposition', excerpt: 'Wave-particle duality, measurement collapse', url: '/modules/2' },
    { title: 'Law of Large Numbers', module: 2, topic: 'Superposition', excerpt: 'Statistical probability, Monte Carlo simulation', url: '/modules/2' },
    { title: 'Pauli Gates (X, Y, Z)', module: 3, topic: 'Quantum Gates', excerpt: 'Quantum NOT gate, rotations, gate matrices', url: '/modules/3' },
    { title: 'Hadamard Gate', module: 3, topic: 'Quantum Gates', excerpt: 'Creating superposition, 50/50 probability', url: '/modules/3' },
    { title: 'Bell State', module: 4, topic: 'Entanglement', excerpt: 'Quantum entanglement, spooky action at a distance', url: '/modules/4' },
    { title: 'Multi-Qubit Gates', module: 5, topic: 'Quantum Circuits', excerpt: 'CNOT gate, controlled operations, circuit building', url: '/modules/5' },
    { title: 'Quantum Teleportation', module: 5, topic: 'Quantum Circuits', excerpt: 'Teleporting quantum states using entanglement', url: '/modules/5' },
]

export default function SearchModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
                setIsOpen(true)
            }
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false)
                setQuery('')
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen])

    const results = useMemo(() => {
        if (!query.trim()) return []

        const lowerQuery = query.toLowerCase()
        return searchableContent.filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            item.topic.toLowerCase().includes(lowerQuery) ||
            item.excerpt.toLowerCase().includes(lowerQuery)
        )
    }, [query])

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-6 right-6 z-40 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-all flex items-center gap-3 shadow-lg"
                aria-label="Search content (Ctrl+K)"
            >
                <Search size={20} aria-hidden="true" />
                <span className="hidden md:inline">Search</span>
                <kbd className="hidden md:inline px-2 py-1 bg-slate-900 border border-slate-600 rounded text-xs">
                    Ctrl+K
                </kbd>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                            onClick={() => {
                                setIsOpen(false)
                                setQuery('')
                            }}
                            aria-hidden="true"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="fixed top-20 left-1/2 -translate-x-1/2 w-[95%] md:w-full md:max-w-2xl bg-slate-900 rounded-2xl border-2 border-indigo-500/30 shadow-2xl z-50 overflow-hidden"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="search-title"
                        >
                            <div className="flex items-center gap-4 p-4 border-b border-slate-800">
                                <Search size={24} className="text-slate-400" aria-hidden="true" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search topics, concepts, gates..."
                                    className="flex-1 bg-transparent text-white text-lg outline-none placeholder:text-slate-500"
                                    autoFocus
                                    aria-label="Search input"
                                />
                                <button
                                    onClick={() => {
                                        setIsOpen(false)
                                        setQuery('')
                                    }}
                                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                                    aria-label="Close search"
                                >
                                    <X size={20} aria-hidden="true" />
                                </button>
                            </div>

                            <div className="max-h-[60vh] overflow-y-auto">
                                {query.trim() === '' ? (
                                    <div className="p-8 text-center text-slate-400">
                                        <BookOpen size={48} className="mx-auto mb-4 opacity-50" aria-hidden="true" />
                                        <p className="text-lg">Start typing to search...</p>
                                        <p className="text-sm mt-2">Search for topics, concepts, or quantum gates</p>
                                    </div>
                                ) : results.length === 0 ? (
                                    <div className="p-8 text-center text-slate-400">
                                        <p className="text-lg">No results found for "{query}"</p>
                                        <p className="text-sm mt-2">Try different keywords</p>
                                    </div>
                                ) : (
                                    <div className="p-2">
                                        {results.map((result, idx) => (
                                            <Link
                                                key={idx}
                                                href={result.url}
                                                onClick={() => {
                                                    setIsOpen(false)
                                                    setQuery('')
                                                }}
                                                className="block p-4 hover:bg-slate-800 rounded-xl transition-colors group"
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                                                            {result.title}
                                                        </h3>
                                                        <p className="text-sm text-slate-400 mt-1">{result.excerpt}</p>
                                                    </div>
                                                    <div className="shrink-0 px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-lg text-sm font-bold">
                                                        Module {result.module}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="p-4 border-t border-slate-800 bg-slate-950/50 text-center text-sm text-slate-400">
                                Press <kbd className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-white font-mono mx-1">↑</kbd>
                                <kbd className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-white font-mono mx-1">↓</kbd> to navigate,
                                <kbd className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-white font-mono mx-1">Enter</kbd> to select
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
