export interface Plant {
  id: string;
  name: string;
  scientificName?: string;
  category: 'carnivorous' | 'parasitic' | 'mimicry';
  description: string;
  mechanism: string;
  process: string; // Detailed description of the predation/parasitism/mimicry process
  mythology: string;
  image: string;
  modelUrl?: string;
  processImage?: string; // High-definition image of the process
  stats: {
    speed: number;      // 0-100
    power: number;      // 0-100
    stealth: number;    // 0-100
    rarity: number;     // 0-100
    complexity: number; // 0-100
  };
  environment: {
    temp: string;
    humidity: string;
    light: string;
  };
}

export const categories = [
  {
    id: 'carnivorous',
    name: '食虫植物',
    english: 'Carnivorous Plants',
    description: '自然界的猎手，通过奇妙的陷阱捕获昆虫以获取养分。',
    color: 'emerald',
    biome: 'swamp',
    biomeName: '幽暗沼泽',
    biomeEnglish: 'The Gloomy Swamp',
    image: 'https://images.unsplash.com/photo-1599403210212-076932a37330?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'parasitic',
    name: '寄生植物',
    english: 'Parasitic Plants',
    description: '生命的窃贼，依附于其他植物，吸取它们的养分与水分。',
    color: 'orange',
    biome: 'forest',
    biomeName: '迷雾森林',
    biomeEnglish: 'The Misty Forest',
    image: 'https://images.unsplash.com/photo-1501004318641-72ee5f22f847?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'mimicry',
    name: '拟态植物',
    english: 'Mimicry Plants',
    description: '伪装的大师，模仿周围环境或生物以求生存。',
    color: 'stone',
    biome: 'desert',
    biomeName: '静寂荒漠',
    biomeEnglish: 'The Silent Desert',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e5e?auto=format&fit=crop&q=80&w=1200',
  },
];

export const plants: Plant[] = [
  // Carnivorous
  {
    id: 'nepenthes',
    name: '猪笼草',
    category: 'carnivorous',
    description: '直立或攀援草本植物，株高 1~3 米。',
    mechanism: '陷阱捕虫器：囊状捕虫笼，囊口光滑且有蜜汁引诱昆虫。',
    process: '捕食过程：昆虫被笼口的蜜汁吸引，由于笼口极其光滑，昆虫一旦站立不稳便会滑入笼底。笼底盛满了消化液，昆虫落入后很快会被溺死并被分解，养分随后被植物吸收。',
    mythology: '在某些热带文化中，猪笼草被视为“猴子的水杯”。传说森林之神为了让迷路的生灵解渴，创造了这些盛满清水的杯子，但贪婪的昆虫若想独占，便会坠入深渊。',
    image: 'https://images.unsplash.com/photo-1599403210212-076932a37330?auto=format&fit=crop&q=80&w=1000',
    processImage: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=1000',
    stats: { speed: 20, power: 85, stealth: 60, rarity: 40, complexity: 70 },
    environment: { temp: '20-30°C', humidity: '80%+', light: '明亮散射光' }
  },
  {
    id: 'venus-flytrap',
    name: '捕蝇草',
    category: 'carnivorous',
    description: '株高 10-30 厘米；茎直立，纤细；基生叶小，圆形。',
    mechanism: '夹状捕虫器：叶片顶端长有酷似贝壳的捕虫夹，能分泌蜜汁。',
    process: '捕食过程：当昆虫连续触动叶片内侧的两根感觉毛时，捕虫夹会在0.1秒内迅速闭合。随后，夹子边缘的“利齿”交错锁死，形成一个密封的“消化室”，分泌消化液将昆虫化为营养。',
    mythology: '在古老的传说中，捕蝇草是大地之母的“眼睛”。它从不主动攻击，只惩罚那些在神圣森林中过度喧闹的飞虫，将其禁锢在绿色的眼睑之中。',
    image: 'https://images.unsplash.com/photo-1598511757337-fe2cad87505b?auto=format&fit=crop&q=80&w=1000',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb',
    processImage: 'https://images.unsplash.com/photo-1598511757337-fe2cad87505b?auto=format&fit=crop&q=80&w=1000',
    stats: { speed: 95, power: 90, stealth: 50, rarity: 60, complexity: 85 },
    environment: { temp: '15-35°C', humidity: '50-70%', light: '充足阳光' }
  },
  {
    id: 'drosera',
    name: '茅膏菜',
    category: 'carnivorous',
    description: '多年生草本，直立，有时攀援状，高 9-32 厘米，淡绿色，具紫红色汁液。',
    mechanism: '粘液捕虫器：叶片边缘密生腺毛，可分泌晶莹的粘液。',
    process: '捕食过程：叶片上的腺毛分泌出晶莹剔透、极具粘性的“露珠”。昆虫一旦触碰便会被牢牢粘住。随后，周围的腺毛会向中心弯曲，将昆虫紧紧包裹并分泌消化酶进行分解。',
    mythology: '茅膏菜被称为“太阳之泪”。传说一位仙女因爱而不得在草丛中哭泣，她的泪珠挂在叶尖，在阳光下闪烁，吸引了无数生灵，却也成为了美丽的陷阱。',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=1000',
    processImage: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=1000',
    stats: { speed: 40, power: 75, stealth: 85, rarity: 50, complexity: 65 },
    environment: { temp: '10-25°C', humidity: '70%+', light: '半阴' }
  },
  // Parasitic
  {
    id: 'cuscuta',
    name: '菟丝子',
    category: 'parasitic',
    description: '其茎缠绕，黄色纤细，无叶，以吸根伸入寄主植物体内。',
    process: '寄生过程：菟丝子的幼苗在空中旋转寻找寄主，一旦接触，便会紧紧缠绕。它会产生特殊的“吸器”刺穿寄主植物的表皮，直接连接到寄主的维管束中，疯狂掠夺养分。',
    mechanism: '全寄生：根和叶片完全退化，通过吸器获取所需的几乎所有营养。',
    mythology: '《诗经》云：“菟丝附女萝，身独依然。”在古代文学中，菟丝子常象征着柔弱而坚韧的依附之情，是永恒纠缠、无法分割的爱情象征。',
    image: 'https://images.unsplash.com/photo-1501004318641-72ee5f22f847?auto=format&fit=crop&q=80&w=1000',
    stats: { speed: 30, power: 95, stealth: 70, rarity: 30, complexity: 60 },
    environment: { temp: '15-30°C', humidity: '40-60%', light: '全日照' }
  },
  {
    id: 'mistletoe',
    name: '槲寄生',
    category: 'parasitic',
    description: '常绿灌木，有绿叶能光合作用，但通过吸根窃取寄主水分。',
    process: '寄生过程：槲寄生的种子通过鸟类传播到树枝上。发芽后，它会长出特殊的根深入树木内部，虽然它能进行光合作用，但会源源不断地从寄主身上抽取水分和矿物质。',
    mechanism: '半寄生：具有叶片和叶绿素，可以自己进行光合作用，但水分和无机盐等物质依赖寄主植物。',
    mythology: '北欧神话中，光明之神巴德尔死于槲寄生制成的箭。后来，槲寄生被赋予了和平与爱的象征，人们在槲寄生下接吻以祈求永恒的幸福。',
    image: 'https://images.unsplash.com/photo-1545161296-d9c2c241f2ad?auto=format&fit=crop&q=80&w=1000',
    stats: { speed: 10, power: 60, stealth: 90, rarity: 40, complexity: 55 },
    environment: { temp: '5-20°C', humidity: '60%+', light: '散射光' }
  },
  // Mimicry
  {
    id: 'lithops',
    name: '生石花',
    category: 'mimicry',
    description: '植株几乎无茎，地上部分由两片对生、基部联结的肉质叶组成。',
    process: '拟态过程：生石花的叶片颜色和纹理完美模仿了周围的碎石。这种伪装使它们在干旱的荒漠中能躲避饥饿动物的啃食。叶片顶端的“窗”结构则允许阳光深入内部进行光合作用。',
    mechanism: '拟态石头：形似鹅卵石，表面布满复杂的纹理和斑点，与周围岩石几乎融为一体。',
    mythology: '被誉为“有生命的石头”。传说它们是沙漠中的精灵，为了躲避干旱与饥饿的野兽，将自己石化，只有在雨季来临时，才会从石缝中开出灿烂的花朵。',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e5e?auto=format&fit=crop&q=80&w=1000',
    stats: { speed: 5, power: 40, stealth: 100, rarity: 70, complexity: 75 },
    environment: { temp: '15-35°C', humidity: '10-30%', light: '强光' }
  },
  {
    id: 'cobra-lily',
    name: '眼镜蛇瓶子草',
    category: 'mimicry',
    description: '外形酷似眼镜蛇，让其他动物不敢靠近。',
    process: '拟态过程：它不仅外形像蛇，其顶部的透明斑块还会产生“假窗”效应，误导进入瓶内的昆虫，使其在寻找出口时精疲力竭，最终坠入瓶底的消化液中。',
    mechanism: '拟态眼镜蛇：同时它也是食虫植物，会分泌糖蜜吸引昆虫。',
    mythology: '在美洲原住民的传说中，它是森林的守护者。它模仿毒蛇的姿态，是为了吓阻那些企图破坏水源的恶灵，而它捕食昆虫则是为了净化森林的空气。',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=1000',
    stats: { speed: 15, power: 80, stealth: 95, rarity: 85, complexity: 90 },
    environment: { temp: '10-20°C', humidity: '90%+', light: '冷凉散射光' }
  },
  // New Carnivorous
  {
    id: 'sarracenia',
    name: '瓶子草',
    category: 'carnivorous',
    description: '叶片特化为管状瓶状，色彩鲜艳且带有华丽的脉纹。',
    mechanism: '坠落陷阱：利用向下的导向毛和光滑内壁。',
    process: '捕食过程：瓶口分泌大量蜜露，并伴有鲜艳的色彩。昆虫进入瓶口后，会被向下的硬毛引导向深处。瓶内壁极滑，昆虫无法立足最终坠入底部的消化液。',
    image: 'https://images.unsplash.com/photo-1599403210212-076932a37330?auto=format&fit=crop&q=80&w=1000',
    mythology: '在北美原住民传说中，它是大地的水壶，盛放着生命的秘密。',
    stats: { speed: 10, power: 70, stealth: 65, rarity: 35, complexity: 60 },
    environment: { temp: '15-30°C', humidity: '60%+', light: '直射光' }
  },
  {
    id: 'utricularia',
    name: '狸藻',
    category: 'carnivorous',
    description: '水生植物，根部带有微小的半透明捕虫囊。',
    mechanism: '负压主动吸入：自然界最快的机械运动之一。',
    process: '捕食过程：捕虫囊内部处于负压状态。当水中小生物触碰到囊口的感应毛时，囊门瞬间开启，强大的压力差将生物连同水流一起吸入囊中，整个过程仅需几毫秒。',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e5e?auto=format&fit=crop&q=80&w=1000',
    mythology: '水下的隐形猎手，象征着静谧中隐藏的危机。',
    stats: { speed: 100, power: 65, stealth: 90, rarity: 75, complexity: 95 },
    environment: { temp: '18-28°C', humidity: '100% (水生)', light: '明亮光照' }
  },
  {
    id: 'pinguicula',
    name: '捕虫堇',
    category: 'carnivorous',
    description: '叶片呈莲座状，表面覆盖着微小的粘性腺体。',
    mechanism: '苍蝇纸式陷阱：叶片分泌粘液并缓慢卷曲。',
    process: '捕食过程：叶片表面的两种腺体分别负责分泌粘液和消化酶。昆虫被粘住后，叶片边缘会缓慢向内卷曲，形成一个临时的“胃”来加速消化。',
    image: 'https://images.unsplash.com/photo-1501004318641-72ee5f22f847?auto=format&fit=crop&q=80&w=1000',
    mythology: '因其花朵美丽，常被误认为是普通花卉，是“温柔陷阱”的代名词。',
    stats: { speed: 30, power: 60, stealth: 80, rarity: 45, complexity: 50 },
    environment: { temp: '15-25°C', humidity: '60%+', light: '明亮散射光' }
  },
  // New Parasitic
  {
    id: 'orobanche',
    name: '列当',
    category: 'parasitic',
    description: '肉质草本，完全没有叶绿素，呈黄褐色或紫色。',
    mechanism: '全寄生：完全依赖宿主根系。',
    process: '寄生过程：种子在土中休眠，直到感应到宿主根部分泌的化学物质才萌发。它直接连接到宿主的根部，像抽水机一样吸取所有生存所需的有机物。',
    image: 'https://images.unsplash.com/photo-1501004318641-72ee5f22f847?auto=format&fit=crop&q=80&w=1000',
    mythology: '大地的吸血鬼，象征着不劳而获的生存哲学。',
    stats: { speed: 5, power: 90, stealth: 85, rarity: 55, complexity: 70 },
    environment: { temp: '15-30°C', humidity: '50%+', light: '随宿主' }
  },
  {
    id: 'balanophora',
    name: '蛇菰',
    category: 'parasitic',
    description: '外形酷似红色的蘑菇，生长在阴暗潮湿的林下。',
    mechanism: '根寄生：形成巨大的块状寄生体。',
    process: '寄生过程：它寄生在木本植物的根上。地下部分形成巨大的块茎，与宿主根系紧密融合。地上部分仅在繁殖期长出，呈鲜艳的红色。',
    image: 'https://images.unsplash.com/photo-1501004318641-72ee5f22f847?auto=format&fit=crop&q=80&w=1000',
    mythology: '林间的红色幽灵，常被误认为真菌，实则是进化的极致。',
    stats: { speed: 5, power: 85, stealth: 95, rarity: 80, complexity: 75 },
    environment: { temp: '20-28°C', humidity: '80%+', light: '极弱光' }
  },
  {
    id: 'striga',
    name: '独脚金',
    category: 'parasitic',
    description: '细小的绿色植物，开着鲜艳的小花，常出现在农田中。',
    mechanism: '半寄生：严重危害谷物作物的“魔女草”。',
    process: '寄生过程：虽然能进行光合作用，但主要养分来自宿主。它会向宿主注入毒素，导致宿主生长停滞，甚至在它长出地面之前就已摧毁了宿主。',
    image: 'https://images.unsplash.com/photo-1501004318641-72ee5f22f847?auto=format&fit=crop&q=80&w=1000',
    mythology: '被称为“非洲的魔女”，象征着美丽外表下的破坏力。',
    stats: { speed: 20, power: 95, stealth: 60, rarity: 30, complexity: 80 },
    environment: { temp: '20-35°C', humidity: '40-70%', light: '强光' }
  },
  // New Mimicry
  {
    id: 'bee-orchid',
    name: '蜂兰',
    category: 'mimicry',
    description: '花朵的唇瓣极像雌性蜜蜂。',
    mechanism: '性欺骗：模仿雌蜂的外形和气味。',
    process: '拟态过程：它不仅外形像雌蜂，还能分泌出与雌蜂极其相似的性外激素。雄蜂受骗前来“交配”，从而帮助兰花完成传粉。',
    image: 'https://images.unsplash.com/photo-1501004318641-72ee5f22f847?auto=format&fit=crop&q=80&w=1000',
    mythology: '自然界的骗术大师，象征着欲望驱动的进化。',
    stats: { speed: 50, power: 30, stealth: 98, rarity: 90, complexity: 95 },
    environment: { temp: '10-25°C', humidity: '50%+', light: '散射光' }
  },
  {
    id: 'elephant-foot',
    name: '龟甲草',
    category: 'mimicry',
    description: '巨大的木质化块茎，表面布满深裂的几何纹路。',
    mechanism: '形态伪装：模仿龟壳或干裂的土地。',
    process: '拟态过程：巨大的块茎可以储存大量水分。其坚硬且开裂的外壳极像龟壳或岩石，在干旱季节能有效迷惑饥饿的动物。',
    image: 'https://images.unsplash.com/photo-1501004318641-72ee5f22f847?auto=format&fit=crop&q=80&w=1000',
    mythology: '荒漠中的长者，用坚硬的铠甲守护生命的源泉。',
    stats: { speed: 5, power: 50, stealth: 95, rarity: 75, complexity: 65 },
    environment: { temp: '15-35°C', humidity: '20-40%', light: '直射光' }
  },
];
