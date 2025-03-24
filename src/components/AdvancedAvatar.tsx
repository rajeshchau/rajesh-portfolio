"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  Environment,
  Bounds,
  ContactShadows,
  useHelper,
  useFBX,
  Cloud,
  Float,
  Stars,
  Trail,
} from "@react-three/drei";
import { motion } from "framer-motion";
import { useSpring, animated, extend } from "@react-spring/three";
import * as THREE from "three";
import gsap from "gsap";

extend({ group: THREE.Group, mesh: THREE.Mesh });
import { SpotLightHelper, DirectionalLightHelper } from "three";

// Stylized human-like avatar
function StylizedAvatar({ ...props }) {
  const group = useRef<THREE.Group>();
  const headRef = useRef<THREE.Mesh>();
  const bodyRef = useRef<THREE.Mesh>();
  const leftArmRef = useRef<THREE.Mesh>();
  const rightArmRef = useRef<THREE.Mesh>();

  // Interactive animation
  const [hovered, setHovered] = useState(false);
  const [waving, setWaving] = useState(false);

  // Animated props with react-spring
  const { headScale } = useSpring({
    headScale: hovered ? [1.05, 1.05, 1.05] : [1, 1, 1],
    config: { mass: 1, tension: 280, friction: 60 }
  });

  const { position } = useSpring({
    position: waving ? [0, 0.1, 0] : [0, 0, 0],
    config: { mass: 1, tension: 280, friction: 60 }
  });

  // Wave animation effect
  useEffect(() => {
    if (waving && rightArmRef.current) {
      const timeline = gsap.timeline({ repeat: 2, onComplete: () => setWaving(false) });
      timeline.to(rightArmRef.current.rotation, { y: 0.2, z: -0.5, duration: 0.2 });
      timeline.to(rightArmRef.current.rotation, { y: -0.2, z: -0.3, duration: 0.2 });
      timeline.to(rightArmRef.current.rotation, { y: 0.2, z: -0.5, duration: 0.2 });
      timeline.to(rightArmRef.current.rotation, { y: 0, z: 0, duration: 0.2 });
    }
  }, [waving]);

  // Subtle floating animation
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }

    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        hovered ? 0.2 : 0,
        0.1
      );
    }
  });

  return (
    <animated.group
      ref={group}
      {...props}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setWaving(true)}
    >
      {/* Main body */}
      <animated.mesh
        ref={bodyRef}
        position={[0, -0.7, 0]}
        castShadow
      >
        <capsuleGeometry args={[0.5, 1.2, 8, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          roughness={0.2}
          metalness={0.8}
          emissive="#1e40af"
          emissiveIntensity={0.1}
        />
      </animated.mesh>

      {/* Head */}
      <animated.mesh
        ref={headRef}
        position={[0, 0.6, 0]}
        scale={headScale}
        castShadow
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          roughness={0.2}
          metalness={0.8}
          emissive="#1e40af"
          emissiveIntensity={0.1}
        />

        {/* Eyes */}
        <mesh position={[0.2, 0.1, 0.4]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>

        <mesh position={[-0.2, 0.1, 0.4]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>

        {/* Pupils */}
        <mesh position={[0.2, 0.1, 0.48]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="black" />
        </mesh>

        <mesh position={[-0.2, 0.1, 0.48]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="black" />
        </mesh>

        {/* Smile */}
        <mesh position={[0, -0.1, 0.45]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.2, 0.03, 16, 32, Math.PI]} />
          <meshBasicMaterial color="black" />
        </mesh>

        {/* Hair */}
        <mesh position={[0, 0.2, 0]} rotation={[0, 0, 0]}>
          <sphereGeometry args={[0.52, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
      </animated.mesh>

      {/* Left Arm */}
      <animated.mesh
        ref={leftArmRef}
        position={[-0.7, -0.4, 0]}
        rotation={[0, 0, 0.5]}
        castShadow
      >
        <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          roughness={0.2}
          metalness={0.8}
          emissive="#1e40af"
          emissiveIntensity={0.1}
        />
      </animated.mesh>

      {/* Right Arm */}
      <animated.mesh
        ref={rightArmRef}
        position={[0.7, -0.4, 0]}
        rotation={[0, 0, -0.5]}
        castShadow
      >
        <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          roughness={0.2}
          metalness={0.8}
          emissive="#1e40af"
          emissiveIntensity={0.1}
        />
      </animated.mesh>

      {/* Legs */}
      <mesh position={[-0.25, -1.5, 0]} castShadow>
        <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          roughness={0.2}
          metalness={0.8}
          emissive="#1e40af"
          emissiveIntensity={0.1}
        />
      </mesh>

      <mesh position={[0.25, -1.5, 0]} castShadow>
        <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          roughness={0.2}
          metalness={0.8}
          emissive="#1e40af"
          emissiveIntensity={0.1}
        />
      </mesh>
    </animated.group>
  );
}

function Lights() {
  const spotLightRef = useRef();
  const directionalLightRef = useRef();

  // Debug light helpers
  // useHelper(spotLightRef, SpotLightHelper, 'yellow');
  // useHelper(directionalLightRef, DirectionalLightHelper, 1, 'red');

  return (
    <>
      <ambientLight intensity={0.4} />

      <spotLight
        ref={spotLightRef}
        position={[5, 10, 5]}
        angle={0.3}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />

      <directionalLight
        ref={directionalLightRef}
        position={[-5, 5, -5]}
        intensity={0.8}
        castShadow
      />

      <pointLight position={[0, 5, 0]} intensity={0.5} color="#4338ca" />
    </>
  );
}

// Scene environment with particles
function Environment3D() {
  return (
    <>
      <Stars radius={50} depth={50} count={1000} factor={4} />

      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={1}
        position={[3, 2, -4]}
      >
        <Cloud
          opacity={0.4}
          speed={0.1}
          width={5}
          depth={1.5}
          segments={15}
        />
      </Float>

      <Float
        speed={1.5}
        rotationIntensity={0.2}
        floatIntensity={0.8}
        position={[-3, -1, -4]}
      >
        <Cloud
          opacity={0.3}
          speed={0.1}
          width={4}
          depth={2}
          segments={12}
        />
      </Float>

      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.3}
        scale={10}
        blur={2}
        far={4}
      />
    </>
  );
}

function Scene() {
  return (
    <>
      <Environment3D />
      <Lights />
      <StylizedAvatar position={[0, 0, 0]} />
    </>
  );
}

export default function AdvancedAvatar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-blue-500/10 to-purple-600/20 z-0" />

      {/* Glass effect overlay */}
      <div className="absolute inset-0 backdrop-blur-[1px] backdrop-filter z-0" />

      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        <Scene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>

      {/* Interactive overlay text */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm font-medium px-4 py-2 bg-black/20 backdrop-blur-md rounded-full w-max mx-auto">
        <span className="animate-pulse">Click on me! 👋</span>
      </div>
    </motion.div>
  );
}
