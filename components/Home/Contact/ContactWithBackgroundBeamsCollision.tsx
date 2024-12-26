"use client";
import React, { useState } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { motion } from "framer-motion";
import ShimmerButton from "@/components/ui/ShimmerButton";
import Link from "next/link";
import Image from "next/image";
import { DynamicFormSchema } from "@/types/DynamicForm";
import DynamicForm from "@/components/ui/DynamicForm";

interface ContactDetail {
  type: string;
  value: string;
  image: string;
  link?: string;
}

interface ContactWithBackgroundBeamsCollisionProps {
  contactDetails: ContactDetail[];
  isRtl: boolean;
  ShimmerButtonLight: string;
  ShimmerButtonDark: string;
  ShimmerButtonText: string;
  ContactForm: DynamicFormSchema;
}

const ContactInfoItem: React.FC<ContactDetail & { isRtl: boolean }> = ({
  image,
  value,
  link,
  isRtl,
}) => {
  return (
    <motion.div
      dir={isRtl ? "rtl" : ""}
      className="flex flex-col items-center space-y-3 p-4 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.8 }}
    >
      <motion.div
        className="flex items-center justify-center w-16 h-16 bg-gradient-to-r dark:from-secondary-dark dark:to-tertiary-dark from-primary-light to-secondary-light rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Image
          width={500}
          height={500}
          src={image}
          alt={value}
          className="w-12 h-12 object-cover"
        />
      </motion.div>
      {link ? (
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm sm:text-lg font-semibold text-primary-dark hover:text-secondary-dark dark:text-primary-light dark:hover:text-secondary-light transition duration-300 text-center"
        >
          {value}
        </Link>
      ) : (
        <span className="text-sm sm:text-lg font-semibold text-primary-dark dark:text-primary-light text-center">
          {value}
        </span>
      )}
    </motion.div>
  );
};

const ContactHeader: React.FC = () => {
  return (
    <motion.h2
      className="text-3xl md:text-5xl font-extrabold text-center text-primary-dark dark:text-primary-light tracking-tight mb-8 sm:mb-12"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.8 }}
    >
      با ما تماس بگیرید{" "}
      <div className="relative mx-auto inline-block w-max filter drop-shadow-lg">
        <div className="absolute left-0 top-[1px] bg-clip-text text-transparent bg-gradient-to-r from-secondary-dark via-tertiary-dark to-primary-dark dark:from-secondary-light dark:via-tertiary-light dark:to-primary-light py-4 text-shadow-lg">
          <span>همین حالا</span>
        </div>
        <div className="relative bg-clip-text text-transparent bg-gradient-to-r from-secondary-dark via-tertiary-dark to-primary-dark dark:from-secondary-light dark:via-tertiary-light dark:to-primary-light py-4">
          <span>همین حالا</span>
        </div>
      </div>
    </motion.h2>
  );
};

const ContactWithBackgroundBeamsCollision: React.FC<
  ContactWithBackgroundBeamsCollisionProps
> = ({
  contactDetails,
  isRtl,
  ShimmerButtonDark,
  ShimmerButtonLight,
  ShimmerButtonText,
  ContactForm,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  return (
    <BackgroundBeamsWithCollision>
      <div className="container mx-auto px-4 w-full z-[99999]">
        <ContactHeader />
        <div className="relative z-20 mt-8 grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-8">
          {contactDetails.map((contact, index) => (
            <ContactInfoItem key={index} {...contact} isRtl={isRtl} />
          ))}
        </div>
        <div className="flex items-center justify-center">
          <motion.div
            className="z-0 flex min-h-[16rem] items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.8 }}
          >
            <ShimmerButton
              shimmerColor={ShimmerButtonLight}
              onClick={handleFormOpen}
              className="shadow-2xl hidden dark:flex"
              background={ShimmerButtonDark}
            >
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-primary-dark dark:text-primary-light lg:text-lg">
                {ShimmerButtonText}
              </span>
            </ShimmerButton>
            <ShimmerButton
              shimmerColor={ShimmerButtonDark}
              onClick={handleFormOpen}
              className="dark:hidden"
              background={ShimmerButtonLight}
            >
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-primary-dark dark:text-primary-light lg:text-lg">
                {ShimmerButtonText}
              </span>
            </ShimmerButton>
          </motion.div>
        </div>

        <DynamicForm
          isOpen={isFormOpen}
          onClose={handleFormClose}
          schema={ContactForm}
          isRtl={isRtl}
        />
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default ContactWithBackgroundBeamsCollision;
