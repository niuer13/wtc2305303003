/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronLeft, Info, BookOpen, Map as MapIcon, Leaf, Wind, Zap, Box, Image as ImageIcon, Shield, Target, Zap as ZapIcon, Eye, Layers, Thermometer, Droplets, Sun, ScrollText, PenTool, Search, Filter, ArrowUpRight, Fingerprint, ArrowDown, Globe, Microscope, Compass, Database, Star } from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { plants, categories, Plant } from './data/plants';
import Plant3DViewer from './components/Plant3DViewer';

// Placeholder for removed images
function ImagePlaceholder({ className, text = "IMAGE" }: { className?: string, text?: string }) {
  return (
    <div className={`bg-white/5 flex flex-col items-center justify-center text-[10px] opacity-20 font-mono gap-2 ${className}`}>
      <ImageIcon className="w-6 h-6" />
      <span>{text}</span>
    </div>
  );
}

// Environment Component
function PlantEnvironment({ env }: { env: Plant['environment'] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {[
        { label: '适宜温度', value: env.temp, icon: Thermometer, color: 'text-orange-400' },
        { label: '环境湿度', value: env.humidity, icon: Droplets, color: 'text-blue-400' },
        { label: '光照需求', value: env.light, icon: Sun, color: 'text-yellow-400' },
      ].map((item) => (
        <div key={item.label} className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-row sm:flex-col items-center sm:justify-center text-left sm:text-center gap-3 sm:gap-2 group hover:bg-white/10 transition-colors">
          <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.color} shrink-0`} />
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[10px] uppercase tracking-widest opacity-40 font-mono">{item.label}</span>
            <span className="text-xs font-medium font-sans">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Discovery Log Component
function DiscoveryLog({ plant }: { plant: Plant }) {
  return (
    <div className="relative p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2rem] bg-[#1a1512] border border-orange-900/20 overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <ScrollText className="w-24 h-24 sm:w-40 sm:h-40" />
      </div>
      
      <div className="relative z-10 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-orange-900/20 pb-4 sm:pb-6 gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-900/20 flex items-center justify-center shrink-0">
              <PenTool className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500/70" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-display font-bold italic text-orange-200/80">考察日志</h4>
              <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] opacity-40 font-mono">Explorer's Field Notes</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-[8px] sm:text-[10px] font-mono opacity-40 uppercase tracking-widest">Specimen Status</p>
            <p className="text-[10px] sm:text-xs font-bold text-emerald-500 uppercase tracking-widest">Active / Monitored</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-orange-500" />
              <h5 className="text-[10px] sm:text-xs uppercase tracking-widest text-orange-500/60 font-mono font-bold">形态观察</h5>
            </div>
            <p className="text-xs sm:text-sm font-sans leading-relaxed text-orange-100/60 italic">
              “这种植物展现出了令人惊叹的进化智慧。它的{plant.mechanism.split('：')[0]}结构不仅是生存的工具，更是自然界精密的工程杰作。在野外观察中，我们发现其{plant.description.slice(0, 20)}... 的特征在特定光线下显得格外诡秘。”
            </p>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-orange-500" />
              <h5 className="text-[10px] sm:text-xs uppercase tracking-widest text-orange-500/60 font-mono font-bold">生存策略</h5>
            </div>
            <p className="text-xs sm:text-sm font-sans leading-relaxed text-orange-100/60 italic">
              “与其说它是在生长，不如说它是在‘狩猎’或‘博弈’。它对环境的适应性极强，尤其是在{plant.environment.temp}和{plant.environment.humidity}的条件下，其活跃度达到了巅峰。这再次证明了生命在极端环境下的无限可能。”
            </p>
          </div>
        </div>

        <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 border-t border-orange-900/10 text-orange-100/40 text-[8px] sm:text-[10px] uppercase tracking-widest font-mono">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span>Location: {plant.environment.temp} Zone</span>
            <span className="opacity-20 hidden sm:inline">|</span>
            <span>Date: 2026.03.25</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-orange-500/50" />
            <span>Verified Specimen</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Habitat Map Component
function HabitatMap({ category }: { category: string }) {
  const hotspots = useMemo(() => {
    if (category === 'carnivorous') return ['亚马逊盆地', '东南亚沼泽', '马达加斯加'];
    if (category === 'parasitic') return ['刚果雨林', '喜马拉雅南麓', '澳洲内陆'];
    return ['纳米布沙漠', '墨西哥荒原', '中亚戈壁'];
  }, [category]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-widest font-mono">
          <MapIcon className="w-4 h-4 text-emerald-500" /> 全球分布热力图
        </div>
        <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">
          Active Hotspots: {hotspots.length}
        </div>
      </div>
      <div className="glass-panel p-8 rounded-3xl aspect-video relative overflow-hidden group">
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
          <svg viewBox="0 0 800 400" className="w-full h-full fill-white">
            <path d="M50,200 Q150,100 250,200 T450,300 T650,200 T750,100" stroke="currentColor" fill="none" strokeWidth="0.5" strokeDasharray="4 4" />
            <circle cx="200" cy="150" r="5" className="animate-pulse fill-emerald-500" />
            <circle cx="450" cy="220" r="8" className="animate-pulse fill-emerald-500" />
            <circle cx="600" cy="120" r="4" className="animate-pulse fill-emerald-500" />
            <circle cx="150" cy="280" r="3" className="animate-pulse fill-emerald-500/50" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div className="space-y-1">
            <p className="text-sm font-bold">主要分布区</p>
            <p className="text-[10px] opacity-50 uppercase font-mono">Primary Distribution Zones</p>
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {hotspots.map((h, i) => (
                <span key={i} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono opacity-60">
                  {h}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-mono">高密度区</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
                <span className="text-[10px] font-mono">次级分布</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Marquee Component
function Marquee() {
  const items = ["CRITICAL SPECIMEN DETECTED", "EVOLUTIONARY ANOMALY", "HABITAT LOSS ALERT", "NEW DISCOVERY IN AMAZON", "MIMICRY LEVEL: EXPERT"];
  return (
    <div className="py-2 sm:py-4 border-y border-white/5 overflow-hidden whitespace-nowrap bg-emerald-500/5">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="inline-block"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-[8px] sm:text-[10px] font-mono font-bold tracking-[0.3em] sm:tracking-[0.4em] mx-6 sm:mx-12 opacity-40">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Floating Particles Component for Home Page
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.3,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: [null, "-20%", "120%"],
            x: [null, `${Math.random() * 20 - 10}%`, `${Math.random() * 20 - 10}%`],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: Math.random() * 20 + 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute w-2 h-2 bg-emerald-500/20 rounded-full blur-sm"
        />
      ))}
    </div>
  );
}

// Biome Data Panel for Category Page
function BiomeDataPanel({ category }: { category: string }) {
  const cat = categories.find(c => c.id === category);
  if (!cat) return null;

  const stats = {
    carnivorous: { temp: '25°C', humidity: '85%', biodiversity: 'High', oxygen: '21%' },
    parasitic: { temp: '22°C', humidity: '70%', biodiversity: 'Medium', oxygen: '20%' },
    mimicry: { temp: '32°C', humidity: '15%', biodiversity: 'Low', oxygen: '19%' },
  }[category as 'carnivorous' | 'parasitic' | 'mimicry'];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      {[
        { label: '平均温度', value: stats.temp, icon: Thermometer },
        { label: '环境湿度', value: stats.humidity, icon: Droplets },
        { label: '生物多样性', value: stats.biodiversity, icon: Globe },
        { label: '含氧量', value: stats.oxygen, icon: Wind },
      ].map((item, i) => (
        <div key={i} className="space-y-2 relative z-10">
          <div className="flex items-center gap-2 opacity-40">
            <item.icon className="w-3 h-3" />
            <span className="text-[10px] uppercase tracking-widest font-mono">{item.label}</span>
          </div>
          <p className="text-2xl font-bold font-display">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

// Mechanism Breakdown Component for Detail Page
function MechanismBreakdown({ mechanism }: { mechanism: string }) {
  const parts = mechanism.split('：');
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-widest font-mono">
        <Zap className="w-4 h-4 text-emerald-500" /> 机制深度解析
      </div>
      <div className="glass-panel p-8 rounded-[2rem] space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5">
          <Target className="w-32 h-32" />
        </div>
        <div className="space-y-2">
          <h4 className="text-xl font-bold font-display text-emerald-400">{parts[0]}</h4>
          <p className="text-sm text-muted leading-relaxed font-sans">{parts[1]}</p>
        </div>
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i < 4 ? 'bg-emerald-500/50' : 'bg-white/10'}`} />
          ))}
        </div>
        <p className="text-[10px] uppercase tracking-widest opacity-30 font-mono">Mechanism Complexity: High-Efficiency</p>
      </div>
    </div>
  );
}

// Research Status Bar for Home Page
function ResearchStatusBar() {
  return (
    <div className="w-full bg-emerald-950/40 border-b border-emerald-500/10 py-1.5 px-4 sm:px-6 flex justify-between items-center text-[8px] uppercase tracking-[0.3em] font-mono text-emerald-500/60 relative z-50">
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          STATION: FLORA-MIRABILIS-01
        </div>
        <div className="hidden sm:block">UPTIME: 1428:42:11</div>
        <div className="hidden md:block">PROBES ACTIVE: 12/15</div>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden lg:block">DATA SYNC: STABLE (99.8%)</div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-emerald-500" />
          LIVE FEED
        </div>
      </div>
    </div>
  );
}

// Scientific Classification Table
function ScientificClassification({ plant }: { plant: Plant }) {
  const classification = [
    { label: '界', value: '植物界 (Plantae)' },
    { label: '门', value: '被子植物门 (Angiosperms)' },
    { label: '纲', value: '双子叶植物纲 (Eudicots)' },
    { label: '目', value: plant.category === 'carnivorous' ? '石竹目 (Caryophyllales)' : plant.category === 'parasitic' ? '檀香目 (Santalales)' : '天门冬目 (Asparagales)' },
    { label: '属', value: plant.scientificName?.split(' ')[0] || '未知' },
    { label: '种', value: plant.scientificName || '未知' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-widest font-mono">
        <Database className="w-4 h-4 text-emerald-500" /> 科学分类索引
      </div>
      <div className="glass-panel overflow-hidden rounded-3xl border border-white/5">
        <table className="w-full text-left border-collapse">
          <tbody>
            {classification.map((item, i) => (
              <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 text-[10px] uppercase tracking-widest font-mono opacity-40 w-1/3">{item.label}</td>
                <td className="py-4 px-6 text-xs font-medium">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Related Specimens Component
function RelatedSpecimens({ currentPlant, onSelect }: { currentPlant: Plant, onSelect: (p: Plant) => void }) {
  const related = useMemo(() => {
    return plants
      .filter(p => p.category === currentPlant.category && p.id !== currentPlant.id)
      .slice(0, 3);
  }, [currentPlant]);

  return (
    <div className="space-y-8 pt-16 border-t border-white/5">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-2xl font-display font-bold uppercase tracking-tight">相关标本</h4>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-mono">Related Research Specimens</p>
        </div>
        <div className="h-px flex-1 mx-8 bg-white/5" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {related.map((plant) => (
          <motion.div
            key={plant.id}
            whileHover={{ y: -5 }}
            onClick={() => onSelect(plant)}
            className="group cursor-pointer p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
              <img 
                src={plant.image} 
                alt={plant.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="space-y-1">
              <p className="text-[8px] uppercase tracking-widest opacity-40 font-mono">{plant.id}</p>
              <h5 className="text-sm font-bold font-display group-hover:text-emerald-400 transition-colors">{plant.name}</h5>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
function PlantStats({ stats, color, category }: { stats: Plant['stats'], color: string, category: string }) {
  const categoryAvg = useMemo(() => {
    const catPlants = plants.filter(p => p.category === category);
    const avg = (key: keyof Plant['stats']) => catPlants.reduce((acc, p) => acc + p.stats[key], 0) / catPlants.length;
    return {
      speed: avg('speed'),
      power: avg('power'),
      stealth: avg('stealth'),
      rarity: avg('rarity'),
      complexity: avg('complexity'),
    };
  }, [category]);

  const data = useMemo(() => [
    { subject: '速度', A: stats.speed, B: categoryAvg.speed, fullMark: 100 },
    { subject: '力量', A: stats.power, B: categoryAvg.power, fullMark: 100 },
    { subject: '隐蔽', A: stats.stealth, B: categoryAvg.stealth, fullMark: 100 },
    { subject: '稀有', A: stats.rarity, B: categoryAvg.rarity, fullMark: 100 },
    { subject: '复杂', A: stats.complexity, B: categoryAvg.complexity, fullMark: 100 },
  ], [stats, categoryAvg]);

  const survivalRating = useMemo(() => {
    const avg = (stats.speed + stats.power + stats.stealth + stats.rarity + stats.complexity) / 5;
    if (avg > 80) return { label: '极度危险', color: 'text-red-500' };
    if (avg > 60) return { label: '高度特化', color: 'text-orange-500' };
    return { label: '稳定生存', color: 'text-emerald-500' };
  }, [stats]);

  const accentColor = color === 'emerald' ? '#10b981' : color === 'orange' ? '#f97316' : '#a8a29e';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-widest font-mono">
          <Shield className="w-4 h-4 text-emerald-500" /> 生存能力评估
        </div>
        <div className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono ${survivalRating.color}`}>
          {survivalRating.label}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Target className="w-32 h-32" />
        </div>

        <div className="h-[280px] w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 500 }} 
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Specimen"
                dataKey="A"
                stroke={accentColor}
                fill={accentColor}
                fillOpacity={0.4}
              />
              <Radar
                name="Average"
                dataKey="B"
                stroke="rgba(255,255,255,0.2)"
                fill="rgba(255,255,255,0.1)"
                fillOpacity={0.1}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="absolute bottom-0 left-0 flex gap-4 text-[8px] uppercase tracking-widest font-mono opacity-40">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} /> 标本数据
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-white/20" /> 类别平均
            </div>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: '反应速度', value: stats.speed, icon: ZapIcon, color: 'text-yellow-400' },
              { label: '捕获力量', value: stats.power, icon: Target, color: 'text-red-400' },
              { label: '隐蔽等级', value: stats.stealth, icon: Eye, color: 'text-blue-400' },
              { label: '稀有程度', value: stats.rarity, icon: Star, color: 'text-purple-400' },
              { label: '演化复杂度', value: stats.complexity, icon: Layers, color: 'text-emerald-400' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <item.icon className={`w-3.5 h-3.5 ${item.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                  <span className="text-xs opacity-60 font-light">{item.label}</span>
                </div>
                <div className="flex items-center gap-3 flex-1 ml-4">
                  <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full bg-current ${item.color}`}
                    />
                  </div>
                  <span className="text-[10px] font-mono opacity-80 w-6 text-right">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isExploring, setIsExploring] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'image' | '3d'>('image');
  const [sortBy, setSortBy] = useState<'name' | 'rarity' | 'power'>('name');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const featuredPlants = useMemo(() => {
    return [
      plants.find(p => p.id === 'venus-flytrap')!,
      plants.find(p => p.id === 'lithops')!,
      plants.find(p => p.id === 'cobra-lily')!,
    ].filter(Boolean);
  }, []);

  const filteredPlants = useMemo(() => {
    let result = plants.filter(p => p.category === currentCategory);
    
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'rarity') {
      result = [...result].sort((a, b) => b.stats.rarity - a.stats.rarity);
    } else if (sortBy === 'power') {
      result = [...result].sort((a, b) => b.stats.power - a.stats.power);
    } else {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [currentCategory, searchQuery, sortBy]);

  // Reset search when category changes
  useEffect(() => {
    document.title = "植物志 (Flora Archive)";
    setSearchQuery('');
    setSortBy('name');
    window.scrollTo(0, 0);
  }, [currentCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPlant, isExploring]);

  // Handle back navigation
  const handleBack = () => {
    if (selectedPlant) {
      setSelectedPlant(null);
      setViewMode('image');
    } else if (currentCategory) {
      setCurrentCategory(null);
    } else if (isExploring) {
      setIsExploring(false);
    }
  };

  return (
    <div className="min-h-screen selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <AnimatePresence>
          {!currentCategory ? (
            <motion.div
              key="default-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-900/5 blur-[120px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-orange-900/5 blur-[120px]" />
              <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full bg-stone-900/10 blur-[100px]" />
            </motion.div>
          ) : (
            <motion.div
              key={currentCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              {currentCategory === 'carnivorous' && (
                <>
                  <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-emerald-900/10 blur-[140px]" />
                  <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-900/5 blur-[120px]" />
                </>
              )}
              {currentCategory === 'parasitic' && (
                <>
                  <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-orange-900/10 blur-[140px]" />
                  <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-900/5 blur-[120px]" />
                </>
              )}
              {currentCategory === 'mimicry' && (
                <>
                  <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-stone-800/10 blur-[140px]" />
                  <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-yellow-900/5 blur-[120px]" />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Header */}
      <ResearchStatusBar />
      <header className="fixed top-0 sm:top-6 left-0 right-0 z-50 p-4 sm:p-6 flex justify-between items-center backdrop-blur-md border-b border-white/5">
        <div 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
          onClick={() => { setIsExploring(false); setCurrentCategory(null); setSelectedPlant(null); }}
        >
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
            <Leaf className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight font-sans">植物志</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-mono">Flora Archive</p>
          </div>
        </div>

        <AnimatePresence>
          {(isExploring || currentCategory || selectedPlant) && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={handleBack}
              className="px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 hover:bg-white/5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">返回</span>
            </motion.button>
          )}
        </AnimatePresence>
      </header>

      <main ref={containerRef} className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!isExploring && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-32"
            >
              {/* Hero Section */}
              <motion.section 
                style={{ opacity: heroOpacity, scale: heroScale }}
                className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative"
              >
                <div className="space-y-6 max-w-5xl">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] uppercase tracking-[0.3em] font-mono font-bold"
                  >
                    <Globe className="w-3 h-3" /> 全球奇妙植物在线科考站
                  </motion.div>
                  <motion.h2 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl sm:text-7xl md:text-[10rem] lg:text-[12rem] font-bold font-display tracking-tight leading-[1.1] uppercase"
                  >
                    探索<span className="italic text-emerald-500">演化</span><br />
                    的<span className="font-medium">边缘</span>
                  </motion.h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center pt-8 md:pt-12">
                    <motion.p 
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-left text-lg sm:text-xl text-muted font-sans leading-relaxed border-l-2 border-emerald-500/30 pl-6 sm:pl-8"
                    >
                      从幽暗沼泽的致命陷阱到荒漠深处的伪装大师。我们记录、分析并还原自然界中最不可思议的生存策略。
                    </motion.p>
                    <motion.div
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-col items-center md:items-end gap-6"
                    >
                      <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-end">
                        <div className="glass-panel p-6 sm:p-8 rounded-[2rem] flex flex-col items-center justify-center group hover:bg-emerald-500/10 transition-all min-w-[140px] sm:min-w-[160px]">
                          <p className="text-4xl sm:text-5xl font-bold font-display leading-none tracking-tighter">15+</p>
                          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] opacity-40 font-mono mt-3 sm:mt-4">收录标本</p>
                        </div>
                        <div className="glass-panel p-6 sm:p-8 rounded-[2rem] flex flex-col items-center justify-center group hover:bg-emerald-500/10 transition-all min-w-[140px] sm:min-w-[160px]">
                          <p className="text-4xl sm:text-5xl font-bold font-display leading-none tracking-tighter">3</p>
                          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] opacity-40 font-mono mt-3 sm:mt-4">极端生境</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setIsExploring(true)}
                        className="w-full sm:w-auto px-10 py-4 rounded-full bg-emerald-500 text-black font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform flex items-center justify-center gap-2"
                      >
                        立即开启探索 <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  </div>
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                >
                  <div className="w-[1px] h-20 bg-gradient-to-b from-emerald-500 to-transparent" />
                  <span className="text-[10px] uppercase tracking-[0.5em] opacity-30">点击按钮开启探索</span>
                </motion.div>
              </motion.section>

              <Marquee />

              {/* Core Mission / Features - Split Layout */}
              <section className="py-20 sm:py-32 px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div className="space-y-8 sm:space-y-12">
                    <div className="space-y-4">
                      <p className="text-[10px] uppercase tracking-[0.4em] text-emerald-500 font-bold font-mono">Our Methodology</p>
                      <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display leading-tight">打破常规的<br />自然观察</h3>
                    </div>
                    <div className="space-y-6 sm:space-y-8">
                      {[
                        { icon: Microscope, title: '深度解剖', desc: '通过 3D 模型与高清影像，全方位解析植物的捕食与寄生机制。' },
                        { icon: Compass, title: '生境探索', desc: '深入三大极端生物群落，寻找那些在不可能之地绽放的生命。' },
                        { icon: ScrollText, title: '科考档案', desc: '详尽的生存数据评估与神话背景研究，还原植物的自然与文化双重身份。' },
                      ].map((item, i) => (
                        <motion.div 
                          key={item.title}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="group flex items-start sm:items-center gap-4 sm:gap-8"
                        >
                          <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-2xl sm:rounded-[1.25rem] bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-all duration-500">
                            <item.icon className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-500 transition-transform group-hover:scale-110" />
                          </div>
                          <div className="flex-1 space-y-1 sm:space-y-1.5">
                            <h4 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">{item.title}</h4>
                            <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans max-w-md opacity-70">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="relative aspect-square max-w-xl mx-auto lg:max-w-none w-full">
                    <div className="absolute inset-0 bg-emerald-500/10 rounded-[2.5rem] sm:rounded-[4rem] rotate-3 sm:rotate-6" />
                    <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-[2.5rem] sm:rounded-[4rem] backdrop-blur-3xl overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1200" 
                        alt="Research Methodology"
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* Removed Fingerprint and Authentication text */}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Featured Specimens - Bento Grid */}
              <section className="space-y-8 sm:space-y-12 px-4 sm:px-6">
                <div className="flex items-end justify-between">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-emerald-500 font-bold font-mono">Featured Specimens</p>
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display">本月推荐标本</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredPlants.map((plant, i) => (
                    <motion.div
                      key={plant.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => {
                        setIsExploring(true);
                        setCurrentCategory(plant.category);
                        setSelectedPlant(plant);
                      }}
                      className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/10 aspect-[4/5]"
                    >
                      <img 
                        src={plant.image} 
                        alt={plant.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] uppercase tracking-widest text-emerald-400 font-mono">
                            {categories.find(c => c.id === plant.category)?.name}
                          </span>
                        </div>
                        <h4 className="text-2xl font-bold font-display">{plant.name}</h4>
                        <p className="text-xs text-muted line-clamp-2 opacity-60">{plant.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {isExploring && !currentCategory && (
            <motion.div
              key="biomes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16 py-12"
            >
              <div className="text-center space-y-4">
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-4xl sm:text-6xl md:text-8xl font-light tracking-tighter"
                >
                  生命<span className="italic font-sans text-emerald-500">版图</span>
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="max-w-2xl mx-auto text-base sm:text-lg opacity-50 font-light px-4"
                >
                  点击进入特定地貌，探索那些在极端环境中绽放的非凡生命。
                </motion.p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[600px] md:lg:h-[700px]">
                {categories.map((cat, index) => (
                  <motion.div
                    key={cat.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setCurrentCategory(cat.id)}
                    className={`group relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/10 flex flex-col justify-end p-8 sm:p-10 transition-all duration-500 min-h-[400px] lg:min-h-0`}
                  >
                    {/* Biome Backgrounds */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={cat.image} 
                        alt={cat.biomeName}
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${
                        cat.biome === 'swamp' ? 'from-emerald-950/80 via-emerald-950/20' :
                        cat.biome === 'forest' ? 'from-orange-950/80 via-orange-950/20' :
                        'from-stone-950/80 via-stone-950/20'
                      } to-transparent`} />
                    </div>

                    <div className="relative z-10 space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className={`w-12 h-[1px] ${
                            cat.biome === 'swamp' ? 'bg-emerald-500' :
                            cat.biome === 'forest' ? 'bg-orange-500' :
                            'bg-stone-400'
                          }`} />
                        </div>
                        <h3 className="text-4xl font-medium tracking-tight">{cat.biomeName}</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest">
                            {cat.name}
                          </span>
                        </div>
                        <p className="text-sm opacity-60 font-light leading-relaxed line-clamp-3">
                          {cat.description}
                        </p>
                      </div>

                      <div className="pt-4 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] group-hover:gap-6 transition-all">
                        进入领域 <ChevronLeft className="w-4 h-4 rotate-180" />
                      </div>
                    </div>

                    {/* Decorative Biome Icons Removed */}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentCategory && !selectedPlant && (
            <motion.div
              key="category"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      categories.find(c => c.id === currentCategory)?.biome === 'swamp' ? 'bg-emerald-500' :
                      categories.find(c => c.id === currentCategory)?.biome === 'forest' ? 'bg-orange-500' :
                      'bg-stone-400'
                    }`} />
                    <p className={`text-xs uppercase tracking-[0.4em] ${
                      categories.find(c => c.id === currentCategory)?.biome === 'swamp' ? 'text-emerald-500' :
                      categories.find(c => c.id === currentCategory)?.biome === 'forest' ? 'text-orange-500' :
                      'text-stone-400'
                    }`}>
                      {categories.find(c => c.id === currentCategory)?.biomeEnglish}
                    </p>
                  </div>
                  <h2 className="text-5xl sm:text-6xl md:text-8xl font-bold font-display tracking-tighter uppercase leading-none">
                    {categories.find(c => c.id === currentCategory)?.biomeName}
                  </h2>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                  <div className="relative w-full sm:w-64 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100 transition-opacity" />
                    <input 
                      type="text" 
                      placeholder="搜索标本..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:opacity-30"
                    />
                  </div>
                  <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-2xl w-full sm:w-auto overflow-x-auto no-scrollbar">
                    {[
                      { id: 'name', label: '名称' },
                      { id: 'rarity', label: '稀有度' },
                      { id: 'power', label: '力量' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSortBy(s.id as any)}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-[10px] whitespace-nowrap uppercase tracking-widest font-bold transition-all ${
                          sortBy === s.id ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <BiomeDataPanel category={currentCategory} />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredPlants.map((plant, index) => (
                  <motion.div
                    key={plant.id}
                    layoutId={plant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -10 }}
                    onClick={() => setSelectedPlant(plant)}
                    className="group relative bg-white/5 rounded-[2.5rem] p-8 border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer overflow-hidden flex flex-col"
                  >
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-8 shadow-2xl">
                      <img 
                        src={plant.image} 
                        alt={plant.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          plant.stats.rarity > 80 ? 'bg-purple-500' :
                          plant.stats.rarity > 60 ? 'bg-orange-500' :
                          'bg-emerald-500'
                        }`} />
                        <span className="text-[9px] font-bold uppercase tracking-widest opacity-80 font-mono">
                          {plant.stats.rarity > 80 ? 'LEGENDARY' : plant.stats.rarity > 60 ? 'RARE' : 'COMMON'}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-4 sm:space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight group-hover:text-emerald-400 transition-colors">{plant.name}</h3>
                        <p className="text-[10px] uppercase tracking-[0.3em] opacity-30 font-mono">Specimen ID: {plant.id.toUpperCase()}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                        <div className="space-y-1">
                          <p className="text-[8px] uppercase tracking-widest opacity-30 font-mono">Power Level</p>
                          <p className="text-base sm:text-lg font-bold font-display">{plant.stats.power}%</p>
                        </div>
                        <div className="space-y-1 text-right">
                          <p className="text-[8px] uppercase tracking-widest opacity-30 font-mono">Complexity</p>
                          <p className="text-base sm:text-lg font-bold font-display">{plant.stats.complexity}%</p>
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-widest opacity-30 font-mono">View Analysis</span>
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all">
                          <ArrowUpRight className="w-4 h-4 group-hover:text-black transition-colors" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredPlants.length === 0 && (
                <div className="py-20 text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto opacity-20">
                    <Search className="w-8 h-8" />
                  </div>
                  <p className="text-lg opacity-40 font-light">未发现匹配的生物标本</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-emerald-500 text-sm hover:underline"
                  >
                    重置搜索
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {selectedPlant && (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Quick Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl">
                {[
                  { label: '稀有度', value: `${selectedPlant.stats.rarity}%`, icon: Star, color: 'text-purple-400' },
                  { label: '危险等级', value: selectedPlant.stats.power > 80 ? '极高' : '中等', icon: Shield, color: 'text-red-400' },
                  { label: '演化代号', value: selectedPlant.id.toUpperCase(), icon: Target, color: 'text-emerald-400' },
                  { label: '生境类型', value: categories.find(c => c.id === selectedPlant.category)?.name, icon: Globe, color: 'text-blue-400' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 px-2 sm:px-4 border-r border-white/5 last:border-0 text-center sm:text-left">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-current opacity-70" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] sm:text-[10px] uppercase tracking-widest opacity-40 font-mono truncate">{stat.label}</p>
                      <p className="text-xs sm:text-sm font-bold font-display truncate">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                {/* Visual & Data Column */}
                <div className="space-y-8">
                  <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl group bg-white/5 border border-white/5">
                    <Plant3DViewer modelUrl={selectedPlant.modelUrl || ''} />
                  </div>
                  
                  <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-50 mb-4 font-mono">
                      <Info className="w-3 h-3 text-emerald-500" /> 基本特征
                    </div>
                    <p className="text-sm font-light leading-relaxed font-sans opacity-80">
                      {selectedPlant.description}
                    </p>
                  </div>

                  <PlantStats 
                    stats={selectedPlant.stats} 
                    color={categories.find(c => c.id === selectedPlant.category)?.color || 'emerald'} 
                    category={selectedPlant.category}
                  />

                  <ScientificClassification plant={selectedPlant} />
                  
                  <HabitatMap category={selectedPlant.category} />
                </div>

                {/* Narrative & Analysis Column */}
                <div className="space-y-12">
                  <section>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-emerald-500 mb-3 sm:mb-4 font-mono font-bold">
                      {categories.find(c => c.id === selectedPlant.category)?.name} / SPECIMEN ANALYSIS
                    </p>
                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display mb-4 sm:mb-6 tracking-tighter leading-none">{selectedPlant.name}</h2>
                    <div className="h-1 w-24 sm:w-32 bg-emerald-500 rounded-full" />
                  </section>

                  <PlantEnvironment env={selectedPlant.environment} />

                  <MechanismBreakdown mechanism={selectedPlant.mechanism} />

                  <section className="space-y-6 sm:space-y-8">
                    <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-widest font-mono">
                      <BookOpen className="w-4 h-4 text-emerald-500" /> 详细过程 / EVOLUTIONARY PROCESS
                    </div>
                    <div className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-white/5 border border-white/5 backdrop-blur-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <MapIcon className="w-40 h-40" />
                      </div>
                      <p className="text-lg sm:text-2xl font-sans font-light leading-relaxed relative z-10 text-emerald-50/90 italic">
                        “{selectedPlant.process}”
                      </p>
                    </div>
                  </section>

                  <section className="space-y-6 sm:space-y-8">
                    <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-widest italic font-display">
                      <Star className="w-4 h-4 text-orange-400" /> 神话与传说 / MYTHOLOGY
                    </div>
                    <div className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-orange-950/5 border border-orange-500/10 italic font-sans text-lg sm:text-2xl leading-relaxed text-[#d0c8c0] relative">
                      <span className="absolute top-4 left-6 text-4xl sm:text-6xl opacity-10 font-sans">“</span>
                      {selectedPlant.mythology}
                      <span className="absolute bottom-4 right-6 text-4xl sm:text-6xl opacity-10 font-sans">”</span>
                    </div>
                  </section>

                  <DiscoveryLog plant={selectedPlant} />
                </div>
              </div>
              
              <RelatedSpecimens currentPlant={selectedPlant} onSelect={setSelectedPlant} />

              <div className="pt-12 border-t border-white/5">
                <button 
                  onClick={handleBack}
                  className="w-full py-6 rounded-[2rem] border border-white/10 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all text-xs uppercase tracking-[0.3em] font-bold"
                >
                  探索更多奇妙生命
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="p-12 border-t border-white/5 text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] opacity-30 font-mono">
          © 2026 植物志 · 自然界的奥秘探索
        </p>
      </footer>
    </div>
  );
}
