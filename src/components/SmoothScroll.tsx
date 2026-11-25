"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Fluid, inertial scrolling. Disabled when the visitor prefers reduced motion. */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.__lenis = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // Reset to top (or to a hash) on route change
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => scrollToTarget(el as HTMLElement), 120);
        return;
      }
    }
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function scrollToTarget(el: HTMLElement | number) {
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { duration: 1.6, offset: 0 });
  } else if (typeof el === "number") {
    window.scrollTo({ top: el, behavior: "smooth" });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
