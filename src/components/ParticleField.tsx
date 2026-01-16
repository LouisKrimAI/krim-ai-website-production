import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

function Points() {
  const count = 1200
  const positions = new Float32Array(count * 3)
  for (let i=0;i<count;i++){
    positions[i*3+0]=(Math.random()-0.5)*20
    positions[i*3+1]=(Math.random()-0.5)*12
    positions[i*3+2]=(Math.random()-0.5)*10
  }
  const geom = new THREE.BufferGeometry()
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const mat = new THREE.PointsMaterial({ size: 0.03, color: '#16FFBB' })
  return <points geometry={geom} material={mat} />
}

export default function ParticleField(){
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0,0,6], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <Points/>
        </Suspense>
      </Canvas>
    </div>
  )
}
