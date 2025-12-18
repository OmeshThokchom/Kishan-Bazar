import { useState } from 'react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import DesktopSidebar from '@/components/layout/DesktopSidebar';
import SellerHome from '@/components/screens/SellerHome';
import BuyerBrowse from '@/components/screens/BuyerBrowse';
import SellProduct from '@/components/screens/SellProduct';
import PriceDiscovery from '@/components/screens/PriceDiscovery';
import OrdersScreen from '@/components/screens/OrdersScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';
import AIChat from '@/components/screens/AIChat';
import VoiceButton from '@/components/voice/VoiceButton';
import { mockUser } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('home');
  const [userType, setUserType] = useState<'farmer' | 'buyer'>('farmer');
  const [showAIChat, setShowAIChat] = useState(false);

  const handleNavigate = (tab: string) => {
    if (tab === 'ai-chat') {
      setShowAIChat(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handleSwitchRole = () => {
    setUserType(prev => prev === 'farmer' ? 'buyer' : 'farmer');
    setActiveTab('home');
  };

  const renderScreen = () => {
    if (showAIChat) {
      return <AIChat onBack={() => setShowAIChat(false)} />;
    }

    switch (activeTab) {
      case 'home':
        return <SellerHome onNavigate={handleNavigate} />;
      case 'browse':
        return <BuyerBrowse />;
      case 'sell':
        return <SellProduct onBack={() => setActiveTab('home')} />;
      case 'prices':
        return <PriceDiscovery />;
      case 'orders':
        return <OrdersScreen />;
      case 'profile':
        return <ProfileScreen onSwitchRole={handleSwitchRole} />;
      default:
        return <SellerHome onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Hide on desktop (sidebar has branding), hide on sell and AI chat */}
      {activeTab !== 'sell' && !showAIChat && (
        <Header
          userName={mockUser.name}
          onNotificationClick={() => { }}
        />
      )}

      {/* Desktop Sidebar - Show on desktop only */}
      {!showAIChat && activeTab !== 'sell' && (
        <DesktopSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userType={userType}
        />
      )}

      {/* Main Content */}
      <main className={`relative transition-all duration-300 ${!showAIChat && activeTab !== 'sell' ? 'lg:ml-72' : ''}`}>
        <div className="lg:max-w-6xl lg:mx-auto lg:px-6 lg:py-6">
          {renderScreen()}
        </div>
      </main>

      {/* Floating AI FAB - Show on main screens */}
      {!showAIChat && activeTab !== 'sell' && (
        <button
          className="voice-fab animate-float"
          onClick={() => setShowAIChat(true)}
          aria-label={t('aiAssistant')}
        >
          <Sparkles className="w-8 h-8 text-white" />
        </button>
      )}

      {/* Bottom Navigation - Hide on AI chat and sell */}
      {!showAIChat && activeTab !== 'sell' && (
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userType={userType}
        />
      )}
    </div>
  );
};

export default Index;
