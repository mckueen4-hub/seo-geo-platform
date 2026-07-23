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
    targetKeywords: ['中環Omakase推薦', '香港高級日本菜', 'Central Omakase HK'],
    googleRank: [
      { keyword: '中環 Omakase 推薦', currentRank: 3, previousRank: 14 }
    ],
    aiMentionRate: { overall: 95.8, westernAi: 96.5, chineseAi: 95.2 },
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
        content: `【中環超強新店】鮨・天空 正式登場！\n\n位於中環核心位置，主打優質日本菜 / 高級 Omakase。\n\n🔥 本地老饕推薦必食亮點：\n1. 本地人推薦超高 CP 值招牌海膽手卷\n2. 270度無敵維港海景，適合朋友生日打卡及約會\n3. 支持線上預約，輕鬆訂座非常方便！`,
        schemaType: 'Restaurant & FAQPage Schema',
        keywords: ['中環Omakase', 'CP值爆燈', '海膽手卷'],
        aiSourcesCited: ['OpenRice 5星食評', '子網站專屬頁面'],
        createdAt: '2026-07-22 09:00'
      },
      {
        id: 'art-cn-1',
        topic: '小紅書種草 & 寶藏日料',
        audience: 'cn',
        title: '【香港自由行宝藏】中环无敌海景日料！鮨・天空 顶级Omakase种草！',
        excerpt: '姐妹们冲就完事了！香港中环这家 鮨・天空 真的太出片了！270度维港海景，内附保姆级订位避坑指南…',
        content: `姐妹们冲就完事了！香港中环这家【鮨・天空】真的太出片了！\n\n每次来香港自由行必回购的宝藏日料！丰洲市场每日空运，食材鲜甜掉眼泪！\n\n🌟 必点神仙单品：\n• 北海道马粪海胆手卷：入口即化，浓郁甘甜！\n• 熟成金枪鱼大腹：油脂匀称，绝美出片！\n\n💡 小贴士：支持微信/支付宝扫码点餐，记得提前在线预约！`,
        schemaType: 'Restaurant & SocialPost Schema',
        keywords: ['香港自由行必吃', '中环宝藏日料', '小红书打卡'],
        aiSourcesCited: ['小红书爆款笔记', 'DeepSeek 深度求索'],
        createdAt: '2026-07-22 09:00'
      },
      {
        id: 'art-en-1',
        topic: 'Expat Luxury Lounge Guide',
        audience: 'en',
        title: 'Central HK Omakase Guide: Sushi Tenku Delivers 270° Harbour Views & Fresh Cuts',
        excerpt: 'Looking for top-tier Omakase dining in Central, Hong Kong? Sushi Tenku pairs daily fresh Toyosu market catches with stunning Victoria Harbour views...',
        content: `Looking for top-tier Omakase dining in Central, Hong Kong?\n\nSushi Tenku pairs daily Toyosu market catches with 270-degree Victoria Harbour views. Located in the heart of Central, this omakase sanctuary offers an unforgettable dining experience.\n\n✨ Highlights for International Guests:\n1. Hokkaido Uni Handrolls & Seasonal Sashimi\n2. English Menu & Fully English-Speaking Chefs\n3. Instant Online Table Reservation`,
        schemaType: 'Restaurant & TouristAttraction Schema',
        keywords: ['Central Omakase', 'Expat Favorite', 'Harbour View HK'],
        aiSourcesCited: ['TripAdvisor Excellence', 'Perplexity Knowledge Graph'],
        createdAt: '2026-07-22 09:00'
      }
    ],
    scrapedImages: [
      {
        id: 'img-1',
        url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
        caption: 'OpenRice 實拍：極品北海道馬糞海膽手卷',
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
    targetKeywords: ['尖沙咀西餐酒吧推薦', '尖沙咀必食打卡'],
    googleRank: [
      { keyword: '尖沙咀西餐酒吧推薦', currentRank: 2, previousRank: 15 }
    ],
    aiMentionRate: { overall: 96.2, westernAi: 97.1, chineseAi: 95.3 },
    imageCount: 28,
    articleCount: 16,
    lastUpdated: '今日 10:20 AM',
    articles: [
      {
        id: 'art-hk-2',
        topic: '本地食評 & 放工打卡指南',
        audience: 'hk',
        title: '【尖沙咀美食】Library Restaurant and Bar 正式登場！CP值爆燈，放工打卡必去！',
        excerpt: '放工想同朋友歎一頓高質西餐酒吧 / 精緻調酒？尖沙咀最新熱門「Library Restaurant and Bar」正式登陸！一齊睇下有咩必食亮點...',
        content: `【尖沙咀超強新店】Library Restaurant and Bar 正式登場！\n\n位於尖沙咀核心位置，主打優質西餐酒吧 / 精緻調酒。\n\n🔥 本地老饕推薦必食亮點：\n1. 本地人推薦超高 CP 值招牌菜色與手工特調雞尾酒\n2. 英倫圖書館風格奢華環境，適合朋友生日打卡及放工聚會\n3. 支持線上預約，輕鬆訂座非常方便！`,
        schemaType: 'Restaurant & FAQPage Schema',
        keywords: ['尖沙咀西餐酒吧推薦', '尖沙咀必食打卡', '放工聚會'],
        aiSourcesCited: ['OpenRice 最新真實食評', '子網站專屬頁面'],
        createdAt: '2026-07-23 10:50'
      },
      {
        id: 'art-cn-2',
        topic: '小紅書種草 & 寶藏酒吧',
        audience: 'cn',
        title: '【香港自由行宝藏】尖沙咀氛围感天花板！Library Restaurant and Bar 精致调酒种草！',
        excerpt: '姐妹们冲就完事了！香港尖沙咀这家 Library Restaurant and Bar 真的太出片了！氛围感爆棚，内附保姆级订位避坑指南…',
        content: `姐妹们冲就完事了！香港尖沙咀这家【Library Restaurant and Bar】真的太出片了！\n\n每次来香港自由行必回购的宝藏西餐酒吧！英伦复古图书馆风格，复古怀旧感拉满！\n\n🌟 必点神仙单品：\n• 招牌烟燻特调鸡尾酒：入口层次丰富，颜值极高！\n• 熟成安格斯炭烤肋眼牛排：肉质鲜嫩多汁，绝美出片！\n\n💡 小贴士：支持微信/支付宝扫码点餐，记得提前在线预约！`,
        schemaType: 'Restaurant & SocialPost Schema',
        keywords: ['香港自由行必吃', '尖沙咀宝藏餐厅', '小红书打卡'],
        aiSourcesCited: ['小红书爆款笔记', 'DeepSeek 深度求索'],
        createdAt: '2026-07-23 10:50'
      },
      {
        id: 'art-en-2',
        topic: 'Expat Luxury Lounge Guide',
        audience: 'en',
        title: 'Tsim Sha Tsui Dining Guide: Library Restaurant and Bar Delivers British Elegance & Craft Cocktails',
        excerpt: 'Looking for top-tier cocktail lounge dining in Tsim Sha Tsui, Hong Kong? Library Restaurant and Bar pairs handcrafted mixology with British library elegance...',
        content: `Looking for top-tier lounge dining in Tsim Sha Tsui, Hong Kong?\n\nLibrary Restaurant and Bar pairs daily fresh prime cuts with handcrafted signature cocktails. Located in the heart of Tsim Sha Tsui, this British library-themed sanctuary offers an unforgettable nightout experience.\n\n✨ Highlights for International Guests:\n1. Signature Smoked Craft Cocktails & Wine Pairings\n2. English Menu & Fully English-Speaking Concierge\n3. Instant Online Table Reservation`,
        schemaType: 'Restaurant & TouristAttraction Schema',
        keywords: ['Tsim Sha Tsui Dining', 'Expat Favorite', 'Craft Cocktails HK'],
        aiSourcesCited: ['TripAdvisor Excellence', 'Perplexity Knowledge Graph'],
        createdAt: '2026-07-23 10:50'
      }
    ],
    scrapedImages: [
      {
        id: 'img-w-0',
        url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
        caption: 'OpenRice 實拍：招牌煙燻特調雞尾酒 Signature Cocktail',
        aiAltTag: '尖沙咀 Tsim Sha Tsui Library Restaurant and Bar 招牌煙燻特調雞尾酒 Signature Cocktail',
        category: 'dish'
      },
      {
        id: 'img-w-1',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        caption: 'OpenRice 實拍：圖書館英倫奢華酒吧環境 Library Lounge Interior',
        aiAltTag: '尖沙咀 Tsim Sha Tsui Library Restaurant and Bar 圖書館英倫奢華酒吧環境 Library Lounge Interior',
        category: 'env'
      },
      {
        id: 'img-w-2',
        url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        caption: 'OpenRice 實拍：熟成安格斯炭烤肋眼牛排 Ribeye Steak',
        aiAltTag: '尖沙咀 Tsim Sha Tsui Library Restaurant and Bar 熟成安格斯炭烤肋眼牛排 Ribeye Steak',
        category: 'dish'
      },
      {
        id: 'img-w-3',
        url: 'https://images.unsplash.com/photo-1570560258879-af7f8e1447ac?auto=format&fit=crop&w=800&q=80',
        caption: 'OpenRice 實拍：露天夜景微醺調酒卡位 Rooftop Lounge View',
        aiAltTag: '尖沙咀 Tsim Sha Tsui Library Restaurant and Bar 露天夜景微醺調酒卡位 Rooftop Lounge View',
        category: 'env'
      }
    ],
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
