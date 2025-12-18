import { Bell, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeaderProps {
  userName?: string;
  onMenuClick?: () => void;
  onNotificationClick?: () => void;
}

const Header = ({ userName, onMenuClick, onNotificationClick }: HeaderProps) => {
  const { t, language } = useLanguage();

  return (
    <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-xl border-b border-border/50 safe-area-top lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo & Menu */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="touch-target">
            <Menu className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-xl">🌾</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base leading-tight bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                {t('appName')}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {t('forFarmers')}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <LanguageSelector />
          <Button
            variant="ghost"
            size="icon"
            onClick={onNotificationClick}
            className="touch-target relative"
          >
            <Bell className="w-5 h-5" />
            {/* Notification badge */}
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-accent rounded-full border-2 border-card animate-pulse" />
          </Button>
        </div>
      </div>

      {/* Greeting - Mobile Only */}
      {userName && (
        <div className="px-4 pb-3">
          <p className="text-muted-foreground text-sm">{t('namaste')}</p>
          <p className="font-semibold text-lg">{userName}</p>
        </div>
      )}
    </header>
  );
};

export default Header;
