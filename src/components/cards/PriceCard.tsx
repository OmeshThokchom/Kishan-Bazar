import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MandiPrice } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface PriceCardProps {
  price: MandiPrice;
  onClick?: () => void;
}

const PriceCard = ({ price, onClick }: PriceCardProps) => {
  const { t, language } = useLanguage();

  const TrendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus,
  }[price.trend];

  const trendColors = {
    up: 'text-primary bg-gradient-to-r from-primary/20 to-emerald-500/10',
    down: 'text-destructive bg-gradient-to-r from-destructive/20 to-red-500/10',
    stable: 'text-muted-foreground bg-muted',
  };

  const trendLabels = {
    up: t('rising'),
    down: t('falling'),
    stable: t('stable'),
  };

  return (
    <button
      onClick={onClick}
      className="w-full bg-card rounded-2xl lg:rounded-3xl border border-border/50 p-4 lg:p-5 text-left shadow-sm hover:shadow-lg transition-all duration-300 active:scale-[0.98] group"
    >
      <div className="flex items-start justify-between mb-4">
        {/* Product Info */}
        <div className="space-y-1">
          <h3 className="font-bold text-lg lg:text-xl text-foreground group-hover:text-primary transition-colors duration-200">
            {price.productName}
          </h3>
          <p className="text-sm text-muted-foreground">
            {price.mandiName}, {price.location}
          </p>
        </div>

        {/* Trend Badge */}
        <div className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-sm',
          trendColors[price.trend]
        )}>
          <TrendIcon className="w-4 h-4" />
          <span className="text-sm font-semibold">
            {price.changePercent > 0 ? '+' : ''}{price.changePercent}%
          </span>
        </div>
      </div>

      {/* Price Range */}
      <div className="grid grid-cols-3 gap-2 lg:gap-3">
        <div className="text-center p-3 rounded-xl bg-muted/30 border border-border/30">
          <p className="text-[10px] lg:text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {t('minimum')}
          </p>
          <p className="text-sm lg:text-base font-bold text-foreground">₹{price.minPrice}</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-gradient-to-br from-primary/10 to-emerald-500/10 border border-primary/20">
          <p className="text-[10px] lg:text-xs text-primary uppercase tracking-wide mb-1">
            {t('modal')}
          </p>
          <p className="text-lg lg:text-xl font-bold text-primary">₹{price.modalPrice}</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-muted/30 border border-border/30">
          <p className="text-[10px] lg:text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {t('maximum')}
          </p>
          <p className="text-sm lg:text-base font-bold text-foreground">₹{price.maxPrice}</p>
        </div>
      </div>

      {/* Unit */}
      <p className="text-xs text-muted-foreground text-center mt-3">
        {t('per')} {price.unit}
      </p>
    </button>
  );
};

export default PriceCard;
