"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";

/**
 * Contact form handler. Validation, the honeypot check and the rate limit all
 * run on the server; the API key never reaches the client.
 */

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  email: z.email("That email address doesn't look right.").max(160),
  message: z
    .string()
    .trim()
    .min(20, "Tell me a bit more — 20 characters at least.")
    .max(4000),
  // Honeypot. A real person never sees this field, so anything in it is a bot.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactState = {
  status: "idle" | "sent" | "error";
  message: string;
  /** Field-level messages, keyed by input name. */
  errors?: Partial<Record<"name" | "email" | "message", string>>;
};

export const initialContactState: ContactState = { status: "idle", message: "" };

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

/**
 * In-memory rate limit. This is per server instance, so on serverless it is a
 * speed bump rather than a guarantee — enough to stop a script hammering the
 * form. Move to Upstash or a Supabase table if that stops being enough.
 */
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

export async function sendMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    company: formData.get("company"),
  });

  if (!parsed.success) {
    const flat = z.flattenError(parsed.error).fieldErrors;
    // A filled honeypot gets the success path: tell the bot nothing.
    if (flat.company) return { status: "sent", message: "Thanks — that's sent." };
    return {
      status: "error",
      message: "Check the fields marked below.",
      errors: {
        name: flat.name?.[0],
        email: flat.email?.[0],
        message: flat.message?.[0],
      },
    };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return {
      status: "error",
      message:
        "That's a few messages in a short time. Try again in ten minutes, or email me directly.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.warn(
      "[contact] RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not set; message not sent.",
    );
    return {
      status: "error",
      message:
        "The form isn't connected to email yet. Use the address above and it will reach me.",
    };
  }

  const { name, email, message } = parsed.data;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio — ${name}`,
      text: `${name} <${email}>\n\n${message}`,
    });
    if (error) throw new Error(error.message);
  } catch (cause) {
    console.error("[contact] send failed", cause);
    return {
      status: "error",
      message: "That didn't send. Email me directly and it will get through.",
    };
  }

  return { status: "sent", message: "Thanks — that's sent. I'll reply soon." };
}
