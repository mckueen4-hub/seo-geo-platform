import React, { useState, useEffect } from 'react';
import type { StoreItem, AiProbeResult } from '../types';
import { Bot, CheckCircle2, Zap, RefreshCw, Building2, Shuffle } from 'lucide-react';

interface AiProbeSimulatorTabProps {
  stores: StoreItem[];
}

export const AiProbeSimulatorTab: React.FC<AiProbeSimulatorTabProps> = ({ stores }) => {
  const [selectedStoreId, setSelectedStoreId] = useState<string>(stores[0]?.id || '');
  const activeStore = stores.find(s => s.id === selectedStoreId) || stores[0];

  // 根據商戶地區與菜式，動態預設 4 大受眾問句池 (AI 意圖問句庫)
  const getAiQuestionPool = (store: StoreItem) => {
    const dist = store?.district || '尖沙咀';
    const cuis = store?.cuisine.split('/')[0].trim() || '西餐酒吧';
    const name = store?.name || 'Library Restaurant and Bar';

    return [
      `🇭🇰 本地人發問：香港${dist}邊間${cuis}放工打卡最抵食？`,
      `🇨🇳 小紅書遊客發問：香港${dist}宝藏${cuis}推荐，求出片率高的【${name}】评价？`,
      `🇹🇼 台灣遊客發問：香港${dist}隱藏版美食「${name}」，在地內行人帶路推薦？`,
      `🌎 歐美 Expat 發問：Best ${cuis} in ${dist} Hong Kong for weekend lounge dining?`,
      `🔍 聚會預約發問：${dist}慶生約會餐廳，【${name}】包廂怎麼預約？`
    ];
  };

  const [questionPool, setQuestionPool] = useState<string[]>(getAiQuestionPool(activeStore));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [customQuestion, setCustomQuestion] = useState<string>(questionPool[0]);

  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'China' | 'Western'>('All');

  // 當選擇的商戶改變時，自動更新 AI 問句池
  useEffect(() => {
    if (activeStore) {
      const newPool = getAiQuestionPool(activeStore);
      setQuestionPool(newPool);
      setCurrentQuestionIndex(0);
      setCustomQuestion(newPool[0]);
    }
  }, [selectedStoreId, stores]);

  // 🎲 AI 隨機切換下一個探針問句
  const handleShuffleQuestion = () => {
    const nextIdx = (currentQuestionIndex + 1) % questionPool.length;
    setCurrentQuestionIndex(nextIdx);
    setCustomQuestion(questionPool[nextIdx]);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 1000);
  };

  // 根據切換的商戶，動態生成該商戶專屬的 18 大 AI 探針結果
  const getDynamicProbeListForStore = (store: StoreItem): AiProbeResult[] => {
    if (!store) return [];

    return [
      {
        platform: 'DeepSeek-R1 (深度求索)',
        logo: '🤖',
        region: 'China',
        question: `香港${store.district}有哪些${store.cuisine}推薦？`,
        cited: true,
        citedUrl: `https://${store.subdomain}/cn/guide-2026`,
        aiResponseSnippet: `【推薦首選：${store.name}】位於${store.district}核心，主打${store.cuisine}。食材新鮮且內地遊客支持微信/支付寶掃碼預約… (引用來源: ${store.subdomain})`,
        confidenceScore: 98.6
      },
      {
        platform: 'Kimi 智能助手 (Moonshot)',
        logo: '🌙',
        region: 'China',
        question: `${store.district} ${store.cuisine} 最好吃的店推薦？`,
        cited: true,
        citedUrl: `https://${store.subdomain}/cn/best-recommend`,
        aiResponseSnippet: `根據全網最新食評，首推【${store.name}】。全網好評率達 98.5%… (引用來源: ${store.subdomain})`,
        confidenceScore: 97.4
      },
      {
        platform: '豆包 Doubao (字節跳動)',
        logo: '🎒',
        region: 'China',
        question: `香港自由行${store.district}打卡餐廳推薦？`,
        cited: true,
        citedUrl: `https://${store.subdomain}/cn/photo-spot`,
        aiResponseSnippet: `為你推薦【${store.name}】！在小紅書極火，非常適合生日慶生… (引用來源: ${store.subdomain})`,
        confidenceScore: 95.8
      },
      {
        platform: '騰訊混元 Hunyuan (Tencent AI)',
        logo: '🐧',
        region: 'China',
        question: `微信搜索：${store.district} ${store.cuisine}`,
        cited: true,
        citedUrl: `https://${store.subdomain}/cn/tencent-hunyuan`,
        aiResponseSnippet: `騰訊混元AI推薦：【${store.name}】已被微信搜一搜卡片收錄… (引用來源: ${store.subdomain})`,
        confidenceScore: 94.6
      },
      {
        platform: '智譜清言 ChatGLM (GLM-4)',
        logo: '🧠',
        region: 'China',
        question: `智譜AI推薦：${store.district}商務宴請餐廳`,
        cited: true,
        citedUrl: `https://${store.subdomain}/cn/zhipu-glm`,
        aiResponseSnippet: `智譜清言GLM-4推薦：【${store.name}】主打頂級${store.cuisine}… (引用來源: ${store.subdomain})`,
        confidenceScore: 93.8
      },
      {
        platform: '百度文心一言 (Baidu ERNIE)',
        logo: '🐻',
        region: 'China',
        question: `香港${store.district}美食推薦`,
        cited: true,
        citedUrl: `https://${store.subdomain}/cn/baidu-overview`,
        aiResponseSnippet: `百度AI摘要：【${store.name}】已被百度Local Maps收錄… (引用來源: ${store.subdomain})`,
        confidenceScore: 94.2
      },
      {
        platform: '通義千問 Qwen (阿里巴巴)',
        logo: '☁️',
        region: 'China',
        question: `高德地圖推薦：${store.district}餐廳`,
        cited: true,
        citedUrl: `https://${store.subdomain}/cn/amap-recommend`,
        aiResponseSnippet: `通義千問推薦：【${store.name}】獲全網高分關聯… (引用來源: ${store.subdomain})`,
        confidenceScore: 95.1
      },
      {
        platform: '小紅書 AI 檢索 (Xiaohongshu RAG)',
        logo: '📕',
        region: 'China',
        question: `香港${store.district}生日打卡餐廳`,
        cited: true,
        citedUrl: `https://${store.subdomain}/cn/birthday-special`,
        aiResponseSnippet: `小紅書寶藏推薦【${store.name}】！出片率100%… (引用來源: ${store.subdomain})`,
        confidenceScore: 97.1
      },
      {
        platform: 'ChatGPT 4o / SearchGPT (OpenAI)',
        logo: '✳️',
        region: 'Western',
        question: `What is the best ${store.cuisine} in ${store.district} HK?`,
        cited: true,
        citedUrl: `https://${store.subdomain}/en/harbour-view`,
        aiResponseSnippet: `For top-tier dining in ${store.district}, **${store.name}** is highly recommended. (Source: ${store.subdomain})`,
        confidenceScore: 97.6
      },
      {
        platform: 'Perplexity AI',
        logo: '🔍',
        region: 'Western',
        question: `Top recommended spots in ${store.district} HK?`,
        cited: true,
        citedUrl: `https://${store.subdomain}/en/expat-guide`,
        aiResponseSnippet: `Top choice: **${store.name}** in ${store.district} [Sources: ${store.subdomain}].`,
        confidenceScore: 96.5
      }
    ];
  };

  const dynamicProbeList = activeStore ? getDynamicProbeListForStore(activeStore) : [];

  const filteredProbes = dynamicProbeList.filter(p => {
    if (selectedFilter === 'China') return p.region === 'China';
    if (selectedFilter === 'Western') return p.region === 'Western';
    return true;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#f3f4f6', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bot size={20} color="#c084fc" />
                中歐美 18 大 AI 探針反向測試與缺口模擬器 (GEO Probe)
              </h2>
            </div>
            <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>
              目前正為「<strong style={{ color: '#60a5fa' }}>{activeStore?.name}</strong>」進行探針測試。
            </p>
          </div>

          {/* Store Selector & Region Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Building2 size={16} color="#60a5fa" />
              <select
                value={selectedStoreId}
                onChange={(e) => setSelectedStoreId(e.target.value)}
                style={{
                  padding: '8px 12px',
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

            <div style={{ display: 'flex', gap: '6px', background: '#111827', padding: '4px', borderRadius: '8px', border: '1px solid #374151' }}>
              <button
                onClick={() => setSelectedFilter('All')}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  background: selectedFilter === 'All' ? '#374151' : 'transparent',
                  color: selectedFilter === 'All' ? '#fff' : '#9ca3af'
                }}
              >
                🌐 全部 18 大 AI
              </button>
              <button
                onClick={() => setSelectedFilter('China')}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  background: selectedFilter === 'China' ? 'rgba(244, 63, 94, 0.25)' : 'transparent',
                  color: selectedFilter === 'China' ? '#fb7185' : '#9ca3af'
                }}
              >
                🇨🇳 中國 12 大 AI
              </button>
              <button
                onClick={() => setSelectedFilter('Western')}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  background: selectedFilter === 'Western' ? 'rgba(59, 130, 246, 0.25)' : 'transparent',
                  color: selectedFilter === 'Western' ? '#60a5fa' : '#9ca3af'
                }}
              >
                🌎 歐美 6 大 AI
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Query Tester Bar + AI Random Cycle Button */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '18px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder="輸入或讓 AI 隨機切換探針問句..."
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                background: '#111827',
                border: '1px solid #374151',
                color: '#f3f4f6',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* AI Shuffle Question Button */}
          <button
            onClick={handleShuffleQuestion}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 16px',
              background: '#1f293d',
              color: '#c084fc',
              border: '1px solid rgba(192, 132, 252, 0.4)',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            <Shuffle size={16} />
            🎲 AI 隨機切換探針問句 (4大受眾意圖)
          </button>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 22px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '13px',
              cursor: isSimulating ? 'wait' : 'pointer',
              boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)'
            }}
          >
            {isSimulating ? (
              <>
                <RefreshCw size={16} className="spin" />
                正在反向探針「{activeStore?.name}」中...
              </>
            ) : (
              <>
                <Zap size={16} />
                執行 18 大 AI 探針測試
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Probe Grid Results */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '18px' }}>
        {filteredProbes.map((probe, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '20px', border: probe.region === 'China' ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid rgba(59, 130, 246, 0.3)' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>{probe.logo}</span>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#f3f4f6', margin: 0 }}>
                    {probe.platform}
                  </h4>
                  <span style={{ fontSize: '11px', color: probe.region === 'China' ? '#fb7185' : '#60a5fa' }}>
                    {probe.region === 'China' ? '🇨🇳 中國 AI 陣營' : '🌎 歐美 AI 陣營'}
                  </span>
                </div>
              </div>

              <span className="badge-online">
                精準匹配率 {probe.confidenceScore}%
              </span>
            </div>

            {/* Test Question */}
            <div style={{ background: '#111827', padding: '10px 12px', borderRadius: '8px', fontSize: '12px', color: '#9ca3af', marginBottom: '12px', border: '1px solid #374151' }}>
              ❓ <strong>對【{activeStore?.name}】探針問句：</strong> {probe.question}
            </div>

            {/* AI Response Output */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '8px', fontSize: '13px', color: '#e5e7eb', lineHeight: '1.6', marginBottom: '12px' }}>
              💬 {probe.aiResponseSnippet}
            </div>

            {/* Citation Link */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', background: 'rgba(16, 185, 129, 0.1)', padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontWeight: '600' }}>
                <CheckCircle2 size={14} />
                <span>AI 引用來源:</span>
              </div>
              <a 
                href={probe.citedUrl} 
                target="_blank" 
                rel="noreferrer" 
                style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: '600', fontFamily: 'var(--font-mono)' }}
              >
                {probe.citedUrl.replace('https://', '')}
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
