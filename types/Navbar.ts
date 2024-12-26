import React from "react";

export interface NavbarLink {
  label: string;
  href: string;
}

export interface NavbarProduct {
  title: string;
  href: string;
  src: string;
  description: string;
}

export type NavbarMenuItemType = "links" | "products" | "single";

export interface NavbarMenuItem {
  id: string;
  item: string;
  type: NavbarMenuItemType;
  links?: NavbarLink[];
  products?: NavbarProduct[];
  href?: string;
  icon?: React.ReactNode;
}

export interface FloatingNavbarConfig {
  menuItems: NavbarMenuItem[];
}
