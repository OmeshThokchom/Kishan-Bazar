import { useState } from 'react';
import { Camera, Image, Mic, Sparkles, X, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CategoryCard from '@/components/cards/CategoryCard';
import VoiceButton from '@/components/voice/VoiceButton';
import { categories } from '@/data/mockData';
import { ProductCategory } from '@/types';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface SellProductProps {
  onBack?: () => void;
}

const SellProduct = ({ onBack }: SellProductProps) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<'photo' | 'category' | 'details' | 'price' | 'confirm'>('photo');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState<'kg' | 'quintal' | 'ton'>('kg');
  const [aiAnalysis, setAiAnalysis] = useState<{
    quality: string;
    qualityScore: number;
    suggestedPrice: number;
    productName: string;
  } | null>(null);

  const handleImageUpload = () => {
    // Simulate image upload
    setSelectedImage('/placeholder.svg');

    // Simulate AI analysis
    setTimeout(() => {
      setAiAnalysis({
        quality: 'premium',
        qualityScore: 92,
        suggestedPrice: 48,
        productName: 'टमाटर (Tomato)',
      });
      setStep('category');
    }, 1500);
  };

  const units = [
    { value: 'kg', label: t('kg'), labelEn: 'KG' },
    { value: 'quintal', label: t('quintal'), labelEn: 'Quintal' },
    { value: 'ton', label: t('ton'), labelEn: 'Ton' },
  ];

  return (
    <div className="min-h-screen pb-24 relative">
      {/* Header with Close Button */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <h1 className="text-xl font-bold text-primary">{t('sellProduct')}</h1>
        <Button variant="ghost" size="icon" onClick={onBack} aria-label="Close">
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Progress Steps */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          {['photo', 'category', 'details', 'price', 'confirm'].map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                step === s ? 'bg-primary text-primary-foreground' :
                  ['photo', 'category', 'details', 'price', 'confirm'].indexOf(step) > i
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground'
              )}>
                {i + 1}
              </div>
              {i < 4 && (
                <div className={cn(
                  'w-8 h-0.5 mx-1',
                  ['photo', 'category', 'details', 'price', 'confirm'].indexOf(step) > i
                    ? 'bg-primary'
                    : 'bg-muted'
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto w-full">
        {/* Step 1: Photo */}
        {step === 'photo' && (
          <div className="px-4 space-y-8">
            <div className="text-center space-y-2 lg:mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('takePhoto')}</h2>
              <p className="text-muted-foreground lg:text-lg">
                {t('takePhotoDesc')}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left Column: Actions */}
              <div className="space-y-6 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="sell"
                    size="touch"
                    className="flex-col gap-3 h-auto py-8 lg:py-12"
                    onClick={handleImageUpload}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-lg">{t('camera')}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="touch"
                    className="flex-col gap-3 h-auto py-8 lg:py-12 border-2"
                    onClick={handleImageUpload}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                      <Image className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-lg">{t('gallery')}</span>
                  </Button>
                </div>

                {/* Voice Option Section */}
                <div className="bg-gradient-to-br from-card to-muted/30 rounded-3xl p-6 border border-border/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-px bg-border flex-1" />
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t('orSpeakToUs')}</span>
                    <div className="h-px bg-border flex-1" />
                  </div>

                  <div className="text-center space-y-4">
                    <VoiceButton size="large" className="mx-auto" />
                    <p className="text-sm text-muted-foreground px-4 italic">
                      {t('voiceExample')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Preview/Placeholder */}
              <div className="lg:order-2">
                <div className="aspect-square bg-muted rounded-[2rem] flex flex-col items-center justify-center gap-4 border-2 border-dashed border-border/50 overflow-hidden shadow-2xl relative group">
                  {selectedImage ? (
                    <div className="relative w-full h-full">
                      <img
                        src={selectedImage}
                        alt="Uploaded"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-md">
                        <div className="text-center space-y-4">
                          <div className="relative w-16 h-16 mx-auto">
                            <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-bold text-lg text-primary">{t('aiAnalysis')}</p>
                            <p className="text-xs text-muted-foreground animate-pulse">Checking quality & freshnes...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-4 p-8">
                      <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Camera className="w-12 h-12 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-xl text-foreground">{t('noImageYet') || 'No image uploaded'}</p>
                        <p className="text-muted-foreground text-sm max-w-[200px] mx-auto">
                          {t('takePhotoDesc')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Category Selection */}
        {step === 'category' && (
          <div className="px-4 space-y-6">
            {/* AI Detection Result */}
            {aiAnalysis && (
              <div className="bg-gradient-to-r from-ai/10 to-ai/5 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-ai" />
                  <span className="font-semibold text-foreground">{t('aiDetection')}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden">
                    <img
                      src={selectedImage!}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg">{aiAnalysis.productName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">{t('quality')}:</span>
                      <span className="text-sm font-semibold text-primary">
                        {aiAnalysis.quality === 'premium' ? t('premium') : t('good')}
                      </span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {aiAnalysis.qualityScore}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">{t('selectCategory')}</h2>
              <p className="text-muted-foreground">
                {t('selectCategoryDesc')}
              </p>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-4 gap-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={cn(
                    'transition-all duration-200 rounded-2xl',
                    selectedCategory === category.id
                      ? 'ring-2 ring-primary ring-offset-2'
                      : ''
                  )}
                >
                  <CategoryCard
                    category={category}
                    onClick={() => setSelectedCategory(category.id)}
                  />
                </div>
              ))}
            </div>

            <Button
              variant="sell"
              size="lg"
              className="w-full"
              disabled={!selectedCategory}
              onClick={() => setStep('details')}
            >
              {t('proceed')}
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Step 3: Details */}
        {step === 'details' && (
          <div className="px-4 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">{t('enterQuantity')}</h2>
              <p className="text-muted-foreground">
                {t('howMuchToSell')}
              </p>
            </div>

            {/* Quantity Input */}
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="number"
                  placeholder={t('enterQuantityPlaceholder')}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="h-16 text-2xl text-center font-bold"
                />
              </div>

              {/* Unit Selection */}
              <div className="grid grid-cols-3 gap-2">
                {units.map((u) => (
                  <Button
                    key={u.value}
                    variant={unit === u.value ? 'sell' : 'outline'}
                    size="touch"
                    className="flex-col gap-1"
                    onClick={() => setUnit(u.value as any)}
                  >
                    <span className="font-bold">{u.label}</span>
                    <span className="text-xs opacity-70">{u.labelEn}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Voice Input */}
            <div className="flex items-center justify-center gap-4">
              <VoiceButton size="default" />
              <p className="text-sm text-muted-foreground">
                {t('sayQuantity')}
              </p>
            </div>

            <Button
              variant="sell"
              size="lg"
              className="w-full"
              disabled={!quantity}
              onClick={() => setStep('price')}
            >
              {t('proceed')}
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Step 4: Price */}
        {step === 'price' && (
          <div className="px-4 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">{t('setPrice')}</h2>
              <p className="text-muted-foreground">
                {t('pricePerUnit')} {unit === 'kg' ? t('kg') : unit === 'quintal' ? t('quintal') : t('ton')}
              </p>
            </div>

            {/* AI Suggested Price */}
            {aiAnalysis && (
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">{t('aiSuggestion')}</span>
                </div>
                <p className="text-4xl font-bold text-primary">
                  ₹{aiAnalysis.suggestedPrice}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('basedOnMarket')}
                </p>
              </div>
            )}

            {/* Price Input */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">₹</span>
              <Input
                type="number"
                placeholder={t('enterPrice')}
                defaultValue={aiAnalysis?.suggestedPrice}
                className="h-16 text-2xl text-center font-bold pl-12"
              />
            </div>

            {/* Quick Price Buttons */}
            <div className="flex gap-2 justify-center">
              {[aiAnalysis?.suggestedPrice! - 5, aiAnalysis?.suggestedPrice, aiAnalysis?.suggestedPrice! + 5].filter(Boolean).map((price) => (
                <Button
                  key={price}
                  variant="outline"
                  size="sm"
                >
                  ₹{price}
                </Button>
              ))}
            </div>

            <Button
              variant="sell"
              size="lg"
              className="w-full"
              onClick={() => setStep('confirm')}
            >
              {t('confirm')}
              <Check className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {step === 'confirm' && (
          <div className="px-4 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">{t('successfullyPosted')}</h2>
              <p className="text-muted-foreground">
                {t('productVisible')}
              </p>
            </div>

            {/* Summary Card */}
            <div className="bg-card rounded-2xl border border-border p-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden">
                  <img
                    src={selectedImage!}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-lg">{aiAnalysis?.productName}</p>
                  <p className="text-sm text-muted-foreground">
                    {quantity} {t(unit)}
                  </p>
                  <p className="text-xl font-bold text-primary">
                    ₹{aiAnalysis?.suggestedPrice}/{t(unit)}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setStep('photo');
                  setSelectedImage(null);
                  setSelectedCategory(null);
                  setQuantity('');
                  setAiAnalysis(null);
                }}
              >
                {t('addNew')}
              </Button>
              <Button
                variant="sell"
                size="lg"
                onClick={onBack}
              >
                {t('goHome')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellProduct;
