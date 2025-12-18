import { useState } from 'react';
import { Send, Mic, Sparkles, Camera, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import VoiceButton from '@/components/voice/VoiceButton';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  image?: string;
}

interface AIChatProps {
  onBack?: () => void;
}

const AIChat = ({ onBack }: AIChatProps) => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: t('aiWelcome'),
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    {
      icon: '🍅',
      text: language === 'hi' ? 'टमाटर में कीड़ा लगा है' : 'Pest in tomatoes',
      key: 'tomatoes-pest'
    },
    {
      icon: '🌾',
      text: language === 'hi' ? 'गेहूं का भाव क्या है?' : 'What is wheat price?',
      key: 'wheat-price'
    },
    {
      icon: '🌧️',
      text: language === 'hi' ? 'बारिश कब होगी?' : 'When will it rain?',
      key: 'rain'
    },
    {
      icon: '💊',
      text: language === 'hi' ? 'कौन सा खाद डालें?' : 'Which fertilizer to use?',
      key: 'fertilizer'
    },
  ];

  const handleSend = (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, { hi: string, en: string }> = {
        'tomatoes-pest': {
          hi: 'टमाटर में कीड़े के लिए:\n\n1. 🧪 Imidacloprid 17.8 SL @ 0.3ml/litre पानी में मिलाकर स्प्रे करें\n\n2. 🌿 नीम का तेल (5ml/litre) भी प्रभावी है\n\n3. ⏰ सुबह या शाम को स्प्रे करें\n\n📸 फ़ोटो भेजें तो सही समस्या बता सकता हूं।',
          en: 'For tomato pests:\n\n1. 🧪 Spray Imidacloprid 17.8 SL @ 0.3ml/litre water\n\n2. 🌿 Neem oil (5ml/litre) is also effective\n\n3. ⏰ Spray in morning or evening\n\n📸 Send a photo for better diagnosis.'
        },
        'wheat-price': {
          hi: 'आज का गेहूं भाव:\n\n📍 हापुड़ मंडी: ₹2,800/क्विंटल\n📍 करनाल मंडी: ₹2,850/क्विंटल\n📍 इंदौर मंडी: ₹2,750/क्विंटल\n\n📈 ट्रेंड: +2.5% (पिछले सप्ताह से)\n\n💡 AI सुझाव: अगले 10 दिनों में भाव और बढ़ने की संभावना है।',
          en: 'Today\'s wheat prices:\n\n📍 Hapur Mandi: ₹2,800/quintal\n📍 Karnal Mandi: ₹2,850/quintal\n📍 Indore Mandi: ₹2,750/quintal\n\n📈 Trend: +2.5% (from last week)\n\n💡 AI Suggestion: Prices expected to rise in next 10 days.'
        },
        'rain': {
          hi: 'आपके क्षेत्र का मौसम:\n\n🌤️ आज: साफ, तापमान 32°C\n🌧️ कल: हल्की बारिश की संभावना (60%)\n⛈️ परसों: भारी बारिश (80%)\n\n⚠️ सुझाव: कटी फसल को ढककर रखें।',
          en: 'Weather in your area:\n\n🌤️ Today: Clear, 32°C\n🌧️ Tomorrow: Light rain likely (60%)\n⛈️ Day after: Heavy rain (80%)\n\n⚠️ Suggestion: Keep harvested produce covered.'
        },
        'fertilizer': {
          hi: 'फसल के हिसाब से खाद:\n\n🌾 गेहूं: DAP + यूरिया (बुवाई के समय)\n🍅 टमाटर: NPK 19:19:19\n🌽 मक्का: यूरिया 30kg/एकड़\n\n📅 समय: सुबह या शाम को पानी के साथ\n\n🔬 मिट्टी जांच करवाएं तो सटीक मात्रा बता सकता हूं।',
          en: 'Fertilizer by crop:\n\n🌾 Wheat: DAP + Urea (at sowing)\n🍅 Tomato: NPK 19:19:19\n🌽 Maize: Urea 30kg/acre\n\n📅 Time: Morning or evening with water\n\n🔬 Get soil tested for exact dosage.'
        }
      };

      // Try to find matching response based on text or key
      const matchedKey = quickQuestions.find(q => q.text === messageText)?.key;
      const responsePair = matchedKey ? responses[matchedKey] : null;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: responsePair
          ? responsePair[language]
          : (language === 'hi' ? 'मैं समझ रहा हूं। कृपया थोड़ा और विस्तार से बताएं या फ़ोटो भेजें।' : 'I understand. Please provide more details or send a photo.'),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-gradient-ai flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-ai-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{t('aiAssistant')}</p>
            <p className="text-xs text-primary">{t('online')}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-2',
              message.type === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.type === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gradient-ai flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-ai-foreground" />
              </div>
            )}

            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-4 py-3',
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-md'
                  : 'bg-card border border-border rounded-bl-md'
              )}
            >
              <p className="text-sm whitespace-pre-line">{message.content}</p>
              <p className={cn(
                'text-[10px] mt-1',
                message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
              )}>
                {message.timestamp.toLocaleTimeString(language === 'hi' ? 'hi-IN' : 'en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-2 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-ai flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-ai-foreground" />
            </div>
            <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground text-center">{t('quickAsk')}</p>
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions.map((q, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="h-auto py-3 px-3 text-left justify-start"
                  onClick={() => handleSend(q.text)}
                >
                  <span className="text-xl mr-2">{q.icon}</span>
                  <span className="text-sm">{q.text}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 border-t border-border bg-card">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Camera className="w-5 h-5 text-muted-foreground" />
          </Button>

          <div className="flex-1 relative">
            <Input
              placeholder={t('typeMessage')}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="pr-12 h-12 rounded-xl bg-background"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
            >
              <Send className={cn(
                'w-5 h-5',
                inputValue.trim() ? 'text-primary' : 'text-muted-foreground'
              )} />
            </Button>
          </div>

          <VoiceButton
            size="default"
            className="flex-shrink-0"
            onVoiceEnd={(transcript) => handleSend(transcript)}
          />
        </div>
      </div>
    </div>
  );
};

export default AIChat;
