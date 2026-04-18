import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/portfolio";

export const metadata = {
  title: "Projects | Thien Portfolio",
  description: "Selected projects and technical case studies.",
};

export default function ProjectsPage() {
  return (
    <main className="container page-content">
      <section className="section-header reveal">
        <p className="eyebrow">Projects</p>
        <h1>Featured Work</h1>
      </section>

      <section className="project-showcase-list">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </section>
    </main>
  );
}
