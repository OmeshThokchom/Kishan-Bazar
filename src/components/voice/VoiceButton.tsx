import { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface VoiceButtonProps {
  onVoiceStart?: () => void;
  onVoiceEnd?: (transcript: string) => void;
  className?: string;
  size?: 'default' | 'large' | 'fab';
}

const VoiceButton = ({ onVoiceStart, onVoiceEnd, className, size = 'default' }: VoiceButtonProps) => {
  const { t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const handleClick = () => {
    if (isListening) {
      setIsListening(false);
      if (onVoiceEnd && transcript) {
        onVoiceEnd(transcript);
      }
      setTranscript('');
    } else {
      setIsListening(true);
      onVoiceStart?.();
      
      setTimeout(() => {
        const mockTranscripts = [
          'मुझे टमाटर बेचना है',
          '100 kg प्याज चाहिए',
          'आज का भाव बताओ',
          'मेरे ऑर्डर दिखाओ',
        ];
        const randomTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
        setTranscript(randomTranscript);
      }, 2000);
    }
  };

  const sizeClasses = {
    default: 'w-14 h-14',
    large: 'w-20 h-20',
    fab: 'w-16 h-16',
  };

  const iconSizes = {
    default: 'w-6 h-6',
    large: 'w-8 h-8',
    fab: 'w-7 h-7',
  };

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <button
        onClick={handleClick}
        className={cn(
          'flex items-center justify-center rounded-full transition-all duration-300',
          'bg-gradient-accent shadow-glow-accent',
          sizeClasses[size],
          isListening ? 'voice-active' : 'voice-pulse',
          size === 'fab' && 'voice-fab'
        )}
        aria-label={isListening ? 'Stop listening' : 'Tap to speak'}
      >
        {isListening ? (
          <MicOff className={cn(iconSizes[size], 'text-accent-foreground')} />
        ) : (
          <Mic className={cn(iconSizes[size], 'text-accent-foreground')} />
        )}
      </button>
      
      {isListening && (
        <div className="animate-fade-in-up text-center">
          <p className="text-sm font-medium text-accent">{t('listening')} 🎤</p>
          {transcript && (
            <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
              "{transcript}"
            </p>
          )}
        </div>
      )}
      
      {!isListening && size !== 'fab' && (
        <p className="text-xs text-muted-foreground text-center">
          {t('tapToSpeak')}
        </p>
      )}
    </div>
  );
};

export default VoiceButton;
