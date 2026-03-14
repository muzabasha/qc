'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrainCircuit, Play, RotateCcw, Settings2, Sliders, TrendingUp, Cpu, Info, BarChart3, Binary, RefreshCw, Target } from 'lucide-react'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface DataPoint {
  x: number
  y: number
  label: 0 | 1
}

const QuantumMLLab = () => {
    const [datasetType, setDatasetType] = useState<'linear' | 'circle'>('circle')
    const [numPoints, setNumPoints] = useState(40)
    const [learningRate, setLearningRate] = useState(0.1)
    const [trainingStep, setTrainingStep] = useState(0)
    const [theta, setTheta] = useState(0) // Variational parameter
    const [history, setHistory] = useState<{ step: number; loss: number; accuracy: number }[]>([])
    const [isTraining, setIsTraining] = useState(false)
    const [showInfo, setShowInfo] = useState(false)

    // Generate Dataset
    const dataset = useMemo(() => {
        const points: DataPoint[] = []
        for (let i = 0; i < numPoints; i++) {
            const x = Math.random() * 2 - 1
            const y = Math.random() * 2 - 1
            let label: 0 | 1 = 0
            
            if (datasetType === 'linear') {
                label = y > x ? 1 : 0
            } else {
                label = (x * x + y * y) < 0.4 ? 1 : 0
            }
            
            points.push({ x, y, label })
        }
        return points
    }, [datasetType, numPoints])

    // Quantum Model: Simplified VQC
    // Feature Map: Rz(y)Ry(x)|0>
    // Ansatz: Ry(theta)
    // Prediction: Probability of measuring |1>
    const predict = (x: number, y: number, currentTheta: number) => {
        // Simplified mapping for visualization:
        // Probability = sin^2((x + y + theta)/2)
        // In real VQC this is much more complex involving Hilbert space
        const val = (Math.sin((x + y + currentTheta))) ** 2
        return val > 0.5 ? 1 : 0
    }

    const calculateMetrics = (currentTheta: number) => {
        let correct = 0
        let totalLoss = 0
        
        dataset.forEach(p => {
            const prob = (Math.sin((p.x + p.y + currentTheta))) ** 2
            const pred = prob > 0.5 ? 1 : 0
            if (pred === p.label) correct++
            totalLoss += Math.pow(prob - p.label, 2)
        })

        return {
            accuracy: (correct / dataset.length) * 100,
            loss: totalLoss / dataset.length
        }
    }

    const trainOneStep = () => {
        // Simple Gradient Descent Approximation
        const delta = 0.01
        const metricsNow = calculateMetrics(theta)
        const metricsPlus = calculateMetrics(theta + delta)
        
        const gradient = (metricsPlus.loss - metricsNow.loss) / delta
        const newTheta = theta - learningRate * gradient
        
        setTheta(newTheta)
        setTrainingStep(prev => prev + 1)
        setHistory(prev => [...prev, { step: trainingStep + 1, loss: metricsNow.loss, accuracy: metricsNow.accuracy }].slice(-20))
    }

    useEffect(() => {
        let interval: any
        if (isTraining) {
            interval = setInterval(() => {
                trainOneStep()
                if (trainingStep > 50) setIsTraining(false)
            }, 100)
        }
        return () => clearInterval(interval)
    }, [isTraining, theta, trainingStep])

    const resetTraining = () => {
        setTheta(Math.random() * Math.PI)
        setTrainingStep(0)
        setHistory([])
        setIsTraining(false)
    }

    return (
        <div className="bg-slate-900/50 rounded-3xl border border-purple-500/30 overflow-hidden shadow-2xl backdrop-blur-xl">
            <div className="p-8 border-b border-purple-500/20 bg-purple-500/5 flex justify-between items-center">
                <div>
                    <h3 className="text-2xl font-black text-purple-400 flex items-center gap-3">
                        <BrainCircuit size={28} />
                        Quantum AI Lab: Variational Classifier
                    </h3>
                    <p className="text-slate-400 font-medium tracking-tight">Learn by Doing: Train a quantum circuit to recognize patterns.</p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={() => setShowInfo(!showInfo)}
                        className="p-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all border border-slate-700"
                    >
                        <Info size={24} />
                    </button>
                    <button 
                        onClick={() => setIsTraining(!isTraining)}
                        className={`px-8 py-3 font-black rounded-xl shadow-lg transition-all flex items-center gap-3 border-b-6 active:border-b-0 active:translate-y-2 uppercase tracking-wider text-sm ${isTraining ? 'bg-red-600 border-red-900 text-white shadow-red-900/40' : 'bg-purple-600 border-purple-800 hover:bg-purple-500 text-white shadow-purple-900/40'}`}
                    >
                        {isTraining ? <RefreshCw size={20} className="animate-spin" /> : <Play size={20} fill="currentColor" />}
                        {isTraining ? 'Training Circuit...' : 'Solve with QML'}
                    </button>
                    <button 
                        onClick={resetTraining}
                        className="p-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all border border-slate-700 hover:scale-110 active:scale-90"
                        title="Reset Parameters"
                    >
                        <RotateCcw size={24} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden lg:h-[700px]">
                {/* Left: Controls & Equations */}
                <div className="lg:col-span-3 p-6 border-r border-slate-800 space-y-8 bg-slate-900/80 overflow-y-auto">
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] flex items-center gap-2">
                            <Settings2 size={12} />
                            Hyperparameters
                        </h4>

                        <div className="space-y-3 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                            <label className="text-[10px] text-slate-500 font-black uppercase">Model Topology</label>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => { setDatasetType('circle'); resetTraining(); }}
                                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl border-2 transition-all ${datasetType === 'circle' ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-slate-800 border-transparent text-slate-500 hover:text-slate-300'}`}
                                >
                                    Circle
                                </button>
                                <button 
                                    onClick={() => { setDatasetType('linear'); resetTraining(); }}
                                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl border-2 transition-all ${datasetType === 'linear' ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-slate-800 border-transparent text-slate-500 hover:text-slate-300'}`}
                                >
                                    Linear
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                            <label className="text-[10px] text-slate-500 font-black uppercase flex justify-between">
                                Learning Rate <span className="text-purple-400">{learningRate}</span>
                            </label>
                            <input 
                                type="range" 
                                min="0.01" 
                                max="0.5" 
                                step="0.01"
                                value={learningRate} 
                                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                        </div>

                        <div className="space-y-3 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                            <label className="text-[10px] text-slate-500 font-black uppercase flex justify-between">
                                Feature Maps <span className="text-purple-400">{numPoints} pts</span>
                            </label>
                            <input 
                                type="range" 
                                min="20" 
                                max="100" 
                                value={numPoints} 
                                onChange={(e) => setNumPoints(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-800 space-y-4">
                        <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] flex items-center gap-2">
                            <Binary size={12} />
                            VQC Topology
                        </h4>
                        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs shadow-inner">
                            <p className="text-indigo-400 mb-2">// Prediction Mapping</p>
                            <BlockMath math={"y = \\text{sgn}\\left(\\langle \\psi | \hat{O} | \\psi \\rangle\\right)"} />
                            <p className="text-slate-500 mt-2 text-[10px]">Measuring expectation value on Z-axis.</p>
                        </div>
                    </div>
                </div>

                {/* Middle: Visualization */}
                <div className="lg:col-span-6 p-8 relative flex flex-col items-center justify-center bg-slate-950/40">
                    <div className="relative w-full aspect-square max-w-[450px] bg-slate-900 shadow-2xl rounded-3xl border-4 border-slate-800/50 p-2 overflow-hidden group/viz">
                        
                        {/* Heatmap Decision Boundary */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none">
                            <div 
                                className="w-full h-full transition-all duration-700 ease-out scale-150" 
                                style={{ 
                                    background: datasetType === 'circle' 
                                        ? `radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.8) ${30 + (theta*10)}%, rgba(59, 130, 246, 0.8) ${60 + (theta*10)}%)`
                                        : `linear-gradient(${45 + (theta * 20)}deg, rgba(168, 85, 247, 0.8) 50%, rgba(59, 130, 246, 0.8) 50%)`
                                }}
                            />
                        </div>

                        <svg viewBox="-1.2 -1.2 2.4 2.4" className="w-full h-full relative z-10">
                            {/* Grid Dots */}
                            {[...Array(11)].map((_, i) => (
                                [...Array(11)].map((_, j) => (
                                    <circle 
                                        key={`${i}-${j}`} 
                                        cx={-1 + i * 0.2} 
                                        cy={-1 + j * 0.2} 
                                        r="0.005" 
                                        fill="#334155" 
                                    />
                                ))
                            ))}
                            
                            {/* Data Points */}
                            {dataset.map((p, i) => {
                                const pred = predict(p.x, p.y, theta)
                                const isCorrect = pred === p.label
                                return (
                                    <motion.g key={i}>
                                        <motion.circle 
                                            cx={p.x}
                                            cy={p.y}
                                            r="0.045"
                                            fill={p.label === 1 ? '#a855f7' : '#3b82f6'}
                                            initial={{ scale: 0 }}
                                            animate={{ 
                                                scale: 1, 
                                                opacity: isCorrect ? 1 : 0.3,
                                            }}
                                            transition={{ delay: i * 0.005 }}
                                        />
                                        {!isCorrect && (
                                            <motion.circle 
                                                cx={p.x}
                                                cy={p.y}
                                                r="0.06"
                                                fill="none"
                                                stroke="#ef4444"
                                                strokeWidth="0.015"
                                                animate={{ scale: [0.8, 1.2, 0.8] }}
                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                            />
                                        )}
                                    </motion.g>
                                )
                            })}
                        </svg>

                        <div className="absolute top-6 left-6 flex items-center gap-3">
                            <div className="px-4 py-1.5 bg-slate-950/90 rounded-full border border-slate-700 text-[10px] font-black text-purple-400 tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                                PARAMETER_THETA: {theta.toFixed(4)}
                            </div>
                        </div>

                        <div className="absolute bottom-6 inset-x-6 flex justify-between items-end">
                            <div className="space-y-1">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ground Truth Model</span>
                                <div className="text-xs text-white font-bold opacity-40 italic">{datasetType === 'circle' ? 'Non-Linear Hilbert Space' : 'Linear Feature Map'}</div>
                            </div>
                            <div className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em] group-hover/viz:text-purple-500/50 transition-colors">
                                Quantum Prediction Mesh
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Metrics & Stats */}
                <div className="lg:col-span-3 p-6 border-l border-slate-800 bg-slate-900/80 flex flex-col justify-between overflow-y-auto">
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <TrendingUp size={12} />
                                Performance Audit
                            </h4>
                            <div className="space-y-4">
                                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-xl group/card">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">Mean Accuracy</p>
                                        <div className="bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20">
                                            <Target size={14} className="text-emerald-500" />
                                        </div>
                                    </div>
                                    <p className="text-4xl font-black text-white group-hover/card:text-emerald-400 transition-colors">{calculateMetrics(theta).accuracy.toFixed(1)}%</p>
                                    <div className="mt-4 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                                        <motion.div 
                                            className="h-full bg-emerald-500"
                                            animate={{ width: `${calculateMetrics(theta).accuracy}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-xl group/card">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">Cost Function (Loss)</p>
                                        <div className="bg-red-500/10 p-1.5 rounded-lg border border-red-500/20">
                                            <BarChart3 size={14} className="text-red-500" />
                                        </div>
                                    </div>
                                    <p className="text-4xl font-black text-white group-hover/card:text-red-400 transition-colors">{calculateMetrics(theta).loss.toFixed(3)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="animate-in fade-in slide-in-from-bottom-4">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <BarChart3 size={12} />
                                Training Delta
                            </h4>
                            <div className="h-40 flex items-end gap-1.5 px-2 bg-slate-950/50 rounded-2xl border border-slate-800 p-4 shadow-inner">
                                {history.map((h, i) => (
                                    <div 
                                        key={i}
                                        className="bg-purple-500/60 w-full rounded-full transition-all hover:bg-purple-400"
                                        style={{ height: `${(1 - Math.min(1, h.loss)) * 100}%` }}
                                        title={`Step ${h.step}: Loss ${h.loss.toFixed(3)}`}
                                    />
                                ))}
                                {history.length === 0 && <div className="text-slate-800 text-[10px] w-full text-center pb-8 italic font-black uppercase tracking-widest opacity-30">Waiting for Data...</div>}
                            </div>
                            <div className="flex justify-between text-[8px] text-slate-700 mt-3 font-black uppercase tracking-[0.2em]">
                                <span>Epoch 0</span>
                                <span>Step {trainingStep}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-900/20 border-l-4 border-indigo-500 p-5 rounded-xl mt-8">
                        <div className="flex items-center gap-3 mb-2">
                            <Cpu size={16} className="text-indigo-400" />
                            <h5 className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Experiential Insight</h5>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                            Quantum model explores patterns in <span className="text-white font-bold">Infinite Resolution</span> because it processes information as vector rotations, not just raw pixel bits.
                        </p>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showInfo && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-purple-950/40 border-t border-purple-500/30 p-8 overflow-hidden"
                    >
                        <div className="max-w-4xl mx-auto space-y-6">
                            <h4 className="text-2xl font-black text-purple-300">Experiential Learning: Quantum Supremacy in AI</h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                In this lab, you are training a <strong className="text-white">Variational Quantum Classifier (VQC)</strong>. Unlike classical neural networks that use weights and biases, VQCs use <strong className="text-white">rotation angles (<InlineMath math="\theta" />)</strong> on quantum gates. 
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300 text-sm">
                                <div className="space-y-4">
                                    <p className="border-l-2 border-purple-500 pl-4">
                                        <strong className="text-white block mb-1">1. Encoding (Feature Map)</strong>
                                        Your 2D data (x, y) is mapped to the surface of a Bloch Sphere using quantum gates. This "embeds" the data into a high-dimensional quantum space.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <p className="border-l-2 border-purple-500 pl-4">
                                        <strong className="text-white block mb-1">2. Optimization (Ansatz)</strong>
                                        The "Ansatz" is the trainable part. When you click "Start Training", a hybrid classical-quantum optimizer adjusts the gate rotation to maximize the separation between colors.
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

export default QuantumMLLab
