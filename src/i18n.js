import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "nav": {
        "explore": "Explore",
        "equipment": "Equipment",
        "ai_assistant": "AI Assistant",
        "how_it_works": "How It Works",
        "sign_in": "Sign In",
        "get_started": "Get Started"
      },
      "app": {
        "back_to_home": "Back to Home",
        "ask_ai": "Ask Agri-AI",
        "switch_to_home": "Switch to Home"
      },
      "hero": {
        "title_line1": "Smart farming,",
        "title_line2": "made accessible.",
        "description": "AgriShare connects farmers with affordable agricultural equipment, smart AI assistance, and practical farming resources — all in one simple platform.",
        "explore_btn": "Explore Equipment",
        "ask_ai_btn": "Ask AI Assistant"
      },
      "features": {
        "rent": {
          "title": "Rent Equipment",
          "desc": "Access tractors, harvesters, pumps and other agricultural tools without the high purchase cost.",
          "cta": "Explore"
        },
        "market": {
          "title": "Market Price Analyzer",
          "desc": "Analyze live crop prices, historical trends, and future predictions to maximize your agricultural profits.",
          "cta": "View Prices"
        },
        "ai": {
          "title": "AI Farming Assistant",
          "desc": "Get intelligent farming guidance, recommendations and quick answers whenever you need them.",
          "cta": "Ask AI"
        },
        "core_feature": "Core Feature"
      },
      "leasing": {
        "title": "Agricultural Equipment Leasing",
        "subtitle": "Find and rent the right machinery for your farm from verified local owners.",
        "search_placeholder": "Search equipment (e.g., Tractor, Harvester)...",
        "add_equipment": "List Equipment",
        "categories": {
          "all": "All Equipment",
          "tractors": "Tractors",
          "harvesters": "Harvesters",
          "tillers": "Tillers",
          "pumps": "Pumps"
        },
        "rent_now": "Rent Now",
        "per_day": "per day",
        "owner": "Owner",
        "location": "Location",
        "shared_network": "Shared Panchayat Network",
        "available": "Available",
        "rented": "Rented",
        "unavailable": "Unavailable"
      },
      "add_equipment": {
        "title": "List Your Equipment",
        "name_label": "Equipment Name",
        "name_placeholder": "e.g., Mahindra 575 DI Tractor",
        "category_label": "Category",
        "price_label": "Price per Day (₹)",
        "price_placeholder": "e.g., 1500",
        "owner_label": "Your Name",
        "owner_placeholder": "e.g., Ramesh Kumar",
        "location_label": "Panchayat / Location",
        "location_placeholder": "e.g., Palakkad",
        "phone_label": "Contact Number",
        "phone_placeholder": "e.g., 9876543210",
        "cancel": "Cancel",
        "submit": "List Equipment"
      },
      "how_it_works": {
        "title": "How AgriShare Works",
        "subtitle": "A simple, transparent process to rent equipment or get AI assistance.",
        "step1_title": "1. Find Equipment",
        "step1_desc": "Browse our marketplace for tractors, harvesters, and tools available in your local area.",
        "step2_title": "2. Connect & Book",
        "step2_desc": "Contact verified owners directly through the platform to arrange dates and pickup.",
        "step3_title": "3. Farm Smarter",
        "step3_desc": "Use the equipment to complete your work efficiently and affordably.",
        "step4_title": "4. Ask AI Anytime",
        "step4_desc": "Use our AI Assistant for real-time farming advice, crop planning, and equipment tips.",
        "back_home": "Back to Home"
      },
      "market_page": {
        "title": "Market Price Analyzer",
        "subtitle": "Live market rates, historical trends, and intelligent price predictions.",
        "live_ticker": "LIVE MARKET TICKER",
        "price_trends": "Price Trends (Last 6 Months)",
        "set_alerts": "Set Price Alerts",
        "set_alerts_desc": "Get notified when prices reach your target.",
        "view_mandi": "View Local Mandi",
        "view_mandi_desc": "Check prices at your nearest market.",
        "wheat": "Wheat",
        "rice": "Rice",
        "maize": "Maize",
        "potato": "Potato"
      },
      "ai_modal": {
        "title": "AgriShare AI Assistant",
        "live": "Live",
        "subtitle": "Smart farming advice & equipment guidance",
        "placeholder": "Ask anything about crops, tractors, or rentals...",
        "analyzing": "Agri-AI is analyzing your query...",
        "suggested": "Suggested Questions",
        "error_key": "Error: Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your .env.local file.",
        "q1": "🚜 What size tractor is best for 12 acres of wheat?",
        "q2": "🌱 Best nitrogen fertilizer schedule for early kharif",
        "q3": "💰 How do I list my rotavator to earn extra income?",
        "q4": "🌧️ Monsoon rainfall forecast and irrigation planning"
      },
      "footer": {
        "verified": "Verified Equipment Owners",
        "transparent": "Transparent Hourly & Daily Rates"
      }
    }
  },
  hi: {
    translation: {
      "nav": {
        "explore": "खोजें",
        "equipment": "उपकरण",
        "ai_assistant": "AI सहायक",
        "how_it_works": "यह कैसे काम करता है",
        "sign_in": "लॉग इन करें",
        "get_started": "शुरू करें"
      },
      "app": {
        "back_to_home": "होम पर वापस",
        "ask_ai": "एग्री-एआई से पूछें",
        "switch_to_home": "होम पर स्विच करें"
      },
      "hero": {
        "title_line1": "स्मार्ट खेती,",
        "title_line2": "अब आसान है।",
        "description": "एग्रीशेयर किसानों को किफायती कृषि उपकरण, स्मार्ट एआई सहायता और व्यावहारिक खेती संसाधनों के साथ जोड़ता है — सब कुछ एक ही प्लेटफॉर्म पर।",
        "explore_btn": "उपकरण खोजें",
        "ask_ai_btn": "एआई सहायक से पूछें"
      },
      "features": {
        "rent": {
          "title": "उपकरण किराए पर लें",
          "desc": "भारी खरीद लागत के बिना ट्रैक्टर, हार्वेस्टर, पंप और अन्य कृषि उपकरणों तक पहुंच प्राप्त करें।",
          "cta": "खोजें"
        },
        "market": {
          "title": "बाजार मूल्य विश्लेषक",
          "desc": "अपने कृषि लाभ को अधिकतम करने के लिए लाइव फसल की कीमतों, ऐतिहासिक प्रवृत्तियों और भविष्य की भविष्यवाणियों का विश्लेषण करें।",
          "cta": "कीमतें देखें"
        },
        "ai": {
          "title": "एआई खेती सहायक",
          "desc": "बुद्धिमान खेती मार्गदर्शन, सिफारिशें और त्वरित उत्तर प्राप्त करें जब भी आपको उनकी आवश्यकता हो।",
          "cta": "एआई से पूछें"
        },
        "core_feature": "मुख्य विशेषता"
      },
      "leasing": {
        "title": "कृषि उपकरण पट्टे पर",
        "subtitle": "सत्यापित स्थानीय मालिकों से अपने खेत के लिए सही मशीनरी खोजें और किराए पर लें।",
        "search_placeholder": "उपकरण खोजें (उदा., ट्रैक्टर, हार्वेस्टर)...",
        "add_equipment": "उपकरण सूचीबद्ध करें",
        "categories": {
          "all": "सभी उपकरण",
          "tractors": "ट्रैक्टर",
          "harvesters": "हार्वेस्टर",
          "tillers": "टिलर",
          "pumps": "पंप"
        },
        "rent_now": "अभी किराए पर लें",
        "per_day": "प्रति दिन",
        "owner": "मालिक",
        "location": "स्थान",
        "shared_network": "साझा पंचायत नेटवर्क",
        "available": "उपलब्ध",
        "rented": "किराए पर",
        "unavailable": "अनुपलब्ध"
      },
      "add_equipment": {
        "title": "अपना उपकरण सूचीबद्ध करें",
        "name_label": "उपकरण का नाम",
        "name_placeholder": "उदा., महिंद्रा 575 DI ट्रैक्टर",
        "category_label": "श्रेणी",
        "price_label": "मूल्य प्रति दिन (₹)",
        "price_placeholder": "उदा., 1500",
        "owner_label": "आपका नाम",
        "owner_placeholder": "उदा., रमेश कुमार",
        "location_label": "पंचायत / स्थान",
        "location_placeholder": "उदा., पलक्कड़",
        "phone_label": "संपर्क नंबर",
        "phone_placeholder": "उदा., 9876543210",
        "cancel": "रद्द करें",
        "submit": "सूचीबद्ध करें"
      },
      "how_it_works": {
        "title": "एग्रीशेयर कैसे काम करता है",
        "subtitle": "उपकरण किराए पर लेने या एआई सहायता प्राप्त करने की एक सरल, पारदर्शी प्रक्रिया।",
        "step1_title": "1. उपकरण खोजें",
        "step1_desc": "अपने स्थानीय क्षेत्र में उपलब्ध ट्रैक्टर, हार्वेस्टर और उपकरणों के लिए हमारे बाज़ार को ब्राउज़ करें।",
        "step2_title": "2. जुड़ें और बुक करें",
        "step2_desc": "तारीख और पिकअप की व्यवस्था करने के लिए सीधे मंच के माध्यम से सत्यापित मालिकों से संपर्क करें।",
        "step3_title": "3. स्मार्ट खेती करें",
        "step3_desc": "अपने काम को कुशलतापूर्वक और सस्ते में पूरा करने के लिए उपकरण का उपयोग करें।",
        "step4_title": "4. कभी भी AI से पूछें",
        "step4_desc": "वास्तविक समय की खेती की सलाह, फसल योजना और उपकरण युक्तियों के लिए हमारे AI सहायक का उपयोग करें।",
        "back_home": "होम पर वापस"
      },
      "market_page": {
        "title": "बाजार मूल्य विश्लेषक",
        "subtitle": "लाइव बाजार दरें, ऐतिहासिक प्रवृत्तियां और बुद्धिमान मूल्य भविष्यवाणियां।",
        "live_ticker": "लाइव मार्केट टिकर",
        "price_trends": "मूल्य रुझान (पिछले 6 महीने)",
        "set_alerts": "मूल्य अलर्ट सेट करें",
        "set_alerts_desc": "जब कीमतें आपके लक्ष्य तक पहुंचें तो सूचना प्राप्त करें।",
        "view_mandi": "स्थानीय मंडी देखें",
        "view_mandi_desc": "अपने निकटतम बाजार में कीमतों की जाँच करें।",
        "wheat": "गेहूँ",
        "rice": "चावल",
        "maize": "मक्का",
        "potato": "आलू"
      },
      "ai_modal": {
        "title": "एग्रीशेयर AI सहायक",
        "live": "लाइव",
        "subtitle": "स्मार्ट खेती सलाह और उपकरण मार्गदर्शन",
        "placeholder": "फसलों, ट्रैक्टरों या किराए के बारे में कुछ भी पूछें...",
        "analyzing": "एग्री-एआई आपकी क्वेरी का विश्लेषण कर रहा है...",
        "suggested": "सुझाए गए प्रश्न",
        "error_key": "त्रुटि: जेमिनी एपीआई कुंजी गायब है। कृपया अपने .env.local फ़ाइल में VITE_GEMINI_API_KEY सेट करें।",
        "q1": "🚜 12 एकड़ गेहूं के लिए कौन सा आकार का ट्रैक्टर सबसे अच्छा है?",
        "q2": "🌱 शुरुआती खरीफ के लिए सर्वोत्तम नाइट्रोजन उर्वरक कार्यक्रम",
        "q3": "💰 अतिरिक्त आय अर्जित करने के लिए मैं अपने रोटावेटर को कैसे सूचीबद्ध करूँ?",
        "q4": "🌧️ मानसून वर्षा पूर्वानुमान और सिंचाई योजना"
      },
      "footer": {
        "verified": "सत्यापित उपकरण मालिक",
        "transparent": "पारदर्शी प्रति घंटा और दैनिक दरें"
      }
    }
  },
  ml: {
    translation: {
      "nav": {
        "explore": "പര്യവേക്ഷണം",
        "equipment": "ഉപകരണങ്ങൾ",
        "ai_assistant": "AI അസിസ്റ്റൻ്റ്",
        "how_it_works": "എങ്ങനെ പ്രവർത്തിക്കുന്നു",
        "sign_in": "ലോഗിൻ",
        "get_started": "തുടങ്ങാം"
      },
      "app": {
        "back_to_home": "ഹോമിലേക്ക് മടങ്ങുക",
        "ask_ai": "അഗ്രി-AI യോട് ചോദിക്കുക",
        "switch_to_home": "ഹോമിലേക്ക് മാറുക"
      },
      "hero": {
        "title_line1": "സ്മാർട്ട് കൃഷി,",
        "title_line2": "ഇപ്പോൾ കൂടുതൽ എളുപ്പം.",
        "description": "അഗ്രിഷെയർ കർഷകരെ താങ്ങാനാവുന്ന കാർഷിക ഉപകരണങ്ങൾ, സ്മാർട്ട് AI സഹായം, പ്രായോഗിക വിഭവങ്ങൾ എന്നിവയുമായി ബന്ധിപ്പിക്കുന്നു — എല്ലാം ഒറ്റ പ്ലാറ്റ്‌ഫോമിൽ.",
        "explore_btn": "ഉപകരണങ്ങൾ തിരയുക",
        "ask_ai_btn": "AI യോട് ചോദിക്കുക"
      },
      "features": {
        "rent": {
          "title": "ഉപകരണങ്ങൾ വാടകയ്ക്ക്",
          "desc": "വലിയ ചെലവില്ലാതെ ട്രാക്ടറുകൾ, ഹാർവെസ്റ്ററുകൾ, പമ്പുകൾ, മറ്റ് ഉപകരണങ്ങൾ എന്നിവ ഉപയോഗിക്കുക.",
          "cta": "തിരയുക"
        },
        "market": {
          "title": "വിപണി വില വിശകലനം",
          "desc": "തത്സമയ വിള വിലകളും ട്രെൻഡുകളും പ്രവചനങ്ങളും വിശകലനം ചെയ്ത് നിങ്ങളുടെ ലാഭം വർദ്ധിപ്പിക്കുക.",
          "cta": "വിലകൾ കാണുക"
        },
        "ai": {
          "title": "AI കാർഷിക അസിസ്റ്റൻ്റ്",
          "desc": "നിങ്ങൾക്ക് ആവശ്യമുള്ളപ്പോഴെല്ലാം മികച്ച കാർഷിക മാർഗ്ഗനിർദ്ദേശങ്ങളും വിവരങ്ങളും നേടുക.",
          "cta": "AI യോട് ചോദിക്കുക"
        },
        "core_feature": "പ്രധാന സവിശേഷത"
      },
      "leasing": {
        "title": "കാർഷിക ഉപകരണ പാട്ടം",
        "subtitle": "പരിശോധിച്ചുറപ്പിച്ച പ്രാദേശിക ഉടമകളിൽ നിന്ന് ശരിയായ യന്ത്രങ്ങൾ കണ്ടെത്തുക.",
        "search_placeholder": "ഉപകരണങ്ങൾ തിരയുക (ഉദാ: ട്രാക്ടർ)...",
        "add_equipment": "ഉപകരണം ചേർക്കുക",
        "categories": {
          "all": "എല്ലാ ഉപകരണങ്ങളും",
          "tractors": "ട്രാക്ടറുകൾ",
          "harvesters": "ഹാർവെസ്റ്ററുകൾ",
          "tillers": "ടില്ലറുകൾ",
          "pumps": "പമ്പുകൾ"
        },
        "rent_now": "വാടകയ്ക്ക് എടുക്കുക",
        "per_day": "പ്രതിദിനം",
        "owner": "ഉടമ",
        "location": "സ്ഥലം",
        "shared_network": "പഞ്ചായത്ത് നെറ്റ്‌വർക്ക്",
        "available": "ലഭ്യമാണ്",
        "rented": "വാടകയ്ക്ക്",
        "unavailable": "ലഭ്യമല്ല"
      },
      "add_equipment": {
        "title": "നിങ്ങളുടെ ഉപകരണം ലിസ്റ്റ് ചെയ്യുക",
        "name_label": "ഉപകരണത്തിന്റെ പേര്",
        "name_placeholder": "ഉദാ: മഹീന്ദ്ര 575 DI ട്രാക്ടർ",
        "category_label": "വിഭാഗം",
        "price_label": "പ്രതിദിന വാടക (₹)",
        "price_placeholder": "ഉദാ: 1500",
        "owner_label": "നിങ്ങളുടെ പേര്",
        "owner_placeholder": "ഉദാ: രമേഷ് കുമാർ",
        "location_label": "പഞ്ചായത്ത് / സ്ഥലം",
        "location_placeholder": "ഉദാ: പാലക്കാട്",
        "phone_label": "ഫോൺ നമ്പർ",
        "phone_placeholder": "ഉദാ: 9876543210",
        "cancel": "റദ്ദാക്കുക",
        "submit": "ലിസ്റ്റ് ചെയ്യുക"
      },
      "how_it_works": {
        "title": "അഗ്രിഷെയർ എങ്ങനെ പ്രവർത്തിക്കുന്നു",
        "subtitle": "ഉപകരണങ്ങൾ വാടകയ്‌ക്കെടുക്കുന്നതിനോ AI സഹായം ലഭിക്കുന്നതിനോ ഉള്ള ലളിതമായ പ്രക്രിയ.",
        "step1_title": "1. ഉപകരണങ്ങൾ കണ്ടെത്തുക",
        "step1_desc": "നിങ്ങളുടെ പ്രദേശത്ത് ലഭ്യമായ ട്രാക്ടറുകൾ, ഹാർവെസ്റ്ററുകൾ എന്നിവ തിരയുക.",
        "step2_title": "2. ബുക്ക് ചെയ്യുക",
        "step2_desc": "തീയതിയും സ്ഥലവും തീരുമാനിക്കാൻ ഉടമകളുമായി നേരിട്ട് ബന്ധപ്പെടുക.",
        "step3_title": "3. മികച്ച കൃഷി",
        "step3_desc": "കുറഞ്ഞ ചെലവിൽ നിങ്ങളുടെ ജോലി പൂർത്തിയാക്കാൻ ഉപകരണങ്ങൾ ഉപയോഗിക്കുക.",
        "step4_title": "4. AI യോട് ചോദിക്കുക",
        "step4_desc": "തത്സമയ കാർഷിക ഉപദേശങ്ങൾക്കായി ഞങ്ങളുടെ AI അസിസ്റ്റന്റ് ഉപയോഗിക്കുക.",
        "back_home": "ഹോമിലേക്ക് മടങ്ങുക"
      },
      "market_page": {
        "title": "വിപണി വില വിശകലനം",
        "subtitle": "തത്സമയ വിപണി നിരക്കുകളും ട്രെൻഡുകളും വില പ്രവചനങ്ങളും.",
        "live_ticker": "തത്സമയ വിപണി വിലകൾ",
        "price_trends": "വില ട്രെൻഡുകൾ (കഴിഞ്ഞ 6 മാസം)",
        "set_alerts": "വില അലേർട്ടുകൾ ക്രമീകരിക്കുക",
        "set_alerts_desc": "വിലകൾ ലക്ഷ്യത്തിലെത്തുമ്പോൾ അറിയിപ്പ് നേടുക.",
        "view_mandi": "പ്രാദേശിക മാർക്കറ്റ് കാണുക",
        "view_mandi_desc": "അടുത്തുള്ള മാർക്കറ്റിലെ വിലകൾ പരിശോധിക്കുക.",
        "wheat": "ഗോതമ്പ്",
        "rice": "അരി",
        "maize": "ചോളം",
        "potato": "ഉരുളക്കിഴങ്ങ്"
      },
      "ai_modal": {
        "title": "അഗ്രിഷെയർ AI അസിസ്റ്റൻ്റ്",
        "live": "തത്സമയം",
        "subtitle": "മികച്ച കാർഷിക ഉപദേശങ്ങളും വിവരങ്ങളും",
        "placeholder": "വിളകളെക്കുറിച്ചോ ട്രാക്ടറുകളെക്കുറിച്ചോ എന്തുവേണമെങ്കിലും ചോദിക്കുക...",
        "analyzing": "അഗ്രി-AI നിങ്ങളുടെ ചോദ്യം വിശകലനം ചെയ്യുന്നു...",
        "suggested": "നിർദ്ദേശിച്ച ചോദ്യങ്ങൾ",
        "error_key": "പിശക്: ജെമിനി API കീ ഇല്ല. ദയവായി .env.local ഫയലിൽ ചേർക്കുക.",
        "q1": "🚜 12 ഏക്കർ ഗോതമ്പിന് ഏത് വലുപ്പത്തിലുള്ള ട്രാക്ടറാണ് നല്ലത്?",
        "q2": "🌱 കൃഷിക്ക് ഏറ്റവും അനുയോജ്യമായ വളപ്രയോഗം",
        "q3": "💰 അധിക വരുമാനം നേടാൻ എന്റെ റോട്ടാവേറ്റർ എങ്ങനെ ലിസ്റ്റ് ചെയ്യാം?",
        "q4": "🌧️ മൺസൂൺ മഴ പ്രവചനവും ജലസേചന ആസൂത്രണവും"
      },
      "footer": {
        "verified": "പരിശോധിച്ചുറപ്പിച്ച ഉടമകൾ",
        "transparent": "സുതാര്യമായ നിരക്കുകൾ"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
