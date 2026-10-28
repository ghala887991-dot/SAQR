"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { Box3, Vector3, MathUtils, type Mesh, type Group } from "three";

// كم نبي طول الطيارة يكون في المشهد
const TARGET_SIZE = 8;

// وضع الطيارة في كل قسم: مكانها، دورانها، حجمها، وكم تتفكك
type Frame = {
  x: number; y: number;
  rotX: number; rotY: number; rotZ: number;
  scale: number; explode: number;
};
const KEYFRAMES: Frame[] = [
  { x: -2.2, y: 0.2, rotX: 0.25, rotY: 0.7, rotZ: 0.05, scale: 0.95, explode: 0 }, // 01
  { x: 0, y: 1.5, rotX: 0.5, rotY: 2.2, rotZ: 0.2, scale: 0.6, explode: 1 },       // 02 تتفكك فوق
  { x: 2.4, y: -0.1, rotX: 0.1, rotY: -2.4, rotZ: 0, scale: 1.3, explode: 0 },     // 03 يسار
  { x: 0, y: 1.2, rotX: 0.3, rotY: 0.2, rotZ: -0.1, scale: 0.75, explode: 0 },     // 04 فوق
];


type Part = { mesh: Mesh; start: Vector3; offset: Vector3 };

function Jet() {
    const { scene: original } = useGLTF("/jet.glb");
  // نسخة جديدة من الطيارة، عشان الحسابات ما تتلخبط لما نعدل الكود
  const scene = useMemo(() => original.clone(true), [original]);
  const ref = useRef<Group>(null);
  const smooth = useRef<Frame>({ ...KEYFRAMES[0] });

  // نقيس الطيارة، ونحسب لكل قطعة وين تطير لما تتفكك
  const { scale, center, parts } = useMemo(() => {
    scene.position.set(0, 0, 0);
    scene.traverse((obj) => {
      const mesh = obj as Mesh;
      if (!mesh.isMesh) return;
      if (!mesh.userData.start) mesh.userData.start = mesh.position.clone();
      mesh.position.copy(mesh.userData.start);
    });
    scene.updateMatrixWorld(true);

    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const center = box.getCenter(new Vector3());

    const parts: Part[] = [];
    scene.traverse((obj) => {
      const mesh = obj as Mesh;
      if (!mesh.isMesh || !mesh.parent) return;
      mesh.geometry.computeBoundingBox();
      const partCenter = mesh.geometry.boundingBox!.getCenter(new Vector3());
      mesh.localToWorld(partCenter);
      const dir = partCenter.clone().sub(center).normalize();
      const target = partCenter.clone().add(dir.multiplyScalar(maxDim * 0.35));
      const a = mesh.parent.worldToLocal(partCenter.clone());
      const b = mesh.parent.worldToLocal(target);
      parts.push({ mesh, start: mesh.userData.start, offset: b.sub(a) });
    });

    return { scale: TARGET_SIZE / maxDim, center, parts };
  }, [scene]);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // كم نزل الزائر في الصفحة: من 0 (فوق) إلى 1 (تحت)
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;

    // أي قسمين إحنا بينهم، وكم وصلنا بينهم
    const seg = progress * (KEYFRAMES.length - 1);
    const i = Math.min(Math.floor(seg), KEYFRAMES.length - 2);
    const t = MathUtils.smoothstep(seg - i, 0, 1);
    const a = KEYFRAMES[i];
    const b = KEYFRAMES[i + 1];

    // نمشي للوضع الجديد بنعومة بدل ما نقفز له
    const s = smooth.current;
    for (const key of Object.keys(s) as (keyof Frame)[]) {
      const goal = MathUtils.lerp(a[key], b[key], t);
      s[key] = MathUtils.damp(s[key], goal, 4, delta);
    }

    const time = state.clock.getElapsedTime();
    const g = ref.current;
    g.position.set(s.x, s.y + Math.sin(time * 1.2) * 0.1, 0);
    g.rotation.set(s.rotX, s.rotY, s.rotZ + Math.sin(time * 0.8) * 0.04);
    g.scale.setScalar(s.scale);

    for (const p of parts) {
      p.mesh.position.copy(p.start).addScaledVector(p.offset, s.explode);
    }
  });

  return (
    <group ref={ref}>
      <group scale={scale}>
        <primitive object={scene} position={[-center.x, -center.y, -center.z]} />
      </group>
    </group>
  );
}

useGLTF.preload("/jet.glb");export default function Jet3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0.5, 12], fov: 35 }} dpr={[1, 2]} gl={{ toneMappingExposure: 0.7 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-6, -2, -4]} color="#22E36A" intensity={60} />
        <Suspense fallback={null}>
          <Jet />
          <Environment preset="city" environmentIntensity={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/jet.glb");