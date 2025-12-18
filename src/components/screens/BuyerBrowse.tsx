import { useState } from 'react';
import { Search, Filter, MapPin, Sparkles, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CategoryCard from '@/components/cards/CategoryCard';
import ProductCard from '@/components/cards/ProductCard';
import VoiceButton from '@/components/voice/VoiceButton';
import { categories, mockProducts } from '@/data/mockData';
import { ProductCategory } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

const BuyerBrowse = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameHindi?.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-24 lg:pb-8 space-y-6">
      {/* Search Bar with Voice */}
      <section className="px-4 lg:px-0 pt-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder={language === 'en' ? 'Search... (tomatoes, onions, wheat)' : 'खोजें... (टमाटर, प्याज, गेहूं)'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 rounded-2xl bg-card border-border/50 text-base focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <VoiceButton size="default" className="flex-shrink-0 h-14 w-14" />
        </div>
      </section>

      {/* Location & Filter */}
      <section className="px-4 lg:px-0">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 justify-between h-12 lg:h-14 rounded-xl lg:rounded-2xl">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>50 {t('withinKm')}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button variant="outline" className="h-12 lg:h-14 rounded-xl lg:rounded-2xl px-4">
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-4 lg:px-0">
          <h2 className="font-bold text-lg lg:text-xl text-foreground">{t('selectCategories')}</h2>
          {selectedCategory && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="text-primary hover:text-primary/80"
            >
              {t('viewAll')}
            </Button>
          )}
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="lg:hidden flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`transition-all duration-200 ${selectedCategory === category.id
                  ? 'ring-2 ring-primary ring-offset-2 rounded-2xl scale-[1.02]'
                  : ''
                }`}
            >
              <CategoryCard
                category={category}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
              />
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden lg:grid lg:grid-cols-8 gap-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`transition-all duration-200 ${selectedCategory === category.id
                  ? 'ring-2 ring-primary ring-offset-2 rounded-2xl scale-[1.02]'
                  : ''
                }`}
            >
              <CategoryCard
                category={category}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
              />
            </div>
          ))}
        </div>
      </section>

      {/* AI Recommendation Banner */}
      <section className="px-4 lg:px-0">
        <div className="bg-gradient-to-r from-ai/10 via-purple-500/5 to-ai/10 rounded-2xl lg:rounded-3xl p-4 lg:p-6 border border-ai/20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-ai/30 to-purple-500/30 flex items-center justify-center shadow-lg shadow-ai/20">
              <Sparkles className="w-7 h-7 lg:w-8 lg:h-8 text-ai" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-base lg:text-lg text-foreground">{t('aiSuggestion')}</p>
              <p className="text-sm lg:text-base text-muted-foreground mt-0.5">
                {language === 'en'
                  ? 'Tomato prices are rising in your area'
                  : 'आपके क्षेत्र में टमाटर की कीमत बढ़ रही है'}
              </p>
            </div>
            <ChevronRight className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Results Count */}
      <div className="px-4 lg:px-0">
        <p className="text-sm lg:text-base text-muted-foreground">
          {filteredProducts.length} {t('productsFound')}
        </p>
      </div>

      {/* Product Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 px-4 lg:px-0">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </section>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
            <span className="text-5xl">🔍</span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            {t('noProductsFound')}
          </h3>
          <p className="text-sm lg:text-base text-muted-foreground mb-6 max-w-md">
            {t('tryDifferentSearch')}
          </p>
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl"
            onClick={() => {
              setSelectedCategory(null);
              setSearchQuery('');
            }}
          >
            {t('clearFilters')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default BuyerBrowse;
