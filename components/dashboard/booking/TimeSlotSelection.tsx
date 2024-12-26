import React, { useRef, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { gsap } from "gsap";

interface TimeSlotSelectionProps {
  times: string[];
  selectedStartTime: string | null;
  onSelectStartTime: (time: string) => void;
  onBack: () => void;
  onNext: () => void;
  isValidUser: boolean;
  isRtl?: boolean;
}

export default function TimeSlotSelection({
  times,
  selectedStartTime,
  onSelectStartTime,
  onBack,
  isValidUser,
  onNext,
  isRtl = false,
}: TimeSlotSelectionProps) {
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

  if (times.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`mt-6 flex flex-col items-center ${
        isRtl ? "rtl text-right" : "ltr text-left"
      }`}
    >
      <div
        className={`flex items-center mb-8 ${isRtl ? "flex-row-reverse" : ""}`}
      >
        <h2 className="text-4xl font-extrabold text-primary-dark dark:text-primary-light">
          انتخاب زمان شروع
        </h2>{" "}
        <FaClock className="text-5xl text-primary-brand ml-4 dark:text-primary-brand" />
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {times.map((timeStr, index) => (
          <li
            key={index}
            className={`p-4 w-full rounded-lg cursor-pointer text-center shadow-md transition-all transform border-2 ${
              selectedStartTime === timeStr
                ? "border-primary-brand text-primary-dark dark:border-primary-brand dark:text-primary-light scale-105 shadow-lg"
                : "border-gray-200 bg-secondary-lightuser text-secondary-dark dark:border-secondary-dark dark:bg-secondary-darkuser dark:text-primary-light hover:scale-105 hover:shadow-lg"
            }`}
            onClick={() => onSelectStartTime(timeStr)}
          >
            <span className="text-lg font-semibold">{timeStr}</span>
          </li>
        ))}
      </ul>

      <div className="flex gap-6 justify-center mt-10">
        <button
          className="px-8 py-3 text-lg font-semibold bg-secondary-darkuser text-primary-light rounded-full hover:bg-secondary-dark transition-all shadow-md hover:scale-105"
          onClick={onBack}
        >
          بازگشت
        </button>
        <button
          className={`px-8 py-3 text-lg font-semibold rounded-full transition-all shadow-md ${
            selectedStartTime
              ? "bg-primary-brand text-white hover:bg-secondary-brand hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={onNext}
          disabled={!selectedStartTime}
        >
          {!isValidUser ? "برای رزرو نوبت وارد شوید" : "رزرو نوبت"}
        </button>
      </div>
    </div>
  );
}
