'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, Zap, RotateCcw, Play, Info, Settings, MousePointer2, TrendingDown, Target } from 'lucide-react'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface City {
    id: number
    x: number
    y: number
}

const OptimizationLab = () => {
    const [cities, setCities] = useState<City[]>([
        { id: 1, x: 20, y: 30 },
        { id: 2, x: 70, y: 20 },
        { id: 3, x: 80, y: 80 },
        { id: 4, x: 40, y: 90 },
        { id: 5, x: 30, y: 60 }
    ])
    const [isOptimizing, setIsOptimizing] = useState(false)
    const [tunnelingStrength, setTunnelingStrength] = useState(0.5)
    const [iterations, setIterations] = useState(0)
    const [bestRoute, setBestRoute] = useState<number[]>([1, 2, 3, 4, 5])
    const [bestDistance, setBestDistance] = useState<number>(0)
    const [currentDistance, setCurrentDistance] = useState<number>(0)
    const [showInfo, setShowInfo] = useState(false)

    // Calculate distance between two cities
    const dist = (c1: City, c2: City) => {
        return Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2))
    }

    // Calculate total route distance
    const calcTotalDist = useCallback((route: number[]) => {
        let total = 0
        for (let i = 0; i < route.length; i++) {
            const from = cities.find(c => c.id === route[i])
            const to = cities.find(c => c.id === route[(i + 1) % route.length])
            if (from && to) total += dist(from, to)
        }
        return total
    }, [cities])

    // Initialize distance
    useEffect(() => {
        const d = calcTotalDist(bestRoute)
        setBestDistance(d)
        setCurrentDistance(d)
    }, [cities, calcTotalDist])

    // Simulated Quantum Annealing Step
    const runAnnealingStep = () => {
        const newRoute = [...bestRoute]
        // Random swap
        const idx1 = Math.floor(Math.random() * newRoute.length)
        const idx2 = Math.floor(Math.random() * newRoute.length)
        const temp = newRoute[idx1]
        newRoute[idx1] = newRoute[idx2]
        newRoute[idx2] = temp

        const newDist = calcTotalDist(newRoute)
        setCurrentDistance(newDist)

        // Quantum-inspired acceptance: allows "tunneling" through local minima
        const delta = newDist - bestDistance
        const acceptanceProb = Math.exp(-delta / (tunnelingStrength * 10))

        if (newDist < bestDistance || Math.random() < (acceptanceProb * 0.1)) {
            setBestRoute(newRoute)
            setBestDistance(newDist)
        }
        
        setIterations(prev => prev + 1)
    }

    useEffect(() => {
        let interval: any
        if (isOptimizing && iterations < 200) {
            interval = setInterval(runAnnealingStep, 50)
        } else if (iterations >= 200) {
            setIsOptimizing(false)
        }
        return () => clearInterval(interval)
    }, [isOptimizing, iterations, bestRoute, bestDistance, tunnelingStrength])

    const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
        if (cities.length >= 10 || isOptimizing) return
        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        
        const newCity = { id: Date.now(), x, y }
        setCities(prev => [...prev, newCity])
        setBestRoute(prev => [...prev, newCity.id])
        setIterations(0)
    }

    const resetLab = () => {
        setCities([
            { id: 1, x: 20, y: 30 },
            { id: 2, x: 70, y: 20 },
            { id: 3, x: 80, y: 80 },
            { id: 4, x: 40, y: 90 },
            { id: 5, x: 30, y: 60 }
        ])
        setBestRoute([1, 2, 3, 4, 5])
        setIterations(0)
        setIsOptimizing(false)
    }

    return (
        <div className="bg-slate-900/50 rounded-3xl border border-amber-500/30 overflow-hidden shadow-2xl backdrop-blur-xl">
            <div className="p-8 border-b border-amber-500/20 bg-amber-500/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-2xl font-black text-amber-400 flex items-center gap-3">
                        <Map size={28} />
                        Route Optimization Lab: Quantum Annealing
                    </h3>
                    <p className="text-slate-400 font-medium">Learn by Doing: Solve the Traveling Salesman Problem using Quantum tunneling.</p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={() => setShowInfo(!showInfo)}
                        className="p-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all border border-slate-700"
                    >
                        <Info size={24} />
                    </button>
                    <button 
                        onClick={() => { setIterations(0); setIsOptimizing(!isOptimizing); }}
                        className={`px-6 py-3 font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 border-b-4 ${isOptimizing ? 'bg-red-600 border-red-800' : 'bg-amber-600 border-amber-800 hover:bg-amber-500 text-slate-950'}`}
                    >
                        {isOptimizing ? <Zap size={20} className="animate-pulse" /> : <Play size={20} fill="currentColor" />}
                        {isOptimizing ? 'Optimizing...' : 'Start Annealing'}
                    </button>
                    <button 
                        onClick={resetLab}
                        className="p-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all border border-slate-700"
                        title="Reset Cities"
                    >
                        <RotateCcw size={24} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 h-[650px]">
                {/* Controls */}
                <div className="lg:col-span-3 p-6 border-r border-slate-800 space-y-8 bg-slate-900/80 overflow-y-auto">
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold text-amber-500 uppercase tracking-widest flex items-center gap-2">
                            <Settings size={16} />
                            Simulation Parameters
                        </h4>

                        <div className="space-y-2">
                            <label className="text-sm text-slate-400 flex justify-between">
                                Tunneling Strength <span>{(tunnelingStrength * 10).toFixed(1)}</span>
                            </label>
                            <input 
                                type="range" 
                                min="0.1" 
                                max="1.0" 
                                step="0.1"
                                value={tunnelingStrength} 
                                onChange={(e) => setTunnelingStrength(parseFloat(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                            />
                            <p className="text-[10px] text-slate-500 italic">High strength allows escaping deeper local minima.</p>
                        </div>

                        <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-3">
                            <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-tighter">
                                <MousePointer2 size={12} />
                                Interaction Mode
                            </div>
                            <p>Click on the map to add cities (max 10). The quantum computer will try to find the shortest round trip.</p>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-800 space-y-4">
                        <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                            <Target size={16} />
                            Energy Hamiltonian
                        </h4>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto">
                            <p className="text-indigo-400 mb-2">// Objective Function (Cost)</p>
                            <BlockMath math={"H = \\sum_{i,j} d_{ij} x_{i,p} x_{j,p+1}"} />
                            <div className="text-[10px] text-slate-500 mt-2 space-y-1">
                                <p><strong className="text-white">H:</strong> Total Energy (Distance)</p>
                                <p><strong className="text-white">d:</strong> Distance between city i and j</p>
                                <p><strong className="text-white">x:</strong> Binary variable (Is city i at pos p?)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Visualization */}
                <div className="lg:col-span-6 p-8 bg-slate-950/40 relative flex flex-col items-center justify-center">
                    <div className="relative w-full h-full max-w-[500px] aspect-square bg-slate-900 shadow-2xl rounded-[3rem] border-4 border-slate-800/50 p-2 overflow-hidden group cursor-crosshair">
                        <svg 
                            viewBox="0 0 100 100" 
                            className="w-full h-full relative z-10"
                            onClick={handleCanvasClick}
                        >
                            <defs>
                                <radialGradient id="cityGlow" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                                </radialGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            
                            {/* Quantum Flux Background Pattern */}
                            {[...Array(5)].map((_, i) => (
                                <motion.circle
                                    key={`flux-${i}`}
                                    cx="50"
                                    cy="50"
                                    r={10 + i * 15}
                                    fill="none"
                                    stroke="#f59e0b"
                                    strokeWidth="0.05"
                                    strokeDasharray="1 10"
                                    opacity="0.1"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
                                />
                            ))}

                            {/* Current Best Route with Glow */}
                            <motion.path 
                                d={`M ${bestRoute.map(id => {
                                    const c = cities.find(city => city.id === id)
                                    return c ? `${c.x},${c.y}` : ''
                                }).join(' L ')} Z`}
                                fill="rgba(245, 158, 11, 0.03)"
                                stroke="#f59e0b"
                                strokeWidth="0.8"
                                strokeLinejoin="round"
                                filter="url(#glow)"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            />

                            {/* Tentative/Searching Connection (Faint) */}
                            {isOptimizing && (
                                <motion.line 
                                    x1={cities[0]?.x} y1={cities[0]?.y}
                                    x2={cities[1]?.x} y2={cities[1]?.y}
                                    stroke="#f59e0b"
                                    strokeWidth="0.1"
                                    strokeDasharray="1 1"
                                    opacity="0.3"
                                />
                            )}

                            {/* Cities with Markers */}
                            {cities.map((city, idx) => (
                                <g key={city.id}>
                                    <circle 
                                        cx={city.x} 
                                        cy={city.y} 
                                        r="6" 
                                        fill="url(#cityGlow)"
                                    />
                                    <motion.circle 
                                        cx={city.x} 
                                        cy={city.y} 
                                        r="2.5" 
                                        fill="#f59e0b"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        whileHover={{ scale: 1.5 }}
                                        className="shadow-lg"
                                    />
                                    <text 
                                        x={city.x} 
                                        y={city.y - 4} 
                                        fontSize="3" 
                                        fontWeight="black" 
                                        fill="#78350f" 
                                        textAnchor="middle"
                                        className="pointer-events-none select-none"
                                    >
                                        {String.fromCharCode(65 + idx)}
                                    </text>
                                    <text 
                                        x={city.x} 
                                        y={city.y - 4} 
                                        fontSize="3" 
                                        fontWeight="black" 
                                        fill="#f59e0b" 
                                        textAnchor="middle"
                                        opacity="0.8"
                                        className="pointer-events-none select-none blur-[0.5px]"
                                    >
                                        {String.fromCharCode(65 + idx)}
                                    </text>
                                </g>
                            ))}
                        </svg>

                        {/* Top Badge: System Status */}
                        <div className="absolute top-8 left-8 flex flex-col gap-2">
                            {isOptimizing && (
                            <motion.div 
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="px-5 py-2 bg-amber-500/10 backdrop-blur-xl rounded-2xl border border-amber-500/40 text-[10px] font-black text-amber-500 flex items-center gap-3 shadow-2xl"
                            >
                                <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                                QUANTUM_SEARCH_ACTIVE: {((iterations/200)*100).toFixed(0)}%
                            </motion.div>
                            )}
                            <div className="px-4 py-1.5 bg-slate-950/80 backdrop-blur-md rounded-xl border border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                Cities: {cities.length} / 10
                            </div>
                        </div>
                        
                        <div className="absolute bottom-8 right-8 text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] group-hover:text-amber-500/40 transition-colors">
                            Multiverse Expansion Mapping
                        </div>
                    </div>
                </div>

                {/* Metrics */}
                <div className="lg:col-span-3 p-8 border-l border-slate-800 bg-slate-900/80 flex flex-col justify-between overflow-y-auto">
                    <div className="space-y-10">
                        <div>
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <TrendingDown size={12} />
                                Efficiency Metrics
                            </h4>
                            <div className="space-y-6">
                                <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl group/metric relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover/metric:opacity-30 transition-opacity">
                                        <Target size={40} className="text-emerald-500" />
                                    </div>
                                    <p className="text-[9px] text-slate-500 uppercase font-black mb-1 tracking-tighter">Lowest Energy (Best Route)</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-4xl font-black text-white group-hover/metric:text-emerald-400 transition-colors">{(bestDistance).toFixed(1)}</p>
                                        <span className="text-[10px] font-bold text-slate-600 uppercase">Dist</span>
                                    </div>
                                    <div className="mt-4 h-1 bg-slate-900 rounded-full overflow-hidden">
                                        <motion.div 
                                            className="h-full bg-emerald-500"
                                            animate={{ width: isOptimizing ? '100%' : '30%' }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </div>
                                </div>
                                <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl group/metric">
                                    <p className="text-[9px] text-slate-500 uppercase font-black mb-1 tracking-tighter">Current Configuration</p>
                                    <p className="text-4xl font-black text-amber-500 animate-in fade-in">{(currentDistance).toFixed(1)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-indigo-900/10 border-l-4 border-indigo-500/50 p-6 rounded-2xl space-y-4">
                            <h5 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                                <Zap size={14} />
                                Learning Concept
                            </h5>
                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                We are using <span className="text-white font-bold italic">Quantum-Simulated Annealing</span>. By increasing Tunneling Strength, we allow the system to ignore "bad" paths temporarily to find hidden shortcuts.
                            </p>
                            <div className="pt-2">
                                <span className="text-[9px] px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20 font-black uppercase">NEP 2020: Computational Thinking</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showInfo && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-amber-950/40 border-t border-amber-500/30 p-8 overflow-hidden"
                    >
                        <div className="max-w-4xl mx-auto space-y-6">
                            <h4 className="text-2xl font-black text-amber-300">Solving Intractable Problems with Physics</h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                The **Traveling Salesman Problem** is "NP-Hard" – meaning as you add more cities, the number of possible routes grows faster than the number of atoms in the universe. Classical computers must check them one by one.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300 text-sm">
                                <div className="space-y-4">
                                    <p className="border-l-2 border-amber-500 pl-4">
                                        <strong className="text-white block mb-1">The Local Minimum Trap</strong>
                                        In optimization, you often find a path that "looks" good but isn't the best. Classical algorithms get stuck here because they can't climb "energy hills" to find better valleys.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <p className="border-l-2 border-amber-500 pl-4">
                                        <strong className="text-white block mb-1">Quantum Tunneling</strong>
                                        Quantum bits (qubits) can "tunnel" through these hills. By adjusting the <strong className="text-white">Tunneling Strength</strong>, you control how easily the system can jump through obstacles to find the true global shortest path.
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

export default OptimizationLab
