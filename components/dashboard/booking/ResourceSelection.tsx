import React, { useRef, useEffect } from "react";
import { FaUser, FaTools, FaCouch, FaStar, FaDatabase } from "react-icons/fa";
import { gsap } from "gsap";

interface Resource {
  resource_id: string;
  resource_name: string;
  resource_type: string;
}

interface ResourceSelectionProps {
  resources: Resource[];
  selectedResource: string | null;
  onSelectResource: (resourceId: string) => void;
  onNext: () => void;
  onBack: () => void;
  isRtl?: boolean;
}

const getResourceIcon = (type: string) => {
  switch (type) {
    case "staff":
      return <FaUser className="text-4xl text-primary-brand" />;
    case "equipment":
      return <FaTools className="text-4xl text-primary-brand" />;
    case "room":
      return <FaCouch className="text-4xl text-primary-brand" />;
    case "vip":
      return <FaStar className="text-4xl text-primary-light" />;
    default:
      return <FaDatabase className="text-4xl text-primary-dark" />;
  }
};

export default function ResourceSelection({
  resources,
  selectedResource,
  onSelectResource,
  onNext,
  onBack,
  isRtl = false,
}: ResourceSelectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  if (!resources || resources.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`mb-8 p-8 rounded-xl  flex flex-col items-center ${
        isRtl ? "rtl text-right" : "ltr text-left"
      }`}
    >
      <h2 className="text-3xl font-bold mb-8 text-primary-dark dark:text-primary-lightuser">
        یک گزینه را انتخاب کنید
      </h2>

      <ul
        className={`flex flex-wrap gap-6 justify-center items-center w-full ${
          isRtl ? "rtl" : "ltr"
        }`}
      >
        {resources.map((resource) => (
          <li
            key={resource.resource_id}
            className={`relative p-6 w-48 h-48 border-2 rounded-xl cursor-pointer shadow-md transition-all flex flex-col justify-center items-center text-center hover:shadow-lg hover:scale-105 ${
              selectedResource === resource.resource_id
                ? "border-primary-brand bg-primary-lightuser dark:border-primary-brand dark:bg-primary-darkuser"
                : "border-secondary-light bg-secondary-lightuser dark:border-secondary-darkuser dark:bg-secondary-darkuser"
            }`}
            onClick={() => onSelectResource(resource.resource_id)}
          >
            <div className="mb-3">{getResourceIcon(resource.resource_type)}</div>
            <h3 className="text-lg font-semibold mb-1 text-primary-dark dark:text-primary-lightuser">
              {resource.resource_name || "منبع بدون نام"}
            </h3>
            <p className="text-sm text-tertiary-darkuser dark:text-tertiary-lightuser">
              {resource.resource_type || "نوع ناشناخته"}
            </p>
          </li>
        ))}
      </ul>

      <div
        className={`flex gap-4 justify-center mt-10 ${
          isRtl ? "flex-row-reverse" : ""
        }`}
      >
        <button
          className={`px-8 py-3 rounded-lg transition-all ${
            selectedResource
              ? "bg-primary-brand text-primary-light hover:bg-secondary-brand"
              : "bg-tertiary-light text-tertiary-dark cursor-not-allowed"
          }`}
          onClick={onNext}
          disabled={!selectedResource}
        >
          {isRtl ? "ادامه" : "Next"}
        </button>
        <button
          className="px-8 py-3 bg-secondary-darkuser text-primary-light rounded-lg hover:bg-secondary-dark transition-all"
          onClick={onBack}
        >
          {isRtl ? "بازگشت" : "Back"}
        </button>
      </div>
    </div>
  );
}
