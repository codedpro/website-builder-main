const texts = {
    title: "سفارش وب‌سایت",
    subtitle: "به راحتی وب‌سایت خود را سفارش دهید.",
  
    plan: {
      title: "جزئیات طرح حرفه‌ای",
      name: "طرح رزرو پیشرفته",
      description:
        "این طرح مناسب برای کسب‌وکارهایی است که به یک وب‌سایت حرفه‌ای با امکانات مدیریتی پیشرفته برای رزرو آنلاین و تعامل با مشتریان نیاز دارند.",
      features: [
        " با رابط کاربری جذاب و مدرن",
        "داشبورد مدیریتی با امکانات پیشرفته",
        "امکان رزرو آنلاین با مدیریت ساده",
        "مدیریت زمان‌بندی‌های انعطاف‌پذیر",
        "ساختار بهینه‌سازی‌شده برای موتورهای جستجو (SEO)",
      ],
      price: { text: "۱۰,۰۰۰,۰۰۰ تومان", value: 10000000 },
      discountPrice: { text: "۵,۰۰۰,۰۰۰ تومان", value: 5000000 },
    },
    template: {
      title: "پیش‌نمایش قالب",
      name: "کسب و کار مدرن",
      button: "پیش نمایش",
    },
    templates: [
      {
        id: "1",
        tag: "جدید",
        title: "قالب رزرواسیون پیشرفته",
        description: "این قالب مناسب برای وب‌سایت‌های حرفه‌ای و شرکتی می‌باشد.",
        button: "مشاهده قالب",
        image: "/template-preview.png",
      },
      {
        id: "2",
        tag: "به زودی",
        title: "قالب رزرواسیون مدرن",
        description: "طراحی زیبا و مناسب برای رزرواسیون آنلاین.",
        button: "مشاهده قالب",
        image: "/comming-soon.png",
      },
      {
        id: "3",
        tag: "به زودی",
        title: "قالب رزرواسیون ساده",
        description: "طراحی مینیمال برای رزرواسیون های شخصی.",
        button: "مشاهده قالب",
        image: "/comming-soon.png",
      },
    ],
    addons: {
      title: "افزودن ویژگی‌های اضافی",
      options: [
        {
          name: "پشتیبانی VIP",
          price: { text: "۱,۰۰۰,۰۰۰ تومان در ماه", value: 1000000 },
          discount: { text: "رایگان", value: 0 },
          preSelected: true,
        },
        {
          name: "دامنه اختصاصی",
          price: { text: "۸۰۰,۰۰۰ تومان در سال", value: 800000 },
          discount: { text: "۶۰۰,۰۰۰ تومان در سال", value: 600000 },
          preSelected: false,
        },
        /*      {
          name: "آنالیز پیشرفته",
          price: { text: "۲۵۰,۰۰۰ تومان در ماه", value: 250000 },
          discount: { text: "۸۰,۰۰۰ تومان در ماه", value: 80000 },
          preSelected: false,
        }, */
        {
          name: "طراحی لوگو",
          price: { text: "۲,۵۰۰,۰۰۰ تومان یک‌بار", value: 2500000 },
          discount: { text: "۲,۰۰۰,۰۰۰ تومان یک‌بار", value: 2000000 },
          preSelected: false,
        },
  
        {
          name: "ساخت ایمیل اختصاصی",
          price: { text: "۷۰۰,۰۰۰ تومان یک‌بار", value: 700000 },
        },
        {
          name: "مدیریت شبکه‌های اجتماعی",
          price: { text: "۱,۵۰۰,۰۰۰ تومان در ماه", value: 1500000 },
          discount: { text: "۱,۰۰۰,۰۰۰ تومان در ماه", value: 1000000 },
          preSelected: false,
        },
      ],
    },
    summary: {
      title: "خلاصه سفارش",
      plan: "طرح",
      template: "قالب",
      addons: "ویژگی‌های اضافی",
      total: "مجموع",
      button: "ثبت سفارش",
      discountedTotal: "قیمت کل با تخفیف",
    },
  };
  
  export default texts;
  