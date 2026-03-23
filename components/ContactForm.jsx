"use client";

import { useState } from "react";

const MAX_FILE_SIZE_MB = 10;

function getErrorMessage(status, fallback) {
  if (!status) {
    return fallback;
  }

  switch (status) {
    case 413:
      return `File qua lon. Vui long gui file toi da ${MAX_FILE_SIZE_MB}MB.`;
    case 415:
      return "Dinh dang file khong duoc ho tro. Hay gui PDF, DOC, DOCX hoac TXT.";
    case 422:
      return "Thong tin chua hop le. Vui long kiem tra lai email va noi dung.";
    case 500:
      return "He thong email chua duoc cau hinh dung. Vui long thu lai sau.";
    default:
      return fallback;
  }
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });

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
          message: getErrorMessage(response.status, payload.error || "Gui that bai. Vui long thu lai."),
        });
        return;
      }

      setStatus({
        type: "success",
        message: payload.message || "Cam on ban. Minh da nhan duoc JD.",
      });
      form.reset();
    } catch {
      setStatus({
        type: "error",
        message: "Khong ket noi duoc server. Vui long thu lai sau.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-grid">
        <label className="field">
          <span>Ho ten</span>
          <input name="name" type="text" placeholder="Nguyen Van A" required />
        </label>

        <label className="field">
          <span>Email nha tuyen dung</span>
          <input name="email" type="email" placeholder="hr@company.com" required />
        </label>
      </div>

      <label className="field">
        <span>Cong ty</span>
        <input name="company" type="text" placeholder="Cong ty ABC" />
      </label>

      <label className="field">
        <span>Loi nhan</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Mo ta ngan ve vi tri, yeu cau va cach phoi hop"
          required
        />
      </label>

      <label className="field">
        <span>File JD (PDF, DOC, DOCX, TXT - toi da 10MB)</span>
        <input
          name="jdFile"
          type="file"
          accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
          required
        />
      </label>

      <div className="contact-actions">
        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Dang gui..." : "Gui JD"}
        </button>
      </div>

      {status.type !== "idle" ? (
        <p className={`form-status ${status.type}`}>{status.message}</p>
      ) : null}
    </form>
  );
}
