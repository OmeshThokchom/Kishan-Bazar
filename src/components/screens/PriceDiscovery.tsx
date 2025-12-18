import { TrendingUp, TrendingDown, Minus, Search, MapPin, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PriceCard from '@/components/cards/PriceCard';
import VoiceButton from '@/components/voice/VoiceButton';
import { mockMandiPrices } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const PriceDiscovery = () => {
  const { t, language } = useLanguage();

  const priceStats = {
    totalCommodities: mockMandiPrices.length,
    trending: mockMandiPrices.filter(p => p.trend === 'up').length,
    declining: mockMandiPrices.filter(p => p.trend === 'down').length,
  };

  return (
    <div className="pb-24 lg:pb-8 space-y-6">
      {/* Header Stats */}
      <section className="px-4 lg:px-0 pt-4">
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-emerald-500/10 rounded-2xl lg:rounded-3xl p-5 lg:p-8 border border-primary/10">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h2 className="font-bold text-xl lg:text-2xl text-foreground">{t('todayMandiPrices')}</h2>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              <RefreshCw className="w-4 h-4 mr-2" />
              {t('update')}
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 lg:gap-6">
            <div className="text-center p-4 lg:p-6 rounded-xl lg:rounded-2xl bg-white/50 dark:bg-black/20">
              <p className="text-3xl lg:text-4xl font-bold text-foreground">{priceStats.totalCommodities}</p>
              <p className="text-xs lg:text-sm text-muted-foreground mt-1">{t('totalCommodities')}</p>
            </div>
            <div className="text-center p-4 lg:p-6 rounded-xl lg:rounded-2xl bg-primary/10">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                <p className="text-3xl lg:text-4xl font-bold text-primary">{priceStats.trending}</p>
              </div>
              <p className="text-xs lg:text-sm text-muted-foreground mt-1">{t('rising')}</p>
            </div>
            <div className="text-center p-4 lg:p-6 rounded-xl lg:rounded-2xl bg-destructive/10">
              <div className="flex items-center justify-center gap-2">
                <TrendingDown className="w-5 h-5 lg:w-6 lg:h-6 text-destructive" />
                <p className="text-3xl lg:text-4xl font-bold text-destructive">{priceStats.declining}</p>
              </div>
              <p className="text-xs lg:text-sm text-muted-foreground mt-1">{t('falling')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="px-4 lg:px-0">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder={t('searchCrop')}
              className="pl-12 h-14 rounded-2xl bg-card border-border/50 text-base"
            />
          </div>
          <VoiceButton size="default" className="flex-shrink-0 h-14 w-14" />
        </div>
      </section>

      {/* Location Filter */}
      <section className="px-4 lg:px-0">
        <Button variant="outline" className="w-full lg:w-auto justify-start gap-3 h-14 rounded-2xl px-6">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-base">{t('allMandis')}</span>
        </Button>
      </section>

      {/* Quick Filters */}
      <section className="px-4 lg:px-0">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          <Button variant="secondary" size="lg" className="flex-shrink-0 rounded-xl font-medium">
            {t('all')}
          </Button>
          <Button variant="outline" size="lg" className="flex-shrink-0 rounded-xl font-medium">
            <TrendingUp className="w-4 h-4 mr-2 text-primary" />
            {t('rising')}
          </Button>
          <Button variant="outline" size="lg" className="flex-shrink-0 rounded-xl font-medium">
            <TrendingDown className="w-4 h-4 mr-2 text-destructive" />
            {t('falling')}
          </Button>
          <Button variant="outline" size="lg" className="flex-shrink-0 rounded-xl font-medium">
            <Minus className="w-4 h-4 mr-2" />
            {t('stable')}
          </Button>
        </div>
      </section>

      {/* AI Price Prediction */}
      <section className="px-4 lg:px-0">
        <div className="bg-gradient-to-r from-ai/10 via-purple-500/5 to-ai/10 rounded-2xl lg:rounded-3xl p-5 lg:p-6 border border-ai/20">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-ai/30 to-purple-500/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-ai/20">
              <Sparkles className="w-7 h-7 lg:w-8 lg:h-8 text-ai" />
            </div>
            <div>
              <p className="font-bold text-base lg:text-lg text-foreground">{t('aiPrediction')}</p>
              <p className="text-sm lg:text-base text-muted-foreground mt-1">
                {language === 'en'
                  ? 'Tomato prices are expected to rise 10-15% next week. Good time to sell.'
                  : 'अगले सप्ताह टमाटर के भाव 10-15% बढ़ने की संभावना है। बेचने का अच्छा समय।'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Price List */}
      <section className="px-4 lg:px-0 space-y-4">
        <h3 className="font-bold text-lg lg:text-xl text-foreground">{t('allPrices')}</h3>

        <div className="grid lg:grid-cols-2 gap-4">
          {mockMandiPrices.map((price, index) => (
            <div
              key={price.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <PriceCard price={price} />
            </div>
          ))}
        </div>
      </section>

      {/* Historical Chart Placeholder */}
      <section className="px-4 lg:px-0">
        <div className="bg-card rounded-2xl lg:rounded-3xl border border-border/50 p-5 lg:p-6 space-y-4">
          <h3 className="font-bold text-lg lg:text-xl text-foreground">{t('weekTrend')}</h3>
          <div className="h-48 lg:h-64 bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl flex items-center justify-center border border-border/30">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm lg:text-base text-muted-foreground">{t('chartHere')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PriceDiscovery;
