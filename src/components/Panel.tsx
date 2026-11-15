import type { ReactNode } from "react";

/**
 * One readout panel. Panels are separated by a single rule — no radius, no
 * shadow, no card float. That restraint is what keeps the rail as the only
 * loud element on the page.
 */
export function Panel({
  id,
  heading,
  intro,
  className = "",
  children,
}: {
  id?: string;
  heading?: string;
  intro?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={id && heading ? `${id}-heading` : undefined}
      className={`scroll-mt-20 py-10 sm:py-12 border-b border-rule last:border-b-0 ${className}`}
    >
      {heading ? (
        <h2
          id={id ? `${id}-heading` : undefined}
          className="mb-[22px] font-narrow text-meta font-semibold tracking-eyebrow text-muted uppercase"
        >
          {heading}
        </h2>
      ) : null}
      {intro ? <p className="mb-6 max-w-[66ch] text-muted">{intro}</p> : null}
      {children}
    </section>
  );
}
