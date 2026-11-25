"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Plate from "@/components/Plate";
import { DotOrbit, DotWaves } from "@/components/Motifs";
import Aurora from "@/components/Aurora";
import { useLoaded } from "@/components/useLoaded";
import { scrollToTarget } from "@/components/SmoothScroll";
import { site } from "@/content/site";

const silk = [0.22, 1, 0.36, 1] as const;
const heroImg = {
  src: "/images/temp/hero.jpg",
  alt: "Temporary editorial portrait: a woman with natural hair against a soft blush haze",
  temp: true,
  focus: "50% 35%",
};

function Letters({ word, delay, italic }: { word: string; delay: number; italic?: boolean }) {
  const loaded = useLoaded();
  return (
    <span className={`inline-flex overflow-hidden pb-[0.06em] ${italic ? "italic" : ""}`} aria-hidden>
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className={`inline-block ${italic ? "iridescent pr-[0.04em]" : ""}`}
          style={italic ? { animationDelay: `-${i * 1.6}s`, backgroundSize: "600% 100%" } : undefined}
          initial={{ y: "110%", opacity: 0 }}
          animate={loaded ? { y: "0%", opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: delay + i * 0.045, ease: silk }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const loaded = useLoaded();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const line1 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const line2 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const line3 = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-ivory"
      aria-label="Introduction"
    >
      {/* atmosphere */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#FFF6EC_0%,#FCE3D3_40%,#F8D3D6_70%,#EBD9F0_100%)]" />
      <Aurora colors={["#F2C14E", "#E89AAE", "#8FD3C9", "#C2416B", "#B9A2E0"]} opacity={0.5} />
      <DotWaves className="pointer-events-none absolute bottom-0 left-0 h-40 w-full opacity-60 md:h-56" />
      <motion.div
        className="absolute -left-24 top-24 h-[34rem] w-[34rem] opacity-40 md:left-[8%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
      >
        <DotOrbit className="h-full w-full" rings={6} color="#C2416B" />
      </motion.div>

      {/* hero image: feathered into the page */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[68svh] md:inset-y-0 md:left-auto md:right-[-4vw] md:h-full md:w-[64vw]"
        style={{ y: imgY }}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={loaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 2.6, ease: silk }}
      >
        <motion.div className="h-full w-full" style={{ scale: imgScale }}>
          <motion.div
            className="h-full w-full"
            animate={{ scale: [1, 1.05, 1], x: ["0%", "-1.5%", "0%"] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          >
            <Plate
              img={heroImg}
              priority
              sizes="(min-width: 768px) 64vw, 100vw"
              feather="radial"
              wash="rgba(248,211,214,0.18)"
              className="h-full w-full"
              note={false}
            />
          </motion.div>
        </motion.div>
      </motion.div>
      {/* light veil */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#FCE3D3]/90 via-transparent to-transparent md:bg-gradient-to-r md:from-[#FFF6EC]/70 md:via-transparent md:to-transparent" />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-5 pb-24 pt-[52svh] md:justify-center md:px-10 md:pb-16 md:pt-28"
        style={{ opacity: fade }}
      >
        <motion.p
          className="eyebrow mb-6 text-hibiscus md:mb-10"
          initial={{ opacity: 0, x: -12 }}
          animate={loaded ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: silk }}
        >
          {site.role}
        </motion.p>

        <h1
          className="font-serif font-light uppercase leading-[0.86] tracking-[0.02em] text-plum"
          aria-label={site.name}
        >
          <motion.span className="block text-[17vw] md:text-[9.6vw]" style={{ y: line1 }}>
            <Letters word="Donna" delay={0.1} />
          </motion.span>
          <motion.span
            className="block pl-[10vw] text-[17vw] normal-case md:pl-[7vw] md:text-[9.6vw]"
            style={{ y: line2 }}
          >
            <Letters word="Norkai" delay={0.35} italic />
          </motion.span>
          <motion.span className="block text-[17vw] md:text-[9.6vw]" style={{ y: line3 }}>
            <Letters word="Omaboe" delay={0.6} />
          </motion.span>
        </h1>

        <motion.div
          className="mt-8 flex max-w-xl flex-col gap-6 md:mt-12 md:flex-row md:items-start md:gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, delay: 1.2, ease: silk }}
        >
          <span className="hidden h-px w-16 translate-y-4 bg-gradient-to-r from-hibiscus to-marigold md:block" aria-hidden />
          <p className="font-serif text-xl font-light italic leading-snug text-plum/85 md:text-2xl">
            {site.intro}
          </p>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.button
        type="button"
        onClick={() => {
          const el = document.getElementById("about");
          if (el) scrollToTarget(el);
        }}
        className="absolute bottom-10 right-10 z-10 hidden flex-col items-center gap-3 text-plum md:flex"
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 1 }}
        aria-label="Scroll to About"
      >
        <span className="eyebrow">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-plum/20">
          <motion.span
            className="absolute left-0 top-0 h-1/2 w-px bg-hibiscus"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
          />
        </span>
      </motion.button>

      <p className="absolute bottom-6 left-5 z-10 hidden text-[0.55rem] uppercase tracking-[0.2em] text-plum/60 md:left-10 md:block">
        Temporary editorial image · to be replaced with my own work
      </p>
    </section>
  );
}
