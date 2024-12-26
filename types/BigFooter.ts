export interface SocialMediaLink {
  href: string;
  src: string;
  alt: string;
}

export interface BigFooterProps {
  address: string;
  phone: string;
  email: string;
  socialMediaLinks: SocialMediaLink[];
  navLinks: { href: string; label: string }[];
  logoDark: string;
  logoLight: string;
}
export interface BigFooter {
  address: string;
  phone: string;
  email: string;
  socialMediaLinks: SocialMediaLink[];
  navLinks: { href: string; label: string }[];
}
