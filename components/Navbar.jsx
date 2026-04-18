"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { site } from "@/data/portfolio";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

function getSocialHref(keyword, fallbackHref) {
  return (
    site.socialLinks.find((item) =>
      item.label.toLowerCase().includes(keyword.toLowerCase())
    )?.href ?? fallbackHref
  );
}

function GithubRailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.21-3.37-1.21-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.62.07-.62 1 .08 1.54 1.06 1.54 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.11-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.05.8-.23 1.66-.35 2.51-.35.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.43.21 2.48.1 2.74.64.72 1.03 1.63 1.03 2.75 0 3.95-2.35 4.81-4.59 5.07.36.32.68.95.68 1.93 0 1.39-.01 2.51-.01 2.85 0 .27.18.6.69.49A10.27 10.27 0 0 0 22 12.25C22 6.59 17.52 2 12 2z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInRailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M6.94 8.4a1.73 1.73 0 1 1 0-3.46 1.73 1.73 0 0 1 0 3.46zM5.4 9.67h3.08V19H5.4V9.67zM10.3 9.67h2.95v1.27h.04c.41-.78 1.41-1.6 2.9-1.6 3.1 0 3.67 2.04 3.67 4.7V19h-3.08v-4.4c0-1.05-.02-2.4-1.46-2.4-1.46 0-1.69 1.14-1.69 2.33V19H10.3V9.67z"
        fill="currentColor"
      />
    </svg>
  );
}

function FacebookRailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M14.43 8.55h2.12V5.5h-2.5c-2.9 0-4.31 1.68-4.31 4.35v1.95H7.5v3.05h2.24v4.65h3.05v-4.65h2.46l.38-3.05h-2.84V9.96c0-.89.24-1.41 1.26-1.41z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const headerClassName =
    pathname === "/" ? "site-header site-header--home-intro" : "site-header";
  const showHomeRails = pathname === "/";
  const githubHref = getSocialHref("github", "https://github.com/nbThien0101");
  const linkedInHref = getSocialHref(
    "linkedin",
    "https://www.linkedin.com/in/nguyenbaothien01"
  );
  const facebookHref = getSocialHref("facebook", "https://www.facebook.com/");

  return (
    <>
      <header className={headerClassName}>
        <div className="container nav-wrap">
          <Link href="/" className="brand">
            <Image
              src="/avatar.png"
              alt="Nguyen Bao Thien"
              width={42}
              height={42}
              className="brand-avatar"
              priority
            />
          </Link>
          <nav className="nav-links" aria-label="Primary navigation">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={isActive ? "nav-link active" : "nav-link"}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {showHomeRails && (
        <>
          <aside className="home-side-rail home-side-rail--left" aria-label="Social links">
            <div className="home-side-links">
              <a
                href={githubHref}
                target="_blank"
                rel="noreferrer"
                className="home-side-icon-link"
                aria-label="Open GitHub profile"
              >
                <GithubRailIcon />
              </a>
              <a
                href={linkedInHref}
                target="_blank"
                rel="noreferrer"
                className="home-side-icon-link"
                aria-label="Open LinkedIn profile"
              >
                <LinkedInRailIcon />
              </a>
              <a
                href={facebookHref}
                target="_blank"
                rel="noreferrer"
                className="home-side-icon-link"
                aria-label="Open Facebook profile"
              >
                <FacebookRailIcon />
              </a>
            </div>
            <span className="home-side-line" aria-hidden="true" />
          </aside>

          <aside className="home-side-rail home-side-rail--right" aria-label="Email link">
            <a href={`mailto:${site.email}`} className="home-side-email" aria-label="Send email">
              {site.email}
            </a>
            <span className="home-side-line" aria-hidden="true" />
          </aside>
        </>
      )}
    </>
  );
}
