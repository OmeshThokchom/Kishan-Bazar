import { AlertTriangle, CloudRain, Bug, Leaf, Scissors } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CropAdvisory } from '@/types';
import { Badge } from '@/components/ui/badge';

interface AdvisoryCardProps {
  advisory: CropAdvisory;
  onClick?: () => void;
}

const AdvisoryCard = ({ advisory, onClick }: AdvisoryCardProps) => {
  const categoryConfig = {
    pest: { icon: Bug, color: 'text-destructive', bg: 'bg-destructive/10' },
    disease: { icon: AlertTriangle, color: 'text-accent', bg: 'bg-accent/10' },
    weather: { icon: CloudRain, color: 'text-buyer', bg: 'bg-buyer/10' },
    fertilizer: { icon: Leaf, color: 'text-primary', bg: 'bg-primary/10' },
    harvest: { icon: Scissors, color: 'text-secondary', bg: 'bg-secondary/20' },
  };

  const severityConfig = {
    low: { label: 'कम', color: 'bg-muted text-muted-foreground' },
    medium: { label: 'मध्यम', color: 'bg-secondary/20 text-secondary-foreground' },
    high: { label: 'उच्च', color: 'bg-destructive/10 text-destructive' },
  };

  const config = categoryConfig[advisory.category];
  const CategoryIcon = config.icon;
  const severity = severityConfig[advisory.severity];

  return (
    <button
      onClick={onClick}
      className="w-full bg-card rounded-2xl border border-border p-4 text-left shadow-soft hover:shadow-medium transition-all duration-200 active:scale-[0.98]"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
          config.bg
        )}>
          <CategoryIcon className={cn('w-6 h-6', config.color)} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground leading-tight">
              {advisory.titleHindi}
            </h3>
            <Badge className={cn('flex-shrink-0', severity.color)}>
              {severity.label}
            </Badge>
          </div>
          
          <p className="text-xs text-muted-foreground mt-0.5">
            {advisory.title}
          </p>
          
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {advisory.description}
          </p>

          <div className="flex items-center gap-2 mt-3">
            <Badge variant="outline" className="text-xs">
              🌱 {advisory.crop}
            </Badge>
          </div>
        </div>
      </div>
    </button>
  );
};

export default AdvisoryCard;
