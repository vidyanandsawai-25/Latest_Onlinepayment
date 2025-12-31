import { X, FileText, Download, Calendar } from "lucide-react";
import { Language } from "../App";
import { motion, AnimatePresence } from "motion/react";

interface ReceiptHistoryModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  consumerNo: string;
}

interface ReceiptRecord {
  month: string;
  monthMr: string;
  monthHi: string;
  receiptNo: string;
  amount: number;
  paymentDate: string;
  transactionNo: string;
}

export function ReceiptHistoryModal({
  language,
  isOpen,
  onClose,
  consumerNo,
}: ReceiptHistoryModalProps) {
  const translations = {
    mr: {
      title: "पावती इतिहास",
      consumerNo: "ग्राहक क्रमांक",
      month: "महिना",
      receiptNo: "पावती क्रमांक",
      amount: "रक्कम",
      paymentDate: "पेमेंट तारीख",
      transactionNo: "व्यवहार क्रमांक",
      action: "कृती",
      download: "डाउनलोड",
      close: "बंद करा",
    },
    hi: {
      title: "पावती इतिहास",
      consumerNo: "ग्राहक क्रमांक",
      month: "महीना",
      receiptNo: "रसीद क्रमांक",
      amount: "राशि",
      paymentDate: "भुगतान तिथि",
      transactionNo: "लेनदेन क्रमांक",
      action: "कार्य",
      download: "डाउनलोड",
      close: "बंद करें",
    },
    en: {
      title: "Receipt History",
      consumerNo: "Consumer Number",
      month: "Month",
      receiptNo: "Receipt Number",
      amount: "Amount",
      paymentDate: "Payment Date",
      transactionNo: "Transaction Number",
      action: "Action",
      download: "Download",
      close: "Close",
    },
  };

  const t = translations[language];

  // Sample receipt data
  const receipts: ReceiptRecord[] = [
    {
      month: "October 2024",
      monthMr: "ऑक्टोबर 2024",
      monthHi: "अक्टूबर 2024",
      receiptNo: "RCP-2024-10-001",
      amount: 1250.0,
      paymentDate: "8/10/2024",
      transactionNo: "TXN202410812345",
    },
    {
      month: "September 2024",
      monthMr: "सप्टेंबर 2024",
      monthHi: "सितंबर 2024",
      receiptNo: "RCP-2024-09-001",
      amount: 1180.0,
      paymentDate: "7/9/2024",
      transactionNo: "TXN202409712345",
    },
    {
      month: "August 2024",
      monthMr: "ऑगस्ट 2024",
      monthHi: "अगस्त 2024",
      receiptNo: "RCP-2024-08-001",
      amount: 1320.0,
      paymentDate: "9/8/2024",
      transactionNo: "TXN202408912345",
    },
    {
      month: "July 2024",
      monthMr: "जुलै 2024",
      monthHi: "जुलाई 2024",
      receiptNo: "RCP-2024-07-001",
      amount: 1290.0,
      paymentDate: "6/7/2024",
      transactionNo: "TXN202407612345",
    },
    {
      month: "June 2024",
      monthMr: "जून 2024",
      monthHi: "जून 2024",
      receiptNo: "RCP-2024-06-001",
      amount: 1150.0,
      paymentDate: "8/6/2024",
      transactionNo: "TXN202406812345",
    },
  ];

  const getMonthLabel = (receipt: ReceiptRecord) => {
    if (language === "mr") return receipt.monthMr;
    if (language === "hi") return receipt.monthHi;
    return receipt.month;
  };

  const handleDownload = (receiptNo: string) => {
    console.log(`Downloading receipt: ${receiptNo}`);
    // Add download logic here
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-[85vw] md:w-[80vw] lg:w-[70vw] xl:w-[65vw] max-w-4xl h-[75vh] sm:h-[70vh] md:h-[65vh] bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#4CAF50] px-4 sm:px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2
                    className="text-white text-base sm:text-lg"
                    style={{
                      fontFamily:
                        "'Inter', 'Noto Sans Devanagari', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {t.title}
                  </h2>
                  <p
                    className="text-white/90 text-xs sm:text-sm"
                    style={{
                      fontFamily:
                        "'Inter', 'Noto Sans Devanagari', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {t.consumerNo}: {consumerNo}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Table Container */}
            <div className="flex-1 overflow-auto bg-gray-50">
              <div className="min-w-full">
                {/* Table Header */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                  <div className="grid grid-cols-[1.2fr_1.5fr_1fr_1fr_1.5fr_0.8fr] gap-2 sm:gap-4 px-4 sm:px-6 py-2.5">
                    <div
                      className="text-gray-700 text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {t.month}
                    </div>
                    <div
                      className="text-gray-700 text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {t.receiptNo}
                    </div>
                    <div
                      className="text-gray-700 text-xs sm:text-sm text-right"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {t.amount}
                    </div>
                    <div
                      className="text-gray-700 text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {t.paymentDate}
                    </div>
                    <div
                      className="text-gray-700 text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {t.transactionNo}
                    </div>
                    <div
                      className="text-gray-700 text-xs sm:text-sm text-center"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {t.action}
                    </div>
                  </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-200">
                  {receipts.map((receipt, index) => (
                    <motion.div
                      key={receipt.receiptNo}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`grid grid-cols-[1.2fr_1.5fr_1fr_1fr_1.5fr_0.8fr] gap-2 sm:gap-4 px-4 sm:px-6 py-3 transition-colors ${
                        index % 2 === 0
                          ? "bg-white hover:bg-green-50"
                          : "bg-gray-50/50 hover:bg-green-50"
                      }`}
                    >
                      {/* Month */}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#00A676] flex-shrink-0" />
                        <span
                          className="text-gray-900 text-xs sm:text-sm"
                          style={{
                            fontFamily:
                              "'Inter', 'Noto Sans Devanagari', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          {getMonthLabel(receipt)}
                        </span>
                      </div>

                      {/* Receipt Number */}
                      <div className="flex items-center">
                        <span
                          className="text-gray-700 text-xs sm:text-sm font-mono"
                          style={{
                            fontFamily:
                              "'Inter', 'Noto Sans Devanagari', sans-serif",
                            fontWeight: 400,
                          }}
                        >
                          {receipt.receiptNo}
                        </span>
                      </div>

                      {/* Amount */}
                      <div className="flex items-center justify-end">
                        <span
                          className="text-[#00A676] text-xs sm:text-sm"
                          style={{
                            fontFamily:
                              "'Inter', 'Noto Sans Devanagari', sans-serif",
                            fontWeight: 600,
                          }}
                        >
                          ₹{receipt.amount.toFixed(2)}
                        </span>
                      </div>

                      {/* Payment Date */}
                      <div className="flex items-center">
                        <span
                          className="text-gray-700 text-xs sm:text-sm"
                          style={{
                            fontFamily:
                              "'Inter', 'Noto Sans Devanagari', sans-serif",
                            fontWeight: 400,
                          }}
                        >
                          {receipt.paymentDate}
                        </span>
                      </div>

                      {/* Transaction Number */}
                      <div className="flex items-center">
                        <span
                          className="text-gray-700 text-xs sm:text-sm font-mono"
                          style={{
                            fontFamily:
                              "'Inter', 'Noto Sans Devanagari', sans-serif",
                            fontWeight: 400,
                          }}
                        >
                          {receipt.transactionNo}
                        </span>
                      </div>

                      {/* Action */}
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() =>
                            handleDownload(receipt.receiptNo)
                          }
                          className="bg-[#4CAF50] hover:bg-[#43A047] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-1.5 text-xs sm:text-sm"
                          style={{
                            fontFamily:
                              "'Inter', 'Noto Sans Devanagari', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">
                            {t.download}
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-2.5 flex justify-end">
              <button
                onClick={onClose}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg transition-colors text-sm"
                style={{
                  fontFamily:
                    "'Inter', 'Noto Sans Devanagari', sans-serif",
                  fontWeight: 500,
                }}
              >
                {t.close}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}