'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { BookOpen, TrendingUp, Users, DollarSign, Building2, GraduationCap, ChevronDown, ChevronUp, Target, Lightbulb, Rocket } from 'lucide-react'

interface ResearchTopic {
    id: string
    title: string
    icon: React.ReactNode
    color: string
    focus: string
    phases: {
        phase: number
        title: string
        duration: string
        funding: string
        outcomes: string[]
        actions: string[]
    }[]
    ugCourse: {
        title: string
        credits: number
        modules: string[]
    }
}

export default function ResearchRoadmap() {
    const [expandedTopic, setExpandedTopic] = useState<string | null>(null)

    const researchTopics: ResearchTopic[] = [
        {
            id: 'algorithms',
            title: 'Quantum Algorithms',
            icon: <Rocket size={32} />,
            color: 'blue',
            focus: 'Development and optimization of quantum algorithms for practical applications, including Grover\'s search, Shor\'s factoring, and variational quantum algorithms (VQE, QAOA).',
            phases: [
                {
                    phase: 1,
                    title: 'Research Publications',
                    duration: '6-12 months',
                    funding: '₹20-40 lakhs',
                    outcomes: [
                        '3-5 publications in IEEE Transactions, Quantum Science and Technology',
                        'Conference presentations at IEEE Quantum Week, QIP',
                        'Access to IBM Quantum, Amazon Braket platforms'
                    ],
                    actions: [
                        'Form research team (2-3 faculty + 4-6 students)',
                        'Develop simulation frameworks',
                        'Submit first paper within 6 months'
                    ]
                },
                {
                    phase: 2,
                    title: 'Seed Money & Grants',
                    duration: '12-18 months',
                    funding: '₹20-40 lakhs',
                    outcomes: [
                        'DST-SERB Early Career Research Award',
                        'CSIR Research Grants',
                        'AICTE Research Promotion Scheme'
                    ],
                    actions: [
                        'Prepare detailed research proposal',
                        'Establish preliminary results',
                        'Submit 3-4 grant applications'
                    ]
                },
                {
                    phase: 3,
                    title: 'Industry Partnerships',
                    duration: '18-24 months',
                    funding: '₹30-50 lakhs',
                    outcomes: [
                        'IBM Quantum Network membership',
                        'TCS, Infosys research collaborations',
                        '5-10 student internships'
                    ],
                    actions: [
                        'Develop industry engagement strategy',
                        'Demonstrate proof-of-concept solutions',
                        'Sign MoUs with 2+ companies'
                    ]
                },
                {
                    phase: 4,
                    title: 'Funded Proposals',
                    duration: '24-36 months',
                    funding: '₹2-3 crores',
                    outcomes: [
                        'IMPRINT/SPARC/UAY funding',
                        '15+ publications in top journals',
                        '10+ PhD scholars trained'
                    ],
                    actions: [
                        'Build strong publication record (10+ papers)',
                        'Establish international collaborations',
                        'Demonstrate industry impact'
                    ]
                },
                {
                    phase: 5,
                    title: 'Center of Excellence',
                    duration: '36+ months',
                    funding: '₹5-10 crores',
                    outcomes: [
                        'Quantum Computing Lab established',
                        'UG/PG courses launched',
                        '100+ students enrolled annually'
                    ],
                    actions: [
                        'Secure CoE funding',
                        'Recruit 5+ faculty members',
                        'Establish 20+ industry partnerships'
                    ]
                }
            ],
            ugCourse: {
                title: 'Introduction to Quantum Algorithms',
                credits: 4,
                modules: [
                    'Foundations (12h): Classical computation, quantum mechanics, qubits',
                    'Basic Algorithms (15h): Deutsch-Jozsa, Grover, QFT, Shor',
                    'Advanced Topics (18h): VQE, QAOA, Quantum ML basics',
                    'Practical Implementation (15h): Qiskit/Cirq programming, projects'
                ]
            }
        },
        {
            id: 'error-correction',
            title: 'Quantum Error Correction',
            icon: <Target size={32} />,
            color: 'red',
            focus: 'Development of quantum error correction codes, fault-tolerant quantum computing, and noise mitigation techniques for NISQ devices.',
            phases: [
                {
                    phase: 1,
                    title: 'Research Publications',
                    duration: '6-12 months',
                    funding: '₹15-30 lakhs',
                    outcomes: [
                        '2-4 publications in Physical Review Letters, PRX Quantum',
                        'Surface code optimization research',
                        'NISQ error mitigation techniques'
                    ],
                    actions: [
                        'Study existing QEC literature',
                        'Develop simulation tools',
                        'Benchmark on real quantum hardware'
                    ]
                },
                {
                    phase: 2,
                    title: 'Seed Money & Grants',
                    duration: '12-18 months',
                    funding: '₹25-40 lakhs',
                    outcomes: [
                        'DST-SERB Core Research Grant',
                        'DRDO Grants for secure communication',
                        'QEC simulation framework'
                    ],
                    actions: [
                        'Demonstrate error mitigation results',
                        'Build QEC simulation framework',
                        'Collaborate with experimental groups'
                    ]
                },
                {
                    phase: 3,
                    title: 'Industry Partnerships',
                    duration: '18-24 months',
                    funding: '₹40-60 lakhs',
                    outcomes: [
                        'IBM Quantum, Google Quantum AI partnerships',
                        'Access to quantum hardware',
                        'Joint research projects'
                    ],
                    actions: [
                        'Demonstrate practical error mitigation',
                        'Publish benchmarking results',
                        'Establish 2+ industry partnerships'
                    ]
                },
                {
                    phase: 4,
                    title: 'Funded Proposals',
                    duration: '24-36 months',
                    funding: '₹2.5-3.5 crores',
                    outcomes: [
                        'IMPRINT-2 funding',
                        'International collaboration (MIT, Caltech)',
                        '8+ publications, 15+ researchers trained'
                    ],
                    actions: [
                        'Build strong publication record',
                        'Demonstrate experimental results',
                        'Secure international collaboration'
                    ]
                },
                {
                    phase: 5,
                    title: 'Center of Excellence',
                    duration: '36+ months',
                    funding: '₹4-6 crores',
                    outcomes: [
                        'QEC simulator and fault-tolerant systems',
                        'UG course on Error Correction',
                        'Collaboration with hardware teams'
                    ],
                    actions: [
                        'Complete infrastructure development',
                        'Launch specialized courses',
                        'Establish research excellence'
                    ]
                }
            ],
            ugCourse: {
                title: 'Quantum Error Correction and Fault Tolerance',
                credits: 3,
                modules: [
                    'Classical Error Correction (8h): Hamming codes, syndrome decoding',
                    'Quantum Errors (10h): Decoherence, noise models, error types',
                    'QEC Codes (15h): Stabilizer codes, surface codes, topological codes',
                    'Fault Tolerance (12h): Fault-tolerant gates, threshold theorem'
                ]
            }
        },
        {
            id: 'machine-learning',
            title: 'Quantum Machine Learning',
            icon: <Lightbulb size={32} />,
            color: 'purple',
            focus: 'Integration of quantum computing with machine learning, quantum neural networks, and quantum-enhanced AI algorithms.',
            phases: [
                {
                    phase: 1,
                    title: 'Research Publications',
                    duration: '6-12 months',
                    funding: '₹20-35 lakhs',
                    outcomes: [
                        '3-5 publications in Quantum Machine Intelligence, NeurIPS',
                        'Quantum neural networks research',
                        'Quantum kernel methods'
                    ],
                    actions: [
                        'Implement QML algorithms',
                        'Benchmark on real datasets',
                        'Release open-source code'
                    ]
                },
                {
                    phase: 2,
                    title: 'Seed Money & Grants',
                    duration: '12-18 months',
                    funding: '₹30-45 lakhs',
                    outcomes: [
                        'AICTE Research Grant',
                        'AI/ML Industry Grants',
                        'QML software framework'
                    ],
                    actions: [
                        'Demonstrate QML advantage',
                        'Build QML software framework',
                        'Collaborate with AI research groups'
                    ]
                },
                {
                    phase: 3,
                    title: 'Industry Partnerships',
                    duration: '18-24 months',
                    funding: '₹50-80 lakhs',
                    outcomes: [
                        'Google, IBM, Microsoft partnerships',
                        'TCS, Infosys AI collaborations',
                        'Access to large datasets'
                    ],
                    actions: [
                        'Demonstrate QML on industry problems',
                        'Create proof-of-concept solutions',
                        'Establish 3+ partnerships'
                    ]
                },
                {
                    phase: 4,
                    title: 'Funded Proposals',
                    duration: '24-36 months',
                    funding: '₹3-4 crores',
                    outcomes: [
                        'IMPRINT AI/ML Track funding',
                        '20+ publications',
                        '25+ researchers trained'
                    ],
                    actions: [
                        'Build strong QML publication record',
                        'Demonstrate industry impact',
                        'Launch QML research center'
                    ]
                },
                {
                    phase: 5,
                    title: 'Center of Excellence',
                    duration: '36+ months',
                    funding: '₹5-8 crores',
                    outcomes: [
                        'QML platform with GPU clusters',
                        'UG course on Quantum ML',
                        'Industry-ready QML solutions'
                    ],
                    actions: [
                        'Complete QML infrastructure',
                        'Launch comprehensive courses',
                        'Establish industry leadership'
                    ]
                }
            ],
            ugCourse: {
                title: 'Quantum Machine Learning',
                credits: 4,
                modules: [
                    'ML Foundations (10h): Classical ML, neural networks, kernels',
                    'Quantum Computing for ML (12h): Data encoding, feature maps',
                    'QML Algorithms (20h): QNN, variational classifiers, quantum kernels',
                    'Applications (18h): Finance, healthcare, hands-on projects'
                ]
            }
        },
        {
            id: 'cryptography',
            title: 'Quantum Cryptography',
            icon: <Building2 size={32} />,
            color: 'emerald',
            focus: 'Quantum key distribution (QKD), post-quantum cryptography, quantum random number generation, and secure quantum communication protocols.',
            phases: [
                {
                    phase: 1,
                    title: 'Research Publications',
                    duration: '6-12 months',
                    funding: '₹25-40 lakhs',
                    outcomes: [
                        '3-4 publications in IEEE Trans. Information Theory',
                        'QKD protocol analysis',
                        'Post-quantum cryptography research'
                    ],
                    actions: [
                        'Simulate QKD protocols',
                        'Analyze security proofs',
                        'Implement QRNG'
                    ]
                },
                {
                    phase: 2,
                    title: 'Seed Money & Grants',
                    duration: '12-18 months',
                    funding: '₹40-60 lakhs',
                    outcomes: [
                        'DRDO Grants for defense applications',
                        'DST Cyber Security funding',
                        'Security analysis tools'
                    ],
                    actions: [
                        'Demonstrate QKD simulation',
                        'Develop security analysis tools',
                        'Submit defense-focused proposals'
                    ]
                },
                {
                    phase: 3,
                    title: 'Industry Partnerships',
                    duration: '18-24 months',
                    funding: '₹60-100 lakhs',
                    outcomes: [
                        'Defense organizations partnerships',
                        'Financial institutions collaborations',
                        'Telecom company projects'
                    ],
                    actions: [
                        'Demonstrate QKD prototype',
                        'Conduct security audits',
                        'Establish strategic partnerships'
                    ]
                },
                {
                    phase: 4,
                    title: 'Funded Proposals',
                    duration: '24-36 months',
                    funding: '₹4-5 crores',
                    outcomes: [
                        'DRDO Major Project',
                        'National Quantum Mission funding',
                        '10+ security papers, 20+ researchers'
                    ],
                    actions: [
                        'Demonstrate working QKD system',
                        'Publish security papers',
                        'Build quantum communication testbed'
                    ]
                },
                {
                    phase: 5,
                    title: 'Center of Excellence',
                    duration: '36+ months',
                    funding: '₹6-10 crores',
                    outcomes: [
                        'QKD experimental setup',
                        'Quantum communication testbed',
                        'UG course on Quantum Cryptography'
                    ],
                    actions: [
                        'Complete secure facilities',
                        'Launch cryptography courses',
                        'Establish national leadership'
                    ]
                }
            ],
            ugCourse: {
                title: 'Quantum Cryptography and Secure Communication',
                credits: 3,
                modules: [
                    'Classical Cryptography (8h): RSA, AES, ECC, security principles',
                    'Quantum Threats (8h): Shor\'s algorithm, post-quantum crypto',
                    'Quantum Key Distribution (15h): BB84, E91, security proofs',
                    'Quantum Networks (14h): Quantum repeaters, practical QKD'
                ]
            }
        },
        {
            id: 'optimization',
            title: 'Quantum Optimization',
            icon: <TrendingUp size={32} />,
            color: 'amber',
            focus: 'Quantum algorithms for combinatorial optimization, quantum annealing, QAOA, and applications to real-world optimization problems.',
            phases: [
                {
                    phase: 1,
                    title: 'Research Publications',
                    duration: '6-12 months',
                    funding: '₹20-35 lakhs',
                    outcomes: [
                        '3-5 publications in optimization journals',
                        'QAOA research',
                        'Quantum annealing benchmarks'
                    ],
                    actions: [
                        'Implement QAOA for various problems',
                        'Access D-Wave quantum annealer',
                        'Benchmark against classical optimizers'
                    ]
                },
                {
                    phase: 2,
                    title: 'Seed Money & Grants',
                    duration: '12-18 months',
                    funding: '₹30-45 lakhs',
                    outcomes: [
                        'DST-SERB funding',
                        'Industry seed grants',
                        'Quantum optimization framework'
                    ],
                    actions: [
                        'Demonstrate optimization results',
                        'Build quantum optimization framework',
                        'Partner with operations research groups'
                    ]
                },
                {
                    phase: 3,
                    title: 'Industry Partnerships',
                    duration: '18-24 months',
                    funding: '₹60-100 lakhs',
                    outcomes: [
                        'Logistics companies (Amazon, Flipkart)',
                        'Manufacturing partnerships',
                        'Finance sector collaborations'
                    ],
                    actions: [
                        'Solve industry optimization problems',
                        'Demonstrate cost savings',
                        'Establish 4+ partnerships'
                    ]
                },
                {
                    phase: 4,
                    title: 'Funded Proposals',
                    duration: '24-36 months',
                    funding: '₹3-4 crores',
                    outcomes: [
                        'IMPRINT Manufacturing/Logistics funding',
                        '15+ publications',
                        '20+ optimization specialists trained'
                    ],
                    actions: [
                        'Build strong optimization portfolio',
                        'Demonstrate measurable ROI',
                        'Launch optimization service'
                    ]
                },
                {
                    phase: 5,
                    title: 'Center of Excellence',
                    duration: '36+ months',
                    funding: '₹5-7 crores',
                    outcomes: [
                        'Quantum optimization platform',
                        'Industry problem database',
                        'UG course on Quantum Optimization'
                    ],
                    actions: [
                        'Complete optimization infrastructure',
                        'Launch industry services',
                        'Establish optimization leadership'
                    ]
                }
            ],
            ugCourse: {
                title: 'Quantum Optimization and Applications',
                credits: 4,
                modules: [
                    'Classical Optimization (12h): Linear, integer programming, heuristics',
                    'Quantum Optimization Basics (12h): Quantum annealing, QUBO',
                    'Quantum Algorithms (18h): QAOA, VQE, hybrid approaches',
                    'Applications (18h): Logistics, finance, scheduling, projects'
                ]
            }
        },
        {
            id: 'simulation',
            title: 'Quantum Simulation',
            icon: <BookOpen size={32} />,
            color: 'indigo',
            focus: 'Quantum simulation of physical systems, molecular dynamics, materials science, and drug discovery applications.',
            phases: [
                {
                    phase: 1,
                    title: 'Research Publications',
                    duration: '6-12 months',
                    funding: '₹25-40 lakhs',
                    outcomes: [
                        '3-5 publications in chemistry journals',
                        'VQE for molecular simulation',
                        'Materials science applications'
                    ],
                    actions: [
                        'Implement VQE for molecules',
                        'Simulate small molecules',
                        'Collaborate with chemistry departments'
                    ]
                },
                {
                    phase: 2,
                    title: 'Seed Money & Grants',
                    duration: '12-18 months',
                    funding: '₹35-50 lakhs',
                    outcomes: [
                        'DST-SERB Chemistry funding',
                        'CSIR Chemistry Grants',
                        'Quantum chemistry toolkit'
                    ],
                    actions: [
                        'Demonstrate molecular simulations',
                        'Build quantum chemistry toolkit',
                        'Partner with chemistry/pharma groups'
                    ]
                },
                {
                    phase: 3,
                    title: 'Industry Partnerships',
                    duration: '18-24 months',
                    funding: '₹70-120 lakhs',
                    outcomes: [
                        'Pharmaceutical companies (Dr. Reddy\'s, Cipla)',
                        'Chemical industry collaborations',
                        'Biotech partnerships'
                    ],
                    actions: [
                        'Simulate industry-relevant molecules',
                        'Demonstrate accuracy improvements',
                        'Establish pharma partnerships'
                    ]
                },
                {
                    phase: 4,
                    title: 'Funded Proposals',
                    duration: '24-36 months',
                    funding: '₹4-5 crores',
                    outcomes: [
                        'BIRAC Biotech funding',
                        'Pharma consortium projects',
                        '20+ publications, 15+ researchers'
                    ],
                    actions: [
                        'Build drug discovery pipeline',
                        'Demonstrate successful predictions',
                        'Launch quantum chemistry center'
                    ]
                },
                {
                    phase: 5,
                    title: 'Center of Excellence',
                    duration: '36+ months',
                    funding: '₹6-9 crores',
                    outcomes: [
                        'Quantum chemistry software suite',
                        'Molecular databases',
                        'UG course on Quantum Simulation'
                    ],
                    actions: [
                        'Complete chemistry infrastructure',
                        'Launch specialized courses',
                        'Establish drug discovery leadership'
                    ]
                }
            ],
            ugCourse: {
                title: 'Quantum Simulation and Computational Chemistry',
                credits: 3,
                modules: [
                    'Computational Chemistry (10h): DFT, Hartree-Fock, classical limits',
                    'Quantum Simulation Theory (12h): Second quantization, fermions',
                    'VQE and Applications (15h): Molecular Hamiltonian, ground states',
                    'Drug Discovery (8h): Protein-ligand binding, case studies'
                ]
            }
        }
    ]

    const getColorClasses = (color: string) => {
        const colors: Record<string, any> = {
            blue: { bg: 'bg-blue-600/20', border: 'border-blue-500', text: 'text-blue-400', gradient: 'from-blue-900/50 to-slate-900' },
            red: { bg: 'bg-red-600/20', border: 'border-red-500', text: 'text-red-400', gradient: 'from-red-900/50 to-slate-900' },
            purple: { bg: 'bg-purple-600/20', border: 'border-purple-500', text: 'text-purple-400', gradient: 'from-purple-900/50 to-slate-900' },
            emerald: { bg: 'bg-emerald-600/20', border: 'border-emerald-500', text: 'text-emerald-400', gradient: 'from-emerald-900/50 to-slate-900' },
            amber: { bg: 'bg-amber-600/20', border: 'border-amber-500', text: 'text-amber-400', gradient: 'from-amber-900/50 to-slate-900' },
            indigo: { bg: 'bg-indigo-600/20', border: 'border-indigo-500', text: 'text-indigo-400', gradient: 'from-indigo-900/50 to-slate-900' }
        }
        return colors[color]
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="max-w-[1400px] w-full mx-auto p-6 md:p-12 space-y-12 pb-24">
                {/* Header */}
                <header className="border-b-4 border-slate-800 pb-12 pt-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors">
                        <span>←</span> Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                        Quantum Computing Research Roadmap
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-medium mb-8">
                        From Research Publications to Center of Excellence
                    </p>
                    <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-2xl p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-indigo-400 mb-4">Strategic Roadmap Overview</h2>
                        <p className="text-lg text-slate-300 mb-4">
                            This comprehensive roadmap provides a structured approach to building quantum computing research capabilities across 6 key topics. Each topic follows a 5-phase progression:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                <div className="text-3xl mb-2">📝</div>
                                <div className="font-bold text-white mb-1">Phase 1</div>
                                <div className="text-sm text-slate-400">Publications</div>
                                <div className="text-xs text-slate-500 mt-1">6-12 months</div>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                <div className="text-3xl mb-2">💰</div>
                                <div className="font-bold text-white mb-1">Phase 2</div>
                                <div className="text-sm text-slate-400">Seed Grants</div>
                                <div className="text-xs text-slate-500 mt-1">12-18 months</div>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                <div className="text-3xl mb-2">🤝</div>
                                <div className="font-bold text-white mb-1">Phase 3</div>
                                <div className="text-sm text-slate-400">Industry</div>
                                <div className="text-xs text-slate-500 mt-1">18-24 months</div>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                <div className="text-3xl mb-2">🎯</div>
                                <div className="font-bold text-white mb-1">Phase 4</div>
                                <div className="text-sm text-slate-400">Major Funding</div>
                                <div className="text-xs text-slate-500 mt-1">24-36 months</div>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                <div className="text-3xl mb-2">🏛️</div>
                                <div className="font-bold text-white mb-1">Phase 5</div>
                                <div className="text-sm text-slate-400">CoE & Courses</div>
                                <div className="text-xs text-slate-500 mt-1">36+ months</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Research Topics */}
                <section className="space-y-8">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Research Topics</h2>

                    {researchTopics.map((topic) => {
                        const colors = getColorClasses(topic.color)
                        const isExpanded = expandedTopic === topic.id

                        return (
                            <div
                                key={topic.id}
                                className={`bg-gradient-to-br ${colors.gradient} p-8 md:p-12 rounded-[32px] border-2 ${colors.border} shadow-2xl transition-all duration-300 ${isExpanded ? 'ring-4 ring-offset-4 ring-offset-slate-950 ' + colors.border : 'hover:border-opacity-80'
                                    }`}
                            >
                                {/* Topic Header */}
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                                    <div className="flex items-start gap-6">
                                        <div className={`${colors.bg} p-6 rounded-2xl w-20 h-20 flex items-center justify-center ${colors.text} shrink-0`}>
                                            {topic.icon}
                                        </div>
                                        <div>
                                            <h3 className={`text-3xl md:text-4xl font-black ${colors.text} mb-3`}>
                                                {topic.title}
                                            </h3>
                                            <p className="text-lg text-slate-300 leading-relaxed">
                                                {topic.focus}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                                        className={`flex items-center gap-3 px-6 py-3 ${colors.bg} ${colors.text} rounded-xl hover:bg-opacity-80 transition-all font-bold text-lg border-2 ${colors.border} whitespace-nowrap`}
                                        aria-expanded={isExpanded}
                                        aria-label={isExpanded ? 'Collapse roadmap' : 'Expand roadmap'}
                                    >
                                        {isExpanded ? (
                                            <>
                                                <ChevronUp size={24} />
                                                Hide Roadmap
                                            </>
                                        ) : (
                                            <>
                                                <ChevronDown size={24} />
                                                View Roadmap
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Expanded Content */}
                                {isExpanded && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                                        {/* 5 Phases */}
                                        <div className="space-y-6">
                                            {topic.phases.map((phase) => (
                                                <div
                                                    key={phase.phase}
                                                    className="bg-slate-950/50 p-6 md:p-8 rounded-2xl border-2 border-slate-700"
                                                >
                                                    <div className="flex items-start gap-4 mb-6">
                                                        <div className={`${colors.bg} ${colors.text} w-12 h-12 rounded-full flex items-center justify-center font-black text-xl shrink-0`}>
                                                            {phase.phase}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="text-2xl font-black text-white mb-2">
                                                                Phase {phase.phase}: {phase.title}
                                                            </h4>
                                                            <div className="flex flex-wrap gap-4 text-sm">
                                                                <span className="text-slate-400">
                                                                    ⏱️ Duration: <strong className="text-white">{phase.duration}</strong>
                                                                </span>
                                                                <span className="text-slate-400">
                                                                    💰 Funding: <strong className="text-emerald-400">{phase.funding}</strong>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                        {/* Outcomes */}
                                                        <div className="bg-slate-900/50 p-6 rounded-xl border border-emerald-700/50">
                                                            <h5 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                                                                <Target size={20} />
                                                                Expected Outcomes
                                                            </h5>
                                                            <ul className="space-y-2">
                                                                {phase.outcomes.map((outcome, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-slate-300">
                                                                        <span className="text-emerald-400 shrink-0">✓</span>
                                                                        <span className="text-sm">{outcome}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* Actions */}
                                                        <div className="bg-slate-900/50 p-6 rounded-xl border border-blue-700/50">
                                                            <h5 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                                                                <Rocket size={20} />
                                                                Action Items
                                                            </h5>
                                                            <ul className="space-y-2">
                                                                {phase.actions.map((action, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-slate-300">
                                                                        <span className="text-blue-400 shrink-0">→</span>
                                                                        <span className="text-sm">{action}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* UG Course */}
                                        <div className={`bg-gradient-to-r ${colors.gradient} p-8 rounded-2xl border-2 ${colors.border}`}>
                                            <div className="flex items-start gap-4">
                                                <GraduationCap size={32} className={colors.text} />
                                                <div className="flex-1">
                                                    <h4 className={`text-2xl font-black ${colors.text} mb-3`}>
                                                        UG Course: {topic.ugCourse.title}
                                                    </h4>
                                                    <p className="text-slate-300 mb-4">
                                                        <strong>Credits:</strong> {topic.ugCourse.credits} | <strong>Duration:</strong> {topic.ugCourse.credits * 15} hours
                                                    </p>
                                                    <div className="space-y-2">
                                                        <h5 className="text-lg font-bold text-white mb-3">Course Modules:</h5>
                                                        {topic.ugCourse.modules.map((module, idx) => (
                                                            <div key={idx} className="bg-slate-950/50 p-4 rounded-xl border border-slate-700">
                                                                <p className="text-slate-300">{module}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </section>

                {/* Summary Statistics */}
                <section className="bg-gradient-to-br from-indigo-900/50 to-slate-900 p-8 md:p-12 rounded-[32px] border-2 border-indigo-500 shadow-2xl">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-8 text-center">
                        5-Year Impact Projection
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-700 text-center">
                            <div className="text-4xl mb-3">📚</div>
                            <div className="text-3xl font-black text-emerald-400 mb-2">140+</div>
                            <div className="text-slate-300">Publications</div>
                        </div>
                        <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-700 text-center">
                            <div className="text-4xl mb-3">💰</div>
                            <div className="text-3xl font-black text-emerald-400 mb-2">₹15-20 Cr</div>
                            <div className="text-slate-300">Total Funding</div>
                        </div>
                        <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-700 text-center">
                            <div className="text-4xl mb-3">🎓</div>
                            <div className="text-3xl font-black text-emerald-400 mb-2">500+</div>
                            <div className="text-slate-300">Students Trained</div>
                        </div>
                        <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-700 text-center">
                            <div className="text-4xl mb-3">🤝</div>
                            <div className="text-3xl font-black text-emerald-400 mb-2">25+</div>
                            <div className="text-slate-300">Industry Partners</div>
                        </div>
                    </div>
                </section>

                {/* Research Demonstrations CTA */}
                <section className="bg-gradient-to-br from-purple-900/50 to-slate-900 p-8 md:p-12 rounded-[32px] border-2 border-purple-500 shadow-2xl text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                        📐 Step-by-Step Research Demonstrations
                    </h2>
                    <p className="text-xl text-slate-300 mb-4 max-w-3xl mx-auto">
                        Explore each research topic with full Input → Processing → Output visualisation, equations with term interpretation, illustrations, and NEP 2020 learn-by-doing activities.
                    </p>
                    <p className="text-base text-slate-400 mb-8 max-w-2xl mx-auto">
                        Covers: Grover&apos;s Search, Quantum Error Correction, Variational Quantum Classifier, BB84 Protocol, QAOA Max-Cut, and VQE Molecular Simulation.
                    </p>
                    <Link
                        href="/research/demos"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-purple-600 hover:bg-purple-500 text-white text-2xl font-black rounded-2xl shadow-xl transition-all hover:scale-105 border-b-6 border-purple-800"
                    >
                        View Demonstrations →
                    </Link>
                </section>

                {/* Call to Action */}
                <section className="bg-gradient-to-br from-cyan-900/50 to-slate-900 p-8 md:p-12 rounded-[32px] border-2 border-cyan-500 shadow-2xl text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                        Ready to Start Your Quantum Journey?
                    </h2>
                    <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                        Begin with our interactive learning modules to understand quantum computing fundamentals, then explore the research opportunities.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/modules/1"
                            className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white text-xl font-black rounded-2xl shadow-xl transition-all hover:scale-105"
                        >
                            Start Learning
                        </Link>
                        <Link
                            href="/"
                            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xl font-bold rounded-2xl transition-all"
                        >
                            Back to Home
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    )
}
