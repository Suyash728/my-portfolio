/**
 * A visible placeholder. Every outstanding piece of content on the site renders
 * through this, so nothing can quietly ship as a dead link or an empty section.
 */
export function Todo({ children = "todo" }: { children?: string }) {
  return (
    <span className="inline-block border border-dashed border-rule px-1.5 align-[1px] font-narrow text-tiny tracking-eyebrow text-muted uppercase">
      {children}
    </span>
  );
}
