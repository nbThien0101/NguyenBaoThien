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
  return text
    .trim()
    .split(/\s+/)
    .map((word, index) => (
      <span
        key={`${keyPrefix}-${index}-${word}`}
        className="home-word-reveal"
        style={{ animationDelay: `${baseDelay + index * 0.075}s` }}
      >
        {word}
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
                src="/avatar.jpeg"
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
