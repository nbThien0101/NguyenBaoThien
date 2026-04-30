"use client";

import { useEffect } from "react";

function isLowEndDevice() {
  if (typeof window === "undefined") return false;

  const connection = navigator.connection;
  const saveData = Boolean(connection?.saveData);
  const effectiveType = connection?.effectiveType ?? "";
  const slowNetwork = effectiveType.includes("2g");

  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = navigator.deviceMemory ?? 8;

  return saveData || slowNetwork || cores <= 4 || memory <= 4;
}

export default function PerformanceHints() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    const shouldReduce = isLowEndDevice();

    if (shouldReduce) {
      root.classList.add("perf-mode");
    } else {
      root.classList.remove("perf-mode");
    }
  }, []);

  return null;
}
