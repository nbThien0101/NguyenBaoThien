"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

export default function StoryCarousel({ images }) {
  const [current, setCurrent] = useState(0);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const dragStartX = useRef(null);
  const isDragging = useRef(false);

  if (!images || images.length === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const single = images.length === 1;
  const isPreviewOpen = previewIndex !== null;

  useEffect(() => {
    setMounted(true);
  }, []);

  const openPreview = (index) => {
    if (isDragging.current) return;
    setPreviewIndex(index);
  };

  const closePreview = () => setPreviewIndex(null);

  const prevPreview = () => {
    if (single) return;
    setPreviewIndex((idx) => (idx - 1 + images.length) % images.length);
  };

  const nextPreview = () => {
    if (single) return;
    setPreviewIndex((idx) => (idx + 1) % images.length);
  };

  useEffect(() => {
    if (!isPreviewOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closePreview();
      if (e.key === "ArrowLeft") prevPreview();
      if (e.key === "ArrowRight") nextPreview();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPreviewOpen, single]);

  // Touch swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  // Mouse drag
  const handleMouseDown = (e) => { dragStartX.current = e.clientX; isDragging.current = false; };
  const handleMouseMove = (e) => { if (dragStartX.current !== null && Math.abs(e.clientX - dragStartX.current) > 5) isDragging.current = true; };
  const handleMouseUp = (e) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    if (isDragging.current && Math.abs(dx) > 40) dx < 0 ? next() : prev();
    dragStartX.current = null;
    isDragging.current = false;
  };

  return (
    <div className="carousel-wrap">
      {/* Image frame — overflow:hidden stays, slides live here */}
      <div
        className="story-image-frame"
        onTouchStart={!single ? handleTouchStart : undefined}
        onTouchEnd={!single ? handleTouchEnd : undefined}
        onMouseDown={!single ? handleMouseDown : undefined}
        onMouseMove={!single ? handleMouseMove : undefined}
        onMouseUp={!single ? handleMouseUp : undefined}
        onMouseLeave={!single ? handleMouseUp : undefined}
        style={!single ? { cursor: "grab", userSelect: "none" } : undefined}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className={`carousel-slide ${i === current ? "carousel-slide--active" : ""}`}
          >
            <button
              type="button"
              className="story-image-hitbox"
              onClick={() => openPreview(i)}
              aria-label={`View full image: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 700px) 90vw, 42vw"
                className="story-img"
                loading={i === current ? "eager" : "lazy"}
                quality={60}
                draggable={false}
              />
            </button>
          </div>
        ))}

        {/* Counter badge — inside frame (small, corner) */}
        {!single && (
          <span className="carousel-counter">
            {current + 1} / {images.length}
          </span>
        )}
      </div>

      {/* ← → arrows — OUTSIDE frame so overflow:hidden doesn't clip them */}
      {!single && (
        <>
          <button className="carousel-btn carousel-btn--prev" onClick={prev} aria-label="Previous photo">‹</button>
          <button className="carousel-btn carousel-btn--next" onClick={next} aria-label="Next photo">›</button>
        </>
      )}

      {/* Dot indicators */}
      {!single && (
        <div className="carousel-dots" role="tablist">
          {images.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Photo ${i + 1}`}
              className={`carousel-dot ${i === current ? "carousel-dot--active" : ""}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      )}

      <div className="story-image-glow" />

      {mounted && isPreviewOpen && createPortal(
        <div className="image-modal" role="dialog" aria-modal="true" aria-label="Image preview" onClick={closePreview}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="image-modal-close"
              onClick={closePreview}
              aria-label="Close image preview"
            >
              ×
            </button>

            {!single && (
              <>
                <button
                  type="button"
                  className="image-modal-nav image-modal-nav--prev"
                  onClick={prevPreview}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="image-modal-nav image-modal-nav--next"
                  onClick={nextPreview}
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}

            <div className="image-modal-frame">
              <Image
                src={images[previewIndex].src}
                alt={images[previewIndex].alt}
                fill
                sizes="95vw"
                className="image-modal-img"
                loading="eager"
                quality={70}
              />
            </div>

            {!single && (
              <p className="image-modal-counter">
                {previewIndex + 1} / {images.length}
              </p>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
