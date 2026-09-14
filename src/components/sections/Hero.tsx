import { facts, profile } from "@/content/profile";

export function Hero() {
  return (
    <section className="border-b border-rule px-5 py-9 wide:px-13 wide:py-11">
      <h1 className="rise max-w-[23ch] text-display font-semibold tracking-display text-balance [animation-delay:0.06s]">
        {profile.headline}
      </h1>

      <p className="rise mt-5 max-w-[60ch] text-muted [animation-delay:0.1s]">
        {profile.lede}
      </p>

      <dl className="rise mt-6 flex flex-wrap gap-7 font-narrow text-meta tracking-rail text-muted [animation-delay:0.14s]">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="sr-only">{fact.label}</dt>
            <dd className="m-0">
              <span
                className={`mb-0.5 block font-sans text-big leading-[1.1] font-semibold tracking-display ${
                  fact.tone === "award" ? "text-flag" : "text-ink"
                }`}
              >
                {fact.value}
              </span>
              {fact.label}
            </dd>
          </div>
        ))}
      </dl>

      <div className="rise mt-7 flex flex-wrap items-center gap-3 [animation-delay:0.18s]">
        <a className="btn" href="#projects">
          Read the projects
        </a>
        <a
          className="btn btn-quiet"
          href={profile.resume}
          download
          aria-label="Download resume, PDF"
        >
          Resume <span className="text-tiny">PDF</span>
        </a>
      </div>
    </section>
  );
}
