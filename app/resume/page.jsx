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
        <h1>My CV</h1>
        <div className="hero-actions" style={{marginTop: "1rem"}}>
          <a href="/NguyenBaoThien_cv_SoftwareEngineering.pdf" download className="btn btn-primary">⬇ Download CV</a>
        </div>
      </section>

      <section className="reveal delay-1">
        <div className="cv-embed-wrap">
          <iframe
            src="/NguyenBaoThien_cv_SoftwareEngineering.pdf"
            className="cv-embed"
            title="CV - Nguyen Bao Thien"
          >
            <p>
              Trình duyệt không hỗ trợ xem PDF.{" "}
              <a href="/NguyenBaoThien_cv_SoftwareEngineering.pdf" download>Tải xuống tại đây</a>.
            </p>
          </iframe>
        </div>
      </section>

      <section className="section-header reveal">
        <h1>My Experience</h1>
      </section>
      <section className="timeline-grid reveal delay-1">
        <article className="panel">
          <h2>Teacher Assistant in Ho Chi Minh University of Technology</h2>
          <ul className="list">
            {resume.Teacher_Assistant.map((item) => (
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
                <p><strong>GPA: {item.GPA}</strong></p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
