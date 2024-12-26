// FallbackUI.tsx
import React from "react";

interface FallbackUIProps {
  message: string;
}

const FallbackUI: React.FC<FallbackUIProps> = ({ message }) => {
  return (
    <div className="p-6 text-primary-darkuser dark:text-primary-light min-h-screen text-right flex flex-col items-center justify-center">
      <p className="mb-4 text-lg">{message}</p>
      <button
        onClick={() => window.history.back()}
        className="px-4 py-2 bg-primary-brand text-white rounded hover:bg-primary-dark"
      >
        بازگشت
      </button>
    </div>
  );
};

export default FallbackUI;
