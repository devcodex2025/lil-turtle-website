"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF, Html } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

function TurtleModel() {
    // Load the GLB model (with embedded materials and textures)
    const { scene } = useGLTF("/3d/colorfull_glb/compressed_3d_model_lil_turtle.glb");
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Limit to +/- 15 degrees (Math.PI / 12)
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.25) * (Math.PI / 12);
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
        <group>
            <mesh rotation={[0, 0, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#00ff9d" wireframe transparent opacity={0.3} />
            </mesh>
            <Html center>
                <div className="flex flex-col items-center justify-center pointer-events-none select-none">
                    <div className="w-12 h-12 border-4 border-primary-green border-t-transparent rounded-full animate-spin mb-4"></div>
                    <span className="text-primary-green font-bold text-sm tracking-widest whitespace-nowrap">LOADING 3D...</span>
                </div>
            </Html>
        </group>
    );
}

export default function Turtle3DViewer() {
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || window.matchMedia?.('(pointer: coarse)').matches);
    const [allowRotate, setAllowRotate] = useState(false);

    return (
        <div className="w-full h-[80vh] relative" style={{ touchAction: 'pan-y' }}>
            <Canvas style={{ touchAction: 'pan-y' }}>
                <PerspectiveCamera makeDefault position={[0, 1, 18]} fov={45} />
                <Suspense fallback={<LoadingBox />}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[5, 2, 10]} intensity={1.5} castShadow />
                    <directionalLight position={[-5, 3, -5]} intensity={0.5} />
                    <pointLight position={[0, 10, 0]} intensity={0.8} color="#00ff9d" />
                    <TurtleModel />
                    <OrbitControls
                        enableZoom={false}
                        enableRotate={!isTouch || allowRotate}
                        enablePan={false}
                        minAzimuthAngle={-Math.PI / 6} // Limit left rotation (30 deg)
                        maxAzimuthAngle={Math.PI / 6}  // Limit right rotation (30 deg)
                        minPolarAngle={Math.PI / 2 - 0.2} // Limit up look
                        maxPolarAngle={Math.PI / 2 + 0.2} // Limit down look
                    />
                </Suspense>
            </Canvas>

            {/* Small toggle for enabling rotation on touch devices to avoid hijacking scroll */}
            {isTouch && (
                <button
                    className={`absolute left-4 bottom-4 bg-black/60 text-white px-3 py-2 rounded-full text-xs font-bold border border-white/10 ${allowRotate ? 'bg-primary-green text-black' : ''}`}
                    onClick={() => setAllowRotate(!allowRotate)}
                    aria-pressed={allowRotate}
                >
                    {allowRotate ? 'Manual rotate: ON' : 'Manual rotate: OFF'}
                </button>
            )}
        </div>
    );
}
