interface AddOnsSectionProps {
    addons: WebsiteBuilderAddon[];
    selectedAddOns: { [addonId: number]: boolean };
    onAddOnChange: (addonId: number, isSelected: boolean) => void;
  }
  
  function formatPrice(value: number) {
    return value.toLocaleString("fa-IR") + " تومان";
  }
  
  export default function AddOnsSection({
    addons,
    selectedAddOns,
    onAddOnChange,
  }: AddOnsSectionProps) {
    return (
      <div className="p-6 rounded-xl shadow-lg bg-primary-lightuser dark:bg-primary-darkuser text-secondary-darkuser dark:text-secondary-lightuser">
        <h2 className="text-2xl font-extrabold text-primary-brand mb-6 text-center">
          ویژگی‌های اضافی
        </h2>
        <ul className="space-y-4">
          {addons.map((addon) => {
            const isSelected = selectedAddOns[addon.id] || false;
  
            return (
              <li
                key={addon.id}
                className={`flex items-center justify-between p-4 rounded-lg shadow-sm transition-all ${
                  isSelected
                    ? "bg-secondary-lightuser dark:bg-secondary-darkuser border-2 border-primary-brand"
                    : "bg-primary-lightuser dark:bg-primary-darkuser"
                } hover:shadow-lg`}
              >
                <label
                  htmlFor={`addon-${addon.id}`}
                  className="flex-1 cursor-pointer text-sm font-medium"
                >
                  <span className="block">{addon.addon_name}</span>
                  <div className="text-tertiary-darkuser dark:text-tertiary-lightuser mt-1">
                    {addon.addon_discount_price > 0 && addon.addon_discount_price < addon.addon_price ? (
                      <>
                        <span className="line-through me-2">
                          {formatPrice(addon.addon_price)}
                        </span>
                        <span className="text-primary-brand font-bold">
                          {formatPrice(addon.addon_discount_price)}
                        </span>
                      </>
                    ) : (
                      <span>{formatPrice(addon.addon_price)}</span>
                    )}
                  </div>
                </label>
  
                <div className="relative flex items-center">
                  <input
                    id={`addon-${addon.id}`}
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) =>
                      onAddOnChange(addon.id, e.target.checked)
                    }
                    className="w-6 h-6 text-primary-brand bg-primary-lightuser border-secondary-darkuser rounded focus:ring-primary-brand cursor-pointer accent-primary-brand"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  