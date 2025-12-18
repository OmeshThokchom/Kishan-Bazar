import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'hi' | 'en';

interface Translations {
  [key: string]: {
    hi: string;
    en: string;
  };
}

export const translations: Translations = {
  // Header
  namaste: { hi: 'नमस्ते 🙏', en: 'Hello 🙏' },

  // Navigation
  home: { hi: 'होम', en: 'Home' },
  orders: { hi: 'ऑर्डर', en: 'Orders' },
  sell: { hi: 'बेचें', en: 'Sell' },
  buy: { hi: 'खरीदें', en: 'Buy' },
  prices: { hi: 'भाव', en: 'Prices' },
  profile: { hi: 'प्रोफाइल', en: 'Profile' },
  search: { hi: 'खोजें', en: 'Search' },
  browse: { hi: 'खरीदें', en: 'Browse' },

  // Quick Actions
  sellProduct: { hi: 'उत्पाद बेचें', en: 'Sell Product' },
  buyProducts: { hi: 'उत्पाद खरीदें', en: 'Buy Products' },

  // Voice
  voiceHelp: { hi: 'बोलकर मदद लें', en: 'Get help by voice' },
  voiceExample: { hi: '"मुझे टमाटर बेचना है" या "आज का भाव बताओ"', en: '"I want to sell tomatoes" or "Tell me today\'s prices"' },
  tapToSpeak: { hi: 'बोलने के लिए दबाएं', en: 'Tap to speak' },
  listening: { hi: 'बोलिए...', en: 'Listening...' },

  // Stats
  totalProducts: { hi: 'कुल उत्पाद', en: 'Products' },
  activeOrders: { hi: 'सक्रिय ऑर्डर', en: 'Active Orders' },
  thisMonth: { hi: 'इस महीने', en: 'This Month' },
  rating: { hi: 'रेटिंग', en: 'Rating' },

  // Categories
  categories: { hi: 'फसल श्रेणियां', en: 'Crop Categories' },
  vegetables: { hi: 'सब्जियां', en: 'Vegetables' },
  fruits: { hi: 'फल', en: 'Fruits' },
  grains: { hi: 'अनाज', en: 'Grains' },
  pulses: { hi: 'दालें', en: 'Pulses' },
  spices: { hi: 'मसाले', en: 'Spices' },
  dairy: { hi: 'डेयरी', en: 'Dairy' },
  flowers: { hi: 'फूल', en: 'Flowers' },
  seeds: { hi: 'बीज', en: 'Seeds' },

  // Common
  viewAll: { hi: 'सभी देखें', en: 'View All' },
  aiAdvice: { hi: 'AI सलाह', en: 'AI Advice' },
  liveMandiPrices: { hi: 'लाइव मंडी भाव', en: 'Live Mandi Prices' },
  inYourArea: { hi: 'आपके क्षेत्र में', en: 'In Your Area' },
  available: { hi: 'उपलब्ध', en: 'available' },

  // Quality
  premium: { hi: 'प्रीमियम', en: 'Premium' },
  good: { hi: 'अच्छी', en: 'Good' },
  standard: { hi: 'सामान्य', en: 'Standard' },

  // Prices
  todayMandiPrices: { hi: 'आज के मंडी भाव', en: "Today's Mandi Prices" },
  update: { hi: 'अपडेट', en: 'Update' },
  totalCommodities: { hi: 'कुल वस्तुएं', en: 'Total Items' },
  rising: { hi: 'बढ़ रहे', en: 'Rising' },
  falling: { hi: 'गिर रहे', en: 'Falling' },
  stable: { hi: 'स्थिर', en: 'Stable' },
  minimum: { hi: 'न्यूनतम', en: 'Min' },
  maximum: { hi: 'अधिकतम', en: 'Max' },
  modal: { hi: 'मॉडल', en: 'Modal' },
  per: { hi: 'प्रति', en: 'per' },
  allMandis: { hi: 'सभी मंडियां', en: 'All Mandis' },
  searchCrop: { hi: 'फसल खोजें...', en: 'Search crop...' },
  aiPrediction: { hi: 'AI भविष्यवाणी', en: 'AI Prediction' },
  allPrices: { hi: 'सभी भाव', en: 'All Prices' },
  weekTrend: { hi: '7 दिन का ट्रेंड', en: '7 Day Trend' },
  chartHere: { hi: 'चार्ट यहां दिखेगा', en: 'Chart will appear here' },

  // Orders
  totalEarnings: { hi: 'कुल कमाई', en: 'Total Earnings' },
  pendingPayments: { hi: 'लंबित भुगतान', en: 'Pending Payments' },
  all: { hi: 'सभी', en: 'All' },
  pending: { hi: 'लंबित', en: 'Pending' },
  active: { hi: 'सक्रिय', en: 'Active' },
  completed: { hi: 'पूर्ण', en: 'Completed' },
  noOrders: { hi: 'कोई ऑर्डर नहीं', en: 'No Orders' },
  noOrdersInCategory: { hi: 'इस श्रेणी में कोई ऑर्डर नहीं है', en: 'No orders in this category' },
  totalAmount: { hi: 'कुल राशि', en: 'Total Amount' },
  viewDetails: { hi: 'विवरण देखें', en: 'View Details' },
  contact: { hi: 'संपर्क करें', en: 'Contact' },
  buyer: { hi: 'खरीदार', en: 'Buyer' },
  delivery: { hi: 'डिलीवरी', en: 'Delivery' },
  paymentPending: { hi: 'भुगतान लंबित', en: 'Payment Pending' },
  paymentComplete: { hi: 'भुगतान पूर्ण', en: 'Payment Complete' },
  paymentFailed: { hi: 'भुगतान विफल', en: 'Payment Failed' },
  refunded: { hi: 'वापसी', en: 'Refunded' },
  confirmed: { hi: 'पुष्टि', en: 'Confirmed' },
  packed: { hi: 'पैक', en: 'Packed' },
  shipped: { hi: 'भेजा गया', en: 'Shipped' },
  delivered: { hi: 'पहुंचा', en: 'Delivered' },
  cancelled: { hi: 'रद्द', en: 'Cancelled' },

  // Profile
  editProfile: { hi: 'प्रोफ़ाइल संपादित करें', en: 'Edit Profile' },
  manageAddress: { hi: 'पता प्रबंधित करें', en: 'Manage Address' },
  contactInfo: { hi: 'संपर्क जानकारी', en: 'Contact Info' },
  kycVerification: { hi: 'KYC सत्यापन', en: 'KYC Verification' },
  settings: { hi: 'सेटिंग्स', en: 'Settings' },
  helpSupport: { hi: 'सहायता', en: 'Help & Support' },
  notifications: { hi: 'सूचनाएं', en: 'Notifications' },
  logout: { hi: 'लॉग आउट करें', en: 'Logout' },
  verified: { hi: 'सत्यापित', en: 'Verified' },
  sellerMode: { hi: 'विक्रेता मोड', en: 'Seller Mode' },
  buyerMode: { hi: 'खरीदार मोड', en: 'Buyer Mode' },
  switchToBuyer: { hi: 'खरीदार के रूप में खोजें', en: 'Browse as buyer' },
  switchToSeller: { hi: 'विक्रेता के रूप में बेचें', en: 'Sell as seller' },
  member: { hi: 'सदस्य', en: 'Member' },
  years: { hi: 'वर्ष', en: 'years' },

  // Sell Product
  takePhoto: { hi: 'फ़ोटो लें', en: 'Take Photo' },
  takePhotoDesc: { hi: 'अपनी फसल की साफ़ फ़ोटो लें', en: 'Take a clear photo of your crop' },
  camera: { hi: 'फ़ोटो लें', en: 'Camera' },
  gallery: { hi: 'गैलरी से', en: 'From Gallery' },
  noImageYet: { hi: 'कोई फ़ोटो नहीं चुनी गई', en: 'No image uploaded' },
  orSpeakToUs: { hi: 'या बोलकर बताएं', en: 'Or tell us by voice' },
  aiAnalysis: { hi: 'AI विश्लेषण...', en: 'AI Analysis...' },
  aiDetection: { hi: 'AI पहचान', en: 'AI Detection' },
  quality: { hi: 'गुणवत्ता', en: 'Quality' },
  selectCategory: { hi: 'श्रेणी चुनें', en: 'Select Category' },
  selectCategoryDesc: { hi: 'अपनी फसल की श्रेणी चुनें', en: 'Select your crop category' },
  proceed: { hi: 'आगे बढ़ें', en: 'Proceed' },
  enterQuantity: { hi: 'मात्रा बताएं', en: 'Enter Quantity' },
  howMuchToSell: { hi: 'कितनी फसल बेचनी है?', en: 'How much do you want to sell?' },
  enterQuantityPlaceholder: { hi: 'मात्रा दर्ज करें', en: 'Enter quantity' },
  kg: { hi: 'किलो', en: 'KG' },
  quintal: { hi: 'क्विंटल', en: 'Quintal' },
  ton: { hi: 'टन', en: 'Ton' },
  sayQuantity: { hi: '"100 किलो" बोलें', en: 'Say "100 kg"' },
  setPrice: { hi: 'कीमत तय करें', en: 'Set Price' },
  pricePerUnit: { hi: 'प्रति', en: 'Per' },
  aiSuggestion: { hi: 'AI सुझाव', en: 'AI Suggestion' },
  basedOnMarket: { hi: 'मंडी भाव और गुणवत्ता के आधार पर', en: 'Based on mandi prices and quality' },
  enterPrice: { hi: 'कीमत दर्ज करें', en: 'Enter price' },
  confirm: { hi: 'पुष्टि करें', en: 'Confirm' },
  successfullyPosted: { hi: 'सफलतापूर्वक पोस्ट!', en: 'Successfully Posted!' },
  // Browser Extras
  productVisible: { hi: 'आपका उत्पाद मार्केटप्लेस में दिखाई देगा', en: 'Your product will be visible in the marketplace' },
  addNew: { hi: 'नया जोड़ें', en: 'Add New' },
  goHome: { hi: 'होम जाएं', en: 'Go Home' },

  // Browse
  selectCategories: { hi: 'श्रेणियां चुनें', en: 'Select Categories' },
  withinKm: { hi: 'km के अंदर', en: 'km radius' },
  productsFound: { hi: 'उत्पाद मिले', en: 'products found' },
  noProductsFound: { hi: 'कोई उत्पाद नहीं मिला', en: 'No products found' },
  tryDifferentSearch: { hi: 'कृपया अलग खोज शब्द या श्रेणी आज़माएं', en: 'Try different search terms or category' },
  clearFilters: { hi: 'फ़िल्टर हटाएं', en: 'Clear Filters' },

  // AI Chat
  aiAssistant: { hi: 'कृषि सहायक', en: 'Agri Assistant' },
  online: { hi: 'ऑनलाइन', en: 'Online' },
  aiWelcome: { hi: 'नमस्ते! 🙏 मैं आपका कृषि सहायक हूं। आप मुझसे फसल, कीट, मौसम, या भाव के बारे में कुछ भी पूछ सकते हैं।', en: 'Hello! 🙏 I am your agriculture assistant. You can ask me anything about crops, pests, weather, or prices.' },
  quickAsk: { hi: 'जल्दी पूछें:', en: 'Quick questions:' },
  typeMessage: { hi: 'मैसेज लिखें...', en: 'Type a message...' },

  // Hero Banner Extras
  heroSubtitle: { hi: 'आज अपना व्यापार बढ़ाने के लिए तैयार?', en: 'Ready to grow your business today?' },
  growth: { hi: 'वृद्धि', en: 'Growth' },

  // Weather
  humidity: { hi: 'नमी', en: 'Humidity' },
  wind: { hi: 'हवा', en: 'Wind' },
  forecast: { hi: 'पूर्वानुमान', en: 'Forecast' },

  // Navigation Extras
  appName: { hi: 'किसान बाज़ार', en: 'Kisaan Bazaar' },
  appNameEn: { hi: 'Kisaan Bazaar', en: 'Kisaan Bazaar' },
  navigation: { hi: 'नेविगेशन', en: 'Navigation' },
  forFarmers: { hi: 'किसानों के लिए', en: 'For Farmers' },
  growSales: { hi: 'बिक्री बढ़ाएं', en: 'Grow Your Sales' },
  learnMore: { hi: 'और जानें', en: 'Learn More' },

  // Language
  selectLanguage: { hi: 'भाषा चुनें', en: 'Select Language' },
  hindi: { hi: 'हिन्दी', en: 'Hindi' },
  english: { hi: 'अंग्रेज़ी', en: 'English' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || translation.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
