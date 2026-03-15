import Link from "next/link";
import { projects, site } from "@/data/portfolio";

export default function Home() {
  return (
    <main className="container page-content">
      <section className="hero reveal">
        <p className="eyebrow">Portfolio 2026</p>
        <h1>
          {site.name}
          <span>{site.role}</span>
        </h1>
        <p className="lead">{site.intro}</p>

        <div className="hero-actions">
          <Link href="/projects" className="btn btn-primary">
            View Projects
          </Link>
          <Link href="/resume" className="btn btn-secondary">
            View Resume
          </Link>
        </div>
      </section>

      <section className="content-grid reveal delay-1">
        <article className="panel">
          <h2>Quick intro</h2>
          <p>
            Based in {site.location}. I focus on building products that feel fast,
            look intentional, and are easy to maintain as the team grows.
          </p>
        </article>

        <article className="panel">
          <h2>Contact</h2>
          <p>{site.email}</p>
          <ul className="link-list">
            {site.socialLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="reveal delay-2">
        <div className="section-header compact">
          <p className="eyebrow">Featured</p>
          <h2>Recent projects</h2>
        </div>
        <div className="projects-grid">
          {projects.slice(0, 3).map((project) => (
            <article key={project.title} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
