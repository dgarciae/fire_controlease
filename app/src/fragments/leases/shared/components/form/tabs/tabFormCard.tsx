/* **
 * Props and types
 ** */

interface TabFormCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/* **
 * Component
 ** */

export function TabFormCard({ title, subtitle, children }: TabFormCardProps) {
  return (
    <div
      className="bg-background flex flex-col gap-y-4 rounded border p-4 shadow-sm"
      id={title.replace(" ", "-").toLowerCase()}
    >
      <div className="flex gap-x-4">
        <h3 className="mb-1 text-lg font-semibold">{title}</h3>
        <h4 className="mb-1 text-sm font-thin">{subtitle}</h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {children}
      </div>
    </div>
  );
}
