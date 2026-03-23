# Thien Portfolio

Personal portfolio built with Next.js App Router.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact Feature (Recruiters Send JD)

The homepage includes a contact form where recruiters can submit:

- Name
- Recruiter email
- Company
- Message
- JD file attachment (PDF, DOC, DOCX, TXT up to 10MB)

Submitted data is sent to your inbox through SMTP via API route `POST /api/contact`.

## Required Environment Variables

Add these in `.env.local`:

- `SMTP_HOST`: SMTP server host (example: `smtp.gmail.com`)
- `SMTP_PORT`: SMTP port (usually `587`)
- `SMTP_SECURE`: `true` for SSL (`465`), otherwise `false`
- `SMTP_USER`: SMTP username
- `SMTP_PASS`: SMTP password or app password
- `SMTP_FROM`: sender email shown in the outbound email
- `CONTACT_TO_EMAIL`: your inbox receiving recruiter submissions

## Build

```bash
npm run build
```
