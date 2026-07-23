import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DailyReportTab } from './components/DailyReportTab';
import { StoreManagementTab } from './components/StoreManagementTab';
import { SubsitePreviewTab } from './components/SubsitePreviewTab';
import { AiProbeSimulatorTab } from './components/AiProbeSimulatorTab';
import { StandalonePublicSubsiteView } from './components/StandalonePublicSubsiteView';
import { NewStoreModal } from './components/NewStoreModal';
import { PromptCustomizerModal } from './components/PromptCustomizerModal';
import { AltTagEditorModal } from './components/AltTagEditorModal';
import { INITIAL_STORES, INITIAL_TONE_RULES } from './mockData';
import type { StoreItem, MarketAudience, TonePromptRule } from './types';

const BACKEND_URL = 'http://localhost:3001';

export function App() {
  const [isPublicSubsiteMode, setIsPublicSubsiteMode] = useState<boolean>(false);
  const [matchedPublicStore, setMatchedPublicStore] = useState<StoreItem | null>(null);

  const [activeTab, setActiveTab] = useState<'report' | 'stores' | 'subsite' | 'probe'>('report');
  const [selectedAudience, setSelectedAudience] = useState<MarketAudience>('hk');
  
  const [stores, setStores] = useState<StoreItem[]>(INITIAL_STORES);
  const [selectedStoreId, setSelectedStoreId] = useState<string>(INITIAL_STORES[0]?.id || 'store-1');
  const [selectedAltStore, setSelectedAltStore] = useState<StoreItem>(INITIAL_STORES[0]);
  
  const [toneRules, setToneRules] = useState<TonePromptRule[]>(INITIAL_TONE_RULES);

  const [isNewStoreModalOpen, setIsNewStoreModalOpen] = useState<boolean>(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);
  const [isAltTagModalOpen, setIsAltTagModalOpen] = useState<boolean>(false);

  // 🔒 權限與身份隔離：當食客/外人訪問 *.studioconcierge.xyz 子網域時，只顯示純淨餐廳專頁，完全隱藏管理後台！
  useEffect(() => {
    const hostname = window.location.hostname;
    // 如果不是主後台域名 (www.studioconcierge.xyz 或 localhost)，而且包含子網域名稱
    if (hostname.includes('.studioconcierge.xyz') && !hostname.startsWith('www.')) {
      const subPrefix = hostname.split('.')[0].toLowerCase();
      const targetStore = stores.find(s => s.subdomain.toLowerCase().startsWith(subPrefix));
      
      if (targetStore) {
        setIsPublicSubsiteMode(true);
        setMatchedPublicStore(targetStore);
      }
    }
  }, [stores]);

  useEffect(() => {
    const fetchStoresFromBackend = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/stores`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && Array.isArray(data.stores) && data.stores.length > 0) {
            setStores(data.stores);
            if (!selectedStoreId) {
              setSelectedStoreId(data.stores[0].id);
            }
          }
        }
      } catch (err) {
        console.log('[App Sync] 後端未啟動，使用本地備用數據:', err);
      }
    };
    fetchStoresFromBackend();
  }, []);

  const handleAddStore = async (newStore: StoreItem) => {
    setStores(prev => [newStore, ...prev]);
    setSelectedStoreId(newStore.id);

    try {
      await fetch(`${BACKEND_URL}/api/stores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStore)
      });
    } catch (err) {
      console.warn('[DB Save Warning] 儲存至持久 DB 失敗:', err);
    }
  };

  const handleDeleteStore = async (storeId: string) => {
    setStores(prev => {
      const updated = prev.filter(s => s.id !== storeId);
      if (selectedStoreId === storeId && updated.length > 0) {
        setSelectedStoreId(updated[0].id);
      }
      return updated;
    });

    try {
      await fetch(`${BACKEND_URL}/api/stores/${storeId}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.warn('[DB Delete Warning] 從持久 DB 刪除失敗:', err);
    }
  };

  const handleUpdateToneRules = (updatedRules: TonePromptRule[]) => {
    setToneRules(updatedRules);
  };

  const handleUpdateAltTag = (imageId: string, newAltTag: string, newUrl?: string) => {
    setStores(prev => prev.map(s => {
      if (s.id === selectedAltStore.id || s.id === selectedStoreId) {
        return {
          ...s,
          scrapedImages: s.scrapedImages.map(img => img.id === imageId ? { 
            ...img, 
            aiAltTag: newAltTag,
            url: newUrl || img.url
          } : img)
        };
      }
      return s;
    }));
  };

  // 🔒 如果是食客/外人通過子域名進來，渲染 100% 獨立乾淨的食客餐廳專頁（無任何內部後台數據）
  if (isPublicSubsiteMode && matchedPublicStore) {
    return <StandalonePublicSubsiteView store={matchedPublicStore} />;
  }

  // 🛡️ 只有管理員開啟主後台 (www.studioconcierge.xyz 或 localhost) 才能看到總盤數據！
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: '#f3f4f6' }}>
      
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedAudience={selectedAudience}
        setSelectedAudience={setSelectedAudience}
        onOpenNewStoreModal={() => setIsNewStoreModalOpen(true)}
        onOpenPromptModal={() => setIsPromptModalOpen(true)}
        storeCount={stores.length}
      />

      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px' }}>
        {activeTab === 'report' && (
          <DailyReportTab
            stores={stores}
            onSelectStoreForPreview={(id) => { setSelectedStoreId(id); setActiveTab('subsite'); }}
          />
        )}

        {activeTab === 'stores' && (
          <StoreManagementTab
            stores={stores}
            onDeleteStore={handleDeleteStore}
            onOpenNewStoreModal={() => setIsNewStoreModalOpen(true)}
            onSelectStoreForPreview={(id) => { setSelectedStoreId(id); setActiveTab('subsite'); }}
            onOpenAltEditor={(store) => { setSelectedAltStore(store); setIsAltTagModalOpen(true); }}
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
          <AiProbeSimulatorTab
            stores={stores}
          />
        )}
      </main>

      <NewStoreModal
        isOpen={isNewStoreModalOpen}
        onClose={() => setIsNewStoreModalOpen(false)}
        onAddStore={handleAddStore}
      />

      <PromptCustomizerModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        rules={toneRules}
        onSaveRules={handleUpdateToneRules}
      />

      <AltTagEditorModal
        isOpen={isAltTagModalOpen}
        onClose={() => setIsAltTagModalOpen(false)}
        store={selectedAltStore || stores[0]}
        onUpdateImageAlt={handleUpdateAltTag}
      />

    </div>
  );
}

export default App;
