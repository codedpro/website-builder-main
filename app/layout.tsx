import type { Metadata } from "next";
import localFont from "next/font/local";
import { fetchColors } from "@/lib/colors";
import "./globals.css";
import { CSSProperties } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Website Builder",
  description: "Created by CodedPro",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { lightTheme, darkTheme, lightUserTheme, darkUserTheme, brandTheme } =
    await fetchColors();

  return (
    <html
      lang="fa"
      style={
        {
          "--primary-color-light": lightTheme.primary,
          "--secondary-color-light": lightTheme.secondary,
          "--tertiary-color-light": lightTheme.tertiary,
          "--primary-color-dark": darkTheme.primary,
          "--secondary-color-dark": darkTheme.secondary,
          "--tertiary-color-dark": darkTheme.tertiary,
          "--primary-color-brand": brandTheme.primary,
          "--secondary-color-brand": brandTheme.secondary,
          "--tertiary-color-brand": brandTheme.tertiary,
          "--primary-color-lightuser": lightUserTheme.primary,
          "--secondary-color-lightuser": lightUserTheme.secondary,
          "--tertiary-color-lightuser": lightUserTheme.tertiary,
          "--primary-color-darkuser": darkUserTheme.primary,
          "--secondary-color-darkuser": darkUserTheme.secondary,
          "--tertiary-color-darkuser": darkUserTheme.tertiary,
        } as CSSProperties
      }
    >
      <body>
        <div className={`${geistSans.variable} ${geistMono.variable}`}>
          {children}
        </div>
      </body>
    </html>
  );
}
