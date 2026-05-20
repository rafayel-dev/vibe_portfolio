import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Animated floating torus knot
function TorusKnot({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
      ref.current.rotation.y = state.clock.elapsedTime * 0.5 * speed;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
        wireframe={false}
      />
    </mesh>
  );
}

// Floating orb
function FloatingOrb({ position, color, size = 0.5 }: { position: [number, number, number]; color: string; size?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={ref} args={[size, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
        />
      </Sphere>
    </Float>
  );
}

// Grid floor
function GridFloor() {
  const ref = useRef<THREE.GridHelper>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.z = (state.clock.elapsedTime * 0.5) % 2;
    }
  });
  return (
    <gridHelper
      ref={ref}
      args={[40, 40, '#00f5ff', '#0d0d2b']}
      position={[0, -3, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

// Particles
function Particles({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#00f5ff" size={0.05} transparent opacity={0.6} />
    </points>
  );
}

// Central platform / hero object
function HeroPlatform() {
  const ref = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      // Mouse parallax
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouse.y * 0.1, 0.05);
    }
  });

  return (
    <group ref={ref} position={[0, 0, 0]}>
      {/* Main octahedron */}
      <mesh>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={0.3}
          metalness={1}
          roughness={0}
          wireframe
        />
      </mesh>
      {/* Inner solid */}
      <mesh>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#bf00ff"
          emissive="#bf00ff"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={1}
          metalness={1}
          roughness={0}
        />
      </mesh>
      {/* Ring 2 */}
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#bf00ff"
          emissive="#bf00ff"
          emissiveIntensity={1}
          metalness={1}
          roughness={0}
        />
      </mesh>
    </group>
  );
}

// Camera rig with mouse parallax
function CameraRig() {
  const { camera, mouse } = useThree();

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 1.5, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.8 + 0.5, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Ambient rings
function AmbientRings() {
  const ref1 = useRef<THREE.Mesh>(null);
  const ref2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref1.current) ref1.current.rotation.z = state.clock.elapsedTime * 0.3;
    if (ref2.current) ref2.current.rotation.z = -state.clock.elapsedTime * 0.2;
  });

  return (
    <>
      <mesh ref={ref1} position={[3, 1, -2]}>
        <torusGeometry args={[1, 0.02, 8, 50]} />
        <meshStandardMaterial color="#0080ff" emissive="#0080ff" emissiveIntensity={0.8} />
      </mesh>
      <mesh ref={ref2} position={[-3, -1, -2]}>
        <torusGeometry args={[0.8, 0.02, 8, 50]} />
        <meshStandardMaterial color="#bf00ff" emissive="#bf00ff" emissiveIntensity={0.8} />
      </mesh>
    </>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.1} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#00f5ff" />
          <pointLight position={[-5, -5, -5]} intensity={1.5} color="#bf00ff" />
          <pointLight position={[0, 5, -5]} intensity={1} color="#0080ff" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={0.5}
            intensity={2}
            color="#00f5ff"
            castShadow
          />

          {/* Camera rig */}
          <CameraRig />

          {/* Stars */}
          <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

          {/* Main hero object */}
          <HeroPlatform />

          {/* Floating elements */}
          <FloatingOrb position={[3.5, 1.5, -1]} color="#00f5ff" size={0.3} />
          <FloatingOrb position={[-3.5, -1, -1]} color="#bf00ff" size={0.4} />
          <FloatingOrb position={[2.5, -2, -2]} color="#0080ff" size={0.25} />
          <FloatingOrb position={[-2, 2, -3]} color="#ff0080" size={0.2} />

          {/* Torus knots */}
          <TorusKnot position={[4, 0, -3]} color="#00f5ff" speed={0.5} />
          <TorusKnot position={[-4, 0, -3]} color="#bf00ff" speed={0.7} />

          {/* Grid */}
          <GridFloor />

          {/* Particles */}
          <Particles count={300} />

          {/* Ambient rings */}
          <AmbientRings />

          {/* Fog */}
          <fog attach="fog" args={['#020010', 10, 30]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
