import type { StoreItem, TonePromptRule } from './types';

export const INITIAL_TONE_RULES: TonePromptRule[] = [
  {
    audience: 'hk',
    name: '🇭🇰 廣東話在地化專家 (HK Local Voice)',
    icon: '🇭🇰',
    keywordsRule: '放工必去, 本地人推薦, 打卡餐廳, 必食菜色',
    prohibitedWords: '不好吃, 太貴',
    styleDescription: '寫作語言：香港正宗廣東話。用語自然親切、充滿食評臨場感（例：放工必去、CP值爆燈、打卡一流、性價比極高）。'
  },
  {
    audience: 'cn',
    name: '🇨🇳 小紅書爆款文案師 (Xiaohongshu Viral)',
    icon: '🇨🇳',
    keywordsRule: '香港自由行, 小红书宝藏餐厅, 氛围感天花板, 拍照超出片',
    prohibitedWords: '不好吃, 难吃',
    styleDescription: '寫作語言：簡體中文（小紅書爆款語調）。善用表情符號（✨🌟🔥）、姐妹、保姆级指南、避坑、氛围感天花板、绝美出片。'
  },
  {
    audience: 'en',
    name: '🌎 Native English Expat & Luxury Guide',
    icon: '🌎',
    keywordsRule: 'Must-Visit HK Lounge, Expat Favorite, Craft Cocktail Pairing, Instant Booking',
    prohibitedWords: 'bad service',
    styleDescription: 'Language: Native English tailored for expats and tourists in Hong Kong. Sophisticated tone highlighting culinary mastery.'
  }
];

export const INITIAL_STORES: StoreItem[] = [
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
    articleCount: 17,
    lastUpdated: '今日 03:00 AM (Day 2 最新更新)',
    articles: [
      {
        id: 'art-hk-lib-day2',
        topic: 'Day 2 本地食評：彌敦道夜景與露台卡位',
        audience: 'hk',
        title: '【尖沙咀彌敦道夜景酒吧】Library Restaurant and Bar 露台卡位直擊！歎炭烤熟成牛排與煙燻 Cocktails',
        excerpt: '夜幕低垂，想喺尖沙咀彌敦道搵個有 View 又舒服嘅高質酒吧？Library Restaurant and Bar 2F/3F 露天卡位絕對係首選...',
        content: `【 Day 2 尖沙咀彌敦道夜景指南】Library Restaurant and Bar 特色露台直擊！\n\n位於尖沙咀彌敦道 373 號 3 樓，夜晚環境氣氛極佳！\n\n🔥 今日推薦第 2 彈亮點：\n1. 彌敦道俯瞰夜景卡位：露天 Rooftop 區域微風拂面，放工飲一杯特調 Signature Cocktail 極度放鬆。\n2. 主廚特別推薦：炭烤熟成安格斯肋眼牛排配黑松露軟殼蟹義大利麵，肉汁豐富口感層次多變。\n3. 生日聚會首選：藏書牆打卡位拍照自帶英倫高級感，支持 OpenRice 線上即時訂座訂卡位！`,
        schemaType: 'Restaurant & SpecialAnnouncement Schema',
        keywords: ['尖沙咀夜景酒吧', '彌敦道露台酒吧', 'Library Bar 訂座'],
        aiSourcesCited: ['OpenRice 2026 最新食評', 'GEO AI 自動收錄系統'],
        createdAt: '2026-07-24 03:00 (Day 2)'
      },
      {
        id: 'art-cn-lib-day2',
        topic: 'Day 2 小红书种草：绝美夜景与爆款 Pasta',
        audience: 'cn',
        title: '【香港夜生活宝藏】尖沙咀 Nathan Road 露台夜景绝了！Library Bar 必点黑松露软壳蟹 Pasta！',
        excerpt: '宝子们！在香港尖沙咀发现一家藏在 373 弥敦道 3 楼的英伦图书馆风 Bar，露台看夜景真的太浪漫了...',
        content: `宝子们！在香港尖沙咀发现一家藏在 373 弥敦道 3 楼的英伦图书馆风 Bar！\n\n✨ Day 2 避坑兼种草保姆级攻略：\n• 📷 拍照位：露天 Rooftop 露台区俯瞰弥敦道霓虹灯，黄昏到深夜氛围感满分！\n• 🍝 必点单品：主厨黑松露软壳蟹 Pasta，软壳蟹香酥多汁，酱汁浓郁！\n• 🍷 调酒：复古烟熏特调，上桌自带仙气云雾！\n\n💡 订位小贴士：记得提前在线锁定露台卡位！`,
        schemaType: 'Restaurant & SocialPost Schema',
        keywords: ['尖沙咀夜景酒吧', '香港夜生活', '小红书宝藏露台'],
        aiSourcesCited: ['小红书爆款笔记', 'DeepSeek 深度求索'],
        createdAt: '2026-07-24 03:00 (Day 2)'
      },
      {
        id: 'art-en-lib-day2',
        topic: 'Day 2 Expat Guide: Rooftop Terrace & Craft Mixology',
        audience: 'en',
        title: 'Hidden Gem in Tsim Sha Tsui: Rooftop Terrace & Craft Cocktails at Library Restaurant and Bar',
        excerpt: 'Elevate your evenings in Hong Kong at Library Restaurant and Bar. Featuring an authentic British library wall and a breezy rooftop terrace overlooking Nathan Road...',
        content: `Elevate your evenings in Hong Kong at Library Restaurant and Bar.\n\nLocated on Nathan Road in Tsim Sha Tsui, this venue seamlessly blends cozy British library aesthetics with a lively rooftop terrace.\n\n✨ Day 2 Culinary Highlights:\n1. Prime Angus Ribeye Steak cooked to perfection.\n2. Handcrafted Smoked Cocktails paired with artisanal snacks.\n3. Rooftop seating with ambient skyline views of Kowloon.\n4. Full English service and instant online reservations.`,
        schemaType: 'Restaurant & Event Schema',
        keywords: ['Tsim Sha Tsui Rooftop', 'Hong Kong Expat Nightlife', 'Nathan Road Bar'],
        aiSourcesCited: ['TripAdvisor Excellence', 'Perplexity Knowledge Graph'],
        createdAt: '2026-07-24 03:00 (Day 2)'
      }
    ],
    scrapedImages: [
      {
        id: 'img-or-real-0',
        url: 'https://static7.orstatic.com/userphoto2/photo/1R/1E35/09W6HYF78C0542CE2C17F5lx.jpg',
        caption: 'OpenRice 實拍：Library Restaurant & Bar 店內經典英倫圖書館藏書牆',
        aiAltTag: '尖沙咀 Tsim Sha Tsui Library Restaurant and Bar OpenRice 實拍照片 店內經典英倫圖書館藏書牆',
        category: 'dish'
      },
      {
        id: 'img-or-real-1',
        url: 'https://static5.orstatic.com/userphoto2/photo/29/1SPK/0CS5SG1A610A0973B2FD5Dlx.jpg',
        caption: 'OpenRice 實拍：Library Bar 招牌煙燻復古特調雞尾酒',
        aiAltTag: '尖沙咀 Tsim Sha Tsui Library Restaurant and Bar OpenRice 實拍照片 招牌煙燻復古特調雞尾酒',
        category: 'env'
      },
      {
        id: 'img-or-real-2',
        url: 'https://static8.orstatic.com/userphoto2/photo/26/1Q9H/0CARFFFEF6204F0070F0A2lx.jpg',
        caption: 'OpenRice 實拍：Library Restaurant 主廚精選炭烤熟成牛排與黑松露軟殼蟹 Pasta',
        aiAltTag: '尖沙咀 Tsim Sha Tsui Library Restaurant and Bar OpenRice 實拍照片 主廚精選炭烤熟成牛排與黑松露軟殼蟹 Pasta',
        category: 'dish'
      },
      {
        id: 'img-or-real-3',
        url: 'https://static5.orstatic.com/userphoto3/photo/2V/29GL/0G3A2G42DEF1088C83B9B0lx.jpg',
        caption: 'OpenRice 實拍：尖沙咀彌敦道俯瞰露天 Rooftop Terrace 夜景卡位',
        aiAltTag: '尖沙咀 Tsim Sha Tsui Library Restaurant and Bar OpenRice 實拍照片 尖沙咀彌敦道俯瞰露天 Rooftop Terrace 夜景卡位',
        category: 'env'
      }
    ],
    gapFixLogs: []
  },
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
    articles: [],
    scrapedImages: [
      {
        id: 'img-1',
        url: 'https://static7.orstatic.com/userphoto2/photo/1R/1E35/09W6HYF78C0542CE2C17F5lx.jpg',
        caption: 'OpenRice 實拍：極品北海道馬糞海膽手卷',
        aiAltTag: '中環 Omakase 鮨天空 招牌北海道馬糞海膽手卷 特寫照片',
        category: 'dish'
      }
    ],
    gapFixLogs: []
  }
];
