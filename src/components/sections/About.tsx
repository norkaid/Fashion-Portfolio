"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Plate from "@/components/Plate";
import { Reveal, MaskLines, Curtain } from "@/components/Reveal";
import { ArchLine, Weave } from "@/components/Motifs";
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
      className="relative overflow-hidden bg-gradient-to-b from-ivory via-cream to-ivory py-28 md:py-44"
      aria-labelledby="about-title"
    >
      {/* oversized background word */}
      <motion.p
        aria-hidden
        style={{ y: yWord }}
        className="pointer-events-none absolute -right-[6vw] top-10 select-none font-serif text-[30vw] font-light italic leading-none text-champagne/50"
      >
        Norkai
      </motion.p>

      <div className="relative mx-auto grid max-w-[1500px] grid-cols-12 gap-y-16 px-5 md:px-10">
        {/* images */}
        <div className="relative col-span-12 md:col-span-5 md:col-start-1">
          <ArchLine className="absolute -left-4 -top-8 h-[74%] w-[90%] md:-left-8" />
          <motion.div style={{ y: yPortrait }} className="relative mx-auto w-[82%] md:w-full">
            <Curtain>
              <Plate
                img={about.portrait}
                className="arch aspect-[3/4.2] w-full"
                sizes="(min-width: 768px) 40vw, 82vw"
                feather="bottom"
                wash="rgba(228,211,188,0.32)"
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
            <p className="eyebrow mb-8 flex items-center gap-4 text-clay">
              <span className="h-px w-10 bg-gold" /> About the designer
            </p>
          </Reveal>
          <MaskLines
            className="font-serif text-5xl font-light leading-[0.95] text-espresso md:text-7xl"
            lines={[
              "Sculpting",
              <span key="i" className="italic text-earth">
                identity
              </span>,
              "in cloth & light.",
            ]}
          />
          <h2 id="about-title" className="sr-only">
            About Donna Norkai Omaboe
          </h2>
          <Reveal delay={0.1} className="mt-10 space-y-6 text-[1.02rem] leading-[1.85] text-earth/90">
            <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:font-light first-letter:leading-[0.8] first-letter:text-espresso">
              {about.statement}
            </p>
            <p>{about.statement2}</p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {about.threads.map((t, i) => (
              <Reveal key={t.k} delay={0.08 * i}>
                <div className="border-t border-taupe/40 pt-4">
                  <p className="font-serif text-2xl font-light italic text-espresso">{t.k}</p>
                  <p className="mt-2 text-sm leading-relaxed text-earth/80">{t.v}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* brand card */}
          <Reveal delay={0.15}>
            <div className="relative mt-16 overflow-hidden border border-gold/30 bg-ivory/60 p-8 backdrop-blur-sm md:p-10">
              <Weave className="absolute -right-6 -top-6 h-40 w-40 opacity-[0.18]" />
              <p className="eyebrow text-gold">The label</p>
              <p className="mt-3 font-serif text-5xl font-light tracking-[0.08em] text-espresso">
                {about.brand.name}
              </p>
              <dl className="mt-6 grid gap-4 text-sm text-earth md:grid-cols-3">
                <div>
                  <dt className="eyebrow text-clay/80">Market</dt>
                  <dd className="mt-1 leading-relaxed">{about.brand.market}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-clay/80">Look & feel</dt>
                  <dd className="mt-1 font-serif text-lg italic">{about.brand.feel}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-clay/80">Kinship</dt>
                  <dd className="mt-1 leading-relaxed">{about.brand.kin}</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <ul className="mt-10 space-y-3">
            {about.facts.map((f) => (
              <li key={f.k} className="flex gap-6 text-sm text-earth">
                <span className="eyebrow w-24 shrink-0 pt-0.5 text-clay/80">{f.k}</span>
                <span>{f.v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
