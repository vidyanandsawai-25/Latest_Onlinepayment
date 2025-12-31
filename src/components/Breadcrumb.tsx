import { ChevronRight, Home } from "lucide-react";
import { Language } from "../App";

interface BreadcrumbProps {
  language: Language;
}

export function Breadcrumb({ language }: BreadcrumbProps) {
  const translations = {
    mr: {
      home: "मुख्यपृष्ठ",
      waterBill: "पाणी बिल",
      payment: "पेमेंट",
    },
    hi: {
      home: "मुख्यपृष्ठ",
      waterBill: "पानी बिल",
      payment: "पेमेंट",
    },
    en: {
      home: "Home",
      waterBill: "Water Bill",
      payment: "Payment",
    },
  };

  const t = translations[language];

  return (
    <div className="bg-white border-b border-gray-200 py-2 px-4 sm:px-6 flex-shrink-0">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 text-sm">
          <Home className="w-4 h-4 text-[#005A9C]" />
          <span className="text-[#005A9C] hover:underline cursor-pointer">
            {t.home}
          </span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-[#005A9C] hover:underline cursor-pointer">
            {t.waterBill}
          </span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{t.payment}</span>
        </div>
      </div>
    </div>
  );
}