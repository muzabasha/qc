'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import { ChevronDown, ChevronUp, BookOpen, Lightbulb, FlaskConical, GraduationCap, ArrowRight, Cpu, Zap, CheckCircle, Eye, Brain, Target, BarChart3, Shuffle, Play, RotateCcw } from 'lucide-react'

/* ─── types ─── */
interface Comparison {
    classical: { approach: string; complexity: string; limitation: string }
    quantum: { approach: string; complexity: string; advantage: string }
}

interface Experiment {
    label: string
    description: string
    type: 'slider' | 'toggle' | 'select' | 'button'
    options?: string[]
    min?: number; max?: number; defaultVal?: number
    resultFn: (val: number | string) => string
}

interface Step {
    title: string
    description: string
    equation?: string
    terms?: { symbol: string; meaning: string }[]
    illustration: React.ReactNode
    interpretation: string
    nepNote: string
    comparison: Comparison
    experiment: Experiment
}

interface DemoTopic {
    id: string; number: number; title: string; subtitle: string
    color: string; icon: React.ReactNode; problemStatement: string
    steps: Step[]; finalOutput: string; recommendation: string
}

/* ─── colour helper ─── */
const C: Record<string, { bg: string; border: string; text: string; ring: string; gradient: string }> = {
    blue: { bg: 'bg-blue-600/20', border: 'border-blue-500', text: 'text-blue-400', ring: 'ring-blue-500', gradient: 'from-blue-900/40 to-slate-900' },
    red: { bg: 'bg-red-600/20', border: 'border-red-500', text: 'text-red-400', ring: 'ring-red-500', gradient: 'from-red-900/40 to-slate-900' },
    purple: { bg: 'bg-purple-600/20', border: 'border-purple-500', text: 'text-purple-400', ring: 'ring-purple-500', gradient: 'from-purple-900/40 to-slate-900' },
    emerald: { bg: 'bg-emerald-600/20', border: 'border-emerald-500', text: 'text-emerald-400', ring: 'ring-emerald-500', gradient: 'from-emerald-900/40 to-slate-900' },
    amber: { bg: 'bg-amber-600/20', border: 'border-amber-500', text: 'text-amber-400', ring: 'ring-amber-500', gradient: 'from-amber-900/40 to-slate-900' },
    indigo: { bg: 'bg-indigo-600/20', border: 'border-indigo-500', text: 'text-indigo-400', ring: 'ring-indigo-500', gradient: 'from-indigo-900/40 to-slate-900' },
}


/* ═══════════════════════════════════════════════════
   TOPIC 1 — Quantum Algorithms (Grover's Search)
   ═══════════════════════════════════════════════════ */
const topic1: DemoTopic = {
    id: 'algorithms', number: 1, title: 'Quantum Algorithms',
    subtitle: "Grover's Search — Finding a needle in a quantum haystack",
    color: 'blue', icon: <Cpu size={28} />,
    problemStatement: 'Given an unsorted database of N items, find the target item. Classical search requires O(N) queries. Grover\'s algorithm achieves O(√N) — a quadratic speedup.',
    steps: [
        {
            title: 'Step 1 — Initialise Equal Superposition',
            description: 'Apply Hadamard gates to all n qubits so every basis state has equal amplitude.',
            equation: '|s\\rangle = H^{\\otimes n}|0\\rangle^{\\otimes n} = \\frac{1}{\\sqrt{N}}\\sum_{x=0}^{N-1}|x\\rangle',
            terms: [
                { symbol: 'H^{\\otimes n}', meaning: 'Hadamard gate applied to each of the n qubits in parallel' },
                { symbol: 'N = 2^n', meaning: 'Total number of items in the search space' },
                { symbol: '\\frac{1}{\\sqrt{N}}', meaning: 'Equal probability amplitude for every state' },
            ],
            illustration: (
                <div className="flex items-center gap-4 flex-wrap justify-center">
                    {['|00⟩', '|01⟩', '|10⟩', '|11⟩'].map((s, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                            <div className="w-16 h-16 bg-blue-500/30 border-2 border-blue-400 rounded-xl flex items-center justify-center text-blue-300 font-mono text-sm">{s}</div>
                            <div className="text-xs text-slate-400">25%</div>
                        </div>
                    ))}
                </div>
            ),
            interpretation: 'Every item has equal 1/N probability. The quantum computer "looks at all items simultaneously" through superposition.',
            nepNote: 'NEP 2020 — Experiential Learning: Run on IBM Quantum to observe equal-probability histograms.',
            comparison: {
                classical: { approach: 'Start checking items one by one from index 0', complexity: 'O(1) — just begin the loop', limitation: 'No parallelism — only one item examined at a time' },
                quantum: { approach: 'Create superposition of ALL N states in one step', complexity: 'O(log N) — just n Hadamard gates', advantage: 'All N items are represented simultaneously in quantum amplitudes' },
            },
            experiment: {
                label: 'Number of Qubits (n)',
                description: 'Change the number of qubits to see how the search space grows exponentially.',
                type: 'slider', min: 1, max: 6, defaultVal: 2,
                resultFn: (v) => { const n = Number(v); const N = Math.pow(2, n); return `n=${n} qubits → N=${N} items in superposition. Each has probability ${(100 / N).toFixed(1)}%. Classical would need up to ${N} checks; Grover needs ~${Math.ceil(Math.PI / 4 * Math.sqrt(N))} iterations.` },
            },
        },

        {
            title: 'Step 2 — Oracle Marks the Target',
            description: 'The oracle flips the phase of the target state |ω⟩ while leaving all other states unchanged.',
            equation: 'U_\\omega|x\\rangle = \\begin{cases} -|x\\rangle & x = \\omega \\\\ |x\\rangle & \\text{otherwise} \\end{cases}',
            terms: [
                { symbol: 'U_\\omega', meaning: 'Oracle operator — a "black box" that recognises the target' },
                { symbol: '-|x\\rangle', meaning: 'Phase flip — amplitude becomes negative (invisible to measurement alone)' },
            ],
            illustration: (
                <div className="flex items-center gap-4 flex-wrap justify-center">
                    {['|00⟩', '|01⟩', '|10⟩', '|11⟩'].map((s, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                            <div className={`w-16 h-16 ${i === 2 ? 'bg-red-500/40 border-red-400 text-red-300' : 'bg-blue-500/30 border-blue-400 text-blue-300'} border-2 rounded-xl flex items-center justify-center font-mono text-sm`}>{i === 2 ? '-|10⟩' : s}</div>
                            <div className="text-xs text-slate-400">{i === 2 ? '−25%' : '+25%'}</div>
                        </div>
                    ))}
                </div>
            ),
            interpretation: 'The target |10⟩ now has negative amplitude. This phase difference is the "tag" that the diffusion operator will amplify.',
            nepNote: 'NEP 2020 — Critical Thinking: Design your own oracle for different targets and observe the phase flip.',
            comparison: {
                classical: { approach: 'Check if current item matches target — if yes, return it', complexity: 'O(1) per check, but must repeat N/2 times on average', limitation: 'Each check examines only ONE item' },
                quantum: { approach: 'Oracle marks the target via phase flip across ALL states simultaneously', complexity: 'O(1) — single oracle call processes all N states', advantage: 'Quantum parallelism: one oracle call "checks" all items at once' },
            },
            experiment: {
                label: 'Target State',
                description: 'Choose which state the oracle should mark. Observe how only that state gets a phase flip.',
                type: 'select', options: ['|00⟩', '|01⟩', '|10⟩', '|11⟩'],
                resultFn: (v) => `Oracle marks ${v} with phase flip (−1). All other states remain unchanged (+1). After diffusion, ${v} will be amplified to ~50% probability after 1 iteration.`,
            },
        },

        {
            title: 'Step 3 — Diffusion (Amplitude Amplification)',
            description: 'Reflect all amplitudes about the mean, boosting the marked state and suppressing others.',
            equation: 'D = 2|s\\rangle\\langle s| - I',
            terms: [
                { symbol: 'D', meaning: 'Diffusion operator (Grover diffuser)' },
                { symbol: '2|s\\rangle\\langle s| - I', meaning: 'Inversion about the mean amplitude' },
            ],
            illustration: (
                <div className="space-y-3">
                    <div className="flex items-end gap-4 justify-center h-32">
                        {[0.25, 0.25, 0.75, 0.25].map((h, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <div className={`w-14 ${i === 2 ? 'bg-emerald-500' : 'bg-slate-600'} rounded-t-lg`} style={{ height: `${h * 120}px` }}></div>
                                <div className="text-xs text-slate-400 font-mono">{['|00⟩', '|01⟩', '|10⟩', '|11⟩'][i]}</div>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-sm text-emerald-400">After 1 iteration: target amplitude boosted</p>
                </div>
            ),
            interpretation: 'The diffusion operator "inverts about the mean". The target (negative amplitude, below mean) gets reflected to a large positive value. Non-targets shrink.',
            nepNote: 'NEP 2020 — Learn by Doing: Plot amplitude bar charts after each iteration to visualise amplification.',
            comparison: {
                classical: { approach: 'No amplification concept — just move to next item in the list', complexity: 'O(1) per step, total O(N)', limitation: 'Cannot boost probability of finding the answer faster' },
                quantum: { approach: 'Amplitude amplification — constructive interference on target, destructive on others', complexity: 'Each iteration increases target probability by ~O(1/√N)', advantage: 'Quantum interference is a computational resource with no classical analogue' },
            },
            experiment: {
                label: 'Number of Iterations',
                description: 'Adjust the number of Grover iterations. Too few = low probability. Too many = probability decreases again!',
                type: 'slider', min: 0, max: 8, defaultVal: 1,
                resultFn: (v) => { const k = Number(v); const N = 4; const theta = Math.asin(1 / Math.sqrt(N)); const prob = Math.pow(Math.sin((2 * k + 1) * theta), 2); return `After ${k} iteration(s): Target probability = ${(prob * 100).toFixed(1)}%. Optimal for N=4 is k=1 (probability ~100%). Notice: at k=4 the probability drops back — this is "over-rotation".` },
            },
        },

        {
            title: 'Step 4 — Measure & Obtain Result',
            description: 'Measure all qubits. The target state is returned with high probability.',
            equation: 'k_{\\text{opt}} = \\left\\lfloor \\frac{\\pi}{4}\\sqrt{N} \\right\\rfloor',
            terms: [
                { symbol: 'k_{\\text{opt}}', meaning: 'Optimal number of Grover iterations' },
                { symbol: '\\sqrt{N}', meaning: 'Square root of database size — source of quadratic speedup' },
            ],
            illustration: (
                <div className="flex items-end gap-4 justify-center h-32">
                    {[0.02, 0.02, 0.98, 0.02].map((h, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                            <div className={`w-14 ${i === 2 ? 'bg-emerald-500' : 'bg-slate-700'} rounded-t-lg`} style={{ height: `${h * 120}px` }}></div>
                            <div className="text-xs text-slate-400 font-mono">{['|00⟩', '|01⟩', '|10⟩', '|11⟩'][i]}</div>
                        </div>
                    ))}
                </div>
            ),
            interpretation: 'After optimal iterations, measuring returns the target with near-certainty. For N=1,000,000 items, only ~785 iterations needed instead of 500,000 classical checks.',
            nepNote: 'NEP 2020 — Research & Innovation: Benchmark Grover\'s on IBM Quantum for different N values and plot √N scaling.',
            comparison: {
                classical: { approach: 'Return the item found after sequential search', complexity: 'Average O(N/2) comparisons', limitation: 'Linear scaling — doubling N doubles the search time' },
                quantum: { approach: 'Measure qubits to collapse to the target state', complexity: 'O(√N) total queries', advantage: 'Quadratic speedup — doubling N only increases time by √2' },
            },
            experiment: {
                label: 'Database Size (N)',
                description: 'See how classical vs quantum search time scales with database size.',
                type: 'slider', min: 4, max: 1000000, defaultVal: 1000,
                resultFn: (v) => { const N = Number(v); const classical = Math.floor(N / 2); const quantum = Math.ceil(Math.PI / 4 * Math.sqrt(N)); const speedup = (classical / quantum).toFixed(0); return `N=${N.toLocaleString()} items → Classical: ~${classical.toLocaleString()} checks | Quantum: ~${quantum.toLocaleString()} iterations | Speedup: ${speedup}×` },
            },
        },
    ],
    finalOutput: 'Target item found with >96% probability in O(√N) queries — quadratic speedup over classical O(N) search.',
    recommendation: 'Start with 2-qubit Grover\'s on IBM Quantum. Progress to 4-qubit, then explore QAOA for optimisation. Publish comparative benchmarks.',
}


/* ═══════════════════════════════════════════════════
   TOPIC 2 — Quantum Error Correction (3-Qubit Code)
   ═══════════════════════════════════════════════════ */
const topic2: DemoTopic = {
    id: 'error-correction', number: 2, title: 'Quantum Error Correction',
    subtitle: 'Bit-Flip Code — Protecting quantum information from noise',
    color: 'red', icon: <Target size={28} />,
    problemStatement: 'Qubits are fragile — noise can flip |0⟩ to |1⟩. The 3-qubit repetition code detects and corrects single bit-flip errors without measuring the data qubit directly.',
    steps: [
        {
            title: 'Step 1 — Encode the Logical Qubit',
            description: 'Encode |ψ⟩ = α|0⟩ + β|1⟩ into three physical qubits using CNOT gates.',
            equation: '|\\psi_L\\rangle = \\alpha|000\\rangle + \\beta|111\\rangle',
            terms: [
                { symbol: '\\alpha, \\beta', meaning: 'Complex amplitudes satisfying |α|² + |β|² = 1' },
                { symbol: '|\\psi_L\\rangle', meaning: 'Encoded logical qubit spread across 3 physical qubits' },
            ],
            illustration: (
                <div className="flex items-center gap-2 justify-center flex-wrap">
                    <div className="bg-red-500/20 border-2 border-red-400 rounded-xl px-4 py-3 text-red-300 font-mono">|ψ⟩</div>
                    <ArrowRight className="text-slate-500" size={20} />
                    <div className="flex gap-1">{['CNOT', 'CNOT'].map((g, i) => (<div key={i} className="bg-slate-700 border border-slate-500 rounded-lg px-3 py-2 text-sm font-mono text-white">{g}</div>))}</div>
                    <ArrowRight className="text-slate-500" size={20} />
                    <div className="flex gap-1">{['q₁', 'q₂', 'q₃'].map((q, i) => (<div key={i} className="bg-emerald-500/20 border-2 border-emerald-400 rounded-xl px-3 py-3 text-emerald-300 font-mono text-sm">{q}</div>))}</div>
                </div>
            ),
            interpretation: 'The single qubit is "spread" across three physical qubits. If one gets corrupted, the other two still carry the original information.',
            nepNote: 'NEP 2020 — Hands-on Lab: Build the encoding circuit in Qiskit and verify the 3-qubit entangled state.',
            comparison: {
                classical: { approach: 'Copy the bit 3 times: 0 → 000, 1 → 111', complexity: 'O(1) — trivial copy', limitation: 'Quantum No-Cloning Theorem forbids copying unknown quantum states' },
                quantum: { approach: 'Entangle 3 qubits via CNOT so they share the quantum state', complexity: 'O(1) — 2 CNOT gates', advantage: 'Preserves superposition α|000⟩+β|111⟩ — impossible classically' },
            },
            experiment: {
                label: 'Input State α',
                description: 'Set the amplitude α (β is computed as √(1−α²)). See how the encoded state changes.',
                type: 'slider', min: 0, max: 100, defaultVal: 70,
                resultFn: (v) => { const a = Number(v) / 100; const b = Math.sqrt(1 - a * a); return `α=${a.toFixed(2)}, β=${b.toFixed(2)} → Encoded: ${a.toFixed(2)}|000⟩ + ${b.toFixed(2)}|111⟩. Probability of measuring |000⟩ = ${(a * a * 100).toFixed(1)}%, |111⟩ = ${(b * b * 100).toFixed(1)}%.` },
            },
        },

        {
            title: 'Step 2 — Error Occurs (Noise)',
            description: 'A bit-flip error X acts on one of the three qubits (e.g., qubit 2).',
            equation: 'E = I \\otimes X \\otimes I',
            terms: [
                { symbol: 'X', meaning: 'Pauli-X (bit-flip) gate — flips |0⟩↔|1⟩' },
                { symbol: '\\otimes', meaning: 'Tensor product — combines operations on separate qubits' },
            ],
            illustration: (
                <div className="flex items-center gap-3 justify-center flex-wrap">
                    {['q₁ ✓', 'q₂ ✗', 'q₃ ✓'].map((q, i) => (
                        <div key={i} className={`${i === 1 ? 'bg-red-500/30 border-red-400 text-red-300' : 'bg-emerald-500/20 border-emerald-400 text-emerald-300'} border-2 rounded-xl px-4 py-3 font-mono text-sm`}>{q}</div>
                    ))}
                </div>
            ),
            interpretation: 'Qubit 2 has been flipped. The encoded state becomes α|010⟩ + β|101⟩. We must detect which qubit was corrupted without measuring the data.',
            nepNote: 'NEP 2020 — Problem Solving: Inject errors on different qubits and predict the corrupted state before running the circuit.',
            comparison: {
                classical: { approach: 'Compare the 3 copies: majority vote (e.g., 010 → bit 2 is wrong)', complexity: 'O(1) — simple comparison', limitation: 'Works only for classical bits; destroys quantum superposition if measured' },
                quantum: { approach: 'Use ancilla qubits to measure parity without disturbing the data', complexity: 'O(1) — 2 CNOT + 2 ancilla measurements', advantage: 'Detects error location without collapsing the quantum state' },
            },
            experiment: {
                label: 'Error Location',
                description: 'Choose which qubit gets the bit-flip error. See how the corrupted state changes.',
                type: 'select', options: ['No Error', 'Qubit 1', 'Qubit 2', 'Qubit 3'],
                resultFn: (v) => { const map: Record<string, string> = { 'No Error': 'α|000⟩+β|111⟩ — no corruption. Syndrome: (+1,+1).', 'Qubit 1': 'α|100⟩+β|011⟩ — qubit 1 flipped. Syndrome: (−1,+1).', 'Qubit 2': 'α|010⟩+β|101⟩ — qubit 2 flipped. Syndrome: (−1,−1).', 'Qubit 3': 'α|001⟩+β|110⟩ — qubit 3 flipped. Syndrome: (+1,−1).' }; return map[String(v)] || '' },
            },
        },

        {
            title: 'Step 3 — Syndrome Measurement',
            description: 'Measure parity checks between qubit pairs using ancilla qubits to identify the error.',
            equation: 'S_1 = Z_1 Z_2, \\quad S_2 = Z_2 Z_3',
            terms: [
                { symbol: 'S_1, S_2', meaning: 'Stabiliser operators — check parity between qubit pairs' },
                { symbol: '+1', meaning: 'Parity even — qubits agree (no error between them)' },
                { symbol: '-1', meaning: 'Parity odd — qubits disagree (error detected)' },
            ],
            illustration: (
                <div className="overflow-x-auto">
                    <table className="mx-auto text-sm border-collapse">
                        <thead><tr className="border-b border-slate-600">
                            <th className="px-4 py-2 text-slate-400">Syndrome (S₁,S₂)</th>
                            <th className="px-4 py-2 text-slate-400">Error Location</th>
                            <th className="px-4 py-2 text-slate-400">Correction</th>
                        </tr></thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-slate-700"><td className="px-4 py-2 font-mono">(+1,+1)</td><td>No error</td><td className="text-emerald-400">None</td></tr>
                            <tr className="border-b border-slate-700"><td className="px-4 py-2 font-mono">(−1,+1)</td><td>Qubit 1</td><td className="text-amber-400">X on q₁</td></tr>
                            <tr className="border-b border-slate-700 bg-red-900/20"><td className="px-4 py-2 font-mono">(−1,−1)</td><td className="text-red-300">Qubit 2</td><td className="text-red-400">X on q₂</td></tr>
                            <tr><td className="px-4 py-2 font-mono">(+1,−1)</td><td>Qubit 3</td><td className="text-amber-400">X on q₃</td></tr>
                        </tbody>
                    </table>
                </div>
            ),
            interpretation: 'The syndrome (−1,−1) tells us qubit 2 is the culprit. We never measured the data qubits directly — the quantum information (α,β) is preserved.',
            nepNote: 'NEP 2020 — Analytical Thinking: Derive the syndrome table yourself and verify it matches simulation results.',
            comparison: {
                classical: { approach: 'Directly read all 3 bits and do majority vote', complexity: 'O(1)', limitation: 'Reading destroys quantum information — measurement collapses superposition' },
                quantum: { approach: 'Indirect parity measurement via ancilla qubits', complexity: 'O(1) — but requires 2 extra ancilla qubits', advantage: 'Error detected without disturbing the encoded quantum state' },
            },
            experiment: {
                label: 'Syndrome Pair',
                description: 'Enter a syndrome pair to see which error it corresponds to.',
                type: 'select', options: ['(+1,+1)', '(−1,+1)', '(−1,−1)', '(+1,−1)'],
                resultFn: (v) => { const map: Record<string, string> = { '(+1,+1)': 'No error detected. State is clean — no correction needed.', '(−1,+1)': 'Error on Qubit 1. Apply X gate to q₁ to correct.', '(−1,−1)': 'Error on Qubit 2. Apply X gate to q₂ to correct.', '(+1,−1)': 'Error on Qubit 3. Apply X gate to q₃ to correct.' }; return map[String(v)] || '' },
            },
        },

        {
            title: 'Step 4 — Apply Correction & Decode',
            description: 'Apply X gate to the identified qubit to correct the error, then decode back to a single qubit.',
            equation: '|\\psi_{\\text{corrected}}\\rangle = (I \\otimes X \\otimes I)(\\alpha|010\\rangle + \\beta|101\\rangle) = \\alpha|000\\rangle + \\beta|111\\rangle',
            terms: [
                { symbol: 'X', meaning: 'Correction gate — flips the corrupted qubit back' },
                { symbol: '|\\psi_{\\text{corrected}}\\rangle', meaning: 'Restored logical qubit — identical to original encoding' },
            ],
            illustration: (
                <div className="flex items-center gap-3 justify-center flex-wrap">
                    <div className="flex gap-1">{['q₁ ✓', 'q₂ ✗', 'q₃ ✓'].map((q, i) => (<div key={i} className={`${i === 1 ? 'bg-red-500/30 border-red-400 text-red-300' : 'bg-slate-700 border-slate-500 text-slate-300'} border-2 rounded-lg px-3 py-2 font-mono text-xs`}>{q}</div>))}</div>
                    <ArrowRight className="text-amber-400" size={20} />
                    <div className="bg-amber-500/20 border-2 border-amber-400 rounded-lg px-3 py-2 text-amber-300 font-mono text-sm">X on q₂</div>
                    <ArrowRight className="text-emerald-400" size={20} />
                    <div className="flex gap-1">{['q₁ ✓', 'q₂ ✓', 'q₃ ✓'].map((q, i) => (<div key={i} className="bg-emerald-500/20 border-2 border-emerald-400 rounded-lg px-3 py-2 text-emerald-300 font-mono text-xs">{q}</div>))}</div>
                </div>
            ),
            interpretation: 'The error is corrected and the original quantum state α|0⟩+β|1⟩ is perfectly recovered. This is the foundation of fault-tolerant quantum computing.',
            nepNote: 'NEP 2020 — Project-Based Learning: Implement the full encode→error→syndrome→correct pipeline and present results.',
            comparison: {
                classical: { approach: 'Majority vote: replace corrupted bit with majority value', complexity: 'O(1)', limitation: 'Only works for classical bits; cannot handle phase errors' },
                quantum: { approach: 'Apply targeted X gate based on syndrome, then reverse CNOT to decode', complexity: 'O(1)', advantage: 'Corrects errors while preserving quantum superposition and entanglement' },
            },
            experiment: {
                label: 'Error Rate (%)',
                description: 'Set the probability of a bit-flip error per qubit. See how the code performs.',
                type: 'slider', min: 0, max: 50, defaultVal: 10,
                resultFn: (v) => { const p = Number(v) / 100; const uncoded = 1 - p; const coded = Math.pow(1 - p, 3) + 3 * p * Math.pow(1 - p, 2); return `Error rate p=${(p * 100).toFixed(0)}% → Uncoded fidelity: ${(uncoded * 100).toFixed(1)}% | 3-qubit code fidelity: ${(coded * 100).toFixed(1)}% | Improvement: ${((coded - uncoded) * 100).toFixed(1)} percentage points. Code helps when p < 50%.` },
            },
        },
    ],
    finalOutput: 'Single bit-flip error detected and corrected. Logical qubit |ψ⟩ = α|0⟩+β|1⟩ restored with 100% fidelity for single-error scenarios.',
    recommendation: 'Start with 3-qubit bit-flip code, progress to Shor\'s 9-qubit code, then surface codes for scalable fault tolerance.',
}


/* ═══════════════════════════════════════════════════
   TOPIC 3 — Quantum Machine Learning (VQC)
   ═══════════════════════════════════════════════════ */
const topic3: DemoTopic = {
    id: 'machine-learning', number: 3, title: 'Quantum Machine Learning',
    subtitle: 'Variational Quantum Classifier — Quantum-enhanced pattern recognition',
    color: 'purple', icon: <Brain size={28} />,
    problemStatement: 'Classify data points into two categories using a parameterised quantum circuit. The quantum feature map encodes data into a high-dimensional Hilbert space where patterns become linearly separable.',
    steps: [
        {
            title: 'Step 1 — Encode Classical Data into Quantum State',
            description: 'Map each feature vector x⃗ into a quantum state using angle encoding on rotation gates.',
            equation: '|\\phi(\\vec{x})\\rangle = \\prod_{i=1}^{n} R_Y(x_i)|0\\rangle^{\\otimes n}',
            terms: [
                { symbol: 'R_Y(x_i)', meaning: 'Rotation around Y-axis by angle xᵢ — encodes feature i into qubit i' },
                { symbol: '\\vec{x}', meaning: 'Classical feature vector (e.g., petal length, width)' },
            ],
            illustration: (
                <div className="flex items-center gap-3 justify-center flex-wrap">
                    <div className="bg-purple-500/20 border-2 border-purple-400 rounded-xl px-4 py-3 text-purple-300 font-mono text-sm">x⃗=[0.8,1.2]</div>
                    <ArrowRight className="text-slate-500" size={20} />
                    <div className="flex gap-1"><div className="bg-slate-700 border border-slate-500 rounded-lg px-3 py-2 text-sm font-mono text-white">Ry(0.8)</div><div className="bg-slate-700 border border-slate-500 rounded-lg px-3 py-2 text-sm font-mono text-white">Ry(1.2)</div></div>
                    <ArrowRight className="text-slate-500" size={20} />
                    <div className="bg-indigo-500/20 border-2 border-indigo-400 rounded-xl px-4 py-3 text-indigo-300 font-mono text-sm">|φ(x⃗)⟩</div>
                </div>
            ),
            interpretation: 'Classical data is "uploaded" into the quantum computer. Each feature becomes a rotation angle, mapping data into an exponentially large Hilbert space.',
            nepNote: 'NEP 2020 — Multidisciplinary: Connect ML concepts (feature engineering) with quantum physics (Bloch sphere rotations).',
            comparison: {
                classical: { approach: 'Feed raw features into a neural network input layer', complexity: 'O(n) — one weight per feature', limitation: 'Feature space is the same dimensionality as input' },
                quantum: { approach: 'Encode features as rotation angles on qubits', complexity: 'O(n) gates, but state lives in 2ⁿ-dimensional Hilbert space', advantage: 'Exponentially larger feature space enables finding patterns invisible to classical ML' },
            },
            experiment: {
                label: 'Feature Value x₁',
                description: 'Adjust the first feature value. See how the qubit state changes on the Bloch sphere.',
                type: 'slider', min: 0, max: 314, defaultVal: 80,
                resultFn: (v) => { const x = Number(v) / 100; const p0 = Math.pow(Math.cos(x / 2), 2); const p1 = Math.pow(Math.sin(x / 2), 2); return `Ry(${x.toFixed(2)}) → |ψ⟩ = ${Math.cos(x / 2).toFixed(3)}|0⟩ + ${Math.sin(x / 2).toFixed(3)}|1⟩. P(|0⟩)=${(p0 * 100).toFixed(1)}%, P(|1⟩)=${(p1 * 100).toFixed(1)}%. At x=π, qubit is fully |1⟩.` },
            },
        },

        {
            title: 'Step 2 — Apply Parameterised Quantum Circuit (Ansatz)',
            description: 'Apply trainable rotation gates and entangling layers. Parameters θ⃗ are optimised during training.',
            equation: 'U(\\vec{\\theta}) = \\prod_{l=1}^{L} \\left[ W_l(\\vec{\\theta}_l) \\cdot \\text{CNOT}_{\\text{layer}} \\right]',
            terms: [
                { symbol: 'U(\\vec{\\theta})', meaning: 'Parameterised unitary — the "quantum neural network"' },
                { symbol: 'L', meaning: 'Number of layers (circuit depth) — analogous to NN depth' },
            ],
            illustration: (
                <div className="bg-slate-800 rounded-xl p-4 font-mono text-sm text-center space-y-2">
                    <div className="text-slate-400">q₀: ─ Ry(θ₁) ─ ● ─ Ry(θ₃) ─ M</div>
                    <div className="text-slate-400">q₁: ─ Ry(θ₂) ─ ⊕ ─ Ry(θ₄) ─ M</div>
                    <div className="text-purple-400 text-xs mt-2">Layer 1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Layer 2</div>
                </div>
            ),
            interpretation: 'The PQC acts like a neural network: rotation gates are "neurons" and CNOT gates create "connections". Parameters θ⃗ are learned through optimisation.',
            nepNote: 'NEP 2020 — Computational Thinking: Design different ansatz architectures and compare expressibility.',
            comparison: {
                classical: { approach: 'Stack dense layers with ReLU activations', complexity: 'O(n²) parameters per layer for n neurons', limitation: 'Fixed feature space; adding layers adds parameters linearly' },
                quantum: { approach: 'Alternate Ry rotations with CNOT entangling layers', complexity: 'O(n·L) parameters for n qubits, L layers', advantage: 'Entanglement creates correlations impossible in classical networks; exponential state space' },
            },
            experiment: {
                label: 'Circuit Depth (L)',
                description: 'Increase the number of ansatz layers. More layers = more expressive but harder to train.',
                type: 'slider', min: 1, max: 6, defaultVal: 2,
                resultFn: (v) => { const L = Number(v); const params = 2 * 2 * L; return `L=${L} layers → ${params} trainable parameters (2 qubits × 2 rotations × ${L} layers). Expressibility increases with depth, but so does training difficulty and noise sensitivity. Sweet spot is typically L=2-4.` },
            },
        },

        {
            title: 'Step 3 — Measure & Compute Loss',
            description: 'Measure the output qubit to get prediction probabilities, then compute cross-entropy loss.',
            equation: '\\mathcal{L}(\\vec{\\theta}) = -\\frac{1}{M}\\sum_{i=1}^{M}\\left[ y_i \\log(p_i) + (1-y_i)\\log(1-p_i) \\right]',
            terms: [
                { symbol: '\\mathcal{L}', meaning: 'Loss function — measures how wrong predictions are' },
                { symbol: 'p_i = |\\langle 1|\\psi_i\\rangle|^2', meaning: 'Predicted probability of class 1 from quantum measurement' },
            ],
            illustration: (
                <div className="flex items-center gap-4 justify-center flex-wrap">
                    <div className="text-center"><div className="bg-purple-500/20 border border-purple-400 rounded-lg px-4 py-2 text-purple-300 text-sm mb-1">Measure q₀</div><div className="text-xs text-slate-400">P(|0⟩)=0.3, P(|1⟩)=0.7</div></div>
                    <ArrowRight className="text-slate-500" size={20} />
                    <div className="text-center"><div className="bg-amber-500/20 border border-amber-400 rounded-lg px-4 py-2 text-amber-300 text-sm mb-1">Predict: Class 1</div><div className="text-xs text-slate-400">True: Class 1 ✓</div></div>
                    <ArrowRight className="text-slate-500" size={20} />
                    <div className="text-center"><div className="bg-emerald-500/20 border border-emerald-400 rounded-lg px-4 py-2 text-emerald-300 text-sm mb-1">Loss = 0.36</div><div className="text-xs text-slate-400">Lower is better</div></div>
                </div>
            ),
            interpretation: 'The quantum circuit outputs measurement probabilities as class predictions. The loss function quantifies prediction error — identical to classical logistic regression loss.',
            nepNote: 'NEP 2020 — Assessment: Track loss curves across training epochs and compare convergence with classical SVM.',
            comparison: {
                classical: { approach: 'Forward pass through neural network, compute softmax probabilities', complexity: 'O(n²) per sample for n-neuron layer', limitation: 'Probabilities come from deterministic computation' },
                quantum: { approach: 'Measure qubits — Born rule gives probabilities naturally', complexity: 'O(shots) — need multiple measurements for statistics', advantage: 'Probabilities are intrinsic to quantum mechanics; no softmax needed' },
            },
            experiment: {
                label: 'Prediction Probability p',
                description: 'Set the predicted probability for a Class 1 sample. See how the loss changes.',
                type: 'slider', min: 1, max: 99, defaultVal: 70,
                resultFn: (v) => { const p = Number(v) / 100; const loss = -Math.log(p); return `p=${p.toFixed(2)} → Loss = −log(${p.toFixed(2)}) = ${loss.toFixed(3)}. Perfect prediction (p=1.0) gives loss=0. Random guess (p=0.5) gives loss=0.693. Wrong prediction (p=0.01) gives loss=4.605.` },
            },
        },

        {
            title: 'Step 4 — Classical Optimiser Updates Parameters',
            description: 'Use a classical optimiser (COBYLA, Adam) to update θ⃗ and minimise the loss — the hybrid quantum-classical loop.',
            equation: '\\vec{\\theta}_{t+1} = \\vec{\\theta}_t - \\eta \\nabla_{\\vec{\\theta}} \\mathcal{L}(\\vec{\\theta}_t)',
            terms: [
                { symbol: '\\eta', meaning: 'Learning rate — controls step size' },
                { symbol: '\\nabla_{\\vec{\\theta}} \\mathcal{L}', meaning: 'Gradient computed via parameter-shift rule on quantum hardware' },
            ],
            illustration: (
                <div className="flex items-center gap-3 justify-center flex-wrap">
                    <div className="bg-blue-500/20 border-2 border-blue-400 rounded-xl px-3 py-2 text-blue-300 text-sm text-center">Quantum<br />Circuit</div>
                    <ArrowRight className="text-slate-500" size={16} />
                    <div className="bg-purple-500/20 border-2 border-purple-400 rounded-xl px-3 py-2 text-purple-300 text-sm text-center">Measure<br />Loss</div>
                    <ArrowRight className="text-slate-500" size={16} />
                    <div className="bg-amber-500/20 border-2 border-amber-400 rounded-xl px-3 py-2 text-amber-300 text-sm text-center">Classical<br />Optimiser</div>
                    <ArrowRight className="text-slate-500" size={16} />
                    <div className="bg-emerald-500/20 border-2 border-emerald-400 rounded-xl px-3 py-2 text-emerald-300 text-sm text-center">Update θ⃗</div>
                    <div className="text-slate-500 text-xl">↻</div>
                </div>
            ),
            interpretation: 'This is the hybrid quantum-classical training loop. The quantum computer evaluates the circuit; the classical computer optimises parameters. After ~50-100 iterations, the classifier converges.',
            nepNote: 'NEP 2020 — Research Aptitude: Implement the full VQC pipeline using PennyLane/Qiskit-ML on the Iris dataset.',
            comparison: {
                classical: { approach: 'Backpropagation computes gradients analytically through the network', complexity: 'O(n²) per layer — efficient chain rule', limitation: 'Gradients are exact but computation is purely classical' },
                quantum: { approach: 'Parameter-shift rule: evaluate circuit at θ±π/2 to estimate gradient', complexity: 'O(2p) circuit evaluations for p parameters', advantage: 'Gradients computed on quantum hardware capture quantum correlations; hybrid loop leverages best of both worlds' },
            },
            experiment: {
                label: 'Learning Rate η',
                description: 'Adjust the learning rate. Too high = oscillation. Too low = slow convergence.',
                type: 'slider', min: 1, max: 100, defaultVal: 10,
                resultFn: (v) => { const eta = Number(v) / 100; const iters = eta > 0.5 ? 'may diverge' : eta > 0.2 ? Math.ceil(20 / eta).toString() : Math.ceil(50 / eta).toString(); return `η=${eta.toFixed(2)} → Estimated convergence: ${iters} iterations. η=0.01: very stable but slow (~5000 iters). η=0.1: good balance (~500 iters). η>0.5: risk of oscillation/divergence.` },
            },
        },
    ],
    finalOutput: 'Trained VQC achieves 95%+ accuracy on binary classification using only 2-4 qubits, demonstrating quantum feature space advantage.',
    recommendation: 'Begin with 2-qubit VQC on Iris dataset. Progress to quantum kernels. Explore quantum GANs. Target NeurIPS QML workshop.',
}


/* ═══════════════════════════════════════════════════
   TOPIC 4 — Quantum Cryptography (BB84)
   ═══════════════════════════════════════════════════ */
const topic4: DemoTopic = {
    id: 'cryptography', number: 4, title: 'Quantum Cryptography',
    subtitle: 'BB84 Protocol — Unbreakable key distribution using quantum physics',
    color: 'emerald', icon: <Eye size={28} />,
    problemStatement: 'Alice and Bob need to share a secret key over an insecure channel. BB84 uses quantum mechanics to guarantee any eavesdropper (Eve) is detected with certainty.',
    steps: [
        {
            title: 'Step 1 — Alice Prepares Random Qubits',
            description: 'Alice randomly chooses bits (0/1) and bases (+/×) to encode each qubit.',
            equation: '|\\psi\\rangle \\in \\{|0\\rangle, |1\\rangle, |+\\rangle, |-\\rangle\\}',
            terms: [
                { symbol: '|0\\rangle, |1\\rangle', meaning: 'Rectilinear basis (+) states' },
                { symbol: '|+\\rangle = \\frac{|0\\rangle+|1\\rangle}{\\sqrt{2}}', meaning: 'Diagonal basis (×) state for bit 0' },
                { symbol: '|-\\rangle = \\frac{|0\\rangle-|1\\rangle}{\\sqrt{2}}', meaning: 'Diagonal basis (×) state for bit 1' },
            ],
            illustration: (
                <div className="overflow-x-auto"><table className="mx-auto text-sm border-collapse"><thead><tr className="border-b border-slate-600"><th className="px-3 py-2 text-slate-400">#</th><th className="px-3 py-2 text-slate-400">Bit</th><th className="px-3 py-2 text-slate-400">Basis</th><th className="px-3 py-2 text-slate-400">State</th></tr></thead><tbody className="text-slate-300">
                    <tr className="border-b border-slate-700"><td className="px-3 py-2">1</td><td>0</td><td className="text-emerald-400">+</td><td className="font-mono">|0⟩</td></tr>
                    <tr className="border-b border-slate-700"><td className="px-3 py-2">2</td><td>1</td><td className="text-purple-400">×</td><td className="font-mono">|−⟩</td></tr>
                    <tr className="border-b border-slate-700"><td className="px-3 py-2">3</td><td>1</td><td className="text-emerald-400">+</td><td className="font-mono">|1⟩</td></tr>
                    <tr><td className="px-3 py-2">4</td><td>0</td><td className="text-purple-400">×</td><td className="font-mono">|+⟩</td></tr>
                </tbody></table></div>
            ),
            interpretation: 'Alice sends qubits in randomly chosen bases. If Bob measures in the wrong basis, he gets a random result — and any eavesdropper faces the same problem.',
            nepNote: 'NEP 2020 — Experiential Learning: Simulate Alice\'s qubit preparation in Qiskit and visualise states on the Bloch sphere.',
            comparison: {
                classical: { approach: 'Alice generates random bits and sends them over a wire', complexity: 'O(n) for n bits', limitation: 'Eve can copy bits without detection — no physical law prevents it' },
                quantum: { approach: 'Alice encodes bits in random quantum bases — copying is physically impossible', complexity: 'O(n) qubit preparations', advantage: 'No-Cloning Theorem: Eve cannot copy qubits without disturbing them' },
            },
            experiment: {
                label: 'Number of Qubits Sent',
                description: 'Increase the key length. More qubits = more secure key after sifting.',
                type: 'slider', min: 4, max: 100, defaultVal: 20,
                resultFn: (v) => { const n = Number(v); const sifted = Math.floor(n / 2); const test = Math.floor(sifted / 4); const final_key = sifted - test; const detectProb = ((1 - Math.pow(0.75, test)) * 100).toFixed(2); return `${n} qubits sent → ~${sifted} survive basis sifting → ${test} used for eavesdropper detection → ${final_key} bits of secure key. Detection probability of Eve: ${detectProb}%.` },
            },
        },

        {
            title: 'Step 2 — Bob Measures in Random Bases',
            description: 'Bob independently chooses random bases. He gets correct results only when his basis matches Alice\'s.',
            equation: 'P(\\text{correct}) = \\begin{cases} 1 & \\text{basis matches} \\\\ \\frac{1}{2} & \\text{basis differs} \\end{cases}',
            terms: [
                { symbol: 'P(\\text{correct})', meaning: 'Probability Bob gets Alice\'s intended bit value' },
            ],
            illustration: (
                <div className="overflow-x-auto"><table className="mx-auto text-sm border-collapse"><thead><tr className="border-b border-slate-600"><th className="px-3 py-2 text-slate-400">#</th><th className="px-3 py-2 text-slate-400">Alice</th><th className="px-3 py-2 text-slate-400">Bob</th><th className="px-3 py-2 text-slate-400">Match?</th><th className="px-3 py-2 text-slate-400">Keep?</th></tr></thead><tbody className="text-slate-300">
                    <tr className="border-b border-slate-700 bg-emerald-900/20"><td className="px-3 py-2">1</td><td className="text-emerald-400">+</td><td className="text-emerald-400">+</td><td className="text-emerald-400">✓</td><td className="text-emerald-400">Yes</td></tr>
                    <tr className="border-b border-slate-700"><td className="px-3 py-2">2</td><td className="text-purple-400">×</td><td className="text-emerald-400">+</td><td className="text-red-400">✗</td><td className="text-red-400">Discard</td></tr>
                    <tr className="border-b border-slate-700 bg-emerald-900/20"><td className="px-3 py-2">3</td><td className="text-emerald-400">+</td><td className="text-emerald-400">+</td><td className="text-emerald-400">✓</td><td className="text-emerald-400">Yes</td></tr>
                    <tr><td className="px-3 py-2">4</td><td className="text-purple-400">×</td><td className="text-purple-400">×</td><td className="text-emerald-400">✓</td><td className="text-emerald-400">Yes</td></tr>
                </tbody></table></div>
            ),
            interpretation: 'Alice and Bob publicly compare bases (not bit values). They keep only bits where bases matched — this becomes the raw key.',
            nepNote: 'NEP 2020 — Collaborative Learning: Work in pairs as Alice and Bob, exchanging qubits via a shared Qiskit notebook.',
            comparison: {
                classical: { approach: 'Bob receives the exact bits Alice sent — no basis concept', complexity: 'O(1) per bit', limitation: 'Eve can intercept, copy, and forward without any trace' },
                quantum: { approach: 'Bob must guess the correct basis; wrong basis gives random result', complexity: '~50% of bits survive sifting', advantage: 'Basis mismatch is the security mechanism — it makes eavesdropping detectable' },
            },
            experiment: {
                label: 'Basis Match Rate',
                description: 'In theory, 50% of bases match. Adjust to see the effect on key length.',
                type: 'slider', min: 20, max: 80, defaultVal: 50,
                resultFn: (v) => { const rate = Number(v) / 100; const sent = 100; const kept = Math.floor(sent * rate); return `${sent} qubits sent, ${(rate * 100).toFixed(0)}% basis match → ${kept} raw key bits. Standard BB84: 50% match rate. Higher match = more efficient but requires basis coordination (reduces security).` },
            },
        },

        {
            title: 'Step 3 — Eavesdropper Detection',
            description: 'If Eve intercepts and measures qubits, she introduces a 25% error rate detectable by Alice and Bob.',
            equation: 'P(\\text{error}|\\text{Eve}) = \\frac{1}{4} = 25\\%',
            terms: [
                { symbol: 'P(\\text{error}|\\text{Eve})', meaning: 'Error rate introduced when Eve intercepts' },
                { symbol: '\\frac{1}{4}', meaning: 'Eve guesses wrong basis 50% of the time × wrong result 50% of those = 25%' },
            ],
            illustration: (
                <div className="space-y-3 text-center">
                    <div className="flex items-center gap-2 justify-center flex-wrap">
                        <div className="bg-emerald-500/20 border border-emerald-400 rounded-lg px-3 py-2 text-emerald-300 text-sm">Alice</div>
                        <ArrowRight className="text-slate-500" size={16} />
                        <div className="bg-red-500/20 border border-red-400 rounded-lg px-3 py-2 text-red-300 text-sm">Eve 🕵️</div>
                        <ArrowRight className="text-slate-500" size={16} />
                        <div className="bg-blue-500/20 border border-blue-400 rounded-lg px-3 py-2 text-blue-300 text-sm">Bob</div>
                    </div>
                    <p className="text-red-400 text-sm">Eve introduces 25% errors → detected by comparing random key bits</p>
                </div>
            ),
            interpretation: 'The No-Cloning Theorem prevents Eve from copying qubits. Any measurement she makes disturbs the state, leaving a detectable fingerprint.',
            nepNote: 'NEP 2020 — Ethical Reasoning: Discuss societal implications of unbreakable encryption and quantum-safe security.',
            comparison: {
                classical: { approach: 'Eve copies bits perfectly — Alice and Bob cannot detect interception', complexity: 'O(1) per bit to copy', limitation: 'No physical law prevents classical bit copying' },
                quantum: { approach: 'Eve must measure (and disturb) qubits to read them; this introduces detectable errors', complexity: '25% error rate per intercepted qubit', advantage: 'Physics guarantees detection — security based on laws of nature, not computational hardness' },
            },
            experiment: {
                label: 'Test Bits for Detection',
                description: 'Choose how many sifted key bits to sacrifice for eavesdropper detection.',
                type: 'slider', min: 1, max: 50, defaultVal: 10,
                resultFn: (v) => { const n = Number(v); const pDetect = 1 - Math.pow(0.75, n); return `${n} test bits → Eve detection probability: ${(pDetect * 100).toFixed(4)}%. With 10 bits: 94.37%. With 20 bits: 99.68%. With 30 bits: 99.98%. Trade-off: more test bits = higher security but shorter final key.` },
            },
        },

        {
            title: 'Step 4 — Key Distillation & Secure Communication',
            description: 'After error checking, perform privacy amplification to produce a shorter but perfectly secure key.',
            equation: 'K_{\\text{secure}} = f_{\\text{hash}}(K_{\\text{raw}}) \\quad |K_{\\text{secure}}| < |K_{\\text{raw}}|',
            terms: [
                { symbol: 'f_{\\text{hash}}', meaning: 'Universal hash function — compresses key to remove Eve\'s information' },
                { symbol: 'K_{\\text{secure}}', meaning: 'Final secure key — information-theoretically secure' },
            ],
            illustration: (
                <div className="flex items-center gap-3 justify-center flex-wrap">
                    <div className="bg-amber-500/20 border border-amber-400 rounded-lg px-3 py-2 text-amber-300 text-sm">Raw: 10110010</div>
                    <ArrowRight className="text-slate-500" size={16} />
                    <div className="bg-slate-700 border border-slate-500 rounded-lg px-3 py-2 text-white text-sm">Hash</div>
                    <ArrowRight className="text-slate-500" size={16} />
                    <div className="bg-emerald-500/20 border border-emerald-400 rounded-lg px-3 py-2 text-emerald-300 text-sm">Secure: 1011</div>
                </div>
            ),
            interpretation: 'The final key is provably secure — guaranteed by quantum physics, not computational assumptions. This key can encrypt messages using one-time pad for perfect secrecy.',
            nepNote: 'NEP 2020 — Innovation: Implement full BB84 in Qiskit, test with simulated eavesdropping, and measure the error rate.',
            comparison: {
                classical: { approach: 'Use Diffie-Hellman key exchange — security based on factoring/discrete log hardness', complexity: 'O(n³) for n-bit keys', limitation: 'Vulnerable to quantum computers running Shor\'s algorithm' },
                quantum: { approach: 'BB84 key distillation — security based on laws of quantum physics', complexity: 'O(n) hash computation', advantage: 'Information-theoretically secure — no computer (classical or quantum) can break it' },
            },
            experiment: {
                label: 'Raw Key Length',
                description: 'Set the raw key length. See how much survives after error correction and privacy amplification.',
                type: 'slider', min: 10, max: 200, defaultVal: 50,
                resultFn: (v) => { const raw = Number(v); const afterEC = Math.floor(raw * 0.9); const afterPA = Math.floor(afterEC * 0.5); return `Raw key: ${raw} bits → After error correction: ~${afterEC} bits → After privacy amplification: ~${afterPA} bits of perfectly secure key. Efficiency: ${((afterPA / raw) * 100).toFixed(0)}%. Longer raw keys give proportionally longer secure keys.` },
            },
        },
    ],
    finalOutput: 'Secure encryption key shared between Alice and Bob. Any eavesdropping detected with probability 1−(3/4)ⁿ where n is the number of test bits.',
    recommendation: 'Implement BB84 on Qiskit simulator, then explore E91 (entanglement-based QKD). Partner with telecom labs for fiber-optic QKD experiments.',
}


/* ═══════════════════════════════════════════════════
   TOPIC 5 — Quantum Optimization (QAOA Max-Cut)
   ═══════════════════════════════════════════════════ */
const topic5: DemoTopic = {
    id: 'optimization', number: 5, title: 'Quantum Optimization',
    subtitle: 'QAOA — Solving the Max-Cut problem on a quantum computer',
    color: 'amber', icon: <Zap size={28} />,
    problemStatement: 'Partition graph vertices into two sets to maximise edges between sets (Max-Cut). This NP-hard problem has applications in circuit design, network analysis, and logistics.',
    steps: [
        {
            title: 'Step 1 — Formulate as Ising Hamiltonian',
            description: 'Map the Max-Cut problem to a cost Hamiltonian where the ground state encodes the optimal solution.',
            equation: 'H_C = \\sum_{(i,j) \\in E} \\frac{1}{2}(1 - Z_i Z_j)',
            terms: [
                { symbol: 'H_C', meaning: 'Cost Hamiltonian — minimum eigenvalue = maximum cut' },
                { symbol: 'Z_i Z_j', meaning: '+1 if same set, −1 if different sets' },
                { symbol: '\\frac{1}{2}(1-Z_iZ_j)', meaning: 'Equals 1 when edge is cut, 0 otherwise' },
            ],
            illustration: (
                <div className="flex items-center gap-6 justify-center flex-wrap">
                    <svg width="120" height="100" viewBox="0 0 120 100" className="mx-auto">
                        <line x1="20" y1="20" x2="100" y2="20" stroke="#f59e0b" strokeWidth="2" /><line x1="20" y1="20" x2="60" y2="80" stroke="#f59e0b" strokeWidth="2" /><line x1="100" y1="20" x2="60" y2="80" stroke="#f59e0b" strokeWidth="2" />
                        <circle cx="20" cy="20" r="12" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2" /><circle cx="100" cy="20" r="12" fill="#ef4444" stroke="#f87171" strokeWidth="2" /><circle cx="60" cy="80" r="12" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2" />
                        <text x="20" y="24" textAnchor="middle" fill="white" fontSize="10">0</text><text x="100" y="24" textAnchor="middle" fill="white" fontSize="10">1</text><text x="60" y="84" textAnchor="middle" fill="white" fontSize="10">0</text>
                    </svg>
                    <div className="bg-slate-800 rounded-lg px-4 py-3 font-mono text-sm text-amber-300">H = ½(1−Z₀Z₁)+½(1−Z₁Z₂)+½(1−Z₀Z₂)</div>
                </div>
            ),
            interpretation: 'The graph problem is now a physics problem: finding the ground state of a Hamiltonian. Each qubit = vertex; |0⟩ = Set A, |1⟩ = Set B.',
            nepNote: 'NEP 2020 — Problem Mapping: Practice converting real-world problems (scheduling, routing) into QUBO format.',
            comparison: {
                classical: { approach: 'Enumerate all 2ⁿ partitions and evaluate each cut value', complexity: 'O(2ⁿ) — exponential brute force', limitation: 'Intractable for large graphs (>30 vertices)' },
                quantum: { approach: 'Encode problem in Hamiltonian; quantum circuit explores solution space', complexity: 'O(poly(n)) circuit depth per QAOA iteration', advantage: 'Explores exponentially many solutions simultaneously via superposition' },
            },
            experiment: {
                label: 'Number of Vertices',
                description: 'See how the classical brute-force cost explodes vs QAOA.',
                type: 'slider', min: 3, max: 20, defaultVal: 5,
                resultFn: (v) => { const n = Number(v); const classical = Math.pow(2, n); const edges = Math.floor(n * (n - 1) / 2); return `${n} vertices, up to ${edges} edges → Classical brute force: ${classical.toLocaleString()} partitions to check. QAOA: ~${Math.ceil(Math.sqrt(classical))} iterations with p=1. At n=20: classical needs 1,048,576 checks; QAOA needs ~1,024.` },
            },
        },

        {
            title: 'Step 2 — Prepare QAOA Ansatz',
            description: 'Alternate cost unitary (encodes problem) and mixer unitary (explores solutions) for p layers.',
            equation: '|\\vec{\\gamma},\\vec{\\beta}\\rangle = \\prod_{l=1}^{p} e^{-i\\beta_l H_M} e^{-i\\gamma_l H_C} |+\\rangle^{\\otimes n}',
            terms: [
                { symbol: 'e^{-i\\gamma_l H_C}', meaning: 'Cost unitary — applies phase proportional to cut value' },
                { symbol: 'e^{-i\\beta_l H_M}', meaning: 'Mixer unitary — explores partitions via X rotations' },
                { symbol: 'p', meaning: 'Number of QAOA layers — more = better approximation' },
            ],
            illustration: (
                <div className="bg-slate-800 rounded-xl p-4 font-mono text-xs text-center space-y-1">
                    <div className="text-slate-400">|+⟩ → [Cost γ₁] → [Mixer β₁] → [Cost γ₂] → [Mixer β₂] → Measure</div>
                    <div className="text-amber-400 text-xs mt-2">p=2 layers: 4 parameters to optimise</div>
                </div>
            ),
            interpretation: 'QAOA alternates between "encoding the problem" (cost layer) and "exploring solutions" (mixer layer). More layers give better solutions.',
            nepNote: 'NEP 2020 — Incremental Complexity: Start with p=1, observe results, then increase to p=2,3 and track improvement.',
            comparison: {
                classical: { approach: 'Greedy heuristic: add vertices to the set that maximises current cut', complexity: 'O(n²) per greedy step', limitation: 'Gets stuck in local optima — no guarantee of global optimum' },
                quantum: { approach: 'QAOA explores globally via quantum interference between cost and mixer layers', complexity: 'O(p·n) gates per evaluation', advantage: 'Provable approximation ratio ≥0.6924 for p=1; approaches optimal as p→∞' },
            },
            experiment: {
                label: 'QAOA Depth (p)',
                description: 'Increase p to see how approximation quality improves.',
                type: 'slider', min: 1, max: 10, defaultVal: 2,
                resultFn: (v) => { const p = Number(v); const ratio = Math.min(0.6924 + 0.03 * p, 0.99); const params = 2 * p; return `p=${p} → ${params} parameters. Approximation ratio ≥ ${ratio.toFixed(4)}. At p=1: ratio=0.6924 (guaranteed). At p=5: ratio≈0.84. At p→∞: ratio→1.0 (exact). Trade-off: higher p needs more quantum gates and is more noise-sensitive.` },
            },
        },

        {
            title: 'Step 3 — Measure & Evaluate Cut',
            description: 'Measure all qubits to get a bitstring (partition), then evaluate the cut value classically.',
            equation: 'C(\\vec{z}) = \\sum_{(i,j) \\in E} \\frac{1}{2}(1 - z_i z_j)',
            terms: [
                { symbol: 'C(\\vec{z})', meaning: 'Cut value — number of edges between the two sets' },
                { symbol: 'z_i z_j = -1', meaning: 'Vertices in different sets → edge is cut (+1)' },
            ],
            illustration: (
                <div className="flex items-center gap-4 justify-center flex-wrap">
                    <div className="text-center"><div className="bg-slate-700 rounded-lg px-4 py-2 font-mono text-white mb-1">Measure: |010⟩</div><div className="text-xs text-slate-400">v₀=A, v₁=B, v₂=A</div></div>
                    <ArrowRight className="text-slate-500" size={20} />
                    <div className="text-center"><div className="bg-emerald-500/20 border border-emerald-400 rounded-lg px-4 py-2 text-emerald-300 mb-1">Cut = 2</div><div className="text-xs text-slate-400">2 of 3 edges cut</div></div>
                </div>
            ),
            interpretation: 'Each measurement gives one candidate solution. By running many shots, we build a distribution and pick the bitstring with the highest cut value.',
            nepNote: 'NEP 2020 — Data Analysis: Collect measurement statistics, plot histograms, and identify the optimal solution.',
            comparison: {
                classical: { approach: 'Evaluate cut value for each partition sequentially', complexity: 'O(|E|) per evaluation, O(2ⁿ·|E|) total', limitation: 'Must evaluate every partition to guarantee optimality' },
                quantum: { approach: 'Quantum measurement samples from a distribution biased toward good solutions', complexity: 'O(shots·|E|) — typically 1000-10000 shots', advantage: 'Distribution is concentrated on high-cut solutions; no need to check all 2ⁿ partitions' },
            },
            experiment: {
                label: 'Number of Shots',
                description: 'More shots = better statistics but longer runtime. Find the sweet spot.',
                type: 'slider', min: 10, max: 10000, defaultVal: 1000,
                resultFn: (v) => { const shots = Number(v); const confidence = Math.min(1 - 1 / Math.sqrt(shots), 0.999); return `${shots.toLocaleString()} shots → Statistical confidence: ${(confidence * 100).toFixed(1)}%. With 100 shots: 90% confidence. With 1000: 96.8%. With 10000: 99%. More shots improve reliability but increase quantum computer time.` },
            },
        },

        {
            title: 'Step 4 — Classical Optimiser Tunes Parameters',
            description: 'A classical optimiser adjusts γ⃗, β⃗ to maximise the expected cut value.',
            equation: '\\langle C \\rangle = \\langle \\vec{\\gamma},\\vec{\\beta}|H_C|\\vec{\\gamma},\\vec{\\beta}\\rangle \\rightarrow \\max',
            terms: [
                { symbol: '\\langle C \\rangle', meaning: 'Expected (average) cut value over many measurements' },
            ],
            illustration: (
                <div className="flex items-center gap-3 justify-center flex-wrap">
                    <div className="bg-amber-500/20 border border-amber-400 rounded-lg px-3 py-2 text-amber-300 text-sm">Iter 1: ⟨C⟩=1.2</div>
                    <ArrowRight className="text-slate-500" size={16} />
                    <div className="bg-amber-500/30 border border-amber-400 rounded-lg px-3 py-2 text-amber-300 text-sm">Iter 10: ⟨C⟩=1.8</div>
                    <ArrowRight className="text-slate-500" size={16} />
                    <div className="bg-emerald-500/20 border border-emerald-400 rounded-lg px-3 py-2 text-emerald-300 text-sm">Iter 50: ⟨C⟩=2.0 ✓</div>
                </div>
            ),
            interpretation: 'The hybrid loop converges: quantum evaluates solutions, classical improves parameters. The optimal cut of 2 is found for the 3-vertex triangle graph.',
            nepNote: 'NEP 2020 — Research Skills: Compare QAOA results with brute-force classical solutions and calculate the approximation ratio.',
            comparison: {
                classical: { approach: 'Simulated annealing or genetic algorithms for heuristic optimisation', complexity: 'O(iterations × n²) — no convergence guarantee', limitation: 'Can get stuck in local optima; no provable approximation ratio' },
                quantum: { approach: 'QAOA with classical optimiser (COBYLA/SPSA) in hybrid loop', complexity: 'O(iterations × p × shots)', advantage: 'Provable approximation guarantees; quantum tunnelling helps escape local optima' },
            },
            experiment: {
                label: 'Optimiser Iterations',
                description: 'See how the expected cut value improves with more optimisation iterations.',
                type: 'slider', min: 1, max: 100, defaultVal: 20,
                resultFn: (v) => { const iters = Number(v); const maxCut = 2; const achieved = maxCut * (1 - Math.exp(-iters / 15)); return `After ${iters} iterations: ⟨C⟩ ≈ ${achieved.toFixed(2)} / ${maxCut} (${(achieved / maxCut * 100).toFixed(0)}% of optimal). Convergence typically occurs around 30-50 iterations for small graphs. Larger graphs need more iterations.` },
            },
        },
    ],
    finalOutput: 'QAOA finds the maximum cut with approximation ratio >0.87 for p≥1. For the 3-vertex triangle, exact max-cut of 2 is found.',
    recommendation: 'Start with 3-4 vertex graphs on IBM Quantum. Scale to 10+ vertices. Compare with classical solvers. Apply to real logistics/scheduling problems.',
}


/* ═══════════════════════════════════════════════════
   TOPIC 6 — Quantum Simulation (VQE for H₂)
   ═══════════════════════════════════════════════════ */
const topic6: DemoTopic = {
    id: 'simulation', number: 6, title: 'Quantum Simulation',
    subtitle: 'VQE — Finding the ground state energy of the H₂ molecule',
    color: 'indigo', icon: <FlaskConical size={28} />,
    problemStatement: 'Calculate the ground state energy of H₂ as a function of bond distance. This is the foundation of computational drug discovery — simulating molecular behaviour on a quantum computer.',
    steps: [
        {
            title: 'Step 1 — Map Molecular Hamiltonian to Qubits',
            description: 'Use Jordan-Wigner transformation to convert the fermionic molecular Hamiltonian into qubit operators.',
            equation: 'H_{\\text{mol}} = \\sum_{ij} h_{ij} a_i^\\dagger a_j + \\sum_{ijkl} h_{ijkl} a_i^\\dagger a_j^\\dagger a_k a_l',
            terms: [
                { symbol: 'H_{\\text{mol}}', meaning: 'Molecular Hamiltonian — all electron interactions in H₂' },
                { symbol: 'a_i^\\dagger, a_j', meaning: 'Fermionic creation/annihilation operators' },
                { symbol: 'h_{ij}', meaning: 'One-electron integrals — kinetic energy + electron-nucleus attraction' },
                { symbol: 'h_{ijkl}', meaning: 'Two-electron integrals — electron-electron repulsion' },
            ],
            illustration: (
                <div className="flex items-center gap-4 justify-center flex-wrap">
                    <div className="text-center"><div className="text-4xl mb-1">⚛️</div><div className="text-xs text-slate-400">H₂ molecule</div></div>
                    <ArrowRight className="text-slate-500" size={20} />
                    <div className="text-center"><div className="bg-slate-700 border border-slate-500 rounded-lg px-3 py-2 text-sm text-white">Jordan-Wigner</div></div>
                    <ArrowRight className="text-slate-500" size={20} />
                    <div className="bg-indigo-500/20 border border-indigo-400 rounded-lg px-3 py-2 text-indigo-300 text-xs font-mono">H = c₀I+c₁Z₀+c₂Z₁+c₃Z₀Z₁+c₄X₀X₁+c₅Y₀Y₁</div>
                </div>
            ),
            interpretation: 'The chemistry problem is now a qubit problem. H₂ needs only 2 qubits. The coefficients depend on bond distance and are computed classically.',
            nepNote: 'NEP 2020 — Interdisciplinary: Connect chemistry (molecular orbitals) with physics (Hamiltonians) and CS (qubit encoding).',
            comparison: {
                classical: { approach: 'Hartree-Fock: approximate electron interactions as mean field', complexity: 'O(n⁴) for n basis functions', limitation: 'Ignores electron correlation — systematically overestimates energy' },
                quantum: { approach: 'Map exact Hamiltonian to qubits via Jordan-Wigner transformation', complexity: 'O(n⁴) Pauli terms for n orbitals', advantage: 'Captures full electron correlation — can achieve exact energy with sufficient ansatz depth' },
            },
            experiment: {
                label: 'Bond Distance (Å)',
                description: 'Change the H-H bond distance. See how the Hamiltonian coefficients change.',
                type: 'slider', min: 30, max: 300, defaultVal: 74,
                resultFn: (v) => { const d = Number(v) / 100; const eHF = -1.117 + 0.3 * Math.pow(d - 0.735, 2); const eExact = -1.174 + 0.35 * Math.pow(d - 0.735, 2); return `Bond distance: ${d.toFixed(2)} Å → Hartree-Fock energy: ${eHF.toFixed(3)} Ha | Exact energy: ${eExact.toFixed(3)} Ha | Correlation energy: ${(eExact - eHF).toFixed(3)} Ha. Equilibrium at 0.735 Å. VQE captures the correlation energy that Hartree-Fock misses.` },
            },
        },

        {
            title: 'Step 2 — Prepare Trial State (Ansatz)',
            description: 'Use a hardware-efficient ansatz to prepare a parameterised trial wavefunction.',
            equation: '|\\psi(\\theta)\\rangle = U(\\theta)|\\text{HF}\\rangle = R_Y(\\theta)|01\\rangle',
            terms: [
                { symbol: '|\\text{HF}\\rangle = |01\\rangle', meaning: 'Hartree-Fock state — classical best guess' },
                { symbol: '\\theta', meaning: 'Variational parameter — controls electron correlation' },
            ],
            illustration: (
                <div className="bg-slate-800 rounded-xl p-4 font-mono text-sm text-center space-y-2">
                    <div className="text-slate-400">q₀: ─── X ─── Ry(θ) ─── ● ───</div>
                    <div className="text-slate-400">q₁: ─────────────────── ⊕ ───</div>
                    <div className="text-indigo-400 text-xs mt-2">|HF⟩ = |01⟩ → parameterised |ψ(θ)⟩</div>
                </div>
            ),
            interpretation: 'The ansatz starts from Hartree-Fock and adds quantum correlations via θ. The variational principle guarantees E(θ) ≥ E_exact for any θ.',
            nepNote: 'NEP 2020 — Scaffolded Learning: First compute Hartree-Fock energy classically, then see how VQE improves upon it.',
            comparison: {
                classical: { approach: 'Configuration Interaction: enumerate electron configurations and diagonalise', complexity: 'O(n!) — factorial scaling with electrons', limitation: 'Exact only for tiny molecules; intractable beyond ~20 electrons' },
                quantum: { approach: 'Parameterised quantum circuit explores configuration space efficiently', complexity: 'O(n·L) gates for n qubits, L layers', advantage: 'Polynomial scaling with system size; captures correlations naturally through entanglement' },
            },
            experiment: {
                label: 'Variational Parameter θ',
                description: 'Adjust θ to see how the trial energy changes. Find the minimum!',
                type: 'slider', min: 0, max: 314, defaultVal: 150,
                resultFn: (v) => { const theta = Number(v) / 100; const E = -0.5 - 0.674 * Math.cos(theta); const Emin = -1.174; return `θ=${theta.toFixed(2)} rad → E(θ) = ${E.toFixed(3)} Ha. Minimum at θ*≈1.57 (π/2): E=${Emin} Ha. Current distance from exact: ${(E - Emin).toFixed(3)} Ha. The variational principle guarantees E(θ) ≥ ${Emin} Ha always.` },
            },
        },

        {
            title: 'Step 3 — Measure Energy Expectation Value',
            description: 'Decompose the Hamiltonian into measurable Pauli terms and estimate ⟨H⟩ from measurement statistics.',
            equation: 'E(\\theta) = \\langle\\psi(\\theta)|H|\\psi(\\theta)\\rangle = \\sum_k c_k \\langle P_k \\rangle',
            terms: [
                { symbol: 'P_k', meaning: 'Pauli string (e.g., Z₀Z₁, X₀X₁) — each measured separately' },
                { symbol: 'c_k', meaning: 'Coefficient from Hamiltonian decomposition' },
                { symbol: '\\langle P_k \\rangle', meaning: 'Expectation value estimated from measurement counts' },
            ],
            illustration: (
                <div className="space-y-2 text-center">
                    <div className="flex items-center gap-3 justify-center flex-wrap">
                        {['⟨Z₀⟩=−0.4', '⟨Z₁⟩=+0.4', '⟨Z₀Z₁⟩=−0.6', '⟨X₀X₁⟩=+0.2'].map((t, i) => (<div key={i} className="bg-slate-700 rounded-lg px-3 py-1 text-sm text-white">{t}</div>))}
                    </div>
                    <div className="text-indigo-400 text-sm">E(θ) = c₀+c₁(−0.4)+c₂(0.4)+c₃(−0.6)+c₄(0.2) = −1.137 Ha</div>
                </div>
            ),
            interpretation: 'Each Pauli term requires a different measurement basis. The total energy is a weighted sum. For H₂ at equilibrium, the exact energy is −1.174 Hartree.',
            nepNote: 'NEP 2020 — Quantitative Skills: Compute energy from raw measurement data and understand statistical uncertainty.',
            comparison: {
                classical: { approach: 'Compute energy by matrix diagonalisation of the Hamiltonian', complexity: 'O(2ⁿ) — exponential in number of orbitals', limitation: 'Memory scales as O(4ⁿ) — impossible for large molecules' },
                quantum: { approach: 'Estimate each Pauli expectation value from measurement statistics', complexity: 'O(n⁴ × shots) — polynomial in orbitals', advantage: 'Memory is O(n) qubits — exponentially more efficient than classical storage' },
            },
            experiment: {
                label: 'Measurement Shots per Pauli Term',
                description: 'More shots = more precise energy estimate. See the precision trade-off.',
                type: 'slider', min: 10, max: 10000, defaultVal: 1000,
                resultFn: (v) => { const shots = Number(v); const precision = 1 / Math.sqrt(shots); return `${shots.toLocaleString()} shots → Energy precision: ±${precision.toFixed(4)} Ha. Chemical accuracy requires ±0.0016 Ha (1 kcal/mol). Need ~${Math.ceil(1 / (0.0016 * 0.0016)).toLocaleString()} shots for chemical accuracy. With 1000 shots: ±0.032 Ha (good for qualitative trends).` },
            },
        },

        {
            title: 'Step 4 — Optimise θ to Find Ground State',
            description: 'Classical optimiser minimises E(θ) by adjusting the variational parameter until convergence.',
            equation: '\\theta^* = \\arg\\min_\\theta E(\\theta) \\Rightarrow E(\\theta^*) \\approx E_{\\text{exact}}',
            terms: [
                { symbol: '\\theta^*', meaning: 'Optimal parameter giving the lowest energy' },
                { symbol: 'E_{\\text{exact}} = -1.174 \\text{ Ha}', meaning: 'Exact ground state energy of H₂ at equilibrium' },
            ],
            illustration: (
                <div className="space-y-2 text-center">
                    <div className="flex items-end gap-2 justify-center h-24">
                        {[{ t: '0.0', e: -0.5 }, { t: '0.5', e: -0.9 }, { t: '1.0', e: -1.1 }, { t: '1.5', e: -1.17 }, { t: '2.0', e: -1.05 }, { t: '2.5', e: -0.8 }].map((d, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <div className={`w-10 ${i === 3 ? 'bg-emerald-500' : 'bg-indigo-500/50'} rounded-t`} style={{ height: `${Math.abs(d.e) * 60}px` }}></div>
                                <div className="text-xs text-slate-500">{d.t}</div>
                            </div>
                        ))}
                    </div>
                    <p className="text-emerald-400 text-sm">E(θ*) = −1.174 Ha ≈ Exact energy ✓</p>
                </div>
            ),
            interpretation: 'VQE finds the ground state energy to chemical accuracy. By scanning bond distances, we plot the entire potential energy surface — essential for understanding chemical reactions.',
            nepNote: 'NEP 2020 — Capstone Project: Compute the H₂ dissociation curve using VQE and compare with Hartree-Fock and exact diagonalisation.',
            comparison: {
                classical: { approach: 'Full Configuration Interaction — exact but exponentially expensive', complexity: 'O(n!) time, O(4ⁿ) memory', limitation: 'Limited to ~20 electrons on the largest supercomputers' },
                quantum: { approach: 'VQE with classical optimiser in hybrid loop', complexity: 'O(iterations × n⁴ × shots)', advantage: 'Polynomial scaling enables simulation of molecules with 100+ electrons — transformative for drug discovery' },
            },
            experiment: {
                label: 'Optimiser Iterations',
                description: 'Watch the energy converge to the exact value as the optimiser runs.',
                type: 'slider', min: 1, max: 100, defaultVal: 30,
                resultFn: (v) => { const iters = Number(v); const Eexact = -1.174; const E = Eexact + (0.674) * Math.exp(-iters / 10); const error = E - Eexact; const chemAcc = error < 0.0016; return `After ${iters} iterations: E = ${E.toFixed(4)} Ha | Error: ${error.toFixed(4)} Ha | ${chemAcc ? '✅ Chemical accuracy achieved!' : '❌ Not yet at chemical accuracy (need <0.0016 Ha)'}. Typically converges in 20-50 iterations for H₂.` },
            },
        },
    ],
    finalOutput: 'VQE computes H₂ ground state energy E = −1.174 Hartree at equilibrium (0.735 Å), achieving chemical accuracy with only 2 qubits.',
    recommendation: 'Start with H₂ on Qiskit Nature. Progress to LiH (4 qubits), then H₂O (8 qubits). Partner with chemistry departments for drug discovery.',
}

const topics: DemoTopic[] = [topic1, topic2, topic3, topic4, topic5, topic6]


/* ═══════════════════════════════════════════════════
   EXPERIMENT WIDGET — Interactive user controls
   ═══════════════════════════════════════════════════ */
function ExperimentWidget({ experiment, color }: { experiment: Experiment; color: string }) {
    const c = C[color]
    const [val, setVal] = useState<number | string>(
        experiment.type === 'select' ? (experiment.options?.[0] ?? '') : (experiment.defaultVal ?? 0)
    )
    const [result, setResult] = useState(experiment.resultFn(experiment.type === 'select' ? (experiment.options?.[0] ?? '') : (experiment.defaultVal ?? 0)))

    const handleChange = useCallback((newVal: number | string) => {
        setVal(newVal)
        setResult(experiment.resultFn(newVal))
    }, [experiment])

    return (
        <div className="bg-slate-950/80 rounded-xl p-5 border-2 border-cyan-500/40 space-y-4">
            <div className="flex items-center gap-2 mb-1">
                <Play size={18} className="text-cyan-400" />
                <span className="text-sm font-bold text-cyan-400 uppercase tracking-wide">🧪 Experiential Learning Lab</span>
            </div>
            <p className="text-slate-400 text-sm">{experiment.description}</p>

            <div className="space-y-3">
                <label className="text-sm font-bold text-white block">{experiment.label}</label>
                {experiment.type === 'slider' && (
                    <div className="flex items-center gap-4">
                        <input
                            type="range"
                            min={experiment.min} max={experiment.max} value={Number(val)}
                            onChange={(e) => handleChange(Number(e.target.value))}
                            className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <span className="text-cyan-400 font-mono text-sm min-w-[60px] text-right">{String(val)}</span>
                    </div>
                )}
                {experiment.type === 'select' && experiment.options && (
                    <div className="flex flex-wrap gap-2">
                        {experiment.options.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => handleChange(opt)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${val === opt ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-cyan-950/40 rounded-lg p-4 border border-cyan-700/30">
                <p className="text-sm text-slate-200 leading-relaxed">{result}</p>
            </div>
        </div>
    )
}


/* ═══════════════════════════════════════════════════
   COMPARISON PANEL — Classical vs Quantum side-by-side
   ═══════════════════════════════════════════════════ */
function ComparisonPanel({ comparison }: { comparison: Comparison }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Classical */}
            <div className="bg-orange-950/30 rounded-xl p-5 border border-orange-700/50 space-y-3">
                <div className="flex items-center gap-2">
                    <BarChart3 size={18} className="text-orange-400" />
                    <span className="text-sm font-bold text-orange-400 uppercase tracking-wide">Classical Approach</span>
                </div>
                <div className="space-y-2 text-sm">
                    <p className="text-slate-300"><span className="text-orange-300 font-semibold">Method:</span> {comparison.classical.approach}</p>
                    <p className="text-slate-300"><span className="text-orange-300 font-semibold">Complexity:</span> {comparison.classical.complexity}</p>
                    <p className="text-red-400/80"><span className="text-red-400 font-semibold">Limitation:</span> {comparison.classical.limitation}</p>
                </div>
            </div>
            {/* Quantum */}
            <div className="bg-cyan-950/30 rounded-xl p-5 border border-cyan-700/50 space-y-3">
                <div className="flex items-center gap-2">
                    <Shuffle size={18} className="text-cyan-400" />
                    <span className="text-sm font-bold text-cyan-400 uppercase tracking-wide">Quantum Approach</span>
                </div>
                <div className="space-y-2 text-sm">
                    <p className="text-slate-300"><span className="text-cyan-300 font-semibold">Method:</span> {comparison.quantum.approach}</p>
                    <p className="text-slate-300"><span className="text-cyan-300 font-semibold">Complexity:</span> {comparison.quantum.complexity}</p>
                    <p className="text-emerald-400/80"><span className="text-emerald-400 font-semibold">Advantage:</span> {comparison.quantum.advantage}</p>
                </div>
            </div>
        </div>
    )
}


/* ═══════════════════════════════════════════════════
   STEP CARD — Renders one step with all sections
   ═══════════════════════════════════════════════════ */
function StepCard({ step, stepIndex, color }: { step: Step; stepIndex: number; color: string }) {
    const [expanded, setExpanded] = useState(false)
    const c = C[color]

    return (
        <div className={`bg-slate-950/60 rounded-2xl border-2 ${c.border}/30 overflow-hidden transition-all ${expanded ? `ring-2 ${c.ring}/40` : ''}`}>
            <button onClick={() => setExpanded(!expanded)} className="w-full text-left px-6 py-5 flex items-start gap-4 hover:bg-slate-900/50 transition-colors" aria-expanded={expanded}>
                <div className={`${c.bg} ${c.text} w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shrink-0 mt-0.5`}>{stepIndex + 1}</div>
                <div className="flex-1 min-w-0">
                    <h4 className={`text-xl font-black ${c.text} mb-1`}>{step.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
                <div className={`${c.text} shrink-0 mt-1`}>{expanded ? <ChevronUp size={22} /> : <ChevronDown size={22} />}</div>
            </button>

            {expanded && (
                <div className="px-6 pb-6 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Equation */}
                    {step.equation && (
                        <div className="bg-slate-900 rounded-xl p-5 border border-slate-700">
                            <div className="flex items-center gap-2 mb-3"><span className="text-lg">📐</span><span className="text-sm font-bold text-slate-300 uppercase tracking-wide">Equation</span></div>
                            <div className="overflow-x-auto py-2"><BlockMath math={step.equation} /></div>
                        </div>
                    )}
                    {/* Terms */}
                    {step.terms && step.terms.length > 0 && (
                        <div className="bg-slate-900 rounded-xl p-5 border border-slate-700">
                            <div className="flex items-center gap-2 mb-3"><span className="text-lg">📖</span><span className="text-sm font-bold text-slate-300 uppercase tracking-wide">Term Interpretation</span></div>
                            <div className="space-y-3">{step.terms.map((t, i) => (
                                <div key={i} className="flex items-start gap-3 bg-slate-950/50 rounded-lg p-3 border border-slate-800">
                                    <div className="shrink-0 overflow-x-auto"><InlineMath math={t.symbol} /></div>
                                    <span className="text-slate-400 shrink-0">→</span>
                                    <span className="text-slate-300 text-sm">{t.meaning}</span>
                                </div>
                            ))}</div>
                        </div>
                    )}
                    {/* Illustration */}
                    <div className={`bg-gradient-to-br ${c.gradient} rounded-xl p-5 border-2 ${c.border}/30`}>
                        <div className="flex items-center gap-2 mb-4"><span className="text-lg">🎨</span><span className="text-sm font-bold text-slate-300 uppercase tracking-wide">Visual Illustration</span></div>
                        {step.illustration}
                    </div>

                    {/* Classical vs Quantum Comparison */}
                    <ComparisonPanel comparison={step.comparison} />

                    {/* Interpretation */}
                    <div className="bg-emerald-950/30 rounded-xl p-5 border border-emerald-700/50">
                        <div className="flex items-center gap-2 mb-3"><Lightbulb size={18} className="text-emerald-400" /><span className="text-sm font-bold text-emerald-400 uppercase tracking-wide">Interpretation</span></div>
                        <p className="text-slate-300 text-sm leading-relaxed">{step.interpretation}</p>
                    </div>

                    {/* Experiential Learning Lab */}
                    <ExperimentWidget experiment={step.experiment} color={color} />

                    {/* NEP 2020 Note */}
                    <div className="bg-amber-950/30 rounded-xl p-5 border border-amber-700/50">
                        <div className="flex items-center gap-2 mb-3"><GraduationCap size={18} className="text-amber-400" /><span className="text-sm font-bold text-amber-400 uppercase tracking-wide">NEP 2020 — Learn by Doing</span></div>
                        <p className="text-slate-300 text-sm leading-relaxed">{step.nepNote}</p>
                    </div>
                </div>
            )}
        </div>
    )
}


/* ═══════════════════════════════════════════════════
   TOPIC CARD — Renders one full research topic
   ═══════════════════════════════════════════════════ */
function TopicCard({ topic }: { topic: DemoTopic }) {
    const [open, setOpen] = useState(false)
    const c = C[topic.color]

    return (
        <section className={`bg-gradient-to-br ${c.gradient} rounded-[32px] border-2 ${c.border}/40 shadow-2xl overflow-hidden transition-all ${open ? `ring-4 ring-offset-4 ring-offset-slate-950 ${c.ring}/30` : ''}`}>
            <button onClick={() => setOpen(!open)} className="w-full text-left px-8 md:px-12 py-8 flex flex-col lg:flex-row lg:items-center gap-6 hover:bg-slate-900/20 transition-colors" aria-expanded={open}>
                <div className={`${c.bg} p-5 rounded-2xl ${c.text} shrink-0 w-16 h-16 flex items-center justify-center`}>{topic.icon}</div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2"><span className={`${c.bg} ${c.text} px-3 py-1 rounded-full text-xs font-bold uppercase`}>Topic {topic.number}</span></div>
                    <h3 className={`text-2xl md:text-3xl font-black ${c.text} mb-2`}>{topic.title}</h3>
                    <p className="text-lg text-slate-300">{topic.subtitle}</p>
                </div>
                <div className={`${c.text} shrink-0`}>{open ? <ChevronUp size={28} /> : <ChevronDown size={28} />}</div>
            </button>

            {open && (
                <div className="px-8 md:px-12 pb-10 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    {/* Problem Statement */}
                    <div className="bg-slate-950/50 rounded-2xl p-6 border-2 border-slate-700">
                        <div className="flex items-center gap-3 mb-3"><Target size={20} className={c.text} /><span className={`text-lg font-black ${c.text}`}>Problem Statement</span></div>
                        <p className="text-slate-300 leading-relaxed">{topic.problemStatement}</p>
                    </div>

                    <div className="flex items-center gap-4"><div className="h-px flex-1 bg-slate-700"></div><span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Input → Processing → Output Flow</span><div className="h-px flex-1 bg-slate-700"></div></div>

                    {/* Steps */}
                    <div className="space-y-4">{topic.steps.map((step, i) => (<StepCard key={i} step={step} stepIndex={i} color={topic.color} />))}</div>

                    {/* Final Output */}
                    <div className="bg-emerald-950/40 rounded-2xl p-6 border-2 border-emerald-500/50">
                        <div className="flex items-center gap-3 mb-3"><CheckCircle size={22} className="text-emerald-400" /><span className="text-xl font-black text-emerald-400">Final Output</span></div>
                        <p className="text-slate-200 leading-relaxed text-lg">{topic.finalOutput}</p>
                    </div>

                    {/* Recommendation */}
                    <div className={`${c.bg} rounded-2xl p-6 border-2 ${c.border}/50`}>
                        <div className="flex items-center gap-3 mb-3"><BookOpen size={22} className={c.text} /><span className={`text-xl font-black ${c.text}`}>Research Recommendation</span></div>
                        <p className="text-slate-200 leading-relaxed">{topic.recommendation}</p>
                    </div>
                </div>
            )}
        </section>
    )
}


/* ═══════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════ */
export default function ResearchDemos() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="max-w-[1400px] w-full mx-auto p-6 md:p-12 space-y-12 pb-24">
                <header className="border-b-4 border-slate-800 pb-12 pt-8">
                    <Link href="/research" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors"><span>←</span> Back to Research Roadmap</Link>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">Research Topic Demonstrations</h1>
                    <p className="text-lg md:text-xl text-slate-400 font-medium mb-6">Step-by-step: Input → Processing → Output with Classical vs Quantum comparison at every step</p>

                    <div className="bg-amber-900/30 border border-amber-500/50 rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                            <GraduationCap size={28} className="text-amber-400 shrink-0 mt-1" />
                            <div>
                                <h2 className="text-xl font-bold text-amber-400 mb-2">NEP 2020 — Learn by Doing</h2>
                                <p className="text-slate-300 text-sm leading-relaxed">Each step includes: equations with term interpretation, visual illustrations, Classical vs Quantum comparison, interactive experiential learning controls, and NEP 2020 activity notes.</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Legend */}
                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-4">Each Step Contains</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {[
                            { icon: '📐', label: 'Equation', color: 'text-slate-300' },
                            { icon: '📖', label: 'Term Meanings', color: 'text-slate-300' },
                            { icon: '🎨', label: 'Illustration', color: 'text-slate-300' },
                            { icon: '⚖️', label: 'Classical vs Quantum', color: 'text-cyan-300' },
                            { icon: '🧪', label: 'Interactive Lab', color: 'text-cyan-300' },
                            { icon: '🎓', label: 'NEP 2020 Activity', color: 'text-amber-300' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2">
                                <span className="text-lg">{item.icon}</span>
                                <span className={`text-xs font-bold ${item.color}`}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Topic Demonstrations */}
                <div className="space-y-8">
                    {topics.map((topic) => (<TopicCard key={topic.id} topic={topic} />))}
                </div>

                {/* NEP 2020 Summary */}
                <section className="bg-gradient-to-br from-amber-900/40 to-slate-900 rounded-[32px] p-8 md:p-12 border-2 border-amber-500/40 shadow-2xl">
                    <h2 className="text-2xl md:text-3xl font-black text-amber-400 mb-6 flex items-center gap-3"><GraduationCap size={32} />NEP 2020 Alignment Summary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Experiential Learning', desc: 'Interactive sliders and controls at every step — students manipulate parameters and observe quantum behaviour in real-time', icon: '🔬' },
                            { title: 'Critical Thinking', desc: 'Classical vs Quantum comparison at each step forces analytical evaluation of both approaches', icon: '🧠' },
                            { title: 'Multidisciplinary', desc: 'Connects physics, mathematics, computer science, chemistry, and engineering across all 6 topics', icon: '🔗' },
                            { title: 'Research Aptitude', desc: 'Each topic leads to publishable research — from benchmarks to novel algorithms and applications', icon: '📊' },
                            { title: 'Competency-Based', desc: 'Progressive complexity with user-controlled parameters: 2-qubit → 4-qubit → real-world applications', icon: '📈' },
                            { title: 'Outcome-Based', desc: 'Clear deliverables: working code, measurement data, comparison reports, and publications', icon: '🎯' },
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-950/50 rounded-xl p-5 border border-slate-700">
                                <div className="text-2xl mb-2">{item.icon}</div>
                                <h3 className="text-lg font-bold text-amber-400 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-300">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Link href="/research" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xl font-bold rounded-2xl transition-all text-center">← Research Roadmap</Link>
                    <Link href="/modules/1" className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white text-xl font-black rounded-2xl shadow-xl transition-all text-center">Start Learning Modules →</Link>
                </div>
            </div>
        </div>
    )
}
