"use client";

import { useState } from "react";
import Script from "next/script";

const MAX_FILE_SIZE_MB = 10;
const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

function getErrorMessage(status, fallback) {
  if (!status) {
    return fallback;
  }

  switch (status) {
    case 400:
      return "Captcha verification failed. Please complete the captcha and try again.";
    case 413:
      return `File is too large. Please upload a file up to ${MAX_FILE_SIZE_MB}MB.`;
    case 415:
      return "Unsupported file type. Please upload PDF, DOC, DOCX, or TXT.";
    case 422:
      return "Invalid input. Please check your email and message.";
    case 500:
      return "Email service is not configured correctly. Please try again later.";
    default:
      return fallback;
  }
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const isCaptchaConfigured = Boolean(recaptchaSiteKey);

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus({
          type: "error",
          message: getErrorMessage(response.status, payload.error || "Failed to send. Please try again."),
        });
        return;
      }

      setStatus({
        type: "success",
        message: payload.message || "Thanks! I received your job description.",
      });
      form.reset();
      if (typeof window !== "undefined" && window.grecaptcha) {
        window.grecaptcha.reset();
      }
    } catch {
      setStatus({
        type: "error",
        message: "Unable to connect to the server. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {isCaptchaConfigured ? (
        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="afterInteractive"
        />
      ) : null}

      <div className="contact-grid">
        <label className="field">
          <span>Full name</span>
          <input name="name" type="text" placeholder="Jane Doe" required />
        </label>

        <label className="field">
          <span>Recruiter email</span>
          <input name="email" type="email" placeholder="hr@company.com" required />
        </label>
      </div>

      <label className="field">
        <span>Company</span>
        <input name="company" type="text" placeholder="ABC Company" />
      </label>

      <label className="field">
        <span>Message</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Share role details, requirements, and collaboration expectations"
          required
        />
      </label>

      <label className="field">
        <span>Job description file (PDF, DOC, DOCX, TXT - max 10MB)</span>
        <input
          name="jdFile"
          type="file"
          accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
          required
        />
      </label>

      <div className="captcha-wrap">
        {isCaptchaConfigured ? (
          <div
            className="g-recaptcha"
            data-sitekey={recaptchaSiteKey}
          />
        ) : (
          <p className="form-status error">
            reCAPTCHA is not configured. Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.local.
          </p>
        )}
      </div>

      <div className="contact-actions">
        <button className="btn btn-primary" type="submit" disabled={isSubmitting || !isCaptchaConfigured}>
          {isSubmitting ? "Sending..." : "Send JD"}
        </button>
      </div>

      {status.type !== "idle" ? (
        <p className={`form-status ${status.type}`}>{status.message}</p>
      ) : null}
    </form>
  );
}
