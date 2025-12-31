import {
  Home,
  FileText,
  HelpCircle,
  Globe,
  ArrowLeft,
} from "lucide-react";
import { motion } from "motion/react";
import { Language } from "../App";
import corporationLogo from "figma:asset/4884b874f7a80c1961814f3fbc2579e7fbfe4e85.png";

interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  onHelpClick?: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export function Header({
  language,
  onLanguageChange,
  onHelpClick,
  showBackButton,
  onBackClick,
}: HeaderProps) {
  const translations = {
    mr: {
      onlinePayment: "अकोला महानगरपालिका, अकोला",
      home: "मुख्यपृष्ठ",
      waterBill: "पाणी बिल",
      help: "मदत",
      backToSearch: "शोधकडे परत जा",
    },
    hi: {
      onlinePayment: "अकोला महानगरपालिका, अकोला",
      home: "होम",
      waterBill: "पानी का बिल",
      help: "सहायता",
      backToSearch: "खोज पर वापस जाएं",
    },
    en: {
      onlinePayment: "Akola Municipal Corporation",
      home: "Home",
      waterBill: "Water Bill",
      help: "Help",
      backToSearch: "Back to Search",
    },
  };

  const t = translations[language];

  return (
    <header
      id="amc-header"
      className="relative bg-[#006BA6] shadow-lg border-b border-[#005A8C] overflow-hidden flex-shrink-0"
    >
      {/* Animated background shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ["-100%", "200%"] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between py-1 sm:py-1.5 md:py-2 lg:py-2.5">
          {/* Logo and Online Payment Text */}
          <motion.div
            id="online-payment-portal"
            className="flex items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white rounded-lg md:rounded-xl flex items-center justify-center p-1 sm:p-1.5 md:p-2 shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={corporationLogo}
                alt="Corporation Logo"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <div>
              <motion.h1 
                className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-tight"
                style={{ fontWeight: 600 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t.onlinePayment}
              </motion.h1>
            </div>
          </motion.div>

          {/* Right Side Navigation */}
          <motion.div 
            className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Navigation Links - Hidden on very small screens */}
            <nav className="hidden sm:flex items-center gap-2">
              {showBackButton ? (
                <motion.button
                  onClick={onBackClick}
                  className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 rounded-lg text-white hover:bg-white/20 backdrop-blur-sm transition-all shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm font-medium">
                    {t.backToSearch}
                  </span>
                </motion.button>
              ) : (
                <motion.button
                  id="home"
                  className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 rounded-lg text-white hover:bg-white/20 backdrop-blur-sm transition-all shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Home className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm font-medium">
                    {t.home}
                  </span>
                </motion.button>
              )}
            </nav>

            {/* Language Selector */}
            <div
              id="language-dropdown"
              className="flex items-center gap-1 md:gap-1.5 bg-gradient-to-br from-white/25 to-white/15 backdrop-blur-md rounded-lg px-2 sm:px-2.5 md:px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 border border-white/50 shadow-xl hover:border-white/70 transition-all relative z-50"
            >
              <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-white drop-shadow-md pointer-events-none" />
              <select
                value={language}
                onChange={(e) =>
                  onLanguageChange(e.target.value as Language)
                }
                className="bg-transparent text-white text-xs sm:text-sm border-none outline-none cursor-pointer font-medium drop-shadow-md pr-4 md:pr-6 relative z-50"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right center",
                  backgroundSize: "16px",
                }}
              >
                <option
                  value="en"
                  className="text-gray-900 bg-white"
                >
                  English
                </option>
                <option
                  value="mr"
                  className="text-gray-900 bg-white"
                >
                  मराठी
                </option>
                <option
                  value="hi"
                  className="text-gray-900 bg-white"
                >
                  हिंदी
                </option>
              </select>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}