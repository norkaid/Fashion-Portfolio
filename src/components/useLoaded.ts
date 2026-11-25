"use client";

import { useEffect, useState } from "react";

/** True once the intro loader has lifted, so hero motion starts in view. */
export function useLoaded() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (document.documentElement.dataset.loaded === "true") setLoaded(true);
    const on = () => setLoaded(true);
    window.addEventListener("dno:loaded", on);
    return () => window.removeEventListener("dno:loaded", on);
  }, []);
  return loaded;
}
