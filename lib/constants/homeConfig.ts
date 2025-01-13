import { SidebarStyles } from "@/types/Sidebar";
import { SidebarItemType } from "@/types/SidebarItemType";
import {
  UserDropdownPlaceholders,
  UserDropdownTexts,
} from "@/types/UserDropdown";

interface mainConfig {
  isRtl: boolean;
  logoLight: string;
  logoDark: string;
}

interface SideBarProps {
  sidebarItems: SidebarItemType[];
  lightModeStyles: SidebarStyles;
  darkModeStyles: SidebarStyles;
}
interface headerData {
  userPlaceholder: UserDropdownPlaceholders;
  texts: UserDropdownTexts;
  header: string;
}
interface HomeConfig {
  main: mainConfig;
  UserSidebar: SideBarProps;
  headerData: headerData;
}

const homeConfig: HomeConfig = {
  main: {
    isRtl: true,
    logoDark: "/company/logo/logoDark.svg",
    logoLight: "/company/logo/logo.svg",
  },

  UserSidebar: {
    sidebarItems: [
      {
        label: "خرید وبسایت",
        image: "/icons/icons8-doctor-appointment.png",
        route: "/",
      },
      {
        label: "وبسایت های من",
        image: "/icons/icons8-activity-history.png",
        route: "/user/websites",
      },
    ],
    lightModeStyles: {
      backgroundColor: "#ffffff",
      color: "#1f2937",
      borderColor: "#f5f5f5",
    },
    darkModeStyles: {
      backgroundColor: "#1e1e1e",
      color: "#ffffff",
      borderColor: "#252525",
    },
  },
  headerData: {
    userPlaceholder: {
      namePlaceholder: "میهمان",
      emailPlaceholder: "بدون ایمیل",
      profilePlaceholder: "/images/user/user-03.png",
    },
    texts: {
      viewProfile: "مشاهده پروفایل",
      accountSettings: "تنظیمات حساب کاربری",
      logout: "خروج",
    },
    header: "میگ میگ وب",
  },
};

export default homeConfig;
