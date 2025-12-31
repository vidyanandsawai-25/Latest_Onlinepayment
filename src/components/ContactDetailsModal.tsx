import { useState } from "react";
import { Language } from "../App";
import { X, Phone, Mail, CreditCard, Smartphone, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { motion, AnimatePresence } from "motion/react";

interface ContactDetailsModalProps {
  isOpen: boolean;
  language: Language;
  initialMobile?: string;
  initialEmail?: string;
  onConfirm: (mobile: string, email: string, paymentMethod: string) => void;
  onCancel: () => void;
}

export function ContactDetailsModal({
  isOpen,
  language,
  initialMobile = "",
  initialEmail = "",
  onConfirm,
  onCancel,
}: ContactDetailsModalProps) {
  const [mobile, setMobile] = useState(initialMobile);
  const [email, setEmail] = useState(initialEmail);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "netbanking" | "card" | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({ mobile: "", email: "", payment: "" });

  const translations = {
    mr: {
      title: "संपर्क माहिती पुष्टी",
      message: "कृपया पुष्टी करा किंवा तुमची संपर्क माहिती प्रविष्ट करा",
      mobileLabel: "मोबाइल नंबर",
      emailLabel: "ईमेल पत्ता",
      mobilePlaceholder: "मोबाइल नंबर प्रविष्ट करा",
      emailPlaceholder: "ईमेल पत्ता प्रविष्ट करा",
      terms: "मी अटी व शर्ती मान्य करतो",
      proceed: "पुढे जा",
      cancel: "रद्द करा",
      mobileError: "कृपया वैध 10 अंकी मोबाइल नंबर प्रविष्ट करा",
      emailError: "कृपया वैध ईमेल पत्ता प्रविष्ट करा",
      termsError: "कृपया अटी व शर्ती स्वीकारा",
      paymentMethod: "पेमेंट पद्धत",
      selectPaymentMethod: "पेमेंट पद्धत निवडा",
      paymentError: "कृपया पेमेंट पद्धत निवडा",
      upi: "UPI पेमेंट",
      netbanking: "नेट बँकिंग",
      card: "डेबिट / क्रेडिट कार्ड",
    },
    hi: {
      title: "संपर्क जानकारी पुष्टि",
      message: "कृपया अपनी संपर्क जानकारी की पुष्टि करें या दर्ज करें",
      mobileLabel: "मोबाइल नंबर",
      emailLabel: "ईमेल पता",
      mobilePlaceholder: "मोबाइल नंबर दर्ज करें",
      emailPlaceholder: "ईमेल पता दर्ज करें",
      terms: "मैं नियम और शर्तें स्वीकार करता हूं",
      proceed: "आगे बढ़ें",
      cancel: "रद्द करें",
      mobileError: "कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें",
      emailError: "कृपया मान्य ईमेल पता दर्ज करें",
      termsError: "कृपया नियम और शर्तें स्वीकार करें",
      paymentMethod: "भुगतान विधि",
      selectPaymentMethod: "भुगतान विधि चुनें",
      paymentError: "कृपया भुगतान विधि चुनें",
      upi: "UPI भुगतान",
      netbanking: "नेट बैंकिंग",
      card: "डेबिट / क्रेडिट कार्ड",
    },
    en: {
      title: "Confirm Contact Details",
      message: "Please confirm or enter your contact information",
      mobileLabel: "Mobile Number",
      emailLabel: "Email Address",
      mobilePlaceholder: "Enter mobile number",
      emailPlaceholder: "Enter email address",
      terms: "I agree to terms and conditions",
      proceed: "Proceed to Payment",
      cancel: "Cancel",
      mobileError: "Please enter a valid 10-digit mobile number",
      emailError: "Please enter a valid email address",
      termsError: "Please accept terms and conditions",
      paymentMethod: "Payment Method",
      selectPaymentMethod: "Select Payment Method",
      paymentError: "Please select a payment method",
      upi: "UPI Payment",
      netbanking: "Net Banking",
      card: "Debit / Credit Card",
    },
  };

  const t = translations[language];

  const validateMobile = (value: string): boolean => {
    return /^[6-9]\d{9}$/.test(value);
  };

  const validateEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleProceed = () => {
    const newErrors = { mobile: "", email: "", payment: "" };

    if (!validateMobile(mobile)) {
      newErrors.mobile = t.mobileError;
    }

    if (!validateEmail(email)) {
      newErrors.email = t.emailError;
    }

    if (!paymentMethod) {
      newErrors.payment = t.paymentError;
    }

    if (!termsAccepted) {
      // Show error for terms
      return;
    }

    if (newErrors.mobile || newErrors.email || newErrors.payment) {
      setErrors(newErrors);
      return;
    }

    onConfirm(mobile, email, paymentMethod!);
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
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.08)] max-w-md w-full"
            >
              {/* Header */}
              <div className="bg-[#33A1FD] px-6 py-4 rounded-t-[10px] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-white" />
                  <h3 className="text-white font-semibold text-sm">{t.title}</h3>
                </div>
                <button
                  onClick={onCancel}
                  className="text-white hover:bg-white/10 rounded p-1 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-[#333333] text-sm">{t.message}</p>

                {/* Payment Method Selection */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[#666666] text-xs">
                    <CreditCard className="w-4 h-4" />
                    {t.paymentMethod}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        setPaymentMethod("upi");
                        setErrors({ ...errors, payment: "" });
                      }}
                      className={`px-3 py-2 border-2 rounded transition-all flex flex-col items-center gap-1 ${
                        paymentMethod === "upi"
                          ? "border-[#0077CC] bg-[#E9F1FA]"
                          : "border-[#D9DEE4] bg-white hover:border-[#0077CC]"
                      }`}
                    >
                      <Smartphone className="w-4 h-4 text-[#005A9C]" />
                      <span className="text-[#333333] font-medium text-[10px]">
                        {t.upi}
                      </span>
                      {paymentMethod === "upi" && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0077CC]" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setPaymentMethod("netbanking");
                        setErrors({ ...errors, payment: "" });
                      }}
                      className={`px-3 py-2 border-2 rounded transition-all flex flex-col items-center gap-1 ${
                        paymentMethod === "netbanking"
                          ? "border-[#0077CC] bg-[#E9F1FA]"
                          : "border-[#D9DEE4] bg-white hover:border-[#0077CC]"
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-[#005A9C]" />
                      <span className="text-[#333333] font-medium text-[10px]">
                        {t.netbanking}
                      </span>
                      {paymentMethod === "netbanking" && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0077CC]" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setPaymentMethod("card");
                        setErrors({ ...errors, payment: "" });
                      }}
                      className={`px-3 py-2 border-2 rounded transition-all flex flex-col items-center gap-1 ${
                        paymentMethod === "card"
                          ? "border-[#0077CC] bg-[#E9F1FA]"
                          : "border-[#D9DEE4] bg-white hover:border-[#0077CC]"
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-[#005A9C]" />
                      <span className="text-[#333333] font-medium text-[10px]">
                        {t.card}
                      </span>
                      {paymentMethod === "card" && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0077CC]" />
                      )}
                    </button>
                  </div>
                  {errors.payment && (
                    <p className="text-[#D32F2F] text-[10px]">{errors.payment}</p>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[#666666] text-xs">
                    <Phone className="w-4 h-4" />
                    {t.mobileLabel}
                  </label>
                  <Input
                    type="tel"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                      setErrors({ ...errors, mobile: "" });
                    }}
                    placeholder={t.mobilePlaceholder}
                    maxLength={10}
                    className="text-xs"
                  />
                  {errors.mobile && (
                    <p className="text-[#D32F2F] text-[10px]">{errors.mobile}</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[#666666] text-xs">
                    <Mail className="w-4 h-4" />
                    {t.emailLabel}
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({ ...errors, email: "" });
                    }}
                    placeholder={t.emailPlaceholder}
                    className="text-xs"
                  />
                  {errors.email && (
                    <p className="text-[#D32F2F] text-[10px]">{errors.email}</p>
                  )}
                </div>

                {/* Terms Checkbox */}
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#0077CC]"
                  />
                  <span className="text-[#666666] text-xs">{t.terms}</span>
                </label>
                {!termsAccepted && (
                  <p className="text-[#D32F2F] text-[10px] ml-6">{t.termsError}</p>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 flex gap-3">
                <Button
                  onClick={onCancel}
                  variant="outline"
                  className="flex-1 border-[#D9DEE4] text-[#333333] hover:bg-gray-50 text-xs h-9"
                >
                  {t.cancel}
                </Button>
                <Button
                  onClick={handleProceed}
                  disabled={!termsAccepted}
                  className="flex-1 bg-[#2E7D32] hover:bg-[#1B5E20] text-white disabled:bg-gray-300 disabled:cursor-not-allowed text-xs h-9"
                >
                  {t.proceed}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
