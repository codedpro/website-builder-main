export const errorMessages = {
    required: (fieldLabel: string) => `${fieldLabel} الزامی است.`,
    invalidEmail: "ایمیل وارد شده نامعتبر است.",
    invalidPhone: "شماره تلفن وارد شده نامعتبر است.",
    mustBeNumber: "این مقدار باید عدد باشد.",
    invalidDate: "تاریخ وارد شده نامعتبر است.",
    minLength: (fieldLabel: string, length: number) =>
      `${fieldLabel} باید حداقل ${length} کاراکتر باشد.`,
    maxLength: (fieldLabel: string, length: number) =>
      `${fieldLabel} باید حداکثر ${length} کاراکتر باشد.`,
    minValue: (fieldLabel: string, value: number) =>
      `${fieldLabel} باید حداقل ${value} باشد.`,
    maxValue: (fieldLabel: string, value: number) =>
      `${fieldLabel} باید حداکثر ${value} باشد.`,
    invalidField: (fieldLabel: string) => `${fieldLabel} نامعتبر است.`,
  };
  