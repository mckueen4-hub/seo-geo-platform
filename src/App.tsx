import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DailyReportTab } from './components/DailyReportTab';
import { StoreManagementTab } from './components/StoreManagementTab';
import { SubsitePreviewTab } from './components/SubsitePreviewTab';
import { AiProbeSimulatorTab } from './components/AiProbeSimulatorTab';
import { NewStoreModal } from './components/NewStoreModal';
import { PromptCustomizerModal } from './components/PromptCustomizerModal';
import { AltTagEditorModal } from './components/AltTagEditorModal';
import { INITIAL_STORES, INITIAL_TONE_RULES } from './mockData';
import type { StoreItem, MarketAudience, TonePromptRule } from './types';

export function App() {
  const [stores, setStores] = useState<StoreItem[]>(INITIAL_STORES);
  const [toneRules, setToneRules] = useState<TonePromptRule[]>(INITIAL_TONE_RULES);
  
  const [activeTab, setActiveTab] = useState<'report' | 'stores' | 'subsite' | 'probe'>('report');
  const [selectedAudience, setSelectedAudience] = useState<MarketAudience>('hk');
  const [selectedStoreId, setSelectedStoreId] = useState<string>(INITIAL_STORES[0]?.id || '');

  // Modals state
  const [isNewStoreModalOpen, setIsNewStoreModalOpen] = useState<boolean>(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);
  const [editingAltStore, setEditingAltStore] = useState<StoreItem | null>(null);

  // 🌟 從實體後端資料庫載入最新持久化商戶清單 (避免重新整理網頁時復原)
  useEffect(() => {
    fetch('http://localhost:3001/api/stores')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.stores) && data.stores.length > 0) {
          setStores(data.stores);
          setSelectedStoreId(data.stores[0].id);
        }
      })
      .catch(err => {
        console.warn('[App Persistence] 使用預設商戶清單:', err);
      });
  }, []);

  const handleAddStore = async (newStore: StoreItem) => {
    setStores(prev => [newStore, ...prev]);
    setSelectedStoreId(newStore.id);
    setActiveTab('subsite');

    // 實體同步寫入後端資料庫
    try {
      await fetch('http://localhost:3001/api/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStore)
      });
    } catch (err) {
      console.warn('Backend POST Store Error:', err);
    }
  };

  const handleDeleteStore = async (storeId: string) => {
    // 1. 即時更新前端狀態
    const updated = stores.filter(s => s.id !== storeId);
    setStores(updated);
    if (selectedStoreId === storeId && updated.length > 0) {
      setSelectedStoreId(updated[0].id);
    }

    // 2. 實體發送 DELETE 請求至 Node.js 後端伺服器 (寫入 stores_db.json)
    try {
      await fetch(`http://localhost:3001/api/stores/${storeId}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Backend DELETE API Error:', err);
    }
  };

  const handleSelectStoreForPreview = (storeId: string) => {
    setSelectedStoreId(storeId);
    setActiveTab('subsite');
  };

  const handleUpdateImageAlt = (imageId: string, newAlt: string) => {
    setStores(prev => prev.map(s => {
      if (editingAltStore && s.id === editingAltStore.id) {
        const updatedImgs = s.scrapedImages.map(img => {
          if (img.id === imageId) {
            return { ...img, aiAltTag: newAlt };
          }
          return img;
        });
        return { ...s, scrapedImages: updatedImgs };
      }
      return s;
    }));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedAudience={selectedAudience}
        setSelectedAudience={setSelectedAudience}
        onOpenNewStoreModal={() => setIsNewStoreModalOpen(true)}
        onOpenPromptModal={() => setIsPromptModalOpen(true)}
        storeCount={stores.length}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '0 28px 40px', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
        
        {activeTab === 'report' && (
          <DailyReportTab
            stores={stores}
            onSelectStoreForPreview={handleSelectStoreForPreview}
          />
        )}

        {activeTab === 'stores' && (
          <StoreManagementTab
            stores={stores}
            onOpenNewStoreModal={() => setIsNewStoreModalOpen(true)}
            onSelectStoreForPreview={handleSelectStoreForPreview}
            onOpenAltEditor={(store) => setEditingAltStore(store)}
            onDeleteStore={handleDeleteStore}
          />
        )}

        {activeTab === 'subsite' && (
          <SubsitePreviewTab
            stores={stores}
            selectedAudience={selectedAudience}
            setSelectedAudience={setSelectedAudience}
            selectedStoreId={selectedStoreId}
            onSelectStoreId={setSelectedStoreId}
          />
        )}

        {activeTab === 'probe' && (
          <AiProbeSimulatorTab stores={stores} />
        )}

      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', padding: '20px 28px', textAlign: 'center', fontSize: '12px', color: '#6b7280' }}>
        <p>
          GeoRank AI 智搜霸主 • 6-12個月目標衝頂自動化系統 © 2026 全權所有
        </p>
      </footer>

      {/* New Store Creation Modal */}
      <NewStoreModal
        isOpen={isNewStoreModalOpen}
        onClose={() => setIsNewStoreModalOpen(false)}
        onAddStore={handleAddStore}
      />

      {/* AI Prompt Customizer Modal */}
      <PromptCustomizerModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        rules={toneRules}
        onSaveRules={(updated) => setToneRules(updated)}
      />

      {/* Image Alt Tag Editor Modal */}
      {editingAltStore && (
        <AltTagEditorModal
          isOpen={!!editingAltStore}
          onClose={() => setEditingAltStore(null)}
          store={editingAltStore}
          onUpdateImageAlt={handleUpdateImageAlt}
        />
      )}

    </div>
  );
}

export default App;
