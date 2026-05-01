import Link from "next/link";
import Image from "next/image";
import { projects, site, technicalSkills, softSkills } from "@/data/portfolio";
 
const defaultTechIcon = "/tech-icons/default.svg";
const noLogoSkills = new Set(["TensorFlow", "PyTorch", "OpenCV"]);

const techIconMap = {
  "C++": "/tech-icons/cpp.svg",
  C: "/tech-icons/c.svg",
  "C#": "/tech-icons/csharp.svg",
  Java: "/tech-icons/java.svg",
  JavaScript: "/tech-icons/javascript.svg",
  Python: "/tech-icons/python.svg",
  React: "/tech-icons/react.svg",
  "React Native": "/tech-icons/react-native.svg",
  Vite: "/tech-icons/vite.svg",
  "HTML/CSS": "/tech-icons/html-css.svg",
  "Node.js": "/tech-icons/nodejs.svg",
  MongoDB: "/tech-icons/mongodb.svg",
  MySQL: "/tech-icons/mysql.svg",
  PostgreSQL: "/tech-icons/postgresql.svg",
  GitHub: "/tech-icons/github.svg",
  GitLab: "/tech-icons/gitlab.svg",
  VSCode: "/tech-icons/vscode.svg",
  Figma: "/tech-icons/figma.svg",
  Render: "/tech-icons/render.svg",
  Vercel: "/tech-icons/vercel.svg",
  Docker: "/tech-icons/docker.svg",
  Postman: "/tech-icons/postman.svg",
  Cloudflare: "/tech-icons/cloudflare.svg",
  Azure: "/tech-icons/azure.svg",
};

function renderAnimatedWords(text, keyPrefix, baseDelay = 0.35) {
  // perf: group words into small chunks (3-4 words each) to reduce animation overhead
  // Chunks animate in instead of individual words - much better performance
  const words = text.trim().split(/\s+/);
  const chunkSize = 3; // group 3 words per chunk
  const chunks = [];
  
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(" "));
  }
  
  return chunks.map((chunk, index) => (
    <span
      key={`${keyPrefix}-chunk-${index}`}
      className="home-word-reveal"
      style={{ animationDelay: `${baseDelay + index * 0.2}s` }} // 200ms delay per chunk
    >
      {chunk}{" "}
    </span>
  ));
}

export default function Home() {
  return (
    <main className="container page-content home-page">
      <div className="home-ambient-bg" aria-hidden="true">
        <span className="home-orb home-orb--1" />
        <span className="home-orb home-orb--2" />
        <span className="home-orb home-orb--3" />
      </div>

      <section className="hero home-hero">
        <div className="hero-inner">
          {/* Text */}
          <div className="hero-text">
            <p className="eyebrow home-word-line">
              {renderAnimatedWords("Hello my name is", "eyebrow", 0.45)}
            </p>
            <h1 className="home-word-line">
              {renderAnimatedWords(site.name, "name", 0.8)}
            </h1>
            <p className="lead home-word-line home-word-line--lead">
              {renderAnimatedWords(site.intro, "intro", 1.25)}
            </p>

            <div className="hero-actions home-hero-actions">
              <Link href="/projects" className="btn btn-primary">
                View Projects
              </Link>
              <Link href="/resume" className="btn btn-secondary">
                View Resume
              </Link>
              <a href="/NguyenBaoThien_cv_SoftwareEngineering.pdf" download className="btn btn-secondary">
                ⬇ Download CV
              </a>
            </div>
          </div>

          {/* Avatar */}
          <div className="hero-avatar-wrap">
            <div className="hero-avatar-ring" />
            <div className="hero-avatar-frame">
              <Image
                src={site.avatar}
                alt="Nguyen Bao Thien"
                fill
                sizes="(max-width: 700px) 220px, 300px"
                className="hero-avatar-img"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Left side rail - social links */}
      <aside className="home-side-rail home-side-rail--left" aria-label="Social links">
        <div className="home-side-line" />
        <div className="home-side-links">
          {site.socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="home-side-icon-link"
              aria-label={link.label}
              title={link.label}
            >
              {link.label.includes("GitHub") && (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 . 405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.016 12.016 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              )}
              {link.label.includes("LinkedIn") && (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.474-2.237-1.667-2.237-.91 0-1.451.613-1.688 1.205-.087.216-.11.517-.11.819v5.782h-3.554s.047-9.383 0-10.353h3.554v1.467c.457-.707 1.276-1.714 3.088-1.714 2.258 0 3.95 1.476 3.95 4.65v5.95zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.705 0-.955.769-1.708 1.958-1.708 1.187 0 1.919.753 1.937 1.708 0 .947-.75 1.705-1.98 1.705zm1.946 11.597H3.39V9.099h3.893v11.353zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              )}
              {link.label.includes("Facebook") && (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              )}
            </a>
          ))}
        </div>
      </aside>

      {/* Right side rail - email */}
      <aside className="home-side-rail home-side-rail--right" aria-label="Contact email">
        <div className="home-side-line" />
        <a href={`mailto:${site.email}`} className="home-side-email" title={`Email: ${site.email}`}>
          {site.email}
        </a>
      </aside>

      {/* Technical Skills (perf: content-visibility via .home-section) */}
      <section
        className="home-section panel reveal reveal-right delay-2 duration-slow reveal-stagger"
        data-reveal-stagger="85ms"
      >
        <div className="section-header compact" style={{marginBottom: "1.2rem"}}>
          <p className="eyebrow">Skills</p>
          <h2>Technical Skills</h2>
        </div>
        <div className="skills-table">
          {technicalSkills.map((row) => (
            <div key={row.category} className="skills-row">
              <span className="skills-category">{row.category}</span>
              <div className="chip-list skills-chips">
                {row.items.map((item) => {
                  const iconSrc = techIconMap[item] ?? defaultTechIcon;
                  return (
                    <span key={item} className="chip skill-chip">
                      {!noLogoSkills.has(item) && (
                        <Image
                          src={iconSrc}
                          alt={`${item} icon`}
                          width={16}
                          height={16}
                          className="skill-icon"
                        />
                      )}
                      <span>{item}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="section-header compact" style={{margin: "1.5rem 0 0.8rem"}}>
          <h2>Soft Skills</h2>
        </div>
        <div className="chip-list">
          {softSkills.map((s) => (
            <span key={s} className="chip chip--soft">{s}</span>
          ))}
        </div>
      </section>

  {/* Contact panel (perf: content-visibility via .home-section) */}
  <section className="home-section panel reveal reveal-left delay-2" id="contact">
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

  {/* Featured projects (perf: content-visibility via .home-section) */}
  <section className="home-section reveal reveal-fade delay-3">
        <div className="section-header compact">
          <p className="eyebrow">Featured</p>
          <h2>Recent projects</h2>
        </div>
        <div className="projects-grid reveal reveal-stagger reveal-pop delay-1">
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
