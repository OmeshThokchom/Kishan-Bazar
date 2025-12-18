import { Sun, Cloud, CloudRain, Wind, Droplets } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeatherWidgetProps {
    compact?: boolean;
}

const WeatherWidget = ({ compact = false }: WeatherWidgetProps) => {
    const { t, language } = useLanguage();

    // Mock weather data - in production, this would come from an API
    const weather = {
        temp: 28,
        condition: 'sunny' as const,
        humidity: 65,
        windSpeed: 12,
        location: language === 'en' ? 'Nashik, Maharashtra' : 'नासिक, महाराष्ट्र',
        forecast: language === 'en' ? 'Good day for harvesting' : 'कटाई के लिए अच्छा दिन',
    };

    const WeatherIcon = {
        sunny: Sun,
        cloudy: Cloud,
        rainy: CloudRain,
    }[weather.condition] || Sun;

    if (compact) {
        return (
            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-xl">
                <WeatherIcon className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium">{weather.temp}°C</span>
                <span className="text-xs text-muted-foreground">{weather.location}</span>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-cyan-500/10 rounded-2xl lg:rounded-3xl p-4 lg:p-6 border border-sky-200/30 dark:border-sky-800/30 backdrop-blur-sm">
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                            <WeatherIcon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <div>
                            <p className="text-3xl lg:text-4xl font-bold text-foreground">{weather.temp}°C</p>
                            <p className="text-xs lg:text-sm text-muted-foreground">{weather.location}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 lg:gap-4">
                    <div className="text-center">
                        <Droplets className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500 mx-auto mb-1" />
                        <p className="text-xs lg:text-sm font-medium">{weather.humidity}%</p>
                        <p className="text-[10px] lg:text-xs text-muted-foreground">
                            {t('humidity')}
                        </p>
                    </div>
                    <div className="text-center">
                        <Wind className="w-4 h-4 lg:w-5 lg:h-5 text-teal-500 mx-auto mb-1" />
                        <p className="text-xs lg:text-sm font-medium">{weather.windSpeed} km/h</p>
                        <p className="text-[10px] lg:text-xs text-muted-foreground">
                            {t('wind')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-3 lg:mt-4 p-3 bg-white/50 dark:bg-black/20 rounded-xl">
                <p className="text-sm lg:text-base font-medium text-foreground">
                    🌾 {weather.forecast}
                </p>
            </div>
        </div>
    );
};

export default WeatherWidget;
