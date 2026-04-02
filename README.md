# Thien Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-blue?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

Personal portfolio website built with **Next.js 14 App Router** and **Tailwind CSS**.

## 🚀 Features

- Responsive and modern UI
- Projects showcase (`ProjectCard`, `StoryCarousel`)
- Contact form with JD attachment support (PDF/DOC/DOCX/TXT up to 10MB) for recruiters
- About, Projects, Resume, Contact pages
- Google reCAPTCHA v2 spam protection
- Server-side email sending via SMTP (`/api/contact/route.js`)
- Navbar, Footer components

## 🛠️ Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS + PostCSS
- React (custom components)
- Nodemailer/SMTP for emails
- Google reCAPTCHA
- ESLint (flat config)

## 📦 Getting Started

### Prerequisites

- Node.js ^18.17.0

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/thien-portfolio.git
   cd thien-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

4. Configure environment variables (see below).

5. Start development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## 🔧 Environment Variables

Required in `.env.local`:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=Your Name <your-smtp-user@gmail.com>
CONTACT_TO_EMAIL=your-inbox@gmail.com
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```

### reCAPTCHA Setup

1. Visit [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin/create).
2. Choose **reCAPTCHA v2** > **Checkbox**.
3. Add domains: `localhost`, your production domain.
4. Copy **Site Key** (`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`) and **Secret Key** (`RECAPTCHA_SECRET_KEY`).
5. Restart dev server.

**Note:** Use Gmail App Passwords for SMTP (enable 2FA first).

## ⚡ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run start` | Production server |
| `npm run lint` | Lint code |

## ☁️ Deployment

**Recommended: Vercel** (free, optimized for Next.js)

1. Push to GitHub.
2. Connect repo to [Vercel](https://vercel.com).
3. Add env vars in project settings.
4. Deploy automatically on push.

Alternatives: Netlify, Render, Railway.

## 📁 Project Structure

```
.
├── app/                 # App Router (pages & layouts)
├── components/          # Reusable UI components
├── data/               # Static data (e.g., projects)
├── public/             # Static assets (tech icons)
├── .env.example        # Env template
├── next.config.mjs     # Next.js config
└── tailwind.config.js? # Tailwind config (if separate)
```

## 🤝 Contributing

1. Fork the repo.
2. Create feature branch.
3. Commit changes.
4. Open PR.

## 📄 License

MIT License - see [LICENSE](LICENSE) file (create if missing).

---

⭐ **Star this repo if helpful!** Questions? Open an issue.

**Author:** Thien ([@yourtwitter](https://twitter.com/yourhandle))

