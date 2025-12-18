import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroBannerProps {
    userName?: string;
    onSellClick?: () => void;
    onBrowseClick?: () => void;
}

const HeroBanner = ({ userName, onSellClick, onBrowseClick }: HeroBannerProps) => {
    const { t, language } = useLanguage();

    const greeting = language === 'hi'
        ? `स्वागत है, ${userName || 'किसान'}! 🌾`
        : `Welcome back, ${userName || 'Farmer'}! 🌾`;

    return (
        <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-emerald-600 p-6 lg:p-8 text-white">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            {/* Content */}
            <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Sparkles className="w-4 h-4 lg:w-5 lg:h-5" />
                            </div>
                            <span className="text-xs lg:text-sm font-medium text-white/80 uppercase tracking-wide">
                                {t('appNameEn')}
                            </span>
                        </div>

                        <h1 className="text-2xl lg:text-4xl font-bold mb-2 lg:mb-3">
                            {greeting}
                        </h1>
                        <p className="text-sm lg:text-lg text-white/80 mb-4 lg:mb-0">
                            {t('heroSubtitle')}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            size="lg"
                            onClick={onSellClick}
                            className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg shadow-black/10 group"
                        >
                            <span className="text-xl mr-2">📦</span>
                            {t('sell')}
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={onBrowseClick}
                            className="border-white/30 text-white hover:bg-white/10 font-semibold"
                        >
                            <span className="text-xl mr-2">🛒</span>
                            {t('buy')}
                        </Button>
                    </div>
                </div>

                {/* Quick stats bar */}
                <div className="mt-6 pt-4 border-t border-white/20 grid grid-cols-3 gap-4">
                    <div className="text-center lg:text-left">
                        <p className="text-2xl lg:text-3xl font-bold">₹45K+</p>
                        <p className="text-xs lg:text-sm text-white/70">
                            {t('thisMonth')}
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center lg:justify-start gap-1">
                            <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-green-300" />
                            <p className="text-2xl lg:text-3xl font-bold">+23%</p>
                        </div>
                        <p className="text-xs lg:text-sm text-white/70">
                            {t('growth')}
                        </p>
                    </div>
                    <div className="text-center lg:text-right">
                        <p className="text-2xl lg:text-3xl font-bold">156</p>
                        <p className="text-xs lg:text-sm text-white/70">
                            {t('orders')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
