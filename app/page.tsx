"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import UserLayout from "@/components/Layout/UserLayout";
import PlanDetails from "@/components/Ordering/PlanDetails";
import TemplatePreview from "@/components/Ordering/TemplatePreview";
import AddOnsSection from "@/components/Ordering/AddOnsSection";
import OrderSummary from "@/components/Ordering/OrderSummary";
import texts from "@/lib/constants/WebsiteOrderingtexts";
import CustomerInfo from "@/components/Ordering/CustomerInfo";
import DomainName from "@/components/Ordering/DomainName";

interface WebsiteBuilderAddon {
  id: number;
  addon_name: string;
  addon_price: number;
  addon_discount_price: number;
  quantity: number;
  // If you want a default selection concept, add it here:
  // preSelected?: boolean;
}

export default function WebsiteBuyingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // Customer info
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    marketingEmails: false,
    acceptRules: false,
  });

  // Domain
  const [domainName, setDomainName] = useState("");

  // 1. State to store fetched add-ons
  const [addons, setAddons] = useState<WebsiteBuilderAddon[]>([]);

  // 2. State to track which add-ons are selected
  //    You could store by ID, so: { [addonId]: boolean }
  const [selectedAddOns, setSelectedAddOns] = useState<{
    [addonId: number]: boolean;
  }>({});

  // 3. Price states
  const basePrice = texts.plan.price.value;
  const discountedBasePrice = texts.plan.discountPrice.value;

  const [totalPriceWithoutDiscount, setTotalPriceWithoutDiscount] =
    useState(basePrice);
  const [totalPriceWithDiscount, setTotalPriceWithDiscount] =
    useState(discountedBasePrice);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAddons = async () => {
      try {
        const res = await fetch("/api/website/getAddons");
        if (!res.ok) {
          throw new Error("Failed to fetch addons");
        }

        const response = await res.json();
        console.log("API response:", response);

        // Ensure we access the `data` key in the response
        const addonsArray = response.data;
        if (!Array.isArray(addonsArray)) {
          throw new Error("Addons API did not return a valid array");
        }

        // Initialize state and pricing logic
        const initialSelectedAddOns: { [addonId: number]: boolean } = {};
        const withoutDiscount = basePrice;
        const withDiscount = discountedBasePrice;

        addonsArray.forEach((addon) => {
          initialSelectedAddOns[addon.id] = false; // Default selection
        });

        setAddons(addonsArray);
        setSelectedAddOns(initialSelectedAddOns);
        setTotalPriceWithoutDiscount(withoutDiscount);
        setTotalPriceWithDiscount(withDiscount);
      } catch (error) {
        console.error("Error fetching addons:", error);
      }
    };

    fetchAddons();
  }, [basePrice, discountedBasePrice]);

  // 5. Handle changes in add-on selection
  const handleAddOnChange = (addonId: number, isSelected: boolean) => {
    const addOn = addons.find((a) => a.id === addonId);
    if (!addOn) return;

    const priceChange = addOn.addon_price;
    const discountChange = addOn.addon_discount_price ?? addOn.addon_price;

    setSelectedAddOns((prev) => ({
      ...prev,
      [addonId]: isSelected,
    }));

    setTotalPriceWithoutDiscount((prev) =>
      isSelected ? prev + priceChange : prev - priceChange
    );
    setTotalPriceWithDiscount((prev) =>
      isSelected ? prev + discountChange : prev - discountChange
    );
  };

  // Validation for steps
  const isCustomerInfoValid = () => {
    const phoneRegex = /^09\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
      customerInfo.fullName.trim() !== "" &&
      phoneRegex.test(customerInfo.phoneNumber) &&
      emailRegex.test(customerInfo.email) &&
      customerInfo.acceptRules
    );
  };

  const isDomainValid = () => {
    const domainRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domainName) && !domainName.startsWith("www.");
  };

  const isNextDisabled = () => {
    if (currentStep === 2) return !isCustomerInfoValid();
    if (currentStep === 3) return !isDomainValid();
    return false;
  };

  // Submit data to the API
  const onSubmit = async () => {
    setIsSubmitting(true);

    // Collect data
    const orderData = {
      customerInfo,
      domainName,
      selectedAddOns: Object.keys(selectedAddOns)
        .map((idStr) => Number(idStr))
        .filter((id) => selectedAddOns[id]),
      totalPriceWithDiscount,
      totalPriceWithoutDiscount,
    };

    try {
      const response = await fetch("/api/website/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("سفارش شما با موفقیت ثبت شد!");
        router.push("/");
      } else {
        const errorData = await response.json();
        // Use errorData.message to display the error
        alert(
          `خطا در ثبت سفارش: ${errorData.message || "مشکلی پیش آمده است."}`
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Something went wrong", err.message);
      }
      alert("مشکلی پیش آمده است. لطفا دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  // Steps
  const steps = [
    <PlanDetails key="plan" texts={texts.plan} />,
    <TemplatePreview key="template" templates={texts.templates} />,
    <CustomerInfo
      key="customerInfo"
      customerInfo={customerInfo}
      setCustomerInfo={setCustomerInfo}
    />,
    <DomainName
      key="domainName"
      domainName={domainName}
      setDomainName={setDomainName}
    />,

    // Pass the fetched addons and selection states to AddOnsSection
    <AddOnsSection
      key="addons"
      addons={addons}
      selectedAddOns={selectedAddOns}
      onAddOnChange={handleAddOnChange}
    />,

    <OrderSummary
      key="summary"
      texts={texts.summary}
      totalPriceWithDiscount={totalPriceWithDiscount}
      totalPriceWithoutDiscount={totalPriceWithoutDiscount}
      // For summary, you might need the actual add-on objects to display names:
      selectedAddOns={selectedAddOns}
      addons={addons}
    />,
  ];

  return (
    <UserLayout>
      <div className="container mx-auto p-8 space-y-10">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-primary-brand">
            {texts.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {texts.subtitle}
          </p>
        </header>

        {/* Steps */}
        <main>{steps[currentStep]}</main>

        {/* Navigation Buttons */}
        <footer className="flex justify-between items-center">
          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              disabled={isNextDisabled()}
              className={`px-6 py-3 rounded-lg font-medium shadow transition-all ${
                isNextDisabled()
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-primary-brand hover:bg-secondary-brand text-white"
              }`}
            >
              ادامه
            </button>
          ) : (
            <button
              onClick={onSubmit}
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-lg font-medium shadow transition-all ${
                isSubmitting
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {isSubmitting ? "در حال ارسال..." : "ثبت سفارش"}
            </button>
          )}

          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium shadow transition-all"
            >
              بازگشت
            </button>
          )}
        </footer>
      </div>
    </UserLayout>
  );
}
