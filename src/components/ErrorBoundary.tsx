'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
                    <div className="max-w-2xl w-full bg-slate-900 rounded-3xl border border-red-500/30 p-12 text-center space-y-6">
                        <div className="text-6xl mb-4">⚠️</div>
                        <h1 className="text-4xl font-black text-white mb-4">Something Went Wrong</h1>
                        <p className="text-xl text-slate-400 mb-8">
                            We encountered an unexpected error. Don't worry, your progress is safe.
                        </p>
                        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 mb-8">
                            <p className="text-sm text-red-400 font-mono break-words">
                                {this.state.error?.message || 'Unknown error'}
                            </p>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white text-2xl font-black rounded-2xl shadow-2xl border-b-8 border-indigo-800 transition-all active:border-b-0 active:translate-y-2"
                        >
                            Reload Application
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
