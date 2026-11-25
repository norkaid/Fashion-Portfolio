"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Plate from "@/components/Plate";
import { Curtain, MaskLines, Reveal } from "@/components/Reveal";
import { DotOrbit, Weave, DotWaves } from "@/components/Motifs";
import Aurora, { KenteBand } from "@/components/Aurora";
import type { Project } from "@/content/site";

const silk = [0.22, 1, 0.36, 1] as const;

function Cover({ p, index }: { p: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const ty = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[560px] overflow-hidden" style={{ background: p.tone }}>
      <motion.div className="absolute inset-0" style={{ scale, y }}>
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: silk }}
        >
          <Plate img={p.cover} priority className="h-full w-full" wash={`${p.tone}26`} note={false} />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#FFF7EE] via-[#FFF7EE]/10 to-plum/20" />
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 15% 100%, ${p.tone}cc 0%, transparent 55%), radial-gradient(ellipse at 90% 10%, ${p.palette[1]?.hex ?? p.tone}66 0%, transparent 50%)` }}
      />

      <motion.div
        className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col justify-end px-5 pb-16 md:px-10 md:pb-20"
        style={{ y: ty, opacity: fade }}
      >
        <Link
          href="/#work"
          className="eyebrow link-underline mb-auto mt-28 self-start pb-1 text-ivory mix-blend-difference"
        >
          ← All works
        </Link>
        <p className="eyebrow mb-6 text-plum">
          {String(index + 1).padStart(2, "0")} · {p.category}
        </p>
        <h1 className="overflow-hidden font-serif text-[18vw] font-light leading-[0.85] text-plum md:text-[11vw]">
          <motion.span
            className="block"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.4, delay: 0.4, ease: silk }}
          >
            {p.title}
          </motion.span>
        </h1>
        <motion.div
          className="mt-6 flex flex-wrap items-end justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9, ease: silk }}
        >
          <p className="font-serif text-2xl italic text-plum/85 md:text-3xl">{p.subtitle}</p>
          <dl className="flex gap-10 text-sm text-plum">
            <div>
              <dt className="eyebrow text-hibiscus/80">Year</dt>
              <dd className="mt-1">{p.year}</dd>
            </div>
            <div>
              <dt className="eyebrow text-hibiscus/80">Designer</dt>
              <dd className="mt-1">Donna Norkai Omaboe</dd>
            </div>
          </dl>
        </motion.div>
      </motion.div>
      {p.cover.temp && (
        <p className="absolute bottom-4 right-5 z-10 text-[0.55rem] uppercase tracking-[0.2em] text-plum/70 md:right-10">
          Temporary editorial image · not my design
        </p>
      )}
    </section>
  );
}

export default function ProjectView({ project: p, index, next }: { project: Project; index: number; next: Project }) {
  const board = [p.cover, ...p.gallery];

  return (
    <main id="main" className="bg-[#FFF7EE]">
      <Cover p={p} index={index} />

      {/* Introduction */}
      <section className="mx-auto grid max-w-[1500px] grid-cols-12 gap-y-12 px-5 py-28 md:px-10 md:py-40">
        <div className="col-span-12 md:col-span-7">
          <Reveal>
            <p className="eyebrow mb-8 flex items-center gap-4" style={{ color: p.tone }}>
              <span className="h-px w-10" style={{ background: p.tone }} /> The concept
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="font-serif text-3xl font-light leading-[1.25] text-plum md:text-5xl">{p.summary}</p>
          </Reveal>
        </div>
        <div className="col-span-12 space-y-6 text-[1.02rem] leading-[1.85] text-plum/75 md:col-span-4 md:col-start-9 md:pt-24">
          {p.concept.map((c, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <p>{c}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Inspiration & moodboard */}
      <section className="relative overflow-hidden py-24 md:py-36" style={{ background: `linear-gradient(160deg, ${p.tone}40 0%, #FFF7EE 55%, ${p.palette[p.palette.length - 1]?.hex ?? p.tone}55 100%)` }}>
        <Aurora colors={p.palette.map((c) => c.hex)} opacity={0.45} />
        <DotOrbit className="pointer-events-none absolute -right-24 -top-24 h-[30rem] w-[30rem] opacity-50" rings={6} color={p.tone} />
        <div className="relative mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
            <MaskLines
              className="font-serif text-5xl font-light leading-none text-plum md:text-7xl"
              lines={["Inspiration", <span key="m" className="iridescent pr-3 italic">& moodboard</span>]}
            />
            <ul className="flex max-w-md flex-wrap gap-3">
              {p.inspiration.map((w, i) => (
                <motion.li
                  key={w}
                  className="rounded-full border bg-ivory/60 px-4 py-2 font-serif text-lg italic text-plum backdrop-blur-sm"
                  style={{ borderColor: p.palette[i % p.palette.length].hex }}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.9, ease: silk }}
                >
                  {w}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* layered collage */}
          <div className="relative grid grid-cols-12 gap-4 md:h-[44rem] md:gap-0">
            {board.slice(0, 3).map((img, i) => {
              const pos = [
                "md:absolute md:left-0 md:top-0 md:w-[42%]",
                "md:absolute md:left-[36%] md:top-[18%] md:w-[30%] md:z-10",
                "md:absolute md:right-0 md:top-[4%] md:w-[30%]",
              ][i];
              const aspect = ["aspect-[4/5]", "aspect-[3/4]", "aspect-[3/4]"][i];
              return (
                <div key={img.src + i} className={`col-span-12 sm:col-span-4 ${pos}`}>
                  <Curtain delay={i * 0.15} from={i === 1 ? "left" : "bottom"}>
                    <Plate
                      img={img}
                      className={`${aspect} w-full ${i === 1 ? "shadow-[0_40px_80px_-30px_rgba(42,29,22,0.45)]" : ""}`}
                      sizes="(min-width: 768px) 40vw, 100vw"
                      wash={`${p.tone}1f`}
                    />
                  </Curtain>
                </div>
              );
            })}
            {/* palette chips pinned to the board */}
            <div className="col-span-12 flex gap-2 md:absolute md:bottom-0 md:right-[6%] md:z-20">
              {p.palette.map((c, i) => (
                <motion.span
                  key={c.hex}
                  className="block h-20 w-10 shadow-md md:h-28 md:w-14"
                  style={{ background: c.hex }}
                  initial={{ y: 30, opacity: 0, rotate: 0 }}
                  whileInView={{ y: 0, opacity: 1, rotate: -4 + i * 2 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 1, ease: silk }}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Colour */}
      <section className="mx-auto max-w-[1500px] px-5 py-28 md:px-10 md:py-36">
        <Reveal>
          <p className="eyebrow mb-10 flex items-center gap-4" style={{ color: p.tone }}>
            <span className="h-px w-10" style={{ background: p.tone }} /> Colour exploration
          </p>
        </Reveal>
        <div className="flex h-[22rem] flex-col gap-1 md:h-[26rem] md:flex-row">
          {p.palette.map((c, i) => (
            <motion.div
              key={c.hex}
              className="group relative flex-1 overflow-hidden transition-[flex-grow] duration-1000 ease-silk md:hover:flex-[2.2]"
              style={{ background: c.hex }}
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, delay: i * 0.1, ease: silk }}
            >
              <div className="absolute bottom-4 left-4 mix-blend-difference">
                <p className="font-serif text-xl italic text-ivory">{c.name}</p>
                <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-wider text-ivory/80">{c.hex}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Materials + development */}
      <section className="relative overflow-hidden bg-ink py-28 text-ivory md:py-40">
        <div className="absolute inset-x-0 top-0"><KenteBand className="h-2" /></div>
        <Aurora colors={[p.tone, "#7A5BA6", "#2F9C9A"]} opacity={0.3} />
        <DotWaves className="pointer-events-none absolute bottom-0 left-0 h-40 w-full opacity-25" colors={[p.tone, "#F2C14E", "#E89AAE"]} rows={3} />
        <Weave className="pointer-events-none absolute right-10 top-10 h-40 w-40 opacity-25" color="#C9A04E" />
        <div className="relative mx-auto grid max-w-[1500px] grid-cols-12 gap-y-20 px-5 md:px-10">
          <div className="col-span-12 md:col-span-5">
            <MaskLines
              className="font-serif text-5xl font-light leading-none text-ivory md:text-6xl"
              lines={["Fabric", <span key="m" className="iridescent-light pr-3 italic">& material</span>]}
            />
            <ol className="mt-12 space-y-0">
              {p.materials.map((m, i) => (
                <Reveal key={m.name} delay={i * 0.06}>
                  <li className="flex gap-6 border-t border-ivory/15 py-5">
                    <span className="font-serif text-sm italic text-saffron">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-serif text-xl text-ivory">{m.name}</p>
                      <p className="mt-1 text-sm text-ivory/65">{m.note}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <MaskLines
              className="font-serif text-5xl font-light leading-none text-ivory md:text-6xl"
              lines={["Design", <span key="d" className="iridescent-light pr-3 italic">development</span>]}
            />
            <div className="relative mt-12 space-y-10 border-l border-saffron/50 pl-8">
              {p.development.map((d, i) => (
                <Reveal key={d.step} delay={i * 0.1}>
                  <div className="relative">
                    <span className="absolute -left-[2.4rem] top-2 h-2.5 w-2.5 rotate-45 bg-saffron" />
                    <p className="eyebrow text-rose">{d.step}</p>
                    <p className="mt-3 font-serif text-2xl font-light leading-snug text-ivory">{d.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sketchbook (only when sketches are supplied) */}
      {p.sketches && p.sketches.length > 0 && (
        <section className="mx-auto max-w-[1500px] px-5 py-28 md:px-10">
          <MaskLines
            className="mb-14 font-serif text-5xl font-light leading-none text-plum md:text-6xl"
            lines={["Sketch", <span key="s" className="iridescent pr-3 italic">book</span>]}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {p.sketches.map((s, i) => (
              <Curtain key={s.src} delay={i * 0.1}>
                <div className="bg-ivory p-4 shadow-[0_30px_60px_-30px_rgba(42,29,22,0.3)]">
                  <Plate img={s} className="aspect-[3/4] w-full" wash="transparent" sizes="33vw" />
                </div>
              </Curtain>
            ))}
          </div>
        </section>
      )}

      {/* Full-screen gallery strip */}
      <section className="py-24 md:py-32">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 md:gap-10 md:px-10">
          {board.map((img, i) => (
            <div key={img.src + i} className="w-[80vw] shrink-0 snap-center md:w-[46vw]" data-cursor="Drag">
              <Plate img={img} className="aspect-[4/5] w-full" sizes="(min-width: 768px) 46vw, 80vw" wash={`${p.tone}1a`} />
            </div>
          ))}
        </div>
      </section>

      {/* Next project */}
      <section className="relative overflow-hidden border-t border-rose/30">
        <Link href={`/work/${next.slug}`} className="group relative block py-28 md:py-40" data-cursor="Next">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-1000 group-hover:opacity-100">
            <Plate img={next.cover} className="h-full w-full" feather="radial" note={false} wash={`${next.tone}40`} />
          </div>
          <div className="relative mx-auto max-w-[1500px] px-5 text-center md:px-10">
            <p className="eyebrow text-hibiscus">Next project</p>
            <p className="mt-6 font-serif text-6xl font-light text-plum transition-transform duration-1000 ease-silk group-hover:scale-[1.03] md:text-[9rem]">
              {next.title}
            </p>
            <p className="mt-3 font-serif text-xl italic" style={{ color: next.tone }}>{next.subtitle}</p>
          </div>
        </Link>
      </section>
    </main>
  );
}
