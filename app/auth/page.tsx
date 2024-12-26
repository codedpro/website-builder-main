"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import logoDark from "../../public/company/logo/logoDark.png";
import { BackgroundBeams } from "@/components/Auth/ui/background-beams";
import Signin from "@/components/Auth/Signin";
import Signup from "@/components/Auth/Signup";

const Logo: React.FC = () => {
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const currentLogoRef = logoRef.current;
    if (!currentLogoRef) return;

    gsap.fromTo(
      currentLogoRef,
      { opacity: 0, scale: 0.5, rotation: -180 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        delay: 0.3,
      }
    );

    const handleMouseMove = (event: MouseEvent) => {
      const rect = currentLogoRef.getBoundingClientRect();
      const logoX = rect.left + rect.width / 2;
      const logoY = rect.top + rect.height / 2;
      const deltaX = event.clientX - logoX;
      const deltaY = event.clientY - logoY;

      const rotationY = deltaX / 5;
      const rotationX = -deltaY / 5;

      gsap.to(currentLogoRef, {
        rotationY: rotationY,
        rotationX: rotationX,
        ease: "power2.out",
        duration: 0.2,
      });
    };

    const handleMouseEnter = () => {
      gsap.to(currentLogoRef, {
        scale: 1.15,
        ease: "power3.out",
        duration: 0.6,
      });
      window.addEventListener("mousemove", handleMouseMove);
    };

    const handleMouseLeave = () => {
      gsap.to(currentLogoRef, {
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        ease: "power3.out",
        duration: 0.6,
      });
      window.removeEventListener("mousemove", handleMouseMove);
    };

    if (window.innerWidth > 768) {
      gsap.set(currentLogoRef, { transformPerspective: 1000 });

      currentLogoRef.addEventListener("mouseenter", handleMouseEnter);
      currentLogoRef.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (currentLogoRef) {
        currentLogoRef.removeEventListener("mouseenter", handleMouseEnter);
        currentLogoRef.removeEventListener("mouseleave", handleMouseLeave);
      }
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Image
      className="block select-none"
      src={logoDark}
      alt="Logo"
      width={250}
      height={100}
      ref={logoRef}
      draggable="false"
    />
  );
};

const AuthContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const authType = searchParams.get("authType") || "signin";

  const toggleAuth = () => {
    if (authType === "signup") {
      router.push("/auth?authType=signin");
    } else {
      router.push("/auth?authType=signup");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 flex justify-center items-center">
        <Logo />
      </div>
      <div className="w-full">
        {authType === "signup" ? <Signup /> : <Signin />}
      </div>
      <div className="text-center text-secondary-light mt-4">
        {authType === "signup" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={toggleAuth}
              className="text-primary-brand cursor-pointer underline"
            >
              Sign In
            </span>
          </p>
        ) : (
          <p>
            Don&#39;t have an account?{" "}
            <span
              onClick={toggleAuth}
              className="text-primary-brand cursor-pointer underline"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

const AuthPage: React.FC = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    const elements = gsap.utils.toArray(".animate-content");

    tl.fromTo(
      elements,
      { opacity: 0, y: 40, rotationX: 90 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        stagger: 0.3,
      }
    );
  }, []);

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-[#101010] relative flex flex-col items-center justify-center antialiased">
      <div className="z-30 hidden sm:flex">
        <BackgroundBeams />
      </div>

      <div className="w-full max-w-md z-40 px-4 my-8 md:px-0">
        <div className="w-full">
          <div
            ref={contentRef}
            className="overflow-hidden rounded-2xl p-6 md:px-10 md:pt-10 bg-[#1d1d1d]/50 shadow-lg animate-content"
          >
            <AuthContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
