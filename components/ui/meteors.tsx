import { cn } from "@/lib/utils";
import React from "react";

type MeteorsProps = {
  number?: number;
  className?: string;
};

export const Meteors: React.FC<MeteorsProps> = ({ number = 20, className }) => {
  const generateRandomValue = (min: number, max: number) => Math.random() * (max - min) + min;
  
  const meteors = React.useMemo(() => Array.from({ length: number }, (_, idx) => idx), [number]);

  return (
    <>
      {meteors.map((_, idx) => (
        <span
          key={`meteor-${idx}`}
          className={cn(
            "animate-meteor-effect absolute h-0.5 w-0.5 rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-1/2 before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: `calc(${Math.floor(generateRandomValue(0, 80))}vh - 20vh)`,
            left: `calc(${Math.floor(generateRandomValue(0, 80))}vw - 20vw)`,
            animationDelay: `${generateRandomValue(0.2, 0.8)}s`,
            animationDuration: `${Math.floor(generateRandomValue(4, 8))}s`,
          }}
        />
      ))}
    </>
  );
};
