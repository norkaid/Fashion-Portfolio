"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Plate from "@/components/Plate";
import { Curtain, MaskLines, Reveal } from "@/components/Reveal";
import { DotWaves } from "@/components/Motifs";
import Aurora from "@/components/Aurora";
import { projects, type Project } from "@/content/site";

const silk = [0.22, 1, 0.36, 1] as const;

// Asymmetric editorial layout, one entry per project in order
const layout = [
  { col: "md:col-span-7", aspect: "aspect-[4/5]", shift: "", speed: 40 },
  { col: "md:col-span-4 md:col-start-9", aspect: "aspect-[3/4]", shift: "md:mt-56", speed: 110 },
  { col: "md:col-span-5 md:col-start-2", aspect: "aspect-[3/4]", shift: "md:-mt-10", speed: 70 },
  { col: "md:col-span-5 md:col-start-8", aspect: "aspect-[4/5]", shift: "md:mt-40", speed: 20 },
  { col: "md:col-span-4", aspect: "aspect-[2/3]", shift: "md:mt-10", speed: 90 },
  { col: "md:col-span-7 md:col-start-6", aspect: "aspect-[5/4]", shift: "md:mt-48", speed: 30 },
  { col: "md:col-span-6 md:col-start-1", aspect: "aspect-[4/5]", shift: "md:mt-8", speed: 60 },
  { col: "md:col-span-5 md:col-start-8", aspect: "aspect-[3/4]", shift: "md:mt-52", speed: 100 },
];

function Card({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const L = layout[i % layout.length];
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [L.speed * 0.5, -L.speed * 0.5]);

  return (
    <motion.div ref={ref} style={{ y }} className={`col-span-12 ${L.col} ${L.shift}`}>
      <Link
        href={`/work/${p.slug}`}
        data-cursor="View"
        className="group block"
        aria-label={`${p.title}, ${p.category}, ${p.year}. View project.`}
      >
        <div className="relative">
          {/* tone halo so the image melts into the page */}
          <div
            aria-hidden
            className="absolute -inset-10 -z-0 rounded-[50%] opacity-60 blur-3xl transition-all duration-1000 group-hover:-inset-14 group-hover:opacity-95"
            style={{ background: p.tone }}
          />
          <Curtain className="relative">
            <div className="relative overflow-hidden">
              <div className="transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.06]">
                <Plate
                  img={p.cover}
                  className={`${L.aspect} w-full`}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  wash={`${p.tone}1f`}
                />
              </div>
              {/* hover veil + info */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum/75 via-plum/0 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-6 items-end justify-between p-6 opacity-0 transition-all duration-700 ease-silk group-hover:translate-y-0 group-hover:opacity-100">
                <p className="max-w-xs text-sm leading-relaxed text-ivory/95">{p.summary}</p>
              </div>
              <span className="absolute left-5 top-5 font-serif text-sm italic text-ivory mix-blend-difference">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </Curtain>
        </div>

        <div className="relative mt-6 flex items-start justify-between gap-6">
          <div>
            <h3 className="font-serif text-4xl font-light leading-none text-plum md:text-5xl">
              <span className="inline-block transition-transform duration-700 ease-silk group-hover:translate-x-2">
                {p.title}
              </span>
            </h3>
            <p className="mt-2 overflow-hidden font-serif text-lg italic" style={{ color: p.tone }}>
              <span className="inline-block translate-y-0 transition-transform duration-700 ease-silk md:translate-y-full md:group-hover:translate-y-0">
                {p.subtitle}
              </span>
            </p>
          </div>
          <div className="shrink-0 pt-2 text-right">
            <p className="eyebrow text-hibiscus">{p.year}</p>
            <p className="mt-2 max-w-[11rem] text-[0.7rem] uppercase leading-relaxed tracking-[0.14em] text-plum/60">
              {p.category}
            </p>
          </div>
        </div>
        <div className="mt-4 h-[2px] origin-left scale-x-0 transition-transform duration-1000 ease-silk group-hover:scale-x-100" style={{ background: `linear-gradient(90deg, ${p.tone}, #C9A04E)` }} />
      </Link>
    </motion.div>
  );
}

export default function Works() {
  return (
    <section id="work" className="relative overflow-hidden bg-[#FFF7EE] py-28 md:py-40" aria-labelledby="work-title">
      <Aurora colors={["#F2C14E", "#8FD3C9", "#E89AAE", "#B9A2E0", "#EE8A6B"]} opacity={0.22} />
      <div className="relative mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="mb-20 grid grid-cols-12 items-end gap-6 md:mb-32">
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <p className="eyebrow mb-8 flex items-center gap-4 text-hibiscus">
                <span className="h-px w-10 bg-gradient-to-r from-hibiscus to-marigold" /> Portfolio: selected works
              </p>
            </Reveal>
            <MaskLines
              as="h2"
              className="font-serif text-6xl font-light leading-[0.9] text-plum md:text-[8.5rem]"
              lines={[
                "Selected",
                <span key="w" className="iridescent pl-[12vw] pr-4 italic md:pl-[8vw]">
                  Works
                </span>,
              ]}
            />
            <span id="work-title" className="sr-only">
              Selected works
            </span>
          </div>
          <Reveal delay={0.2} className="col-span-12 md:col-span-4">
            <p className="text-sm leading-relaxed text-plum/70">
              Couture, eveningwear, ready-to-wear and research, from croquis to concept. The photographs here are
              temporary references for mood; the descriptions are of my own designs.
            </p>
            <DotWaves className="mt-6 h-10 w-56" rows={3} />
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-x-8 gap-y-24 md:gap-x-12 md:gap-y-28">
          {projects.map((p, i) => (
            <Card key={p.slug} p={p} i={i} />
          ))}
        </div>
      </div>
      <motion.div
        aria-hidden
        className="relative mx-auto mt-32 h-px max-w-[1500px] bg-gradient-to-r from-transparent via-hibiscus/60 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: silk }}
      />
    </section>
  );
}
