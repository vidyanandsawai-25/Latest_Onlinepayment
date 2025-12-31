import { motion } from "motion/react";
import { CheckCircle2, FileText, ArrowLeft } from "lucide-react";
import { Language, ConsumerData } from "../App";

interface PaymentSuccessScreenProps {
  language: Language;
  data: ConsumerData;
  transactionId: string;
  totalPayable: number;
  onBackToSearch: () => void;
}

export function PaymentSuccessScreen({
  language,
  data,
  transactionId,
  totalPayable,
  onBackToSearch,
}: PaymentSuccessScreenProps) {
  const translations = {
    mr: {
      paymentSuccess: "पेमेंट यशस्वी!",
      successMessage: "तुमचे पेमेंट यशस्वीरित्या पूर्ण झाले आहे",
      transactionId: "व्यवहार क्र.",
      transactionDate: "व्यवहार दिनांक",
      amountPaid: "भरलेली रक्कम",
      consumerNo: "ग्राहक क्र.",
      downloadReceipt: "पावती डाउनलोड करा",
      backToSearch: "मागे जा",
    },
    hi: {
      paymentSuccess: "भुगतान सफल!",
      successMessage: "आपका भुगतान सफलतापूर्वक पूर्ण हो गया है",
      transactionId: "लेनदेन क्र.",
      transactionDate: "लेनदेन दिनांक",
      amountPaid: "भरली राशि",
      consumerNo: "ग्राहक क्र.",
      downloadReceipt: "रसीद डाउनलोड करें",
      backToSearch: "वापस जाएं",
    },
    en: {
      paymentSuccess: "Payment Successful!",
      successMessage: "Your payment has been completed successfully",
      transactionId: "Transaction ID",
      transactionDate: "Transaction Date",
      amountPaid: "Amount Paid",
      consumerNo: "Consumer No",
      downloadReceipt: "Download Receipt",
      backToSearch: "Back to Search",
    },
  };

  const t = translations[language];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-2 sm:p-3">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.7, bounce: 0.4 }}
        className="w-full max-w-[90vw] sm:max-w-md"
      >
        {/* Success Card */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden border border-[#00A676]/20">
          {/* Green Header with Success Icon */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-[#4CAF50] px-3 sm:px-4 py-4 sm:py-5 text-center relative overflow-hidden"
          >
            {/* Animated circles background */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/20"></div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="relative z-10"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                <CheckCircle2 className="w-7 h-7 sm:w-10 sm:h-10 text-[#00A676]" />
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white text-lg sm:text-xl mb-1"
                style={{
                  fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                  fontWeight: 700,
                }}
              >
                {t.paymentSuccess}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/95 text-xs sm:text-sm px-2"
                style={{
                  fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                  fontWeight: 500,
                }}
              >
                {t.successMessage}
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Transaction Details */}
          <div className="p-3 sm:p-4">
            <div className="space-y-2 sm:space-y-2.5">
              {/* Transaction ID */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gray-50 rounded-lg p-2 sm:p-2.5 border border-gray-200"
              >
                <span
                  className="text-gray-600 text-[10px] sm:text-xs block mb-0.5"
                  style={{
                    fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {t.transactionId}
                </span>
                <span
                  className="text-gray-900 font-mono text-xs sm:text-sm block"
                  style={{
                    fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {transactionId}
                </span>
              </motion.div>

              {/* Date & Time */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gray-50 rounded-lg p-2 sm:p-2.5 border border-gray-200"
              >
                <span
                  className="text-gray-600 text-[10px] sm:text-xs block mb-0.5"
                  style={{
                    fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {t.transactionDate}
                </span>
                <span
                  className="text-gray-900 text-xs sm:text-sm block"
                  style={{
                    fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {new Date().toLocaleDateString(
                    language === "mr"
                      ? "mr-IN"
                      : language === "hi"
                        ? "hi-IN"
                        : "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </span>
              </motion.div>

              {/* Amount & Consumer No - Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-green-50 rounded-lg p-2 sm:p-2.5 border border-[#4CAF50]"
                >
                  <span
                    className="text-gray-600 text-[10px] sm:text-xs block mb-0.5"
                    style={{
                      fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {t.amountPaid}
                  </span>
                  <span
                    className="text-[#4CAF50] text-sm sm:text-base block"
                    style={{
                      fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    ₹{totalPayable.toFixed(2)}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="bg-gray-50 rounded-lg p-2 sm:p-2.5 border border-gray-200"
                >
                  <span
                    className="text-gray-600 text-[10px] sm:text-xs block mb-0.5"
                    style={{
                      fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {t.consumerNo}
                  </span>
                  <span
                    className="text-gray-900 text-xs sm:text-sm block truncate"
                    style={{
                      fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {data.consumerNo}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mt-3 sm:mt-4 space-y-2"
            >
              {/* Download Receipt */}
              <button
                onClick={() => {
                  console.log("Downloading receipt for:", transactionId);
                }}
                className="w-full bg-[#33A1FD] hover:bg-[#2196F3] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span
                  className="text-xs sm:text-sm"
                  style={{
                    fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {t.downloadReceipt}
                </span>
              </button>

              {/* Back to Search */}
              <button
                onClick={onBackToSearch}
                className="w-full text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span
                  className="text-xs sm:text-sm"
                  style={{
                    fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {t.backToSearch}
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}