export type FieldType =
  | "input"
  | "select"
  | "radio"
  | "checkbox"
  | "textarea"
  | "date"
  | "number";

export interface BaseField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  condition?: Condition;
  validation?: ValidationRules;
}

export interface Condition {
  field: string;
  value: string | number | boolean;
}

export interface ValidationRules {
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  custom?: (value: any) => boolean;
  customMessage?: string;
}

export interface InputField extends BaseField {
  inputType: "text" | "email" | "tel" | "password" | "number" | "date";
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectField extends BaseField {
  options: SelectOption[];
}

export interface RadioOption {
  label: string;
  value: string | number;
}

export interface RadioField extends BaseField {
  options: RadioOption[];
}

export interface CheckboxField extends BaseField {
  options: SelectOption[];
}

export interface TextareaField extends BaseField {
  rows?: number;
}

export type FormField =
  | InputField
  | SelectField
  | RadioField
  | CheckboxField
  | TextareaField;

export interface FormSection {
  title?: string;
  fields: FormField[];
}

export interface DynamicFormSchema {
  title: string;
  apiUrl: string;
  sections: FormSection[];
  submitButton: string;
  submitingButton: string;
}

export type FormValues = Record<string, any>;
