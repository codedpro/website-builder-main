import Image from "next/image";

interface TemplatePreviewProps {
  templates: {
    id: string;
    tag: string;
    title: string;
    description: string;
    button: string;
    image: string;
  }[];
}

export default function TemplatePreview({ templates }: TemplatePreviewProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-6">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`rounded-xl shadow-lg p-4 transition-shadow hover:shadow-xl ${
            template.id === "1"
              ? "border-2 border-primary-brand bg-secondary-lightuser dark:bg-secondary-darkuser"
              : "bg-primary-lightuser dark:bg-primary-darkuser"
          } text-secondary-darkuser dark:text-secondary-lightuser`}
        >
          {/* Image Section */}
          <div className="relative w-full h-48 overflow-hidden rounded-lg">
            <Image
              width={500}
              height={300}
              src={template.image}
              alt={template.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <span className="absolute top-2 right-2 bg-primary-brand text-primary-lightuser text-xs font-bold py-1 px-3 rounded-full shadow">
              {template.tag}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-extrabold text-primary-brand mt-4">
            {template.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-tertiary-darkuser dark:text-tertiary-lightuser mt-2">
            {template.description}
          </p>

          {/* Button */}
          <div className="mt-4">
            <button className="w-full px-4 py-2 font-medium text-sm rounded-lg bg-primary-brand text-primary-lightuser hover:bg-tertiary-brand transition-colors">
              {template.button}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
