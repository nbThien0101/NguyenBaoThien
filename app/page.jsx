import Link from "next/link";
import Image from "next/image";
import { projects, site } from "@/data/portfolio";

export default function Home() {
  return (
    <main className="container page-content">
      <section className="hero reveal">
        <div className="hero-inner">
          {/* Text */}
          <div className="hero-text">
            <p className="eyebrow"> Thien's Portfolio</p>
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
          </div>

          {/* Avatar */}
          <div className="hero-avatar-wrap">
            <div className="hero-avatar-ring" />
            <div className="hero-avatar-frame">
              <Image
                src="/avatar.png"
                alt="Nguyen Bao Thien"
                fill
                sizes="(max-width: 700px) 140px, 200px"
                className="hero-avatar-img"
                priority
              />
            </div>
          </div>
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

      <section className="panel reveal delay-2" id="contact">
        <div className="section-header compact">
          <p className="eyebrow">Hiring</p>
          <h2>Contact for opportunities</h2>
        </div>
        <p className="lead form-lead">
          Recruiters can use the dedicated contact page to send job information
          and attach JD files directly to my inbox.
        </p>
        <div className="hero-actions">
          <Link href="/contact" className="btn btn-primary">
            Open Contact Page
          </Link>
        </div>
      </section>

      <section className="reveal delay-3">
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
