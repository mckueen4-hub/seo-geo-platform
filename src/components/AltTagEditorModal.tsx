import React, { useState } from 'react';
import type { StoreItem } from '../types';
import { X, Image as ImageIcon, CheckCircle2, Edit3 } from 'lucide-react';

interface AltTagEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  store: StoreItem;
  onUpdateImageAlt: (imageId: string, newAlt: string) => void;
}

export const AltTagEditorModal: React.FC<AltTagEditorModalProps> = ({
  isOpen,
  onClose,
  store,
  onUpdateImageAlt
}) => {
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [altTextMap, setAltTextMap] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    store.scrapedImages.forEach(img => {
      map[img.id] = img.aiAltTag;
    });
    return map;
  });
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveSingleAlt = (imgId: string) => {
    const newAlt = altTextMap[imgId];
    if (newAlt) {
      onUpdateImageAlt(imgId, newAlt);
      setEditingImageId(null);
      setSavedNotice(`已更新圖片 SEO Alt Tag！已同步至「${store.name}」專屬子網站。`);
      setTimeout(() => setSavedNotice(null), 2500);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
      padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '800px', padding: '28px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: '#9ca3af',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#f3f4f6', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ImageIcon size={22} color="#fbbf24" />
          OpenRice / Blogger 素材圖片 AI Alt-Tag 手動/AI 校正器
        </h2>
        <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '20px' }}>
          「{store.name}」素材庫已擷取 {store.scrapedImages.length} 張圖片。管理員可微調 AI Vision 自動產生之關鍵字 Alt 標籤。
        </p>

        {savedNotice && (
          <div style={{
            padding: '12px 16px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '8px',
            color: '#34d399',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={16} />
            {savedNotice}
          </div>
        )}

        {/* Images List Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {store.scrapedImages.map((img) => (
            <div key={img.id} style={{
              display: 'flex',
              gap: '16px',
              background: '#111827',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #374151',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              
              <img 
                src={img.url} 
                alt={img.aiAltTag} 
                style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #374151' }} 
              />

              <div style={{ flex: 1, minWidth: '240px' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#f3f4f6', marginBottom: '4px' }}>
                  {img.caption}
                </div>

                <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '8px' }}>
                  分類標籤：<span style={{ color: '#60a5fa', fontWeight: '600' }}>{img.category === 'dish' ? '🍱 招牌菜色' : '🌆 餐廳環境'}</span>
                </div>

                {editingImageId === img.id ? (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={altTextMap[img.id] || ''}
                      onChange={(e) => setAltTextMap({ ...altTextMap, [img.id]: e.target.value })}
                      style={{
                        flex: 1,
                        padding: '6px 10px',
                        borderRadius: '6px',
                        background: '#1f293d',
                        border: '1px solid #60a5fa',
                        color: '#34d399',
                        fontSize: '12px',
                        fontFamily: 'var(--font-mono)'
                      }}
                    />
                    <button
                      onClick={() => handleSaveSingleAlt(img.id)}
                      style={{
                        padding: '6px 12px',
                        background: '#10b981',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      儲存
                    </button>
                  </div>
                ) : (
                  <div style={{
                    fontSize: '12px',
                    color: '#34d399',
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(16, 185, 129, 0.1)',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>Alt Tag: {img.aiAltTag}</span>
                    <button
                      onClick={() => setEditingImageId(img.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#60a5fa',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}
                    >
                      <Edit3 size={12} /> 編輯
                    </button>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              background: '#1f293d',
              color: '#f3f4f6',
              border: '1px solid #374151',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            關閉
          </button>
        </div>

      </div>
    </div>
  );
};
