"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  initialContactState,
  sendMessage,
  type ContactState,
} from "@/app/actions/contact";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="cursor-pointer justify-self-start border-0 bg-signal px-[22px] py-[11px] font-narrow text-meta tracking-label text-raised uppercase transition-colors hover:bg-ink active:translate-y-px disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? "Sending" : "Send"}
    </button>
  );
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-small text-flag" role="alert">
      {children}
    </p>
  );
}

export function ContactForm() {
  const [state, action] = useActionState<ContactState, FormData>(
    sendMessage,
    initialContactState,
  );

  return (
    <form action={action} className="mt-5 grid max-w-[520px] gap-[15px]">
      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block font-narrow text-meta tracking-label text-muted uppercase"
        >
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={80}
          required
          aria-invalid={state.errors?.name ? true : undefined}
          aria-describedby={
            state.errors?.name ? "contact-name-error" : undefined
          }
          className="field"
        />
        <FieldError id="contact-name-error">
          {state.errors?.name}
        </FieldError>
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block font-narrow text-meta tracking-label text-muted uppercase"
        >
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={160}
          required
          aria-invalid={state.errors?.email ? true : undefined}
          aria-describedby={
            state.errors?.email ? "contact-email-error" : undefined
          }
          className="field"
        />
        <FieldError id="contact-email-error">
          {state.errors?.email}
        </FieldError>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block font-narrow text-meta tracking-label text-muted uppercase"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          maxLength={4000}
          required
          aria-invalid={state.errors?.message ? true : undefined}
          aria-describedby={
            state.errors?.message ? "contact-message-error" : undefined
          }
          className="field min-h-[110px] resize-y"
        />
        <FieldError id="contact-message-error">
          {state.errors?.message}
        </FieldError>
      </div>

      {/* Honeypot: off-screen, not hidden, so bots fill it and people never see it. */}
      <input
        id="contact-company"
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px]"
      />

      <SubmitButton />

      <p
        aria-live="polite"
        className={`text-small ${state.status === "error" ? "text-flag" : "text-muted"}`}
      >
        {state.message ||
          "I read everything that isn't a bulk send. Your address is only used to reply."}
      </p>
    </form>
  );
}
