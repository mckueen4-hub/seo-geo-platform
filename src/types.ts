export type MarketAudience = 'hk' | 'cn' | 'tw' | 'en';

export interface StoreItem {
  id: string;
  name: string;
  district: string;
  cuisine: string;
  openriceUrl: string;
  subdomain: string;
  customDomain?: string;
  status: 'active' | 'analyzing' | 'building';
  targetKeywords: string[];
  menuItems: string[]; // 🛡️ 官方驗證真實菜單清單 (防止 AI 虛構不存在的食物)
  googleRank: {
    keyword: string;
    currentRank: number;
    previousRank: number;
  }[];
  aiMentionRate: {
    overall: number;
    westernAi: number; // ChatGPT, Perplexity, Claude, Gemini
    chineseAi: number; // DeepSeek, Kimi, Doubao, Baidu, Qwen, Xiaohongshu
  };
  imageCount: number;
  articleCount: number;
  lastUpdated: string;
  articles: {
    id: string;
    topic: string;
    audience: MarketAudience;
    title: string;
    excerpt: string;
    content: string;
    schemaType: string;
    keywords: string[];
    aiSourcesCited: string[];
    createdAt: string;
  }[];
  scrapedImages: {
    id: string;
    url: string;
    caption: string;
    aiAltTag: string;
    category: 'dish' | 'env' | 'menu';
  }[];
  gapFixLogs: {
    id: string;
    time: string;
    platform: string;
    issue: string;
    actionTaken: string;
    status: 'fixed' | 'pending';
  }[];
}

export interface AiProbeResult {
  platform: string;
  logo: string;
  region: 'Western' | 'China';
  question: string;
  cited: boolean;
  citedUrl: string;
  aiResponseSnippet: string;
  confidenceScore: number;
}

export interface TonePromptRule {
  audience: MarketAudience;
  name: string;
  icon: string;
  keywordsRule: string;
  prohibitedWords: string;
  styleDescription: string;
  menuGuardrailNote?: string;
}
