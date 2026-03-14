'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ShieldAlert, ShieldCheck, Cpu, RefreshCw, Info, Settings, Play, Layers, X } from 'lucide-react'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

type Basis = 'rectilinear' | 'diagonal'
type Bit = 0 | 1

interface Interaction {
  step: number
  aliceBit: Bit
  aliceBasis: Basis
  eveBasis?: Basis
  eveMeasuredBit?: Bit
  bobBasis: Basis
  bobMeasuredBit: Bit
  basisMatch: boolean
}

const QuantumCryptoLab = () => {
  const [numBits, setNumBits] = useState(10)
  const [eveEavesdropping, setEveEavesdropping] = useState(false)
  const [eveProb, setEveProb] = useState(0.5)
  const [isSimulating, setIsSimulating] = useState(false)
  const [currentPlaybackIndex, setCurrentPlaybackIndex] = useState(-1)
  const [interactions, setInteractions] = useState<Interaction[]>([])
  const [showExplanation, setShowExplanation] = useState(false)

  const simulateBB84 = () => {
    setIsSimulating(true)
    setCurrentPlaybackIndex(-1)
    const newInteractions: Interaction[] = []

    for (let i = 0; i < numBits; i++) {
        const aliceBit: Bit = Math.random() > 0.5 ? 1 : 0
        const aliceBasis: Basis = Math.random() > 0.5 ? 'rectilinear' : 'diagonal'
        const bobBasis: Basis = Math.random() > 0.5 ? 'rectilinear' : 'diagonal'
        
        let photonBit: Bit = aliceBit
        let eveBasis: Basis | undefined = undefined
        let eveMeasuredBit: Bit | undefined = undefined

        if (eveEavesdropping && Math.random() < eveProb) {
            eveBasis = Math.random() > 0.5 ? 'rectilinear' : 'diagonal'
            if (eveBasis === aliceBasis) {
                eveMeasuredBit = aliceBit
            } else {
                eveMeasuredBit = Math.random() > 0.5 ? 1 : 0
            }
            photonBit = eveMeasuredBit
        }

        let bobMeasuredBit: Bit
        if (bobBasis === (eveBasis || aliceBasis)) {
            bobMeasuredBit = photonBit
        } else {
            bobMeasuredBit = Math.random() > 0.5 ? 1 : 0
        }

        newInteractions.push({
            step: i + 1,
            aliceBit,
            aliceBasis,
            eveBasis,
            eveMeasuredBit,
            bobBasis,
            bobMeasuredBit,
            basisMatch: aliceBasis === bobBasis
        })
    }

    setInteractions(newInteractions)
    
    // Playback effect
    let idx = 0
    const interval = setInterval(() => {
        setCurrentPlaybackIndex(idx)
        idx++
        if (idx >= numBits) {
            clearInterval(interval)
            setIsSimulating(false)
        }
    }, 400)
  }

  const getPhotonSymbol = (basis: Basis, bit: Bit) => {
    if (basis === 'rectilinear') {
        return bit === 0 ? '↑' : '→'
    } else {
        return bit === 0 ? '↗' : '↘'
    }
  }

  const sharedKey = interactions.slice(0, currentPlaybackIndex + 1)
    .filter(i => i.basisMatch)
    .map(i => i.bobMeasuredBit)
    .join('')

  const errors = interactions.slice(0, currentPlaybackIndex + 1)
    .filter(i => i.basisMatch && i.aliceBit !== i.bobMeasuredBit).length

  const siftedCount = interactions.slice(0, currentPlaybackIndex + 1).filter(i => i.basisMatch).length
  const qber = siftedCount > 0 
    ? (errors / siftedCount * 100).toFixed(1)
    : "0"

  const isSecure = parseFloat(qber) < 15 

  return (
    <div className="bg-slate-900/50 rounded-3xl border border-emerald-500/30 overflow-hidden shadow-2xl backdrop-blur-xl group/lab">
      <div className="p-8 border-b border-emerald-500/20 bg-emerald-500/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-black text-emerald-400 flex items-center gap-3">
            <div className="bg-emerald-500/20 p-2 rounded-lg">
                <Shield size={28} className="text-emerald-400 animate-pulse" />
            </div>
            Quantum Cryptography Lab: BB84 Protocol
          </h3>
          <p className="text-slate-400 font-medium mt-1">Learn by Doing: Distribute unbreakable keys with individual photons.</p>
        </div>
        <div className="flex gap-4">
            <button 
                onClick={() => setShowExplanation(!showExplanation)}
                className="p-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all border border-slate-700 hover:scale-105 active:scale-95"
                title="Explain Protocol"
            >
                <Info size={24} />
            </button>
            <button 
                onClick={simulateBB84}
                disabled={isSimulating}
                className={`px-6 py-3 font-bold rounded-xl shadow-lg shadow-emerald-900/40 border-b-4 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2 ${isSimulating ? 'bg-slate-800 border-slate-900 text-slate-500' : 'bg-emerald-600 border-emerald-800 hover:bg-emerald-500 text-white'}`}
            >
                {isSimulating ? <RefreshCw size={20} className="animate-spin" /> : <Play size={20} fill="currentColor" />}
                {isSimulating ? 'Distributing Photons...' : 'Run Simulation'}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:h-[650px]">
        {/* Controls */}
        <div className="p-6 border-r border-slate-800 space-y-8 bg-slate-900/80">
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                <Settings size={14} />
                Simulator Parameters
            </h4>
            
            <div className="space-y-3 bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                <label className="text-xs text-slate-500 font-black uppercase flex justify-between">
                    Pulse Size <span>{numBits} photons</span>
                </label>
                <input 
                    type="range" 
                    min="4" 
                    max="30" 
                    value={numBits} 
                    onChange={(e) => setNumBits(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
            </div>

            <div className="pt-2">
                <label className="flex items-center gap-4 cursor-pointer group bg-slate-950/50 p-4 rounded-xl border border-slate-800/50 hover:border-red-500/30 transition-all">
                    <div className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${eveEavesdropping ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'bg-slate-700'}`}>
                        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${eveEavesdropping ? 'translate-x-6' : ''}`} />
                        <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={eveEavesdropping}
                            onChange={() => setEveEavesdropping(!eveEavesdropping)}
                        />
                    </div>
                    <div>
                        <span className={`font-bold text-sm block ${eveEavesdropping ? 'text-red-400' : 'text-slate-400'}`}>Eavesdropper (Eve)</span>
                        <span className="text-[10px] text-slate-500">Inject MITM Interception</span>
                    </div>
                </label>
            </div>

            {eveEavesdropping && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3 bg-red-950/10 p-4 rounded-xl border border-red-500/20"
                >
                    <label className="text-xs text-red-400 font-black uppercase flex justify-between">
                        Eve Power <span>{(eveProb * 100).toFixed(0)}%</span>
                    </label>
                    <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.1"
                        value={eveProb} 
                        onChange={(e) => setEveProb(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                    />
                </motion.div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                <Layers size={14} />
                Glossary
            </h4>
            <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-400 px-3 py-2 bg-slate-950/30 rounded-lg border border-slate-800/50">
                    <span className="w-6 h-6 flex items-center justify-center bg-blue-500/20 text-blue-400 rounded-md font-bold text-sm">⊞</span>
                    <span>Rectilinear Basis (0°, 90°)</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 px-3 py-2 bg-slate-950/30 rounded-lg border border-slate-800/50">
                    <span className="w-6 h-6 flex items-center justify-center bg-purple-500/20 text-purple-400 rounded-md font-bold text-sm">⊠</span>
                    <span>Diagonal Basis (45°, 135°)</span>
                </div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs shadow-inner">
                <p className="text-indigo-400 mb-2">// Statistical Guard</p>
                <BlockMath math={"P_{security} = 1 - (3/4)^k"} />
                <p className="text-slate-500 mt-2 text-[10px]">Probability of detecting Eve after k matching bits.</p>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-3 flex flex-col h-full bg-slate-950/40">
            {interactions.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-600 p-12 text-center">
                    <div className="relative mb-8">
                        <Shield size={80} className="opacity-10" />
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute inset-0 bg-emerald-500 rounded-full blur-3xl opacity-10"
                        />
                    </div>
                    <h4 className="text-2xl font-black text-slate-500 mb-2">Initialize Secure Channel</h4>
                    <p className="max-w-md text-slate-600 font-medium">Use the protocol to distribute a master key that is mathematically guaranteed to be private.</p>
                </div>
            ) : (
                <>
                <div className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-slate-800">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-slate-950/90 backdrop-blur-md z-10">
                            <tr className="text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800">
                                <th className="p-4">#</th>
                                <th className="p-4 text-center">Alice Sent</th>
                                <th className="p-4 text-center text-blue-400">Photon State</th>
                                {eveEavesdropping && <th className="p-4 text-center text-red-500">Eve Measure</th>}
                                <th className="p-4 text-center">Bob Measure</th>
                                <th className="p-4 text-center">Sifted?</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {interactions.slice(0, currentPlaybackIndex + 1).map((i, idx) => (
                                <motion.tr 
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`border-b border-slate-800/30 transition-colors ${i.basisMatch ? 'bg-emerald-500/5' : 'opacity-40'}`}
                                >
                                    <td className="p-4 font-mono text-slate-600 text-xs">{idx + 1}</td>
                                    <td className="p-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${i.aliceBasis === 'rectilinear' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                                                {i.aliceBasis === 'rectilinear' ? 'Rect' : 'Diag'}
                                            </span>
                                            <span className="text-white font-black text-lg">{i.aliceBit}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-center">
                                            <div className="w-12 h-12 rounded-full bg-slate-900 border border-indigo-500/30 flex items-center justify-center text-2xl text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                                                {getPhotonSymbol(i.aliceBasis, i.aliceBit)}
                                            </div>
                                        </div>
                                    </td>
                                    
                                    {eveEavesdropping && (
                                        <td className="p-4 border-x border-red-500/5 bg-red-500/2">
                                            {i.eveBasis ? (
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className="text-[10px] text-red-400 font-bold uppercase">{i.eveBasis === 'rectilinear' ? '⊞' : '⊠'}</span>
                                                    <span className="text-red-300 font-black text-lg">{i.eveMeasuredBit}</span>
                                                </div>
                                            ) : (
                                                <div className="text-center text-slate-700 italic text-[10px]">No Peek</div>
                                            )}
                                        </td>
                                    )}

                                    <td className="p-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${i.bobBasis === 'rectilinear' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                                                {i.bobBasis === 'rectilinear' ? 'Rect' : 'Diag'}
                                            </span>
                                            <span className={`text-lg font-black ${i.basisMatch && i.aliceBit !== i.bobMeasuredBit ? 'text-red-500 underline decoration-wavy' : 'text-white'}`}>
                                                {i.bobMeasuredBit}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-center">
                                            {i.basisMatch ? (
                                                <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/30">
                                                    <ShieldCheck size={20} className="text-emerald-500 shadow-emerald-500/50" />
                                                </div>
                                            ) : (
                                                <X size={18} className="text-slate-800" />
                                            )}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 md:p-10 bg-slate-900/95 border-t-2 border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-8 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                    <div className="space-y-3">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Quantum Security Audit</p>
                        <div className="flex items-end gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800 group/metric">
                            <span className={`text-5xl font-black transition-colors ${parseFloat(qber) > 0 ? 'text-white' : 'text-slate-700'}`}>{qber}%</span>
                            <span className="text-slate-500 text-xs mb-1 font-bold leading-tight">QBER <br/> <span className="text-[10px] font-normal italic">(Bit-Error Rate)</span></span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Channel Status</p>
                        <div className={`p-4 rounded-2xl border-2 flex flex-col gap-1 shadow-lg transition-all duration-500 ${isSecure ? 'bg-emerald-950/20 border-emerald-500/50 text-emerald-400' : 'bg-red-950/20 border-red-500/50 text-red-400 animate-pulse'}`}>
                            <div className="flex items-center gap-3 font-black text-xl">
                                {isSecure ? <ShieldCheck size={24} /> : <ShieldAlert size={24} />}
                                {isSecure ? 'SECURE' : 'COMPROMISED'}
                            </div>
                            <p className="text-[11px] font-medium leading-relaxed opacity-80">
                                {isSecure 
                                    ? "Disturbance is within environmental noise limits." 
                                    : "Eve's observation has collapsed the wavefunction, inducing detectable errors."}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3 overflow-hidden">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Generated Shared Key</p>
                        <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/20 font-mono text-emerald-500 break-all text-base h-20 flex items-center justify-center shadow-inner relative overflow-hidden group/key">
                            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover/key:opacity-100 transition-opacity" />
                            {sharedKey || <span className="text-slate-800 tracking-widest">NO_KEY_GENERATED</span>}
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>
      </div>

      <AnimatePresence>
        {showExplanation && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-indigo-950/40 border-t border-indigo-500/30 p-8 overflow-hidden"
            >
                <div className="max-w-4xl mx-auto space-y-6">
                    <h4 className="text-2xl font-black text-indigo-300">How BB84 Works (NEP 2020 Experiential View)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300 text-sm leading-relaxed">
                        <div className="space-y-4">
                            <p>
                                <strong className="text-white">The Prep Phase:</strong> Alice sends individual photons in random states. In a quantum world, observing these photons changes them irrevocably.
                            </p>
                            <p>
                                <strong className="text-white">The Sifting Phase:</strong> Bob measures the photons. When their "bases" (measurement frames) match, they should get identical results. When they don't, Bob gets random noise.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <p>
                                <strong className="text-white">The Eve Factor:</strong> If Eve tries to peek, she must measure the photon. Because of the <span className="text-indigo-400 underline decoration-dotted">Heisenberg Uncertainty Principle</span>, her measurement collapses the state.
                            </p>
                            <p>
                                <strong className="text-white">The Detection:</strong> When Bob later checks his results against Alice's (for a small subset), he'll find errors that Eve introduced. If <InlineMath math="QBER > 11\%" />, it's mathematically certain someone was watching.
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

export default QuantumCryptoLab
