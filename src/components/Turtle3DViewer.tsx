"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

function TurtleModel() {
    // Load the OBJ model
    const obj = useLoader(OBJLoader, "/3d/colored/base.obj");

    // Load textures
    const diffuseMap = useLoader(THREE.TextureLoader, "/3d/colored/texture_diffuse.png");
    const normalMap = useLoader(THREE.TextureLoader, "/3d/colored/texture_normal.png");
    const roughnessMap = useLoader(THREE.TextureLoader, "/3d/colored/texture_roughness.png");
    const metallicMap = useLoader(THREE.TextureLoader, "/3d/colored/texture_metallic.png");

    // Apply materials to the model
    if (obj) {
        obj.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshStandardMaterial({
                    map: diffuseMap,
                    normalMap: normalMap,
                    roughnessMap: roughnessMap,
                    metalnessMap: metallicMap,
                    metalness: 0.5,
                    roughness: 0.5,
                });
            }
        });
    }

    return <primitive object={obj} scale={0.5} />;
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
        <div className="w-full h-[600px] relative">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
                <Suspense fallback={<LoadingBox />}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                    <directionalLight position={[-5, 3, -5]} intensity={0.5} />
                    <pointLight position={[0, 5, 0]} intensity={0.8} color="#00ff9d" />
                    <TurtleModel />
                    <OrbitControls
                        enableZoom={true}
                        autoRotate
                        autoRotateSpeed={1.5}
                        minDistance={3}
                        maxDistance={10}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
