"use client";

import React, { useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Label,
  Input,
  Select,
  RadioButton,
  CheckboxGroup,
  Textarea,
  LabelInputContainer,
  BottomGradient,
} from "./forms";
import Portal from "../Layout/Portal";
import {
  DynamicFormSchema,
  FormField,
  FormValues,
  InputField,
  SelectField,
  RadioField,
  CheckboxField,
  TextareaField,
} from "@/types/DynamicForm";
import { generateYupSchema } from "@/utils/validation";
import { useFormik } from "formik";

interface DynamicFormProps {
  isOpen: boolean;
  onClose: () => void;
  schema: DynamicFormSchema;
  isRtl?: boolean;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  isOpen,
  onClose,
  schema,
  isRtl,
}) => {
  const yupSchema = generateYupSchema(schema);

  const initialValues = React.useMemo(() => {
    const initialData: FormValues = {};
    schema.sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.type === "radio" || field.type === "select") {
          const fieldWithOptions = field as RadioField | SelectField;
          const firstOption = fieldWithOptions.options?.[0];
          initialData[field.name] = firstOption ? firstOption.value : "";
        } else if (field.type === "checkbox") {
          initialData[field.name] = [];
        } else {
          initialData[field.name] = "";
        }
      });
    });
    return initialData;
  }, [schema]);

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema: yupSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await fetch(schema.apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          alert("Form submitted successfully!");
          resetForm();
        } else {
          const errorData = await response.json();
          alert(
            errorData.message ||
              "There was an issue submitting the form. Please try again."
          );
        }
      } catch (error) {
        console.error(error);
        alert("An unexpected error occurred. Please try again.");
      } finally {
        setSubmitting(false);
        onClose();
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const shouldDisplayField = (field: FormField): boolean => {
    if (!field.condition) return true;
    const { field: condField, value: condValue } = field.condition;
    return formik.values[condField] === condValue;
  };

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-black bg-opacity-50 fixed inset-0"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.div
              className="bg-white dark:bg-neutral-900 p-8 sm:p-10 rounded-lg max-w-3xl w-full relative z-50 shadow-lg h-[80vh] overflow-y-auto custom-scrollbar"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div dir={isRtl ? "rtl" : "ltr"}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    {schema.title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                    aria-label="Close Form"
                  >
                    <IconX className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={formik.handleSubmit} noValidate>
                  {schema.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-8">
                      {section.title && (
                        <h3 className="text-xl font-medium mb-4 text-gray-700 dark:text-gray-200">
                          {section.title}
                        </h3>
                      )}
                      {section.fields.map((field) => {
                        if (!shouldDisplayField(field)) return null;

                        const errorValue = formik.errors[field.name];
                        const fieldError =
                          formik.touched[field.name] &&
                          typeof errorValue === "string"
                            ? errorValue
                            : undefined;
                        const isError = Boolean(fieldError);

                        switch (field.type) {
                          case "input":
                            const inputField = field as InputField;
                            return (
                              <LabelInputContainer
                                className="mb-6"
                                key={inputField.id}
                              >
                                <Label htmlFor={inputField.id}>
                                  {inputField.label}
                                  {inputField.required && (
                                    <span
                                      className={`text-red-500 ${
                                        isRtl ? "mr-1" : "ml-1"
                                      }`}
                                    >
                                      *
                                    </span>
                                  )}
                                </Label>
                                <Input
                                  id={inputField.id}
                                  name={inputField.name}
                                  type={inputField.inputType}
                                  placeholder={inputField.placeholder}
                                  value={formik.values[inputField.name]}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  isError={isError}
                                />
                                {fieldError && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {fieldError}
                                  </p>
                                )}
                              </LabelInputContainer>
                            );

                          case "select":
                            const selectField = field as SelectField;
                            return (
                              <LabelInputContainer
                                className="mb-6"
                                key={selectField.id}
                              >
                                <Label htmlFor={selectField.id}>
                                  {selectField.label}
                                  {selectField.required && (
                                    <span
                                      className={`text-red-500 ${
                                        isRtl ? "mr-1" : "ml-1"
                                      }`}
                                    >
                                      *
                                    </span>
                                  )}
                                </Label>
                                <Select
                                  id={selectField.id}
                                  name={selectField.name}
                                  value={formik.values[selectField.name]}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  isError={isError}
                                >
                                  {selectField.options.map((option, index) => (
                                    <option key={index} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </Select>
                                {fieldError && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {fieldError}
                                  </p>
                                )}
                              </LabelInputContainer>
                            );

                          case "radio":
                            const radioField = field as RadioField;
                            return (
                              <LabelInputContainer
                                className="mb-6"
                                key={radioField.id}
                              >
                                <Label>
                                  {radioField.label}
                                  {radioField.required && (
                                    <span
                                      className={`text-red-500 ${
                                        isRtl ? "mr-1" : "ml-1"
                                      }`}
                                    >
                                      *
                                    </span>
                                  )}
                                </Label>
                                <div className="flex space-x-4 mt-2">
                                  {radioField.options.map((option, index) => (
                                    <RadioButton
                                      isRtl={isRtl}
                                      key={index}
                                      type="radio"
                                      name={radioField.name}
                                      value={option.value}
                                      checked={
                                        formik.values[radioField.name] ===
                                        option.value
                                      }
                                      onChange={formik.handleChange}
                                    >
                                      {option.label}
                                    </RadioButton>
                                  ))}
                                </div>
                                {fieldError && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {fieldError}
                                  </p>
                                )}
                              </LabelInputContainer>
                            );

                          case "checkbox":
                            const checkboxField = field as CheckboxField;
                            return (
                              <LabelInputContainer
                                className="mb-6"
                                key={checkboxField.id}
                              >
                                <Label>
                                  {checkboxField.label}
                                  {checkboxField.required && (
                                    <span
                                      className={`text-red-500 ${
                                        isRtl ? "mr-1" : "ml-1"
                                      }`}
                                    >
                                      *
                                    </span>
                                  )}
                                </Label>
                                <CheckboxGroup
                                  isRtl={isRtl}
                                  options={checkboxField.options}
                                  name={checkboxField.name}
                                  selectedValues={
                                    formik.values[checkboxField.name] || []
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  className={isError ? "border-red-500" : ""}
                                />
                                {fieldError && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {fieldError}
                                  </p>
                                )}
                              </LabelInputContainer>
                            );

                          case "textarea":
                            const textareaField = field as TextareaField;
                            return (
                              <LabelInputContainer
                                className="mb-6"
                                key={textareaField.id}
                              >
                                <Label htmlFor={textareaField.id}>
                                  {textareaField.label}
                                  {textareaField.required && (
                                    <span
                                      className={`text-red-500 ${
                                        isRtl ? "mr-1" : "ml-1"
                                      }`}
                                    >
                                      *
                                    </span>
                                  )}
                                </Label>
                                <Textarea
                                  id={textareaField.id}
                                  name={textareaField.name}
                                  placeholder={textareaField.placeholder}
                                  rows={textareaField.rows || 4}
                                  value={formik.values[textareaField.name]}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  isError={isError}
                                />
                                {fieldError && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {fieldError}
                                  </p>
                                )}
                              </LabelInputContainer>
                            );

                          default:
                            return null;
                        }
                      })}
                    </div>
                  ))}
                  <button
                    type="submit"
                    className={`bg-gradient-to-br relative group/btn dark:from-secondary-dark dark:to-secondary-dark from-tertiary-brand to-primary-brand block w-full text-primary-dark dark:text-primary-light rounded-md h-12 font-medium dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] dark:hover:bg-primary-dark hover:bg-primary-light transition duration-300 ${
                      formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting
                      ? schema.submitingButton
                      : schema.submitButton}
                    <BottomGradient />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default DynamicForm;
