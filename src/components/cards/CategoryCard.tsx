import { cn } from '@/lib/utils';
import { CategoryInfo } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryCardProps {
  category: CategoryInfo;
  onClick?: () => void;
  size?: 'default' | 'large';
}

const CategoryCard = ({ category, onClick, size = 'default' }: CategoryCardProps) => {
  const { t } = useLanguage();

  const sizeClasses = {
    default: 'w-20 h-24',
    large: 'w-28 h-32',
  };

  const iconSizes = {
    default: 'text-4xl',
    large: 'text-5xl',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'category-card flex flex-col items-center justify-center gap-2 rounded-2xl',
        'bg-card border border-border shadow-soft',
        'hover:shadow-medium active:scale-95',
        sizeClasses[size],
        'lg:w-24 lg:h-28'
      )}
    >
      {/* Icon Container with Gradient Background */}
      <div className={cn(
        'flex items-center justify-center rounded-xl',
        size === 'default' ? 'w-12 h-12 lg:w-14 lg:h-14' : 'w-16 h-16 lg:w-18 lg:h-18',
        `bg-gradient-to-br ${category.gradient} bg-opacity-10`
      )}>
        <span className={cn(iconSizes[size], 'lg:text-5xl')}>{category.icon}</span>
      </div>

      {/* Label */}
      <div className="text-center">
        <p className="text-xs lg:text-sm font-semibold text-foreground leading-tight">
          {t(category.id)}
        </p>
        <p className="text-[10px] lg:text-xs text-muted-foreground">
          {category.name}
        </p>
      </div>
    </button>
  );
};

export default CategoryCard;
