import { Home, ShoppingCart, PlusCircle, BarChart3, User, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface DesktopSidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    userType: 'farmer' | 'buyer';
}

const DesktopSidebar = ({ activeTab, onTabChange, userType }: DesktopSidebarProps) => {
    const { t, language } = useLanguage();

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
        <aside className="hidden lg:flex lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-72 lg:flex-col lg:bg-gradient-to-b lg:from-card lg:via-card lg:to-card/95 lg:border-r lg:border-border/50 lg:backdrop-blur-xl lg:shadow-xl lg:z-40">
            {/* Logo Section */}
            <div className="p-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20">
                        <span className="text-2xl">🌾</span>
                    </div>
                    <div>
                        <h1 className="font-bold text-lg bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                            {t('appName')}
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            {t('forFarmers')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t('navigation')}
                </p>

                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    const isPrimary = tab.primary;

                    if (isPrimary) {
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={cn(
                                    'w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-300',
                                    'bg-gradient-to-r shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]',
                                    userType === 'farmer'
                                        ? 'from-primary to-emerald-600 text-white shadow-primary/30 hover:shadow-primary/40'
                                        : 'from-blue-500 to-cyan-500 text-white shadow-blue-500/30 hover:shadow-blue-500/40'
                                )}
                            >
                                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className="font-semibold text-base">{t(tab.labelKey)}</span>
                            </button>
                        );
                    }

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={cn(
                                'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                                isActive
                                    ? 'bg-primary/10 text-primary shadow-sm'
                                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                            )}
                        >
                            <div className={cn(
                                'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200',
                                isActive
                                    ? 'bg-primary/20'
                                    : 'bg-muted/50 group-hover:bg-muted'
                            )}>
                                <Icon className={cn(
                                    'w-5 h-5 transition-transform duration-200',
                                    isActive && 'scale-110'
                                )} />
                            </div>
                            <span className={cn(
                                'font-medium text-base transition-all duration-200',
                                isActive && 'font-semibold'
                            )}>
                                {t(tab.labelKey)}
                            </span>
                            {isActive && (
                                <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Footer Section */}
            <div className="p-4 border-t border-border/50 space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all duration-200">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ai/20 to-purple-500/20 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-ai" />
                    </div>
                    <span className="font-medium text-base">{t('aiAssistant')}</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all duration-200">
                    <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
                        <HelpCircle className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-base">{t('helpSupport')}</span>
                </button>
            </div>

            {/* Pro Banner */}
            <div className="p-4">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/20 via-accent/10 to-secondary/20 p-4 border border-secondary/20">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative">
                        <p className="font-semibold text-sm text-foreground mb-1">
                            {t('growSales')}
                        </p>
                        <p className="text-xs text-muted-foreground mb-3">
                            {language === 'en' ? 'List more products to reach more buyers' : 'अधिक खरीदारों तक पहुंचें'}
                        </p>
                        <button className="text-xs font-semibold text-primary hover:underline">
                            {t('learnMore')} →
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default DesktopSidebar;
