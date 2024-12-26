"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { Spotlight } from "@/components/ui/Spotlight";
import { gsap } from "gsap";

interface SpotlightHeroProps {
  isRtl: boolean;
  className?: string;
  spotlightClassName?: string;
  spotlightFill?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  button1Text: string;
  button1Url: string;
  button1TargetBlank?: boolean;
  button2Text: string;
  button2Url: string;
  button2TargetBlank?: boolean;
}

export function SpotlightHero({
  isRtl,
  className = "",
  spotlightClassName = "",
  spotlightFill = "var(--primary-color-light)",
  title,
  description,
  button1Text,
  button1Url,
  button1TargetBlank = false,
  button2Text,
  button2Url,
  button2TargetBlank = false,
}: SpotlightHeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const button1Ref = useRef<HTMLAnchorElement>(null);
  const button2Ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      0.5
    );

    tl.fromTo(
      descriptionRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      0.7
    );

    tl.fromTo(
      [button1Ref.current, button2Ref.current],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
      },
      0.9
    );
  }, []);

  function handleMouseEnterButton(ref: React.RefObject<HTMLAnchorElement>) {
    gsap.to(ref.current, {
      duration: 0.3,
      scale: 1.05,
      rotation: 2,
      ease: "power1.out",
    });
  }

  function handleMouseLeaveButton(ref: React.RefObject<HTMLAnchorElement>) {
    gsap.to(ref.current, {
      duration: 0.3,
      scale: 1,
      rotation: 0,
      ease: "power1.out",
    });
  }

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center antialiased relative overflow-hidden ${className}`}
    >
      <Spotlight className={spotlightClassName} fill={spotlightFill} />

      <div
        dir={isRtl ? "rtl" : ""}
        className="p-4 max-w-7xl mx-auto relative z-10 w-full text-center"
      >
        <h1
          ref={titleRef}
          className="text-4xl p-1 md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-primary-dark to-tertiary-dark dark:from-primary-light dark:to-tertiary-light"
        >
          {title}
        </h1>
        <p
          ref={descriptionRef}
          className="mt-4 font-normal text-base md:text-lg lg:text-xl text-primary-dark dark:text-primary-light max-w-lg mx-auto"
        >
          {description}
        </p>
      </div>

      <div className="flex p-4 relative z-10 w-full justify-center space-x-4">
        <Link
          href={button1Url}
          target={button1TargetBlank ? "_blank" : undefined}
          rel={button1TargetBlank ? "noopener noreferrer" : undefined}
          ref={button1Ref}
          onMouseEnter={() => handleMouseEnterButton(button1Ref)}
          onMouseLeave={() => handleMouseLeaveButton(button1Ref)}
          className="px-8 py-3 rounded-xl bg-primary-dark border dark:border-primary-light border-transparent text-primary-light text-base flex items-center justify-center"
        >
          {button1Text}
        </Link>
        <Link
          href={button2Url}
          target={button2TargetBlank ? "_blank" : undefined}
          rel={button2TargetBlank ? "noopener noreferrer" : undefined}
          ref={button2Ref}
          onMouseEnter={() => handleMouseEnterButton(button2Ref)}
          onMouseLeave={() => handleMouseLeaveButton(button2Ref)}
          className="px-8 py-3 rounded-xl bg-primary-light text-primary-dark border border-primary-dark text-base flex items-center justify-center"
        >
          {button2Text}
        </Link>
      </div>
    </div>
  );
}
