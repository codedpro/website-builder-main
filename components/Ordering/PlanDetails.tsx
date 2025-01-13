import { FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";

interface PlanDetailsProps {
  texts: {
    title: string;
    name: string;
    features: string[];
    price: {
      text: string;
      value: number;
    };
    discountPrice: {
      text: string;
      value: number;
    };
    description: string;
  };
}

export default function PlanDetails({ texts }: PlanDetailsProps) {
  return (
    <div className="p-8 rounded-xl shadow-xl bg-secondary-lightuser dark:bg-secondary-darkuser text-primary-darkuser dark:text-primary-lightuser">
      {/* Title */}
      <h2 className="text-3xl font-extrabold text-primary-brand mb-6 text-center">
        {texts.title}
      </h2>

      {/* Plan Name */}
      <p className="text-xl font-semibold text-center text-secondary-darkuser dark:text-secondary-lightuser mb-4">
        {texts.name}
      </p>

      {/* Description */}
      <p className="text-center text-sm leading-relaxed text-tertiary-darkuser dark:text-tertiary-lightuser mb-8">
        {texts.description}
      </p>

      {/* Features */}
      <div className="space-y-4 mb-8">
        {texts.features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-primary-lightuser dark:bg-primary-darkuser rounded-md shadow-sm"
          >
            <FaCheckCircle className="text-primary-brand text-lg" />
            <span className="text-base font-medium text-secondary-darkuser dark:text-secondary-lightuser">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Prices */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-lg font-medium">
          <span className="flex items-center gap-2">
            <FaMoneyBillWave className="text-primary-brand text-2xl" />
            <span>قیمت اصلی:</span>
          </span>
          <span className="line-through text-tertiary-darkuser dark:text-tertiary-lightuser">
            {texts.price.text}
          </span>
        </div>
        <div className="flex items-center justify-between text-lg font-semibold">
          <span className="flex items-center gap-2">
            <FaMoneyBillWave className="text-tertiary-brand text-2xl" />
            <span>قیمت تخفیف خورده:</span>
          </span>
          <span className="text-lg font-extrabold text-primary-brand">
            {texts.discountPrice.text}
          </span>
        </div>
      </div>

 
    </div>
  );
}
