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

const BACKEND_URL = 'http://localhost:3001';

export function App() {
  const [activeTab, setActiveTab] = useState<'report' | 'stores' | 'subsite' | 'probe'>('report');
  const [selectedAudience, setSelectedAudience] = useState<MarketAudience>('hk');
  
  const [stores, setStores] = useState<StoreItem[]>(INITIAL_STORES);
  const [selectedStoreId, setSelectedStoreId] = useState<string>(INITIAL_STORES[0]?.id || 'store-1');
  const [selectedAltStore, setSelectedAltStore] = useState<StoreItem>(INITIAL_STORES[0]);
  
  const [toneRules, setToneRules] = useState<TonePromptRule[]>(INITIAL_TONE_RULES);

  const [isNewStoreModalOpen, setIsNewStoreModalOpen] = useState<boolean>(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);
  const [isAltTagModalOpen, setIsAltTagModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const hostname = window.location.hostname;
    if (hostname.includes('.studioconcierge.xyz') && !hostname.startsWith('www.')) {
      const subPrefix = hostname.split('.')[0];
      const matchedStore = stores.find(s => s.subdomain.startsWith(subPrefix));
      if (matchedStore) {
        setSelectedStoreId(matchedStore.id);
        setActiveTab('subsite');
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
