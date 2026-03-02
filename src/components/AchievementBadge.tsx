'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, Zap, Target, Award } from 'lucide-react'
import { useProgressStore } from '@/store/useProgressStore'

interface Achievement {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    condition: (modules: Record<number, any>) => boolean
}

const achievements: Achievement[] = [
    {
        id: 'first-step',
        title: 'First Steps',
        description: 'Complete your first module',
        icon: <Star size={32} />,
        condition: (modules) => Object.values(modules).some(m => m.completed)
    },
    {
        id: 'quantum-basics',
        title: 'Quantum Basics Master',
        description: 'Complete Modules 1 and 2',
        icon: <Target size={32} />,
        condition: (modules) => modules[1]?.completed && modules[2]?.completed
    },
    {
        id: 'gate-master',
        title: 'Gate Master',
        description: 'Complete Module 3 (Quantum Gates)',
        icon: <Zap size={32} />,
        condition: (modules) => modules[3]?.completed
    },
    {
        id: 'halfway',
        title: 'Halfway There',
        description: 'Complete 4 modules',
        icon: <Award size={32} />,
        condition: (modules) => Object.values(modules).filter(m => m.completed).length >= 4
    },
    {
        id: 'quantum-expert',
        title: 'Quantum Expert',
        description: 'Complete all 8 modules',
        icon: <Trophy size={32} />,
        condition: (modules) => Object.values(modules).filter(m => m.completed).length === 8
    },
]

export default function AchievementBadge() {
    const { modules } = useProgressStore()
    const [unlockedAchievement, setUnlockedAchievement] = useState<Achievement | null>(null)
    const [earnedAchievements, setEarnedAchievements] = useState<Set<string>>(new Set())

    useEffect(() => {
        achievements.forEach(achievement => {
            if (!earnedAchievements.has(achievement.id) && achievement.condition(modules)) {
                setEarnedAchievements(prev => new Set([...prev, achievement.id]))
                setUnlockedAchievement(achievement)

                setTimeout(() => {
                    setUnlockedAchievement(null)
                }, 5000)
            }
        })
    }, [modules, earnedAchievements])

    return (
        <AnimatePresence>
            {unlockedAchievement && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.8 }}
                    className="fixed bottom-24 right-6 z-50 bg-gradient-to-br from-yellow-500 to-orange-600 text-white p-6 rounded-2xl shadow-2xl border-4 border-yellow-300 max-w-sm"
                    role="alert"
                    aria-live="assertive"
                >
                    <div className="flex items-start gap-4">
                        <motion.div
                            animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.5, repeat: 2 }}
                            className="shrink-0 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"
                        >
                            {unlockedAchievement.icon}
                        </motion.div>
                        <div className="flex-1">
                            <h3 className="text-xl font-black mb-1">Achievement Unlocked!</h3>
                            <p className="text-2xl font-bold mb-2">{unlockedAchievement.title}</p>
                            <p className="text-sm opacity-90">{unlockedAchievement.description}</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
