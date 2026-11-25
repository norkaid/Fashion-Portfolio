"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Plate from "@/components/Plate";
import { Reveal, MaskLines, Curtain } from "@/components/Reveal";
import { ArchLine, Weave, DotWaves } from "@/components/Motifs";
import Aurora from "@/components/Aurora";
import { about } from "@/content/site";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yPortrait = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const ySmall = useTransform(scrollYProgress, [0, 1], ["30%", "-40%"]);
  const yWord = useTransform(scrollYProgress, [0, 1], ["20%", "-30%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-[#FFF4E8] via-[#FBE4D8] to-[#FFF4E8] py-28 md:py-44"
      aria-labelledby="about-title"
    >
      <Aurora colors={["#F2C14E", "#E89AAE", "#8FD3C9", "#EE8A6B"]} opacity={0.35} />
      {/* oversized background word */}
      <motion.p
        aria-hidden
        style={{ y: yWord }}
        className="pointer-events-none absolute -right-[6vw] top-10 select-none font-serif text-[30vw] font-light italic leading-none text-hibiscus/10"
      >
        Norkai
      </motion.p>

      <div className="relative mx-auto grid max-w-[1500px] grid-cols-12 gap-y-16 px-5 md:px-10">
        {/* images */}
        <div className="relative col-span-12 md:col-span-5 md:col-start-1">
          <ArchLine className="absolute -left-4 -top-8 h-[74%] w-[90%] md:-left-8" color="#C2416B" />
          <motion.div style={{ y: yPortrait }} className="relative mx-auto w-[82%] md:w-full">
            <Curtain>
              <Plate
                img={about.portrait}
                className="arch aspect-[3/4.2] w-full"
                sizes="(min-width: 768px) 40vw, 82vw"
                feather="bottom"
                wash="rgba(242,193,78,0.12)"
              />
            </Curtain>
          </motion.div>
          <motion.div
            style={{ y: ySmall }}
            className="absolute -bottom-10 right-0 w-[38%] md:-right-16 md:w-[42%]"
          >
            <Curtain delay={0.3} from="left">
              <Plate
                img={{ src: "/images/temp/sheer.jpg", alt: "Temporary image: portrait in sheer black", temp: true, focus: "50% 25%" }}
                className="aspect-[3/4] w-full"
                sizes="20vw"
                grade="deep"
                note={false}
              />
            </Curtain>
          </motion.div>
        </div>

        {/* text */}
        <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-20">
          <Reveal>
            <p className="eyebrow mb-8 flex items-center gap-4 text-hibiscus">
              <span className="h-px w-10 bg-gradient-to-r from-hibiscus to-marigold" /> About the designer
            </p>
          </Reveal>
          <MaskLines
            className="font-serif text-5xl font-light leading-[0.95] text-plum md:text-7xl"
            lines={[
              "Sculpting",
              <span key="i" className="iridescent italic pr-2">
                identity
              </span>,
              "in cloth & light.",
            ]}
          />
          <h2 id="about-title" className="sr-only">
            About Donna Norkai Omaboe
          </h2>
          <Reveal delay={0.1} className="mt-10 space-y-6 text-[1.02rem] leading-[1.85] text-plum/80">
            <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:font-light first-letter:leading-[0.8] first-letter:text-hibiscus">
              {about.statement}
            </p>
            <p>{about.statement2}</p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {about.threads.map((t, i) => (
              <Reveal key={t.k} delay={0.08 * i}>
                <div className="border-t-2 pt-4" style={{ borderColor: ["#C2416B", "#E9A23B", "#156B55", "#7A5BA6"][i] }}>
                  <p className="font-serif text-2xl font-light italic text-plum">{t.k}</p>
                  <p className="mt-2 text-sm leading-relaxed text-plum/70">{t.v}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* brand card */}
          <Reveal delay={0.15}>
            <div className="relative mt-16 overflow-hidden bg-ink p-8 text-ivory shadow-[0_40px_80px_-40px_rgba(30,34,87,0.7)] md:p-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_90%_0%,rgba(194,65,107,0.45),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(47,156,154,0.35),transparent_55%)]" />
              <Weave className="absolute -right-6 -top-6 h-40 w-40 opacity-30" color="#C9A04E" />
              <DotWaves className="pointer-events-none absolute -bottom-6 left-0 h-16 w-full opacity-40" rows={2} />
              <p className="eyebrow relative text-saffron">The label</p>
              <p className="iridescent-light relative mt-3 font-serif text-5xl font-light tracking-[0.08em]">
                {about.brand.name}
              </p>
              <dl className="relative mt-6 grid gap-4 text-sm text-ivory/85 md:grid-cols-3">
                <div>
                  <dt className="eyebrow text-rose/80">Market</dt>
                  <dd className="mt-1 leading-relaxed">{about.brand.market}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-rose/80">Look & feel</dt>
                  <dd className="mt-1 font-serif text-lg italic">{about.brand.feel}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-rose/80">Kinship</dt>
                  <dd className="mt-1 leading-relaxed">{about.brand.kin}</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <ul className="mt-10 space-y-3">
            {about.facts.map((f) => (
              <li key={f.k} className="flex gap-6 text-sm text-plum/80">
                <span className="eyebrow w-24 shrink-0 pt-0.5 text-hibiscus/80">{f.k}</span>
                <span>{f.v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
