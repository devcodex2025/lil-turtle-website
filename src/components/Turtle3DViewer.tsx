"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function TurtleModel() {
    // Load the GLB model (with embedded materials and textures)
    const { scene } = useGLTF("/3d/colorfull_glb/base_basic_pbr.glb");
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // 180 degrees side to side = +/- 90 degrees from center
            // 90 degrees in radians = Math.PI / 2
            // Speed factor 0.5 for smooth sway
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * (Math.PI / 2);
        }
    });

    return (
        <group ref={groupRef}>
            <primitive object={scene} scale={5.5} position={[0, -3.5, 0]} />
        </group>
    );
}

function LoadingBox() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#00ff9d" wireframe />
        </mesh>
    );
}

export default function Turtle3DViewer() {
    return (
        <div className="w-full h-[80vh] relative">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 1, 18]} fov={45} />
                <Suspense fallback={<LoadingBox />}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[5, 2, 10]} intensity={1.5} castShadow />
                    <directionalLight position={[-5, 3, -5]} intensity={0.5} />
                    <pointLight position={[0, 10, 0]} intensity={0.8} color="#00ff9d" />
                    <TurtleModel />
                    <OrbitControls
                        enableZoom={false}
                        enableRotate={true}
                        enablePan={false}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
