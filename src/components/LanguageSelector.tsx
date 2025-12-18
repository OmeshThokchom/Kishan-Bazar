import { Check, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: 'hi', name: 'हिन्दी', nameEn: 'Hindi', flag: '🇮🇳' },
    { code: 'en', name: 'English', nameEn: 'English', flag: '🇬🇧' },
  ];

  const handleSelect = (code: 'hi' | 'en') => {
    setLanguage(code);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="touch-target relative">
          <Globe className="w-5 h-5" />
          <span className="absolute -bottom-0.5 -right-0.5 text-[10px] font-bold uppercase bg-primary text-primary-foreground rounded px-1">
            {language}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[320px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {t('selectLanguage')}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code as 'hi' | 'en')}
              className={cn(
                'w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200',
                language === lang.code
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              )}
            >
              <span className="text-3xl">{lang.flag}</span>
              <div className="flex-1 text-left">
                <p className="font-semibold text-lg text-foreground">{lang.name}</p>
                <p className="text-sm text-muted-foreground">{lang.nameEn}</p>
              </div>
              {language === lang.code && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageSelector;
