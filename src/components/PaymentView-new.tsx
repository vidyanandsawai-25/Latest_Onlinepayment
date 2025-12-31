import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Download,
  Printer,
  Smartphone,
  Building2,
  Sparkles,
  User,
  Gauge,
  FileText,
  Phone,
  Mail,
  MapPin,
  Home,
  Wallet,
  X,
  Camera,
} from "lucide-react";
import { Language, ConsumerData } from "../App";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { PaymentConfirmModal } from "./PaymentConfirmModal";
import { ContactDetailsModal } from "./ContactDetailsModal";
import { BillHistoryModal } from "./BillHistoryModal";
import waterBillBg from "figma:asset/32a53904cdb2f84aba99f830aa52e4f10dd2974d.png";

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
  const [paymentMethod, setPaymentMethod] = useState<
    "upi" | "netbanking" | "card" | null
  >(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [showPropertyPreview, setShowPropertyPreview] = useState(false);
  const [paymentSelection, setPaymentSelection] = useState<"pending" | "current" | "both">("both");
  const [showMapModal, setShowMapModal] = useState(false);
  const [showBillHistory, setShowBillHistory] = useState(false);
  const [showReceiptHistory, setShowReceiptHistory] = useState(false);
  const [contactDetails, setContactDetails] = useState({
    mobile: data.mobileNo || "",
    email: data.emailID || "",
  });

  const translations = {
    mr: {
      title: "ऑनलाईन पाणीपट्टी भरणा",
      subtitle: "अकोला महानगरपालिका",
      breadcrumb: "मुख्यपृष्ठ › पाणी बिल › पेमेंट",
      consumerConnection: "ग्राहक व कनेक्शन माहिती",
      meterInfo: "मीटर माहिती",
      billSummary: "बिल तपशील",
      propertyPhoto: "मालमत्ता फोटो",
      meterPhoto: "मीटर फोटो",
      paymentOptions: "पेमेंट पद्धती",
      consumerNo: "ग्राहक क्र.",
      oldConsumerNo: "जुना क्र.",
      wardNo: "प्रभाग क्र.",
      propertyNo: "मालमत्ता क्र.",
      name: "नाव",
      address: "पत्ता",
      mobileNo: "मोबाइल",
      emailID: "ईमेल",
      connectionType: "कनेक्शन प्रकार",
      connectionCategory: "श्रेणी",
      connectionStatus: "स्थिती",
      connectionYear: "कनेक्शन वर्ष",
      residential: "निवासी",
      commercial: "व्यावसायिक",
      industrial: "औद्योगिक",
      govt: "सरकारी",
      meter: "मीटर",
      noMeter: "मीटर नाही",
      active: "सक्रिय",
      inactive: "निष्क्रिय",
      meterNo: "मीटर क्र.",
      meterSize: "टॅब आकार",
      readingMethod: "रीडिंग पद्धत",
      previousReading: "मागील रीडिंग",
      currentReading: "सध्याचे रीडिंग",
      readingDate: "रीडिंग तारीख",
      consumption: "वापर",
      readingBy: "रीडिंग घेणार",
      remarks: "टिप्पणी",
      manual: "मॅन्युअल",
      smartMeter: "स्मार्ट मीटर",
      mobileApp: "मोबाइल अॅप",
      billMonth: "बिल महिना",
      billYear: "बिल वर्ष",
      billingPeriod: "मागील देय बिल कालावधी",
      previousDue: "मागील थकबाकी",
      currentBill: "सध्याचे शुल्क",
      currentCharges: "सध्याचे शुल्क",
      rebateAmount: "पाणी शुल्क",
      waterCharges: "पाणी शुल्क",
      sewerageCharges: "सांडपाणी शुल्क",
      interest: "व्याज",
      lateFee: "विलंब शुल्क",
      discount: "सवलत",
      discountValid: "सवलत वैधता",
      discountValidTill: "सवलत वैधता",
      lastPayment: "Last Payment Date",
      billDate: "Due Date",
      dueDate: "देय तारीख",
      totalPayable: "एकूण देय रक्कम",
      upi: "UPI पेमेंट",
      netbanking: "नेट बँकिंग",
      card: "डेबिट / क्रेडिट कार्ड",
      terms: "मी अटी व शर्ती मान्य करतो",
      payNow: "आता पेमेंट करा",
      backToSearch: "शोधाकडे परत",
      paymentSuccess: "भुगतान यशस्वी!",
      successMessage: "तुमचे पाणी बिल पेमेंट यशस्वीरित्या पूर्ण झाले",
      transactionId: "व्यवहार क्रमांक",
      dateTime: "तारीख व वेळ",
      downloadReceipt: "पावती डाउनलोड करा",
      printReceipt: "पावती प्रिंट करा",
      thankYou: "अकोला महानगरपालिका ऑनलाइन पाणी बिल पेमेंट सेवा वापरल्याबद्दल धन्यवाद.",
      aiPowered: "AI सक्षम",
      ocrVerified: "OCR सत्यापित",
      selectMethod: "पेमेंट पद्धत निवडा",
      pipeSize: "पाईप आकार",
      lastPaymentDate: "शेवटचे पेमेंट तारीख",
      waterChargesDetail: "पाणी शुल्क तपशील",
      ratePerUnit: "दर/युनिट",
      totalUnits: "एकूण युनिट",
      viewLocation: "स्थान पहा",
      gisMap: "GIS नकाशा",
      paymentSummary: "देयक सारांश",
      totalBill: "एकूण बिल",
      amountToPay: "भरावयाची रक्कम",
      proceedToPay: "पेमेंट करा",
      billStatus: "बिल स्थिती",
      pending: "थकबाकी",
      current: "सध्याचे",
      payPendingOnly: "फक्त थकबाकी भरा",
      payCurrentOnly: "फक्त सध्याचे भरा",
      payBoth: "दोन्ही भरा",
      selectPayment: "पेमेंट निवडा",
      currentMonth: "चालू महिना",
    },
    hi: {
      title: "ऑनलाइन पानी बिल भुगतान",
      subtitle: "अकोला नगर निगम",
      breadcrumb: "मुख्यपृष्ठ › पानी बिल › भुगतान",
      consumerConnection: "उपभोक्ता व कनेक्शन जानकारी",
      meterInfo: "मीटर जानकारी",
      billSummary: "बिल विवरण",
      propertyPhoto: "संपत्ति फोटो",
      meterPhoto: "मीटर फोटो",
      paymentOptions: "भुगतान विकल्प",
      consumerNo: "उपभोक्ता क्र.",
      oldConsumerNo: "पुराना क्र.",
      wardNo: "वार्ड क्र.",
      propertyNo: "संपत्ति क्र.",
      name: "नाम",
      address: "पता",
      mobileNo: "मोबाइल",
      emailID: "ईमेल",
      connectionType: "कनेक्शन प्रकार",
      connectionCategory: "श्रेणी",
      connectionStatus: "स्थिति",
      connectionYear: "कनेक्शन वर्ष",
      residential: "आवासीय",
      commercial: "व्यावसायिक",
      industrial: "औद्योगिक",
      govt: "सरकारी",
      meter: "मीटर",
      noMeter: "बिना मीटर",
      active: "सक्रिय",
      inactive: "निष्क्रिय",
      meterNo: "मीटर क्र.",
      meterSize: "टैब आकार",
      readingMethod: "रीडिंग विधि",
      previousReading: "पिछली रीडिंग",
      currentReading: "वर्तमान रीडिंग",
      readingDate: "रीडिंग तिथि",
      consumption: "उपयोग",
      readingBy: "रीडिंग लेने वाला",
      remarks: "टिप्पणी",
      manual: "मैनुअल",
      smartMeter: "स्मार्ट मीटर",
      mobileApp: "मोबाइल ऐप",
      billMonth: "बिल महीना",
      billYear: "बिल वर्ष",
      billingPeriod: "पिछली देय बिल अवधि",
      previousDue: "पिछली बकाया",
      currentBill: "वर्तमान शुल्क",
      currentCharges: "वर्तमान शुल्क",
      rebateAmount: "पानी शुल्क",
      waterCharges: "पानी शुल्क",
      sewerageCharges: "सीवरेज शुल्क",
      interest: "ब्याज",
      lateFee: "विलंब शुल्क",
      discount: "छूट",
      discountValid: "छूट वैधता",
      discountValidTill: "छूट वैधता",
      lastPayment: "Last Payment Date",
      billDate: "Due Date",
      dueDate: "देय तिथि",
      totalPayable: "कुल देय राशि",
      upi: "UPI भुगतान",
      netbanking: "नेट बैंकिंग",
      card: "डेबिट / क्रेडिट कार्ड",
      terms: "मैं नियम और शर्तें स्वीकार करता हूं",
      payNow: "अभी भुगतान करें",
      backToSearch: "खोज पर वापस",
      paymentSuccess: "भुगतान सफल!",
      successMessage: "आपका पानी बिल भुगतान सफलतापूर्वक पूरा हुआ",
      transactionId: "लेनदेन क्रमांक",
      dateTime: "तारीख व समय",
      downloadReceipt: "रसीद डाउनलोड करें",
      printReceipt: "रसीद प्रिंट करें",
      thankYou: "अकोला नगर निगम ऑनलाइन पानी बिल भुगतान सेवा का उपयोग करने के लिए धन्यवाद.",
      aiPowered: "AI सक्षम",
      ocrVerified: "OCR सत्यापित",
      selectMethod: "भुगतान विधि चुनें",
      pipeSize: "पाइप आकार",
      lastPaymentDate: "अंतिम भुगतान तिथि",
      waterChargesDetail: "पानी शुल्क विवरण",
      ratePerUnit: "दर/यूनिट",
      totalUnits: "कुल यूनिट",
      viewLocation: "स्थान देखें",
      gisMap: "GIS मानचित्र",
      paymentSummary: "भुगतान सारांश",
      totalBill: "कुल बिल",
      amountToPay: "भुगतान राशि",
      proceedToPay: "भुगतान करें",
      billStatus: "बिल स्थिति",
      pending: "बकाया",
      current: "वर्तमान",
      payPendingOnly: "केवल बकाया भुगतान करें",
      payCurrentOnly: "केवल वर्तमान भुगतान करें",
      payBoth: "दोनों भुगतान करें",
      selectPayment: "भुगतान चुनें",
      currentMonth: "वर्तमान महीना",
    },
    en: {
      title: "Online Water Bill Payment",
      subtitle: "Akola Municipal Corporation",
      breadcrumb: "Home › Water Bill › Payment",
      consumerConnection: "Consumer & Connection Information",
      meterInfo: "Meter Information",
      billSummary: "Bill Details",
      propertyPhoto: "Property Photo",
      meterPhoto: "Meter Photo",
      paymentOptions: "Payment Options",
      consumerNo: "Consumer No",
      oldConsumerNo: "Old Consumer No",
      wardNo: "Ward No",
      propertyNo: "Property No",
      name: "Name",
      address: "Address",
      mobileNo: "Mobile",
      emailID: "Email",
      connectionType: "Connection Type",
      connectionCategory: "Category",
      connectionStatus: "Status",
      connectionYear: "Connection Year",
      residential: "Residential",
      commercial: "Commercial",
      industrial: "Industrial",
      govt: "Government",
      meter: "Meter",
      noMeter: "No Meter",
      active: "Active",
      inactive: "Inactive",
      meterNo: "Meter No",
      meterSize: "Tab Size",
      readingMethod: "Reading Method",
      previousReading: "Previous Reading",
      currentReading: "Current Reading",
      readingDate: "Reading Date",
      consumption: "Consumption",
      readingBy: "Reading By",
      remarks: "Remarks",
      manual: "Manual",
      smartMeter: "Smart Meter",
      mobileApp: "Mobile App",
      billMonth: "Bill Month",
      billYear: "Bill Year",
      billingPeriod: "Previous Due Billing Period",
      previousDue: "Previous Due",
      currentBill: "Current Charges",
      currentCharges: "Current Charges",
      rebateAmount: "Water Charges",
      waterCharges: "Water Charges",
      sewerageCharges: "Sewerage Charges",
      interest: "Interest",
      lateFee: "Late Fee / Interest",
      discount: "Discount",
      discountValid: "Discount Valid Till",
      discountValidTill: "Discount Valid Till",
      lastPayment: "Last Payment Date",
      billDate: "Due Date",
      dueDate: "Due Date",
      totalPayable: "Total Payable Amount",
      upi: "UPI Payment",
      netbanking: "Net Banking",
      card: "Debit / Credit Card",
      terms: "I agree to the Terms & Conditions",
      payNow: "Pay Now",
      backToSearch: "Back to Search",
      paymentSuccess: "Payment Successful!",
      successMessage: "Your water bill payment completed successfully",
      transactionId: "Transaction ID",
      dateTime: "Date & Time",
      downloadReceipt: "Download Receipt",
      printReceipt: "Print Receipt",
      thankYou: "Thank you for using Akola Municipal Corporation's Online Water Bill Payment Service.",
      aiPowered: "AI Powered",
      ocrVerified: "OCR Verified",
      selectMethod: "Select Payment Method",
      pipeSize: "Pipe Size",
      lastPaymentDate: "Last Payment Date",
      waterChargesDetail: "Water Charges Detail",
      ratePerUnit: "Rate/Unit",
      totalUnits: "Total Units",
      viewLocation: "View Location",
      gisMap: "GIS Map",
      paymentSummary: "Payment Summary",
      totalBill: "Total Bill",
      amountToPay: "Amount to Pay",
      proceedToPay: "Proceed to Pay",
      billStatus: "Bill Status",
      pending: "Pending",
      current: "Current",
      payPendingOnly: "Pay Pending Only",
      payCurrentOnly: "Pay Current Only",
      payBoth: "Pay Both",
      selectPayment: "Select Payment",
      currentMonth: "Current Month",
    },
  };

  const t = translations[language];

  // Calculate water rate per unit
  const waterRatePerUnit = data.unitsConsumed > 0 
    ? (data.currentBillAmount * 0.85) / data.unitsConsumed 
    : 12;

  // Calculate amounts for each bill type
  // Discount applies ONLY to pending bill
  const pendingBillBeforeDiscount = data.previousDueAmount + data.interestAmount;
  const pendingBillAmount = pendingBillBeforeDiscount - (paymentSelection !== "current" ? data.discountAmount : 0);
  const currentBillAmount = data.currentBillAmount;
  
  // Calculate total amount based on selection
  const calculatePayableAmount = () => {
    if (paymentSelection === "pending") {
      return pendingBillAmount;
    } else if (paymentSelection === "current") {
      return currentBillAmount;
    } else {
      return pendingBillAmount + currentBillAmount;
    }
  };

  const selectedPayableAmount = calculatePayableAmount();

  const handlePaymentClick = () => {
    setShowContactModal(true);
  };

  const handleContactConfirm = (mobile: string, email: string, selectedPaymentMethod: string) => {
    setContactDetails({ mobile, email });
    setPaymentMethod(selectedPaymentMethod as "upi" | "netbanking" | "card");
    setShowContactModal(false);
    setShowConfirmModal(true);
  };

  const handleConfirmPayment = () => {
    setShowConfirmModal(false);
    onPayment();
  };

  const currentDateTime = new Date().toLocaleString(
    language === "mr" ? "mr-IN" : language === "hi" ? "hi-IN" : "en-IN",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const getConnectionTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      Residential: t.residential,
      Commercial: t.commercial,
      Industrial: t.industrial,
      Govt: t.govt,
    };
    return labels[type] || type;
  };

  const getConnectionCategoryLabel = (category: string) => {
    return category === "Meter" ? t.meter : t.noMeter;
  };

  const getConnectionStatusLabel = (status: string) => {
    return status === "Active" ? t.active : t.inactive;
  };

  const getReadingMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      Manual: t.manual,
      "Smart Meter": t.smartMeter,
      "Mobile App": t.mobileApp,
    };
    return labels[method] || method;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr === "N/A") return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN");
  };

  // Payment Success Screen
  if (paymentSuccess) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-[#F8FBFF] to-[#E9F1FA]">
        {/* Success Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-2xl w-full bg-white rounded-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.08)] overflow-hidden"
          >
            {/* Success Icon */}
            <div className="bg-[#2E7D32] px-6 py-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-white mb-2">{t.paymentSuccess}</h2>
              <p className="text-white/90">{t.successMessage}</p>
            </div>

            {/* Transaction Details */}
            <div className="p-6 space-y-4">
              <div className="bg-[#F8FBFF] border border-[#D9DEE4] rounded-[10px] p-4 space-y-3">
                <div className="flex justify-between border-b border-[#D9DEE4] pb-3">
                  <span className="text-[#666666]">{t.transactionId}</span>
                  <span className="text-[#333333] font-semibold">{transactionId}</span>
                </div>
                <div className="flex justify-between border-b border-[#D9DEE4] pb-3">
                  <span className="text-[#666666]">{t.consumerNo}</span>
                  <span className="text-[#333333] font-semibold">{data.consumerNo}</span>
                </div>
                <div className="flex justify-between border-b border-[#D9DEE4] pb-3">
                  <span className="text-[#666666]">{t.totalPayable}</span>
                  <span className="text-[#2E7D32] font-semibold text-xl">
                    ₹ {data.totalPayableAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">{t.dateTime}</span>
                  <span className="text-[#333333]">{currentDateTime}</span>
                </div>
              </div>

              <p className="text-sm text-[#666666] text-center">{t.thankYou}</p>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button className="flex-1 bg-[#0077CC] hover:bg-[#005A9C] text-white">
                  <Download className="w-4 h-4 mr-2" />
                  {t.downloadReceipt}
                </Button>
                <Button variant="outline" className="flex-1 border-[#D9DEE4]">
                  <Printer className="w-4 h-4 mr-2" />
                  {t.printReceipt}
                </Button>
              </div>

              <button
                onClick={onBackToSearch}
                className="w-full text-[#0077CC] hover:underline flex items-center justify-center gap-2 mt-4"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.backToSearch}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Main Payment View
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#F8FBFF] to-[#E9F1FA]">
      {/* Contact Details Modal */}
      <ContactDetailsModal
        isOpen={showContactModal}
        language={language}
        initialMobile={contactDetails.mobile}
        initialEmail={contactDetails.email}
        onConfirm={handleContactConfirm}
        onCancel={() => setShowContactModal(false)}
      />

      {/* Payment Confirmation Modal */}
      <PaymentConfirmModal
        isOpen={showConfirmModal}
        language={language}
        amount={data.totalPayableAmount}
        consumerNo={data.consumerNo}
        onConfirm={handleConfirmPayment}
        onCancel={() => setShowConfirmModal(false)}
      />

      {/* Breadcrumb Navigation Bar */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 px-4 sm:px-6 py-2.5 shadow-sm border-b border-blue-200">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <span className="hover:text-blue-600 cursor-pointer transition-colors">
              {language === 'mr' && 'मुख्यपृष्ठ'}
              {language === 'hi' && 'होम'}
              {language === 'en' && 'Home'}
            </span>
            <span className="text-gray-400">/</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">
              {language === 'mr' && 'पाणी बिल'}
              {language === 'hi' && 'पानी का बिल'}
              {language === 'en' && 'Water Bill'}
            </span>
            <span className="text-gray-400">/</span>
            <span className="font-medium text-blue-600">
              {language === 'mr' && 'पेमेंट'}
              {language === 'hi' && 'भुगतान'}
              {language === 'en' && 'Payment'}
            </span>
          </div>
          <button 
            onClick={onBackToSearch}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>
              {language === 'mr' && 'शोधाकडे परत'}
              {language === 'hi' && 'खोज पर वापस'}
              {language === 'en' && 'Back to Search'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden px-3 pt-2 pb-2">
        <div className="max-w-[1600px] mx-auto h-full">
          {/* Main Grid: Left Column (4 Vertical Cards) + Right Column (Images/Map) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-full">
            
            {/* LEFT COLUMN: 4 Equal-Height Stacked Cards */}
            <div className="lg:col-span-7 flex flex-col gap-2.5 h-full overflow-auto">
              
              {/* Card 1: Consumer & Connection Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.08)] overflow-hidden flex-1 flex flex-col min-h-0"
                id="card-consumer-connection"
              >
                <div className="bg-[#005A9C] px-3 py-2 flex-shrink-0">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>{t.consumerConnection}</span>
                  </h3>
                </div>
                <div className="p-3 flex-1 overflow-auto">
                  <div className="space-y-0">
                    {[
                      { label: t.consumerNo, value: data.consumerNo, bold: true },
                      { label: t.oldConsumerNo, value: data.oldConsumerNo },
                      { label: t.wardNo, value: data.wardNo },
                      { label: t.propertyNo, value: data.propertyNo },
                      {
                        label: t.name,
                        value: language === "mr" ? data.nameMarathi : data.name,
                        bold: true,
                      },
                      {
                        label: t.address,
                        value: language === "mr" ? data.addressMarathi : data.address,
                        fullWidth: true,
                      },
                      { label: t.mobileNo, value: data.mobileNo },
                      { label: t.emailID, value: data.emailID },
                      { label: t.connectionType, value: getConnectionTypeLabel(data.connectionType) },
                      {
                        label: t.connectionCategory,
                        value: getConnectionCategoryLabel(data.connectionCategory),
                      },
                      {
                        label: t.connectionStatus,
                        value: getConnectionStatusLabel(data.connectionStatus),
                        status: true,
                      },

                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`grid ${item.fullWidth ? "grid-cols-1" : "grid-cols-2"} gap-2 px-2.5 py-1.5 border-b border-[#E9F1FA] last:border-0 ${
                          idx % 2 === 0 ? "bg-[#F8FBFF]" : "bg-white"
                        }`}
                      >
                        <div className="text-[#666666] text-sm">{item.label}</div>
                        <div
                          className={`text-[#333333] text-sm ${item.bold ? "font-semibold" : ""} ${item.fullWidth ? "mt-0.5" : ""}`}
                        >
                          {item.status ? (
                            <span className="inline-block px-2 py-1 bg-[#2E7D32]/10 text-[#2E7D32] rounded text-sm font-semibold border border-[#2E7D32]/20">
                              {item.value}
                            </span>
                          ) : (
                            item.value
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Meter Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.08)] overflow-hidden flex-1 flex flex-col min-h-0"
                id="card-meter-details"
              >
                <div className="bg-[#005A9C] px-3 py-2 flex-shrink-0">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <Gauge className="w-5 h-5" />
                    <span>{t.meterInfo}</span>
                  </h3>
                </div>
                <div className="p-3 flex-1 flex flex-col overflow-auto">
                  <div className="space-y-0 flex-1">
                    {[
                      { label: t.meterNo, value: data.meterNo, bold: true },
                      { label: t.meterSize, value: data.meterSize },
                      {
                        label: t.readingMethod,
                        value: getReadingMethodLabel(data.readingMethod),
                      },
                      { label: t.previousReading, value: data.lastReadingValue },
                      { label: "Previous Reading Date", value: formatDate(data.lastReadingDate) },
                      { label: t.currentReading, value: data.currentReadingValue, bold: true },
                      { label: t.readingDate, value: formatDate(data.currentReadingDate) },
                      { label: t.consumption, value: data.unitsConsumed, highlight: true },
                      { label: t.readingBy, value: data.readingTakenBy },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`grid ${item.fullWidth ? "grid-cols-1" : "grid-cols-2"} gap-2 px-2.5 py-1.5 border-b border-[#E9F1FA] last:border-0 ${
                          idx % 2 === 0 ? "bg-[#F8FBFF]" : "bg-white"
                        }`}
                      >
                        <div className="text-[#666666] text-sm">{item.label}</div>
                        <div
                          className={`text-[#333333] text-sm ${item.bold ? "font-semibold" : ""} ${item.fullWidth ? "mt-0.5 italic" : ""}`}
                        >
                          {item.highlight ? (
                            <span className="inline-block px-2 py-1 bg-[#0077CC]/10 text-[#005A9C] rounded text-sm font-semibold border border-[#0077CC]/20">
                              {item.value} Units
                            </span>
                          ) : (
                            item.value
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons inside Meter Info Card */}
                  <div className={`grid ${selectedPayableAmount === 0 ? 'grid-cols-3' : 'grid-cols-2'} gap-1.5 mt-2.5 pt-2.5 border-t border-[#E9F1FA] flex-shrink-0`}>
                    {/* Receipt Button */}
                    <button 
                      onClick={() => setShowReceiptHistory(true)}
                      className="group bg-gradient-to-br from-[#005A9C] to-[#0077CC] hover:from-[#0077CC] hover:to-[#005A9C] rounded-md transition-all px-2 py-2.5 flex flex-col items-center justify-center gap-1 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 duration-200"
                    >
                      <FileText className="w-4 h-4 text-white drop-shadow-sm" />
                      <span className="text-[10px] text-white font-semibold tracking-wide">
                        {language === 'mr' ? 'पावती' : language === 'hi' ? 'रसीद' : 'Receipt'}
                      </span>
                    </button>

                    {/* Bill Button */}
                    <button 
                      onClick={() => setShowBillHistory(true)}
                      className="group bg-gradient-to-br from-[#2E7D32] to-[#388E3C] hover:from-[#388E3C] hover:to-[#2E7D32] rounded-md transition-all px-2 py-2.5 flex flex-col items-center justify-center gap-1 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 duration-200"
                    >
                      <FileText className="w-4 h-4 text-white drop-shadow-sm" />
                      <span className="text-[10px] text-white font-semibold tracking-wide">
                        {language === 'mr' ? 'बिल' : language === 'hi' ? 'बिल' : 'Bill'}
                      </span>
                    </button>

                    {/* No Due Button - Only show when amount is 0 */}
                    {selectedPayableAmount === 0 && (
                      <button className="group bg-gradient-to-br from-[#F7B500] to-[#FF9800] hover:from-[#FF9800] hover:to-[#F7B500] rounded-md transition-all px-2 py-2.5 flex flex-col items-center justify-center gap-1 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 duration-200">
                        <CheckCircle2 className="w-4 h-4 text-white drop-shadow-sm" />
                        <span className="text-[10px] text-white font-semibold tracking-wide">
                          {language === 'mr' ? 'थकबाकी नाही' : language === 'hi' ? 'बकाया नहीं' : 'No Due'}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Bill Details (Vertical Summary - No Checkboxes, No Table) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.08)] overflow-hidden flex-1 flex flex-col min-h-0"
                id="card-bill-details"
              >
                <div className="bg-[#005A9C] px-3 py-2 flex-shrink-0">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    <span>{t.billSummary}</span>
                  </h3>
                </div>
                <div className="p-3 flex-1 overflow-auto">
                  <div className="space-y-0">
                    {[
                      { label: t.billMonth, value: t.currentMonth },
                      { label: t.billYear, value: "2024-2025" },
                      { label: t.billingPeriod, value: data.previousDueAmount > 0 ? "1/4/2024 – 30/9/2024" : t.currentMonth },
                      { 
                        label: t.previousDue, 
                        value: `₹${data.previousDueAmount.toFixed(2)}`,
                        highlight: data.previousDueAmount > 0,
                        color: "#D32F2F"
                      },
                      { 
                        label: t.currentCharges, 
                        value: `₹${data.currentBillAmount.toFixed(2)}`,
                        highlight: true,
                        color: "#2E7D32"
                      },
                      { 
                        label: t.waterCharges, 
                        value: `₹${(data.currentBillAmount * 0.85).toFixed(2)} (${data.unitsConsumed} Units)`,
                        color: "#0077CC"
                      },
                      { 
                        label: t.interest, 
                        value: data.interestAmount > 0 ? `₹${data.interestAmount.toFixed(2)}` : "₹0.00",
                        color: data.interestAmount > 0 ? "#D32F2F" : "#666666"
                      },
                      { 
                        label: t.discount, 
                        value: data.discountAmount > 0 ? `-₹${data.discountAmount.toFixed(2)}` : "-",
                        color: data.discountAmount > 0 ? "#2E7D32" : "#666666"
                      },
                      { 
                        label: t.totalPayable, 
                        value: `₹${selectedPayableAmount.toFixed(2)}`,
                        bold: true,
                        large: true,
                        highlight: true,
                        color: "#1B5E20"
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`grid grid-cols-2 gap-2 px-2.5 py-2 border-b border-[#E9F1FA] last:border-0 ${
                          idx % 2 === 0 ? "bg-[#F8FBFF]" : "bg-white"
                        } ${item.large ? "bg-gradient-to-r from-[#E8F5E9] to-[#F8FBFF] border-2 border-[#2E7D32]/30" : ""}`}
                      >
                        <div className={`text-[#666666] ${item.large ? "font-bold text-base" : "text-sm"}`}>{item.label}</div>
                        <div
                          className={`text-right ${item.bold || item.large ? "font-bold" : "font-semibold"} ${item.large ? "text-xl" : "text-sm"}`}
                          style={{ color: item.color || "#333333" }}
                        >
                          {item.highlight && !item.large ? (
                            <span className="inline-block px-2 py-1 rounded" style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}40` }}>
                              {item.value}
                            </span>
                          ) : (
                            item.value
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Discount Scheme Info (if applicable) */}
                  {data.discountAmount > 0 && (
                    <div className="mt-3 bg-gradient-to-r from-[#E8F5E9] to-[#F1F8E9] border border-[#2E7D32]/30 rounded-lg p-2.5 shadow-sm">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-[#2E7D32] mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs text-[#2E7D32] font-bold leading-tight">
                            {data.activeDiscountSchemeName}
                          </p>
                          <p className="text-[10px] text-[#666666] mt-0.5">
                            Valid till {formatDate(data.discountValidTill)}
                          </p>
                          <p className="text-xs text-[#2E7D32] font-bold mt-1">
                            You save ₹{data.discountAmount.toFixed(2)}!
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Card 4: Payment Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-[#F8FBFF] to-[#E9F1FA] rounded-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.08)] border-2 border-[#0077CC]/30 overflow-hidden flex-1 flex flex-col min-h-0"
                id="card-payment-summary"
              >
                <div className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] px-3 py-2 flex-shrink-0">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    <span>{t.paymentSummary}</span>
                  </h3>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between overflow-auto">
                  <div className="space-y-2.5">
                    {/* Amount Payable */}
                    <div className="bg-white rounded-lg p-3 border-2 border-[#0077CC] shadow-md">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-[#666666]">
                          {language === 'mr' && 'देय रक्कम'}
                          {language === 'hi' && 'देय राशि'}
                          {language === 'en' && 'Amount Payable'}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-[#666666]">
                          {data.previousDueAmount > 0 ? 
                            `${language === 'mr' ? 'थकबाकी + सध्याचे' : language === 'hi' ? 'बकाया + वर्तमान' : 'Pending + Current'}` : 
                            `${language === 'mr' ? 'सध्याचे बिल' : language === 'hi' ? 'वर्तमान बिल' : 'Current Bill'}`
                          }
                        </span>
                        <span className="text-3xl text-[#005A9C] font-bold">
                          ₹{selectedPayableAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Early Payment Discount Info */}
                    {data.discountAmount > 0 && (
                      <div className="bg-white rounded-lg p-2.5 border border-[#2E7D32]/30 shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-[#2E7D32] font-semibold flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            {language === 'mr' && 'लवकर पेमेंट सवलत'}
                            {language === 'hi' && 'शीघ्र भुगतान छूट'}
                            {language === 'en' && 'Early Payment Discount'}
                          </span>
                          <span className="text-sm text-[#2E7D32] font-bold">
                            -₹{data.discountAmount.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#666666]">
                          {data.activeDiscountSchemeName}
                        </p>
                      </div>
                    )}

                    {/* Final Payable Amount */}
                    <div className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] rounded-lg p-3 shadow-lg">
                      <div className="text-center">
                        <p className="text-xs text-white/80 mb-1">
                          {language === 'mr' && 'अंतिम देय रक्कम'}
                          {language === 'hi' && 'कुल देय राशि'}
                          {language === 'en' && 'Final Payable Amount'}
                        </p>
                        <p className="text-4xl text-white font-bold mb-1">
                          ₹{selectedPayableAmount.toFixed(2)}
                        </p>
                        {data.discountAmount > 0 && (
                          <p className="text-[10px] text-[#A5D6A7] font-medium">
                            {language === 'mr' && `तुम्ही ₹${data.discountAmount.toFixed(2)} वाचवता!`}
                            {language === 'hi' && `आप ₹${data.discountAmount.toFixed(2)} बचाते हैं!`}
                            {language === 'en' && `You save ₹${data.discountAmount.toFixed(2)}!`}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pay Now Button */}
                  <div className="mt-3 flex-shrink-0">
                    <Button
                      onClick={handlePaymentClick}
                      className="bg-gradient-to-r from-[#F7B500] to-[#FF9800] hover:from-[#FF9800] hover:to-[#F7B500] text-white h-14 w-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95"
                    >
                      <CheckCircle2 className="w-6 h-6 mr-2" />
                      <div className="flex flex-col items-start">
                        <span className="text-xs opacity-90">
                          {language === 'mr' && 'पेमेंट करा'}
                          {language === 'hi' && 'भुगतान करें'}
                          {language === 'en' && 'Pay Now'}
                        </span>
                        <span className="text-lg font-bold">₹{selectedPayableAmount.toFixed(2)}</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Property Photo, Meter Photo, Map (Fixed) */}
            <div className="lg:col-span-5 flex flex-col gap-2.5 h-full">
              {/* Combined Media & Location Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col h-full"
                id="column-right-media-payment"
              >
                {/* Header */}
                <div className="bg-[#005A9C] px-3 py-2 flex-shrink-0">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    <span>
                      {language === 'mr' && 'मीडिया व स्थान माहिती'}
                      {language === 'hi' && 'मीडिया और स्थान जानकारी'}
                      {language === 'en' && 'Media & Location Information'}
                    </span>
                  </h3>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col gap-2 p-2 overflow-auto">
                  {/* Photos Side by Side */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Meter Photo */}
                    {data.meterImage && (
                      <>
                        <div
                          className="bg-white rounded-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.08)] overflow-hidden cursor-pointer"
                          id="media-meter-photo"
                          onMouseEnter={() => setShowImagePreview(true)}
                          onMouseLeave={() => setShowImagePreview(false)}
                        >
                          <div className="relative aspect-square">
                            <img
                              src={data.meterImage}
                              alt="Smart Meter"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-1 right-1 flex flex-col gap-0.5">
                              <span className="bg-[#2E7D32] text-white text-[9px] px-1 py-0.5 rounded shadow-sm">
                                🟢 {t.ocrVerified}
                              </span>
                              <span className="bg-[#7C3AED] text-white text-[9px] px-1 py-0.5 rounded shadow-sm">
                                🤖 {t.aiPowered}
                              </span>
                            </div>
                          </div>
                          <div className="px-2 py-1 bg-white border-t border-[#D9DEE4]">
                            <p className="text-[10px] text-[#333333] font-medium text-center flex items-center justify-center gap-1">
                              <Gauge className="w-3 h-3 text-[#005A9C]" />
                              {t.meterPhoto}
                            </p>
                          </div>
                        </div>

                        {/* Meter Image Preview on Hover */}
                        {showImagePreview && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 pointer-events-none">
                            <div className="bg-white rounded-lg shadow-2xl p-4 max-w-2xl">
                              <img
                                src={data.meterImage}
                                alt="Smart Meter Preview"
                                className="w-auto h-auto max-h-[70vh] object-contain rounded"
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Property Photo */}
                    {data.propertyImage && (
                      <>
                        <div
                          className="bg-white rounded-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.08)] overflow-hidden cursor-pointer"
                          id="media-property-photo"
                          onMouseEnter={() => setShowPropertyPreview(true)}
                          onMouseLeave={() => setShowPropertyPreview(false)}
                        >
                          <div className="relative aspect-square">
                            <img
                              src={data.propertyImage}
                              alt="Property"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="px-2 py-1 bg-white border-t border-[#D9DEE4]">
                            <p className="text-[10px] text-[#333333] font-medium text-center flex items-center justify-center gap-1">
                              <Home className="w-3 h-3 text-[#005A9C]" />
                              {t.propertyPhoto}
                            </p>
                          </div>
                        </div>

                        {/* Property Image Preview on Hover */}
                        {showPropertyPreview && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 pointer-events-none">
                            <div className="bg-white rounded-lg shadow-2xl p-4 max-w-2xl">
                              <img
                                src={data.propertyImage}
                                alt="Property Preview"
                                className="w-auto h-auto max-h-[70vh] object-contain rounded"
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* GIS Location with Map Preview */}
                  <div className="bg-white rounded-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.08)] overflow-hidden flex-1">
                    <button 
                      onClick={() => setShowMapModal(true)}
                      className="w-full px-3 py-2 flex items-center justify-center gap-2 hover:bg-[#F8FBFF] transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-[#D32F2F]" />
                      <span className="text-sm text-[#005A9C] font-medium">{t.viewLocation}</span>
                    </button>
                    
                    {/* Embedded Mini Map Preview */}
                    <div className="border-t border-[#D9DEE4]">
                      <div className="relative aspect-video bg-[#E9F1FA]">
                        <iframe
                          src="https://www.openstreetmap.org/export/embed.html?bbox=77.0023%2C20.7023%2C77.0123%2C20.7123&layer=mapnik&marker=20.7073,77.0073"
                          className="w-full h-full"
                          style={{ border: 0 }}
                          title="Property Location Map"
                        />
                        <div className="absolute bottom-1 right-1 bg-white/90 px-1.5 py-0.5 rounded text-[9px] text-[#666666]">
                          Ward 5, Akola
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Map Modal */}
              {showMapModal && (
                <div
                  className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                  onClick={() => setShowMapModal(false)}
                >
                  <div
                    className="bg-white rounded-[10px] shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="bg-[#005A9C] px-6 py-4 flex items-center justify-between rounded-t-[10px]">
                      <h3 className="text-white font-semibold">{t.gisMap}</h3>
                      <button
                        onClick={() => setShowMapModal(false)}
                        className="text-white hover:bg-white/10 rounded p-1 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="aspect-video bg-[#F8FBFF] border border-[#D9DEE4] rounded-[10px] flex items-center justify-center">
                        <p className="text-[#666666]">{t.viewLocation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bill History Modal */}
      <BillHistoryModal
        isOpen={showBillHistory}
        onClose={() => setShowBillHistory(false)}
        language={language}
        consumerNo={data.consumerNo}
        type="bill"
      />

      {/* Receipt History Modal */}
      <BillHistoryModal
        isOpen={showReceiptHistory}
        onClose={() => setShowReceiptHistory(false)}
        language={language}
        consumerNo={data.consumerNo}
        type="receipt"
      />
    </div>
  );
}
