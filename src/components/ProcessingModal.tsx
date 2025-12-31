import { motion, AnimatePresence } from "motion/react";
import { Loader2, CreditCard, Check } from "lucide-react";
import { Language } from "../App";

interface ProcessingModalProps {
  isOpen: boolean;
  language: Language;
}

export function ProcessingModal({ isOpen, language }: ProcessingModalProps) {
  const translations = {
    en: {
      processing: "Processing Payment",
      pleaseWait: "Please wait while we process your payment",
      securePayment: "Your payment is secure and encrypted",
      doNotClose: "Please do not close this window",
    },
    mr: {
      processing: "भुगतान प्रक्रिया",
      pleaseWait: "कृपया प्रतीक्षा करा आम्ही तुमचे भुगतान प्रक्रिया करत आहोत",
      securePayment: "तुमचे भुगतान सुरक्षित आणि एन्क्रिप्टेड आहे",
      doNotClose: "कृपया हे विंडो बंद करू नका",
    },
    hi: {
      processing: "भुगतान प्रक्रिया",
      pleaseWait: "कृपया प्रतीक्षा करें जब तक हम आपका भुगतान प्रोसेस करते हैं",
      securePayment: "आपका भुगतान सुरक्षित और एन्क्रिप्टेड है",
      doNotClose: "कृपया इस विंडो को बंद न करें",
    },
  };

  const t = translations[language];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        >
          {/* Animated gradient header */}
          <div className="relative bg-[#006BA6] px-4 sm:px-6 py-4 sm:py-6 md:py-8 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* Animated card icon */}
            <motion.div className="relative z-10 flex justify-center mb-3 sm:mb-4">
              <motion.div
                className="relative"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4">
                  <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                </div>
                
                {/* Circular progress indicator */}
                <motion.div
                  className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 sm:p-1"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0077CC]" />
                </motion.div>
              </motion.div>
            </motion.div>

            <h2 className="relative z-10 text-white text-center text-base sm:text-lg md:text-xl">
              {t.processing}
            </h2>
          </div>

          {/* Content */}
          <div className="px-4 sm:px-6 py-6 sm:py-8">
            {/* Main loading animation */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                {/* Outer pulsing ring */}
                <motion.div
                  className="absolute inset-0 border-4 border-blue-200 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Middle rotating ring */}
                <motion.div
                  className="absolute inset-2 border-4 border-t-[#0077CC] border-r-transparent border-b-[#2E7D32] border-l-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                {/* Inner counter-rotating ring */}
                <motion.div
                  className="absolute inset-4 border-4 border-t-transparent border-r-[#2E7D32] border-b-transparent border-l-[#0077CC] rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#0077CC]" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#33A1FD] rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Messages */}
            <div className="space-y-2 sm:space-y-3 text-center">
              <motion.p
                className="text-gray-700 text-sm sm:text-base"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {t.pleaseWait}
              </motion.p>
              
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-green-600 text-xs sm:text-sm">
                <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{t.securePayment}</span>
              </div>
              
              <p className="text-orange-600 text-xs sm:text-sm font-medium">
                {t.doNotClose}
              </p>
            </div>
          </div>

          {/* Bottom gradient bar */}
          <div className="relative h-1 bg-gray-200 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#0077CC] to-[#2E7D32]"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
