import React, { useState } from 'react';
import type { TonePromptRule, MarketAudience } from '../types';
import { X, Sliders, CheckCircle2, Save, Sparkles, MessageSquare, AlertCircle, ShieldCheck } from 'lucide-react';

interface PromptCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  rules: TonePromptRule[];
  onSaveRules: (updatedRules: TonePromptRule[]) => void;
}

export const PromptCustomizerModal: React.FC<PromptCustomizerModalProps> = ({
  isOpen,
  onClose,
  rules,
  onSaveRules
}) => {
  const [currentRules, setCurrentRules] = useState<TonePromptRule[]>(rules);
  const [selectedAudience, setSelectedAudience] = useState<MarketAudience>('hk');
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const activeRule = currentRules.find(r => r.audience === selectedAudience) || currentRules[0];

  const handleRuleChange = (field: keyof TonePromptRule, value: string) => {
    setCurrentRules(prev => prev.map(r => {
      if (r.audience === selectedAudience) {
        return { ...r, [field]: value };
      }
      return r;
    }));
  };

  const handleSave = () => {
    onSaveRules(currentRules);
    setSaveNotice('已成功儲存 AI 受眾語調 Prompt 與防幻覺安全護欄！');
    setTimeout(() => {
      setSaveNotice(null);
      onClose();
    }, 1500);
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
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '720px', padding: '28px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
        
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
          <Sliders size={22} color="#8b5cf6" />
          AI 提示詞 (Prompt) 與菜單事實防幻覺護欄設定
        </h2>
        <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '20px' }}>
          管理員可設定 AI 生成限制，<strong>嚴格限定 AI 只能根據 OpenRice 及商家真實菜單撰寫</strong>，禁止虛構不存在的食物或設施！
        </p>

        {saveNotice && (
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
            {saveNotice}
          </div>
        )}

        {/* Global Strict Anti-Hallucination Guardrail Banner */}
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <ShieldCheck size={20} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#34d399' }}>
              🛡️ 全局菜單事實防幻覺安全護欄 (Strict Anti-Hallucination Guardrail) 已啟用
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px', lineHeight: '1.5' }}>
              系統已注入指令約束：AI 生成文章時，<strong>強制僅能引用店家已驗證的菜單項目 (`store.menuItems`) 與 OpenRice 實拍標籤</strong>。嚴禁憑空捏造該餐廳未提供的餐點或服務！
            </div>
          </div>
        </div>

        {/* Audience Selector Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', background: '#111827', padding: '6px', borderRadius: '10px', border: '1px solid #374151' }}>
          {(['hk', 'cn', 'tw', 'en'] as MarketAudience[]).map(aud => (
            <button
              key={aud}
              onClick={() => setSelectedAudience(aud)}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '700',
                background: selectedAudience === aud ? 'rgba(139, 92, 246, 0.3)' : 'transparent',
                color: selectedAudience === aud ? '#c084fc' : '#9ca3af',
                outline: selectedAudience === aud ? '1px solid #8b5cf6' : 'none'
              }}
            >
              {aud === 'hk' && '🇭🇰 港人本地'}
              {aud === 'cn' && '🇨🇳 內地種草'}
              {aud === 'tw' && '🇹🇼 台灣內行'}
              {aud === 'en' && '🌎 歐美 Expat'}
            </button>
          ))}
        </div>

        {/* Prompt Configuration Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <MessageSquare size={16} color="#60a5fa" />
              受眾語調名稱與視覺標籤
            </label>
            <input
              type="text"
              value={activeRule.name}
              onChange={(e) => handleRuleChange('name', e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#111827', border: '1px solid #374151', color: '#f3f4f6', fontSize: '13px', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Sparkles size={16} color="#fbbf24" />
              寫作風格與文化背景描述 (AI Style System Prompt)
            </label>
            <textarea
              rows={3}
              value={activeRule.styleDescription}
              onChange={(e) => handleRuleChange('styleDescription', e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#111827', border: '1px solid #374151', color: '#f3f4f6', fontSize: '13px', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              ✓ 強制包含關鍵字與用語規則 (Mandatory Phrases)
            </label>
            <input
              type="text"
              value={activeRule.keywordsRule}
              onChange={(e) => handleRuleChange('keywordsRule', e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#111827', border: '1px solid #374151', color: '#34d399', fontSize: '13px', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#fb7185', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <AlertCircle size={16} color="#fb7185" />
              🚫 避坑禁用詞清單 (Prohibited Terms)
            </label>
            <input
              type="text"
              value={activeRule.prohibitedWords}
              onChange={(e) => handleRuleChange('prohibitedWords', e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#111827', border: '1px solid #374151', color: '#fb7185', fontSize: '13px', outline: 'none' }}
            />
          </div>

        </div>

        {/* Action Bar */}
        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 18px',
              background: '#1f293d',
              color: '#d1d5db',
              border: '1px solid #374151',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            取消
          </button>

          <button
            onClick={handleSave}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 22px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)'
            }}
          >
            <Save size={16} />
            儲存語調 Prompt 規則
          </button>
        </div>

      </div>
    </div>
  );
};
