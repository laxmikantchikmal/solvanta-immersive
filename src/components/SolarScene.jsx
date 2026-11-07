import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function Panel({ position, rotation = [0, 0, 0], scale = 1 }) {
  const group = useRef()
  const cells = useMemo(() => Array.from({ length: 6 }, (_, i) => i), [])
  return <group ref={group} position={position} rotation={rotation} scale={scale}>
    <mesh position={[0, 0, -0.035]}><boxGeometry args={[2.45, 1.42, 0.07]}/><meshStandardMaterial color="#aab5a9" metalness={0.82} roughness={0.27}/></mesh>
    <mesh position={[0, 0, 0.012]}><boxGeometry args={[2.38, 1.35, 0.018]}/><meshPhysicalMaterial color="#142b3a" metalness={0.7} roughness={0.2} clearcoat={0.8} clearcoatRoughness={0.18}/></mesh>
    {cells.map(i => <mesh key={i} position={[-0.99 + i * 0.396, 0, 0.026]}><boxGeometry args={[0.012, 1.32, 0.008]}/><meshBasicMaterial color="#6e94a1" transparent opacity={0.55}/></mesh>)}
    {[-0.44, 0, 0.44].map(y => <mesh key={y} position={[0, y, 0.027]}><boxGeometry args={[2.34, 0.012, 0.008]}/><meshBasicMaterial color="#6e94a1" transparent opacity={0.55}/></mesh>)}
    <mesh position={[0, 0, 0.04]}><planeGeometry args={[2.34, 1.31]}/><meshBasicMaterial color="#75b9d3" transparent opacity={0.045}/></mesh>
  </group>
}

function ArrayModel() {
  const rig = useRef()
  useFrame((state, delta) => {
    if (rig.current) {
      rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, (state.pointer.x * 0.18), 2, delta)
      rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -0.12 + state.pointer.y * 0.07, 2, delta)
    }
  })
  return <group ref={rig}>
    <Float speed={1.05} rotationIntensity={0.035} floatIntensity={0.16}>
      <group position={[0, -0.05, 0]}>
        <Panel position={[-1.25, 0.42, 0.1]} rotation={[-0.48, 0.13, -0.04]} scale={1.02}/>
        <Panel position={[1.2, 0.08, -0.35]} rotation={[-0.48, -0.12, 0.04]} scale={1.02}/>
        <Panel position={[0, 1.25, -1.15]} rotation={[-0.48, 0, 0]} scale={0.9}/>
        <mesh position={[0, -0.88, -0.15]} rotation={[0, 0, 0]}><boxGeometry args={[4.7, 0.08, 0.12]}/><meshStandardMaterial color="#78877e" metalness={0.8} roughness={0.35}/></mesh>
        {[-1.65, 0, 1.65].map(x => <mesh key={x} position={[x, -0.49, -0.15]}><cylinderGeometry args={[0.035, 0.045, 0.82, 12]}/><meshStandardMaterial color="#9aa59b" metalness={0.75}/></mesh>)}
      </group>
    </Float>
  </group>
}

export default function SolarScene() {
  return <div className="scene-shell" aria-label="Interactive 3D visualization of a solar panel array">
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.5, 6.8], fov: 36 }} gl={{ antialias: true, alpha: true }} fallback={<div className="scene-fallback"><div className="fallback-panel"/><span>Solar, reimagined.</span></div>}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.85}/><directionalLight position={[4, 5, 5]} intensity={3.1} color="#e9ffd1"/>
        <pointLight position={[-4, 1, -3]} intensity={2.2} color="#5a9fbe"/>
        <ArrayModel/>
        <Sparkles count={34} scale={7} size={1.5} speed={0.22} opacity={0.42} color="#c8f169"/>
        <ContactShadows position={[0, -1.4, 0]} opacity={0.36} scale={8} blur={2.5} far={3}/>
      </Suspense>
    </Canvas>
    <div className="scene-orbit orbit-one"/><div className="scene-orbit orbit-two"/>
    <div className="scene-caption"><span className="live-dot"/> INTERACTIVE ENERGY MODEL <span>01 / 04</span></div>
  </div>
}
