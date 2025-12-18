import { MapPin, Star, Sparkles, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const { t, language } = useLanguage();

  const qualityColors = {
    premium: 'bg-gradient-to-r from-primary to-emerald-600 text-white border-0',
    good: 'bg-gradient-to-r from-secondary to-amber-500 text-white border-0',
    standard: 'bg-muted text-muted-foreground border-border',
  };


  return (
    <button
      onClick={onClick}
      className="product-card w-full text-left group"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quality Badge */}
        <Badge
          className={cn(
            'absolute top-2 left-2 shadow-lg',
            qualityColors[product.quality]
          )}
        >
          {t(product.quality)}
        </Badge>

        {/* AI Score */}
        {product.aiQualityScore && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 shadow-lg">
            <Sparkles className="w-3 h-3 text-ai" />
            <span className="text-xs font-bold text-ai">{product.aiQualityScore}%</span>
          </div>
        )}

        {/* Quick Action - Shows on hover */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="w-10 h-10 rounded-full bg-primary shadow-lg flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 lg:p-4 space-y-2">
        {/* Name */}
        <div>
          <h3 className="font-semibold text-foreground leading-tight line-clamp-1 group-hover:text-primary transition-colors duration-200">
            {language === 'hi' ? (product.nameHindi || product.name) : product.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {language === 'hi' ? product.name : (product.nameHindi || '')}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-xl lg:text-2xl font-bold text-primary">₹{product.price}</span>
          <span className="text-sm text-muted-foreground">/{product.unit}</span>
        </div>

        {/* Quantity Available */}
        <p className="text-xs text-muted-foreground">
          {product.quantity} {product.unit} {t('available')}
        </p>

        {/* Seller Info */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center">
              <span className="text-xs">👨‍🌾</span>
            </div>
            <span className="text-xs text-muted-foreground truncate max-w-[80px]">
              {product.sellerName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Rating */}
            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-secondary text-secondary" />
              <span className="text-xs font-medium">{product.rating}</span>
            </div>

            {/* Distance */}
            {product.distance && (
              <div className="flex items-center gap-0.5 text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span className="text-xs">{product.distance} km</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
