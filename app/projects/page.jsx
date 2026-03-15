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
        <h1>Selected work</h1>
      </section>

      <section className="projects-grid reveal delay-1">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </section>
    </main>
  );
}
