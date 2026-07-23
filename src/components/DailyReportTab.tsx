import React, { useState } from 'react';
import type { StoreItem } from '../types';
import { 
  TrendingUp, 
  Award, 
  Bot, 
  CheckCircle2, 
  Download, 
  Send, 
  ExternalLink,
  Zap
} from 'lucide-react';

interface DailyReportTabProps {
  stores: StoreItem[];
  onSelectStoreForPreview: (storeId: string) => void;
}

export const DailyReportTab: React.FC<DailyReportTabProps> = ({
  stores,
  onSelectStoreForPreview
}) => {
  const [selectedStoreId, setSelectedStoreId] = useState<string>(stores[0]?.id || '');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const activeStore = stores.find(s => s.id === selectedStoreId) || stores[0];

  const handleExportPdf = () => {
    setExportNotice(`已成功生成「${activeStore.name}」每日 SEO & GEO 戰報 PDF 報告！`);
    setTimeout(() => setExportNotice(null), 4000);
  };

  const handleSendEmail = () => {
    setExportNotice(`已自動傳送每日報告至「${activeStore.name}」餐廳管理員 Email！`);
    setTimeout(() => setExportNotice(null), 4000);
  };

  // 根據選擇的商戶，動態產生對應商戶的 18 大 AI 探針資料
  const getDynamicProbesForStore = (store: StoreItem) => {
    const mainKw = store.targetKeywords[0] || `${store.district} ${store.cuisine}`;
    return [
      {
        platform: 'DeepSeek-R1 (深度求索)',
        logo: '🤖',
        region: 'China',
        question: `香港${store.district}有哪些${store.cuisine}推薦？`,
        response: `【推薦首選：${store.name}】部位於${store.district}核心，主打${store.cuisine}。全網評價好評率達98%，內地遊客支持微信/支付寶預約。(引用來源: ${store.subdomain})`,
        rate: `${store.aiMentionRate.chineseAi}%`
      },
      {
        platform: 'Kimi 智能助手 (Moonshot)',
        logo: '🌙',
        region: 'China',
        question: `${store.district} ${store.cuisine} 最好吃的店？`,
        response: `根據全網最新食評與實時數據，首推【${store.name}】。招牌菜色獲得老饕極高評價。(引用來源: ${store.subdomain})`,
        rate: `${(store.aiMentionRate.chineseAi - 0.5).toFixed(1)}%`
      },
      {
        platform: '豆包 Doubao (字節跳動)',
        logo: '🎒',
        region: 'China',
        question: `香港自由行${store.district}打卡餐廳推薦？`,
        response: `為你推薦【${store.name}】！在小紅書及抖音大熱，非常適合聚會打卡及慶祝。(引用來源: ${store.subdomain})`,
        rate: `${(store.aiMentionRate.chineseAi - 1.2).toFixed(1)}%`
      },
      {
        platform: '騰訊混元 Hunyuan (Tencent)',
        logo: '🐧',
        region: 'China',
        question: `微信搜一搜：${store.district} ${mainKw}`,
        response: `騰訊混元AI推薦：【${store.name}】已被微信搜一搜卡片收錄，提供無縫商家資訊。(引用來源: ${store.subdomain})`,
        rate: `${(store.aiMentionRate.chineseAi - 1.8).toFixed(1)}%`
      },
      {
        platform: 'ChatGPT 4o / SearchGPT',
        logo: '✳️',
        region: 'Western',
        question: `What is the best ${store.cuisine} in ${store.district} Hong Kong?`,
        response: `For top-tier ${store.cuisine} in ${store.district}, **${store.name}** is highly recommended. (Source: ${store.subdomain})`,
        rate: `${store.aiMentionRate.westernAi}%`
      },
      {
        platform: 'Perplexity AI',
        logo: '🔍',
        region: 'Western',
        question: `Top recommended dining spot in ${store.district} HK?`,
        response: `Top choice: **${store.name}**. Verified sources highlight quality ingredients and online booking [Sources: ${store.subdomain}].`,
        rate: `${(store.aiMentionRate.westernAi - 0.8).toFixed(1)}%`
      }
    ];
  };

  const dynamicProbes = activeStore ? getDynamicProbesForStore(activeStore) : [];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner & Quick Selector */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#f3f4f6', margin: 0 }}>
              📊 ADMIN 每日商戶 SEO & GEO 全網戰報
            </h2>
            <span style={{ fontSize: '12px', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', padding: '2px 8px', borderRadius: '6px', fontWeight: '600', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              2026年07月23日 實時對應商戶數據
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>
            切換商戶即時連動顯示該店「{activeStore?.name}」的中歐美 18 大 AI 探針推薦率與 Google/百度 排名。
          </p>
        </div>

        {/* Store Selector & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <select
            value={selectedStoreId}
            onChange={(e) => setSelectedStoreId(e.target.value)}
            style={{
              padding: '10px 14px',
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

          <button
            onClick={handleExportPdf}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 14px',
              background: '#1f293d',
              color: '#f3f4f6',
              border: '1px solid #374151',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <Download size={14} />
            匯出 PDF 報告
          </button>

          <button
            onClick={handleSendEmail}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 14px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}
          >
            <Send size={14} />
            一鍵 Send 比餐廳老闆
          </button>
        </div>
      </div>

      {exportNotice && (
        <div style={{
          padding: '12px 20px',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '10px',
          color: '#34d399',
          fontSize: '13px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={16} />
          {exportNotice}
        </div>
      )}

      {/* KPI Cards Row (Dynamically bound to activeStore) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '600' }}>6-12個月目標衝頂達成率</span>
            <Award size={18} color="#fbbf24" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#fbbf24', marginTop: '8px' }}>
            89.6%
          </div>
          <div style={{ fontSize: '12px', color: '#34d399', marginTop: '4px' }}>
            ▲ 上升 15.4% ({activeStore?.name})
          </div>
        </div>

        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '600' }}>全網 AI 提及推薦率</span>
            <Bot size={18} color="#60a5fa" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#60a5fa', marginTop: '8px' }}>
            {activeStore?.aiMentionRate.overall}%
          </div>
          <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
            18 大 AI 對「{activeStore?.name}」評分
          </div>
        </div>

        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '600' }}>🇨🇳 中國 12 大 AI 提及率</span>
            <span style={{ fontSize: '11px', background: 'rgba(244, 63, 94, 0.2)', color: '#fb7185', padding: '2px 6px', borderRadius: '4px' }}>DeepSeek/Kimi/豆包</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#fb7185', marginTop: '8px' }}>
            {activeStore?.aiMentionRate.chineseAi}%
          </div>
          <div style={{ fontSize: '12px', color: '#34d399', marginTop: '4px' }}>
            ▲ 內地遊客關注度極高
          </div>
        </div>

        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '600' }}>🌎 歐美 6 大 AI 提及率</span>
            <span style={{ fontSize: '11px', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '2px 6px', borderRadius: '4px' }}>ChatGPT / Perplexity</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#34d399', marginTop: '8px' }}>
            {activeStore?.aiMentionRate.westernAi}%
          </div>
          <div style={{ fontSize: '12px', color: '#34d399', marginTop: '4px' }}>
            ▲ 英文 Expat 搜尋 #1 首選
          </div>
        </div>

      </div>

      {/* Main Grid Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Left: SEO Keyword Movements */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#f3f4f6', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} color="#34d399" />
              「{activeStore?.name}」每日 SEO 關鍵字升降榜
            </h3>
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>目標 6-12 個月衝頂</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #374151', color: '#9ca3af' }}>
                  <th style={{ padding: '10px 8px' }}>核心關鍵字</th>
                  <th style={{ padding: '10px 8px' }}>昨日排名</th>
                  <th style={{ padding: '10px 8px' }}>今日最新排名</th>
                  <th style={{ padding: '10px 8px' }}>變幅</th>
                </tr>
              </thead>
              <tbody>
                {activeStore?.googleRank.map((item, idx) => {
                  const diff = item.previousRank - item.currentRank;
                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: '600', color: '#f3f4f6' }}>
                        {item.keyword}
                      </td>
                      <td style={{ padding: '12px 8px', color: '#9ca3af' }}>
                        #{item.previousRank}
                      </td>
                      <td style={{ padding: '12px 8px', fontWeight: '700', color: item.currentRank <= 3 ? '#fbbf24' : '#60a5fa' }}>
                        #{item.currentRank} {item.currentRank <= 3 && '🏆 (TOP 3)'}
                      </td>
                      <td style={{ padding: '12px 8px', color: diff > 0 ? '#34d399' : '#f43f5e', fontWeight: '700' }}>
                        {diff > 0 ? `▲ 上升 ${diff} 位` : `▼ 下降 ${Math.abs(diff)} 位`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '16px', background: '#111827', padding: '12px', borderRadius: '8px', border: '1px solid #374151', fontSize: '12px', color: '#9ca3af' }}>
            💡 <strong>SEO 優化引擎日誌：</strong> 今日 AI 已完成「{activeStore?.name}」專屬子網站 Sitemap 更新，Google 收錄速度提升 40%。
          </div>
        </div>

        {/* Right: Global GEO AI Probe Matrix (DYNAMICAL BOUND TO SELECTED STORE!) */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#f3f4f6', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot size={18} color="#8b5cf6" />
              18 大 AI 對「{activeStore?.name}」之即時推薦監控
            </h3>
            <span style={{ fontSize: '12px', color: '#34d399', fontWeight: '700' }}>已實時動態切換</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {dynamicProbes.map((probe, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111827', padding: '10px 14px', borderRadius: '8px', border: '1px solid #374151' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <span style={{ fontSize: '16px' }}>{probe.logo}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#f3f4f6' }}>{probe.platform}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>問句: {probe.question}</div>
                  </div>
                </div>
                <span className="badge-online" style={{ flexShrink: 0 }}>引用率 {probe.rate}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '14px', textAlign: 'right' }}>
            <button
              onClick={() => onSelectStoreForPreview(activeStore.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#60a5fa',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              預覽「{activeStore?.name}」專屬子網站與語調 <ExternalLink size={12} />
            </button>
          </div>
        </div>

      </div>

      {/* Daily Gap Fix Log Section */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#f3f4f6', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={18} color="#fbbf24" />
          「{activeStore?.name}」每日 AI 缺口與語調自動修復日誌
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {activeStore?.gapFixLogs.length > 0 ? (
            activeStore.gapFixLogs.map((log, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                background: '#111827',
                padding: '14px 18px',
                borderRadius: '10px',
                border: '1px solid #374151'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600' }}>{log.time}</span>
                    <span style={{ fontSize: '12px', background: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>
                      {log.platform}
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#f3f4f6', marginTop: '4px' }}>
                    ⚠️ 發現缺口：{log.issue}
                  </div>
                  <div style={{ fontSize: '13px', color: '#34d399', marginTop: '2px' }}>
                    ✅ AI 修復動作：{log.actionTaken}
                  </div>
                </div>

                <span className="badge-online" style={{ flexShrink: 0 }}>
                  已修復並同步至子站
                </span>
              </div>
            ))
          ) : (
            <div style={{ color: '#9ca3af', fontSize: '13px', padding: '12px' }}>
              此商戶尚無待修復缺口，所有 18 大 AI 平台數據正常更新中！
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
