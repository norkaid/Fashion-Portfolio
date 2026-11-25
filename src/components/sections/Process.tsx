"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Plate from "@/components/Plate";
import { DotOrbit, Weave } from "@/components/Motifs";
import { Curtain } from "@/components/Reveal";
import { process } from "@/content/site";

const silk = [0.22, 1, 0.36, 1] as const;
type Chapter = (typeof process)[number];

function Tape({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`absolute h-6 w-20 bg-champagne/70 shadow-sm ${className}`} />;
}

function Page({ c, i }: { c: Chapter; i: number }) {
  const tilt = [-1.2, 0.8, -0.6, 1.1, -0.9, 0.6, -0.4][i % 7];
  return (
    <article
      className="relative flex h-full w-[86vw] shrink-0 snap-center flex-col justify-center sm:w-[64vw] md:w-[52vw] lg:w-[44vw]"
      aria-label={`${c.n}. ${c.title}`}
    >
      <div className="relative">
        <span className="pointer-events-none absolute -left-2 -top-24 select-none font-serif text-[9rem] font-light italic leading-none text-champagne md:-top-32 md:text-[12rem]">
          {c.n}
        </span>

        <div className="relative" style={{ transform: `rotate(${tilt}deg)` }}>
          {"img" in c && c.img ? (
            <div className="relative">
              <Curtain from="left">
                <div className="bg-ivory p-3 shadow-[0_30px_60px_-30px_rgba(42,29,22,0.35)] md:p-4">
                  <Plate img={c.img} className="aspect-[4/3] w-full" sizes="(min-width: 768px) 44vw, 86vw" />
                </div>
              </Curtain>
              <Tape className="-top-3 left-6 rotate-[-6deg]" />
              <Tape className="-top-3 right-8 rotate-[5deg]" />
            </div>
          ) : (
            <div className="relative grid aspect-[4/3] w-full place-items-center bg-ivory p-6 shadow-[0_30px_60px_-30px_rgba(42,29,22,0.35)]">
              <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-[-3deg]" />
              <div className="flex flex-wrap items-end justify-center gap-2">
                {"swatches" in c &&
                  c.swatches?.map((s, j) => (
                    <motion.div
                      key={s}
                      className="flex flex-col items-center gap-2"
                      initial={{ y: 40, opacity: 0, rotate: -8 + j * 3 }}
                      whileInView={{ y: 0, opacity: 1, rotate: -6 + j * 2 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: j * 0.09, ease: silk }}
                    >
                      <span
                        className="block h-24 w-9 shadow-md md:h-28 md:w-11"
                        style={{ background: s }}
                      />
                      <span className="font-mono text-[0.55rem] uppercase tracking-wider text-clay">{s}</span>
                    </motion.div>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative mt-10 max-w-md">
          <h3 className="font-serif text-3xl font-light text-espresso md:text-4xl">{c.title}</h3>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-earth/85">{c.text}</p>
        </div>
      </div>
    </article>
  );
}

export default function Process() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [desktop, setDesktop] = useState(false);

  useLayoutEffect(() => {
    const measure = () => {
      const isDesk = window.matchMedia("(min-width: 768px)").matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setDesktop(isDesk && !reduce);
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(xRaw, { stiffness: 90, damping: 24, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      ref={section}
      className="relative bg-cream"
      style={{ height: desktop ? `calc(100vh + ${distance}px)` : "auto" }}
      aria-labelledby="process-title"
    >
      <div className={`${desktop ? "sticky top-0 h-screen" : "py-24"} overflow-hidden`}>
        {/* paper atmosphere */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(247,242,234,0.9),transparent_60%),radial-gradient(ellipse_at_85%_80%,rgba(184,165,146,0.25),transparent_55%)]" />
        <Weave className="pointer-events-none absolute bottom-10 right-10 h-48 w-48 opacity-[0.08]" />

        <motion.div
          ref={track}
          style={desktop ? { x } : undefined}
          className={`relative flex h-full items-center gap-[8vw] px-5 md:px-[8vw] ${
            desktop ? "" : "no-scrollbar snap-x snap-mandatory overflow-x-auto pb-10 pt-32"
          }`}
        >
          {/* intro page */}
          <div className="relative flex w-[86vw] shrink-0 snap-start flex-col justify-center sm:w-[60vw] md:w-[40vw]">
            <DotOrbit className="absolute -left-20 -top-24 h-80 w-80 opacity-40" rings={5} />
            <p className="eyebrow relative mb-8 flex items-center gap-4 text-clay">
              <span className="h-px w-10 bg-gold" /> Creative process
            </p>
            <h2
              id="process-title"
              className="relative font-serif text-6xl font-light leading-[0.9] text-espresso md:text-8xl"
            >
              The
              <br />
              <span className="italic text-earth">Journal</span>
            </h2>
            <p className="relative mt-8 max-w-sm text-[0.95rem] leading-relaxed text-earth/85">
              Seven stages from first collected fragment to finished concept. Turn the pages: scroll on, or
              swipe on mobile.
            </p>
            <p className="relative mt-10 font-serif text-lg italic text-clay">→ turn the page</p>
          </div>

          {process.map((c, i) => (
            <Page key={c.n} c={c} i={i} />
          ))}

          <div className="w-[10vw] shrink-0" aria-hidden />
        </motion.div>

        {desktop && (
          <div className="absolute inset-x-[8vw] bottom-10 flex items-center gap-6">
            <span className="eyebrow text-clay">01</span>
            <div className="relative h-px flex-1 bg-taupe/30">
              <motion.div className="absolute inset-y-0 left-0 bg-espresso" style={{ width: bar }} />
            </div>
            <span className="eyebrow text-clay">07</span>
          </div>
        )}
      </div>
    </section>
  );
}
