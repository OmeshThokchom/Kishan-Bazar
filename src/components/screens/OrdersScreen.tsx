import { Package, Clock, CheckCircle, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OrderCard from '@/components/cards/OrderCard';
import { mockOrders } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const OrdersScreen = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'active' | 'completed'>('all');

  const filters = [
    { id: 'all', label: t('all'), icon: Package, count: mockOrders.length },
    { id: 'pending', label: t('pending'), icon: Clock, count: mockOrders.filter(o => o.status === 'pending' || o.status === 'confirmed').length },
    { id: 'active', label: t('active'), icon: Truck, count: mockOrders.filter(o => o.status === 'packed' || o.status === 'shipped').length },
    { id: 'completed', label: t('completed'), icon: CheckCircle, count: mockOrders.filter(o => o.status === 'delivered').length },
  ];

  const filteredOrders = mockOrders.filter(order => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pending') return order.status === 'pending' || order.status === 'confirmed';
    if (activeFilter === 'active') return order.status === 'packed' || order.status === 'shipped';
    if (activeFilter === 'completed') return order.status === 'delivered';
    return true;
  });

  // Calculate stats
  const stats = {
    totalRevenue: mockOrders
      .filter(o => o.paymentStatus === 'completed')
      .reduce((sum, o) => sum + o.totalPrice, 0),
    pendingPayments: mockOrders
      .filter(o => o.paymentStatus === 'pending')
      .reduce((sum, o) => sum + o.totalPrice, 0),
  };

  return (
    <div className="pb-24 space-y-4">
      {/* Stats Header */}
      <section className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-primary/10 rounded-2xl p-4">
            <p className="text-sm text-muted-foreground">{t('totalEarnings')}</p>
            <p className="text-2xl font-bold text-primary">
              ₹{stats.totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="bg-secondary/20 rounded-2xl p-4">
            <p className="text-sm text-muted-foreground">{t('pendingPayments')}</p>
            <p className="text-2xl font-bold text-secondary-foreground">
              ₹{stats.pendingPayments.toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? 'secondary' : 'outline'}
                size="sm"
                className={cn(
                  'flex-shrink-0 gap-2',
                  activeFilter === filter.id && 'bg-primary/10 border-primary/20'
                )}
                onClick={() => setActiveFilter(filter.id as any)}
              >
                <Icon className="w-4 h-4" />
                <span>{filter.label}</span>
                <span className={cn(
                  'w-5 h-5 rounded-full text-xs flex items-center justify-center',
                  activeFilter === filter.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}>
                  {filter.count}
                </span>
              </Button>
            );
          })}
        </div>
      </section>

      {/* Orders List */}
      <section className="px-4 space-y-3">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <div
              key={order.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <OrderCard order={order} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="text-6xl mb-4">📦</span>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {t('noOrders')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('noOrdersInCategory')}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default OrdersScreen;
