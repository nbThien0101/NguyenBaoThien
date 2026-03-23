"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function StoryCarousel({ images }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const dragStartX = useRef(null);
  const isDragging = useRef(false);

  if (!images || images.length === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const single = images.length === 1;

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
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 700px) 90vw, 42vw"
              className="story-img"
              draggable={false}
            />
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
    </div>
  );
}
