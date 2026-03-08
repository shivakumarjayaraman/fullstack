import { createContext, useContext, useState } from 'react';

/**
 * Session 21: Compound Components pattern.
 * Tabs, TabsList, and TabsPanel share internal context — no prop-drilling.
 *
 * Usage:
 *   <Tabs defaultTab="profile">
 *     <TabsList>
 *       <TabsList.Tab id="profile">Profile</TabsList.Tab>
 *       <TabsList.Tab id="settings">Settings</TabsList.Tab>
 *     </TabsList>
 *     <TabsPanel id="profile"><ProfileForm /></TabsPanel>
 *     <TabsPanel id="settings"><SettingsForm /></TabsPanel>
 *   </Tabs>
 */
const TabsContext = createContext();

function Tabs({ defaultTab, children }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ children }) {
  return <div role="tablist" style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid #ccc' }}>{children}</div>;
}

function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === id;
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(id)}
      style={{
        padding: '0.5rem 1rem',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        borderBottom: isActive ? '2px solid #007bff' : '2px solid transparent',
        fontWeight: isActive ? 'bold' : 'normal',
      }}
    >
      {children}
    </button>
  );
}

function TabsPanel({ id, children }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== id) return null;
  return <div role="tabpanel" style={{ padding: '1rem 0' }}>{children}</div>;
}

TabsList.Tab = Tab;

export { Tabs, TabsList, TabsPanel };
