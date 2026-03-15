import { site } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <p>
          {new Date().getFullYear()} {site.name}. Crafted with Next.js.
        </p>
        <p>{site.availability}</p>
      </div>
    </footer>
  );
}
