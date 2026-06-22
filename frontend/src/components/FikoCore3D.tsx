'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function Core() {
    const mesh = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        mesh.current.rotation.x = Math.sin(t) * 0.2;
        mesh.current.rotation.y = Math.cos(t) * 0.2;
        
        // Dynamic emissive pulse
        if (mesh.current.material instanceof THREE.MeshStandardMaterial || 
            mesh.current.material instanceof THREE.MeshPhysicalMaterial) {
            mesh.current.material.emissiveIntensity = 10 + Math.sin(t * 2) * 5;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Sphere ref={mesh} args={[1, 64, 64]} scale={2.2}>
                <MeshDistortMaterial
                    color="#FF2718"
                    attach="material"
                    distort={0.6}
                    speed={4}
                    roughness={0.05}
                    metalness={0.9}
                    emissive="#FF2718"
                    emissiveIntensity={15}
                    clearcoat={1}
                    clearcoatRoughness={0}
                />
            </Sphere>
        </Float>
    );
}

export default function FikoCore3D() {
    return (
        <div className="absolute inset-0 z-0 bg-black">
            <div className="absolute inset-0 bg-[#FF2718]/10 blur-[150px] rounded-full animate-pulse"></div>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true }}>
                <color attach="background" args={['#000000']} />
                <ambientLight intensity={1} color="#FF2718" />
                <pointLight position={[10, 10, 10]} intensity={4} color="#FF2718" />
                <pointLight position={[-10, -10, -10]} intensity={2} color="#FF0000" />
                <spotLight position={[0, 10, 0]} intensity={8} color="#FF2718" />
                <Core />
                <Environment preset="night" />
            </Canvas>
        </div>
    );
}
