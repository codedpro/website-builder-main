interface WebsiteBuilderAddon {
    id: number;
    addon_name: string;
    addon_price: number;
    addon_discount_price: number;
    quantity: number;
  }
  
  interface OrderSummaryProps {
    texts: {
      title: string;
      plan: string;
      template: string;
      addons: string;
      total: string;
      discountedTotal: string;
      button: string;
    };
    totalPriceWithDiscount: number;
    totalPriceWithoutDiscount: number;
    selectedAddOns: { [key: string]: boolean };
    addons: WebsiteBuilderAddon[];
  }
  export default function OrderSummary({
    texts,
    totalPriceWithDiscount,
    totalPriceWithoutDiscount,
    selectedAddOns,
    addons,
  }: OrderSummaryProps) {
    const selectedAddOnsList = addons.filter((addon) => selectedAddOns[addon.id]);
  
    return (
      <div className="p-8 bg-primary-lightuser dark:bg-primary-darkuser rounded-xl shadow-lg sticky top-4 border border-secondary-lightuser dark:border-secondary-darkuser text-secondary-darkuser dark:text-secondary-lightuser">
        <h2 className="text-2xl font-bold text-primary-brand mb-6 text-center">
          {texts.title}
        </h2>
  
        <div className="space-y-2 mb-6">
          <p>
            <span className="font-medium">{texts.plan}:</span>{" "}
            <span className="text-primary-brand">طرح رزرو پیشرفته</span>
          </p>
          <p>
            <span className="font-medium">{texts.template}:</span>{" "}
            <span className="text-primary-brand">قالب رزرواسیون پیشرفته</span>
          </p>
        </div>
  
        <div>
          <p className="font-medium mb-2">{texts.addons}:</p>
          <ul className="space-y-2 ms-4 list-disc">
            {selectedAddOnsList.length > 0 ? (
              selectedAddOnsList.map((addon) => (
                <li
                  key={addon.id}
                  className="text-sm text-gray-700 dark:text-gray-300"
                >
                  {addon.addon_name} -{" "}
                  {addon.addon_discount_price > 0 &&
                  addon.addon_discount_price < addon.addon_price
                    ? `${addon.addon_discount_price.toLocaleString()} تومان`
                    : `${addon.addon_price.toLocaleString()} تومان`}
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500 dark:text-gray-400">
                هیچ ویژگی انتخاب نشده است
              </li>
            )}
          </ul>
        </div>
  
        <div className="mt-6 space-y-3">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>{texts.total}:</span>
            <span>{totalPriceWithoutDiscount.toLocaleString()} تومان</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-primary-brand">
            <span>{texts.discountedTotal}:</span>
            <span>{totalPriceWithDiscount.toLocaleString()} تومان</span>
          </div>
        </div>
      </div>
    );
  }
  