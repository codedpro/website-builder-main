/* import { DynamicFormSchema } from "@/types/DynamicForm";

const feedbackFormSchema: DynamicFormSchema = {
  title: "Feedback Form",
  submitButton: "submit",
  submitingButton: "submitting ...",
  apiUrl: "/api/feedback-submit",
  sections: [
    {
      title: "Personal Information",
      fields: [
        {
          id: "name",
          name: "name",
          label: "Full Name",
          type: "input",
          inputType: "text",
          placeholder: "Jane Smith",
          required: true,
          validation: {
            minLength: 2,
            maxLength: 50,
          },
        },
        {
          id: "email",
          name: "email",
          label: "Email Address",
          type: "input",
          inputType: "email",
          placeholder: "jane.smith@example.com",
          required: true,
          validation: {
            pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
            customMessage: "Please enter a valid email address.",
          },
        },
      ],
    },
    {
      title: "Feedback Details",
      fields: [
        {
          id: "feedbackType",
          name: "feedbackType",
          label: "Type of Feedback",
          type: "select",
          required: true,
          options: [
            { label: "Select Feedback Type", value: "" },
            { label: "Bug Report", value: "bug" },
            { label: "Feature Request", value: "feature" },
            { label: "General Comment", value: "comment" },
          ],
        },
        {
          id: "bugDescription",
          name: "bugDescription",
          label: "Bug Description",
          type: "textarea",
          placeholder: "Describe the bug you encountered...",
          required: true,
          condition: {
            field: "feedbackType",
            value: "bug",
          },
          validation: {
            minLength: 10,
            maxLength: 500,
            customMessage: "Please provide a detailed bug description.",
          },
        },
        {
          id: "featureDescription",
          name: "featureDescription",
          label: "Feature Description",
          type: "textarea",
          placeholder: "Describe the feature you'd like to see...",
          required: true,
          condition: {
            field: "feedbackType",
            value: "feature",
          },
          validation: {
            minLength: 10,
            maxLength: 500,
            customMessage: "Please provide a detailed feature description.",
          },
        },
        {
          id: "generalComment",
          name: "generalComment",
          label: "Your Comment",
          type: "textarea",
          placeholder: "Share your thoughts...",
          required: true,
          condition: {
            field: "feedbackType",
            value: "comment",
          },
          validation: {
            minLength: 10,
            maxLength: 500,
            customMessage: "Please provide your comments.",
          },
        },
        {
          id: "rating",
          name: "rating",
          label: "Rate Our Service",
          type: "radio",
          required: true,
          options: [
            { label: "1 - Poor", value: "1" },
            { label: "2 - Fair", value: "2" },
            { label: "3 - Good", value: "3" },
            { label: "4 - Very Good", value: "4" },
            { label: "5 - Excellent", value: "5" },
          ],
        },
        {
          id: "subscribe",
          name: "subscribe",
          label: "Subscribe to Newsletter",
          type: "checkbox",
          required: false,
          options: [{ label: "Yes, sign me up!", value: "subscribe" }],
        },
      ],
    },
  ],
};
 */