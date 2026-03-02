'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Search, X } from 'lucide-react'

interface GlossaryTerm {
    term: string
    definition: string
    category: string
    relatedTerms?: string[]
}

const glossaryTerms: GlossaryTerm[] = [
    { term: 'Qubit', definition: 'A quantum bit - the basic unit of quantum information that can exist in superposition of |0⟩ and |1⟩ states.', category: 'Basics' },
    { term: 'Superposition', definition: 'The ability of a quantum system to exist in multiple states simultaneously until measured.', category: 'Basics', relatedTerms: ['Qubit', 'Measurement'] },
    { term: 'Entanglement', definition: 'A quantum phenomenon where two or more qubits become correlated such that the state of one instantly affects the others.', category: 'Basics', relatedTerms: ['Bell State', 'CNOT'] },
    { term: 'Measurement', definition: 'The act of observing a quantum state, which causes it to collapse from superposition to a definite classical state.', category: 'Basics', relatedTerms: ['Superposition', 'Collapse'] },
    { term: 'Hadamard Gate (H)', definition: 'A quantum gate that creates an equal superposition. Transforms |0⟩ to (|0⟩+|1⟩)/√2 and |1⟩ to (|0⟩-|1⟩)/√2.', category: 'Gates', relatedTerms: ['Superposition'] },
    { term: 'Pauli-X Gate', definition: 'The quantum NOT gate. Flips |0⟩ to |1⟩ and vice versa. Equivalent to a classical NOT operation.', category: 'Gates' },
    { term: 'Pauli-Y Gate', definition: 'A quantum gate that rotates the qubit state around the Y-axis of the Bloch sphere by π radians.', category: 'Gates' },
    { term: 'Pauli-Z Gate', definition: 'A phase flip gate that leaves |0⟩ unchanged but flips the phase of |1⟩ to -|1⟩.', category: 'Gates' },
    { term: 'CNOT Gate', definition: 'Controlled-NOT gate. A two-qubit gate that flips the target qubit if the control qubit is |1⟩.', category: 'Gates', relatedTerms: ['Entanglement'] },
    { term: 'Bloch Sphere', definition: 'A geometric representation of a qubit state as a point on a unit sphere, where the north pole is |0⟩ and south pole is |1⟩.', category: 'Visualization' },
    { term: 'Bell State', definition: 'One of four maximally entangled two-qubit states. The most common is |Φ+⟩ = (|00⟩+|11⟩)/√2.', category: 'Advanced', relatedTerms: ['Entanglement'] },
    { term: 'Quantum Circuit', definition: 'A sequence of quantum gates applied to qubits, read from left to right, representing a quantum algorithm.', category: 'Advanced' },
    { term: 'Amplitude', definition: 'A complex number coefficient in a quantum state that determines the probability of measuring a particular outcome.', category: 'Math', relatedTerms: ['Probability'] },
    { term: 'Probability', definition: 'The likelihood of measuring a particular state, calculated as the square of the amplitude magnitude: P = |α|².', category: 'Math', relatedTerms: ['Amplitude'] },
    { term: 'Collapse', definition: 'The process by which a quantum superposition reduces to a single definite state upon measurement.', category: 'Basics', relatedTerms: ['Measurement', 'Superposition'] },
]

export default function Glossary() {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('All')

    const categories = ['All', ...Array.from(new Set(glossaryTerms.map(t => t.category)))]

    const filteredTerms = useMemo(() => {
        let terms = glossaryTerms

        if (selectedCategory !== 'All') {
            terms = terms.filter(t => t.category === selectedCategory)
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            terms = terms.filter(t =>
                t.term.toLowerCase().includes(query) ||
                t.definition.toLowerCase().includes(query)
            )
        }

        return terms.sort((a, b) => a.term.localeCompare(b.term))
    }, [searchQuery, selectedCategory])

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 left-6 z-40 p-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl transition-all hover:scale-110"
                aria-label="Open glossary"
                title="Glossary of terms"
            >
                <BookOpen size={24} aria-hidden="true" />
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
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            className="fixed inset-y-0 left-0 w-full md:w-[600px] bg-slate-900 border-r-2 border-indigo-500/30 shadow-2xl z-50 flex flex-col"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="glossary-title"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-slate-800">
                                <h2 id="glossary-title" className="text-3xl font-black text-white flex items-center gap-3">
                                    <BookOpen size={32} className="text-emerald-400" aria-hidden="true" />
                                    Glossary
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-slate-800 rounded-xl transition-colors"
                                    aria-label="Close glossary"
                                >
                                    <X size={28} aria-hidden="true" />
                                </button>
                            </div>

                            <div className="p-6 border-b border-slate-800 space-y-4">
                                <div className="relative">
                                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search terms..."
                                        className="w-full pl-12 pr-4 py-3 bg-slate-800 text-white rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
                                        aria-label="Search glossary terms"
                                    />
                                </div>

                                <div className="flex gap-2 flex-wrap">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-4 py-2 rounded-lg font-bold transition-all ${selectedCategory === cat
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                                }`}
                                            aria-pressed={selectedCategory === cat}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {filteredTerms.length === 0 ? (
                                    <div className="text-center text-slate-400 py-12">
                                        <p className="text-lg">No terms found</p>
                                        <p className="text-sm mt-2">Try a different search or category</p>
                                    </div>
                                ) : (
                                    filteredTerms.map((item, idx) => (
                                        <motion.div
                                            key={item.term}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors"
                                        >
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <h3 className="text-xl font-bold text-white">{item.term}</h3>
                                                <span className="shrink-0 px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-lg text-xs font-bold">
                                                    {item.category}
                                                </span>
                                            </div>
                                            <p className="text-slate-300 leading-relaxed">{item.definition}</p>
                                            {item.relatedTerms && item.relatedTerms.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    <span className="text-sm text-slate-500">Related:</span>
                                                    {item.relatedTerms.map(related => (
                                                        <button
                                                            key={related}
                                                            onClick={() => setSearchQuery(related)}
                                                            className="text-sm px-2 py-1 bg-slate-900 text-emerald-400 rounded hover:bg-slate-950 transition-colors"
                                                        >
                                                            {related}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    ))
                                )}
                            </div>

                            <div className="p-6 border-t border-slate-800 bg-slate-950/50 text-center text-sm text-slate-400">
                                {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''} found
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
