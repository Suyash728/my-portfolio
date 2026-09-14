import { ContactForm } from "@/components/ContactForm";
import { Panel } from "@/components/Panel";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <Panel id="contact" heading="Contact">
      <h3 className="text-lead font-semibold tracking-tight">
        Hiring, freelance retrieval work, or a question about the paper — all
        fine.
      </h3>
      <p className="mt-2 max-w-[66ch] text-muted">
        Email is fastest. I reply to everything that isn&rsquo;t a bulk send.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <a className="btn btn-quiet" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <a className="btn btn-quiet" href={profile.linkedin}>
          LinkedIn
        </a>
        <a className="btn btn-quiet" href={profile.github}>
          GitHub
        </a>
      </div>

      <ContactForm />
    </Panel>
  );
}
