import * as Yup from "yup";
import { DynamicFormSchema, FormField, InputField } from "@/types/DynamicForm";
import { errorMessages } from "@/lib/constants/errorMessages";

export const generateYupSchema = (
  schema: DynamicFormSchema
): Yup.ObjectSchema<Record<string, any>> => {
  const shape: Record<string, Yup.AnySchema> = {};

  const createValidatorForField = (field: FormField): Yup.AnySchema => {
    let validator: Yup.AnySchema;

    switch (field.type) {
      case "input": {
        const inputField = field as InputField;
        switch (inputField.inputType) {
          case "text":
          case "password":
            validator = Yup.string();
            break;
          case "email":
            validator = Yup.string().email(errorMessages.invalidEmail);
            break;
          case "tel":
            validator = Yup.string().matches(
              /^09[0-9]{9}$/,
              errorMessages.invalidPhone
            );
            break;
          case "number":
            validator = Yup.number().typeError(errorMessages.mustBeNumber);
            break;
          case "date":
            validator = Yup.date().typeError(errorMessages.invalidDate);
            break;
          default:
            validator = Yup.string();
        }
        break;
      }

      case "select":
      case "radio":
        validator = Yup.string();
        break;

      case "checkbox":
        validator = Yup.array().of(Yup.string());
        break;

      case "textarea":
        validator = Yup.string();
        break;

      default:
        validator = Yup.mixed();
    }

    if (field.required) {
      if (field.type === "checkbox") {
        validator = (validator as Yup.ArraySchema<string[], Yup.AnyObject>).min(
          1,
          errorMessages.required(field.label)
        );
      } else {
        validator = validator.required(errorMessages.required(field.label));
      }
    }

    if (field.validation) {
      const { pattern, minLength, maxLength, min, max, custom, customMessage } =
        field.validation;

      if (
        pattern &&
        (field.type === "input" ||
          field.type === "textarea" ||
          field.type === "select" ||
          field.type === "radio")
      ) {
        const regex = new RegExp(pattern);
        if (validator instanceof Yup.StringSchema) {
          validator = validator.matches(
            regex,
            customMessage || errorMessages.invalidField(field.label)
          );
        }
      }

      if (
        minLength !== undefined &&
        (field.type === "input" || field.type === "textarea")
      ) {
        if (validator instanceof Yup.StringSchema) {
          validator = validator.min(
            minLength,
            errorMessages.minLength(field.label, minLength)
          );
        }
      }

      if (
        maxLength !== undefined &&
        (field.type === "input" || field.type === "textarea")
      ) {
        if (validator instanceof Yup.StringSchema) {
          validator = validator.max(
            maxLength,
            errorMessages.maxLength(field.label, maxLength)
          );
        }
      }

      if (
        min !== undefined &&
        field.type === "input" &&
        (field as InputField).inputType === "number"
      ) {
        if (validator instanceof Yup.NumberSchema) {
          validator = validator.min(min, errorMessages.minValue(field.label, min));
        }
      }

      if (
        max !== undefined &&
        field.type === "input" &&
        (field as InputField).inputType === "number"
      ) {
        if (validator instanceof Yup.NumberSchema) {
          validator = validator.max(max, errorMessages.maxValue(field.label, max));
        }
      }

      if (custom && typeof custom === "function") {
        validator = validator.test(
          "custom-test",
          customMessage || errorMessages.invalidField(field.label),
          custom
        );
      }
    }

    return validator;
  };

  schema.sections.forEach((section) => {
    section.fields.forEach((field) => {
      if (!field.condition) {
        shape[field.name] = createValidatorForField(field);
      }
    });
  });

  schema.sections.forEach((section) => {
    section.fields.forEach((field) => {
      if (field.condition) {
        const { field: condField, value: condValue } = field.condition;
        const validator = createValidatorForField(field);

        shape[field.name] = validator.when(
          condField,
          (value: any, schema: any) => {
            if (
              Array.isArray(value)
                ? value.includes(condValue)
                : value === condValue
            ) {
              return validator;
            } else {
              return schema.notRequired();
            }
          }
        );
      }
    });
  });

  return Yup.object().shape(shape);
};
