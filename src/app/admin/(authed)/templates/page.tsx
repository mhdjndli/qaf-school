import { listTemplates } from "@/lib/store";
import NewTemplateForm from "./NewTemplateForm";
import TemplateCard from "./TemplateCard";

export default async function AdminTemplatesPage() {
  const templates = await listTemplates();

  return (
    <div>
      <header className="mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-heading text-3xl font-bold text-text">
            Email Templates
          </h1>
          <p className="text-text-light text-sm mt-1">
            {templates.length} template{templates.length === 1 ? "" : "s"}.
            Re-usable emails for admissions. Use placeholders like{" "}
            <code className="px-1.5 py-0.5 bg-cream rounded text-xs">
              {"{parent}"}
            </code>{" "}
            or{" "}
            <code className="px-1.5 py-0.5 bg-cream rounded text-xs">
              {"{child}"}
            </code>
            .
          </p>
        </div>
        <NewTemplateForm />
      </header>

      {templates.length === 0 ? (
        <div className="bg-white border border-border rounded-xl p-10 text-center text-text-light">
          No templates yet. Click{" "}
          <span className="font-medium text-text">+ New template</span> to add
          your first one.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {templates.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
      )}
    </div>
  );
}
