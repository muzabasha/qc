'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Box, Cpu, Share2, Search, Link as LinkIcon, Lightbulb, Zap, Menu, X } from 'lucide-react'
import ProgressTracker from '@/components/ProgressTracker'
import { useProgressStore } from '@/store/useProgressStore'

const MODULES = [
    { id: 1, title: 'Think Quantum', icon: Lightbulb },
    { id: 2, title: 'Superposition', icon: Box },
    { id: 3, title: 'Quantum Gates', icon: Cpu },
    { id: 4, title: 'Entanglement', icon: Share2 },
    { id: 5, title: 'Quantum Circuits', icon: LinkIcon },
    { id: 6, title: 'Algorithms', icon: Search },
    { id: 7, title: 'Applications', icon: BookOpen },
    { id: 8, title: 'Future Trends', icon: Zap },
]

export default function ModulesLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const { markModuleVisited } = useProgressStore()

    useEffect(() => {
        const match = pathname.match(/\/modules\/(\d+)/)
        if (match) {
            const moduleId = parseInt(match[1])
            markModuleVisited(moduleId)
        }
    }, [pathname, markModuleVisited])

    return (
        <div className="flex flex-col md:flex-row h-screen bg-slate-950 text-slate-100 overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`bg-slate-900 border-r border-slate-800 shrink-0 flex flex-col h-full overflow-y-auto z-30 shadow-2xl transition-all duration-300 ${isCollapsed ? 'w-0 md:w-24 overflow-hidden' : 'fixed md:relative inset-y-0 left-0 w-full sm:w-80 md:w-[400px]'}`}
                aria-label="Course navigation"
            >
                <div className="p-8 border-b border-slate-800 sticky top-0 bg-slate-900/95 backdrop-blur z-10 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        {!isCollapsed && (
                            <Link href="/" className="text-4xl font-extrabold bg-linear-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity whitespace-nowrap">
                                Quantum Lab
                            </Link>
                        )}
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 transition-colors mx-auto"
                            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                        >
                            {isCollapsed ? <Menu size={32} /> : <X size={32} />}
                        </button>
                    </div>

                    {!isCollapsed && (
                        <>
                            <p className="text-slate-400 text-xl font-medium">NEP 2020 Interactive Framework</p>
                            <div className="mt-6">
                                <a
                                    href="https://scholar-sparkle-web.lovable.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full text-center px-4 py-3 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white font-bold rounded-lg transition-all inline-block border border-indigo-500 hover:border-transparent text-lg"
                                >
                                    Instructor Profile
                                </a>
                            </div>
                        </>
                    )}
                </div>

                {!isCollapsed && (
                    <div className="p-6">
                        <ProgressTracker />
                    </div>
                )}

                <nav className="flex-1 p-6 space-y-4 overflow-y-auto" aria-label="Module navigation">
                    {MODULES.map((mod) => {
                        const Icon = mod.icon
                        const isActive = pathname === `/modules/${mod.id}`

                        return (
                            <Link
                                key={mod.id}
                                href={`/modules/${mod.id}`}
                                title={isCollapsed ? `Module ${mod.id}: ${mod.title}` : undefined}
                                aria-label={`Module ${mod.id}: ${mod.title}`}
                                aria-current={isActive ? 'page' : undefined}
                                className={`flex items-center gap-6 p-5 rounded-2xl transition-all border-2 text-2xl font-bold group ${isActive
                                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                                    : 'border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200 hover:border-slate-700'
                                    }`}
                            >
                                <div className={`p-3 rounded-xl transition-all ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'}`}>
                                    <Icon size={32} className="shrink-0" aria-hidden="true" />
                                </div>
                                {!isCollapsed && <span className="whitespace-nowrap">Module {mod.id}</span>}
                            </Link>
                        )
                    })}
                </nav>
            </aside>

            {/* Mobile overlay */}
            {!isCollapsed && (
                <div
                    className="fixed inset-0 bg-black/60 z-20 md:hidden animate-in fade-in duration-300"
                    onClick={() => setIsCollapsed(true)}
                ></div>
            )}

            {/* Mobile Toggle Button (Visible when sidebar collapsed) */}
            {isCollapsed && (
                <button
                    onClick={() => setIsCollapsed(false)}
                    className="fixed top-4 left-4 z-40 p-3 bg-indigo-600 rounded-xl text-white shadow-xl md:hidden"
                >
                    <Menu size={24} />
                </button>
            )}

            {/* Main Content Area */}
            <main
                id="main-content"
                className="flex-1 h-full overflow-y-auto w-full relative overflow-x-hidden scroll-smooth transition-all duration-300"
                role="main"
                tabIndex={-1}
            >
                {children}
            </main>
        </div>
    )
}
