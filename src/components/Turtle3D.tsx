"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { motion } from "framer-motion";

function TurtleModel() {
    // For now, we'll use a placeholder since the OBJ file is very large
    // In production, you'd want to convert the OBJ to a more optimized format like GLB
    return (
        <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#00ff9d" />
        </mesh>
    );
}

export default function Turtle3D() {
    return (
        <div className="w-full h-[600px] relative">
            <Canvas camera={{ position: [0, 0, 10], fov: 100 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={1} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[0, 0, 0]} />
                    <TurtleModel />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                </Suspense>
            </Canvas>
        </div>
    );
}
