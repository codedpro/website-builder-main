"use client";

import { NextUIProvider } from "@nextui-org/system";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";

export default function Theme({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextUIProvider> {children}</NextUIProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
