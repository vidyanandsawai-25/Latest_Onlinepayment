import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Play, BookOpen, CheckCircle2 } from 'lucide-react';
import { Language } from '../App';
import { Button } from './ui/button';
import corporationLogo from 'figma:asset/4884b874f7a80c1961814f3fbc2579e7fbfe4e85.png';

interface UserGuideModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onStartTutorial: () => void;
}

export function UserGuideModal({ language, isOpen, onClose, onStartTutorial }: UserGuideModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const translations = {
    mr: {
      title: 'पाणीपट्टी भरणा मार्गदर्शक',
      subtitle: 'पाणीपट्टी ऑनलाइन भरण्याची पायरीबद्ध माहिती',
      startTutorial: 'मार्गदर्शित सहाय्य सुरू करा',
      viewManual: 'संपूर्ण मार्गदर्शक पहा',
      close: 'बंद करा',
      next: 'पुढे',
      previous: 'मागे',
      steps: [
        {
          title: 'पायरी 1: ग्राहक क्रमांक शोधा',
          description: 'तुमचा ग्राहक क्रमांक तुमच्या जुन्या पाणीपट्टीवर छापलेला आहे.',
          instructions: [
            'डाव्या बाजूच्या मेनूमधून "ग्राहक क्र." निवडा',
            'तुमचा ग्राहक क्रमांक एंटर करा',
            '"शोधा" बटण क्लिक करा',
          ],
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=250&fit=crop',
        },
        {
          title: 'पायरी 2: बिल तपशील तपासा',
          description: 'तुमचे बिल तपशील, मीटर रीडिंग आणि बकाया रक्कम तपासा.',
          instructions: [
            'ग्राहक माहिती तपासा',
            'मीटर रीडिंग तपासा',
            'बकाया रक्कम आणि सवलत पहा',
            'एकूण देय रक्कम नोंद घ्या',
          ],
          image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&h=250&fit=crop',
        },
        {
          title: 'पायरी 3: पेमेंट पद्धत निवडा',
          description: 'तुमची पसंतीची पेमेंट पद्धत निवडा - कार्ड, UPI, किंवा नेट बँकिंग.',
          instructions: [
            '"पे नाऊ" बटण क्लिक करा',
            'पेमेंट पद्धत निवडा (कार्ड/UPI/नेट बँकिंग)',
            'आवश्यक माहिती भरा',
            'पेमेंट रक्कम तपासा',
          ],
          image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
        },
        {
          title: 'पायरी 4: पेमेंट पूर्ण करा',
          description: 'पेमेंट करा आणि तुमची रसीद डाउनलोड करा.',
          instructions: [
            'पेमेंट माहिती तपासा',
            'पेमेंट पुष्टी करा',
            'यशस्वी संदेश पहा',
            'रसीद/बिल डाउनलोड करा',
          ],
          image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=250&fit=crop',
        },
      ],
    },
    hi: {
      title: 'पानी बिल भुगतान गाइड',
      subtitle: 'पानी बिल ऑनलाइन भुगतान की चरण-दर-चरण जानकारी',
      startTutorial: 'निर्देशित सहायता शुरू करें',
      viewManual: 'पूर्ण गाइड देखें',
      close: 'बंद करें',
      next: 'अगला',
      previous: 'पिछला',
      steps: [
        {
          title: 'चरण 1: ग्राहक नंबर खोजें',
          description: 'आपका ग्राहक नंबर आपके पुराने पानी बिल पर मुद्रित है।',
          instructions: [
            'बाईं ओर के मेनू से "ग्राहक नं." चुनें',
            'अपना ग्राहक नंबर दर्ज करें',
            '"खोजें" बटन क्लिक करें',
          ],
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=250&fit=crop',
        },
        {
          title: 'चरण 2: बिल विवरण जांचें',
          description: 'अपने बिल विवरण, मीटर रीडिंग और बकाया राशि जांचें।',
          instructions: [
            'ग्राहक जानकारी जांचें',
            'मीटर रीडिंग जांचें',
            'बकाया राशि और छूट देखें',
            'कुल देय राशि नोट करें',
          ],
          image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&h=250&fit=crop',
        },
        {
          title: 'चरण 3: भुगतान विधि चुनें',
          description: 'अपनी पसंदीदा भुगतान विधि चुनें - कार्ड, UPI, या नेट बैंकिंग।',
          instructions: [
            '"पे नाउ" बटन क्लिक करें',
            'भुगतान विधि चुनें (कार्ड/UPI/नेट बैंकिंग)',
            'आवश्यक जानकारी भरें',
            'भुगतान राशि जांचें',
          ],
          image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
        },
        {
          title: 'चरण 4: भुगतान पूर्ण करें',
          description: 'भुगतान करें और अपनी रसीद डाउनलोड करें।',
          instructions: [
            'भुगतान जानकारी जांचें',
            'भुगतान की पुष्टि करें',
            'सफलता संदेश देखें',
            'रसीद/बिल डाउनलोड करें',
          ],
          image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=250&fit=crop',
        },
      ],
    },
    en: {
      title: 'Water Bill Payment Guide',
      subtitle: 'Step-by-step guide to pay your water bill online',
      startTutorial: 'Start Guided Tutorial',
      viewManual: 'View Full Manual',
      close: 'Close',
      next: 'Next',
      previous: 'Previous',
      steps: [
        {
          title: 'Step 1: Find Consumer Number',
          description: 'Your consumer number is printed on your old water bill.',
          instructions: [
            'Select "Consumer No" from the left menu',
            'Enter your consumer number',
            'Click "Search" button',
          ],
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=250&fit=crop',
        },
        {
          title: 'Step 2: Check Bill Details',
          description: 'Review your bill details, meter reading, and outstanding amount.',
          instructions: [
            'Verify consumer information',
            'Check meter reading',
            'View outstanding amount and discount',
            'Note total payable amount',
          ],
          image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&h=250&fit=crop',
        },
        {
          title: 'Step 3: Select Payment Method',
          description: 'Choose your preferred payment method - Card, UPI, or Net Banking.',
          instructions: [
            'Click "Pay Now" button',
            'Select payment method (Card/UPI/Net Banking)',
            'Fill required information',
            'Verify payment amount',
          ],
          image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
        },
        {
          title: 'Step 4: Complete Payment',
          description: 'Make payment and download your receipt.',
          instructions: [
            'Review payment information',
            'Confirm payment',
            'View success message',
            'Download receipt/bill',
          ],
          image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=250&fit=crop',
        },
      ],
    },
  };

  const t = translations[language];
  const currentStepData = t.steps[currentStep];

  const handleNext = () => {
    if (currentStep < t.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartTutorial = () => {
    onStartTutorial();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#003D66] via-[#0055AA] to-[#0066CC] px-6 py-6 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-2xl p-3 shadow-lg">
                  <img src={corporationLogo} alt="Guide" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-2xl flex items-center gap-2">
                    <BookOpen className="w-7 h-7" />
                    {t.title}
                  </h2>
                  <p className="text-blue-100 text-base mt-1">{t.subtitle}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20 rounded-xl h-12 w-12"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto max-h-[calc(90vh-180px)]">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                {t.steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`flex-1 h-2 mx-1 rounded-full transition-all ${
                      index <= currentStep
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-center text-sm text-gray-600">
                {currentStep + 1} / {t.steps.length}
              </p>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step Image */}
                <div className="mb-6 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={currentStepData.image}
                    alt={currentStepData.title}
                    className="w-full h-64 object-cover"
                  />
                </div>

                {/* Step Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {currentStep + 1}
                  </div>
                  {currentStepData.title}
                </h3>

                {/* Step Description */}
                <p className="text-gray-600 mb-6 text-lg">
                  {currentStepData.description}
                </p>

                {/* Instructions */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    {language === 'mr' ? 'सूचना:' : language === 'hi' ? 'निर्देश:' : 'Instructions:'}
                  </h4>
                  <ul className="space-y-3">
                    {currentStepData.instructions.map((instruction, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span>{instruction}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-5 border-t-2 border-blue-100 flex items-center justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outline"
              className="gap-2 border-2 border-blue-300 hover:bg-blue-50 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              {t.previous}
            </Button>

            {currentStep === t.steps.length - 1 ? (
              <Button
                onClick={handleStartTutorial}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white gap-2 px-6 shadow-lg"
              >
                <Play className="w-4 h-4" />
                {t.startTutorial}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white gap-2 px-6 shadow-lg"
              >
                {t.next}
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}