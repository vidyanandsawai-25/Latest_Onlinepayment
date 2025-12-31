import { useState } from "react";
import { Header } from "./components/Header";
import { Breadcrumb } from "./components/Breadcrumb";
import { SearchView } from "./components/SearchView";
import { PaymentView } from "./components/PaymentView";
import { UserGuideModal } from "./components/UserGuideModal";
import { FloatingChatButton } from "./components/FloatingChatButton";
import { motion, AnimatePresence } from "motion/react";

export type Language = "en" | "mr" | "hi";

export interface ConsumerData {
  // 1. Consumer Details
  consumerNo: string;
  oldConsumerNo: string;
  zoneArea: string;
  wardNo: string;
  propertyNo: string;
  name: string;
  nameMarathi: string;
  address: string;
  addressMarathi: string;
  mobileNo: string;
  emailID: string;
  propertyImage?: string;

  // 2. Connection Details
  connectionType:
    | "Residential"
    | "Commercial"
    | "Industrial"
    | "Govt";
  connectionCategory: "Meter" | "No-Meter";
  connectionStatus: "Active" | "Inactive";
  connectionYear: string;

  // 3. Meter Details
  meterNo: string;
  meterType: string;
  meterSize: string;
  lastReadingDate: string;
  lastReadingValue: string;
  currentReadingDate: string;
  currentReadingValue: string;
  unitsConsumed: number;
  meterImage?: string;

  // 4. Bill Summary
  previousBillPeriodFrom: string;
  previousBillPeriodTo: string;
  currentBillMonth: string;
  currentBillYear: string;
  previousDueAmount: number;
  currentBillAmount: number;
  interestAmount: number;
  discountAmount: number;
  activeDiscountSchemeName: string;
  discountValidTill: string;
  totalPayableAmount: number;
  lastPaymentDate: string;

  // 5. Reading Details
  readingTakenBy: string;
  readingDate: string;
  readingMethod: "Manual" | "Smart Meter" | "Mobile App";
  remarks: string;

  // Legacy fields
  previousDue: number;
  currentBill: number;
  lateFees: number;
  unitsUsed: number;
  lastReading: string;
  currentReading: string;
}

export default function App() {
  const [language, setLanguage] = useState<Language>("mr");
  const [currentView, setCurrentView] = useState<
    "search" | "payment"
  >("search");
  const [consumerData, setConsumerData] =
    useState<ConsumerData | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isUserGuideOpen, setIsUserGuideOpen] = useState(false);

  const handleSearch = (consumerNo: string) => {
    // Simulate API call
    setTimeout(() => {
      // Check if this is a no-demand consumer
      const isNoDemandConsumer = consumerNo === "AKL2024999999";
      
      setConsumerData({
        consumerNo: consumerNo,
        oldConsumerNo: "OLD-" + consumerNo.slice(-4),
        zoneArea: "Zone A - Central",
        wardNo: "5",
        propertyNo: "123",
        name: "Rajesh Kumar Sharma",
        nameMarathi: "राजेश कुमार शर्मा",
        address:
          "123, Gandhi Nagar, Ward No. 5, Akola - 444001",
        addressMarathi:
          "१२३, गांधी नगर, प्रभाग क्र. ५, अकोला - ४४४००१",
        mobileNo: "9876543210",
        emailID: "rajesh.sharma@example.com",
        propertyImage:
          "https://images.unsplash.com/photo-1759630815249-3c410d221a07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        connectionType: "Residential",
        connectionCategory: "Meter",
        connectionStatus: "Active",
        connectionYear: "2020",
        meterNo: "MTR-2024-" + consumerNo.slice(-4),
        meterType: "Digital",
        meterSize: "15mm",
        lastReadingDate: "2024-10-01",
        lastReadingValue: "1245",
        currentReadingDate: "2024-11-01",
        currentReadingValue: "1267",
        unitsConsumed: 22,
        meterImage:
          "https://www.southwestwater.co.uk/cdn-cgi/image/w=2800,h=1176,f=auto,q=65,fit=cover/siteassets/images/stock/water-meter-banner.jpg",
        previousBillPeriodFrom: "2024-04-01",
        previousBillPeriodTo: "2024-09-30",
        currentBillMonth: "October 2024",
        currentBillYear: "2024-2025",
        previousDueAmount: isNoDemandConsumer ? 0 : 1080,
        currentBillAmount: isNoDemandConsumer ? 0 : 360,
        interestAmount: isNoDemandConsumer ? 0 : 45,
        discountAmount: isNoDemandConsumer ? 0 : 72,
        activeDiscountSchemeName: "10% Early Payment Discount",
        discountValidTill: "2024-11-15",
        totalPayableAmount: isNoDemandConsumer ? 0 : 1413,
        lastPaymentDate: "2024-04-08",
        readingTakenBy: "Suresh Patil",
        readingDate: "2024-11-01",
        readingMethod: "Smart Meter",
        remarks: "No issues found",
        previousDue: isNoDemandConsumer ? 0 : 1080,
        currentBill: isNoDemandConsumer ? 0 : 360,
        lateFees: isNoDemandConsumer ? 0 : 45,
        unitsUsed: 22,
        lastReading: "1245",
        currentReading: "1267",
      });
      setCurrentView("payment");
    }, 600);
  };

  const handleBackToSearch = () => {
    setCurrentView("search");
    setConsumerData(null);
    setPaymentSuccess(false);
    setTransactionId("");
  };

  const handlePayment = () => {
    setTimeout(() => {
      const txnId = "TXN" + Date.now();
      setTransactionId(txnId);
      setPaymentSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen h-screen max-h-screen bg-[#F5F7FA] flex flex-col overflow-hidden">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onHelpClick={() => setIsUserGuideOpen(true)}
        showBackButton={currentView === "payment"}
        onBackClick={handleBackToSearch}
      />
      
      {currentView === "search" && <Breadcrumb language={language} />}

      <main className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full w-full">
          <AnimatePresence mode="wait">
            {currentView === "search" ? (
              <motion.div
                key="search"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full"
              >
                <SearchView
                  language={language}
                  onSearch={handleSearch}
                  onLanguageChange={setLanguage}
                />
              </motion.div>
            ) : (
              <motion.div
                key="payment"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full"
              >
                <PaymentView
                  language={language}
                  data={consumerData!}
                  paymentSuccess={paymentSuccess}
                  transactionId={transactionId}
                  onBackToSearch={handleBackToSearch}
                  onPayment={handlePayment}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border-t-2 border-blue-600 py-1.5 sm:py-2 flex-shrink-0">
        <div className="container mx-auto px-2 sm:px-4 text-center">
          <p className="text-[10px] sm:text-xs text-blue-100">
            {language === "mr" &&
              "© २०२५ अकोला महानगरपालिका अकोला. सर्व हक्क राखीव | सहाय्यासाठी: support@akolamc.in"}
            {language === "hi" &&
              "© 2025 अकोला नगर निगम. सर्वाधिकार सुरक्षित | सहायता: support@akolamc.in"}
            {language === "en" &&
              "© 2025 Akola Municipal Corporation. All rights reserved | Support: support@akolamc.in"}
          </p>
          <p className="text-[8px] sm:text-[10px] text-blue-300 mt-0.5">
            Design and developed by Sthapatya Consultants(I)
            Pvt.Ltd.
          </p>
        </div>
      </footer>

      <FloatingChatButton
        onClick={() => setIsUserGuideOpen(true)}
        isOpen={isUserGuideOpen}
      />
      <UserGuideModal
        language={language}
        isOpen={isUserGuideOpen}
        onClose={() => setIsUserGuideOpen(false)}
        onStartTutorial={() => {
          setIsUserGuideOpen(false);
          // Start tutorial mode
        }}
      />
    </div>
  );
}