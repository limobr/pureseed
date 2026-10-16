import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/** Standard layout for text pages (About, Contact, policies, blog posts). */
export function PageShell({
  crumbs,
  title,
  lead,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-page px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
      <Breadcrumbs items={crumbs} />
      <h1 className="max-w-3xl text-2xl font-bold leading-tight tracking-tight sm:text-4xl">{title}</h1>
      {lead && <p className="mt-3 max-w-2xl text-base leading-7 text-slate sm:mt-4 sm:text-lg sm:leading-8">{lead}</p>}
      <div className="mt-6 sm:mt-8">{children}</div>
    </div>
  );
}
