import { useState } from "react";
import { Input } from "../ui/forms";

interface CustomerInfoProps {
  customerInfo: {
    fullName: string;
    email: string;
    phoneNumber: string;
    marketingEmails: boolean;
    acceptRules: boolean;
  };
  setCustomerInfo: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      email: string;
      phoneNumber: string;
      marketingEmails: boolean;
      acceptRules: boolean;
    }>
  >;
}

export default function CustomerInfo({
  customerInfo,
  setCustomerInfo,
}: CustomerInfoProps) {
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const validatePhoneNumber = (value: string) => {
    const phoneRegex = /^09\d{9}$/; // Must start with 093 and have exactly 10 digits
    if (!phoneRegex.test(value)) {
      setPhoneError("شماره تلفن باید با 09 شروع شود و دقیقا ۱۰ رقم باشد.");
      return false;
    }
    setPhoneError(null);
    return true;
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    if (!emailRegex.test(value)) {
      setEmailError("لطفا یک ایمیل معتبر وارد کنید.");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handlePhoneNumberChange = (value: string) => {
    setCustomerInfo((prev) => ({ ...prev, phoneNumber: value }));
    validatePhoneNumber(value);
  };

  const handleEmailChange = (value: string) => {
    setCustomerInfo((prev) => ({ ...prev, email: value }));
    validateEmail(value);
  };

  return (
    <div
      className="p-6 bg-primary-lightuser dark:bg-primary-darkuser rounded-xl shadow-lg"
      dir="rtl"
    >
      <h2 className="text-2xl font-bold text-primary-brand mb-4">
        اطلاعات مشتری
      </h2>
      <div className="space-y-4">
        {/* Full Name */}
        <Input
          type="text"
          placeholder="نام کامل"
          value={customerInfo.fullName}
          onChange={(e) =>
            setCustomerInfo((prev) => ({ ...prev, fullName: e.target.value }))
          }
        />

        {/* Email */}
        <div>
          <Input
            type="email"
            placeholder="example@domain.com"
            value={customerInfo.email}
            onChange={(e) => handleEmailChange(e.target.value)}
            isError={emailError ? true : false}
          />
          {emailError && (
            <p className="mt-2 text-sm text-red-500">{emailError}</p>
          )}
          {!emailError && customerInfo.email && (
            <p className="mt-2 text-sm text-green-500">ایمیل معتبر است.</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <Input
            type="tel"
            placeholder="09352001234"
            value={customerInfo.phoneNumber}
            onChange={(e) => handlePhoneNumberChange(e.target.value)}
            isError={phoneError ? true : false}
          />
          {phoneError && (
            <p className="mt-2 text-sm text-red-500">{phoneError}</p>
          )}
          {!phoneError && customerInfo.phoneNumber && (
            <p className="mt-2 text-sm text-green-500">شماره تلفن معتبر است.</p>
          )}
        </div>

        {/* Marketing Emails */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={customerInfo.marketingEmails}
            onChange={(e) =>
              setCustomerInfo((prev) => ({
                ...prev,
                marketingEmails: e.target.checked,
              }))
            }
            className="accent-primary-brand"
          />
          دریافت ایمیل‌های بازاریابی
        </label>

        {/* Accept Rules */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={customerInfo.acceptRules}
            onChange={(e) =>
              setCustomerInfo((prev) => ({
                ...prev,
                acceptRules: e.target.checked,
              }))
            }
            className="accent-primary-brand"
          />
          موافقت با قوانین و مقررات
        </label>
      </div>
    </div>
  );
}
