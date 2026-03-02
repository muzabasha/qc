'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp, Lightbulb, Cpu, Target, CheckCircle2 } from 'lucide-react'

interface ApplicationProps {
    icon: string
    title: string
    subtitle: string
    color: string
    problem: string
    classicalLimitation: string
    quantumSolution: string
    methodology: {
        step: number
        title: string
        description: string
    }[]
    impact: string[]
    realExample: {
        company: string
        achievement: string
    }
}

export default function Module7() {
    const [expandedApp, setExpandedApp] = useState<number | null>(null)

    const applications: ApplicationProps[] = [
        {
            icon: '💊',
            title: 'Drug Discovery',
            subtitle: 'Molecular Simulation',
            color: 'blue',
            problem: 'Developing new drugs takes 10-15 years and costs $2.6 billion on average. Most candidates fail in clinical trials.',
            classicalLimitation: 'Classical computers cannot accurately simulate molecules with more than ~30 atoms due to exponential complexity. Protein folding and molecular interactions require quantum-level precision.',
            quantumSolution: 'Quantum computers naturally simulate quantum systems. They can model electron interactions, chemical bonds, and molecular dynamics with exponential speedup.',
            methodology: [
                {
                    step: 1,
                    title: 'Encode Molecular Structure',
                    description: 'Map atoms and electrons to qubits. Each qubit represents electron spin states and positions in the molecule.'
                },
                {
                    step: 2,
                    title: 'Apply Hamiltonian',
                    description: 'Use quantum gates to represent molecular energy operators (Hamiltonian). This captures all interactions between particles.'
                },
                {
                    step: 3,
                    title: 'Variational Quantum Eigensolver (VQE)',
                    description: 'Iteratively adjust quantum circuit parameters to find the ground state energy - the most stable molecular configuration.'
                },
                {
                    step: 4,
                    title: 'Simulate Interactions',
                    description: 'Test how the molecule interacts with target proteins or receptors. Quantum simulation reveals binding affinity and effectiveness.'
                },
                {
                    step: 5,
                    title: 'Optimize Structure',
                    description: 'Use quantum optimization to modify molecular structure for better efficacy, fewer side effects, and improved stability.'
                }
            ],
            impact: [
                'Reduce drug development time from 15 years to 3-5 years',
                'Lower costs from $2.6B to under $500M per drug',
                'Discover treatments for currently incurable diseases',
                'Personalized medicine based on individual genetic profiles',
                'Design materials with specific properties (superconductors, batteries)'
            ],
            realExample: {
                company: 'Moderna & IBM',
                achievement: 'Used quantum computing to accelerate mRNA vaccine design, exploring molecular configurations 1000× faster than classical methods.'
            }
        },
        {
            icon: '🔐',
            title: 'Quantum Cryptography',
            subtitle: 'Unbreakable Security',
            color: 'emerald',
            problem: 'Current encryption (RSA, AES) relies on mathematical complexity. Quantum computers will break these systems using Shor\'s algorithm.',
            classicalLimitation: 'Classical encryption can be intercepted and stored. Future quantum computers could decrypt all current communications retroactively.',
            quantumSolution: 'Quantum Key Distribution (QKD) uses quantum mechanics laws - any measurement disturbs the system, making eavesdropping detectable.',
            methodology: [
                {
                    step: 1,
                    title: 'Prepare Quantum States',
                    description: 'Alice encodes random bits into photon polarization states: |0⟩ (horizontal), |1⟩ (vertical), |+⟩ (diagonal), |-⟩ (anti-diagonal).'
                },
                {
                    step: 2,
                    title: 'Transmit Photons',
                    description: 'Send photons through quantum channel (fiber optic cable or free space). Each photon carries one bit of the encryption key.'
                },
                {
                    step: 3,
                    title: 'Random Basis Measurement',
                    description: 'Bob randomly chooses measurement basis (rectilinear or diagonal). Due to quantum mechanics, wrong basis gives random results.'
                },
                {
                    step: 4,
                    title: 'Basis Reconciliation',
                    description: 'Alice and Bob publicly compare which bases they used (not the results). Keep only bits where bases matched - this becomes the shared key.'
                },
                {
                    step: 5,
                    title: 'Eavesdropping Detection',
                    description: 'Compare subset of key bits. If Eve intercepted photons, quantum state collapsed, causing errors. Detect intrusion with >99% certainty.'
                }
            ],
            impact: [
                'Provably secure communication - guaranteed by physics, not math',
                'Detect eavesdropping in real-time with quantum certainty',
                'Protect against future quantum computer attacks',
                'Secure government, military, and financial communications',
                'Enable secure quantum internet infrastructure'
            ],
            realExample: {
                company: 'China\'s Micius Satellite',
                achievement: 'Achieved quantum key distribution over 1,200 km between satellite and ground stations, demonstrating global-scale quantum-secure communication.'
            }
        },
        {
            icon: '📈',
            title: 'Optimization Problems',
            subtitle: 'Finding Global Optima',
            color: 'amber',
            problem: 'Many real-world problems have astronomical solution spaces. Finding the best solution among trillions of possibilities is computationally intractable.',
            classicalLimitation: 'Classical algorithms get stuck in local minima. Exhaustive search is impossible - checking 1 trillion options at 1 billion/sec takes 16 minutes. For 10^50 options: longer than universe age.',
            quantumSolution: 'Quantum annealing and QAOA explore all possibilities simultaneously through superposition, using quantum tunneling to escape local minima.',
            methodology: [
                {
                    step: 1,
                    title: 'Formulate as QUBO',
                    description: 'Convert problem to Quadratic Unconstrained Binary Optimization. Map variables to qubits and constraints to energy landscape.'
                },
                {
                    step: 2,
                    title: 'Initialize Superposition',
                    description: 'Prepare all qubits in equal superposition - quantum computer explores all 2^n solutions simultaneously.'
                },
                {
                    step: 3,
                    title: 'Apply Problem Hamiltonian',
                    description: 'Encode problem constraints as quantum operators. Lower energy states correspond to better solutions.'
                },
                {
                    step: 4,
                    title: 'Quantum Annealing',
                    description: 'Gradually evolve system from simple Hamiltonian to problem Hamiltonian. Quantum tunneling helps escape local minima.'
                },
                {
                    step: 5,
                    title: 'Measure Ground State',
                    description: 'System settles into lowest energy state (optimal solution). Measure qubits to read the answer.'
                }
            ],
            impact: [
                'Optimize delivery routes saving millions in fuel costs',
                'Portfolio optimization for maximum returns with minimum risk',
                'Traffic flow optimization reducing congestion by 30-40%',
                'Supply chain optimization cutting waste and delays',
                'Protein folding for drug discovery and disease research'
            ],
            realExample: {
                company: 'Volkswagen & D-Wave',
                achievement: 'Optimized traffic flow for 10,000 taxis in Beijing, reducing travel time by 20% and demonstrating real-time quantum optimization at scale.'
            }
        },
        {
            icon: '🤖',
            title: 'Quantum Machine Learning',
            subtitle: 'AI Acceleration',
            color: 'purple',
            problem: 'Training large AI models requires massive computational resources. GPT-4 training cost ~$100M and months of computation. Classical ML struggles with high-dimensional data.',
            classicalLimitation: 'Neural networks are limited by classical computing constraints. Training scales poorly with data size. Cannot efficiently explore exponentially large feature spaces.',
            quantumSolution: 'Quantum computers can process exponentially large feature spaces simultaneously. Quantum kernels map data to high-dimensional Hilbert spaces where patterns become linearly separable.',
            methodology: [
                {
                    step: 1,
                    title: 'Quantum Feature Mapping',
                    description: 'Encode classical data into quantum states using parameterized quantum circuits. Map n features to 2^n dimensional Hilbert space.'
                },
                {
                    step: 2,
                    title: 'Quantum Kernel Computation',
                    description: 'Calculate inner products between quantum states - this is exponentially hard classically but natural for quantum computers.'
                },
                {
                    step: 3,
                    title: 'Variational Quantum Circuit',
                    description: 'Design quantum neural network with trainable parameters. Use quantum gates as activation functions and entanglement for non-linearity.'
                },
                {
                    step: 4,
                    title: 'Hybrid Training',
                    description: 'Combine quantum circuit with classical optimizer. Quantum computer evaluates loss function, classical computer updates parameters.'
                },
                {
                    step: 5,
                    title: 'Quantum Advantage',
                    description: 'Leverage quantum interference and entanglement to find patterns classical ML cannot detect. Achieve exponential speedup for specific tasks.'
                }
            ],
            impact: [
                'Train AI models 100-1000× faster than classical methods',
                'Discover patterns in high-dimensional data (genomics, finance)',
                'Quantum-enhanced recommendation systems',
                'Fraud detection with quantum pattern recognition',
                'Climate modeling and weather prediction improvements'
            ],
            realExample: {
                company: 'Google Quantum AI',
                achievement: 'Demonstrated quantum advantage in ML tasks, achieving classification accuracy improvements of 15-20% over classical methods on specific datasets.'
            }
        }
    ]

    const getColorClasses = (color: string) => {
        const colors: Record<string, any> = {
            blue: {
                bg: 'bg-blue-600/20',
                border: 'border-blue-500',
                text: 'text-blue-400',
                hover: 'hover:border-blue-400',
                gradient: 'from-blue-900/50 to-slate-900'
            },
            emerald: {
                bg: 'bg-emerald-600/20',
                border: 'border-emerald-500',
                text: 'text-emerald-400',
                hover: 'hover:border-emerald-400',
                gradient: 'from-emerald-900/50 to-slate-900'
            },
            amber: {
                bg: 'bg-amber-600/20',
                border: 'border-amber-500',
                text: 'text-amber-400',
                hover: 'hover:border-amber-400',
                gradient: 'from-amber-900/50 to-slate-900'
            },
            purple: {
                bg: 'bg-purple-600/20',
                border: 'border-purple-500',
                text: 'text-purple-400',
                hover: 'hover:border-purple-400',
                gradient: 'from-purple-900/50 to-slate-900'
            }
        }
        return colors[color]
    }

    return (
        <div className="max-w-[1400px] w-full mx-auto p-6 md:p-12 space-y-12 md:space-y-24 pb-48 animate-in fade-in duration-700 relative">
            <header className="border-b-4 border-slate-800 pb-12 pt-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">Module 7: Real-World Applications</h1>
                <p className="text-lg md:text-xl text-slate-400 font-medium">Where will Quantum make an impact?</p>
                <div className="mt-8 bg-indigo-900/30 border border-indigo-500/50 rounded-2xl p-6">
                    <p className="text-lg text-slate-300">
                        <strong className="text-indigo-400">Deep Dive:</strong> Click on any application to explore the complete methodology, from problem statement to real-world implementation.
                    </p>
                </div>
            </header>

            <section className="space-y-8">
                {applications.map((app, index) => {
                    const colors = getColorClasses(app.color)
                    const isExpanded = expandedApp === index

                    return (
                        <div
                            key={index}
                            className={`bg-gradient-to-br ${colors.gradient} p-8 md:p-12 rounded-[32px] border-2 ${colors.border} shadow-2xl transition-all duration-300 ${isExpanded ? 'ring-4 ring-offset-4 ring-offset-slate-950 ' + colors.border : colors.hover}`}
                        >
                            {/* Header */}
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                                <div className="flex items-start gap-6">
                                    <div className={`${colors.bg} p-6 rounded-2xl w-20 h-20 flex items-center justify-center text-4xl shrink-0`}>
                                        {app.icon}
                                    </div>
                                    <div>
                                        <h2 className={`text-3xl md:text-4xl font-black ${colors.text} mb-2`}>
                                            {app.title}
                                        </h2>
                                        <p className="text-lg text-slate-400">{app.subtitle}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setExpandedApp(isExpanded ? null : index)}
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
                                    {app.problem}
                                </p>
                            </div>

                            {/* Expanded Content */}
                            {isExpanded && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                                    {/* Problem & Solution */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="bg-red-950/20 p-6 rounded-2xl border-l-4 border-red-500">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Lightbulb size={24} className="text-red-400" />
                                                <h3 className="text-xl font-bold text-red-400">Classical Limitation</h3>
                                            </div>
                                            <p className="text-base text-slate-300 leading-relaxed">
                                                {app.classicalLimitation}
                                            </p>
                                        </div>
                                        <div className={`${colors.bg} p-6 rounded-2xl border-l-4 ${colors.border}`}>
                                            <div className="flex items-center gap-3 mb-4">
                                                <Cpu size={24} className={colors.text} />
                                                <h3 className={`text-xl font-bold ${colors.text}`}>Quantum Solution</h3>
                                            </div>
                                            <p className="text-base text-slate-300 leading-relaxed">
                                                {app.quantumSolution}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Methodology */}
                                    <div className="bg-slate-950/50 p-8 rounded-2xl border-2 border-slate-700">
                                        <div className="flex items-center gap-3 mb-6">
                                            <Target size={28} className={colors.text} />
                                            <h3 className={`text-2xl font-black ${colors.text}`}>Step-by-Step Methodology</h3>
                                        </div>
                                        <div className="space-y-4">
                                            {app.methodology.map((step, stepIndex) => (
                                                <div
                                                    key={stepIndex}
                                                    className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all"
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className={`${colors.bg} ${colors.text} w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shrink-0`}>
                                                            {step.step}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="text-lg font-bold text-white mb-2">
                                                                {step.title}
                                                            </h4>
                                                            <p className="text-base text-slate-400 leading-relaxed">
                                                                {step.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Impact */}
                                    <div className="bg-slate-950/50 p-8 rounded-2xl border-2 border-emerald-700/50">
                                        <div className="flex items-center gap-3 mb-6">
                                            <CheckCircle2 size={28} className="text-emerald-400" />
                                            <h3 className="text-2xl font-black text-emerald-400">Real-World Impact</h3>
                                        </div>
                                        <ul className="space-y-3">
                                            {app.impact.map((item, impactIndex) => (
                                                <li key={impactIndex} className="flex items-start gap-3">
                                                    <span className="text-emerald-400 text-xl shrink-0">✓</span>
                                                    <span className="text-base text-slate-300">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Real Example */}
                                    <div className={`bg-gradient-to-r ${colors.gradient} p-8 rounded-2xl border-2 ${colors.border}`}>
                                        <div className="flex items-start gap-4">
                                            <span className="text-4xl">{app.icon}</span>
                                            <div>
                                                <h3 className={`text-xl font-black ${colors.text} mb-2`}>
                                                    Real-World Example: {app.realExample.company}
                                                </h3>
                                                <p className="text-base text-slate-300 leading-relaxed">
                                                    {app.realExample.achievement}
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

            <div className="pt-24 flex justify-between">
                <Link href="/modules/6" className="flex items-center gap-4 px-6 md:px-10 py-4 md:py-5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xl font-bold rounded-2xl transition-all group">
                    <span className="group-hover:-translate-x-2 transition-transform">←</span>
                    Back
                </Link>
                <Link href="/modules/8" className="flex items-center gap-4 px-10 py-5 bg-cyan-600 hover:bg-cyan-500 text-white text-2xl md:text-4xl font-black rounded-2xl shadow-2xl border-b-8 border-cyan-800 transition-all active:border-b-0 active:translate-y-2 group">
                    Next: Trends
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
            </div>
        </div>
    )
}
