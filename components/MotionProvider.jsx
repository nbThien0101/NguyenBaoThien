"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

export default function MotionProvider({ children }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const variants = useMemo(
    () => ({
      initial: prefersReducedMotion
        ? { opacity: 1 }
        : { opacity: 0, y: 18, scale: 0.995 },
      animate: prefersReducedMotion
        ? { opacity: 1 }
        : { opacity: 1, y: 0, scale: 1 },
      exit: prefersReducedMotion
        ? { opacity: 1 }
        : { opacity: 0, y: -12, scale: 1.004 },
    }),
    [prefersReducedMotion]
  );

  const transition = useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0 }
        : {
            opacity: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
            y: { type: "spring", stiffness: 280, damping: 28, mass: 0.8 },
            scale: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
          },
    [prefersReducedMotion]
  );

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        style={prefersReducedMotion ? undefined : { transformOrigin: "50% 38%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
