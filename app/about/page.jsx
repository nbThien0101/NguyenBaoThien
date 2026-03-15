import { site } from "@/data/portfolio";

export const metadata = {
  title: "About | Thien Portfolio",
  description: "About me, my working style, and technical strengths.",
};

export default function AboutPage() {
  return (
    <main className="container page-content">
      <section className="section-header reveal">
        <p className="eyebrow">About</p>
        <h1>Who I am and how I work</h1>
      </section>

      <section className="content-grid reveal delay-1">
        <article className="panel">
          <h2>Profile</h2>
          {site.about.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </article>

        <article className="panel">
          <h2>Core Skills</h2>
          <ul className="chip-list">
            {site.skills.map((skill) => (
              <li key={skill} className="chip">
                {skill}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
