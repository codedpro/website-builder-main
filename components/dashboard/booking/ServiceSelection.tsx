import React from "react";
import { FaSpa, FaTools, FaHeart, FaMagic } from "react-icons/fa";

interface Service {
  service_id: string;
  service_name: string;
  description: string;
}

interface ServiceSelectionProps {
  services: Service[];
  selectedService: string | null;
  onSelectService: (serviceId: string) => void;
  isRtl?: boolean;
}

const getServiceIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case "خدمات ماساژ":
      return <FaSpa className="text-6xl text-primary-brand" />;
    case "خدمات لیزر":
      return <FaMagic className="text-6xl text-secondary-brand" />;
    case "خدمات ناخن":
      return <FaHeart className="text-6xl text-tertiary-brand" />;
    default:
      return <FaTools className="text-6xl text-secondary-light" />;
  }
};

export default function ServiceSelection({
  services,
  selectedService,
  onSelectService,
  isRtl = false,
}: ServiceSelectionProps) {
  if (!services || services.length === 0) return null;

  return (
    <div
      className={`mb-8 flex flex-col items-center ${
        isRtl ? "rtl text-right" : "ltr text-left"
      }`}
    >
      <h2 className="text-4xl font-bold mb-10 text-primary-dark dark:text-primary-light">
        {isRtl ? "انتخاب خدمات" : "Select Services"}
      </h2>

      <ul className="flex flex-wrap gap-8 justify-center w-full">
        {services.map((service) => (
          <li
            key={service.service_id}
            className={`relative w-64 h-64 p-6 rounded-2xl cursor-pointer shadow-lg transition-all flex flex-col items-center justify-center text-center bg-gradient-to-br from-primary-lightuser to-primary-lightuser dark:from-secondary-darkuser dark:to-tertiary-darkuser ${
              selectedService === service.service_id
                ? "border-4 border-primary-brand shadow-2xl scale-105"
                : "border-2 border-transparent hover:border-primary-brand hover:shadow-xl"
            } hover:scale-105`}
            onClick={() => onSelectService(service.service_id)}
          >
            <div className="mb-4">{getServiceIcon(service.service_name)}</div>
            <h3 className="text-xl font-semibold text-primary-dark dark:text-primary-light mb-2">
              {service.service_name || "سرویس بدون نام"}
            </h3>
            <p className="text-sm text-tertiary-darkuser dark:text-tertiary-lightuser">
              {service.description || "بدون توضیحات"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
