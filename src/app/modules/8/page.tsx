'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown, ChevronUp, AlertTriangle, Lightbulb, TrendingUp, Rocket, Shield, Zap } from 'lucide-react'

interface TrendProps {
    icon: React.ReactNode
    title: string
    subtitle: string
    color: string
    challenge: string
    currentState: string
    solution: string
    methodology: {
        step: number
        title: string
        description: string
    }[]
    timeline: string
    keyPlayers: string[]
    impact: string
}

export default function Module8() {
    const [noise, setNoise] = useState(0)
    const [expandedTrend, setExpandedTrend] = useState<number | null>(null)

    const trends: TrendProps[] = [
        {
            icon: <AlertTriangle size={32} className="text-red-400" />,
            title: 'Decoherence & Noise',
            subtitle: 'The NISQ Era Challenge',
            color: 'red',
            challenge: 'Qubits are extremely fragile and lose their quantum state within microseconds due to environmental interference. This is the biggest obstacle to practical quantum computing.',
            currentState: 'We are in the NISQ (Noisy Intermediate-Scale Quantum) era with 50-1000 qubits but high error rates (0.1-1%). Current quantum computers can only run shallow circuits before decoherence destroys the computation.',
            solution: 'Quantum Error Correction (QEC) codes that use multiple physical qubits to encode one logical qubit, combined with better isolation and cryogenic cooling to near absolute zero.',
            methodology: [
                {
                    step: 1,
                    title: 'Identify Error Sources',
                    description: 'Thermal noise, electromagnetic interference, cosmic rays, and imperfect gate operations all cause bit flips and phase flips in qubits.'
                },
                {
                    step: 2,
                    title: 'Implement Error Detection',
                    description: 'Use ancilla qubits to continuously monitor the state without collapsing it. Syndrome measurements detect errors without revealing quantum information.'
                },
                {
                    step: 3,
                    title: 'Apply Error Correction Codes',
                    description: 'Surface codes, Shor codes, or Steane codes encode 1 logical qubit using 9-1000 physical qubits. Redundancy allows error detection and correction.'
                },
                {
                    step: 4,
                    title: 'Real-Time Correction',
                    description: 'Classical computer analyzes syndrome measurements and applies corrective gates in real-time, faster than decoherence occurs.'
                },
                {
                    step: 5,
                    title: 'Achieve Fault Tolerance',
                    description: 'When error rate drops below threshold (~0.01%), errors can be corrected faster than they accumulate, enabling arbitrarily long computations.'
                }
            ],
            timeline: '2025-2030: First fault-tolerant logical qubits | 2030-2035: Practical error-corrected quantum computers',
            keyPlayers: ['IBM (127+ qubit systems)', 'Google (Sycamore, Willow)', 'IonQ (trapped ions)', 'Rigetti (superconducting)', 'Microsoft (topological qubits)'],
            impact: 'Error correction is the key to moving from NISQ to fault-tolerant quantum computing, enabling practical applications in drug discovery, cryptography, and optimization.'
        },
        {
            icon: <Shield size={32} className="text-purple-400" />,
            title: 'Topological Qubits',
            subtitle: 'Noise-Immune Computing',
            color: 'purple',
            challenge: 'Traditional qubits (superconducting, trapped ions) are highly sensitive to environmental noise. Even with error correction, they require thousands of physical qubits per logical qubit.',
            currentState: 'Topological qubits exist only in theory and early experiments. Microsoft is leading research using Majorana zero modes - exotic quasiparticles that emerge in special materials at ultra-low temperatures.',
            solution: 'Topological quantum computing encodes information in the braiding patterns of anyons (exotic particles). The information is stored non-locally, making it inherently protected from local noise.',
            methodology: [
                {
                    step: 1,
                    title: 'Create Majorana Zero Modes',
                    description: 'Cool superconducting nanowires to near absolute zero. Apply magnetic fields to create Majorana fermions at the wire ends - particles that are their own antiparticles.'
                },
                {
                    step: 2,
                    title: 'Braid Anyons',
                    description: 'Move Majorana modes around each other in 2D space. The braiding pattern encodes quantum information topologically - it depends only on the path, not the exact positions.'
                },
                {
                    step: 3,
                    title: 'Topological Protection',
                    description: 'Information is stored in global properties of the system. Local perturbations (noise) cannot change the braiding pattern, providing inherent error protection.'
                },
                {
                    step: 4,
                    title: 'Perform Quantum Gates',
                    description: 'Execute quantum operations by braiding anyons in specific patterns. Different braiding sequences implement different quantum gates.'
                },
                {
                    step: 5,
                    title: 'Measurement',
                    description: 'Fuse anyons together to read out the quantum state. The fusion outcome reveals the encoded information.'
                }
            ],
            timeline: '2025-2028: First demonstration of topological qubits | 2030+: Scalable topological quantum computers',
            keyPlayers: ['Microsoft (Azure Quantum)', 'QuTech (Netherlands)', 'University of Copenhagen', 'Station Q research'],
            impact: 'If successful, topological qubits could reduce the overhead for error correction from 1000:1 to 10:1 or better, dramatically accelerating the path to practical quantum computing.'
        },
        {
            icon: <Rocket size={32} className="text-emerald-400" />,
            title: 'Quantum Supremacy to Utility',
            subtitle: 'From Proof to Practice',
            color: 'emerald',
            challenge: 'Google achieved "quantum supremacy" in 2019, but the task (random circuit sampling) had no practical use. The challenge is demonstrating quantum advantage for real-world problems.',
            currentState: 'We have quantum supremacy (faster than classical for specific tasks) but not quantum utility (solving useful problems better than classical computers). Current applications are limited to research and proof-of-concept.',
            solution: 'Develop quantum algorithms with proven advantage for practical problems, improve hardware to run deeper circuits, and create hybrid quantum-classical workflows for near-term applications.',
            methodology: [
                {
                    step: 1,
                    title: 'Identify Quantum-Suitable Problems',
                    description: 'Focus on problems with exponential classical complexity: molecular simulation, optimization, machine learning, cryptography. These are where quantum advantage is most likely.'
                },
                {
                    step: 2,
                    title: 'Develop Variational Algorithms',
                    description: 'Create hybrid algorithms (VQE, QAOA) that work on NISQ devices. Use shallow quantum circuits with classical optimization loops to work around noise limitations.'
                },
                {
                    step: 3,
                    title: 'Benchmark Against Classical',
                    description: 'Rigorously compare quantum results to best classical algorithms. Account for all overhead (compilation, error mitigation, classical post-processing).'
                },
                {
                    step: 4,
                    title: 'Scale Hardware',
                    description: 'Increase qubit count (100 → 1000 → 10,000) while improving coherence times and gate fidelities. More qubits + lower errors = more powerful computations.'
                },
                {
                    step: 5,
                    title: 'Demonstrate Practical Advantage',
                    description: 'Solve real-world problems faster or better than classical computers: drug discovery, materials design, financial optimization, AI training.'
                }
            ],
            timeline: '2024-2025: Quantum utility demonstrations | 2026-2030: Widespread practical quantum advantage',
            keyPlayers: ['Google Quantum AI', 'IBM Quantum', 'Amazon Braket', 'Atom Computing', 'PsiQuantum'],
            impact: 'Quantum utility will transform industries: accelerate drug discovery by 10×, optimize supply chains saving billions, break current encryption, and enable new AI capabilities.'
        },
        {
            icon: <Zap size={32} className="text-blue-400" />,
            title: 'Quantum Internet',
            subtitle: 'Entanglement Distribution',
            color: 'blue',
            challenge: 'Current quantum computers are isolated. To build a quantum internet, we need to distribute entanglement over long distances without losing quantum coherence.',
            currentState: 'Quantum key distribution (QKD) works over 100s of km. Quantum repeaters and satellite-based entanglement distribution are in early stages. No large-scale quantum network exists yet.',
            solution: 'Quantum repeaters that extend entanglement range, quantum memories to store quantum states, and satellite-based distribution for global quantum networks.',
            methodology: [
                {
                    step: 1,
                    title: 'Generate Entangled Pairs',
                    description: 'Create entangled photon pairs using spontaneous parametric down-conversion or quantum dots. These photons share quantum correlations regardless of distance.'
                },
                {
                    step: 2,
                    title: 'Transmit Through Quantum Channel',
                    description: 'Send photons through fiber optic cables or free space. Photons can travel 100-200 km before losses become too high.'
                },
                {
                    step: 3,
                    title: 'Quantum Repeaters',
                    description: 'Use intermediate nodes with quantum memories to extend range. Perform entanglement swapping to connect distant nodes without direct transmission.'
                },
                {
                    step: 4,
                    title: 'Quantum Memory Storage',
                    description: 'Store quantum states in atomic ensembles, rare-earth crystals, or trapped ions. Memories must preserve coherence for milliseconds to seconds.'
                },
                {
                    step: 5,
                    title: 'Build Quantum Network',
                    description: 'Connect multiple quantum computers and sensors. Enable distributed quantum computing, secure communication, and quantum sensor networks.'
                }
            ],
            timeline: '2025-2027: Metropolitan quantum networks | 2028-2035: Intercontinental quantum internet',
            keyPlayers: ['China (Micius satellite)', 'EU Quantum Flagship', 'US National Quantum Initiative', 'Delft QuTech', 'Toshiba'],
            impact: 'Quantum internet will enable unhackable communication, distributed quantum computing, enhanced sensing networks, and fundamentally new applications we cannot yet imagine.'
        },
        {
            icon: <TrendingUp size={32} className="text-amber-400" />,
            title: 'Quantum Software & Algorithms',
            subtitle: 'Programming the Quantum Future',
            color: 'amber',
            challenge: 'Quantum programming is fundamentally different from classical. We need better tools, languages, and algorithms to make quantum computing accessible to developers.',
            currentState: 'Current quantum programming requires deep physics knowledge. Tools like Qiskit, Cirq, and Q# exist but are low-level. Few developers have quantum expertise.',
            solution: 'High-level quantum programming languages, automated circuit optimization, quantum algorithm libraries, and educational resources to train the next generation of quantum developers.',
            methodology: [
                {
                    step: 1,
                    title: 'Abstract Hardware Details',
                    description: 'Create high-level languages that hide qubit topology, gate sets, and error rates. Developers specify algorithms, compilers handle hardware specifics.'
                },
                {
                    step: 2,
                    title: 'Quantum Circuit Optimization',
                    description: 'Automatically optimize circuits for specific hardware: minimize gate count, reduce circuit depth, map to available connectivity, insert error mitigation.'
                },
                {
                    step: 3,
                    title: 'Build Algorithm Libraries',
                    description: 'Create reusable quantum subroutines: quantum Fourier transform, amplitude amplification, phase estimation. Enable composition of complex algorithms.'
                },
                {
                    step: 4,
                    title: 'Hybrid Classical-Quantum',
                    description: 'Develop frameworks for seamless integration of quantum and classical computing. Automatically partition problems and orchestrate execution.'
                },
                {
                    step: 5,
                    title: 'Education & Training',
                    description: 'Create courses, tutorials, and certifications. Train developers, scientists, and engineers in quantum computing principles and programming.'
                }
            ],
            timeline: '2024-2026: Mature quantum SDKs | 2027-2030: Quantum-native applications',
            keyPlayers: ['IBM Qiskit', 'Google Cirq', 'Microsoft Q#', 'Amazon Braket SDK', 'Xanadu PennyLane', 'Zapata Orquestra'],
            impact: 'Better software tools will democratize quantum computing, enabling millions of developers to create quantum applications and accelerating innovation across all industries.'
        }
    ]

    const getColorClasses = (color: string) => {
        const colors: Record<string, any> = {
            red: {
                bg: 'bg-red-600/20',
                border: 'border-red-500',
                text: 'text-red-400',
                hover: 'hover:border-red-400',
                gradient: 'from-red-900/50 to-slate-900'
            },
            purple: {
                bg: 'bg-purple-600/20',
                border: 'border-purple-500',
                text: 'text-purple-400',
                hover: 'hover:border-purple-400',
                gradient: 'from-purple-900/50 to-slate-900'
            },
            emerald: {
                bg: 'bg-emerald-600/20',
                border: 'border-emerald-500',
                text: 'text-emerald-400',
                hover: 'hover:border-emerald-400',
                gradient: 'from-emerald-900/50 to-slate-900'
            },
            blue: {
                bg: 'bg-blue-600/20',
                border: 'border-blue-500',
                text: 'text-blue-400',
                hover: 'hover:border-blue-400',
                gradient: 'from-blue-900/50 to-slate-900'
            },
            amber: {
                bg: 'bg-amber-600/20',
                border: 'border-amber-500',
                text: 'text-amber-400',
                hover: 'hover:border-amber-400',
                gradient: 'from-amber-900/50 to-slate-900'
            }
        }
        return colors[color]
    }

    return (
        <div className="max-w-[1400px] w-full mx-auto p-6 md:p-12 space-y-12 md:space-y-24 pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">Module 8: Future Trends & Challenges</h1>
                <p className="text-lg md:text-xl text-slate-400 font-medium">Why don't we all have Quantum Laptops yet?</p>
                <div className="mt-8 bg-indigo-900/30 border border-indigo-500/50 rounded-2xl p-6">
                    <p className="text-lg text-slate-300">
                        <strong className="text-indigo-400">The Path Forward:</strong> Explore the major challenges facing quantum computing and the cutting-edge solutions being developed to overcome them.
                    </p>
                </div>
            </header>

            {/* Interactive Noise Demo */}
            <section className="space-y-12">
                <div className="flex items-center gap-6">
                    <div className="bg-red-600/20 p-4 rounded-xl text-4xl">🌫️</div>
                    <h2 className="text-3xl md:text-5xl font-black text-red-500">Interactive Lab: Decoherence</h2>
                </div>
                <div className="bg-slate-800 p-8 md:p-12 rounded-[32px] border border-slate-700 shadow-2xl flex flex-col items-center justify-center space-y-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-white text-center">Environmental Noise Simulator</h3>
                    <p className="text-lg text-slate-400 text-center font-medium max-w-2xl">
                        Slide to introduce interference and watch the quantum state decohere. This demonstrates why quantum computers must be isolated from the environment.
                    </p>

                    <div className="w-full max-w-3xl space-y-4">
                        <div className="flex justify-between text-lg font-bold">
                            <span className="text-emerald-400">Pristine Quantum State</span>
                            <span className="text-red-500">Complete Decoherence</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={noise}
                            onChange={(e) => setNoise(parseInt(e.target.value))}
                            className="w-full h-8 bg-slate-900 rounded-2xl appearance-none cursor-pointer border-2 border-slate-700 shadow-inner accent-red-500"
                            aria-label="Noise level slider"
                        />
                        <div className="text-center">
                            <span className="text-2xl font-black text-white">Noise Level: {noise}%</span>
                        </div>
                    </div>

                    <div className="w-full h-[300px] md:h-[400px] bg-slate-950 border-4 border-slate-900 rounded-3xl relative overflow-hidden shadow-inner flex items-center justify-center transition-colors duration-500">
                        <div className="text-center z-10 p-6 md:p-10 bg-slate-950/80 rounded-[32px] border border-slate-800 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,1)]">
                            <span className={`text-2xl md:text-4xl font-black transition-all tracking-tighter uppercase ${noise > 50 ? 'text-red-500' : 'text-emerald-400'}`}>
                                {noise > 80 ? 'CRASH / COLLAPSE' : noise > 50 ? 'ERRONEOUS STATE' : 'Stable Purity |𝜓⟩'}
                            </span>
                            <p className="text-sm text-slate-400 mt-4">
                                {noise > 80 ? 'Quantum information lost!' : noise > 50 ? 'Errors accumulating...' : 'Quantum coherence maintained'}
                            </p>
                        </div>
                        {Array.from({ length: Math.floor(noise * 1.5) }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute bg-white/20 rounded-full blur-[2px]"
                                style={{
                                    width: Math.random() * 40 + 10 + 'px',
                                    height: Math.random() * 40 + 10 + 'px',
                                    left: Math.random() * 100 + '%',
                                    top: Math.random() * 100 + '%',
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Future Trends - Expandable */}
            <section className="space-y-8">
                <div className="flex items-center gap-6">
                    <div className="bg-emerald-600/20 p-4 rounded-xl text-4xl">🚀</div>
                    <h2 className="text-3xl md:text-5xl font-black text-emerald-500">The Path Forward: 5 Key Trends</h2>
                </div>

                {trends.map((trend, index) => {
                    const colors = getColorClasses(trend.color)
                    const isExpanded = expandedTrend === index

                    return (
                        <div
                            key={index}
                            className={`bg-gradient-to-br ${colors.gradient} p-8 md:p-12 rounded-[32px] border-2 ${colors.border} shadow-2xl transition-all duration-300 ${isExpanded ? 'ring-4 ring-offset-4 ring-offset-slate-950 ' + colors.border : colors.hover}`}
                        >
                            {/* Header */}
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                                <div className="flex items-start gap-6">
                                    <div className={`${colors.bg} p-6 rounded-2xl w-20 h-20 flex items-center justify-center shrink-0`}>
                                        {trend.icon}
                                    </div>
                                    <div>
                                        <h3 className={`text-3xl md:text-4xl font-black ${colors.text} mb-2`}>
                                            {trend.title}
                                        </h3>
                                        <p className="text-lg text-slate-400">{trend.subtitle}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setExpandedTrend(isExpanded ? null : index)}
                                    className={`flex items-center gap-3 px-6 py-3 ${colors.bg} ${colors.text} rounded-xl hover:bg-opacity-80 transition-all font-bold text-lg border-2 ${colors.border}`}
                                    aria-expanded={isExpanded}
                                    aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                                >
                                    {isExpanded ? (
                                        <>
                                            <ChevronUp size={24} />
                                            Hide Details
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown size={24} />
                                            Learn More
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Brief Description (Always Visible) */}
                            <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-700 mb-6">
                                <p className="text-lg text-slate-300 leading-relaxed">
                                    {trend.challenge}
                                </p>
                            </div>

                            {/* Expanded Content */}
                            {isExpanded && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                                    {/* Current State & Solution */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="bg-orange-950/20 p-6 rounded-2xl border-l-4 border-orange-500">
                                            <div className="flex items-center gap-3 mb-4">
                                                <AlertTriangle size={24} className="text-orange-400" />
                                                <h4 className="text-xl font-bold text-orange-400">Current State</h4>
                                            </div>
                                            <p className="text-base text-slate-300 leading-relaxed">
                                                {trend.currentState}
                                            </p>
                                        </div>
                                        <div className={`${colors.bg} p-6 rounded-2xl border-l-4 ${colors.border}`}>
                                            <div className="flex items-center gap-3 mb-4">
                                                <Lightbulb size={24} className={colors.text} />
                                                <h4 className={`text-xl font-bold ${colors.text}`}>Solution Approach</h4>
                                            </div>
                                            <p className="text-base text-slate-300 leading-relaxed">
                                                {trend.solution}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Methodology */}
                                    <div className="bg-slate-950/50 p-8 rounded-2xl border-2 border-slate-700">
                                        <div className="flex items-center gap-3 mb-6">
                                            <Rocket size={28} className={colors.text} />
                                            <h4 className={`text-2xl font-black ${colors.text}`}>Implementation Methodology</h4>
                                        </div>
                                        <div className="space-y-4">
                                            {trend.methodology.map((step, stepIndex) => (
                                                <div
                                                    key={stepIndex}
                                                    className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all"
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className={`${colors.bg} ${colors.text} w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shrink-0`}>
                                                            {step.step}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h5 className="text-lg font-bold text-white mb-2">
                                                                {step.title}
                                                            </h5>
                                                            <p className="text-base text-slate-400 leading-relaxed">
                                                                {step.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Timeline & Key Players */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="bg-slate-950/50 p-6 rounded-2xl border-2 border-indigo-700/50">
                                            <div className="flex items-center gap-3 mb-4">
                                                <TrendingUp size={24} className="text-indigo-400" />
                                                <h4 className="text-xl font-bold text-indigo-400">Timeline</h4>
                                            </div>
                                            <p className="text-base text-slate-300 leading-relaxed">
                                                {trend.timeline}
                                            </p>
                                        </div>
                                        <div className="bg-slate-950/50 p-6 rounded-2xl border-2 border-cyan-700/50">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Shield size={24} className="text-cyan-400" />
                                                <h4 className="text-xl font-bold text-cyan-400">Key Players</h4>
                                            </div>
                                            <ul className="space-y-2">
                                                {trend.keyPlayers.map((player, playerIndex) => (
                                                    <li key={playerIndex} className="flex items-start gap-2">
                                                        <span className="text-cyan-400 text-lg shrink-0">•</span>
                                                        <span className="text-base text-slate-300">{player}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Impact */}
                                    <div className={`bg-gradient-to-r ${colors.gradient} p-8 rounded-2xl border-2 ${colors.border}`}>
                                        <div className="flex items-start gap-4">
                                            <Zap size={32} className={colors.text} />
                                            <div>
                                                <h4 className={`text-xl font-black ${colors.text} mb-3`}>
                                                    Expected Impact
                                                </h4>
                                                <p className="text-base text-slate-300 leading-relaxed">
                                                    {trend.impact}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </section>

            <div className="bg-linear-to-br from-slate-800 to-slate-950 p-12 md:p-32 rounded-[64px] text-center flex flex-col items-center space-y-12 shadow-[0_0_100px_rgba(0,0,0,0.5)] border-4 border-slate-700/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                <h2 className="text-3xl md:text-5xl font-black bg-linear-to-r from-emerald-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent leading-tight pb-4 z-10">Congratulations!</h2>
                <p className="text-lg md:text-2xl text-slate-300 max-w-4xl leading-relaxed font-bold z-10 transition-colors group-hover:text-white">
                    You have journeyed from flipping a quantum coin to understanding hardware trends. You are now prepared for the <strong className="text-white italic">Post-Quantum Era</strong>.
                </p>

                <Link href="/" className="z-10 px-12 md:px-24 py-6 md:py-10 bg-indigo-600 hover:bg-indigo-500 text-white text-2xl md:text-5xl font-black rounded-[40px] shadow-[0_20px_50px_rgba(79,70,229,0.4)] border-b-12 border-indigo-800 transition-all active:border-b-0 active:translate-y-4 active:shadow-none hover:scale-105">
                    Return to Dashboard
                </Link>

                <div className="pt-12 text-slate-500 text-lg md:text-xl font-bold uppercase tracking-[0.5em] z-10">End of Course</div>
            </div>

        </div>
    )
}
