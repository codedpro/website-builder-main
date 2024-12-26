import { BigFooter } from "@/types/BigFooter";
import { DynamicFormSchema } from "@/types/DynamicForm";
import { FloatingNavbarConfig } from "@/types/Navbar";
import { SidebarStyles } from "@/types/Sidebar";
import { SidebarItemType } from "@/types/SidebarItemType";
import {
  UserDropdownPlaceholders,
  UserDropdownTexts,
} from "@/types/UserDropdown";

interface ButtonConfig {
  text: string;
  url: string;
  targetBlank?: boolean;
}

interface SpotlightHeroConfig {
  title: string[];
  description: string;
  spotlightClassName: string;
  spotlightFill: string;
  buttons: ButtonConfig[];
  isFixed: boolean;
}

interface GridAndDotConfig {
  mainclassName: string;
  secondclassName: string;
}

interface ParallaxService {
  title: string;
  link: string;
  thumbnail: string;
}

interface ParallaxServiceConfig {
  service: ParallaxService[];
  title: string;
  subtitle: string;
}

interface FeatureWithNumberListData {
  startingFeatures: string[];
  titleText: string;
  typingText: string;
  imageUrl: string;
}

interface ImageFeature {
  imgUrl: string;
  title: string;
  subtitle: string;
}

interface FeatureWithImageListData {
  startingFeatures: ImageFeature[];
  titleText: string;
  typingText: string;
  imageUrl: string;
}

interface Benefit {
  texts: string;
}

interface FeaturesWithDotListData {
  benefits: Benefit[];
  typingText: string;
  titleText: string;
  imageUrl: string;
}

interface mainConfig {
  isRtl: boolean;
  logoLight: string;
  logoDark: string;
}

interface Testimonials {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

interface ContactDetail {
  type: string;
  value: string;
  image: string;
  link?: string;
}

interface ShimmerButton {
  ShimmerButtonDark: string;
  ShimmerButtonLight: string;
  ShimmerButtonText: string;
}

interface CompareGalleryImage {
  firstImage: string;
  secondImage: string;
  description: string;
}

interface CompareGalleryData {
  images: CompareGalleryImage[];
  headerText: string;
  beforeText: string;
  afterText: string;
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
  spotlightHero: SpotlightHeroConfig;
  GridandDot: GridAndDotConfig;
  parallaxServicesData: ParallaxServiceConfig;
  FeatureWithNumberListData: FeatureWithNumberListData;
  FeatureWithImageListData: FeatureWithImageListData;
  FeaturesWithDotListData: FeaturesWithDotListData;
  testimonialsData: Testimonials[];
  Contacts: ContactDetail[];
  ShimmerButton: ShimmerButton;
  Bigfooter: BigFooter;
  CompareGalleryData: CompareGalleryData;
  FloatingNavbarConfig: FloatingNavbarConfig;
  ContactForm: DynamicFormSchema;
  UserSidebar: SideBarProps;
  headerData: headerData;
}

const homeConfig: HomeConfig = {
  main: {
    isRtl: true,
    logoDark: "/company/logo/logoDark.svg",
    logoLight: "/company/logo/logo.svg",
  },
  spotlightHero: {
    title: ["زیبایی شما", "هنر ماست"],
    description:
      "در کلینیک زیبایی ما، با بهره‌گیری از خدمات تخصصی، پیشرفته‌ترین دستگاه‌ها و متدهای روز دنیا، زیبایی طبیعی شما را به اوج می‌رسانیم. تیم حرفه‌ای ما در محیطی آرام و مطمئن در کنار شماست تا درخشش واقعی خود را کشف کنید.",
    spotlightClassName: "-top-5 w-[178%] -left-10 md:left-60 md:-top-20",
    spotlightFill: "var(--primary-color-light)",
    buttons: [
      {
        text: "رزرو نوبت",
        url: "/join",
        targetBlank: false,
      },
      {
        text: "مشاوره رایگان",
        url: "/signup",
        targetBlank: false,
      },
    ],
    isFixed: true,
  },
  GridandDot: {
    mainclassName:
      "w-full gap-4 z-20 reletive flex flex-col dark:bg-primary-dark bg-primary-light dark:bg-grid-white/[0.1] bg-grid-black/[0.1] relative flex items-center justify-center",
    secondclassName:
      "absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-primary-dark bg-primary-light [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
  },
  parallaxServicesData: {
    title: "برترین خدمات زیبایی در کنار شما",
    subtitle:
      "با افتخار، مجموعه‌ای از بهترین و پیشرفته‌ترین خدمات زیبایی را ارائه می‌دهیم تا شما شایسته‌ترین نسخه‌ی خود باشید.",
    service: [
      {
        title: "فیلر لب",
        link: "/reservation",
        thumbnail: "/services/1.webp",
      },
      {
        title: "فیلر لب",
        link: "/reservation",
        thumbnail: "/services/2.webp",
      },
      {
        title: "فیلر لب",
        link: "/reservation",
        thumbnail: "/services/3.webp",
      },
      {
        title: "فیلر لب",
        link: "/reservation",
        thumbnail: "/services/4.webp",
      },
      {
        title: "فیلر لب",
        link: "/reservation",
        thumbnail: "/services/5.webp",
      },
      {
        title: "فیلر لب",
        link: "/reservation",
        thumbnail: "/services/6.webp",
      },
      {
        title: "فیلر لب",
        link: "/reservation",
        thumbnail: "/services/7.webp",
      },
      {
        title: "فیلر لب",
        link: "/reservation",
        thumbnail: "/services/8.webp",
      },
      {
        title: "فیلر لب",
        link: "/reservation",
        thumbnail: "/services/9.webp",
      },
    ],
  },
  FeatureWithNumberListData: {
    startingFeatures: [
      "انتخاب خدمات مورد نظر",
      "انتخاب زمان مناسب برای خود",
      "لذت بردن از خدمات ما!",
    ],
    titleText: "زیبایی از اینجا شروع می‌شود!",
    typingText: "زیبایی خود را به سادگی ارتقا دهید.",
    imageUrl: "/Features/1.json",
  },
  FeatureWithImageListData: {
    startingFeatures: [
      {
        imgUrl: "/vrpano.svg",
        title: "رزرو آسان",
        subtitle:
          "با سیستم رزرو آنلاین ما، به راحتی و تنها در چند کلیک نوبت خود را انتخاب کنید.",
      },
      {
        imgUrl: "/headset.svg",
        title: "مشاوره زیبایی شخصی",
        subtitle:
          "با مشاورین متخصص ما، خدمات مناسب پوست و زیبایی خود را به صورت آنلاین دریافت کنید.",
      },
    ],
    titleText: "مسیر شما به سوی زیبایی بی‌نقص",
    typingText: "تجربه‌ای نوین از زیبایی",
    imageUrl: "/Features/2.json",
  },
  FeaturesWithDotListData: {
    benefits: [
      { texts: "ارائه خدمات پوست و پاکسازی عمیق" },
      { texts: "درمان و حذف لک‌ها و تیرگی‌های پوست" },
      { texts: "لیزر موهای زائد با جدیدترین تکنولوژی" },
      { texts: "خدمات تقویت و مراقبت از مو" },
      { texts: "تزریق ژل و بوتاکس با بهترین مواد" },
    ],
    titleText: "از خدمات زیبایی ما بهره‌مند شوید!",
    typingText: "بهترین خدمات برای زیبایی شما.",
    imageUrl: "/Features/3.json",
  },
  testimonialsData: [
    {
      quote:
        "سال‌ها در زمینه پوست و زیبایی فعالیت داشته‌ام و همواره تلاش می‌کنم تا بهترین خدمات را برای مراجعه‌کنندگان ارائه کنم. شادابی و رضایت بیماران برای من اولویت دارد.",
      name: "دکتر مهتاب نیک‌زاد",
      designation: "متخصص پوست و زیبایی",
      src: "/testimonials/1.webp",
    },
    {
      quote:
        "علاقه زیادی به طراحی لبخند دارم و همیشه سعی کرده‌ام لبخندی زیبا و طبیعی را به بیمارانم هدیه کنم. رضایت آن‌ها بزرگ‌ترین موفقیت من است.",
      name: "دکتر پریسا پارسا",
      designation: "متخصص دندانپزشکی زیبایی",
      src: "/testimonials/2.webp",
    },
    {
      quote:
        "تخصص من در استفاده از روش‌های نوین لیزر و جوان‌سازی پوست است. هدفم این است که هر بیمار احساس جوانی و شادابی را تجربه کند.",
      name: "دکتر شبنم کیانی",
      designation: "متخصص لیزر و جوان‌سازی پوست",
      src: "/testimonials/3.webp",
    },
    {
      quote:
        "تزریقات زیبایی برای من یک هنر است. هر بار که چهره‌ای متناسب و طبیعی ایجاد می‌کنم، حس خوبی به من دست می‌دهد. دقت در کارم همیشه اولویت داشته است.",
      name: "دکتر مینا دادگر",
      designation: "متخصص تزریقات زیبایی",
      src: "/testimonials/4.webp",
    },
    {
      quote:
        "با انجام جراحی‌های زیبایی و فرم‌دهی بدن، کمک می‌کنم تا هر فرد به اعتماد به نفس بیشتری دست یابد. تمرکز من همیشه بر کیفیت و رضایت بیماران بوده است.",
      name: "دکتر نگین مهرآذر",
      designation: "متخصص جراحی زیبایی",
      src: "/testimonials/5.webp",
    },
  ],
  Contacts: [
    {
      type: "ایمیل",
      value: "info@example.com",
      image: "/icons/icons8-mail.svg",
      link: "mailto:info@example.com",
    },
    {
      type: "آدرس",
      value: "تهران، خیابان ولیعصر",
      image: "/icons/icons8-address.svg",
    },
    {
      type: "اینستاگرام",
      value: "instagram.com/example",
      image: "/icons/icons8-instagram.svg",
      link: "https://instagram.com/example",
    },
    {
      type: "تلگرام",
      value: "09352001234",
      image: "/icons/icons8-phone.svg",
    },
  ],
  ShimmerButton: {
    ShimmerButtonDark: "#333333",
    ShimmerButtonLight: "#f5f5f5",
    ShimmerButtonText: "تماس با ما",
  },
  Bigfooter: {
    address: "تهران، خیابان ولیعصر",
    phone: "021-12345678",
    email: "info@example.com",
    socialMediaLinks: [
      {
        href: "https://www.facebook.com",
        src: "/icons/icons8-facebook.svg",
        alt: "Facebook",
      },
      {
        href: "https://www.instagram.com",
        src: "/icons/icons8-instagram.svg",
        alt: "Instagram",
      },
      {
        href: "https://www.twitter.com",
        src: "/icons/icons8-twitterx.svg",
        alt: "Twitter",
      },
      {
        href: "https://www.telegram.com",
        src: "/icons/icons8-telegram.svg",
        alt: "Telegram",
      },
    ],
    navLinks: [
      { href: "/", label: "سیاست حفظ حریم خصوصی" },
      { href: "/", label: "شرایط خدمات" },
      { href: "/", label: "تماس با ما" },
    ],
  },
  CompareGalleryData: {
    images: [
      {
        firstImage: "/gallery/BeforeAfter/lips-1.jpg",
        secondImage: "/gallery/BeforeAfter/lips-1a.jpg",
        description: "تزریق فیلر لب",
      },
      {
        firstImage: "/gallery/BeforeAfter/lips-2.jpg",
        secondImage: "/gallery/BeforeAfter/lips-2a.jpg",
        description: "حجم‌دهی به لب‌ها",
      },
      {
        firstImage: "/gallery/BeforeAfter/lips-4.jpg",
        secondImage: "/gallery/BeforeAfter/lips-4a.jpg",
        description: "اصلاح فرم لب",
      },
    ],
    headerText: "گالری قبل و بعد",
    beforeText: "قبل",
    afterText: "بعد",
  },
  FloatingNavbarConfig: {
    menuItems: [
      {
        id: "information",
        item: "اطلاعات",
        type: "links",
        links: [
          { label: "تماس با ما", href: "/contact-us" },
          { label: "قوانین و مقررات", href: "/terms-and-conditions" },
          { label: "حریم خصوصی", href: "/privacy-policy" },
          { label: "سوالات متداول", href: "/faq" },
          { label: "سیاست بازگشت وجه", href: "/refund-policy" },
          { label: "سیاست حمل و نقل", href: "/shipping-policy" },
          { label: "درباره ما", href: "/about-us" },
          { label: "فرصت‌های شغلی", href: "/careers" },
        ],
      },
      {
        id: "services",
        item: "خدمات",
        type: "products",
        products: [
          {
            title: "درمان‌های پوستی",
            href: "/services/facial-treatments",
            src: "/services/1.webp",
            description:
              "پوست خود را با درمان‌های پیشرفته و متناسب با نیازتان جوان کنید.",
          },
          {
            title: "لیزر موهای زائد",
            href: "/services/laser-hair-removal",
            src: "/services/2.webp",
            description:
              "با استفاده از تکنولوژی مدرن لیزر، پوستی صاف و بدون مو داشته باشید.",
          },
          {
            title: "کانتورینگ بدن",
            href: "/services/body-contouring",
            src: "/services/3.webp",
            description:
              "به شکل دلخواه خود با راه‌حل‌های ایمن و موثر کانتورینگ بدن دست یابید.",
          },
          {
            title: "درمان‌های ضد پیری",
            href: "/services/anti-aging",
            src: "/services/4.webp",
            description:
              "با درمان‌های شخصی‌سازی شده علائم پیری را از بین ببرید.",
          },
          {
            title: "ترمیم و بازسازی مو",
            href: "/services/hair-restoration",
            src: "/services/5.webp",
            description:
              "با خدمات حرفه‌ای ترمیم و بازسازی مو اعتماد به نفس خود را بازیابید.",
          },
        ],
      },
      {
        id: "dashboard",
        item: "داشبورد",
        type: "single",
        href: "/dashboard",
      },
    ],
  },
  ContactForm: {
    title: "فرم تماس با ما",
    apiUrl: "/api/contact-form",
    submitButton: "ثبت",
    submitingButton: "درحال ثبت ...",
    sections: [
      {
        title: "اطلاعات شخصی",
        fields: [
          {
            id: "name",
            name: "name",
            label: "نام و نام خانوادگی",
            type: "input",
            inputType: "text",
            placeholder: "علیرضا",
            required: true,
            validation: {
              minLength: 2,
              maxLength: 50,
            },
          },
          {
            id: "email",
            name: "email",
            label: "آدرس ایمیل",
            type: "input",
            inputType: "email",
            placeholder: "support@migmigweb.com",
            required: true,
            validation: {
              pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
              customMessage: "لطفا یک آدرس ایمیل درست وارد کنید",
            },
          },
          {
            id: "phone",
            name: "phone",
            label: "شماره تلفن",
            type: "input",
            inputType: "tel",
            placeholder: "09353594050",
            required: true,
            validation: {
              pattern: "^09[0-9]{9}$",
              customMessage: "لطفا یک شماره تلفن معتبر وارد کنید",
            },
          },
        ],
      },
      {
        title: "اطلاعات تماس و خدمات",
        fields: [
          {
            id: "preferred_contact_method",
            name: "preferred_contact_method",
            label: "روش تماس ترجیحی",
            type: "radio",
            required: true,
            options: [
              { label: "تماس تلفنی", value: "phone" },
              { label: "ایمیل", value: "email" },
            ],
          },
          {
            id: "service",
            name: "service",
            label: "انتخاب سرویس",
            type: "select",
            required: true,
            options: [
              { label: "طراحی وبسایت", value: "web_design" },
              { label: "سئو و بهینه سازی", value: "seo" },
              { label: "توسعه اپلیکیشن موبایل", value: "mobile_app" },
              { label: "پشتیبانی", value: "support" },
            ],
          },
          {
            id: "best_time_to_contact",
            name: "best_time_to_contact",
            label: "بهترین زمان برای تماس",
            type: "radio",
            required: true,
            options: [
              { label: "صبح", value: "morning" },
              { label: "ظهر", value: "afternoon" },
              { label: "عصر", value: "evening" },
              { label: "شب", value: "night" },
            ],
          },
          {
            id: "accept_terms",
            name: "accept_terms",
            label: "قبول قوانین و مقررات",
            type: "checkbox",
            required: true,
            options: [{ label: "قبول دارم", value: "true" }],
          },
          {
            id: "subscribe_newsletter",
            name: "subscribe_newsletter",
            label: "اشتراک در خبرنامه و ایمیل‌های تبلیغاتی",
            type: "checkbox",
            options: [{ label: "مشترک می‌شوم", value: "true" }],
          },
        ],
      },
    ],
  },
  UserSidebar: {
    sidebarItems: [
      {
        label: "رزرو نوبت",
        image: "/icons/icons8-doctor-appointment.png",
        //      route: "/dashboard/reservation",
        route: "/dashboard",
      },
      //   { label: "داشبورد", image: "/icons/icons8-dashboard.png", route: "/dashboard" },
      {
        label: "نوبت های من",
        image: "/icons/icons8-activity-history.png",
        route: "/dashboard/user/history",
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
    header: "کلینیک زیبایی من",
  },
};

export default homeConfig;
