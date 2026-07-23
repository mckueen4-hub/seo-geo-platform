import React, { useState, useMemo } from 'react';
import type { StoreItem } from '../types';
import { ExternalLink, MapPin, Utensils, Calendar, Heart, RefreshCw } from 'lucide-react';

interface StandalonePublicSubsiteViewProps {
  store: StoreItem;
}

export const StandalonePublicSubsiteView: React.FC<StandalonePublicSubsiteViewProps> = ({ store }) => {
  const [activeLang, setActiveLang] = useState<'hk' | 'cn' | 'en'>('hk');
  const [likeCount, setLikeCount] = useState<number>(382);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [rotationOffset, setRotationOffset] = useState<number>(0);

  const currentArticle = store.articles.find(a => a.audience === activeLang) || store.articles[0];

  // 🔄 每日自動依據日期 (Date Seed) 輪播照片排序
  const rotatedImages = useMemo(() => {
    if (!store.scrapedImages || store.scrapedImages.length === 0) return [];
    const todayStr = new Date().toISOString().slice(0, 10);
    let hash = 0;
    for (let i = 0; i < todayStr.length; i++) {
      hash = (hash << 5) - hash + todayStr.charCodeAt(i);
      hash |= 0;
    }
    const shift = (Math.abs(hash) + rotationOffset) % store.scrapedImages.length;
    return [...store.scrapedImages.slice(shift), ...store.scrapedImages.slice(0, shift)];
  }, [store.scrapedImages, rotationOffset]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSimulateDailyRotation = () => {
    setRotationOffset(prev => prev + 1);
  };

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": store.name,
    "image": rotatedImages[0]?.url || "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": store.district,
      "addressCountry": "HK"
    },
    "servesCuisine": store.cuisine,
    "url": `https://${store.subdomain}/${activeLang}/`
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0b0f19', color: '#f3f4f6', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* 🌟 SEO Schema.org JSON-LD 自動注入底層 (顧客看不見，AI/Google 爬蟲看得見) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />

      {/* Clean Public Top Bar */}
      <header style={{ background: '#111827', borderBottom: '1px solid #1f293d', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px', fontWeight: '900', background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {store.name}
            </span>
            <span style={{ fontSize: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              官方認證專頁
            </span>
          </div>

          {/* Controls: Language Switcher + Demo Daily Rotation Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleSimulateDailyRotation}
              title="點擊模擬每日 AI 自動更新文章與照片輪播"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(251, 191, 36, 0.15)',
                color: '#fbbf24',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={13} />
              🔄 模擬每日 AI 圖片輪播
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0b0f19', padding: '4px', borderRadius: '8px', border: '1px solid #1f293d' }}>
              <button
                onClick={() => setActiveLang('hk')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  background: activeLang === 'hk' ? '#3b82f6' : 'transparent',
                  color: activeLang === 'hk' ? '#fff' : '#9ca3af'
                }}
              >
                🇭🇰 繁體中文
              </button>
              <button
                onClick={() => setActiveLang('cn')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  background: activeLang === 'cn' ? '#f43f5e' : 'transparent',
                  color: activeLang === 'cn' ? '#fff' : '#9ca3af'
                }}
              >
                🇨🇳 简体中文
              </button>
              <button
                onClick={() => setActiveLang('en')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  background: activeLang === 'en' ? '#10b981' : 'transparent',
                  color: activeLang === 'en' ? '#fff' : '#9ca3af'
                }}
              >
                🌎 English
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Hero Banner Section (Dynamically rotated based on daily seed) */}
      <section style={{ position: 'relative', height: '380px', overflow: 'hidden', background: '#111827' }}>
        <img
          src={rotatedImages[0]?.url || "https://static7.orstatic.com/userphoto2/photo/1R/1E35/09W6HYF78C0542CE2C17F5lx.jpg"}
          alt={rotatedImages[0]?.aiAltTag || store.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65)', transition: 'all 0.5s ease-in-out' }}
        />

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 24px', background: 'linear-gradient(to top, #0b0f19 0%, transparent 100%)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#fbbf24', fontWeight: '700', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <RefreshCw size={12} /> 今日首選主打實拍照：{rotatedImages[0]?.caption || 'OpenRice 官方實拍'}
              </div>
              <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#fff', margin: '0 0 8px' }}>
                {store.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#d1d5db' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={16} color="#ef4444" /> {store.district}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Utensils size={16} color="#3b82f6" /> {store.cuisine}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleLike}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  background: isLiked ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255,255,255,0.1)',
                  color: isLiked ? '#fb7185' : '#fff',
                  border: isLiked ? '1px solid #f43f5e' : '1px solid rgba(255,255,255,0.2)',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <Heart size={16} fill={isLiked ? '#fb7185' : 'none'} color={isLiked ? '#fb7185' : '#fff'} />
                {likeCount} 食客推薦
              </button>

              <a
                href={store.openriceUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 22px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
                }}
              >
                <Calendar size={16} /> 立即線上訂座 / 菜單 <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '36px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Photo Gallery (Daily Rotated) */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              📸 OpenRice 官方實拍照（每日 AI 自動調動輪播）
            </h2>
            <span style={{ fontSize: '12px', color: '#34d399', fontWeight: '600' }}>
              ✓ 每日動態刷新，維持 18 大 AI 高新鮮度權重
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {rotatedImages.map((img, idx) => (
              <div key={idx} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #1f293d', background: '#111827', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '170px', width: '100%', overflow: 'hidden' }}>
                  <img src={img.url} alt={img.aiAltTag} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '10px 12px', fontSize: '12px', color: '#d1d5db', fontWeight: '600', borderTop: '1px solid #1f293d' }}>
                  {img.caption}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Article Section */}
        {currentArticle && (
          <section style={{ background: '#111827', padding: '28px', borderRadius: '16px', border: '1px solid #1f293d' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#fff', marginBottom: '12px', lineHeight: '1.4' }}>
              {currentArticle.title}
            </h2>
            <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6', background: 'rgba(255,255,255,0.02)', padding: '14px 18px', borderRadius: '10px', borderLeft: '4px solid #3b82f6', marginBottom: '20px' }}>
              {currentArticle.excerpt}
            </p>
            <div style={{ fontSize: '15px', color: '#e5e7eb', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
              {currentArticle.content}
            </div>
          </section>
        )}

      </main>

      {/* Clean Footer */}
      <footer style={{ borderTop: '1px solid #1f293d', padding: '24px', textAlign: 'center', color: '#6b7280', fontSize: '13px', background: '#0b0f19' }}>
        © {new Date().getFullYear()} {store.name}. All Rights Reserved. • 📍 {store.district}
      </footer>

    </div>
  );
};
