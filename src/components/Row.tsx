import type { ReactNode } from "react";

/**
 * A two-column row: a narrow marker on the left, content on the right. Shared
 * by experience, education, achievements and certifications so the
 * whole page scans down one alignment spine.
 */
export function Row({
  marker,
  first = false,
  children,
}: {
  marker: ReactNode;
  first?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`edge grid grid-cols-1 gap-1.5 py-[15px] wide:grid-cols-[200px_minmax(0,1fr)] wide:gap-6 ${
        first ? "" : "border-t border-rule-soft"
      }`}
    >
      <div className="font-narrow text-meta tracking-label text-muted uppercase wide:pt-1">
        {marker}
      </div>
      <div>{children}</div>
    </div>
  );
}

export function RowList({ children }: { children: ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
}
