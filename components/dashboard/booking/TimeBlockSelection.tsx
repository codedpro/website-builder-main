import React, { useRef, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { gsap } from "gsap";

interface TimeBlock {
  time_block_id: string;
  duration: number;
  default_price: number;
  specific_price: number | null;
}

interface TimeBlockSelectionProps {
  timeBlocks: TimeBlock[];
  selectedTimeBlockId: string | null;
  onSelectTimeBlock: (blockId: string) => void;
  onBack: () => void;
  onNext: () => void;
  isRtl?: boolean;
}

export default function TimeBlockSelection({
  timeBlocks,
  selectedTimeBlockId,
  onSelectTimeBlock,
  onBack,
  onNext,
  isRtl = false,
}: TimeBlockSelectionProps) {
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

  if (!timeBlocks || timeBlocks.length === 0) return null;

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
        <h2 className="text-4xl font-bold text-primary-dark dark:text-primary-light">
          {isRtl ? "انتخاب مدت زمان" : "Select Time Block"}
        </h2>
        <FaClock className="text-5xl text-primary-brand ml-4 " />
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {timeBlocks.map((block) => (
          <li
            key={block.time_block_id}
            className={`relative p-6 w-full rounded-xl shadow-lg cursor-pointer transition-all transform flex flex-col justify-center items-center text-center border-2 ${
              selectedTimeBlockId === block.time_block_id
                ? "border-primary-brand bg-primary-lightuser dark:bg-primary-darkuser scale-105"
                : "border-gray-200 bg-secondary-lightuser dark:border-tertiary-darkuser dark:bg-primary-darkuser hover:scale-105 hover:shadow-2xl"
            }`}
            onClick={() => onSelectTimeBlock(block.time_block_id)}
          >
            <div className="text-xl font-bold mb-2 text-primary-dark dark:text-primary-light">
              {isRtl
                ? `مدت: ${block.duration} دقیقه`
                : `Duration: ${block.duration} minutes`}
            </div>

            <div className="text-lg font-semibold text-secondary-dark dark:text-secondary-light">
              {isRtl ? "قیمت:" : "Price:"}{" "}
              <span className="text-primary-brand dark:text-primary-light text-2xl">
                {block.specific_price !== null
                  ? block.specific_price
                  : block.default_price}{" "}
                {isRtl ? "تومان" : "Toman"}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex gap-6 justify-center mt-10">
        <button
          className="px-8 py-3 text-lg font-semibold bg-secondary-darkuser text-primary-light rounded-full hover:bg-secondary-dark transition-all shadow-md hover:scale-105"
          onClick={onBack}
        >
          {isRtl ? "بازگشت" : "Back"}
        </button>
        <button
          className={`px-8 py-3 text-lg font-semibold rounded-full transition-all shadow-md ${
            selectedTimeBlockId
              ? "bg-primary-brand text-white hover:bg-secondary-brand hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={onNext}
          disabled={!selectedTimeBlockId}
        >
          {isRtl ? "ادامه" : "Next"}
        </button>
      </div>
    </div>
  );
}
