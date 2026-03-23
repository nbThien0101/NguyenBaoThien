import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
]);

function toNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getRequiredEnv() {
  return {
    host: process.env.SMTP_HOST,
    port: toNumber(process.env.SMTP_PORT, 587),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    toEmail: process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER,
    fromEmail: process.env.SMTP_FROM || process.env.SMTP_USER,
  };
}

function validateInput({ name, email, message, file }) {
  if (!name || !email || !message || !file) {
    return { code: 422, error: "Missing required fields." };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { code: 422, error: "Invalid email." };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { code: 413, error: "File too large." };
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return { code: 415, error: "Unsupported file type." };
  }

  return null;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const file = formData.get("jdFile");

    const inputError = validateInput({ name, email, message, file });
    if (inputError) {
      return NextResponse.json({ error: inputError.error }, { status: inputError.code });
    }

    const env = getRequiredEnv();
    if (!env.host || !env.user || !env.pass || !env.toEmail || !env.fromEmail) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: env.host,
      port: env.port,
      secure: env.secure,
      auth: {
        user: env.user,
        pass: env.pass,
      },
    });

    const arrayBuffer = await file.arrayBuffer();
    const attachmentBuffer = Buffer.from(arrayBuffer);

    await transporter.sendMail({
      from: env.fromEmail,
      to: env.toEmail,
      replyTo: email,
      subject: `New JD from ${name}${company ? ` (${company})` : ""}`,
      text: [
        "You received a new JD from your portfolio contact form.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "N/A"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      attachments: [
        {
          filename: file.name,
          content: attachmentBuffer,
          contentType: file.type,
        },
      ],
    });

    return NextResponse.json({
      ok: true,
      message: "Da gui JD thanh cong. Minh se phan hoi som!",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to process contact request." },
      { status: 500 },
    );
  }
}
