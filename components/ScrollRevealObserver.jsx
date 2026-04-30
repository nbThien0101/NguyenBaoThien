"use client";

import { animate, inView, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

function parseTimeMs(computedStyleValue) {
  if (!computedStyleValue) return 0;
  const value = computedStyleValue.trim();
  if (!value) return 0;

  if (value.endsWith("ms")) {
    const n = Number.parseFloat(value.slice(0, -2));
    return Number.isFinite(n) ? n : 0;
  }

  if (value.endsWith("s")) {
    const n = Number.parseFloat(value.slice(0, -1));
    return Number.isFinite(n) ? n * 1000 : 0;
  }

  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

function getRevealEffectName(element) {
  const byData = element.dataset.reveal?.trim().toLowerCase();
  if (byData) return byData;

  if (element.classList.contains("reveal-left")) return "left";
  if (element.classList.contains("reveal-right")) return "right";
  if (element.classList.contains("reveal-down")) return "down";
  if (element.classList.contains("reveal-zoom")) return "zoom";
  if (element.classList.contains("reveal-fade")) return "fade";
  if (element.classList.contains("reveal-pop")) return "pop";
  if (element.classList.contains("reveal-swing")) return "swing";
  if (element.classList.contains("reveal-up")) return "up";

  return "up";
}

function getRevealStaggerMs(element) {
  const byData = parseTimeMs(element.dataset.revealStagger ?? "");
  if (byData > 0) return byData;
  if (element.classList.contains("reveal-stagger")) return 95;
  return 0;
}

function getRevealKeyframes(effectName) {
  switch (effectName) {
    case "left":
      return { opacity: [0, 1], x: [-42, 0] };
    case "right":
      return { opacity: [0, 1], x: [42, 0] };
    case "down":
      return { opacity: [0, 1], y: [-18, 0] };
    case "zoom":
      return {
        opacity: [0, 1],
        scale: [0.94, 1],
      };
    case "pop":
      return {
        opacity: [0, 1],
        y: [14, 0],
        scale: [0.92, 1.02, 1],
      };
    case "swing":
      return {
        opacity: [0, 1],
        y: [8, 0],
        rotate: [-3, 0],
      };
    case "fade":
      return { opacity: [0, 1] };
    case "up":
    default:
      return { opacity: [0, 1], y: [12, 0] };
  }
}

function getStaggerChildren(element) {
  return Array.from(element.children).filter((child) => {
    if (!(child instanceof HTMLElement)) return false;
    if (child.classList.contains("skip-reveal-stagger")) return false;
    return true;
  });
}

function animateStaggerChildren(element, staggerMs, baseDelayMs, durationMs) {
  const children = getStaggerChildren(element);
  if (children.length === 0) return [];

  const childDuration = Math.max(0.24, (durationMs * 0.88) / 1000);
  return children.map((child, index) => {
    const controls = animate(
      child,
      { opacity: [0, 1], y: [10, 0] },
      {
        duration: childDuration,
        ease: [0.22, 1, 0.36, 1],
        delay: (baseDelayMs + staggerMs * index) / 1000,
      }
    );

    return controls?.finished ?? controls;
  });
}

export default function ScrollRevealObserver() {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    const cleanups = [];
    const tracked = new Set();

    const bindReveal = (el) => {
      if (!(el instanceof HTMLElement)) return;
      if (!el.classList.contains("reveal")) return;
      if (el.dataset.revealBound === "true") return;

      el.dataset.revealBound = "true";
      tracked.add(el);

      if (prefersReducedMotion) {
        el.dataset.revealed = "true";
        el.classList.add("is-visible");
        return;
      }

      const delayMs = parseTimeMs(
        getComputedStyle(el).getPropertyValue("--reveal-delay")
      );
      const durationMs =
        parseTimeMs(getComputedStyle(el).getPropertyValue("--reveal-duration")) ||
        450;
      const staggerMs = getRevealStaggerMs(el);
      const keyframes =
        staggerMs > 0
          ? { opacity: [0, 1], filter: ["blur(1px)", "blur(0px)"] }
          : getRevealKeyframes(getRevealEffectName(el));

      const stop = inView(
        el,
        () => {
          if (el.dataset.revealed === "true") return;
          el.dataset.revealed = "true";

          const controls = animate(el, keyframes, {
            duration: durationMs / 1000,
            ease: "easeOut",
            delay: delayMs / 1000,
          });

          const staggerPromises =
            staggerMs > 0
              ? animateStaggerChildren(el, staggerMs, delayMs, durationMs)
              : [];

          const finished = controls?.finished ?? controls;
          Promise.allSettled([Promise.resolve(finished), ...staggerPromises])
            .catch(() => undefined)
            .finally(() => {
              el.classList.add("is-visible");
            });
        },
        { amount: 0.2, margin: "0px 0px -10% 0px", once: true }
      );

      cleanups.push(() => {
        try {
          stop?.();
        } catch {
          // ignore
        }
      });
    };

    const bindAll = (root) => {
      if (!(root instanceof Element || root instanceof Document)) return;
      const elements = root.querySelectorAll(".reveal");
      for (const item of elements) bindReveal(item);
      if (root instanceof Element && root.matches(".reveal")) bindReveal(root);
    };

    bindAll(document);

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          bindAll(node);
        }
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      for (const cleanup of cleanups) {
        cleanup();
      }
      for (const el of tracked) {
        delete el.dataset.revealBound;
      }
    };
  }, [prefersReducedMotion, pathname]);

  return null;
}
