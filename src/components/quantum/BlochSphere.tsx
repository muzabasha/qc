'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Html, Line } from '@react-three/drei'
import { useQuantumStore } from '@/store/useQuantumStore'
import * as THREE from 'three'
import { prob } from '@/physics/math'

function VectorArrow({ x, y, z }: { x: number, y: number, z: number }) {
    const meshRef = useRef<THREE.Group>(null)

    // Calculate polar and azimuthal angles for rotation
    const r = Math.sqrt(x * x + y * y + z * z)
    const normX = r === 0 ? 0 : x / r
    const normY = r === 0 ? 0 : y / r
    const normZ = r === 0 ? 0 : z / r

    const endPoint = new THREE.Vector3(normX, normY, normZ)
    const origin = new THREE.Vector3(0, 0, 0)

    return (
        <group ref={meshRef}>
            <Line
                points={[origin, endPoint]}
                color="#10b981"
                lineWidth={3}
            />
            <mesh position={endPoint} >
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color="#10b981" />
            </mesh>
        </group>
    )
}

function BlochSphereContent() {
    const { alpha, beta } = useQuantumStore()
    const aMag2 = prob(alpha)
    const bMag2 = prob(beta)

    // Safeguard
    const norm = Math.sqrt(aMag2 + bMag2)
    if (norm === 0) return null

    const theta = 2 * Math.acos(Math.sqrt(aMag2))

    // Phi is difference in phase between alpha and beta
    const phaseA = Math.atan2(alpha.i, alpha.r)
    const phaseB = Math.atan2(beta.i, beta.r)
    const phi = phaseB - phaseA

    const bx = Math.sin(theta) * Math.cos(phi)
    const by = Math.sin(theta) * Math.sin(phi)
    const bz = Math.cos(theta)

    // Mapping to ThreeJS:
    const thX = bx
    const thY = bz
    const thZ = by

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <OrbitControls enableZoom={false} autoRotate={false} />

            {/* Wireframe Sphere */}
            <Sphere args={[1, 32, 16]}>
                <meshBasicMaterial color="#3b82f6" wireframe opacity={0.2} transparent />
            </Sphere>

            {/* Axes */}
            <Line points={[[-1.2, 0, 0], [1.2, 0, 0]]} color="rgba(255,255,255,0.2)" />
            <Line points={[[0, -1.2, 0], [0, 1.2, 0]]} color="rgba(255,255,255,0.2)" />
            <Line points={[[0, 0, -1.2], [0, 0, 1.2]]} color="rgba(255,255,255,0.2)" />

            <Html position={[1.4, 0, 0]} center style={{ color: 'white', fontSize: '24px' }}>
                <span aria-label="Plus X axis">+X</span>
            </Html>
            <Html position={[0, 1.4, 0]} center style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                <span aria-label="State zero, top of sphere">|0⟩</span>
            </Html>
            <Html position={[0, -1.4, 0]} center style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                <span aria-label="State one, bottom of sphere">|1⟩</span>
            </Html>
            <Html position={[0, 0, 1.4]} center style={{ color: 'white', fontSize: '24px' }}>
                <span aria-label="Plus Y axis">+Y</span>
            </Html>

            {/* State Vector */}
            <VectorArrow x={thX} y={thY} z={thZ} />
        </>
    )
}

export default function BlochSphere() {
    const { alpha, beta } = useQuantumStore()
    const aMag2 = prob(alpha)
    const bMag2 = prob(beta)

    return (
        <div className="w-full h-[500px] md:h-[600px] bg-slate-900 rounded-xl overflow-hidden relative border-4 border-slate-700 shadow-2xl">
            <Canvas camera={{ position: [2.5, 1.8, 2.5] }}>
                <BlochSphereContent />
            </Canvas>
            <div className="absolute top-4 left-4 text-lg md:text-2xl text-slate-300 bg-slate-900/80 px-4 py-2 rounded-lg font-bold backdrop-blur-sm">
                Drag to rotate sphere
            </div>
            <div
                className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-slate-700"
                role="status"
                aria-live="polite"
                aria-atomic="true"
            >
                <p className="text-sm md:text-base text-slate-300">
                    <span className="sr-only">Current quantum state: </span>
                    P(|0⟩) = {(aMag2 * 100).toFixed(1)}%, P(|1⟩) = {(bMag2 * 100).toFixed(1)}%
                </p>
            </div>
        </div>
    )
}
