import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ModuleProgress {
    moduleId: number
    completed: boolean
    lastVisited: number
    timeSpent: number
}

interface ProgressState {
    modules: Record<number, ModuleProgress>
    currentModule: number
    markModuleComplete: (moduleId: number) => void
    markModuleVisited: (moduleId: number) => void
    getProgress: () => number
    resetProgress: () => void
}

export const useProgressStore = create<ProgressState>()(
    persist(
        (set, get) => ({
            modules: {},
            currentModule: 1,

            markModuleComplete: (moduleId) => {
                set((state) => ({
                    modules: {
                        ...state.modules,
                        [moduleId]: {
                            ...state.modules[moduleId],
                            moduleId,
                            completed: true,
                            lastVisited: Date.now(),
                            timeSpent: state.modules[moduleId]?.timeSpent || 0
                        }
                    }
                }))
            },

            markModuleVisited: (moduleId) => {
                set((state) => ({
                    currentModule: moduleId,
                    modules: {
                        ...state.modules,
                        [moduleId]: {
                            moduleId,
                            completed: state.modules[moduleId]?.completed || false,
                            lastVisited: Date.now(),
                            timeSpent: (state.modules[moduleId]?.timeSpent || 0) + 1
                        }
                    }
                }))
            },

            getProgress: () => {
                const modules = get().modules
                const totalModules = 8
                const completedCount = Object.values(modules).filter(m => m.completed).length
                return Math.round((completedCount / totalModules) * 100)
            },

            resetProgress: () => {
                set({ modules: {}, currentModule: 1 })
            }
        }),
        {
            name: 'quantum-learning-progress'
        }
    )
)
