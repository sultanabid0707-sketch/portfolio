import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Text, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const FACES = [
  { label: 'React', color: '#61dafb', rotation: [0, 0, 0] },
  { label: 'Node.js', color: '#68a063', rotation: [0, Math.PI, 0] },
  { label: 'MongoDB', color: '#47a248', rotation: [0, Math.PI / 2, 0] },
  { label: 'TypeScript', color: '#3178c6', rotation: [0, -Math.PI / 2, 0] },
  { label: 'Express', color: '#ffffff', rotation: [-Math.PI / 2, 0, 0] },
  { label: 'Tailwind', color: '#5eead4', rotation: [Math.PI / 2, 0, 0] },
]

function CubeFace({ label, color, position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[1.8, 1.8]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Text
        fontSize={0.22}
        color={color}
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {label}
      </Text>
    </group>
  )
}

function RotatingCube() {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.4
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.3
  })

  const offset = 0.91

  return (
    <group ref={groupRef}>
      {/* Wireframe cube outline */}
      <RoundedBox args={[1.9, 1.9, 1.9]} radius={0.05} smoothness={4}>
        <meshStandardMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.3}
        />
      </RoundedBox>

      {/* Solid inner cube */}
      <RoundedBox args={[1.85, 1.85, 1.85]} radius={0.05} smoothness={4}>
        <meshStandardMaterial
          color="#0a0a0f"
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.8}
        />
      </RoundedBox>

      {/* Face labels */}
      <CubeFace label="React" color="#61dafb" position={[0, 0, offset]} rotation={[0, 0, 0]} />
      <CubeFace label="Node.js" color="#68a063" position={[0, 0, -offset]} rotation={[0, Math.PI, 0]} />
      <CubeFace label="MongoDB" color="#47a248" position={[offset, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <CubeFace label="TypeScript" color="#3178c6" position={[-offset, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <CubeFace label="Express" color="#d4d4d4" position={[0, offset, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <CubeFace label="Tailwind" color="#5eead4" position={[0, -offset, 0]} rotation={[Math.PI / 2, 0, 0]} />

      {/* Edge glow effect */}
      <RoundedBox args={[2.0, 2.0, 2.0]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.08}
        />
      </RoundedBox>
    </group>
  )
}

function FloatingSphere({ position, color, scale }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.2
    ref.current.rotation.y = t * 0.5
  })
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

export default function TechCube() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 40 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#8b5cf6" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#14b8a6" />
      <pointLight position={[0, 0, 6]} intensity={1} color="#ffffff" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={1}
        color="#f97316"
      />

      <RotatingCube />
      <FloatingSphere position={[3.5, 0, -2]} color="#8b5cf6" scale={0.4} />
      <FloatingSphere position={[-3.5, 1, -2]} color="#14b8a6" scale={0.3} />
      <FloatingSphere position={[2, -2, -3]} color="#f97316" scale={0.25} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
      />
    </Canvas>
  )
}
