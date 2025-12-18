import { Star, MapPin, Phone, Shield, Settings, HelpCircle, LogOut, ChevronRight, Edit2, CreditCard, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockUser } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProfileScreenProps {
  onSwitchRole?: () => void;
}

const ProfileScreen = ({ onSwitchRole }: ProfileScreenProps) => {
  const { t, language } = useLanguage();

  const menuItems = [
    { icon: Edit2, labelKey: 'editProfile' },
    { icon: MapPin, labelKey: 'manageAddress' },
    { icon: Phone, labelKey: 'contactInfo' },
    { icon: Shield, labelKey: 'kycVerification', badge: mockUser.verified ? t('verified') : t('pending') },
    { icon: CreditCard, labelKey: 'paymentPending' },
    { icon: Bell, labelKey: 'notifications' },
    { icon: Settings, labelKey: 'settings' },
    { icon: HelpCircle, labelKey: 'helpSupport' },
  ];

  return (
    <div className="pb-24 lg:pb-8 space-y-6">
      {/* Profile Header */}
      <section className="px-4 lg:px-0 py-4 lg:py-6">
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-emerald-500/10 rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-primary/10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="text-5xl lg:text-6xl">👨‍🌾</span>
              </div>
              {mockUser.verified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{mockUser.name}</h2>
              <p className="text-sm lg:text-base text-muted-foreground mb-2">{mockUser.phone}</p>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {mockUser.location}, {mockUser.state}
                </span>
              </div>

              {/* Verified Badge */}
              {mockUser.verified && (
                <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 bg-primary/10 rounded-full">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-primary">{t('verified')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-primary/10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-5 h-5 fill-secondary text-secondary" />
                <span className="text-2xl lg:text-3xl font-bold">{mockUser.rating}</span>
              </div>
              <p className="text-xs lg:text-sm text-muted-foreground">{t('rating')}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl lg:text-3xl font-bold">156</p>
              <p className="text-xs lg:text-sm text-muted-foreground">{t('orders')}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl lg:text-3xl font-bold">2 {language === 'en' ? 'yrs' : 'वर्ष'}</p>
              <p className="text-xs lg:text-sm text-muted-foreground">{t('member')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Switcher */}
      <section className="px-4 lg:px-0">
        <Button
          variant="outline"
          className="w-full justify-between h-16 lg:h-18 rounded-2xl border-2 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
          onClick={onSwitchRole}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-amber-500/20 flex items-center justify-center">
              <span className="text-2xl">
                {mockUser.type === 'farmer' ? '🧺' : '🛒'}
              </span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-base">
                {mockUser.type === 'farmer' ? t('sellerMode') : t('buyerMode')}
              </p>
              <p className="text-xs text-muted-foreground">
                {mockUser.type === 'farmer' ? t('switchToBuyer') : t('switchToSeller')}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </Button>
      </section>

      {/* Menu Items */}
      <section className="px-4 lg:px-0">
        <div className="bg-card rounded-2xl lg:rounded-3xl border border-border/50 overflow-hidden divide-y divide-border/50">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-between h-16 px-4 lg:px-6 rounded-none hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-muted-foreground" />
                  </div>
                  <span className="font-medium text-base lg:text-lg">{t(item.labelKey)}</span>
                </div>
                <div className="flex items-center gap-3">
                  {item.badge && (
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${item.badge === t('verified')
                        ? 'bg-primary/10 text-primary'
                        : 'bg-secondary/20 text-secondary-foreground'
                      }`}>
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Button>
            );
          })}
        </div>
      </section>

      {/* Logout */}
      <section className="px-4 lg:px-0">
        <Button
          variant="outline"
          className="w-full h-14 lg:h-16 text-destructive border-destructive/30 hover:bg-destructive/5 hover:border-destructive/50 rounded-2xl font-medium text-base"
        >
          <LogOut className="w-5 h-5 mr-3" />
          {t('logout')}
        </Button>
      </section>

      {/* App Version */}
      <div className="text-center text-xs lg:text-sm text-muted-foreground py-4">
        {t('appName')} v1.0.0
      </div>
    </div>
  );
};

export default ProfileScreen;
