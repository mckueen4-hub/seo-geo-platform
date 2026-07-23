import React, { useState } from 'react';
import type { StoreItem, MarketAudience } from '../types';
import { Globe, CheckCircle, ExternalLink, Copy, Code, Sparkles } from 'lucide-react';

interface SubsitePreviewTabProps {
  stores: StoreItem[];
  selectedAudience: MarketAudience;
  setSelectedAudience: (aud: MarketAudience) => void;
  selectedStoreId: string;
  onSelectStoreId: (id: string) => void;
}

export const SubsitePreviewTab: React.FC<SubsitePreviewTabProps> = ({
  stores,
  setSelectedAudience,
  selectedStoreId,
  onSelectStoreId
}) => {
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [activeLangTab, setActiveLangTab] = useState<'TC' | 'SC' | 'EN'>('TC'); // 繁體中文 / 簡體中文 / 英文

  const activeStore = stores.find(s => s.id === selectedStoreId) || stores[0];

  const getArticlesByLanguage = (lang: 'TC' | 'SC' | 'EN') => {
    if (lang === 'TC') {
      return activeStore.articles.filter(a => a.audience === 'hk' || a.audience === 'tw');
    }
    if (lang === 'SC') {
      return activeStore.articles.filter(a => a.audience === 'cn');
    }
    return activeStore.articles.filter(a => a.audience === 'en');
  };

  const currentArticles = getArticlesByLanguage(activeLangTab);
  const activeArticle = currentArticles[0] || activeStore.articles[0];

  const subsiteUrl = activeLangTab === 'TC' 
    ? `https://${activeStore.subdomain}/hk/` 
    : activeLangTab === 'SC' 
    ? `https://${activeStore.subdomain}/cn/` 
    : `https://${activeStore.subdomain}/en/`;

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": activeStore.name,
    "image": activeStore.scrapedImages[0]?.url || "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": activeStore.district,
      "addressCountry": "HK"
    },
    "servesCuisine": activeStore.cuisine,
    "url": subsiteUrl,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Daily AI Generated Multi-Lingual Geo Pages"
    }
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonLdSchema, null, 2));
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 3000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header & Store Selector */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#f3f4f6', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={20} color="#3b82f6" />
            三種語言 (繁中 / 簡中 / 英文) 每日自動生成文章與專屬子網站預覽
          </h2>
          <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>
            AI 每日定時自動產出 <strong>繁體中文 (港/台)</strong>、<strong>簡體中文 (內地小紅書)</strong> 與 <strong>Native English (歐美Expat)</strong> 專屬頁面。
          </p>
        </div>

        {/* Store Switcher Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '600' }}>選擇預覽商戶：</span>
          <select
            value={selectedStoreId}
            onChange={(e) => onSelectStoreId(e.target.value)}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              background: '#111827',
              color: '#60a5fa',
              border: '1px solid #3b82f6',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {stores.map(s => (
              <option key={s.id} value={s.id}>
                📍 {s.name} ({s.district})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Language Tier Switcher Bar */}
      <div style={{ display: 'flex', gap: '12px', background: '#111827', padding: '6px', borderRadius: '12px', border: '1px solid #374151' }}>
        <button
          onClick={() => { setActiveLangTab('TC'); setSelectedAudience('hk'); }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            background: activeLangTab === 'TC' ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'transparent',
            color: activeLangTab === 'TC' ? '#fff' : '#9ca3af',
            boxShadow: activeLangTab === 'TC' ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
          }}
        >
          <span>🇭🇰 🇹🇼 繁體中文 (Traditional Chinese)</span>
          <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>香港 / 台灣受眾</span>
        </button>

        <button
          onClick={() => { setActiveLangTab('SC'); setSelectedAudience('cn'); }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            background: activeLangTab === 'SC' ? 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)' : 'transparent',
            color: activeLangTab === 'SC' ? '#fff' : '#9ca3af',
            boxShadow: activeLangTab === 'SC' ? '0 4px 12px rgba(244, 63, 94, 0.3)' : 'none'
          }}
        >
          <span>🇨🇳 簡體中文 (Simplified Chinese)</span>
          <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>內地遊客 / 小紅書</span>
        </button>

        <button
          onClick={() => { setActiveLangTab('EN'); setSelectedAudience('en'); }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            background: activeLangTab === 'EN' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
            color: activeLangTab === 'EN' ? '#fff' : '#9ca3af',
            boxShadow: activeLangTab === 'EN' ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'
          }}
        >
          <span>🌎 英文文章 (Native English)</span>
          <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>歐美 Expat / 國際旅客</span>
        </button>
      </div>

      {/* Main Preview Container */}
      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', border: '1px solid #374151' }}>
        
        {/* Browser Navigation Bar */}
        <div style={{ background: '#111827', padding: '12px 20px', borderBottom: '1px solid #374151', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
            <span style={{ marginLeft: '12px', fontSize: '13px', color: '#9ca3af', fontWeight: '600' }}>
              商戶子網站獨立 URL：
            </span>
            <span style={{ fontSize: '13px', color: '#60a5fa', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
              {subsiteUrl}
            </span>
          </div>

          <a
            href={subsiteUrl}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: '12px', color: '#34d399', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}
          >
            真實預覽 <ExternalLink size={12} />
          </a>
        </div>

        {/* Subsite Simulated Live Page */}
        <div style={{ padding: '32px', background: '#0b0f19', color: '#f3f4f6' }}>
          
          {/* Subsite Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #1f293d' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                {activeStore.name}
                <span style={{ fontSize: '12px', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '4px 10px', borderRadius: '20px', border: '1px solid rgba(59, 130, 246, 0.4)' }}>
                  {activeLangTab === 'TC' ? '🇭🇰 繁體中文版' : activeLangTab === 'SC' ? '🇨🇳 簡體中文版' : '🌎 Native English'}
                </span>
              </h1>
              <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0' }}>
                📍 {activeStore.district} • {activeStore.cuisine}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="badge-online">
                ⚡ Schema.org JSON-LD 自動注入
              </span>
            </div>
          </div>

          {/* OpenRice Photos Grid Preview */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              📸 高清美照與 AI Vision Alt 標籤配對：
            </h3>
            
            {/* Grid layout with fixed height card ratio */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {activeStore.scrapedImages.map((img, i) => (
                <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #1f293d', background: '#111827', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '160px', width: '100%', overflow: 'hidden' }}>
                    <img src={img.url} alt={img.aiAltTag} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '10px 12px', fontSize: '11px', color: '#34d399', fontWeight: '600', borderTop: '1px solid #1f293d' }}>
                    🏷️ AI Alt: {img.aiAltTag}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Generated Article Section */}
          {activeArticle && (
            <div style={{ background: '#111827', padding: '24px', borderRadius: '12px', border: '1px solid #1f293d', marginBottom: '28px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc', padding: '4px 10px', borderRadius: '6px', fontWeight: '700' }}>
                  📝 今日 AI 每日生成文章 ({activeArticle.topic})
                </span>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                  發佈時間: {activeArticle.createdAt}
                </span>
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#f3f4f6', marginBottom: '12px', lineHeight: '1.4' }}>
                {activeArticle.title}
              </h2>

              <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6', background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #3b82f6', marginBottom: '16px' }}>
                {activeArticle.excerpt}
              </p>

              <div style={{ fontSize: '14px', color: '#e5e7eb', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                {activeArticle.content}
              </div>

              {/* AI Citation Verification Footer */}
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #1f293d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} color="#fbbf24" />
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                    18 大 AI 引用來源對照：
                  </span>
                  {activeArticle.aiSourcesCited.map((src, idx) => (
                    <span key={idx} style={{ fontSize: '11px', background: '#1f293d', color: '#34d399', padding: '2px 8px', borderRadius: '4px' }}>
                      ✓ {src}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Schema.org Inspector Panel */}
          <div style={{ background: '#111827', padding: '18px', borderRadius: '10px', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#f3f4f6' }}>
                <Code size={16} color="#fbbf24" />
                <span>Google & 百度 結構化 Schema.org (JSON-LD 自動寫入)</span>
              </div>
              
              <button
                onClick={handleCopySchema}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: copiedSchema ? '#10b981' : '#1f293d',
                  color: '#fff',
                  border: '1px solid #374151',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}
              >
                {copiedSchema ? <CheckCircle size={12} /> : <Copy size={12} />}
                {copiedSchema ? '已複製 JSON-LD' : '複製 Schema'}
              </button>
            </div>

            <pre style={{ margin: 0, background: '#0b0f19', padding: '12px', borderRadius: '6px', fontSize: '11px', color: '#34d399', fontFamily: 'var(--font-mono)', overflowX: 'auto' }}>
              {JSON.stringify(jsonLdSchema, null, 2)}
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
};
