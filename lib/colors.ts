import { headers } from "next/headers";

export async function fetchColors() {
  const currentHeaders = await headers();
  const currentHost = currentHeaders.get("host") || "defaultHost.com";

  try {
    const response = await fetch(
      `https://your-api.com/colors?host=${currentHost}`
    );

    if (!response.ok) {
      return getDefaultColors();
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return getDefaultColors();
    }

    const colors = await response.json();
    return {
      lightTheme: {
        primary: colors.light?.primary || "#ffffff",
        secondary: colors.light?.secondary || "#f5f5f5",
        tertiary: colors.light?.tertiary || "#cccccc",
      },
      darkTheme: {
        primary: colors.dark?.primary || "#000000",
        secondary: colors.dark?.secondary || "#333333",
        tertiary: colors.dark?.tertiary || "#666666",
      },
      brandTheme: {
        primary: colors.brand?.primary || "#D4AF36",
        secondary: colors.brand?.secondary || "#A57F27",
        tertiary: colors.brand.tertiary || "#F1D47D",
      },
      lightUserTheme: {
        primary: colors.light?.primary || "#ffffff",
        secondary: colors.light?.secondary || "#f5f5f5",
        tertiary: colors.light?.tertiary || "#cccccc",
      },
      darkUserTheme: {
        primary: colors.dark?.primary || "#000000",
        secondary: colors.dark?.secondary || "#333333",
        tertiary: colors.dark?.tertiary || "#666666",
      },
    };
  } catch (error) {
    console.error("Error fetching colors:", error);
    return getDefaultColors();
  }
}

function getDefaultColors() {
  return {
    lightTheme: {
      primary: "#ffffff",
      secondary: "#f5f5f5",
      tertiary: "#cccccc",
    },
    darkTheme: {
      primary: "#000000",
      secondary: "#333333",
      tertiary: "#666666",
    },
    brandTheme: {
      primary: "#D4AF36",
      secondary: "#A57F27",
      tertiary: "#F1D47D",
    },
    lightUserTheme: {
      primary: "#ffffff",
      secondary: "#f5f5f5",
      tertiary: "#cccccc",
    },
    darkUserTheme: {
      primary: "#1e1e1e",
      secondary: "#212121",
      tertiary: "#252525",
    },
  };
}
