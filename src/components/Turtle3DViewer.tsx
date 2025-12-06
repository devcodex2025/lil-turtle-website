"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function TurtleModel() {
    // Load the GLB model (with embedded materials and textures)
    const { scene } = useGLTF("/3d/colorfull_glb/base_basic_pbr.glb");

    return <primitive object={scene} scale={8.0} position={[0, -0.5, 0]} />;
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
                <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />
                <Suspense fallback={<LoadingBox />}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                    <directionalLight position={[-5, 3, -5]} intensity={0.5} />
                    <pointLight position={[0, 5, 0]} intensity={0.8} color="#00ff9d" />
                    <TurtleModel />
                    <OrbitControls
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={1.5}
                        enablePan={false}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
