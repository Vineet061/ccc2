"use client";

import { useId, useRef, useState } from "react";

import { Icon } from "./Icon";
import { contactEndpoint, mailtoEnquiry, site } from "@/lib/site";
import styles from "./ContactForm.module.css";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "failed"; message: string };

type Errors = Partial<Record<"email" | "subject" | "message", string>>;

/** Deliberately permissive: the job here is to catch a typo, not to police
 *  which addresses exist. The provider verifies deliverability. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Errors>({});
  const ids = {
    email: useId(),
    phone: useId(),
    subject: useId(),
    message: useId(),
  };

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!email) next.email = "We need an address to reply to.";
    else if (!EMAIL.test(email)) next.email = "That does not look like an email address.";

    if (!subject) next.subject = "A few words about the subject, please.";

    if (!message) next.message = "Tell us a little about the problem.";
    else if (message.length < 12) next.message = "A sentence or two would help.";

    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Keeps the visitor on the page: nothing navigates, the result appears
    // below the button.
    event.preventDefault();
    if (status.kind === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    // A filled honeypot means a bot. Show the success state and send nothing.
    if (String(data.get("_honey") ?? "")) {
      setStatus({ kind: "sent" });
      return;
    }

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = form.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }

    setStatus({ kind: "sending" });

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: data.get("email"),
          phone: data.get("phone") || "Not given",
          subject: data.get("subject"),
          message: data.get("message"),
          // Read by FormSubmit and ignored by providers that do not use them.
          _subject: `CCC enquiry: ${data.get("subject")}`,
          _template: "table",
        }),
      });

      if (!response.ok) throw new Error(`Request failed (${response.status})`);

      setStatus({ kind: "sent" });
      form.reset();
    } catch {
      setStatus({
        kind: "failed",
        message: "That did not go through.",
      });
    }
  }

  const sending = status.kind === "sending";

  return (
    <form
      ref={formRef}
      className={styles.form}
      onSubmit={onSubmit}
      noValidate
      aria-describedby={status.kind === "idle" ? undefined : "contact-status"}
    >
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={ids.email}>
            Email
          </label>
          <input
            id={ids.email}
            className={styles.input}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? `${ids.email}-error` : undefined}
            required
          />
          {errors.email && (
            <p className={styles.error} id={`${ids.email}-error`}>
              {errors.email}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={ids.phone}>
            Phone
            <span className={styles.optional}>optional</span>
          </label>
          <input
            id={ids.phone}
            className={styles.input}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 00000 00000"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={ids.subject}>
          Subject
        </label>
        <input
          id={ids.subject}
          className={styles.input}
          name="subject"
          type="text"
          placeholder="What is this about?"
          aria-invalid={errors.subject ? "true" : undefined}
          aria-describedby={errors.subject ? `${ids.subject}-error` : undefined}
          required
        />
        {errors.subject && (
          <p className={styles.error} id={`${ids.subject}-error`}>
            {errors.subject}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={ids.message}>
          Message
        </label>
        <textarea
          id={ids.message}
          className={styles.textarea}
          name="message"
          placeholder="What are you trying to build, and what is in the way?"
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? `${ids.message}-error` : undefined}
          required
        />
        {errors.message && (
          <p className={styles.error} id={`${ids.message}-error`}>
            {errors.message}
          </p>
        )}
      </div>

      {/* Not for people. Labelled and aria-hidden so assistive tech skips it. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="ccc-company">Company</label>
        <input
          id="ccc-company"
          name="_honey"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={styles.actions}>
        <button
          type="submit"
          className={`btn btn-primary ${styles.submit}`}
          disabled={sending}
        >
          {sending ? (
            <>
              <span className={styles.spinner} aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              Send message
              <Icon name="arrowRight" size={16} />
            </>
          )}
        </button>
      </div>

      {/* Announced the moment it changes, without moving focus. */}
      <div id="contact-status" role="status" aria-live="polite">
        {status.kind === "sent" && (
          <div className={`${styles.status} ${styles.statusOk}`}>
            <Icon name="check" size={17} className={styles.statusIcon} />
            <span>
              Thanks, that reached us. We read everything and usually reply
              within a day.
            </span>
          </div>
        )}

        {status.kind === "failed" && (
          <div className={`${styles.status} ${styles.statusBad}`}>
            <Icon name="mail" size={17} className={styles.statusIcon} />
            <span>
              {status.message} Send it straight to{" "}
              <a className={styles.statusFallback} href={mailtoEnquiry}>
                {site.email}
              </a>{" "}
              instead and we will pick it up.
            </span>
          </div>
        )}
      </div>
    </form>
  );
}
