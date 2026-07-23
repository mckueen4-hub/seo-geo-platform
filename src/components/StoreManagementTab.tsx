import React, { useState } from 'react';
import type { StoreItem } from '../types';
import { Building2, Globe, Image as ImageIcon, FileText, ArrowRight, Plus, ExternalLink, Edit3, Trash2, AlertTriangle } from 'lucide-react';

interface StoreManagementTabProps {
  stores: StoreItem[];
  onOpenNewStoreModal: () => void;
  onSelectStoreForPreview: (storeId: string) => void;
  onOpenAltEditor: (store: StoreItem) => void;
  onDeleteStore: (storeId: string) => void;
}

export const StoreManagementTab: React.FC<StoreManagementTabProps> = ({
  stores,
  onOpenNewStoreModal,
  onSelectStoreForPreview,
  onOpenAltEditor,
  onDeleteStore
}) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleConfirmDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('[StoreManagementTab] 觸發確認刪除商戶 ID:', id);
    onDeleteStore(id);
    setConfirmDeleteId(null);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title & Action Header */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#f3f4f6', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={20} color="#60a5fa" />
            商戶列表與 OpenRice 素材擷取庫
          </h2>
          <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>
            管理員可隨時新增商戶或為解約離隊的商戶執行刪除與子網站下架。
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenNewStoreModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '700',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          <Plus size={16} />
          新增商戶資料 / OpenRice 連結
        </button>
      </div>

      {/* Stores List Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {stores.map(store => (
          <div key={store.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
            
            <div>
              {/* Store Header & Delete Action */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#f3f4f6', margin: 0 }}>
                    {store.name}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <span style={{ fontSize: '11px', background: '#374151', color: '#d1d5db', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>
                      📍 {store.district}
                    </span>
                    <span style={{ fontSize: '11px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>
                      🍱 {store.cuisine}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge-online">
                    AI 運作中
                  </span>
                  
                  {/* Trash Delete Icon Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setConfirmDeleteId(store.id);
                    }}
                    title="刪除/解約商戶"
                    style={{
                      background: 'rgba(244, 63, 94, 0.15)',
                      color: '#fb7185',
                      border: '1px solid rgba(244, 63, 94, 0.4)',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontWeight: '700',
                      fontSize: '12px'
                    }}
                  >
                    <Trash2 size={14} /> 刪除
                  </button>
                </div>
              </div>

              {/* Confirm Delete Warning Banner */}
              {confirmDeleteId === store.id && (
                <div style={{
                  background: 'rgba(244, 63, 94, 0.25)',
                  border: '1px solid #f43f5e',
                  padding: '14px',
                  borderRadius: '10px',
                  marginBottom: '14px',
                  fontSize: '12px',
                  color: '#fecdd3',
                  boxShadow: '0 4px 14px rgba(244, 63, 94, 0.3)'
                }}>
                  <div style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontSize: '13px', color: '#fff' }}>
                    <AlertTriangle size={18} color="#fb7185" /> 確定要解約並刪除「{store.name}」？
                  </div>
                  <div style={{ color: '#fecdd3', marginBottom: '10px' }}>
                    此動作會立即停用其專屬子網站、下架 SEO/GEO 頁面並停止 AI 每日爬蟲。
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={(e) => handleConfirmDelete(e, store.id)}
                      style={{
                        padding: '6px 14px',
                        background: '#f43f5e',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: '800',
                        fontSize: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(244, 63, 94, 0.4)'
                      }}
                    >
                      ✓ 確定刪除商戶
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setConfirmDeleteId(null);
                      }}
                      style={{
                        padding: '6px 14px',
                        background: '#374151',
                        color: '#d1d5db',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      取消
                    </button>
                  </div>
                </div>
              )}

              {/* Domains & Subsite info */}
              <div style={{ background: '#111827', padding: '12px', borderRadius: '8px', border: '1px solid #374151', margin: '14px 0', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af', marginBottom: '4px' }}>
                  <Globe size={13} color="#60a5fa" />
                  <strong>專屬託管子網站：</strong>
                </div>
                <a 
                  href={`https://${store.subdomain}`} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: '600', fontFamily: 'var(--font-mono)' }}
                >
                  https://{store.subdomain}
                </a>

                {store.customDomain && (
                  <div style={{ marginTop: '4px', color: '#34d399', fontSize: '11px', fontWeight: '600' }}>
                    🔗 獨立綁定網域：{store.customDomain}
                  </div>
                )}
              </div>

              {/* Keywords Tag List */}
              <div style={{ marginBottom: '14px' }}>
                <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600' }}>目標衝頂關鍵字：</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                  {store.targetKeywords.map((kw, i) => (
                    <span key={i} style={{ fontSize: '11px', background: '#1f293d', color: '#e5e7eb', padding: '3px 8px', borderRadius: '4px', border: '1px solid #374151' }}>
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scraped Assets Stats & Alt Tag Editor trigger */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '8px', fontSize: '12px' }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af' }}>
                    <ImageIcon size={14} color="#fbbf24" />
                    <span>圖片: <strong style={{ color: '#f3f4f6' }}>{store.imageCount} 張</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af' }}>
                    <FileText size={14} color="#34d399" />
                    <span>受眾文章: <strong style={{ color: '#f3f4f6' }}>{store.articleCount} 篇</strong></span>
                  </div>
                </div>

                {store.scrapedImages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => onOpenAltEditor(store)}
                    style={{
                      background: 'rgba(251, 191, 36, 0.15)',
                      color: '#fbbf24',
                      border: '1px solid rgba(251, 191, 36, 0.3)',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Edit3 size={12} /> 校正 Alt 標籤
                  </button>
                )}
              </div>

            </div>

            {/* Bottom Actions */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => onSelectStoreForPreview(store.id)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '9px 12px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                預覽專屬子網站與語調 <ArrowRight size={14} />
              </button>

              <a
                href={store.openriceUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '9px 12px',
                  background: '#111827',
                  color: '#fbbf24',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                OpenRice 原始頁 <ExternalLink size={12} style={{ marginLeft: '4px' }} />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
