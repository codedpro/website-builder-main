"use client";

import React, { useState, useRef, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import "react-phone-input-2/lib/style.css";
import zxcvbn from "zxcvbn";
import { gsap } from "gsap";
import {
  BottomGradient,
  Input,
  Label,
  LabelInputContainer,
  StyledPhoneInput,
} from "@/components/ui/forms";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FieldErrors {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  phone: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export default function Signup() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);

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
          delay: 2.2,
        }
      );
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setFieldErrors((prev) => ({ ...prev, [name]: false }));

    if (name === "password") {
      if (value === "") {
        setPasswordStrength(0);
      } else {
        const result = zxcvbn(value);
        setPasswordStrength(result.score);
      }
    }

    setError("");
  };

  const handlePhoneChange = (phone: string) => {
    setForm((prev) => ({ ...prev, phone }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const missingFields: Partial<FieldErrors> = {
      firstName: !form.firstName,
      lastName: !form.lastName,
      email: !form.email,
      phone: !form.phone,
      password: !form.password,
      confirmPassword: !form.confirmPassword,
    };

    const hasMissingFields = Object.values(missingFields).some((v) => v);
    if (hasMissingFields) {
      setFieldErrors((prev) => ({ ...prev, ...missingFields }));
      setError("Please fill out all required fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: true,
      }));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const signInResult = await signIn("credentials", {
          redirect: false,
          email: form.email,
          password: form.password,
        });

        if (signInResult?.error) {
          setError(signInResult.error);
        } else {
          router.push("/");
        }
      } else {
        console.log(data);
        setError(
          data.message || data.error || "Sign-up failed. Please try again."
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error during sign-up:", err.message);
        setError("An error occurred during sign-up.");
      } else {
        console.error("Unknown error during sign-up:", err);
        setError("An unknown error occurred during sign-up.");
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
          Sign up using email
        </div>
        <span className="block h-px w-full bg-secondary-dark"></span>
      </div>
      <div ref={formRef}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-field relative z-10">
            <LabelInputContainer>
              <Label htmlFor="firstName" className="block text-tertiary-light">
                First Name
              </Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Your First Name"
                value={form.firstName}
                onChange={handleChange}
                isError={fieldErrors.firstName}
                className="w-full p-2 border rounded-md"
                bgColorDark="bg-[#1a1a1a]"
                forcedTheme="dark"
              />
            </LabelInputContainer>
            {fieldErrors.firstName && (
              <div className="text-red-500 text-sm">
                First name is required.
              </div>
            )}
          </div>

          <div className="form-field relative z-10">
            <LabelInputContainer>
              <Label htmlFor="lastName" className="block text-tertiary-light">
                Last Name
              </Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Your Last Name"
                value={form.lastName}
                onChange={handleChange}
                isError={fieldErrors.lastName}
                className="w-full p-2 border rounded-md"
                bgColorDark="bg-[#1a1a1a]"
                forcedTheme="dark"
              />
            </LabelInputContainer>
            {fieldErrors.lastName && (
              <div className="text-red-500 text-sm">Last name is required.</div>
            )}
          </div>

          <div className="form-field relative z-10">
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
                isError={fieldErrors.email}
                className="w-full p-2 border rounded-md"
                bgColorDark="bg-[#1a1a1a]"
                forcedTheme="dark"
              />
            </LabelInputContainer>
            {fieldErrors.email && (
              <div className="text-red-500 text-sm">Email is required.</div>
            )}
          </div>

          <div className="form-field relative z-20">
            <LabelInputContainer>
              <Label htmlFor="phone" className="block text-tertiary-light">
                Phone
              </Label>
              <StyledPhoneInput
                country={"ir"}
                value={form.phone}
                onChange={handlePhoneChange}
              />
            </LabelInputContainer>
            {fieldErrors.phone && (
              <div className="text-red-500 text-sm">
                Phone number is required.
              </div>
            )}
          </div>

          <div className="form-field relative z-10">
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
                onChange={handleChange}
                isError={fieldErrors.password}
                className="w-full p-2 border rounded-md"
                bgColorDark="bg-[#1a1a1a]"
                forcedTheme="dark"
              />
              <div className="mt-2 h-2 w-full bg-transparent border border-[#4d4d4d] rounded-md overflow-hidden relative">
                <div
                  style={{ width: `${Math.min(passwordStrength * 25, 100)}%` }}
                  className={`h-full transition-all duration-500 ease-in-out ${getPasswordStrengthGradient(
                    passwordStrength
                  )}`}
                />
              </div>
            </LabelInputContainer>
            {fieldErrors.password && (
              <div className="text-red-500 text-sm">Password is required.</div>
            )}
          </div>

          <div className="form-field relative z-10">
            <LabelInputContainer>
              <Label
                htmlFor="confirmPassword"
                className="block text-tertiary-light"
              >
                Confirm Password
              </Label>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="•••••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                isError={fieldErrors.confirmPassword}
                className="w-full p-2 border rounded-md"
                bgColorDark="bg-[#1a1a1a]"
                forcedTheme="dark"
              />
            </LabelInputContainer>
            {fieldErrors.confirmPassword && (
              <div className="text-red-500 text-sm">
                Confirm password is required.
              </div>
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
            {loading ? "Loading..." : "Sign Up →"}
            <BottomGradient />
          </button>
        </form>

        {error && <div className="mt-4 text-center text-red-500">{error}</div>}
      </div>
    </>
  );
}

const getPasswordStrengthGradient = (strength: number) => {
  switch (strength) {
    case 0:
      return "bg-gradient-to-r from-red-400 via-red-500 to-red-600";
    case 1:
      return "bg-gradient-to-r from-red-600 via-red-700 to-red-900";
    case 2:
      return "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600";
    case 3:
      return "bg-gradient-to-r from-green-400 via-green-500 to-green-600";
    case 4:
      return "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600";
    default:
      return "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600";
  }
};
