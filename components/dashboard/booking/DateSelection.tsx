import React, { useRef, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { gsap } from "gsap";
import JalaliDatePicker from "@/components/JalaliDatePicker";
import { DateValue } from "@internationalized/date";

interface DateSelectionProps {
  value: DateValue | null;
  onChange: (date: DateValue | null) => void;
  allowedDates: DateValue[];
  onBack: () => void;
  onNext: () => void;
  isRtl?: boolean;
}

export default function DateSelection({
  value,
  onChange,
  allowedDates,
  onBack,
  onNext,
  isRtl = false,
}: DateSelectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`mb-8 flex flex-col items-center ${
        isRtl ? "rtl text-right" : "ltr text-left"
      }`}
    >
      <div
        className={`flex items-center mb-6 ${isRtl ? "flex-row-reverse" : ""}`}
      >
        <h2 className="text-3xl font-bold text-primary-dark dark:text-primary-light">
          انتخاب تاریخ
        </h2>
        <FaCalendarAlt className="text-4xl text-primary-brand animate-bounce ml-4" />
      </div>

      <div className="w-full flex justify-center mb-6">
        <div className="hover:shadow-xl transition-all">
          <JalaliDatePicker
            value={value}
            onChange={onChange}
            allowedDates={allowedDates}
          />
        </div>
      </div>

      <div className="flex gap-6">
        <button
          className="px-8 py-3 text-lg font-semibold rounded-full bg-secondary-darkuser text-primary-light hover:bg-secondary-dark hover:scale-105 transition-all shadow-md"
          onClick={onBack}
        >
          {isRtl ? "بازگشت" : "Back"}
        </button>{" "}
        <button
          className={`px-8 py-3 text-lg font-semibold rounded-full transition-all shadow-md ${
            value
              ? "bg-primary-brand text-white hover:bg-secondary-brand hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={onNext}
          disabled={!value}
        >
          {isRtl ? "ادامه" : "Next"}
        </button>
      </div>
    </div>
  );
}
