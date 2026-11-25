"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { scrollToTarget } from "./SmoothScroll";

const links = [
  { label: "Home", hash: "top" },
  { label: "About", hash: "about" },
  { label: "Portfolio", hash: "work" },
  { label: "Creative Process", hash: "process" },
  { label: "Contact", hash: "contact" },
];

const silk = [0.22, 1, 0.36, 1] as const;

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 240 && !open);
    setSolid(v > 60);
  });

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (e: React.MouseEvent, hash: string) => {
    setOpen(false);
    if (pathname !== "/") return; // let Link navigate to /#hash
    e.preventDefault();
    const el = hash === "top" ? 0 : document.getElementById(hash);
    if (el !== null) {
      scrollToTarget(el as HTMLElement | number);
      history.replaceState(null, "", hash === "top" ? "/" : `/#${hash}`);
    } else {
      router.push(`/#${hash}`);
    }
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[70]"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.7, ease: silk }}
      >
        <div
          className={`transition-[background-color,backdrop-filter,border-color] duration-700 ${
            solid && !open
              ? "border-b border-taupe/20 bg-ivory/70 backdrop-blur-md"
              : "border-b border-transparent"
          }`}
        >
          <nav
            className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 md:px-10"
            aria-label="Primary"
          >
            <Link
              href="/"
              onClick={(e) => go(e, "top")}
              className="group flex items-baseline gap-3 text-espresso"
              aria-label="Donna Norkai Omaboe, home"
            >
              <span className="font-serif text-xl font-light tracking-[0.12em]">D N O</span>
              <span className="hidden text-[0.62rem] uppercase tracking-luxe text-clay transition-colors group-hover:text-gold sm:inline">
                Donna Norkai Omaboe
              </span>
            </Link>

            <ul className="hidden items-center gap-9 lg:flex">
              {links.map((l) => (
                <li key={l.hash}>
                  <Link
                    href={l.hash === "top" ? "/" : `/#${l.hash}`}
                    onClick={(e) => go(e, l.hash)}
                    className="link-underline pb-1 text-[0.7rem] uppercase tracking-wide2 text-espresso/80 transition-colors hover:text-espresso"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="flex items-center gap-3 text-[0.7rem] uppercase tracking-wide2 text-espresso lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span className="relative block h-3 w-6" aria-hidden>
                <span
                  className={`absolute left-0 h-px w-6 bg-espresso transition-all duration-500 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px bg-espresso transition-all duration-500 ${
                    open ? "top-1.5 w-6 -rotate-45" : "top-3 w-4"
                  }`}
                />
              </span>
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[65] flex flex-col justify-between bg-cream px-6 pb-10 pt-28 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: silk }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(184,149,90,0.18),transparent_60%)]" />
            <ul className="relative space-y-3">
              {links.map((l, i) => (
                <li key={l.hash} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.9, ease: silk }}
                  >
                    <Link
                      href={l.hash === "top" ? "/" : `/#${l.hash}`}
                      onClick={(e) => go(e, l.hash)}
                      className="flex items-baseline gap-4 font-serif text-[2.6rem] font-light leading-tight text-espresso"
                    >
                      <span className="font-sans text-[0.65rem] tracking-wide2 text-clay">
                        0{i + 1}
                      </span>
                      <span className={i % 2 ? "italic" : ""}>{l.label}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.p
              className="eyebrow relative text-clay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Atelier Norkai · Accra
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
