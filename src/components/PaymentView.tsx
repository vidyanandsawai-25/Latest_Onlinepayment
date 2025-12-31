import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  User,
  Gauge,
  FileText,
  Home,
  Wallet,
  Camera,
  ChevronDown,
  ChevronUp,
  CreditCard,
} from "lucide-react";
import { Language, ConsumerData } from "../App";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { ProcessingModal } from "./ProcessingModal";
import { BillHistoryModal } from "./BillHistoryModal";
import { ReceiptHistoryModal } from "./ReceiptHistoryModal";
import { PaymentSuccessScreen } from "./PaymentSuccessScreen";

interface PaymentViewProps {
  language: Language;
  data: ConsumerData;
  paymentSuccess: boolean;
  transactionId: string;
  onBackToSearch: () => void;
  onPayment: () => void;
}

export function PaymentView({
  language,
  data,
  paymentSuccess,
  transactionId,
  onBackToSearch,
  onPayment,
}: PaymentViewProps) {
  const [paymentType, setPaymentType] = useState<
    "pending" | "total" | "partial"
  >("total");
  const [partialAmount, setPartialAmount] = useState("");
  const [partialError, setPartialError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Collapse states for mobile
  const [isConsumerInfoExpanded, setIsConsumerInfoExpanded] =
    useState(true);
  const [isMeterPropertyExpanded, setIsMeterPropertyExpanded] =
    useState(false);
  const [isBillSummaryExpanded, setIsBillSummaryExpanded] =
    useState(true);

  // Modal states
  const [isBillHistoryOpen, setIsBillHistoryOpen] =
    useState(false);
  const [isReceiptHistoryOpen, setIsReceiptHistoryOpen] =
    useState(false);

  const translations = {
    mr: {
      title: "ऑनलाईन पाणीपट्टी भरणा",
      subtitle: "अकोला महानगरपालिका",
      backToSearch: "मागे जा",
      consumerConnection: "ग्राहक व कनेक्शन माहिती",
      consumerNo: "ग्राहक क्र.",
      oldConsumerNo: "जुना क्र.",
      propertyNo: "मालमत्ता क्र.",
      socketAccountNo: "सांकेतांक क्रं",
      name: "नाव",
      address: "पत्ता",
      mobileNo: "मोबाइल",
      connectionType: "कनेक्शन प्रकार",
      connectionCategory: "श्रेणी",
      connectionStatus: "स्थिती",
      billSummary: "बिल तपशील",
      billMonth: "बिल महिना / चालू तिमाही",
      billingPeriod: "मागील बिल कालावधी",
      currentCharges: "सध्याचे बिल",
      previousDue: "मागील थकबाकी",
      interest: "व्याज",
      discount: "सवलत",
      totalPayable: "एकूण देय रक्कम",
      paymentType: "पेमेंट प्रकार",
      paymentSuccess: "पेमेंट यशस्वी!",
      transactionId: "व्यवहार क्र.",
      transactionDate: "व्यवहार दिनांक",
      amountPaid: "भरलेली रक्कम",
      downloadReceipt: "पावती डाउनलोड करा",
      pendingOnly: "थकबाकी",
      totalAmount: "एकूण देय",
      partialPayment: "आंशिक पेमेंट",
      enterAmount: "रक्कम प्रविष्ट करा",
      payNow: "पेमेंट करा",
      mediaSection: "मीटर व मालमत्ता",
      meterPhoto: "मीटर फोटो",
      propertyPhoto: "मालमत्ता फोटो",
      statusActive: "सक्रिय",
      statusInactive: "निष्क्रिय",
      residential: "निवासी",
      commercial: "व्यावसायिक",
      industrial: "औद्योगिक",
      govt: "सरकारी",
      meter: "मीटर",
      noMeter: "नॉन-मीटर",
      currentMonth: "नोव्हेंबर",
      bill: "बिल",
      receipts: "पावत्या",
      noDueCertificate: "थकबाकी नसल्याचा दाखला",
      noDemandMessage: "तुमच्या खात्यावर कोणतेही थकबाकी नाही",
      noDemandTitle: "थकबाकी नाही",
      noDemandDescription:
        "अभिनंदन! तुमच्या खात्यावर कोणतेही देय रक्कम नाही. सर्व बिले भरली आहेत.",
      downloadCertificate: "दाखला डाउनलोड करा",
    },
    hi: {
      title: "ऑनलाइन पानी बिल भुगतान",
      subtitle: "अकोला नगर निगम",
      backToSearch: "वापस जाएं",
      consumerConnection: "ग्राहक व कनेक्शन जानकारी",
      consumerNo: "ग्राहक क्र.",
      oldConsumerNo: "पुराना क्र.",
      propertyNo: "संपत्ति क्र.",
      socketAccountNo: "सांकेतांक क्रं",
      name: "नाम",
      address: "पता",
      mobileNo: "मोबाइल",
      connectionType: "कनेक्शन प्रकार",
      connectionCategory: "श्रेणी",
      connectionStatus: "स्थिति",
      billSummary: "बिल विवरण",
      billMonth: "बिल महीना / चालू तिमाही",
      billingPeriod: "पिछली बिल अवधि",
      currentCharges: "वर्तमान बिल",
      previousDue: "पिछली बकाया",
      interest: "ब्याज",
      discount: "छूट",
      totalPayable: "कुल देय राशि",
      paymentType: "भुगतान प्रकार",
      paymentSuccess: "भुगतान सफल!",
      transactionId: "लेनदेन क्र.",
      transactionDate: "लेनदेन दिनांक",
      amountPaid: "भरली राशि",
      downloadReceipt: "रसीद डाउनलोड करें",
      pendingOnly: "बकाया",
      totalAmount: "कुल देय",
      partialPayment: "आंशिक भुगतान",
      enterAmount: "राशि दर्ज करें",
      payNow: "भुगतान करें",
      mediaSection: "मीटर व संपत्ति",
      meterPhoto: "मीटर फोटो",
      propertyPhoto: "संपत्ति फोटो",
      statusActive: "सक्रिय",
      statusInactive: "निष्क्रिय",
      residential: "आवासीय",
      commercial: "व्यावसायिक",
      industrial: "औद्योगिक",
      govt: "सरकारी",
      meter: "मीटर",
      noMeter: "नॉन-मीटर",
      currentMonth: "नवंबर",
      bill: "बिल",
      receipts: "रसीदें",
      noDueCertificate: "बकाया नहीं होने का प्रमाण पत्र",
      noDemandMessage: "आपके खाते पर कोई बकाया नहीं है",
      noDemandTitle: "कोई बकाया नहीं",
      noDemandDescription:
        "बधाई हो! आपके खाते पर कोई बकाया राशि नहीं है। सभी बिल भुगतान किए गए हैं।",
      downloadCertificate: "प्रमाण पत्र डाउनलोड करें",
    },
    en: {
      title: "Online Water Bill Payment",
      subtitle: "Akola Municipal Corporation",
      backToSearch: "Back to Search",
      consumerConnection: "Consumer & Connection Information",
      consumerNo: "Consumer No",
      oldConsumerNo: "Old Consumer No",
      propertyNo: "Property No",
      socketAccountNo: "UPIC ID",
      name: "Name",
      address: "Address",
      mobileNo: "Mobile",
      connectionType: "Connection Type",
      connectionCategory: "Category",
      connectionStatus: "Status",
      billSummary: "Bill Summary",
      billMonth: "Bill Month / Current Quarter",
      billingPeriod: "Previous Billing Period",
      currentCharges: "Current Charges",
      previousDue: "Previous Due",
      interest: "Interest",
      discount: "Discount",
      totalPayable: "Total Payable",
      paymentType: "Payment Type",
      paymentSuccess: "Payment Successful!",
      transactionId: "Transaction ID",
      transactionDate: "Transaction Date",
      amountPaid: "Amount Paid",
      downloadReceipt: "Download Receipt",
      pendingOnly: "Pending Only",
      totalAmount: "Total Amount",
      partialPayment: "Partial Payment",
      enterAmount: "Enter Amount",
      payNow: "Pay Now",
      mediaSection: "Meter & Property",
      meterPhoto: "Meter Photo",
      propertyPhoto: "Property Photo",
      statusActive: "Active",
      statusInactive: "Inactive",
      residential: "Residential",
      commercial: "Commercial",
      industrial: "Industrial",
      govt: "Government",
      meter: "Meter",
      noMeter: "No-Meter",
      currentMonth: "November",
      bill: "Bill",
      receipts: "Receipts",
      noDueCertificate: "No Due Certificate",
      noDemandMessage: "No Outstanding Dues on Your Account",
      noDemandTitle: "No Demand",
      noDemandDescription:
        "Congratulations! There are no outstanding dues on your account. All bills have been paid.",
      downloadCertificate: "Download Certificate",
    },
  };

  const t = translations[language];

  // Calculate bill amounts from data
  const previousDue = data.previousDueAmount || 0;
  const currentCharges = data.currentBillAmount || 0;
  const interest = data.interestAmount || 0;
  const discount = data.discountAmount || 0;
  const totalPayable = data.totalPayableAmount || 0;

  // Check if there's no demand
  const hasNoDemand = totalPayable <= 0;

  // Get payment amount based on selection
  const getPayableAmount = () => {
    if (paymentType === "pending") return previousDue;
    if (paymentType === "partial" && partialAmount) {
      return parseFloat(partialAmount) || 0;
    }
    return totalPayable;
  };

  const selectedPayableAmount = getPayableAmount();

  const handlePartialAmountChange = (value: string) => {
    setPartialAmount(value);
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setPartialError(
        language === "mr"
          ? "वैध रक्कम प्रविष्ट करा"
          : language === "hi"
            ? "मान्य राशि दर्ज करें"
            : "Enter valid amount",
      );
    } else if (numValue > totalPayable) {
      setPartialError(
        language === "mr"
          ? "रक्कम एकूण देय रकमेपेक्षा जास्त असू शकत नाही"
          : language === "hi"
            ? "राशि कुल देय से अधिक नहीं हो सकती"
            : "Amount cannot exceed total payable",
      );
    } else if (numValue <= 0) {
      setPartialError(
        language === "mr"
          ? "रक्कम 0 पेक्षा जास्त असणे आवश्यक आहे"
          : language === "hi"
            ? "राशि 0 से अधिक होनी चाहिए"
            : "Amount must be greater than 0",
      );
    } else {
      setPartialError("");
    }
  };

  const handlePayment = () => {
    if (
      paymentType === "partial" &&
      (partialError || !partialAmount)
    ) {
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPayment();
    }, 2000);
  };

  const getConnectionTypeLabel = (type: string) => {
    const labels: Record<string, Record<Language, string>> = {
      Residential: {
        en: "Residential",
        mr: t.residential,
        hi: t.residential,
      },
      Commercial: {
        en: "Commercial",
        mr: t.commercial,
        hi: t.commercial,
      },
      Industrial: {
        en: "Industrial",
        mr: t.industrial,
        hi: t.industrial,
      },
      Govt: { en: "Government", mr: t.govt, hi: t.govt },
    };
    return labels[type]?.[language] || type;
  };

  const getConnectionCategoryLabel = (category: string) => {
    const labels: Record<string, Record<Language, string>> = {
      Meter: { en: "Meter", mr: t.meter, hi: t.meter },
      "No-Meter": {
        en: "No-Meter",
        mr: t.noMeter,
        hi: t.noMeter,
      },
    };
    return labels[category]?.[language] || category;
  };

  // Override data to show no demand after successful payment
  const displayData = paymentSuccess 
    ? { ...data, totalPayableAmount: 0, previousDueAmount: 0, currentBillAmount: 0, interestAmount: 0 }
    : data;
  
  const displayTotalPayable = displayData.totalPayableAmount || 0;
  const displayHasNoDemand = paymentSuccess || displayTotalPayable <= 0;

  // If payment is successful, show only the success screen
  if (paymentSuccess) {
    return (
      <PaymentSuccessScreen
        language={language}
        data={data}
        transactionId={transactionId}
        totalPayable={totalPayable}
        onBackToSearch={onBackToSearch}
      />
    );
  }

  return (
    <div id="payment-view-container" className="h-screen w-full bg-gray-50 flex flex-col overflow-hidden">
      {/* Success Banner - Show after payment */}
      {paymentSuccess && (
        <div className="bg-[#4CAF50] shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Success Message Header */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
              >
                <CheckCircle2 className="w-7 h-7 text-white" />
              </motion.div>
              <div className="text-center">
                <p className="text-white font-bold text-lg sm:text-xl">
                  {t.paymentSuccess}
                </p>
                <p className="text-white/90 text-sm">
                  {language === "mr" && "तुमचे पेमेंट यशस्वीरित्या पूर्ण झाले आहे"}
                  {language === "hi" && "आपका भुगतान सफलतापूर्वक पूर्ण हो गया है"}
                  {language === "en" && "Your payment has been completed successfully"}
                </p>
              </div>
            </div>

            {/* Transaction Details Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 max-w-3xl mx-auto shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {/* Transaction ID */}
                <div className="flex items-baseline gap-2">
                  <span className="text-gray-600 text-sm whitespace-nowrap" style={{ fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif", fontWeight: 500 }}>
                    {t.transactionId}:
                  </span>
                  <span className="text-gray-900 text-sm font-mono" style={{ fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif", fontWeight: 600 }}>
                    {transactionId}
                  </span>
                </div>

                {/* Transaction Date */}
                <div className="flex items-baseline gap-2">
                  <span className="text-gray-600 text-sm whitespace-nowrap" style={{ fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif", fontWeight: 500 }}>
                    {t.transactionDate}:
                  </span>
                  <span className="text-gray-900 text-sm" style={{ fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif", fontWeight: 600 }}>
                    {new Date().toLocaleDateString(language === "mr" ? "mr-IN" : language === "hi" ? "hi-IN" : "en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                </div>

                {/* Amount Paid */}
                <div className="flex items-baseline gap-2">
                  <span className="text-gray-600 text-sm whitespace-nowrap" style={{ fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif", fontWeight: 500 }}>
                    {t.amountPaid}:
                  </span>
                  <span className="text-[#00A676] text-base" style={{ fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif", fontWeight: 700 }}>
                    ₹{totalPayable.toFixed(2)}
                  </span>
                </div>

                {/* Consumer Number */}
                <div className="flex items-baseline gap-2">
                  <span className="text-gray-600 text-sm whitespace-nowrap" style={{ fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif", fontWeight: 500 }}>
                    {t.consumerNo}:
                  </span>
                  <span className="text-gray-900 text-sm" style={{ fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif", fontWeight: 600 }}>
                    {data.consumerNo}
                  </span>
                </div>
              </div>

              {/* Download Receipt Button */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <button
                  onClick={() => {
                    // Mock receipt download
                    console.log('Downloading receipt for:', transactionId);
                  }}
                  className="w-full bg-gradient-to-r from-[#9C27B0] to-[#BA68C8] hover:from-[#7B1FA2] hover:to-[#9C27B0] text-white px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span style={{ fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif", fontWeight: 600, fontSize: "14px" }}>
                    {t.downloadReceipt}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discount Marquee Banner */}
      {!displayHasNoDemand && !paymentSuccess && (
        <div className="bg-[#4CAF50] py-1.5 shadow-md overflow-hidden flex-shrink-0">
          <div className="animate-marquee whitespace-nowrap">
            <span className="text-white text-xs sm:text-sm inline-block px-6 sm:px-8">
              🎉{" "}
              {language === "mr"
                ? "विशेष ऑफर! ऑनलाइन पेमेंटवर 10% सवलत मिळवा"
                : language === "hi"
                  ? "विशेष ऑफर! ऑनलाइन भुगतान पर 10% छूट प्राप्त करें"
                  : "Special Offer! Get 10% Discount on Online Payment"}{" "}
              💰
            </span>
            <span className="text-white text-xs sm:text-sm inline-block px-6 sm:px-8">
              ⚡{" "}
              {language === "mr"
                ? "त्वरित बिल भरणा - कोणतीही प्रतीक्षा नाही!"
                : language === "hi"
                  ? "तत्काल बिल भुगतान - कोई प्रतीक्षा नहीं!"
                  : "Instant Bill Payment - No Waiting!"}{" "}
              ⚡
            </span>
            <span className="text-white text-xs sm:text-sm inline-block px-6 sm:px-8">
              🎉{" "}
              {language === "mr"
                ? "विशेष ऑफर! ऑनलाइन पेमेंटवर 10% सवलत मिळवा"
                : language === "hi"
                  ? "विशेष ऑफर! ऑनलाइन भुगतान पर 10% छूट प्राप्त करें"
                  : "Special Offer! Get 10% Discount on Online Payment"}{" "}
              💰
            </span>
          </div>
        </div>
      )}

      {/* Main Content - 2×2 Grid with Narrow Right Column */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-1.5 sm:p-2 md:p-2.5 lg:p-3 xl:p-3">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[2fr_1fr] xl:grid-cols-[2fr_1fr] gap-1.5 sm:gap-2 md:gap-2 lg:gap-2.5 xl:gap-3">
          {/* ROW 1 LEFT: Consumer & Connection Information */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            {/* Header */}
            <div className="bg-[#33A1FD] px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 flex items-center gap-2">
              <User className="w-4 h-4 sm:w-5 md:w-5 text-white" />
              <h2
                className="text-white text-sm sm:text-sm md:text-base"
                style={{
                  fontFamily:
                    "'Inter', 'Noto Sans Devanagari', sans-serif",
                  fontWeight: 600,
                }}
              >
                {t.consumerConnection}
              </h2>
            </div>

            {/* Content - Table with Light Borders */}
            <div className="p-2 sm:p-3 md:p-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Two Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {/* Left Column */}
                  <div className="sm:border-r border-gray-200">
                    {/* Consumer No */}
                    <div className="flex items-baseline gap-2 px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5 border-b border-gray-200 hover:bg-blue-50/30 transition-all">
                      <span
                        className="text-gray-700 whitespace-nowrap text-sm"
                        style={{
                          fontFamily:
                            "'Inter', 'Noto Sans Devanagari', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {t.consumerNo}:
                      </span>
                      <span
                        className="text-gray-900 text-sm"
                        style={{
                          fontFamily:
                            "'Inter', 'Noto Sans Devanagari', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {data.consumerNo}
                      </span>
                    </div>

                    {/* Old Consumer No */}
                    <div className="flex items-baseline gap-2 px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5 border-b border-gray-200 hover:bg-blue-50/30 transition-all">
                      <span
                        className="text-gray-700 whitespace-nowrap text-xs sm:text-sm"
                        style={{
                          fontFamily:
                            "'Inter', 'Noto Sans Devanagari', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {t.oldConsumerNo}:
                      </span>
                      <span
                        className="text-gray-900 text-xs sm:text-sm"
                        style={{
                          fontFamily:
                            "'Inter', 'Noto Sans Devanagari', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        OLD-3456
                      </span>
                    </div>

                    {/* Name */}
                    <div className="flex items-baseline gap-2 px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5 border-b sm:border-b-0 border-gray-200 hover:bg-blue-50/30 transition-all">
                      <span
                        className="text-gray-700 whitespace-nowrap text-xs sm:text-sm"
                        style={{
                          fontFamily:
                            "'Inter', 'Noto Sans Devanagari', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {t.name}:
                      </span>
                      <span
                        className="text-gray-900 text-xs sm:text-sm"
                        style={{
                          fontFamily:
                            "'Inter', 'Noto Sans Devanagari', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {language === "mr"
                          ? "राजेश कुमार शर्मा"
                          : "Rajesh Kumar Sharma"}
                      </span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    {/* Property No */}
                    <div className="flex items-baseline gap-2 px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5 border-b border-gray-200 hover:bg-blue-50/30 transition-all">
                      <span
                        className="text-gray-700 whitespace-nowrap text-xs sm:text-sm"
                        style={{
                          fontFamily:
                            "'Inter', 'Noto Sans Devanagari', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {t.propertyNo}:
                      </span>
                      <span
                        className="text-gray-900 text-xs sm:text-sm"
                        style={{
                          fontFamily:
                            "'Inter', 'Noto Sans Devanagari', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        A1-189-1
                      </span>
                    </div>

                    {/* Socket Account No */}
                    <div className="flex items-baseline gap-2 px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5 border-b border-gray-200 hover:bg-blue-50/30 transition-all">
                      <span
                        className="text-gray-700 whitespace-nowrap text-xs sm:text-sm"
                        style={{
                          fontFamily:
                            "'Inter', 'Noto Sans Devanagari', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {t.socketAccountNo}:
                      </span>
                      <span
                        className="text-gray-900 text-xs sm:text-sm"
                        style={{
                          fontFamily:
                            "'Inter', 'Noto Sans Devanagari', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        AKLMC000047
                      </span>
                    </div>

                    {/* Mobile No */}
                    <div className="flex items-baseline gap-2 px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5 border-b sm:border-b-0 border-gray-200 hover:bg-blue-50/30 transition-all">
                      <span
                        className="text-gray-700 whitespace-nowrap text-xs sm:text-sm"
                        style={{
                          fontFamily:
                            "'Inter', 'Noto Sans Devanagari', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {t.mobileNo}:
                      </span>
                      <span
                        className="text-gray-900 text-xs sm:text-sm"
                        style={{
                          fontFamily:
                            "'Inter', 'Noto Sans Devanagari', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        +91 9876543210
                      </span>
                    </div>
                  </div>
                </div>

                {/* Email Row - Full Width */}
                <div className="flex items-baseline gap-2 px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5 border-t border-gray-200 hover:bg-blue-50/30 transition-all">
                  <span
                    className="text-gray-700 whitespace-nowrap text-xs sm:text-sm"
                    style={{
                      fontFamily:
                        "'Inter', 'Noto Sans Devanagari', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {language === "mr"
                      ? "ईमेल"
                      : language === "hi"
                        ? "ईमेल"
                        : "Email"}
                    :
                  </span>
                  <span
                    className="text-gray-900 text-xs sm:text-sm"
                    style={{
                      fontFamily:
                        "'Inter', 'Noto Sans Devanagari', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    rajesh.s@email.com
                  </span>
                </div>

                {/* Address Row - Full Width */}
                <div className="flex items-baseline gap-2 px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5 border-t border-gray-200 hover:bg-blue-50/30 transition-all">
                  <span
                    className="text-gray-700 whitespace-nowrap text-xs sm:text-sm"
                    style={{
                      fontFamily:
                        "'Inter', 'Noto Sans Devanagari', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {t.address}:
                  </span>
                  <span
                    className="text-gray-900 leading-snug text-xs sm:text-sm"
                    style={{
                      fontFamily:
                        "'Inter', 'Noto Sans Devanagari', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {language === "mr"
                      ? "१२३, गांधी नगर, प्रभाग क्र. ५, अकोला - ४४४००१"
                      : "123, Gandhi Nagar, Ward No. 5, Akola - 444001"}
                  </span>
                </div>

                {/* Connection Type, Category and Status Row - 3 Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-gray-200">
                  {/* Connection Type */}
                  <div className="flex items-baseline gap-2 px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5 border-b sm:border-b-0 sm:border-r border-gray-200 hover:bg-blue-50/30 transition-all">
                    <span
                      className="text-gray-700 whitespace-nowrap text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {t.connectionType}:
                    </span>
                    <span
                      className="text-gray-900 text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {getConnectionTypeLabel(
                        data.connectionType,
                      )}
                    </span>
                  </div>

                  {/* Connection Category */}
                  <div className="flex items-baseline gap-2 px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5 border-b sm:border-b-0 sm:border-r border-gray-200 hover:bg-blue-50/30 transition-all">
                    <span
                      className="text-gray-700 whitespace-nowrap text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {t.connectionCategory}:
                    </span>
                    <span
                      className="text-gray-900 text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {getConnectionCategoryLabel(
                        data.connectionCategory,
                      )}
                    </span>
                  </div>

                  {/* Connection Status */}
                  <div className="flex items-baseline gap-2 px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5 hover:bg-blue-50/30 transition-all">
                    <span
                      className="text-gray-700 whitespace-nowrap text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {t.connectionStatus}:
                    </span>
                    <span
                      className={`inline-flex px-3.5 py-1.5 rounded-full w-fit transition-all shadow-sm ${
                        data.connectionStatus === "Active"
                          ? "bg-[#00A676]/15 text-[#00A676] hover:bg-[#00A676]/25"
                          : "bg-[#E53935]/15 text-[#E53935] hover:bg-[#E53935]/25"
                      }`}
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 600,
                        fontSize: "14px",
                      }}
                    >
                      {data.connectionStatus === "Active"
                        ? t.statusActive
                        : t.statusInactive}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ROW 1 RIGHT: Meter & Property Photos */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="hidden md:block bg-white border-2 border-[#9C27B0] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Header - Clickable on Mobile */}
            <button
              onClick={() =>
                setIsMeterPropertyExpanded(
                  !isMeterPropertyExpanded,
                )
              }
              className="w-full bg-gradient-to-r from-[#9C27B0] to-[#BA68C8] px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-t-xl flex items-center justify-between gap-2 lg:cursor-default"
            >
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 sm:w-5 md:w-5 text-white" />
                <h2 className="text-white text-xs sm:text-sm md:text-base">{t.mediaSection}</h2>
              </div>
              {/* Chevron - Only visible on mobile/tablet */}
              <div className="lg:hidden">
                {isMeterPropertyExpanded ? (
                  <ChevronUp className="w-5 h-5 text-white" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white" />
                )}
              </div>
            </button>

            {/* Content - Collapsible on Mobile */}
            <div
              className={`${isMeterPropertyExpanded ? "block" : "hidden lg:block"}`}
            >
              {/* Two Photos Side by Side with Details Below */}
              <div className="grid grid-cols-2 gap-2">
                {/* LEFT: Meter Photo + Details */}
                <div className="space-y-2">
                  {/* Meter Photo */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300 group cursor-pointer">
                    <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      {data.meterImage ? (
                        <img
                          src={data.meterImage}
                          alt="Meter"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-center text-[#9C27B0] group-hover:text-[#7B1FA2] transition-colors">
                          <Gauge className="w-10 h-10 mx-auto mb-1" />
                          <p className="text-xs">
                            {t.meterPhoto}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="bg-[#33A1FD] px-2 py-1.5 text-center">
                      <p className="text-xs text-white" style={{ fontWeight: 500 }}>
                        {t.meterPhoto}
                      </p>
                    </div>
                  </div>

                  {/* Meter Details */}
                  <div className="bg-gray-50 rounded-lg p-1.5 sm:p-2 border border-gray-200 overflow-hidden">
                    <table className="w-full text-xs">
                      <tbody className="divide-y divide-gray-200">
                        <tr className="group hover:bg-blue-50 transition-colors">
                          <td className="py-1 text-gray-600 whitespace-nowrap">
                            {language === "mr"
                              ? "मीटर क्र."
                              : language === "hi"
                                ? "मीटर नं"
                                : "Meter No"}
                          </td>
                          <td className="py-1 text-gray-900 text-right group-hover:text-[#006BA6] transition-colors">
                            MTR-45892341
                          </td>
                        </tr>

                        <tr className="group hover:bg-blue-50 transition-colors">
                          <td className="py-1 text-gray-600 whitespace-nowrap">
                            {language === "mr"
                              ? "मागील रीडिंग"
                              : language === "hi"
                                ? "पिछला रीडिंग"
                                : "Previous Reading"}
                          </td>
                          <td className="py-1 text-gray-900 text-right group-hover:text-[#006BA6] transition-colors">
                            12,450
                          </td>
                        </tr>

                        <tr className="group hover:bg-blue-50 transition-colors">
                          <td className="py-1 text-gray-600 whitespace-nowrap">
                            {language === "mr"
                              ? "सध्याचे रीडिंग"
                              : language === "hi"
                                ? "वर्तमान रीडिंग"
                                : "Current Reading"}
                          </td>
                          <td className="py-1 text-gray-900 text-right group-hover:text-[#006BA6] transition-colors">
                            14,680
                          </td>
                        </tr>

                        <tr className="group hover:bg-blue-50 transition-colors">
                          <td className="py-1 text-gray-600 whitespace-nowrap">
                            {language === "mr"
                              ? "एकूण वापर"
                              : language === "hi"
                                ? "कुल उपयोग"
                                : "Total Usage"}
                          </td>
                          <td className="py-1 text-[#006BA6] text-right font-medium group-hover:text-[#004A85] transition-colors">
                            30 U
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* RIGHT: Property Photo + Action Buttons */}
                <div className="space-y-2.5">
                  {/* Property Photo */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300 group cursor-pointer">
                    <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      {data.propertyImage ? (
                        <img
                          src={data.propertyImage}
                          alt="Property"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-center text-[#9C27B0] group-hover:text-[#7B1FA2] transition-colors">
                          <Home className="w-10 h-10 mx-auto mb-1" />
                          <p className="text-xs">
                            {t.propertyPhoto}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="bg-[#33A1FD] px-2 py-1.5 text-center">
                      <p className="text-xs text-white" style={{ fontWeight: 500 }}>
                        {t.propertyPhoto}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {/* Bill Button */}
                    <button
                      onClick={() => setIsBillHistoryOpen(true)}
                      className="w-full bg-gradient-to-r from-[#0066CC] to-[#0080FF] hover:from-[#005BB5] hover:to-[#0066CC] text-white px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                    >
                      <FileText className="w-4 h-4" />
                      <span
                        style={{
                          fontFamily:
                            "'Inter', 'Noto Sans Devanagari', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {t.bill}
                      </span>
                    </button>

                    {/* Receipts Button */}
                    <button
                      onClick={() =>
                        setIsReceiptHistoryOpen(true)
                      }
                      className="w-full bg-gradient-to-r from-[#00A676] to-[#00C896] hover:from-[#00875A] hover:to-[#00A676] text-white px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                    >
                      <FileText className="w-4 h-4" />
                      <span
                        style={{
                          fontFamily:
                            "'Inter', 'Noto Sans Devanagari', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {t.receipts}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ROW 2 LEFT: Bill Details */}
          {!displayHasNoDemand ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Header */}
              <div className="bg-[#33A1FD] px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 flex items-center gap-2">
                <FileText className="w-4 h-4 sm:w-5 md:w-5 text-white" />
                <h2
                  className="text-white text-xs sm:text-sm md:text-base"
                  style={{
                    fontFamily:
                      "'Inter', 'Noto Sans Devanagari', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {t.billSummary}
                </h2>
              </div>

              {/* Content - Table with Light Borders */}
              <div className="p-2 sm:p-3 md:p-4">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Bill Month */}
                  <div className="flex justify-between items-center px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5 border-b border-gray-200 hover:bg-gray-50/50 transition-all">
                    <span className="text-gray-700 text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500,
                      }}>
                      {t.billMonth}
                    </span>
                    <span className="text-gray-900 text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 600,
                      }}>
                      {t.currentMonth} 2024
                    </span>
                  </div>

                  {/* Billing Period */}
                  <div className="flex justify-between items-center px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5 border-b border-gray-200 hover:bg-gray-50/50 transition-all">
                    <span className="text-gray-700 text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500,
                      }}>
                      {t.billingPeriod}
                    </span>
                    <span className="text-gray-900 text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 600,
                      }}>
                      01/10/2024 – 31/10/2024
                    </span>
                  </div>

                  {/* Current Charges */}
                  <div className="flex justify-between items-center px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5 border-b border-gray-200 hover:bg-gray-50/50 transition-all">
                    <span className="text-gray-700 text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500,
                      }}>
                      {t.currentCharges}
                    </span>
                    <span className="text-gray-900 text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 600,
                      }}>
                      30 U × ₹12.00 = ₹{currentCharges.toFixed(2)}
                    </span>
                  </div>

                  {/* Previous Due */}
                  <div className="flex justify-between items-center px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5 border-b border-gray-200 bg-red-50/30 hover:bg-red-50/50 transition-all">
                    <span className="text-gray-700 text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500,
                      }}>
                      {t.previousDue}
                    </span>
                    <span className="text-[#E53935] text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 600,
                      }}>
                      ₹{previousDue.toFixed(2)}
                    </span>
                  </div>

                  {/* Interest */}
                  <div className="flex justify-between items-center px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5 border-b border-gray-200 hover:bg-red-50/30 transition-all">
                    <span className="text-gray-700 text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500,
                      }}>
                      {t.interest}
                    </span>
                    <span className="text-[#E53935] text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 600,
                      }}>
                      +₹{interest.toFixed(2)}
                    </span>
                  </div>

                  {/* Discount */}
                  <div className="flex justify-between items-center px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5 border-b border-gray-200 bg-green-50/30 hover:bg-green-50/50 transition-all">
                    <span className="text-gray-700 text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500,
                      }}>
                      {t.discount}
                    </span>
                    <span className="text-[#00A676] text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 600,
                      }}>
                      ₹{discount.toFixed(2)}
                    </span>
                  </div>

                  {/* Total Payable - Highlighted */}
                  <div className="flex justify-between items-center px-2 sm:px-3 md:px-3 py-2 sm:py-2.5 md:py-3 bg-[#00A676]/10 hover:bg-[#00A676]/20 transition-all">
                    <span
                      className="text-[#00A676]"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 600,
                        fontSize: "15px",
                      }}
                    >
                      {t.totalPayable}
                    </span>
                    <span
                      className="text-[#00A676]"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 700,
                        fontSize: "18px",
                      }}
                    >
                      ₹{totalPayable.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            // No Demand Message - Spans both columns
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#4CAF50] px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 md:w-5 text-white" />
                <h2
                  className="text-white text-xs sm:text-sm md:text-base"
                  style={{
                    fontFamily:
                      "'Inter', 'Noto Sans Devanagari', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {t.noDemandTitle}
                </h2>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4 text-center space-y-2 sm:space-y-3">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-16 h-16 bg-[#00A676]/10 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 className="w-10 h-10 text-[#00A676]" />
                </motion.div>

                {/* Message */}
                <div className="space-y-1.5">
                  <h3
                    className="text-xl text-[#00A676]"
                    style={{
                      fontFamily:
                        "'Inter', 'Noto Sans Devanagari', sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    {t.noDemandTitle}
                  </h3>
                  <p
                    className="text-gray-700 text-base max-w-2xl mx-auto"
                    style={{
                      fontFamily:
                        "'Inter', 'Noto Sans Devanagari', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {t.noDemandDescription}
                  </p>
                </div>
                {/* Download Certificate Button */}
                <div className="pt-2">
                  <Button
                    className="bg-[#FF9800] hover:bg-[#F57C00] text-white px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all text-sm"
                    style={{
                      fontFamily:
                        "'Inter', 'Noto Sans Devanagari', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {t.downloadCertificate}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ROW 2 RIGHT: Payment Type */}
          {!displayHasNoDemand && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col"
            >
              {/* Header */}
              <div className="bg-[#33A1FD] px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 flex items-center gap-2">
                <Wallet className="w-4 h-4 sm:w-5 md:w-5 text-white" />
                <h2
                  className="text-white text-xs sm:text-sm md:text-base"
                  style={{
                    fontFamily:
                      "'Inter', 'Noto Sans Devanagari', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {t.paymentType}
                </h2>
              </div>

              {/* Content */}
              <div className="p-2 sm:p-3 md:p-4 space-y-1.5 sm:space-y-2 flex-1 flex flex-col">
                {/* Payment Type Options */}
                <div className="space-y-2 flex-1">
                  {/* Pending Only */}
                  <label className="flex items-center gap-2.5 p-2 border border-[#E0E0E0] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentType"
                      checked={paymentType === "pending"}
                      onChange={() => setPaymentType("pending")}
                      className="w-3 h-3 text-[#F57C00]"
                    />
                    <span className="flex-1 text-sm text-gray-700">
                      {t.pendingOnly}
                    </span>
                    <span className="text-sm text-[#E53935]">
                      ₹{previousDue.toFixed(2)}
                    </span>
                  </label>

                  {/* Total Amount */}
                  <label className="flex items-center gap-2.5 p-2 border border-[#E0E0E0] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentType"
                      checked={paymentType === "total"}
                      onChange={() => setPaymentType("total")}
                      className="w-3 h-3 text-[#F57C00]"
                    />
                    <span className="flex-1 text-sm text-gray-700">
                      {t.totalAmount}
                    </span>
                    <span className="text-sm text-[#00A676]">
                      ₹{totalPayable.toFixed(2)}
                    </span>
                  </label>

                  {/* Partial Payment */}
                  <label className="flex items-center gap-2.5 p-2 border border-[#E0E0E0] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentType"
                      checked={paymentType === "partial"}
                      onChange={() => setPaymentType("partial")}
                      className="w-3 h-3 text-[#F57C00]"
                    />
                    <span className="flex-1 text-sm text-gray-700">
                      {t.partialPayment}
                    </span>
                  </label>

                  {/* Partial Amount Input */}
                  {paymentType === "partial" && (
                    <div className="ml-6 space-y-1">
                      <input
                        type="text"
                        placeholder={`₹ ${t.enterAmount}`}
                        value={partialAmount}
                        onChange={(e) =>
                          handlePartialAmountChange(
                            e.target.value,
                          )
                        }
                        className={`w-full px-2.5 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                          partialError
                            ? "border-[#E53935] focus:ring-[#E53935]/20"
                            : "border-[#E0E0E0] focus:ring-[#005A9C]/20"
                        }`}
                      />
                      {partialError && (
                        <p className="text-xs text-[#E53935]">
                          {partialError}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Pay Button - Primary CTA */}
                <Button
                  onClick={handlePayment}
                  disabled={
                    paymentType === "partial" &&
                    (!partialAmount || !!partialError)
                  }
                  className="w-full bg-[#4CAF50] hover:bg-[#43A047] text-white py-3 rounded-lg shadow-md hover:shadow-lg transition-all text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    fontFamily:
                      "'Inter', 'Noto Sans Devanagari', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  {t.payNow} ₹{selectedPayableAmount.toFixed(2)}
                </Button>
              </div>
            </motion.div>
          )}
          </div>
        </div>
      </div>

      {/* Processing Modal */}
      <ProcessingModal
        language={language}
        isOpen={isProcessing}
        amount={selectedPayableAmount}
        paymentMethod="upi"
      />

      {/* Bill History Modal */}
      <BillHistoryModal
        language={language}
        isOpen={isBillHistoryOpen}
        onClose={() => setIsBillHistoryOpen(false)}
        consumerNo={data.consumerNo}
      />

      {/* Receipt History Modal */}
      <ReceiptHistoryModal
        language={language}
        isOpen={isReceiptHistoryOpen}
        onClose={() => setIsReceiptHistoryOpen(false)}
        consumerNo={data.consumerNo}
      />
    </div>
  );
}