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

export default function Navbar() {
  const pathname = usePathname();
  const headerClassName = pathname === "/" ? "site-header" : "site-header";

  return (
    <header className={headerClassName}>
      <div className="container nav-wrap">
        <Link href="/" className="brand">
          <Image
            src={site.avatar}
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
  );
}
