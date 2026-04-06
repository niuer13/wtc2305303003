import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Html } from '@react-three/drei';
import { Suspense, Component, ReactNode } from 'react';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div className="flex flex-col items-center gap-2 text-center px-4">
            <p className="text-[10px] font-mono text-red-400 uppercase tracking-widest">
              模型加载失败
            </p>
            <p className="text-[8px] font-mono opacity-40 uppercase tracking-tighter">
              请检查网络连接 (可能需要代理)
            </p>
          </div>
        </Html>
      );
    }
    return this.props.children;
  }
}

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
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]} // Optimize for mobile high-DPI screens
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={<Loader />}>
          <ErrorBoundary>
            <Stage environment="city" adjustCamera intensity={0.5}>
              <Model url={modelUrl} />
            </Stage>
            <OrbitControls 
              makeDefault 
              enableZoom={false} 
              enablePan={false} 
              autoRotate 
              autoRotateSpeed={2} 
            />
          </ErrorBoundary>
        </Suspense>
      </Canvas>
    </div>
  );
}
