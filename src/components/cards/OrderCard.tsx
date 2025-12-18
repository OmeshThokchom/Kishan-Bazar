import { Package, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Order } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface OrderCardProps {
  order: Order;
  onViewDetails?: () => void;
  onContact?: () => void;
}

const OrderCard = ({ order, onViewDetails, onContact }: OrderCardProps) => {
  const { t, language } = useLanguage();

  const statusConfig = {
    pending: {
      icon: Clock,
      labelKey: 'pending',
      color: 'bg-secondary/20 text-secondary-foreground border-secondary/30'
    },
    confirmed: {
      icon: CheckCircle,
      labelKey: 'confirmed',
      color: 'bg-primary/10 text-primary border-primary/20'
    },
    packed: {
      icon: Package,
      labelKey: 'packed',
      color: 'bg-buyer/10 text-buyer border-buyer/20'
    },
    shipped: {
      icon: Truck,
      labelKey: 'shipped',
      color: 'bg-ai/10 text-ai border-ai/20'
    },
    delivered: {
      icon: CheckCircle,
      labelKey: 'delivered',
      color: 'bg-primary/10 text-primary border-primary/20'
    },
    cancelled: {
      icon: XCircle,
      labelKey: 'cancelled',
      color: 'bg-destructive/10 text-destructive border-destructive/20'
    },
  };

  const paymentStatusConfig = {
    pending: { labelKey: 'paymentPending', color: 'text-secondary' },
    completed: { labelKey: 'paymentComplete', color: 'text-primary' },
    failed: { labelKey: 'paymentFailed', color: 'text-destructive' },
    refunded: { labelKey: 'refunded', color: 'text-muted-foreground' },
  };

  const status = statusConfig[order.status];
  const StatusIcon = status.icon;
  const paymentStatus = paymentStatusConfig[order.paymentStatus];

  return (
    <div className="bg-card rounded-2xl border border-border p-4 shadow-soft space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Product Image */}
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted">
            <img
              src={order.product.images[0]}
              alt={order.product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <h3 className="font-semibold text-foreground">
              {language === 'hi' ? (order.product.nameHindi || order.product.name) : order.product.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {order.quantity} {order.product.unit}
            </p>
            <p className="text-xs text-muted-foreground">
              {t('buyer')}: {order.buyerName}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <Badge className={cn('border', status.color)}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {t(status.labelKey)}
        </Badge>
      </div>

      {/* Price & Payment */}
      <div className="flex items-center justify-between py-3 border-y border-border">
        <div>
          <p className="text-xs text-muted-foreground">{t('totalAmount')}</p>
          <p className="text-xl font-bold text-primary">₹{order.totalPrice.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className={cn('text-sm font-medium', paymentStatus.color)}>
            {t(paymentStatus.labelKey)}
          </p>
          <p className="text-xs text-muted-foreground uppercase">
            {order.paymentMethod}
          </p>
        </div>
      </div>

      {/* Delivery Date */}
      {order.deliveryDate && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Truck className="w-4 h-4" />
          <span>
            {t('delivery')}: {order.deliveryDate.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
              day: 'numeric',
              month: 'short'
            })}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={onViewDetails}
        >
          {t('viewDetails')}
        </Button>
        <Button
          variant="accent"
          size="sm"
          className="flex-1"
          onClick={onContact}
        >
          {t('contact')}
        </Button>
      </div>
    </div>
  );
};

export default OrderCard;
