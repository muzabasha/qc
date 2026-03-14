'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Beaker, RotateCcw, Play, Info, Settings, Wind, Thermometer, FlaskConical } from 'lucide-react'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

const DrugDiscoveryLab = () => {
    const [molecule, setMolecule] = useState<'H2' | 'LiH' | 'H2O'>('H2')
    const [bondLength, setBondLength] = useState(0.74) // Angstroms
    const [isSimulating, setIsSimulating] = useState(false)
    const [noiseLevel, setNoiseLevel] = useState(0.01)
    const [showInfo, setShowInfo] = useState(false)
    const [simData, setSimData] = useState<{ x: number; y: number }[]>([])

    // Physics constants for simulated Potential Energy Surface (Morse Potential)
    const getEnergy = (r: number, mol: string) => {
        const params: any = {
            'H2': { De: 4.75, a: 1.44, re: 0.74, shift: -31.6 },
            'LiH': { De: 2.52, a: 1.12, re: 1.59, shift: -24.8 },
            'H2O': { De: 5.1, a: 1.8, re: 0.96, shift: -76.0 }
        }
        const { De, a, re, shift } = params[mol]
        // Morse Potential: V(r) = De(1 - exp(-a(r-re)))^2 + shift
        const energy = De * Math.pow(1 - Math.exp(-a * (r - re)), 2) + shift
        return energy + (Math.random() - 0.5) * noiseLevel
    }

    const runVQE = () => {
        setIsSimulating(true)
        setSimData([])
        let i = 0
        const interval = setInterval(() => {
            const r = 0.2 + (i * 0.1)
            if (r > 4.0) {
                clearInterval(interval)
                setIsSimulating(false)
                return
            }
            const e = getEnergy(r, molecule)
            setSimData(prev => [...prev, { x: r, y: e }])
            i++
        }, 100)
    }

    const currentEnergy = useMemo(() => getEnergy(bondLength, molecule), [bondLength, molecule, noiseLevel])

    return (
        <div className="bg-slate-900/50 rounded-3xl border border-blue-500/30 overflow-hidden shadow-2xl backdrop-blur-xl">
            <div className="p-8 border-b border-blue-500/20 bg-blue-500/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-2xl font-black text-blue-400 flex items-center gap-3">
                        <Beaker size={28} />
                        Drug Discovery Lab: VQE Molecular Solver
                    </h3>
                    <p className="text-slate-400 font-medium tracking-tight">Learn by Doing: Find the stable configuration of molecules using VQE.</p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={() => setShowInfo(!showInfo)}
                        className="p-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all border border-slate-700"
                    >
                        <Info size={24} />
                    </button>
                    <button 
                        onClick={runVQE}
                        disabled={isSimulating}
                        className={`px-6 py-3 font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 border-b-4 ${isSimulating ? 'bg-slate-700 border-slate-900 text-slate-500' : 'bg-blue-600 border-blue-800 hover:bg-blue-500 text-white'}`}
                    >
                        <Activity size={20} className={isSimulating ? 'animate-pulse' : ''} />
                        {isSimulating ? 'Computing Surface...' : 'Map Potential Energy'}
                    </button>
                    <button 
                        onClick={() => { setSimData([]); setBondLength(0.74); }}
                        className="p-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all border border-slate-700"
                        title="Reset"
                    >
                        <RotateCcw size={24} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 h-[650px]">
                {/* Controls */}
                <div className="lg:col-span-3 p-6 border-r border-slate-800 space-y-8 bg-slate-900/80 overflow-y-auto">
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                            <Settings size={16} />
                            Molecular Settings
                        </h4>

                        <div className="space-y-3">
                            <label className="text-xs text-slate-500 font-bold uppercase">Compound</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['H2', 'LiH', 'H2O'].map(m => (
                                    <button 
                                        key={m}
                                        onClick={() => { setMolecule(m as any); setSimData([]); }}
                                        className={`py-2 text-xs font-bold rounded-lg border-2 transition-all ${molecule === m ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-slate-800 border-transparent text-slate-500'}`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-slate-400 flex justify-between">
                                Bond Distance <span>{bondLength} Å</span>
                            </label>
                            <input 
                                type="range" 
                                min="0.2" 
                                max="4.0" 
                                step="0.01"
                                value={bondLength} 
                                onChange={(e) => setBondLength(parseFloat(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-slate-400 flex justify-between">
                                Quantum Noise <span>{(noiseLevel * 100).toFixed(1)}%</span>
                            </label>
                            <input 
                                type="range" 
                                min="0" 
                                max="0.1" 
                                step="0.01"
                                value={noiseLevel} 
                                onChange={(e) => setNoiseLevel(parseFloat(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500/50"
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-800 space-y-4">
                        <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                            <Wind size={16} />
                            The Hamiltonian
                        </h4>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[10px] overflow-x-auto">
                            <p className="text-indigo-400 mb-2">// Molecular Energy</p>
                            <BlockMath math={"\hat{H} = -\sum \frac{\nabla^2}{2m} + V(r)"} />
                            <div className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                                <p>Quantum computers find the lowest eigenvalue of this operator, which corresponds to the molecule's most stable state.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visualization */}
                <div className="lg:col-span-6 p-8 bg-slate-950/40 relative flex flex-col items-center justify-center">
                    {/* Molecule Visualizer Container */}
                    <div className="relative w-full aspect-square max-w-[480px] bg-slate-900 shadow-2xl rounded-[3rem] border-4 border-slate-800/50 p-6 overflow-hidden group/mol mb-6">
                        <div className="absolute inset-0 bg-radial-gradient from-blue-500/5 to-transparent opacity-50" />
                        
                        <div className="h-full flex flex-col">
                            <div className="flex-1 flex items-center justify-center relative">
                                <svg viewBox="-100 -100 200 200" className="w-full h-full">
                                    <defs>
                                        <radialGradient id="atomH" cx="30%" cy="30%" r="50%">
                                            <stop offset="0%" stopColor="#93c5fd" />
                                            <stop offset="100%" stopColor="#1e40af" />
                                        </radialGradient>
                                        <radialGradient id="atomLi" cx="30%" cy="30%" r="50%">
                                            <stop offset="0%" stopColor="#fca5a5" />
                                            <stop offset="100%" stopColor="#991b1b" />
                                        </radialGradient>
                                        <radialGradient id="atomO" cx="30%" cy="30%" r="50%">
                                            <stop offset="0%" stopColor="#fcd34d" />
                                            <stop offset="100%" stopColor="#b45309" />
                                        </radialGradient>
                                        <filter id="shadow">
                                            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.5" />
                                        </filter>
                                    </defs>

                                    {/* Bond Line with Glow */}
                                    <motion.line 
                                        x1={-bondLength * 40} y1="0"
                                        x2={molecule === 'H2O' ? 0 : bondLength * 40} y2="0"
                                        stroke="#475569" strokeWidth="6" strokeLinecap="round"
                                        animate={{ stroke: Math.abs(currentEnergy % 1) < 0.2 ? '#60a5fa' : '#475569' }}
                                    />

                                    {/* Atoms */}
                                    {/* Atom 1 (Always H for these) */}
                                    <motion.g animate={{ x: -bondLength * 40 }}>
                                        <circle r="25" fill="url(#atomH)" filter="url(#shadow)" />
                                        <text y="5" textAnchor="middle" fill="white" fontWeight="black" fontSize="12" className="select-none pointer-events-none">H</text>
                                    </motion.g>

                                    {/* Atom 2 (Compound specific) */}
                                    <motion.g animate={{ x: molecule === 'H2O' ? 0 : bondLength * 40 }}>
                                        <circle r={molecule === 'H2' ? 25 : 35} 
                                                fill={molecule === 'H2' ? 'url(#atomH)' : molecule === 'LiH' ? 'url(#atomLi)' : 'url(#atomO)'} 
                                                filter="url(#shadow)" />
                                        <text y="5" textAnchor="middle" fill="white" fontWeight="black" fontSize="12" className="select-none pointer-events-none">
                                            {molecule === 'H2' ? 'H' : molecule === 'LiH' ? 'Li' : 'O'}
                                        </text>
                                    </motion.g>

                                    {molecule === 'H2O' && (
                                        <motion.g animate={{ x: bondLength * 40, y: bondLength * 40 }}>
                                            <line x1="-40" y1="-40" x2="0" y2="0" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
                                            <circle r="25" fill="url(#atomH)" filter="url(#shadow)" />
                                            <text y="5" textAnchor="middle" fill="white" fontWeight="black" fontSize="12" className="select-none pointer-events-none">H</text>
                                        </motion.g>
                                    )}
                                </svg>
                            </div>

                            {/* Chart Overlay (PES) */}
                            <div className="h-28 bg-slate-950/60 backdrop-blur-md rounded-2xl border border-slate-800/50 p-3 relative font-mono overflow-hidden">
                                <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                                    {/* PES Curve Path */}
                                    <path 
                                        d="M 5 5 C 15 35 30 35 95 36" 
                                        fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" strokeDasharray="1 2"
                                    />
                                    {/* Data points */}
                                    {simData.map((d, i) => (
                                        <circle key={i} cx={(d.x / 4) * 100} cy={35 - (Math.abs(d.y % 30))} r="0.5" fill="#3b82f6" />
                                    ))}
                                    {/* Current Marker */}
                                    <motion.circle 
                                        cx={(bondLength / 4) * 100} 
                                        cy={35 - (Math.abs(currentEnergy % 30))} 
                                        r="2" fill="#f59e0b" filter="url(#glow)"
                                        animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }}
                                    />
                                </svg>
                                <div className="absolute top-2 left-4 text-[7px] text-slate-600 font-black uppercase tracking-widest">Potential Energy Surface</div>
                            </div>
                        </div>

                        <div className="absolute top-8 right-8">
                            <div className="px-4 py-1.5 bg-slate-950/90 rounded-xl border border-slate-800 text-[10px] font-black text-blue-400 tracking-tighter flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-blue-500 animate-pulse' : 'bg-slate-700'}`} />
                                SIM_ENGINE: {isSimulating ? 'ACTIVE' : 'READY'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Metrics */}
                <div className="lg:col-span-3 p-8 border-l border-slate-800 bg-slate-900/80 flex flex-col justify-between overflow-y-auto">
                    <div className="space-y-10">
                        <div>
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Simulated Quantum State</h4>
                            <div className="space-y-6">
                                <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl group/card">
                                    <p className="text-[9px] text-slate-500 font-black uppercase mb-1">Electronic Energy</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-4xl font-black text-white group-hover/card:text-blue-400 transition-colors uppercase tracking-tighter">
                                            {currentEnergy.toFixed(4)}
                                        </p>
                                        <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Ha</span>
                                    </div>
                                </div>
                                <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
                                    <p className="text-[9px] text-slate-500 font-black uppercase mb-3">System Stability</p>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 h-3 bg-slate-900 rounded-full overflow-hidden p-0.5">
                                            <motion.div 
                                                className={`h-full rounded-full ${Math.abs(bondLength - 0.74) < 0.2 ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-amber-500'}`}
                                                animate={{ width: `${Math.max(5, 100 - Math.abs(bondLength - 0.74)*50)}%` }}
                                            />
                                        </div>
                                        <span className={`text-[10px] font-black ${Math.abs(bondLength - 0.74) < 0.2 ? 'text-emerald-400' : 'text-amber-500'}`}>
                                            {Math.abs(bondLength - 0.74) < 0.2 ? 'STABLE' : 'UNSTABLE'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-900/10 border-l-4 border-blue-500 p-6 rounded-2xl space-y-4">
                            <h5 className="text-[10px] font-black text-blue-300 uppercase tracking-widest flex items-center gap-2">
                                <Activity size={14} />
                                Experiential Learning
                            </h5>
                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                Quantum computers simulate <span className="text-white font-bold italic">Electromagnetic Interactions</span> between atoms without the massive approximations classical supercomputers require.
                            </p>
                            <div className="pt-2">
                                <span className="text-[9px] px-2 py-1 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 font-black uppercase">NEP 2020: Interdisciplinary Science</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-[9px] text-slate-700 font-black uppercase tracking-[0.2em] text-center mt-8">
                        Quantum Chemistry Lab 2.0
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showInfo && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-blue-950/40 border-t border-blue-500/30 p-8 overflow-hidden"
                    >
                        <div className="max-w-4xl mx-auto space-y-6">
                            <h4 className="text-2xl font-black text-blue-300">VQE: The Heart of Quantum Chemistry</h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                The **Variational Quantum Eigensolver (VQE)** is a hybrid algorithm used to find the "Ground State" energy of a molecule. In drug discovery, the ground state is the most energy-efficient and stable configuration.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300 text-sm">
                                <div className="space-y-4">
                                    <p className="border-l-2 border-blue-500 pl-4">
                                        <strong className="text-white block mb-1">The Potential Energy Surface</strong>
                                        By mapping how the energy changes as you move atoms (<strong className="text-white">Bond Distance</strong>), researchers can predict how drugs will bind to target proteins.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <p className="border-l-2 border-blue-500 pl-4">
                                        <strong className="text-white block mb-1">Parameter Optimization</strong>
                                        VQE uses a quantum circuit to prepare a state and a classical optimizer to update variables until the minimum energy is reached – just like you are doing by moving the slider!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default DrugDiscoveryLab
