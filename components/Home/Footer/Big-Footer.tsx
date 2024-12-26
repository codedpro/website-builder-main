import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BigFooterProps } from "@/types/BigFooter";

const BigFooter: React.FC<BigFooterProps> = ({
  logoDark,
  logoLight,
  address,
  phone,
  email,
  socialMediaLinks,
  navLinks,
}) => {
  return (
    <footer
      dir="rtl"
      className="bg-primary-light dark:bg-primary-dark border-t dark:border-secondary-dark border-secondary-light py-8 shadow-inner text-center w-full h-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between dark:text-secondary-light text-secondary-dark items-center border-b dark:border-secondary-dark border-secondary-light pb-8 mb-8">
          <div className="mb-6 md:mb-0">
            <Image
              src={logoDark}
              alt="لوگو سایت"
              className="h-12 w-auto hidden dark:flex"
              width={100}
              height={48}
            />
            <Image
              src={logoLight}
              alt="لوگو سایت"
              className="h-12 w-auto dark:hidden"
              width={100}
              height={48}
            />
          </div>
          <div className="mb-6 md:mb-0 text-right">
            <h4 className="text-lg font-semibold mb-2">تماس با ما</h4>
            <p>{`آدرس: ${address}`}</p>
            <p>{`تلفن: ${phone}`}</p>
            <p>{`ایمیل: ${email}`}</p>
          </div>
          <div className="text-right">
            <h4 className="text-lg font-semibold mb-2">ما را دنبال کنید</h4>
            <div className="flex justify-center md:justify-end space-x-1 space-x-reverse">
              {socialMediaLinks.map((link, index) => (
                <Link key={index} href={link.href} target="_blank">
                  <div className="bg-primary-light rounded-full p-1 transform transition-transform duration-300 hover:scale-110">
                    <Image
                      width={32}
                      height={32}
                      src={link.src}
                      alt={link.alt}
                      className="w-6 h-6"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="dark:text-tertiary-light text-tertiary-dark">
            &copy; {new Date().getFullYear()} تمامی حقوق محفوظ است.
          </p>
          <nav className="flex space-x-4 space-x-reverse mt-4 md:mt-0">
            {navLinks.map((navLink, index) => (
              <Link key={index} href={navLink.href}>
                <span className="dark:text-tertiary-light text-tertiary-dark hover:dark:text-secondary-light hover:text-secondary-dark transition-colors duration-300">
                  {navLink.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default BigFooter;
