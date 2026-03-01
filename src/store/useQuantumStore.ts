import { create } from 'zustand'
import { Complex, multiplyMatrix, prob, magnitude } from '@/physics/math'
import { gates, GateName } from '@/physics/gates'

interface QuantumState {
    alpha: Complex // Amplitude for |0>
    beta: Complex  // Amplitude for |1>
    setAmplitudes: (alpha: Complex, beta: Complex) => void
    applyGate: (gateName: GateName) => void
    measure: () => 0 | 1
    reset: () => void
}

export const useQuantumStore = create<QuantumState>((set, get) => ({
    alpha: { r: 1, i: 0 },
    beta: { r: 0, i: 0 },

    setAmplitudes: (alpha, beta) => {
        // Normalize if necessary, though ideally the sliders keep it normalized
        const magA = prob(alpha)
        const magB = prob(beta)
        const total = Math.sqrt(magA + magB)

        if (total === 0) {
            set({ alpha: { r: 1, i: 0 }, beta: { r: 0, i: 0 } })
            return
        }

        set({
            alpha: { r: alpha.r / total, i: alpha.i / total },
            beta: { r: beta.r / total, i: beta.i / total }
        })
    },

    applyGate: (gateName) => {
        const { alpha, beta } = get()
        const stateVector = [alpha, beta]
        const matrix = gates[gateName]
        const [newAlpha, newBeta] = multiplyMatrix(matrix, stateVector)
        set({ alpha: newAlpha, beta: newBeta })
    },

    measure: () => {
        const { alpha } = get()
        const prob0 = prob(alpha)
        const outcome = Math.random() < prob0 ? 0 : 1

        // State collapse
        if (outcome === 0) {
            set({ alpha: { r: 1, i: 0 }, beta: { r: 0, i: 0 } })
        } else {
            set({ alpha: { r: 0, i: 0 }, beta: { r: 1, i: 0 } })
        }
        return outcome
    },

    reset: () => {
        set({ alpha: { r: 1, i: 0 }, beta: { r: 0, i: 0 } })
    }
}))
