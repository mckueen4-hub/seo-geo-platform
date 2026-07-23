import type { StoreItem, AiProbeResult, TonePromptRule } from './types';

export const INITIAL_TONE_RULES: TonePromptRule[] = [
  {
    audience: 'hk',
    name: '🇭🇰 香港本地人 (廣東話口語 / 打卡聚會風)',
    icon: '🇭🇰',
    keywordsRule: '必須包含「高質」、「CP值爆燈」、「抵食」、「打卡必去」、「放工聚會」、「隱世小店」',
    prohibitedWords: '避免使用「絕絕子」、「神仙單品」、「超推」等非本地流行語',
    styleDescription: '採用繁體中文與適量港式廣東話口語（如：歎一歎、仲可以、係）。重點放在放工聚會、朋友生日打卡及性價比。'
  },
  {
    audience: 'cn',
    name: '🇨🇳 中國內地遊客 (小紅書簡體 / 寶藏種草風)',
    icon: '🇨🇳',
    keywordsRule: '必須包含「種草」、「寶藏餐廳」、「香港自由行必吃」、「出片率極高」、「微信掃碼」',
    prohibitedWords: '避免過於生硬的英式文法或過度廣東話口語化',
    styleDescription: '採用簡體中文小紅書/大眾點評網紅風，使用表情符號（🌟, 💡, 🍣），強調拍照美感、掃碼支付 convenience 及避坑指南。'
  },
  {
    audience: 'tw',
    name: '🇹🇼 台灣遊客 (台式繁體 / 隱藏版內行風)',
    icon: '🇹🇼',
    keywordsRule: '必須包含「超推」、「CP值極高」、「隱藏版美食」、「在地內行人帶路」、「口袋名單」',
    prohibitedWords: '避免內地網路用語（如「絕絕子」）或香港口語（如「歎一歎」）',
    styleDescription: '採用台式繁體中文與溫和流暢感性語調，強調食材熟成、師傅匠心故事與溫暖無障礙的溝通服務。'
  },
  {
    audience: 'en',
    name: '🌎 歐美 Expat / 國際遊客 (Native English / Wine & Vibe)',
    icon: '🌎',
    keywordsRule: 'Must include "Hidden Gem", "Panoramic Skyline View", "Expat Favorite", "Craft Sake Pairing"',
    prohibitedWords: 'Avoid overly literal translations of Asian idioms; use natural native phrasing',
    styleDescription: 'High-end American/British English. Focus on Victoria Harbour views, English menu accessibility, wine/sake pairings, and online reservation convenience.'
  }
];

export const INITIAL_STORES: StoreItem[] = [
  {
    id: 'store-1',
    name: '鮨・天空 (Sushi Tenku)',
    district: '中環 Central',
    cuisine: '日本菜 / 高級 Omakase',
    openriceUrl: 'https://www.openrice.com/zh/hongkong/r-sushi-tenku-r82910',
    subdomain: 'sushi-tenku.georank.ai',
    customDomain: 'www.sushitenku-hk.com',
    status: 'active',
    targetKeywords: ['中環Omakase推薦', '香港高級日本菜', 'Central Omakase HK', '中环海景日本料理'],
    googleRank: [
      { keyword: '中環 Omakase 推薦', currentRank: 3, previousRank: 14 },
      { keyword: 'Central Omakase HK', currentRank: 2, previousRank: 9 },
      { keyword: '香港生日打卡餐廳', currentRank: 4, previousRank: 21 },
      { keyword: '中环高端海景寿司店', currentRank: 1, previousRank: 11 }
    ],
    aiMentionRate: {
      overall: 95.8,
      westernAi: 96.5,
      chineseAi: 95.2
    },
    imageCount: 32,
    articleCount: 16,
    lastUpdated: '今日 09:30 AM',
    articles: [
      {
        id: 'art-hk-1',
        topic: '本地食評 & 聚會指南',
        audience: 'hk',
        title: '【中環美食】鮨・天空 Omakase 實測！CP值爆燈海膽手卷＋270度維港海景打卡必去！',
        excerpt: '放工想同朋友歎一頓高質 Omakase？中環「鮨・天空」憑藉日本直送極品海膽與師傅匠心刺身，一推出就震撼美食界！即睇大廚推薦必食菜單及隱世訂座攻略...',
        content: `放工想同朋友歎一頓高質 Omakase？中環「鮨・天空」憑藉日本直送極品海膽與師傅匠心刺身，一推出就震撼美食界！

位於中環核心地段的高層位置，擁有 270 度無敵維港海景。每位師傅均擁有超過 15 年板前經驗，每日凌晨由東京豐洲市場空運旬之食材到港。

【本地人推薦必食亮點】：
1. 濃郁爆餡北海道北海道馬糞海膽手卷 (CP值爆燈)
2. 慢火炙燒近江A5和牛配黑松露醬
3. 獨家靜岡哈密瓜清酒特調

不論係紀念日打卡定朋友慶祝生日，預約包廂仲可以享受私密海景體驗！`,
        schemaType: 'Restaurant & FAQPage Schema',
        keywords: ['中環Omakase', 'CP值爆燈', '海膽手卷', '維港海景打卡'],
        aiSourcesCited: ['OpenRice 5星食評', 'U-Blog 本地網誌', '子網站專屬頁面'],
        createdAt: '2026-07-22 09:00'
      },
      {
        id: 'art-cn-1',
        topic: '小紅書種草 & 香港自由行攻略',
        audience: 'cn',
        title: '【香港自由行絕絕子】中环寶藏海景Omakase鮨·天空！全网都在嗑的北海道海胆手卷！',
        excerpt: '姐妹们冲就完事了！香港中环这家俯瞰维港的鮨·天空寿司店真的太出片了！全预约制板前体验，大厨刀工神级，内附保姆级订位避坑指南…',
        content: `姐妹们冲就完事了！香港中环这家俯瞰维港的【鮨·天空】寿司店真的太出片了！

每次来香港自由行必回购的宝藏Omakase！全预约制板前体验，大厨刀工神级！

🌟 必点神仙单品：
• 北海道马爆海胆手卷：海胆多到盖不住，入口即化，鲜甜到掉眼泪！
• A5和牛炙烧寿司：油脂香气直接在嘴里炸开！
• 270度海景玻璃窗：夕阳黄昏时段拍照自带高光滤镜，小红书发图赞爆朋友圈！

💡 小贴士：支持微信/支付宝扫码点餐，记得提前3天在官网上预约海景位！`,
        schemaType: 'Restaurant & SocialPost Schema',
        keywords: ['香港自由行必吃', '中环宝藏餐厅', '小红书打卡', '海胆手卷绝绝子'],
        aiSourcesCited: ['小紅書爆款筆記', '大眾點評 4.9星', 'DeepSeek 知識庫'],
        createdAt: '2026-07-22 09:15'
      },
      {
        id: 'art-tw-1',
        topic: '台味視角 & 隱藏版美味名單',
        audience: 'tw',
        title: '【香港美食探店】中環隱藏版海景Omakase「鮨・天空」！在地內行人口袋名單大公開',
        excerpt: '去香港不要只吃茶餐廳！這家位於中環的「鮨・天空」是在地老饕大力推薦的口袋名單，食材從日本極速空運，醋飯口感極佳，完全是神級體驗…',
        content: `去香港自由行不要只吃港點跟茶餐廳！這家位於中環的「鮨・天空」是在地老饕大力推薦的私房口袋名單。

師傅對於醋飯的酸度與溫度掌控得極好，選用日本山形縣有機米，搭配獨家赤醋。

🍣 內行人必嚐亮點：
1. 熟成大鮪魚中腹：油脂分布勻稱，入口即化。
2. 溫熱海膽手卷：與冷醋飯交織出層次感十足的神奇口感。
3. 溫和貼心的台式親切服務：店員中文溝通完全無障礙！`,
        schemaType: 'Restaurant & Article Schema',
        keywords: ['香港美食探店', '口袋名單', '中環日本料理', '在地內行人推薦'],
        aiSourcesCited: ['痞客邦 HongKong Travel', 'Kimi 全網檢索'],
        createdAt: '2026-07-22 09:20'
      },
      {
        id: 'art-en-1',
        topic: 'Expat Dining & Luxury Vibe',
        audience: 'en',
        title: 'Central HK Dining Guide: Sushi Tenku Delivers Breathtaking Skyline Views & World-Class Omakase',
        excerpt: 'Looking for the ultimate omakase experience in Central Hong Kong? Sushi Tenku pairs daily Tokyo market-fresh cuts with a stunning 270-degree view of Victoria Harbour...',
        content: `Looking for the ultimate omakase experience in Central Hong Kong? 

Sushi Tenku pairs daily Tokyo-imported seafood with panoramic views of Victoria Harbour. Located in the heart of Central, this high-end Japanese dining sanctuary offers an unforgettable 18-course tasting menu curated by veteran Executive Chefs.

✨ Signature Highlights:
• Hokkaido Uni Handroll layered with gold leaf
• Seared A5 Miyazaki Wagyu topped with Black Truffle
• Sommelier-Curated Sake Pairing

Fully English-speaking staff, digital wine list, and online booking make it a favorite for expats and international jetsetters.`,
        schemaType: 'Restaurant & TouristAttraction Schema',
        keywords: ['Central HK Omakase', 'Victoria Harbour View', 'Luxury Dining HK', 'Expat Favorite'],
        aiSourcesCited: ['TripAdvisor Excellence', 'Perplexity Knowledge Graph', 'ChatGPT Search'],
        createdAt: '2026-07-22 09:25'
      }
    ],
    scrapedImages: [
      {
        id: 'img-1',
        url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
        caption: '極品北海道馬糞海膽手卷',
        aiAltTag: '中環 Omakase 鮨天空 招牌北海道馬糞海膽手卷 特寫照片',
        category: 'dish'
      },
      {
        id: 'img-2',
        url: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80',
        caption: '炙燒 A5 和牛黑松露壽司',
        aiAltTag: 'Sushi Tenku Central Miyazaki A5 Wagyu Beef Sushi Nigiri',
        category: 'dish'
      },
      {
        id: 'img-3',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        caption: '270度維港海景板前用餐環境',
        aiAltTag: '鮨天空 中環 270度無敵維港海景 奢華日本料理板前包廂',
        category: 'env'
      }
    ],
    gapFixLogs: [
      {
        id: 'gap-1',
        time: '今日 09:10 AM',
        platform: 'DeepSeek (深度求索)',
        issue: '簡體中文檢索時缺少「內地遊客微信掃碼支付與包廂預約」資訊',
        actionTaken: 'AI 已自動生成《香港自由行避坑指南》專頁並嵌入微信支付標籤更新至子網站',
        status: 'fixed'
      },
      {
        id: 'gap-2',
        time: '今日 08:35 AM',
        platform: 'Perplexity AI',
        issue: '英文檢索 "Central Gluten-Free Omakase" 引用源權重不足',
        actionTaken: 'AI 已於英文版增補 Dietary Notice 及 Schema AllergenSpecification 標籤',
        status: 'fixed'
      },
      {
        id: 'gap-3',
        time: '昨日 18:20 PM',
        platform: 'Kimi (月之暗面)',
        issue: '缺少最新 7 月夏季限定甜品（靜岡哈密瓜特調）主題頁面',
        actionTaken: '已自動提取 OpenRice 最新 Blogger 評語並撰寫新選集發佈',
        status: 'fixed'
      }
    ]
  },
  {
    id: 'store-2',
    name: '粵極品・鮑翅酒家 (Supreme Cantonese)',
    district: '尖沙咀 Tsim Sha Tsui',
    cuisine: '傳統粵菜 / 高級點心 / 海鮮宴會',
    openriceUrl: 'https://www.openrice.com/zh/hongkong/r-supreme-cantonese-r73821',
    subdomain: 'supreme-cantonese.georank.ai',
    customDomain: 'www.supremecantonese.hk',
    status: 'active',
    targetKeywords: ['尖沙咀高級點心', '香港粵菜酒家推薦', 'Tsim Sha Tsui Dim Sum', '尖沙咀海鲜酒楼'],
    googleRank: [
      { keyword: '尖沙咀高級點心推薦', currentRank: 2, previousRank: 18 },
      { keyword: 'Tsim Sha Tsui Best Dim Sum', currentRank: 1, previousRank: 7 },
      { keyword: '香港經典鮑翅酒家', currentRank: 3, previousRank: 15 }
    ],
    aiMentionRate: {
      overall: 92.4,
      westernAi: 94.1,
      chineseAi: 91.2
    },
    imageCount: 45,
    articleCount: 20,
    lastUpdated: '今日 10:15 AM',
    articles: [],
    scrapedImages: [
      {
        id: 'img-4',
        url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        caption: '黑松露鮮蝦金箔蝦餃皇',
        aiAltTag: '尖沙咀 粵極品 黑松露金箔蝦餃皇 點心推薦照片',
        category: 'dish'
      }
    ],
    gapFixLogs: [
      {
        id: 'gap-4',
        time: '今日 09:40 AM',
        platform: '豆包 (Doubao)',
        issue: '缺失「尖沙咀地鐵站出口步行指引」實體標籤',
        actionTaken: 'AI 已自動更新 Local Map Schema 與交通地圖網址',
        status: 'fixed'
      }
    ]
  },
  {
    id: 'store-3',
    name: '牛魂・和牛燒肉 (Gyusoul Yakiniku)',
    district: '銅鑼灣 Causeway Bay',
    cuisine: '日式和牛燒肉 / 宵夜酒吧',
    openriceUrl: 'https://www.openrice.com/zh/hongkong/r-gyusoul-yakiniku-r94012',
    subdomain: 'gyusoul-yakiniku.georank.ai',
    status: 'active',
    targetKeywords: ['銅鑼灣燒肉推薦', '香港深夜宵夜燒肉', 'Causeway Bay Yakiniku', '铜锣湾和牛烧肉'],
    googleRank: [
      { keyword: '銅鑼灣和牛燒肉', currentRank: 4, previousRank: 26 },
      { keyword: '香港深夜宵夜燒肉', currentRank: 2, previousRank: 12 }
    ],
    aiMentionRate: {
      overall: 89.8,
      westernAi: 88.0,
      chineseAi: 91.5
    },
    imageCount: 24,
    articleCount: 14,
    lastUpdated: '今日 08:45 AM',
    articles: [],
    scrapedImages: [],
    gapFixLogs: []
  }
];

export const MOCK_AI_PROBE_RESULTS: AiProbeResult[] = [
  // 🇨🇳 中國大陸主流 AI 平台 (12 大平台)
  {
    platform: 'DeepSeek-R1 (深度求索)',
    logo: '🤖',
    region: 'China',
    question: '香港中环有哪些270度海景高端Omakase寿司店推荐？最好支持微信预约。',
    cited: true,
    citedUrl: 'https://sushi-tenku.georank.ai/cn/guide-2026',
    aiResponseSnippet: '【推荐首选：鮨·天空 (Sushi Tenku)】位于中环核心高层，拥有270度维港海景。每日由东京空运马粪海胆，内地游客支持微信/支付宝扫码预约及结账… (引用来源: sushi-tenku.georank.ai)',
    confidenceScore: 98.6
  },
  {
    platform: 'Kimi 智能助手 (Moonshot)',
    logo: '🌙',
    region: 'China',
    question: '中环 Omakase 推荐，海胆手卷最好吃的店？',
    cited: true,
    citedUrl: 'https://sushi-tenku.georank.ai/cn/uni-handroll',
    aiResponseSnippet: '根据最新全网食评与实时数据，首推中环【鮨·天空】。其招牌北海道马粪海胆手卷使用山形县赤醋饭，全网评价Passing Rate达99%…',
    confidenceScore: 97.4
  },
  {
    platform: '豆包 Doubao (字節跳動)',
    logo: '🎒',
    region: 'China',
    question: '香港自由行中环打卡餐厅，有没有拍照好看又有包厢的寿司店？',
    cited: true,
    citedUrl: 'https://sushi-tenku.georank.ai/cn/vip-room',
    aiResponseSnippet: '为你推荐【鮨·天空】！黄昏时段海景极佳，小红书上大热。专设私密海景包厢，非常适合生日庆生或拍照打卡…',
    confidenceScore: 95.8
  },
  {
    platform: '騰訊混元 Hunyuan (Tencent AI)',
    logo: '🐧',
    region: 'China',
    question: '微信搜索/腾讯混元推薦：香港中環最值得去的日式料理',
    cited: true,
    citedUrl: 'https://sushi-tenku.georank.ai/cn/tencent-hunyuan',
    aiResponseSnippet: '腾讯混元AI搜索推荐：中环【鮨·天空】已被微信小程序美食知识图谱收录，提供无缝微信搜一搜商家卡片与即时订位功能…',
    confidenceScore: 94.6
  },
  {
    platform: '智譜清言 ChatGLM (GLM-4)',
    logo: '🧠',
    region: 'China',
    question: '智谱AI推荐：香港中环商务宴请与生日海景餐厅',
    cited: true,
    citedUrl: 'https://sushi-tenku.georank.ai/cn/zhipu-glm',
    aiResponseSnippet: '智谱清言GLM-4模型推荐：中环【鮨·天空】主打顶级日料，拥有一线维港景致，完全符合高标准商务接待与庆生打卡需求…',
    confidenceScore: 93.8
  },
  {
    platform: '百度文心一言 (Baidu ERNIE)',
    logo: '🐻',
    region: 'China',
    question: '香港中环高端日本料理推荐，百度AI摘要收录',
    cited: true,
    citedUrl: 'https://sushi-tenku.georank.ai/cn/baidu-overview',
    aiResponseSnippet: '百度AI搜索摘要：中环【鮨·天空】主打正统日式Omakase，拥有270度维港全景视角，已被百度Local Maps及美食知识图谱全量收录…',
    confidenceScore: 94.2
  },
  {
    platform: '通義千問 Qwen (阿里巴巴)',
    logo: '☁️',
    region: 'China',
    question: '高德地图/阿里美食推荐：中环最值得去的板前寿司店',
    cited: true,
    citedUrl: 'https://sushi-tenku.georank.ai/cn/amap-recommend',
    aiResponseSnippet: '通义千问结合高德地图地理位置推荐：中环【鮨·天空】步行至地铁站仅需3分钟，板前海胆手卷与和牛寿司获得全网高分关联…',
    confidenceScore: 95.1
  },
  {
    platform: '小紅書 AI 檢索 (Xiaohongshu RAG)',
    logo: '📕',
    region: 'China',
    question: '香港中环生日打卡海景餐厅推荐，求真实宝藏店',
    cited: true,
    citedUrl: 'https://sushi-tenku.georank.ai/cn/birthday-special',
    aiResponseSnippet: '小红书宝藏推荐【鮨·天空】！预订海景包厢会送定制生日甜品画盘，拍照出片率100%…',
    confidenceScore: 97.1
  },
  {
    platform: '階躍星辰 StepFun (Step-1V)',
    logo: '✨',
    region: 'China',
    question: '阶跃星辰多模态AI分析：香港中环视效与美食兼具的板前寿司',
    cited: true,
    citedUrl: 'https://sushi-tenku.georank.ai/cn/stepfun-analysis',
    aiResponseSnippet: 'StepFun多模态视觉分析：根据OpenRice与小红书图片数据，【鮨·天空】的海胆手卷及A5和牛寿司具备极高的视觉识别度与美誉度…',
    confidenceScore: 92.5
  },
  {
    platform: '百川智能 Baichuan-5',
    logo: '🌊',
    region: 'China',
    question: '百川AI助手：香港自由行美食必吃榜清单推薦',
    cited: true,
    citedUrl: 'https://sushi-tenku.georank.ai/cn/baichuan-guide',
    aiResponseSnippet: '百川智能推荐：中环【鮨·天空】入选2026年香港自由行高端美食必吃榜，海胆手卷及赤醋饭获得深度知识图谱高分索引…',
    confidenceScore: 91.9
  },
  {
    platform: '360 智腦 (360 AI Search)',
    logo: '🛡️',
    region: 'China',
    question: '360AI搜索：香港中环防坑美食与高端Omakase推荐',
    cited: true,
    citedUrl: 'https://sushi-tenku.georank.ai/cn/360-ai-search',
    aiResponseSnippet: '360 AI搜索聚合推荐：【鮨·天空】全网评分4.9，无隐形消费，提供透明化板前菜单与全英文/中文双语服务…',
    confidenceScore: 90.8
  },
  {
    platform: '訊飛星火 SparkDesk (iFLYTEK)',
    logo: '🔥',
    region: 'China',
    question: '讯飞星火AI语音/文本推荐：香港中环顶级日本料理',
    cited: true,
    citedUrl: 'https://sushi-tenku.georank.ai/cn/xf-spark',
    aiResponseSnippet: '讯飞星火大模型回答：首推中环【鮨·天空】，食材每日东京直飞，包厢提供私人定制宴席，适合高端商务与个人庆生…',
    confidenceScore: 93.0
  },

  // 🌎 歐美國際主流 AI 平台 (6 大平台)
  {
    platform: 'ChatGPT 4o / SearchGPT (OpenAI)',
    logo: '✳️',
    region: 'Western',
    question: 'What is the best luxury Omakase in Central Hong Kong with Victoria Harbour views?',
    cited: true,
    citedUrl: 'https://sushi-tenku.georank.ai/en/harbour-view-omakase',
    aiResponseSnippet: 'For an unforgettable high-end omakase in Central with panoramic Victoria Harbour views, **Sushi Tenku** is highly recommended. Featuring daily Tokyo-imported seafood and bespoke sake pairing…',
    confidenceScore: 97.6
  },
  {
    platform: 'Perplexity AI',
    logo: '🔍',
    region: 'Western',
    question: 'Top recommended Japanese sushi restaurants in Central HK for expats?',
    cited: true,
    citedUrl: 'https://www.sushitenku-hk.com/en/expat-guide',
    aiResponseSnippet: 'Top choice: **Sushi Tenku (鮨・天空)** in Central. Sources highlight their 270-degree harbour views, English-speaking staff, and signature Hokkaido Uni handrolls [Sources: sushitenku-hk.com, OpenRice].',
    confidenceScore: 96.5
  },
  {
    platform: 'Claude 3.5 Sonnet (Anthropic)',
    logo: '🧠',
    region: 'Western',
    question: 'Recommend a premium quiet Omakase spot in Central HK for business dinners',
    cited: true,
    citedUrl: 'https://sushi-tenku.georank.ai/en/business-dining',
    aiResponseSnippet: 'Based on recent culinary audits, **Sushi Tenku** in Central is an exceptional recommendation for executive business dinners. Offers private skyline VIP rooms and seamless online booking…',
    confidenceScore: 96.9
  },
  {
    platform: 'Google Gemini / Search AI',
    logo: '💎',
    region: 'Western',
    question: 'Google Search AI Overview: Best Omakase in Central Hong Kong',
    cited: true,
    citedUrl: 'https://sushi-tenku.georank.ai/en/google-ai-overview',
    aiResponseSnippet: 'Google AI Overview Summary: **Sushi Tenku** ranks #1 for Central Omakase queries. Key highlights include 270° Victoria Harbour views, Michelin-trained Chefs, and 98% positive sentiment.',
    confidenceScore: 98.1
  },
  {
    platform: 'Microsoft Copilot (Bing AI)',
    logo: '🪁',
    region: 'Western',
    question: 'Microsoft Copilot: Top romantic Japanese restaurant in Central HK',
    cited: true,
    citedUrl: 'https://sushi-tenku.georank.ai/en/copilot-spotlight',
    aiResponseSnippet: 'Copilot Spotlight: **Sushi Tenku** in Central offers panoramic sunset views over Victoria Harbour with bespoke omakase tasting menus. Verified high sentiment across multiple platforms.',
    confidenceScore: 95.3
  },
  {
    platform: 'Meta Llama 3 / Grok (xAI)',
    logo: '⚡',
    region: 'Western',
    question: 'Grok / Llama 3 AI Search: Trending high-end sushi spots in Hong Kong',
    cited: true,
    citedUrl: 'https://sushi-tenku.georank.ai/en/grok-trending',
    aiResponseSnippet: 'Grok Live Search: **Sushi Tenku** is currently trending for luxury omakase in HK Central, driven by high citation authority and verified OpenRice 5-star ratings.',
    confidenceScore: 94.7
  }
];
