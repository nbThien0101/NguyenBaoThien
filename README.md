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
The form also requires Google reCAPTCHA verification to reduce spam.

## Required Environment Variables

Add these in `.env.local`:

- `SMTP_HOST`: SMTP server host (example: `smtp.gmail.com`)
- `SMTP_PORT`: SMTP port (usually `587`)
- `SMTP_SECURE`: `true` for SSL (`465`), otherwise `false`
- `SMTP_USER`: SMTP username
- `SMTP_PASS`: SMTP password or app password
- `SMTP_FROM`: sender email shown in the outbound email
- `CONTACT_TO_EMAIL`: your inbox receiving recruiter submissions
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: Google reCAPTCHA site key (public key)
- `RECAPTCHA_SECRET_KEY`: Google reCAPTCHA secret key (server key)

## Enable reCAPTCHA (Spam Protection)

1. Open Google reCAPTCHA admin console: https://www.google.com/recaptcha/admin/create
2. Create a new key with these settings:
	- Type: `reCAPTCHA v2`
	- Option: `I'm not a robot` Checkbox
	- Domains: add `localhost` for local development, and your production domain later
3. Copy the generated keys into `.env.local`:
	- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<your site key>`
	- `RECAPTCHA_SECRET_KEY=<your secret key>`
4. Restart the dev server after editing env values.

## Build

```bash
npm run build
```
