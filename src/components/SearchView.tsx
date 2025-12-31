import { useState } from "react";
import {
  Search,
  HelpCircle,
  X,
  User,
  Home,
  Phone,
  CreditCard,
  MapPin,
  Camera,
  Info,
  Hash,
  Sparkles,
  Scan,
  Zap,
  Building2,
  FileText,
  TrendingUp,
  CheckCircle,
  Globe,
  Droplets,
} from "lucide-react";
import { Language } from "../App";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { motion, AnimatePresence } from "motion/react";
import { UserGuideModal } from "./UserGuideModal";
import { TableSkeleton } from "./ShimmerLoader";

interface SearchViewProps {
  language: Language;
  onSearch: (consumerNo: string) => void;
  onLanguageChange?: (language: Language) => void;
}

// Mock data with unique IDs for results
const mockResults = {
  consumer: [
    {
      id: "WB123456",
      name: "राजेश कुमार शर्मा",
      mobile: "9876543210",
      ward: "वॉर्ड 5",
      propertyNo: "5/123",
      connections: 2,
    },
    {
      id: "WB123457",
      name: "राजेश कुमार पाटील",
      mobile: "9876543211",
      ward: "वॉर्ड 12",
      propertyNo: "12/456",
      connections: 1,
    },
  ],
  contact: [
    {
      id: "WB234567",
      name: "सुनीता देशमुख",
      mobile: "9876543210",
      ward: "वॉर्ड 3",
      propertyNo: "3/789",
      connections: 1,
    },
    {
      id: "WB234568",
      name: "अनिल देशमुख",
      mobile: "9876543210",
      ward: "वॉर्ड 8",
      propertyNo: "8/234",
      connections: 1,
    },
    {
      id: "WB234569",
      name: "प्रकाश देशमुख",
      mobile: "9876543210",
      ward: "वॉर्ड 15",
      propertyNo: "15/567",
      connections: 1,
    },
  ],
  name: [
    {
      id: "WB345678",
      name: "अमित पाटील",
      mobile: "9123456780",
      ward: "वॉर्ड 7",
      propertyNo: "7/345",
      connections: 1,
    },
    {
      id: "WB345679",
      name: "अमित पाटील",
      mobile: "9234567890",
      ward: "वॉर्ड 11",
      propertyNo: "11/678",
      connections: 2,
    },
  ],
  ward: [
    {
      id: "WB456789",
      name: "संजय जोशी",
      mobile: "9345678901",
      ward: "वॉर्ड 5",
      propertyNo: "5/234",
      connections: 1,
    },
    {
      id: "WB456790",
      name: "विजय कुलकर्णी",
      mobile: "9456789012",
      ward: "वॉर्ड 5",
      propertyNo: "5/567",
      connections: 1,
    },
    {
      id: "WB456791",
      name: "राहुल मोरे",
      mobile: "9567890123",
      ward: "वॉर्ड 5",
      propertyNo: "5/890",
      connections: 1,
    },
  ],
  upic: [
    {
      id: "WB567890",
      name: "प्रिया गायकवाड",
      mobile: "9678901234",
      ward: "वॉर्ड 9",
      propertyNo: "9/123",
      connections: 1,
    },
  ],
  application: [
    {
      id: "WB789012",
      name: "मनीष देसाई",
      mobile: "9789012345",
      ward: "वॉर्ड 4",
      propertyNo: "4/456",
      connections: 1,
    },
    {
      id: "WB789013",
      name: "स्नेहा खान",
      mobile: "9890123456",
      ward: "वॉर्ड 6",
      propertyNo: "6/789",
      connections: 1,
    },
  ],
};

export function SearchView({
  language,
  onSearch,
  onLanguageChange,
}: SearchViewProps) {
  const [consumerNo, setConsumerNo] = useState("");
  const [secondaryInput, setSecondaryInput] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [activeFilter, setActiveFilter] = useState("consumer");
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [paymentType, setPaymentType] = useState<
    "bill" | "newConnection"
  >("bill");
  const [showUserGuide, setShowUserGuide] = useState(false);
  const [showHelpGuide, setShowHelpGuide] = useState(false);

  const translations = {
    mr: {
      pageTitle: "अकोला महानगरपालिका",
      pageSubtitle: "ऑनलाईन पाणीपट्टी भरणा",
      searchInfo: "पाणीपट्टी माहिती शोधा",
      searchSection: "बिल माहिती शोध विभाग",
      resultsHeading: "शोध परिणाम",
      consumerNumber: "ग्राहक क्रमांक",
      ownerName: "ग्राहकाचे नाव",
      mobileNumber: "मोबाइल क्रमांक",
      wardNumber: "वॉर्ड क्रमांक",
      propertyNumber: "मालमत्ता क्र.",
      linkedConnections: "जोडलेली कनेक्शन",
      noResults: "माहिती उपलब्ध नाही",
      selectConnection: "निवडा",
      waterBillPayment: "पाणीपट्टी भरणा",
      newConnectionPayment: "नवीन जोडणी भरणा",
      filters: {
        consumer: "ग्राहक क्र.",
        upic: "सांकेतांक क्रं",
        ward: "प्रभाग क्रं/ मालमत्ता क्रं",
        contact: "संपर्क क्र.",
        name: "ग्राहकाचे नाव",
        application: "अर्ज क्र.",
      },
      searchTitles: {
        consumer: "ग्राहक क्रमांक नुसार शोधा",
        upic: "सांकेतांक क्रं नुसार शोधा",
        ward: "वॉर्ड क्र. व मालमत्ता क्र. नुसार शोधा",
        contact: "संपर्क क्रमांक नुसार शोधा",
        name: "ग्राहकाचे नाव नुसार शोधा",
        application: "अर्ज क्रमांक नुसार शोधा",
      },
      placeholders: {
        consumer: "ग्राहक",
        upic: "सांकेतांक क्रं प्रविष्ट करा",
        wardNo: "वॉर्ड क्रमांक निवडा",
        propertyNo: "मालमत्ता क्रमांक प्रविष्ट करा",
        contact: "संपर्क क्रमांक प्रविष्ट करा",
        name: "ग्राहकाचे नाव प्रविष्ट करा",
        application: "अर्ज क्रमांक प्रविष्ट करा",
      },
      search: "शोधा",
      help: "मदत",
      clear: "रीसेट करा",
      ocrUpload: "बिल स्कॅन करा",
      helpTexts: {
        consumer:
          "आपला ग्राहक क्रमांक आपल्या जुन्या बिलावर उपलब्ध आहे",
        upic: "सांकेतांक क्रं आपल्या मालमत्ता कार्डवर उपलब्ध आहे",
        ward: "वॉर्ड क्रमांक आणि मालमत्ता क्रमांक दोन्ही आवश्यक आहेत",
        contact: "नोंदणीकृत मोबाइल क्रमांक प्रविष्ट करा",
        name: "नोंदणीकृत ग्राहकाचे संपूर्ण नाव प्रविष्ट करा",
        application:
          "आपला अर्ज क्रमांक आपल्या अर्ज पावतीवर उपलब्ध आहे",
      },
      aiPowered: "AI सक्षम",
      ocrScan: "OCR स्कॅन",
      smartSearch: "स्मार्ट शोध",
      techDesc: "AI व OCR तंत्रज्ञानासह जलद आणि अचूक परिणाम",
      filterTitle: "शोध पर्याय निवडा",
      gatewayCharges: "पेमेंट गेटवे शुल्क",
    },
    hi: {
      pageTitle: "अकोला नगर निगम",
      pageSubtitle: "ऑनलाइन पानी बिल भुगतान",
      searchInfo: "पानी बिल जानकारी खोजें",
      searchSection: "बिल जानकारी खोज अनुभाग",
      resultsHeading: "खोज परिणाम",
      consumerNumber: "ग्राहक संख्या",
      ownerName: "मालिक का नाम",
      mobileNumber: "मोबाइल नंबर",
      wardNumber: "वार्ड नं.",
      propertyNumber: "संपत्ति क्र.",
      linkedConnections: "जुड़े हुए कनेक्शन",
      noResults: "जानकारी उपलब्ध नहीं",
      selectConnection: "चुनें",
      waterBillPayment: "पानी बिल भुगतान",
      newConnectionPayment: "नया कनेक्शन भुगतान",
      filters: {
        consumer: "ग्राहक क्र.",
        upic: "सांकेतांक क्रं",
        ward: "वार्ड नं.",
        contact: "संपर्क नं.",
        name: "मालिक का नाम",
        application: "अर्ज क्र.",
      },
      searchTitles: {
        consumer: "ग्राहक संख्या से खोजें",
        upic: "सांकेतांक क्रं से खोजें",
        ward: "वार्ड नं. और संपत्ति नं. से खोजें",
        contact: "संपर्क संख्या से खोजें",
        name: "मालिक के नाम से खोजें",
        application: "अर्ज क्रमांक से खोजें",
      },
      placeholders: {
        consumer: "ग्राहक संख्या दर्ज करें",
        upic: "सांकेतांक क्रं दर्ज करें",
        wardNo: "वार्ड संख्या चुनें",
        propertyNo: "संपत्ति संख्या दर्ज करें",
        contact: "संपर्क संख्या दर्ज करें",
        name: "मालिक का नाम दर्ज करें",
        application: "अर्ज क्रमांक दर्ज करें",
      },
      search: "शोधा",
      help: "मदत",
      clear: "रीसेट करा",
      ocrUpload: "बिल स्कॅन करा",
      helpTexts: {
        consumer:
          "आपका ग्राहक नंबर आपके पुराने बिल पर उपलब्ध है",
        upic: "सांकेतांक क्रं आपके संपत्ति कार्ड पर उपलब्ध है",
        ward: "वार्ड संख्या और संपत्ति संख्या दोनों आवश्यक हैं",
        contact: "पंजीकृत मोबाइल नंबर दर्ज करें",
        name: "पंजीकृत मालिक का पूरा नाम दर्ज करें",
        application:
          "आपका अर्ज क्रमांक आपकी अर्ज पावती पर उपलब्ध है",
      },
      aiPowered: "AI सक्षम",
      ocrScan: "OCR स्कॅन",
      smartSearch: "स्मार्ट शोध",
      techDesc: "AI और OCR तकनीक के साथ तेज़ और सटीक परिणाम",
      filterTitle: "खोज विकल्प चुनें",
      gatewayCharges: "भुगतान गेटवे शुल्क",
    },
    en: {
      pageTitle: "Akola Municipal Corporation",
      pageSubtitle: "Online Water Bill Payment",
      searchInfo: "Water Bill Information Search",
      searchSection: "Bill Information Search Section",
      resultsHeading: "Search Results",
      consumerNumber: "Consumer Number",
      ownerName: "Owner Name",
      mobileNumber: "Mobile Number",
      wardNumber: "Ward Number",
      propertyNumber: "Property No",
      linkedConnections: "Linked Connections",
      noResults: "No information available",
      selectConnection: "Select",
      waterBillPayment: "Water Bill Payment",
      newConnectionPayment: "New Connection Payment",
      filters: {
        consumer: "Consumer No",
        upic: "UPIC ID",
        ward: "Ward No",
        contact: "Contact No",
        name: "Owner Name",
        application: "Application No",
      },
      searchTitles: {
        consumer: "Search by Consumer Number",
        upic: "Search by UPIC ID",
        ward: "Search by Ward & Property Number",
        contact: "Search by Contact Number",
        name: "Search by Owner Name",
        application: "Search by Application Number",
      },
      placeholders: {
        consumer: "Enter Consumer Number",
        upic: "Enter UPIC ID",
        wardNo: "Select Ward Number",
        propertyNo: "Enter Property Number",
        contact: "Enter Contact Number",
        name: "Enter Owner Name",
        application: "Enter Application Number",
      },
      search: "Search",
      help: "Help",
      clear: "Clear",
      ocrUpload: "Scan Bill",
      helpTexts: {
        consumer:
          "Your consumer number is available on your old bill",
        upic: "UPIC ID is available on your property card",
        ward: "Both Ward Number and Property Number are required",
        contact: "Enter registered mobile number",
        name: "Enter registered owner full name",
        application:
          "Your application number is available on your application form",
      },
      aiPowered: "AI Powered",
      ocrScan: "OCR Scan",
      smartSearch: "Smart Search",
      techDesc:
        "Fast and accurate results with AI & OCR technology",
      filterTitle: "Select Search Option",
      gatewayCharges: "Payment Gateway Charges",
    },
  };

  const t = translations[language];

  // Ward list - can be fetched from API in real implementation
  const wards = Array.from({ length: 20 }, (_, i) => ({
    value: `ward-${i + 1}`,
    label: `${language === "mr" ? "प्रभाग" : language === "hi" ? "वार्ड" : "Ward"} ${i + 1}`,
  }));

  const handleSearch = () => {
    // Check if we have valid input
    const hasValidInput =
      activeFilter === "ward"
        ? selectedWard && secondaryInput.trim()
        : consumerNo.trim();

    if (hasValidInput) {
      // Check if this is a direct consumer number search
      if (activeFilter === "consumer" && consumerNo.trim()) {
        // Direct search - go straight to payment view
        onSearch(consumerNo.trim());
        return;
      }

      setIsSearching(true);
      setShowResults(false);

      // Simulate search delay
      setTimeout(() => {
        const results =
          mockResults[
            activeFilter as keyof typeof mockResults
          ] || [];
        setSearchResults(results);
        setShowResults(true);
        setIsSearching(false);
      }, 1000);
    }
  };

  const handleClear = () => {
    setConsumerNo("");
    setSecondaryInput("");
    setSelectedWard("");
    setShowResults(false);
    setSearchResults([]);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    handleClear();
  };

  const handleSelectConnection = (consumerId: string) => {
    onSearch(consumerId);
  };

  const filterIcons = {
    consumer: User,
    upic: CreditCard,
    ward: MapPin,
    contact: Phone,
    name: FileText,
    application: Hash,
  };

  const filterColors = {
    consumer: {
      bg: "bg-gradient-to-br from-blue-500 to-cyan-500",
      bgLight:
        "bg-gradient-to-br from-blue-50 via-white to-cyan-50",
      border: "border-blue-400",
      text: "text-blue-600",
      hover: "hover:bg-blue-50",
      glow: "shadow-blue-400/50",
      accent: "from-blue-400 to-cyan-400",
    },
    upic: {
      bg: "bg-gradient-to-br from-purple-500 to-pink-500",
      bgLight:
        "bg-gradient-to-br from-purple-50 via-white to-pink-50",
      border: "border-purple-400",
      text: "text-purple-600",
      hover: "hover:bg-purple-50",
      glow: "shadow-purple-400/50",
      accent: "from-purple-400 to-pink-400",
    },
    ward: {
      bg: "bg-gradient-to-br from-orange-500 to-amber-500",
      bgLight:
        "bg-gradient-to-br from-orange-50 via-white to-amber-50",
      border: "border-orange-400",
      text: "text-orange-600",
      hover: "hover:bg-orange-50",
      glow: "shadow-orange-400/50",
      accent: "from-orange-400 to-amber-400",
    },
    contact: {
      bg: "bg-gradient-to-br from-green-500 to-emerald-500",
      bgLight:
        "bg-gradient-to-br from-green-50 via-white to-emerald-50",
      border: "border-green-400",
      text: "text-green-600",
      hover: "hover:bg-green-50",
      glow: "shadow-green-400/50",
      accent: "from-green-400 to-emerald-400",
    },
    name: {
      bg: "bg-gradient-to-br from-indigo-500 to-violet-500",
      bgLight:
        "bg-gradient-to-br from-indigo-50 via-white to-violet-50",
      border: "border-indigo-400",
      text: "text-indigo-600",
      hover: "hover:bg-indigo-50",
      glow: "shadow-indigo-400/50",
      accent: "from-indigo-400 to-violet-400",
    },
    application: {
      bg: "bg-gradient-to-br from-gray-500 to-gray-700",
      bgLight:
        "bg-gradient-to-br from-gray-50 via-white to-gray-70",
      border: "border-gray-400",
      text: "text-gray-600",
      hover: "hover:bg-gray-50",
      glow: "shadow-gray-400/50",
      accent: "from-gray-400 to-gray-700",
    },
  };

  const currentColor =
    filterColors[activeFilter as keyof typeof filterColors];

  return (
    <div
      id="waterbill-search"
      className="h-full w-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden"
    >
      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-hidden p-2 sm:p-2.5">
        <div className="max-w-[1600px] mx-auto h-full flex flex-col lg:flex-row gap-2">
          {/* Sidebar Filters - Compact */}
          <motion.div
            id="search-sidebar"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-72 xl:w-80 rounded-xl shadow-xl border border-white/20 overflow-hidden flex flex-col"
            style={{
              backgroundImage: `url('https://img.freepik.com/premium-photo/drops-water-splashes-water-shape-abstract-background-concept_1066580-1569.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Full overlay for entire sidebar */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-indigo-900/15 to-purple-900/20" />

            {/* Header - Compact */}
            <div className="bg-gradient-to-r from-[#0D47A1] via-[#1565C0] to-[#2196F3] px-4 py-2.5 rounded-t-xl relative overflow-hidden z-10">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <h3
                key={`filter-title-${language}`}
                className="text-white flex items-center gap-2 relative z-10"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Search className="w-5 h-5" />
                </motion.div>
                {t.filterTitle}
              </h3>
            </div>

            {/* Payment Type Selector - Compact */}
            <div className="px-2.5 pt-2.5 pb-2 relative z-10">
              <div className="flex gap-1.5 bg-gray-100 p-1 rounded-xl">
                <motion.button
                  key={`bill-${language}`}
                  onClick={() => {
                    setPaymentType("bill");
                    setActiveFilter("consumer");
                    handleClear();
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 px-2.5 py-2 rounded-lg transition-all text-sm ${ 
                    paymentType === "bill"
                      ? "bg-gradient-to-r from-[#006BA6] to-[#0099DD] text-white shadow-md"
                      : "text-gray-600 hover:bg-white"
                  }`}
                >
                  {t.waterBillPayment}
                </motion.button>
                <motion.button
                  key={`newConnection-${language}`}
                  onClick={() => {
                    setPaymentType("newConnection");
                    setActiveFilter("application");
                    handleClear();
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 px-2.5 py-2 rounded-lg transition-all text-sm ${
                    paymentType === "newConnection"
                      ? "bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white shadow-md"
                      : "text-gray-600 hover:bg-white"
                  }`}
                >
                  {t.newConnectionPayment}
                </motion.button>
              </div>
            </div>

            {/* QR Code Animated GIF - Only visible for Water Bill Payment */}
            {paymentType === "bill" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="px-2.5 pb-2 relative z-10"
              >
                <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl border-2 border-blue-200 shadow-lg px-[11px] py-[0px]">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://test.amcwaterbill.org/images/gif/icons8-qr.gif"
                      alt="QR Code Scanner"
                      className="w-16 h-16 object-contain flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p
                        key={`qr-label-${language}`}
                        className="text-blue-700 font-medium text-sm text-left"
                      >
                        {t.ocrUpload}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Filter buttons - Compact */}
            <div className="flex-1 min-h-0 overflow-auto px-2.5 pb-2.5 relative z-10">
              <div className="space-y-1.5 relative z-10">
                {Object.entries(t.filters)
                  .filter(([key]) =>
                    paymentType === "bill"
                      ? key !== "application"
                      : key === "application",
                  )
                  .map(([key, label], index) => {
                    const Icon =
                      filterIcons[
                        key as keyof typeof filterIcons
                      ];
                    const colors =
                      filterColors[
                        key as keyof typeof filterColors
                      ];
                    const isActive = activeFilter === key;

                    // Map filter keys to ID names
                    const filterIdMap: Record<string, string> =
                      {
                        consumer: "search-consumer",
                        upic: "search-upic",
                        ward: "search-ward",
                        contact: "search-contact",
                        name: "search-owner",
                        application: "search-application",
                      };

                    return (
                      <motion.button
                        key={`${key}-${language}`}
                        id={filterIdMap[key]}
                        onClick={() => handleFilterChange(key)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 3 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-300 overflow-hidden relative group ${
                          isActive
                            ? `${colors.bgLight} border-2 ${colors.border} shadow-lg ${colors.glow}`
                            : "bg-gradient-to-r from-white to-gray-50 border-2 border-gray-300 hover:border-blue-400 hover:shadow-lg text-gray-700 hover:from-blue-50 hover:to-indigo-50"
                        }`}
                      >
                        {/* Icon container with gradient */}
                        <motion.div
                          className={`p-1.5 rounded-lg relative shadow-md ${isActive ? colors.bg : "bg-gradient-to-br from-gray-100 to-gray-200"}`}
                          whileHover={{
                            rotate: [0, -10, 10, 0],
                            scale: 1.05,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon
                            className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-600"} relative z-10`}
                          />
                        </motion.div>

                        {/* Label */}
                        <span
                          className={`relative z-10 text-sm ${isActive ? colors.text : "text-gray-700"}`}
                        >
                          {label}
                        </span>

                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto"
                          >
                            <motion.div
                              className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                              animate={{
                                scale: [1, 1.2, 1],
                                boxShadow: [
                                  "0 0 0px rgba(34, 197, 94, 0)",
                                  "0 0 10px rgba(34, 197, 94, 0.6)",
                                  "0 0 0px rgba(34, 197, 94, 0)",
                                ],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                              }}
                            />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
              </div>
            </div>
          </motion.div>

          {/* Main Search Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden relative"
            style={{
              backgroundImage: `url('https://media.istockphoto.com/id/1463794661/vector/isometric-invoice-payment-for-cold-and-hot-water-utility-bills-and-saving-resources-concept.jpg?s=612x612&w=0&k=20&c=mbl2vF1UGwbQqaecT8vmMGn7hhiYL9wyWtfOJ1A3oO8=')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Animated gradient overlay - lighter for better background visibility */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-cyan-600/10 to-purple-600/15"
              animate={{
                background: [
                  "linear-gradient(to bottom right, rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.08), rgba(168, 85, 247, 0.15))",
                  "linear-gradient(to bottom right, rgba(168, 85, 247, 0.15), rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.08))",
                  "linear-gradient(to bottom right, rgba(6, 182, 212, 0.08), rgba(168, 85, 247, 0.15), rgba(59, 130, 246, 0.15))",
                  "linear-gradient(to bottom right, rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.08), rgba(168, 85, 247, 0.15))",
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            {/* Light overlay - much more transparent */}
            <div className="absolute inset-0 bg-white/30" />

            <div className="h-full flex flex-col overflow-hidden p-2.5 sm:p-3 relative z-10">
              <div
                className={`max-w-4xl mx-auto w-full flex flex-col gap-2.5 h-full overflow-hidden ${
                  showResults || isSearching ? "" : "pt-16"
                }`}
              >
                {/* Section Heading - More Compact */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-[#203F9A] via-[#2563EB] to-[#3B82F6] px-4 py-2.5 rounded-xl shadow-lg relative overflow-hidden flex-shrink-0"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <h2
                    key={`search-section-${language}`}
                    className="text-white text-center relative z-10 flex items-center justify-center gap-2"
                  >
                    <Search className="w-5 h-5" />
                    {t.searchSection}
                  </h2>
                </motion.div>

                {/* Input Fields - Compact */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeFilter}-${language}`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    {activeFilter === "ward" ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-600 z-10" />
                          <Select
                            value={selectedWard}
                            onValueChange={setSelectedWard}
                            disabled={isSearching}
                          >
                            <SelectTrigger className="h-11 w-full pl-11 border-2 border-orange-300 focus:border-orange-500 rounded-xl shadow-lg hover:shadow-xl transition-all bg-white">
                              <SelectValue
                                placeholder={
                                  t.placeholders.wardNo
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {wards.map((ward) => (
                                <SelectItem
                                  key={ward.value}
                                  value={ward.value}
                                >
                                  {ward.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="relative">
                          <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-600 z-10" />
                          <Input
                            value={secondaryInput}
                            onChange={(e) =>
                              setSecondaryInput(e.target.value)
                            }
                            placeholder={
                              t.placeholders.propertyNo
                            }
                            className="h-11 w-full pl-11 border-2 border-orange-300 focus:border-orange-500 rounded-xl shadow-lg hover:shadow-xl transition-all bg-white"
                            onKeyDown={(e) =>
                              e.key === "Enter" &&
                              handleSearch()
                            }
                            disabled={isSearching}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        {(() => {
                          const Icon =
                            filterIcons[
                              activeFilter as keyof typeof filterIcons
                            ];
                          return (
                            <Icon
                              className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 ${currentColor.text} z-10`}
                            />
                          );
                        })()}
                        <Input
                          id="input-consumerno"
                          value={consumerNo}
                          onChange={(e) =>
                            setConsumerNo(e.target.value)
                          }
                          placeholder={
                            t.placeholders[
                              activeFilter as keyof typeof t.placeholders
                            ] || t.placeholders.consumer
                          }
                          className={`h-11 pl-12 pr-12 border-2 ${currentColor.border} focus:ring-2 focus:ring-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all bg-white`}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleSearch()
                          }
                          disabled={isSearching}
                        />
                        <motion.button
                          className={`absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:${currentColor.text} transition-colors`}
                          whileHover={{
                            scale: 1.2,
                            rotate: 180,
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Info
                            className="w-5 h-5"
                            title={
                              t.helpTexts[
                                activeFilter as keyof typeof t.helpTexts
                              ]
                            }
                          />
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Buttons - Responsive */}
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mt-3 sm:mt-4">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      id="btn-search"
                      onClick={handleSearch}
                      disabled={
                        (activeFilter === "ward"
                          ? !selectedWard ||
                            !secondaryInput.trim()
                          : !consumerNo.trim()) || isSearching
                      }
                      className={`transition-all px-2.5 sm:px-3 md:px-5 h-8 sm:h-9 md:h-10 rounded-lg shadow-lg hover:shadow-xl text-xs sm:text-sm ${
                        isSearching
                          ? "bg-[#006BA6] text-white animate-pulse"
                          : "bg-[#33A1FD] hover:bg-[#2196F3] text-white"
                      }`}
                    >
                      <Search className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
                      <span className="whitespace-nowrap">{t.search}</span>
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      id="btn-help"
                      onClick={() => setShowHelpGuide(true)}
                      className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 hover:from-purple-700 hover:via-violet-700 hover:to-purple-700 text-white px-2.5 sm:px-3 md:px-5 h-8 sm:h-9 md:h-10 rounded-lg shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm"
                    >
                      <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
                      <span className="whitespace-nowrap">{t.help}</span>
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      id="btn-clear"
                      onClick={handleClear}
                      className="bg-gradient-to-r from-slate-600 via-slate-700 to-slate-600 hover:from-slate-700 hover:via-slate-800 hover:to-slate-700 text-white px-2.5 sm:px-3 md:px-5 h-8 sm:h-9 md:h-10 rounded-lg shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
                      <span className="whitespace-nowrap">{t.clear}</span>
                    </Button>
                  </motion.div>
                </div>

                {/* Enhanced Loading State */}
                {isSearching && (
                  <motion.div
                    id="loading-state"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/95 backdrop-blur-xl border-2 border-blue-400 rounded-xl shadow-2xl overflow-hidden"
                  >
                    {/* Animated gradient header */}
                    <div className="relative bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 px-6 py-4 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <div className="relative z-10 flex items-center justify-center gap-3">
                        <Droplets className="w-6 h-6 text-white" />
                        <p className="text-white text-lg">
                          {language === "mr" && "शोधत आहे..."}
                          {language === "hi" && "खोज रहे हैं..."}
                          {language === "en" && "Searching..."}
                        </p>
                      </div>
                    </div>
                    
                    {/* Loading content */}
                    <div className="p-6">
                      <div className="flex justify-center mb-6">
                        <motion.div className="relative w-20 h-20">
                          {/* Outer ring */}
                          <motion.div
                            className="absolute inset-0 border-4 border-blue-200 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          {/* Inner ring */}
                          <motion.div
                            className="absolute inset-2 border-4 border-t-blue-600 border-r-transparent border-b-cyan-600 border-l-transparent rounded-full"
                            animate={{ rotate: -360 }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          {/* Center icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Search className="w-8 h-8 text-blue-600" />
                          </div>
                        </motion.div>
                      </div>
                      
                      <p className="text-gray-600 text-center text-sm mb-4">
                        {language === "mr" && "कृपया प्रतीक्षा करा..."}
                        {language === "hi" && "कृपया प्रतीक्षा करें..."}
                        {language === "en" && "Please wait..."}
                      </p>
                      
                      {/* Skeleton loader for table */}
                      <TableSkeleton rows={3} />
                    </div>
                  </motion.div>
                )}

                {/* Results Table */}
                {showResults &&
                  !isSearching &&
                  searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/95 backdrop-blur-xl border-2 border-blue-400 rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 px-4 py-3 relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <h3 className="text-white flex items-center gap-2 relative z-10">
                          <TrendingUp className="w-5 h-5" />
                          {t.resultsHeading} (
                          {searchResults.length}{" "}
                          {t.linkedConnections})
                        </h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                          <thead className="bg-[#0099DD] border-b-2 border-[#006BA6]">
                            <tr>
                              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-left text-white text-xs sm:text-sm">
                                {t.consumerNumber}
                              </th>
                              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-left text-white text-xs sm:text-sm">
                                {t.ownerName}
                              </th>
                              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-left text-white text-xs sm:text-sm">
                                {t.mobileNumber}
                              </th>
                              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-left text-white text-xs sm:text-sm">
                                {t.wardNumber}
                              </th>
                              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-left text-white text-xs sm:text-sm">
                                {t.propertyNumber}
                              </th>
                              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-center text-white text-xs sm:text-sm">
                                {t.selectConnection}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {searchResults.map(
                              (result, index) => (
                                <motion.tr
                                  key={result.id}
                                  initial={{
                                    opacity: 0,
                                    x: -10,
                                  }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay: index * 0.05,
                                  }}
                                  className="border-b border-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-300"
                                >
                                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-blue-700 text-xs sm:text-sm">
                                    {result.id}
                                  </td>
                                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-gray-800 text-xs sm:text-sm">
                                    {result.name}
                                  </td>
                                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-gray-700 text-xs sm:text-sm">
                                    {result.mobile}
                                  </td>
                                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-gray-700 text-xs sm:text-sm">
                                    {result.ward}
                                  </td>
                                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-gray-700 font-mono text-xs sm:text-sm">
                                    {result.propertyNo}
                                  </td>
                                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-center">
                                    <Button
                                      onClick={() =>
                                        handleSelectConnection(
                                          result.id,
                                        )
                                      }
                                      className="bg-[#33A1FD] hover:bg-[#2196F3] text-white px-3 sm:px-4 md:px-6 h-8 sm:h-9 rounded-lg shadow-md hover:shadow-lg transition-all text-xs sm:text-sm whitespace-nowrap"
                                    >
                                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
                                      <span className="hidden sm:inline">{t.selectConnection}</span>
                                      <span className="sm:hidden">Select</span>
                                    </Button>
                                  </td>
                                </motion.tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}

                {/* No Results */}
                {showResults &&
                  !isSearching &&
                  searchResults.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center bg-white/95 backdrop-blur-xl border-2 border-gray-300 rounded-xl p-6 shadow-lg"
                    >
                      <p className="text-gray-700">
                        {t.noResults}
                      </p>
                    </motion.div>
                  )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* User Guide Modal */}
      <UserGuideModal
        language={language}
        isOpen={showHelpGuide}
        onClose={() => setShowHelpGuide(false)}
        onStartTutorial={() => {
          setShowHelpGuide(false);
          // Tutorial functionality can be added here
        }}
      />
    </div>
  );
}