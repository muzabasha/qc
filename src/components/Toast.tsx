'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
    id: string
    message: string
    type: ToastType
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substring(7)
        setToasts(prev => [...prev, { id, message, type }])

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id))
        }, 5000)
    }, [])

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
    }

    const getIcon = (type: ToastType) => {
        switch (type) {
            case 'success': return <CheckCircle size={24} />
            case 'error': return <AlertCircle size={24} />
            case 'info': return <Info size={24} />
        }
    }

    const getColors = (type: ToastType) => {
        switch (type) {
            case 'success': return 'bg-emerald-600 border-emerald-500'
            case 'error': return 'bg-red-600 border-red-500'
            case 'info': return 'bg-indigo-600 border-indigo-500'
        }
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-50 space-y-4 max-w-md" role="region" aria-label="Notifications" aria-live="polite">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 50, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.8 }}
                            className={`${getColors(toast.type)} text-white p-4 rounded-2xl shadow-2xl border-2 flex items-center gap-4 min-w-[300px]`}
                            role="alert"
                        >
                            <div className="shrink-0">{getIcon(toast.type)}</div>
                            <p className="flex-1 text-lg font-medium">{toast.message}</p>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="shrink-0 hover:bg-white/20 rounded-lg p-1 transition-colors"
                                aria-label="Close notification"
                            >
                                <X size={20} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within ToastProvider')
    }
    return context
}
