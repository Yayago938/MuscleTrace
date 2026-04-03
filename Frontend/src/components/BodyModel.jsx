import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

/* 
  Procedural "Kinetic Wireframe Human" — built from primitives.
  We compose a human form from capsules/spheres/cylinders
  with neon wireframe rendering and glow effects.
*/

function BodyPart({ position, args, type = 'capsule', color = '#8ff5ff', rotation = [0, 0, 0] }) {
  const meshRef = useRef()

  const material = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    wireframe: true,
    transparent: true,
    opacity: 0.6,
  }), [color])

  const geometry = useMemo(() => {
    switch (type) {
      case 'sphere':
        return new THREE.SphereGeometry(...args)
      case 'cylinder':
        return new THREE.CylinderGeometry(...args)
      case 'capsule':
        return new THREE.CapsuleGeometry(...args)
      case 'box':
        return new THREE.BoxGeometry(...args)
      default:
        return new THREE.SphereGeometry(...args)
    }
  }, [type, args])

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      geometry={geometry}
      material={material}
    />
  )
}

function GlowRing({ position, radius = 0.5, color = '#8ff5ff' }) {
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[radius, 0.008, 16, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  )
}

function ScanLine() {
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      const y = Math.sin(state.clock.elapsedTime * 0.8) * 2
      ref.current.position.y = y
    }
  })

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <planeGeometry args={[2.5, 0.02]} />
      <meshBasicMaterial color="#8ff5ff" transparent opacity={0.3} side={THREE.DoubleSide} />
    </mesh>
  )
}

function DataPoint({ position, label, value, color = '#2efd7c' }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

function HumanBody({ muscleHighlights = {} }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15
    }
  })

  const getColor = (part) => {
    if (muscleHighlights[part] === 'active') return '#2efd7c'
    if (muscleHighlights[part] === 'overstrain') return '#ff7162'
    if (muscleHighlights[part] === 'recovery') return '#00deec'
    return '#8ff5ff'
  }

  return (
    <group ref={groupRef}>
      {/* Head */}
      <BodyPart
        position={[0, 2.1, 0]}
        args={[0.22, 8, 16]}
        type="sphere"
        color={getColor('head')}
      />

      {/* Neck */}
      <BodyPart
        position={[0, 1.82, 0]}
        args={[0.06, 0.06, 0.15, 8]}
        type="cylinder"
        color={getColor('neck')}
      />

      {/* Torso upper */}
      <BodyPart
        position={[0, 1.35, 0]}
        args={[0.35, 0.28, 0.6, 8]}
        type="cylinder"
        color={getColor('chest')}
      />

      {/* Torso lower */}
      <BodyPart
        position={[0, 0.7, 0]}
        args={[0.28, 0.22, 0.5, 8]}
        type="cylinder"
        color={getColor('core')}
      />

      {/* Hips */}
      <BodyPart
        position={[0, 0.4, 0]}
        args={[0.25, 0.3, 0.15, 8]}
        type="cylinder"
        color={getColor('hips')}
      />

      {/* === LEFT ARM === */}
      {/* Shoulder */}
      <BodyPart
        position={[-0.45, 1.55, 0]}
        args={[0.08, 12, 12]}
        type="sphere"
        color={getColor('shoulders')}
      />
      {/* Upper arm */}
      <BodyPart
        position={[-0.5, 1.2, 0]}
        args={[0.065, 0.06, 0.35, 8]}
        type="cylinder"
        color={getColor('biceps')}
        rotation={[0, 0, 0.15]}
      />
      {/* Forearm */}
      <BodyPart
        position={[-0.55, 0.75, 0]}
        args={[0.055, 0.045, 0.35, 8]}
        type="cylinder"
        color={getColor('forearms')}
        rotation={[0, 0, 0.1]}
      />

      {/* === RIGHT ARM === */}
      <BodyPart
        position={[0.45, 1.55, 0]}
        args={[0.08, 12, 12]}
        type="sphere"
        color={getColor('shoulders')}
      />
      <BodyPart
        position={[0.5, 1.2, 0]}
        args={[0.065, 0.06, 0.35, 8]}
        type="cylinder"
        color={getColor('biceps')}
        rotation={[0, 0, -0.15]}
      />
      <BodyPart
        position={[0.55, 0.75, 0]}
        args={[0.055, 0.045, 0.35, 8]}
        type="cylinder"
        color={getColor('forearms')}
        rotation={[0, 0, -0.1]}
      />

      {/* === LEFT LEG === */}
      <BodyPart
        position={[-0.15, 0.0, 0]}
        args={[0.1, 0.08, 0.55, 8]}
        type="cylinder"
        color={getColor('quads')}
        rotation={[0, 0, 0.03]}
      />
      <BodyPart
        position={[-0.17, -0.6, 0]}
        args={[0.075, 0.06, 0.55, 8]}
        type="cylinder"
        color={getColor('calves')}
        rotation={[0, 0, 0.02]}
      />

      {/* === RIGHT LEG === */}
      <BodyPart
        position={[0.15, 0.0, 0]}
        args={[0.1, 0.08, 0.55, 8]}
        type="cylinder"
        color={getColor('quads')}
        rotation={[0, 0, -0.03]}
      />
      <BodyPart
        position={[0.17, -0.6, 0]}
        args={[0.075, 0.06, 0.55, 8]}
        type="cylinder"
        color={getColor('calves')}
        rotation={[0, 0, -0.02]}
      />

      {/* Scan rings */}
      <GlowRing position={[0, 1.35, 0]} radius={0.5} color="#8ff5ff" />
      <GlowRing position={[0, 0.7, 0]} radius={0.4} color="#00deec" />

      {/* Data points on muscle groups */}
      <DataPoint position={[-0.3, 1.4, 0.2]} color="#2efd7c" />
      <DataPoint position={[0.3, 1.4, 0.2]} color="#2efd7c" />
      <DataPoint position={[0, 0.7, 0.25]} color="#8ff5ff" />
      <DataPoint position={[-0.15, -0.2, 0.12]} color="#ff7162" />
      <DataPoint position={[0.15, -0.2, 0.12]} color="#ff7162" />

      {/* Scan line */}
      <ScanLine />
    </group>
  )
}

function Particles() {
  const count = 200
  const ref = useRef()

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return pos
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#8ff5ff"
        size={0.015}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

export default function BodyModel({
  height = '500px',
  muscleHighlights = {},
  enableControls = false,
  className = '',
}) {
  return (
    <div className={`body-model-container ${className}`} style={{ height, width: '100%' }}>
      <Canvas
        camera={{ position: [0, 1, 4], fov: 40 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#8ff5ff" />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#2efd7c" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <HumanBody muscleHighlights={muscleHighlights} />
        </Float>

        <Particles />

        {enableControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI * 0.75}
            minPolarAngle={Math.PI * 0.25}
          />
        )}
      </Canvas>
    </div>
  )
}
