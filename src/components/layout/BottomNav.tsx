import { Home, ShoppingCart, PlusCircle, BarChart3, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userType: 'farmer' | 'buyer';
}

const BottomNav = ({ activeTab, onTabChange, userType }: BottomNavProps) => {
  const { t } = useLanguage();

  const farmerTabs = [
    { id: 'home', icon: Home, labelKey: 'home' },
    { id: 'orders', icon: ShoppingCart, labelKey: 'orders' },
    { id: 'sell', icon: PlusCircle, labelKey: 'sell', primary: true },
    { id: 'prices', icon: BarChart3, labelKey: 'prices' },
    { id: 'profile', icon: User, labelKey: 'profile' },
  ];

  const buyerTabs = [
    { id: 'home', icon: Home, labelKey: 'home' },
    { id: 'browse', icon: ShoppingCart, labelKey: 'buy' },
    { id: 'search', icon: PlusCircle, labelKey: 'search', primary: true },
    { id: 'orders', icon: BarChart3, labelKey: 'orders' },
    { id: 'profile', icon: User, labelKey: 'profile' },
  ];

  const tabs = userType === 'farmer' ? farmerTabs : buyerTabs;

  return (
    <nav className="bottom-nav safe-area-bottom lg:hidden">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        const isPrimary = tab.primary;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200',
              'touch-target',
              isPrimary && 'relative -mt-6',
              isActive && !isPrimary && 'text-primary',
              !isActive && !isPrimary && 'text-muted-foreground'
            )}
          >
            {isPrimary ? (
              <div className={cn(
                'flex items-center justify-center w-14 h-14 rounded-full shadow-medium',
                userType === 'farmer' ? 'bg-gradient-primary' : 'bg-gradient-buyer'
              )}>
                <Icon className="w-7 h-7 text-primary-foreground" />
              </div>
            ) : (
              <Icon className={cn(
                'w-6 h-6 transition-transform duration-200',
                isActive && 'scale-110'
              )} />
            )}
            <span className={cn(
              'text-xs font-medium',
              isPrimary && 'mt-1',
              isActive && !isPrimary && 'font-semibold'
            )}>
              {t(tab.labelKey)}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
