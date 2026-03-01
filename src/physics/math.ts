export interface Complex {
  r: number // real part
  i: number // imaginary part
}

export function addComplex(a: Complex, b: Complex): Complex {
  return { r: a.r + b.r, i: a.i + b.i }
}

export function multComplex(a: Complex, b: Complex): Complex {
  return {
    r: a.r * b.r - a.i * b.i,
    i: a.r * b.i + a.i * b.r
  }
}

export function scaleComplex(a: Complex, scalar: number): Complex {
  return { r: a.r * scalar, i: a.i * scalar }
}

export function magnitude(a: Complex): number {
  return Math.sqrt(a.r * a.r + a.i * a.i)
}

export function prob(a: Complex): number {
  return a.r * a.r + a.i * a.i
}

// Matrix is 2x2. Vector is 2x1.
export function multiplyMatrix(matrix: Complex[][], vector: Complex[]): Complex[] {
  const [a, b] = vector
  const [[m00, m01], [m10, m11]] = matrix

  return [
    addComplex(multComplex(m00, a), multComplex(m01, b)),
    addComplex(multComplex(m10, a), multComplex(m11, b))
  ]
}
