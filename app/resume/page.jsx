import { resume } from "@/data/portfolio";

export const metadata = {
  title: "Resume | Thien Portfolio",
  description: "Professional experience, achievements, and education.",
};

export default function ResumePage() {
  return (
    <main className="container page-content">
      <section className="section-header reveal">
        <p className="eyebrow">Resume</p>
        <h1>Experience and education</h1>
      </section>

      <section className="timeline-grid reveal delay-1">
        <article className="panel">
          <h2>Highlights</h2>
          <ul className="list">
            {resume.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h2>Experience</h2>
          <ul className="list">
            {resume.experience.map((item) => (
              <li key={item.role + item.company}>
                <strong>{item.role}</strong> at {item.company} ({item.period})
                <p>{item.details}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h2>Education</h2>
          <ul className="list">
            {resume.education.map((item) => (
              <li key={item.title + item.school}>
                <strong>{item.title}</strong> - {item.school} ({item.period})
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
