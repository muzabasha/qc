'use client'

import React, { useState } from 'react'
import { Copy, Check, Play, ChevronDown, ChevronUp } from 'lucide-react'

interface CodeLine {
    code: string
    explanation: string
}

interface CodeBlockProps {
    title: string
    description: string
    code: CodeLine[]
    output?: string
    language?: string
}

export default function CodeBlock({ title, description, code, output, language = 'python' }: CodeBlockProps) {
    const [copied, setCopied] = useState(false)
    const [showExplanation, setShowExplanation] = useState(false)
    const [highlightedLine, setHighlightedLine] = useState<number | null>(null)

    const fullCode = code.map(line => line.code).join('\n')

    const handleCopy = () => {
        navigator.clipboard.writeText(fullCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="bg-slate-900 rounded-2xl border-2 border-slate-700 overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-slate-400 text-sm font-mono">{language}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowExplanation(!showExplanation)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg transition-all flex items-center gap-2"
                        aria-label={showExplanation ? 'Hide explanation' : 'Show explanation'}
                    >
                        {showExplanation ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        {showExplanation ? 'Hide' : 'Explain'}
                    </button>
                    <button
                        onClick={handleCopy}
                        className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-bold rounded-lg transition-all flex items-center gap-2"
                        aria-label="Copy code"
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>

            {/* Title and Description */}
            <div className="px-6 py-4 bg-slate-850 border-b border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm">{description}</p>
            </div>

            {/* Code Display */}
            <div className="relative">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <tbody>
                            {code.map((line, index) => (
                                <tr
                                    key={index}
                                    className={`group transition-all ${highlightedLine === index
                                            ? 'bg-indigo-900/30'
                                            : 'hover:bg-slate-800/50'
                                        }`}
                                    onMouseEnter={() => setHighlightedLine(index)}
                                    onMouseLeave={() => setHighlightedLine(null)}
                                >
                                    {/* Line Number */}
                                    <td className="w-12 px-4 py-2 text-slate-500 text-sm font-mono text-right select-none border-r border-slate-700">
                                        {index + 1}
                                    </td>
                                    {/* Code */}
                                    <td className="px-4 py-2">
                                        <pre className="text-sm font-mono text-slate-200 whitespace-pre">
                                            <code>{line.code}</code>
                                        </pre>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Line-by-Line Explanation */}
            {showExplanation && (
                <div className="border-t-2 border-indigo-500 bg-slate-850 animate-in slide-in-from-top-4 duration-300">
                    <div className="px-6 py-4 bg-indigo-900/20">
                        <h4 className="text-lg font-bold text-indigo-400 mb-4 flex items-center gap-2">
                            <span className="text-2xl">📖</span>
                            Line-by-Line Explanation
                        </h4>
                        <div className="space-y-4">
                            {code.map((line, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-xl border-2 transition-all ${highlightedLine === index
                                            ? 'bg-indigo-900/40 border-indigo-500'
                                            : 'bg-slate-900/50 border-slate-700'
                                        }`}
                                    onMouseEnter={() => setHighlightedLine(index)}
                                    onMouseLeave={() => setHighlightedLine(null)}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <pre className="text-sm font-mono text-emerald-400 mb-2 bg-slate-950 p-2 rounded border border-slate-700 overflow-x-auto">
                                                <code>{line.code}</code>
                                            </pre>
                                            <p className="text-slate-300 text-sm leading-relaxed">
                                                {line.explanation}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Output */}
            {output && (
                <div className="border-t-2 border-emerald-500 bg-slate-950 px-6 py-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Play size={16} className="text-emerald-400" />
                        <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wide">
                            Output
                        </h4>
                    </div>
                    <pre className="text-sm font-mono text-slate-300 bg-slate-900 p-4 rounded-xl border border-slate-700 overflow-x-auto">
                        <code>{output}</code>
                    </pre>
                </div>
            )}

            {/* Installation Note */}
            <div className="bg-amber-900/20 border-t border-amber-700/50 px-6 py-3">
                <p className="text-sm text-amber-300">
                    <strong>💡 Try it yourself:</strong> Install Qiskit with{' '}
                    <code className="bg-slate-950 px-2 py-1 rounded text-amber-400">
                        pip install qiskit
                    </code>
                </p>
            </div>
        </div>
    )
}
