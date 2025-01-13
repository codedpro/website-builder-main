"use client";

import React, { useState, useRef, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import {
  BottomGradient,
  Input,
  LabelInputContainer,
} from "@/components/ui/forms";
import { Label } from "@radix-ui/react-label";

interface FormState {
  email: string;
  password: string;
}

interface FieldErrors {
  email: boolean;
  password: boolean;
}

export default function Signin() {
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({
    email: false,
    password: false,
  });
  const router = useRouter();
  const separatorRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (separatorRef.current) {
      gsap.fromTo(
        separatorRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
      );
    }

    if (formRef.current) {
      const fields = formRef.current.querySelectorAll(".form-field");
      gsap.fromTo(
        fields,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)",
          stagger: 0.3,
          delay: 0.5,
        }
      );
    }

    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
          delay: 1.2,
        }
      );
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setFieldErrors((prev) => ({ ...prev, [name]: false }));

    if (form.email && form.password) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setFieldErrors({
        email: !form.email,
        password: !form.password,
      });
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (res?.error) {
        if (res.error === "Invalid email or password") {
          setError("Your account is suspended or your password is incorrect.");
        } else {
          setError(res.error);
        }
      } else {
        router.push("/");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("An unexpected error occurred:", err.message);
        setError("An unexpected error occurred. Please try again.");
      } else {
        console.error("Unknown error:", err);
        setError("An unknown error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div ref={separatorRef} className="my-4 flex items-center justify-center">
        <span className="block h-px w-full bg-secondary-dark"></span>
        <div className="block w-full min-w-fit px-2 text-center font-medium text-primary-light">
          Sign in using email
        </div>
        <span className="block h-px w-full bg-secondary-dark"></span>
      </div>

      <div ref={formRef}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-field">
            <LabelInputContainer>
              <Label htmlFor="email" className="block text-tertiary-light">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="your.email@example.com"
                value={form.email}
                onChange={handleChange}
                forcedTheme="dark"
                isError={fieldErrors.email}
                bgColorDark="bg-[#1a1a1a]"
                className="w-full p-2 border rounded-md"
              />
            </LabelInputContainer>
            {fieldErrors.email && (
              <div className="text-red-500 text-sm">Email is required.</div>
            )}
          </div>
          <div className="form-field">
            <LabelInputContainer>
              <Label htmlFor="password" className="block text-tertiary-light">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="•••••••••••"
                value={form.password}
                forcedTheme="dark"
                onChange={handleChange}
                isError={fieldErrors.password}
                bgColorDark="bg-[#1a1a1a]"
                className="w-full p-2 border rounded-md"
              />
            </LabelInputContainer>
            {fieldErrors.password && (
              <div className="text-red-500 text-sm">Password is required.</div>
            )}
          </div>
          <button
            ref={buttonRef}
            className={`bg-gradient-to-br relative group/btn from-[#1a1a1a] to-[##1d1d1d] block w-full text-white rounded-md h-10 font-medium border border-solid border-zinc-800 shadow-md ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign in →"}
            <BottomGradient />
          </button>
        </form>
        {error && <div className="mt-4 text-center text-red-500">{error}</div>}
      </div>
    </>
  );
}
