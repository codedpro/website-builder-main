import { useState } from "react";
import { Input } from "../ui/forms";

interface DomainNameProps {
  domainName: string;
  setDomainName: React.Dispatch<React.SetStateAction<string>>;
}

export default function DomainName({ domainName, setDomainName }: DomainNameProps) {
  const [error, setError] = useState<string | null>(null);

  const validateDomain = (value: string) => {
    const domainRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/; // Simple domain validation (e.g., example.com)
    if (value.startsWith("www.")) {
      setError("نام دامنه نباید با 'www.' شروع شود.");
      return false;
    } else if (!domainRegex.test(value)) {
      setError("فرمت نام دامنه اشتباه است. مثال: migmig-web.com");
      return false;
    }
    setError(null);
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDomainName(value);
    validateDomain(value);
  };

  return (
    <div className="p-6 bg-primary-lightuser dark:bg-primary-darkuser rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-primary-brand mb-4">نام دامنه</h2>
      <div>
        <Input
          type="text"
          placeholder="migmig-web.com"
          value={domainName}
          onChange={handleChange}
          isError={error ? true : false}
       
        />
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
        {!error && domainName && (
          <p className="mt-2 text-sm text-green-500">نام دامنه معتبر است.</p>
        )}
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          نام دامنه باید بدون www باشد. به عنوان مثال: migmig-web.com
        </p>
      </div>
    </div>
  );
}
