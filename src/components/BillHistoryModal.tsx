import { X, FileText, Download, Calendar } from "lucide-react";
import { Language } from "../App";
import { motion, AnimatePresence } from "motion/react";

interface BillHistoryModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  consumerNo: string;
}

interface BillRecord {
  month: string;
  monthMr: string;
  monthHi: string;
  billNo: string;
  amount: number;
  dueDate: string;
  status: "paid" | "unpaid";
}

export function BillHistoryModal({
  language,
  isOpen,
  onClose,
  consumerNo,
}: BillHistoryModalProps) {
  const translations = {
    mr: {
      title: "बिल इतिहास",
      consumerNo: "ग्राहक क्रमांक",
      month: "महिना",
      billNo: "बिल क्रमांक",
      amount: "रक्कम",
      dueDate: "देय तारीख",
      status: "स्थिती",
      action: "कृती",
      download: "डाउनलोड",
      close: "बंद करा",
      paid: "भरलेले",
      unpaid: "थकबाकी",
    },
    hi: {
      title: "बिल इतिहास",
      consumerNo: "ग्राहक क्रमांक",
      month: "महीना",
      billNo: "बिल क्रमांक",
      amount: "राशि",
      dueDate: "देय तिथि",
      status: "स्थिति",
      action: "कार्य",
      download: "डाउनलोड",
      close: "बंद करें",
      paid: "भुगतान",
      unpaid: "बकाया",
    },
    en: {
      title: "Bill History",
      consumerNo: "Consumer Number",
      month: "Month",
      billNo: "Bill Number",
      amount: "Amount",
      dueDate: "Due Date",
      status: "Status",
      action: "Action",
      download: "Download",
      close: "Close",
      paid: "Paid",
      unpaid: "Unpaid",
    },
  };

  const t = translations[language];

  // Sample bill data
  const bills: BillRecord[] = [
    {
      month: "November 2024",
      monthMr: "नोव्हेंबर 2024",
      monthHi: "नवंबर 2024",
      billNo: "BILL-2024-11-001",
      amount: 1450.0,
      dueDate: "10/11/2024",
      status: "unpaid",
    },
    {
      month: "October 2024",
      monthMr: "ऑक्टोबर 2024",
      monthHi: "अक्टूबर 2024",
      billNo: "BILL-2024-10-001",
      amount: 1250.0,
      dueDate: "10/10/2024",
      status: "paid",
    },
    {
      month: "September 2024",
      monthMr: "सप्टेंबर 2024",
      monthHi: "सितंबर 2024",
      billNo: "BILL-2024-09-001",
      amount: 1180.0,
      dueDate: "10/09/2024",
      status: "paid",
    },
    {
      month: "August 2024",
      monthMr: "ऑगस्ट 2024",
      monthHi: "अगस्त 2024",
      billNo: "BILL-2024-08-001",
      amount: 1320.0,
      dueDate: "10/08/2024",
      status: "paid",
    },
    {
      month: "July 2024",
      monthMr: "जुलै 2024",
      monthHi: "जुलाई 2024",
      billNo: "BILL-2024-07-001",
      amount: 1290.0,
      dueDate: "10/07/2024",
      status: "paid",
    },
    {
      month: "June 2024",
      monthMr: "जून 2024",
      monthHi: "जून 2024",
      billNo: "BILL-2024-06-001",
      amount: 1150.0,
      dueDate: "10/06/2024",
      status: "paid",
    },
  ];

  const getMonthLabel = (bill: BillRecord) => {
    if (language === "mr") return bill.monthMr;
    if (language === "hi") return bill.monthHi;
    return bill.month;
  };

  const handleDownload = (billNo: string) => {
    console.log(`Downloading bill: ${billNo}`);
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
            <div className="bg-[#33A1FD] px-4 sm:px-6 py-3 flex items-center justify-between">
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
                  <div className="grid grid-cols-[1.2fr_1.5fr_1fr_1fr_1fr_0.8fr] gap-2 sm:gap-4 px-4 sm:px-6 py-2.5">
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
                      {t.billNo}
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
                      {t.dueDate}
                    </div>
                    <div
                      className="text-gray-700 text-xs sm:text-sm"
                      style={{
                        fontFamily:
                          "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {t.status}
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
                  {bills.map((bill, index) => (
                    <motion.div
                      key={bill.billNo}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`grid grid-cols-[1.2fr_1.5fr_1fr_1fr_1fr_0.8fr] gap-2 sm:gap-4 px-4 sm:px-6 py-3 transition-colors ${
                        index % 2 === 0
                          ? "bg-white hover:bg-blue-50"
                          : "bg-gray-50/50 hover:bg-blue-50"
                      }`}
                    >
                      {/* Month */}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#0066CC] flex-shrink-0" />
                        <span
                          className="text-gray-900 text-xs sm:text-sm"
                          style={{
                            fontFamily:
                              "'Inter', 'Noto Sans Devanagari', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          {getMonthLabel(bill)}
                        </span>
                      </div>

                      {/* Bill Number */}
                      <div className="flex items-center">
                        <span
                          className="text-gray-700 text-xs sm:text-sm font-mono"
                          style={{
                            fontFamily:
                              "'Inter', 'Noto Sans Devanagari', sans-serif",
                            fontWeight: 400,
                          }}
                        >
                          {bill.billNo}
                        </span>
                      </div>

                      {/* Amount */}
                      <div className="flex items-center justify-end">
                        <span
                          className="text-[#0066CC] text-xs sm:text-sm"
                          style={{
                            fontFamily:
                              "'Inter', 'Noto Sans Devanagari', sans-serif",
                            fontWeight: 600,
                          }}
                        >
                          ₹{bill.amount.toFixed(2)}
                        </span>
                      </div>

                      {/* Due Date */}
                      <div className="flex items-center">
                        <span
                          className="text-gray-700 text-xs sm:text-sm"
                          style={{
                            fontFamily:
                              "'Inter', 'Noto Sans Devanagari', sans-serif",
                            fontWeight: 400,
                          }}
                        >
                          {bill.dueDate}
                        </span>
                      </div>

                      {/* Status */}
                      <div className="flex items-center">
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                            bill.status === "paid"
                              ? "bg-[#00A676]/15 text-[#00A676]"
                              : "bg-[#E53935]/15 text-[#E53935]"
                          }`}
                          style={{
                            fontFamily:
                              "'Inter', 'Noto Sans Devanagari', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          {bill.status === "paid" ? t.paid : t.unpaid}
                        </span>
                      </div>

                      {/* Action */}
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleDownload(bill.billNo)}
                          className="bg-[#33A1FD] hover:bg-[#2196F3] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-1.5 text-xs sm:text-sm"
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