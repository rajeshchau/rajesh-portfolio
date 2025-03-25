"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";

function AvatarModel({ ...props }) {
  const group = useRef<THREE.Group>(null);


  // Simple animation for our avatar
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Simple 3D avatar shape */}
      <mesh castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#1e40af"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="white" />
      </mesh>

      <mesh position={[-0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Pupils */}
      <mesh position={[0.3, 0.2, 0.9]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="black" />
      </mesh>

      <mesh position={[-0.3, 0.2, 0.9]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="black" />
      </mesh>

      {/* Smile */}
      <mesh position={[0, -0.1, 0.8]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.4, 0.05, 16, 32, Math.PI]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </group>
  );
}

function FloatingGlow() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -1]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial color="#2563eb" opacity={0.1} transparent={true} />
    </mesh>
  );
}

export default function AvatarScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        <ambientLight intensity={0.3} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <pointLight position={[-5, -5, -5]} intensity={1} />

        <FloatingGlow />
        <AvatarModel position={[0, 0, 0]} scale={1.2} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </motion.div>
  );
}
