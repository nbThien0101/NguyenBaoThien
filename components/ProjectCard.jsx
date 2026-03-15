export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <ul className="chip-list" aria-label={`${project.title} tech stack`}>
        {project.stack.map((item) => (
          <li key={item} className="chip">
            {item}
          </li>
        ))}
      </ul>
      <div className="project-links">
        <a href={project.repo} target="_blank" rel="noreferrer">
          Source
        </a>
        <a href={project.live} target="_blank" rel="noreferrer">
          Live
        </a>
      </div>
    </article>
  );
}
