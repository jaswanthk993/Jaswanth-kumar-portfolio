import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function FloatingShape({ position, type, color = "#2271ff" }: { 
  position: [number, number, number]; 
  type: 'sphere' | 'box' | 'torus';
  color?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {type === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
      {type === 'box' && <boxGeometry args={[0.8, 0.8, 0.8]} />}
      {type === 'torus' && <torusGeometry args={[0.5, 0.2, 16, 32]} />}
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a90ff" />
      
      <FloatingShape position={[-4, 2, -5]} type="sphere" />
      <FloatingShape position={[4, -2, -8]} type="box" color="#3b82f6" />
      <FloatingShape position={[0, 3, -6]} type="torus" />
      <FloatingShape position={[-3, -3, -7]} type="sphere" color="#60a5fa" />
      <FloatingShape position={[3, 1, -9]} type="box" />
      <FloatingShape position={[-1, -1, -5]} type="torus" color="#3b82f6" />
    </>
  );
}

const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 opacity-40">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FloatingBackground;
