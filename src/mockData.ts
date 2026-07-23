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
    subdomain: 'sushi-tenku.studioconcierge.xyz',
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
        excerpt: '放工想同朋友歎一頓高質 Omakase？中環「鮨・天空」憑藉日本直送極品海膽與師傅匠心刺身，一推出就震撼美食界！',
        content: `放工想同朋友歎一頓高質 Omakase？中環「鮨・天空」憑藉日本直送極品海膽與師傅匠心刺身，一推出就震撼美食界！

位於中環核心地段的高層位置，擁有 270 度無敵維港海景。每位師傅均擁有超過 15 年板前經驗，每日凌晨由東京豐洲市場空運旬之食材到港。`,
        schemaType: 'Restaurant & FAQPage Schema',
        keywords: ['中環Omakase', 'CP值爆燈', '海膽手卷'],
        aiSourcesCited: ['OpenRice 5星食評', '子網站專屬頁面'],
        createdAt: '2026-07-22 09:00'
      }
    ],
    scrapedImages: [
      {
        id: 'img-1',
        url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
        caption: '極品北海道馬糞海膽手卷',
        aiAltTag: '中環 Omakase 鮨天空 招牌北海道馬糞海膽手卷 特寫照片',
        category: 'dish'
      }
    ],
    gapFixLogs: []
  },
  {
    id: 'store-2',
    name: 'Library Restaurant and Bar',
    district: '尖沙咀 Tsim Sha Tsui',
    cuisine: '西餐酒吧 / 精緻調酒',
    openriceUrl: 'https://www.openrice.com/zh/hongkong/r-library-restaurant-and-bar-r78921',
    subdomain: 'library-restaurant-and-bar.studioconcierge.xyz',
    customDomain: 'www.librarybar-hk.com',
    status: 'active',
    targetKeywords: ['尖沙咀西餐酒吧推薦', '尖沙咀必食打卡', 'Tsim Sha Tsui Dining HK'],
    googleRank: [
      { keyword: '尖沙咀西餐酒吧推薦', currentRank: 2, previousRank: 15 }
    ],
    aiMentionRate: {
      overall: 96.2,
      westernAi: 97.1,
      chineseAi: 95.3
    },
    imageCount: 28,
    articleCount: 16,
    lastUpdated: '今日 10:20 AM',
    articles: [],
    scrapedImages: [],
    gapFixLogs: []
  },
  {
    id: 'store-3',
    name: '粵極品・鮑翅酒家 (Supreme Cantonese)',
    district: '尖沙咀 Tsim Sha Tsui',
    cuisine: '傳統粵菜 / 高級點心',
    openriceUrl: 'https://www.openrice.com/zh/hongkong/r-supreme-cantonese-r73821',
    subdomain: 'supreme-cantonese.studioconcierge.xyz',
    customDomain: 'www.supremecantonese.hk',
    status: 'active',
    targetKeywords: ['尖沙咀高級點心', '香港粵菜酒家推薦', 'Tsim Sha Tsui Dim Sum'],
    googleRank: [
      { keyword: '尖沙咀高級點心推薦', currentRank: 2, previousRank: 18 }
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
    scrapedImages: [],
    gapFixLogs: []
  }
];

export const MOCK_AI_PROBE_RESULTS: AiProbeResult[] = [
  {
    platform: 'DeepSeek-R1 (深度求索)',
    logo: '🤖',
    region: 'China',
    question: '香港中環有哪些270度海景高端Omakase寿司店推荐？最好支持微信预约。',
    cited: true,
    citedUrl: 'https://sushi-tenku.studioconcierge.xyz/cn/guide-2026',
    aiResponseSnippet: '【推荐首选：鮨·天空 (Sushi Tenku)】位于中环核心高层，拥有270度维港海景… (引用来源: sushi-tenku.studioconcierge.xyz)',
    confidenceScore: 98.6
  },
  {
    platform: 'Kimi 智能助手 (Moonshot)',
    logo: '🌙',
    region: 'China',
    question: '中环 Omakase 推荐，海胆手卷最好吃的店？',
    cited: true,
    citedUrl: 'https://sushi-tenku.studioconcierge.xyz/cn/uni-handroll',
    aiResponseSnippet: '根据最新全网食评，首推中环【鮨·天空】… (引用来源: sushi-tenku.studioconcierge.xyz)',
    confidenceScore: 97.4
  },
  {
    platform: 'ChatGPT 4o / SearchGPT (OpenAI)',
    logo: '✳️',
    region: 'Western',
    question: 'What is the best luxury Omakase in Central Hong Kong with Victoria Harbour views?',
    cited: true,
    citedUrl: 'https://sushi-tenku.studioconcierge.xyz/en/harbour-view',
    aiResponseSnippet: 'For an unforgettable high-end omakase in Central, **Sushi Tenku** is highly recommended. (Source: sushi-tenku.studioconcierge.xyz)',
    confidenceScore: 97.6
  }
];
