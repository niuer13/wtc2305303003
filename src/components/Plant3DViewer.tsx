import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, PresentationControls, Float, useProgress, Html } from '@react-three/drei';
import { Suspense } from 'react';

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/10" />
          <div className="absolute inset-0 rounded-full border-t-2 border-emerald-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-emerald-500/5 animate-pulse" />
        </div>
      </div>
    </Html>
  );
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function Plant3DViewer({ modelUrl }: { modelUrl: string }) {
  if (!modelUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-3xl border border-white/10">
        <p className="text-xs font-mono opacity-40 uppercase tracking-widest">未配置 3D 模型数据</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black/20 rounded-3xl overflow-hidden border border-white/5 relative">
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
        <Suspense fallback={<Loader />}>
          <Stage environment="city" adjustCamera intensity={0.5} contactShadow={false}>
            <Model url={modelUrl} />
          </Stage>
          <OrbitControls 
            makeDefault 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={2} 
          />
        </Suspense>
      </Canvas>
      
    </div>
  );
}
