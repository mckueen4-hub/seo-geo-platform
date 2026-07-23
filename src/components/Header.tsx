import React from 'react';
import { Sparkles, Building2, Globe, Bot, Plus, Activity, Sliders, CheckCircle2 } from 'lucide-react';
import type { MarketAudience } from '../types';

interface HeaderProps {
  activeTab: 'report' | 'stores' | 'subsite' | 'probe';
  setActiveTab: (tab: 'report' | 'stores' | 'subsite' | 'probe') => void;
  selectedAudience: MarketAudience;
  setSelectedAudience: (aud: MarketAudience) => void;
  onOpenNewStoreModal: () => void;
  onOpenPromptModal: () => void;
  storeCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewStoreModal,
  onOpenPromptModal,
  storeCount
}) => {
  return (
    <header className="glass-panel" style={{ borderRadius: '0 0 16px 16px', borderTop: 'none', padding: '16px 28px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand Logo & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
          }}>
            <Sparkles size={24} color="#fff" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#f3f4f6', letterSpacing: '-0.5px' }}>
                GeoRank AI <span className="gradient-text">智搜霸主</span>
              </h1>
              <span className="badge-online">
                AI 每日全自動運行中
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
              母站統一管理系統 • 已託管 <strong style={{ color: '#60a5fa' }}>{storeCount}</strong> 間商戶專屬子網站
            </p>
          </div>
        </div>

        {/* All 4 Audiences Auto-Active Badge Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.1)', padding: '6px 14px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <CheckCircle2 size={16} color="#34d399" />
          <span style={{ fontSize: '12px', color: '#34d399', fontWeight: '700' }}>
            ⚡ 4 大受眾自動全覆蓋（無須挑選，一次過產出 4 版本）：
          </span>
          <div style={{ display: 'flex', gap: '6px', marginLeft: '4px' }}>
            <span style={{ fontSize: '11px', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>🇭🇰 港人</span>
            <span style={{ fontSize: '11px', background: 'rgba(244, 63, 94, 0.2)', color: '#fb7185', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>🇨🇳 內地</span>
            <span style={{ fontSize: '11px', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>🇹🇼 台灣</span>
            <span style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>🌎 歐美</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onOpenPromptModal}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 14px',
              background: '#1f293d',
              color: '#c084fc',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            <Sliders size={16} />
            AI 語調 Prompt 設定
          </button>

          <button
            onClick={onOpenNewStoreModal}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.2s'
            }}
          >
            <Plus size={16} />
            輸入 OpenRice / 新增店鋪
          </button>
        </div>
      </div>

      {/* Main Mode Navigation Bar */}
      <nav style={{ display: 'flex', gap: '12px', marginTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
        <button
          onClick={() => setActiveTab('report')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            background: activeTab === 'report' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
            color: activeTab === 'report' ? '#818cf8' : '#9ca3af',
            outline: activeTab === 'report' ? '1px solid rgba(99, 102, 241, 0.4)' : 'none'
          }}
        >
          <Activity size={16} />
          📊 ADMIN 每日 SEO / GEO 戰報儀表板
        </button>

        <button
          onClick={() => setActiveTab('stores')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            background: activeTab === 'stores' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
            color: activeTab === 'stores' ? '#818cf8' : '#9ca3af',
            outline: activeTab === 'stores' ? '1px solid rgba(99, 102, 241, 0.4)' : 'none'
          }}
        >
          <Building2 size={16} />
          🏢 商戶與 OpenRice 素材庫
        </button>

        <button
          onClick={() => setActiveTab('subsite')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            background: activeTab === 'subsite' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
            color: activeTab === 'subsite' ? '#818cf8' : '#9ca3af',
            outline: activeTab === 'subsite' ? '1px solid rgba(99, 102, 241, 0.4)' : 'none'
          }}
        >
          <Globe size={16} />
          🌐 4 大受眾子網站頁面預覽 (4合1 全自動)
        </button>

        <button
          onClick={() => setActiveTab('probe')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            background: activeTab === 'probe' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
            color: activeTab === 'probe' ? '#818cf8' : '#9ca3af',
            outline: activeTab === 'probe' ? '1px solid rgba(99, 102, 241, 0.4)' : 'none'
          }}
        >
          <Bot size={16} />
          🤖 中歐美 18 大 AI 探針模擬器 (含 12 大中國 AI 平台)
        </button>
      </nav>
    </header>
  );
};
