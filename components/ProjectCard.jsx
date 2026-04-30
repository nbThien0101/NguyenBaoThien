"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M14 4h6v6h-2V7.41l-8.29 8.3-1.42-1.42 8.3-8.29H14V4z"
        fill="currentColor"
      />
      <path
        d="M5 5h7v2H7v10h10v-5h2v7H5V5z"
        fill="currentColor"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.21-3.37-1.21-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.62.07-.62 1 .08 1.54 1.06 1.54 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.11-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.05.8-.23 1.66-.35 2.51-.35.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.43.21 2.48.1 2.74.64.72 1.03 1.63 1.03 2.75 0 3.95-2.35 4.81-4.59 5.07.36.32.68.95.68 1.93 0 1.39-.01 2.51-.01 2.85 0 .27.18.6.69.49A10.27 10.27 0 0 0 22 12.25C22 6.59 17.52 2 12 2z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ProjectCard({ project, index = 0 }) {
  const isReverse = index % 2 === 1;
  const cardClass = isReverse
    ? "project-showcase-card project-showcase-card--reverse"
    : "project-showcase-card";

  const revealClass = isReverse ? "reveal-right" : "reveal-left";
  const revealDelayClass = `delay-${Math.min(index + 1, 3)}`;
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const hasAnyLink = Boolean(project.live || project.repo);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isPreviewOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsPreviewOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPreviewOpen]);

  return (
    <>
      <article
        className={`${cardClass} reveal ${revealClass} ${revealDelayClass}`}
      >
        <div className="project-showcase-media">
          {project.image ? (
            <button
              type="button"
              className="project-showcase-image-button"
              onClick={() => setIsPreviewOpen(true)}
              aria-label={`View full image of ${project.title}`}
            >
              <Image
                src={project.image}
                alt={project.imageAlt ?? `${project.title} homepage screenshot`}
                fill
                sizes="(max-width: 900px) 100vw, 56vw"
                className="project-showcase-image"
                quality={70}
              />
              <span className="project-showcase-zoom-hint">View Full</span>
            </button>
          ) : (
            <div className="project-showcase-placeholder">
              <p>No homepage image yet</p>
            </div>
          )}
        </div>

        <div className="project-showcase-content">
          <p className="project-showcase-eyebrow">{project.featuredLabel ?? "Featured"}</p>
          <h2 className="project-showcase-title">{project.title}</h2>

          <p className="project-showcase-summary">{project.summary}</p>

          <ul className="project-showcase-stack" aria-label={`${project.title} tech stack`}>
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="project-showcase-links">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="project-icon-link"
                aria-label={`Open live demo of ${project.title}`}
                title="Live demo"
              >
                <ExternalLinkIcon />
              </a>
            )}

            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="project-icon-link"
                aria-label={`Open source code of ${project.title}`}
                title="Source code"
              >
                <GithubIcon />
              </a>
            )}

            {!hasAnyLink && (
              <span className="project-link-missing">Private project</span>
            )}
          </div>
        </div>
      </article>

      {mounted && isPreviewOpen && project.image && createPortal(
        <div
          className="image-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} image preview`}
          onClick={() => setIsPreviewOpen(false)}
        >
          <div className="image-modal-content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="image-modal-close"
              onClick={() => setIsPreviewOpen(false)}
              aria-label="Close image preview"
            >
              ×
            </button>

            <div className="image-modal-frame">
              <Image
                src={project.image}
                alt={project.imageAlt ?? `${project.title} homepage screenshot`}
                fill
                sizes="95vw"
                className="image-modal-img"
                loading="eager"
                quality={75}
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
