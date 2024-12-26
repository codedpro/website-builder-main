import React, { useState, useCallback, useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "./forms/label";
import { Input } from "./forms/input";
import { Meteors } from "./meteors";
import { Select } from "./forms/Select";
import { RadioButton } from "./forms/RadioButton";
import Portal from "../Layout/Portal";
import { LabelInputContainer } from "./forms/LabelInputContainer";
import { BottomGradient } from "./forms";

const MemoizedMeteors = React.memo(Meteors);

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  "Select a Service",
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "E-commerce",
  "Digital Marketing and SEO",
  "Website Management",
  "WordPress Development",
  "AI",
];

const ContactFormModal: React.FC<ContactFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    contactMethod: "email",
    service: "",
    otherService: "",
    bestTime: "morning",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    service: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  const validateForm = () => {
    const newErrors = {
      firstName: formData.firstName.trim() === "",
      lastName: formData.lastName.trim() === "",
      email: formData.email.trim() === "",
      phone: formData.phone.trim() === "",
      service:
        formData.service.trim() === "" ||
        formData.service.trim() === "Select a Service",
    };

    setErrors(newErrors);

    const missingFields = Object.keys(newErrors).filter(
      (key) => newErrors[key as keyof typeof newErrors]
    );

    if (missingFields.length > 0) {
      setErrorMessage(
        `Please fill out the following fields: ${missingFields
          .map((field) => field.charAt(0).toUpperCase() + field.slice(1))
          .join(", ")}`
      );
    } else {
      setErrorMessage("");
    }

    return missingFields.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Email sent successfully!");
        onClose();
      } else {
        alert("Failed to send email.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[99997] flex items-center justify-center p-4 overflow-y-auto ">
            <motion.div
              className="bg-neutral-900/80 backdrop-blur-lg fixed inset-0 z-[99996]"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <MemoizedMeteors number={60} className="z-[99997]" />
            <motion.div
              className="bg-neutral-900 p-6 sm:p-8 rounded-none  md:rounded-2xl max-w-lg w-full  mt-12 mx-auto shadow-input relative z-[99998]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-transparent text-neutral-200"
              >
                <IconX className="h-6 w-6" />
              </button>
              <h3 className="text-2xl font-semibold mb-6 text-neutral-200">
                Contact Form
              </h3>
              <form onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    name="firstName"
                    placeholder="John"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    isError={errors.firstName}
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    name="lastName"
                    placeholder="Doe"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    isError={errors.lastName}
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="john.doe@example.com"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    isError={errors.email}
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="(123) 456-7890"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    isError={errors.phone}
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label>Preferred Contact Method</Label>
                  <div className="flex space-x-4">
                    <Label className="flex items-center ml-4">
                      <RadioButton
                        type="radio"
                        name="contactMethod"
                        value="email"
                        defaultChecked
                        onChange={handleChange}
                      />
                      Email
                    </Label>
                    <Label className="flex items-center">
                      <RadioButton
                        type="radio"
                        name="contactMethod"
                        value="phone"
                        onChange={handleChange}
                      />
                      Phone
                    </Label>
                  </div>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="service">Select a Service</Label>
                  <Select
                    id="service"
                    name="service"
                    className="w-full p-2 rounded-md bg-neutral-800 text-white"
                    value={formData.service}
                    onChange={handleChange}
                    isError={errors.service}
                  >
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                    <option value="other">Other</option>
                  </Select>
                </LabelInputContainer>
                {formData.service === "other" && (
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="other-service">
                      If Other, Please Specify
                    </Label>
                    <Input
                      id="other-service"
                      name="otherService"
                      placeholder="Please specify your service"
                      type="text"
                      value={formData.otherService}
                      onChange={handleChange}
                    />
                  </LabelInputContainer>
                )}
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="contact-time">Best Time to Contact You</Label>
                  <Select
                    id="contact-time"
                    name="bestTime"
                    className="w-full p-2 rounded-md bg-neutral-800 text-white"
                    value={formData.bestTime}
                    onChange={handleChange}
                  >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                    <option value="night">Night</option>
                  </Select>
                </LabelInputContainer>

                {errorMessage && (
                  <p className="text-red-500 mb-4">Please fill all fields</p>
                )}
                <button
                  type="submit"
                  className="bg-gradient-to-br relative group/btn from-neutral-800 to-neutral-900 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] hover:bg-[#3a3a3a] transition duration-300"
                >
                  Send
                  <BottomGradient />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default ContactFormModal;
