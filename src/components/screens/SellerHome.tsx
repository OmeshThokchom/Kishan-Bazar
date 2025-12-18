import { useState } from 'react';
import { ShoppingBag, Truck, IndianRupee, TrendingUp, ChevronRight, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CategoryCard from '@/components/cards/CategoryCard';
import ProductCard from '@/components/cards/ProductCard';
import PriceCard from '@/components/cards/PriceCard';
import AdvisoryCard from '@/components/cards/AdvisoryCard';
import HeroBanner from '@/components/cards/HeroBanner';
import WeatherWidget from '@/components/cards/WeatherWidget';
import VoiceButton from '@/components/voice/VoiceButton';
import { categories, mockProducts, mockMandiPrices, mockAdvisories, mockUser } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

interface SellerHomeProps {
  onNavigate: (tab: string) => void;
}

const SellerHome = ({ onNavigate }: SellerHomeProps) => {
  const { t, language } = useLanguage();
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  const stats = [
    { icon: ShoppingBag, labelKey: 'totalProducts', value: '12', color: 'text-primary', bg: 'bg-primary/10' },
    { icon: Truck, labelKey: 'activeOrders', value: '5', color: 'text-buyer', bg: 'bg-buyer/10' },
    { icon: IndianRupee, labelKey: 'thisMonth', value: '₹45K', color: 'text-primary', bg: 'bg-primary/10' },
    { icon: TrendingUp, labelKey: 'rating', value: '4.8', color: 'text-secondary', bg: 'bg-secondary/20' },
  ];

  return (
    <div className="pb-24 lg:pb-8 space-y-6 lg:space-y-8">
      {/* Hero Banner - Desktop Only */}
      <section className="hidden lg:block pt-2">
        <HeroBanner
          userName={mockUser.name}
          onSellClick={() => onNavigate('sell')}
          onBrowseClick={() => onNavigate('browse')}
        />
      </section>

      {/* Mobile Quick Actions - Large Touch Targets */}
      <section className="lg:hidden px-4">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="sell"
            size="touch-lg"
            className="flex-col gap-2 h-auto py-5"
            onClick={() => onNavigate('sell')}
          >
            <span className="text-4xl">📦</span>
            <span className="text-lg font-bold">{t('sell')}</span>
            <span className="text-xs opacity-80">{t('sellProduct')}</span>
          </Button>

          <Button
            variant="buy"
            size="touch-lg"
            className="flex-col gap-2 h-auto py-5"
            onClick={() => onNavigate('browse')}
          >
            <span className="text-4xl">🛒</span>
            <span className="text-lg font-bold">{t('buy')}</span>
            <span className="text-xs opacity-80">{t('buyProducts')}</span>
          </Button>
        </div>
      </section>

      {/* Weather Widget - Important for farmers */}
      <section className="px-4 lg:px-0">
        <WeatherWidget />
      </section>

      {/* Voice Assistant Prompt - Mobile only */}
      <section className="lg:hidden px-4">
        <div className="bg-gradient-to-r from-accent/20 to-accent/5 rounded-2xl p-4 flex items-center gap-4">
          <VoiceButton size="default" />
          <div className="flex-1">
            <p className="font-semibold text-foreground">{t('voiceHelp')}</p>
            <p className="text-sm text-muted-foreground">
              {t('voiceExample')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Grid - Show differently on desktop */}
      <section className="px-4 lg:px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-xl lg:rounded-2xl p-4 lg:p-5 text-center lg:text-left border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3">
                  <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl ${stat.bg} flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}>
                    <Icon className={`w-6 h-6 lg:w-7 lg:h-7 ${stat.color}`} />
                  </div>
                  <div className="lg:flex-1">
                    <p className="text-xl lg:text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs lg:text-sm text-muted-foreground">{t(stat.labelKey)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Categories Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-4 lg:px-0">
          <h2 className="text-lg lg:text-xl font-bold text-foreground">{t('categories')}</h2>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            {t('viewAll')}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Mobile: Horizontal scroll, Desktop: Grid */}
        <div className="lg:hidden flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => onNavigate('browse')}
            />
          ))}
        </div>

        <div className="hidden lg:grid lg:grid-cols-8 gap-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => onNavigate('browse')}
            />
          ))}
        </div>
      </section>

      {/* AI Advisory */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-4 lg:px-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ai/20 to-purple-500/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-ai" />
            </div>
            <h2 className="text-lg lg:text-xl font-bold text-foreground">{t('aiAdvice')}</h2>
          </div>
          <Button variant="ghost" size="sm" className="text-ai hover:text-ai/80">
            {t('viewAll')}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="px-4 lg:px-0 grid lg:grid-cols-2 gap-4">
          {mockAdvisories.slice(0, 2).map((advisory) => (
            <AdvisoryCard key={advisory.id} advisory={advisory} />
          ))}
        </div>
      </section>

      {/* Live Mandi Prices */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-4 lg:px-0">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-primary animate-pulse" />
            <h2 className="text-lg lg:text-xl font-bold text-foreground">{t('liveMandiPrices')}</h2>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80" onClick={() => onNavigate('prices')}>
            {t('viewAll')}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Mobile: Horizontal scroll, Desktop: Grid */}
        <div className="lg:hidden flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide">
          {mockMandiPrices.slice(0, 3).map((price) => (
            <div key={price.id} className="min-w-[300px]">
              <PriceCard price={price} />
            </div>
          ))}
        </div>

        <div className="hidden lg:grid lg:grid-cols-3 gap-4">
          {mockMandiPrices.slice(0, 3).map((price) => (
            <PriceCard key={price.id} price={price} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-4 lg:px-0">
          <h2 className="text-lg lg:text-xl font-bold text-foreground">{t('inYourArea')}</h2>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80" onClick={() => onNavigate('browse')}>
            {t('viewAll')}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 px-4 lg:px-0">
          {mockProducts.slice(0, 4).map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default SellerHome;
