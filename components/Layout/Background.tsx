import React, { ReactNode } from "react";

interface BackgroundProps {
  mainClassName: string;
  secondClassName: string;
  children: ReactNode;
}

export const Background: React.FC<BackgroundProps> = ({
  mainClassName,
  secondClassName,
  children,
}) => {
  return (
    <main className={mainClassName}>
      <div className={secondClassName}></div>
      {children}
    </main>
  );
};
