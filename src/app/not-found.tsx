import Link from "next/link";
import { profile } from "@/content/profile";

export const metadata = { title: "Not found" };

/**
 * The default Next error page is the one screen on the site that would not look
 * like the site. This is a panel like any other: a rule, a heading, a way back.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col justify-center px-5 py-9 wide:px-13">
      <p className="font-narrow text-meta font-semibold tracking-eyebrow text-muted uppercase">
        404
      </p>
      <h1 className="mt-[22px] max-w-[20ch] text-display font-semibold tracking-display text-balance">
        That page isn&rsquo;t here.
      </h1>
      <p className="mt-5 max-w-[52ch] text-muted">
        The portfolio is a single page — projects, experience, stack and contact
        all live on it.
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Link className="btn" href="/">
          Back to the page
        </Link>
        <a className="btn btn-quiet" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </div>
    </main>
  );
}
