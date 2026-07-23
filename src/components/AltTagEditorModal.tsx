import React, { useState } from 'react';
import type { StoreItem } from '../types';
import { X, Image as ImageIcon, Edit3, Link, Save } from 'lucide-react';

interface AltTagEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  store: StoreItem;
  onUpdateImageAlt: (imageId: string, newAlt: string, newUrl?: string) => void;
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
    store?.scrapedImages?.forEach(img => {
      map[img.id] = img.aiAltTag;
    });
    return map;
  });

  const [urlTextMap, setUrlTextMap] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    store?.scrapedImages?.forEach(img => {
      map[img.id] = img.url;
    });
    return map;
  });

  if (!isOpen || !store) return null;

  const handleSave = (imgId: string) => {
    const newAlt = altTextMap[imgId];
    const newUrl = urlTextMap[imgId];
    onUpdateImageAlt(imgId, newAlt, newUrl);
    setEditingImageId(null);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
      padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '800px', maxHeight: '85vh', display: 'flex', flexDirection: 'column', padding: '24px', position: 'relative' }}>
        
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

        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#f3f4f6', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ImageIcon size={20} color="#34d399" />
          【{store.name}】真實餐廳相片與 AI Alt 標籤管理
        </h2>
        <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '18px' }}>
          您可以自由替換餐廳真實照片網址 (Photo URL) 或微調 AI Alt 描述，點擊「儲存」即時同步至線上！
        </p>

        {/* Scrollable list */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '6px' }}>
          {store.scrapedImages?.map((img) => {
            const isEditing = editingImageId === img.id;
            return (
              <div key={img.id} style={{ background: '#111827', padding: '16px', borderRadius: '12px', border: '1px solid #374151', display: 'flex', gap: '16px', alignItems: 'center' }}>
                
                {/* Photo Preview Thumbnail */}
                <div style={{ width: '140px', height: '100px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1px solid #1f293d', background: '#000' }}>
                  <img src={urlTextMap[img.id] || img.url} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Content Details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#f3f4f6' }}>
                    📸 相片標題: {img.caption}
                  </div>

                  {isEditing ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      
                      <div>
                        <label style={{ fontSize: '11px', color: '#60a5fa', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Link size={12} /> 相片真實網址 (Photo URL):
                        </label>
                        <input
                          type="text"
                          value={urlTextMap[img.id] || ''}
                          onChange={(e) => setUrlTextMap({ ...urlTextMap, [img.id]: e.target.value })}
                          placeholder="https://..."
                          style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', background: '#0b0f19', border: '1px solid #3b82f6', color: '#60a5fa', fontSize: '12px', outline: 'none' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '11px', color: '#34d399', fontWeight: '600' }}>
                          🏷️ AI Vision Alt 標籤:
                        </label>
                        <input
                          type="text"
                          value={altTextMap[img.id] || ''}
                          onChange={(e) => setAltTextMap({ ...altTextMap, [img.id]: e.target.value })}
                          style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', background: '#0b0f19', border: '1px solid #10b981', color: '#f3f4f6', fontSize: '12px', outline: 'none' }}
                        />
                      </div>

                      <button
                        onClick={() => handleSave(img.id)}
                        style={{
                          alignSelf: 'flex-start',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          background: '#10b981',
                          color: '#fff',
                          border: 'none',
                          padding: '6px 14px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        <Save size={12} /> 儲存修改
                      </button>

                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: '12px', color: '#34d399', background: 'rgba(52, 211, 153, 0.1)', padding: '6px 10px', borderRadius: '6px', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
                        🏷️ AI Alt: {altTextMap[img.id] || img.aiAltTag}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                        <span style={{ fontSize: '11px', color: '#6b7280', fontFamily: 'var(--font-mono)' }}>
                          {urlTextMap[img.id]?.substring(0, 50)}...
                        </span>

                        <button
                          onClick={() => setEditingImageId(img.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: '#1f293d',
                            color: '#60a5fa',
                            border: '1px solid #374151',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          <Edit3 size={12} /> 替換相片 / 修改 Alt
                        </button>
                      </div>
                    </>
                  )}

                </div>

              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 18px',
              background: '#374151',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            完成閉合
          </button>
        </div>

      </div>
    </div>
  );
};
