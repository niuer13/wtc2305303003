import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, PresentationControls, Float, useProgress, Html } from '@react-three/drei';
import { Suspense } from 'react';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
        <p className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.2em] whitespace-nowrap">
          正在同步数据 {progress.toFixed(0)}%
        </p>
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
          <PresentationControls
            global
            snap
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <Float rotationIntensity={0.5} floatIntensity={0.5} speed={2}>
              <Stage environment="city">
                <Model url={modelUrl} />
              </Stage>
            </Float>
          </PresentationControls>
          <OrbitControls makeDefault enableZoom={false} />
        </Suspense>
      </Canvas>
      
      {/* 3D Interaction Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 pointer-events-none">
        <p className="text-[10px] font-mono uppercase tracking-widest opacity-60">拖动以旋转 · 3D 交互模式</p>
      </div>
    </div>
  );
}
