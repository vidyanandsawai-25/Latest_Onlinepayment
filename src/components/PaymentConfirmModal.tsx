import { Language } from "../App";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";

interface PaymentConfirmModalProps {
  isOpen: boolean;
  language: Language;
  amount: number;
  consumerNo: string;
  paymentType?: "pending" | "total" | "partial";
  onConfirm: () => void;
  onCancel: () => void;
}

export function PaymentConfirmModal({
  isOpen,
  language,
  amount,
  consumerNo,
  paymentType = "total",
  onConfirm,
  onCancel,
}: PaymentConfirmModalProps) {
  const translations = {
    mr: {
      title: "पेमेंट पुष्टी",
      message: "तुम्हाला खात्री आहे की तुम्ही पेमेंट करू इच्छिता?",
      confirmMessage: "कृपया पुष्टी करा की तुम्ही पेमेंट करायला तयार आहात.",
      consumerNo: "ग्राहक क्र.",
      amount: "रक्कम",
      paymentType: "पेमेंट प्रकार",
      pendingOnly: "थकबाकी",
      totalAmount: "एकूण रक्कम",
      partialPayment: "आंशिक पेमेंट",
      confirm: "पुष्टी करा आणि पेमेंट करा",
      cancel: "रद्द करा",
    },
    hi: {
      title: "भुगतान पुष्टि",
      message: "क्या आप निश्चित हैं कि आप भुगतान करना चाहते हैं?",
      confirmMessage: "कृपया पुष्टि करें कि आप भुगतान के लिए तैयार हैं.",
      consumerNo: "उपभोक्ता क्र.",
      amount: "राशि",
      paymentType: "भुगतान प्रकार",
      pendingOnly: "बकाया",
      totalAmount: "कुल राशि",
      partialPayment: "आंशिक भुगतान",
      confirm: "पुष्टि करें और भुगतान करें",
      cancel: "रद्द करें",
    },
    en: {
      title: "Payment Confirmation",
      message: "Are you sure you want to make this payment?",
      confirmMessage: "Please confirm that you are ready to proceed with the payment.",
      consumerNo: "Consumer No",
      amount: "Amount",
      paymentType: "Payment Type",
      pendingOnly: "Pending Only",
      totalAmount: "Total Amount",
      partialPayment: "Partial Payment",
      confirm: "Confirm & Pay",
      cancel: "Cancel",
    },
  };

  const t = translations[language];
  
  // Get payment type label
  const getPaymentTypeLabel = () => {
    if (paymentType === "pending") return t.pendingOnly;
    if (paymentType === "total") return t.totalAmount;
    if (paymentType === "partial") return t.partialPayment;
    return t.totalAmount;
  };
  
  // Get payment type color
  const getPaymentTypeColor = () => {
    if (paymentType === "pending") return "#D32F2F";
    if (paymentType === "total") return "#2E7D32";
    if (paymentType === "partial") return "#0077CC";
    return "#2E7D32";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-sm sm:max-w-md md:max-w-lg w-full"
            >
              {/* Header */}
              <div className="bg-[#FF9800] px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 rounded-t-xl sm:rounded-t-2xl flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2 sm:gap-3">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  <h3 className="text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl">{t.title}</h3>
                </div>
                <button
                  onClick={onCancel}
                  className="text-white hover:bg-white/20 rounded-lg p-1.5 sm:p-2 transition-all hover:scale-110"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6">
                <p className="text-[#333333] font-semibold text-sm sm:text-base md:text-lg">{t.message}</p>
                <p className="text-[#666666] text-xs sm:text-sm md:text-base">{t.confirmMessage}</p>

                <div className="bg-gradient-to-br from-[#F8FBFF] to-[#E9F1FA] border-2 border-[#0077CC]/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 shadow-md">
                  <div className="flex justify-between items-center">
                    <span className="text-[#666666] font-medium text-xs sm:text-sm md:text-base">{t.consumerNo}:</span>
                    <span className="text-[#333333] font-bold text-sm sm:text-base md:text-lg lg:text-xl">{consumerNo}</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-[#D9DEE4] to-transparent"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#666666] font-medium text-xs sm:text-sm md:text-base">{t.amount}:</span>
                    <span className="text-[#2E7D32] font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">₹ {amount.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-[#D9DEE4] to-transparent"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#666666] font-medium text-xs sm:text-sm md:text-base">{t.paymentType}:</span>
                    <span 
                      className="font-bold text-sm sm:text-base md:text-lg lg:text-xl px-3 py-1 rounded-lg shadow-sm" 
                      style={{ 
                        color: getPaymentTypeColor(),
                        backgroundColor: `${getPaymentTypeColor()}15`
                      }}
                    >
                      {getPaymentTypeLabel()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 flex gap-3 sm:gap-4">
                <Button
                  onClick={onCancel}
                  variant="outline"
                  className="flex-1 border-2 border-[#D9DEE4] text-[#333333] hover:bg-gray-100 hover:border-gray-400 transition-all h-10 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg font-semibold rounded-lg sm:rounded-xl"
                >
                  {t.cancel}
                </Button>
                <Button
                  onClick={onConfirm}
                  className="flex-1 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] hover:from-[#1B5E20] hover:to-[#0D4711] text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 h-10 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg font-semibold rounded-lg sm:rounded-xl"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2" />
                  {t.confirm}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}