"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Center, OrbitControls } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { Box3, Vector3, type Group } from "three";

// كم نبي طول الطيارة يكون في المشهد
const TARGET_SIZE = 8;

function Jet() {
  const { scene } = useGLTF("/jet.glb");
  const ref = useRef<Group>(null);

  // نقيس الطيارة ونحسب كم نكبرها عشان توصل للحجم اللي نبيه
  const scale = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    return TARGET_SIZE / Math.max(size.x, size.y, size.z);
  }, [scene]);

  // حركة الطيران: تطلع وتنزل وتميل شوي
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = Math.sin(t * 1.2) * 0.15;
    ref.current.rotation.z = Math.sin(t * 0.8) * 0.08;
  });

  return (
    <group ref={ref}>
      <Center>
        <primitive object={scene} scale={scale} />
      </Center>
    </group>
  );
}

export default function Jet3D() {
  return (
    <div className="w-full h-[50vh]">
      <Canvas camera={{ position: [6, 2, 8], fov: 35 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <Jet />
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/jet.glb");