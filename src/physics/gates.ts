import { Complex } from './math'

const zero: Complex = { r: 0, i: 0 }
const one: Complex = { r: 1, i: 0 }
const minusOne: Complex = { r: -1, i: 0 }
const i: Complex = { r: 0, i: 1 }
const minusI: Complex = { r: 0, i: -1 }

const invSqrt2: Complex = { r: 1 / Math.SQRT2, i: 0 }
const minusInvSqrt2: Complex = { r: -1 / Math.SQRT2, i: 0 }

export type GateName = 'I' | 'X' | 'Y' | 'Z' | 'H'

export const gates: Record<GateName, Complex[][]> = {
    I: [
        [one, zero],
        [zero, one]
    ],
    X: [
        [zero, one],
        [one, zero]
    ],
    Y: [
        [zero, minusI],
        [i, zero]
    ],
    Z: [
        [one, zero],
        [zero, minusOne]
    ],
    H: [
        [invSqrt2, invSqrt2],
        [invSqrt2, minusInvSqrt2]
    ]
}
