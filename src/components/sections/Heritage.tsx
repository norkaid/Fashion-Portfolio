"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Plate from "@/components/Plate";
import { Reveal, MaskLines } from "@/components/Reveal";
import { DotOrbit, Weave, Dashes, ArchLine } from "@/components/Motifs";
import { heritage } from "@/content/site";

const icons = [Weave, DotOrbit, ArchLine, Dashes];

export default function Heritage() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const left = useTransform(scrollYProgress, [0, 1], ["-6%", "4%"]);
  const right = useTransform(scrollYProgress, [0, 1], ["6%", "-4%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-espresso py-28 text-ivory md:py-44"
      aria-labelledby="heritage-title"
    >
      <motion.div className="absolute inset-y-0 right-0 w-full opacity-60 md:w-[55%]" style={{ y }}>
        <Plate
          img={{ src: "/images/temp/gaze.jpg", alt: "Temporary image: portrait at dusk", temp: true, focus: "50% 30%" }}
          className="h-full w-full"
          feather="x"
          grade="deep"
          wash="rgba(42,29,22,0.45)"
          sizes="55vw"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-espresso via-espresso/80 to-espresso/20" />

      <div className="relative mx-auto max-w-[1500px] px-5 md:px-10">
        <Reveal>
          <p className="eyebrow mb-10 flex items-center gap-4 text-gold">
            <span className="h-px w-10 bg-gold" /> Afro-contemporary
          </p>
        </Reveal>
        <h2 id="heritage-title" className="font-serif font-light leading-[0.9]">
          <motion.span className="block text-6xl md:text-[8rem]" style={{ x: left }}>
            Between
          </motion.span>
          <motion.span className="block pl-[8vw] text-6xl italic text-champagne md:text-[8rem]" style={{ x: right }}>
            two worlds.
          </motion.span>
        </h2>
        <Reveal delay={0.1} className="mt-10 max-w-xl">
          <p className="text-[1.02rem] leading-[1.85] text-ivory/75">
            A global fashion vocabulary, spoken with a West African accent. Heritage is never used as a theme
            or a costume. It shows in the details: a woven rhythm, a dyed edge, a curve taken from a building,
            a colour taken from the earth.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {heritage.map((h, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={h.k} delay={i * 0.1}>
                <div className="group border-t border-ivory/15 pt-6">
                  <Icon className="h-14 w-14 opacity-70 transition-transform duration-1000 ease-silk group-hover:rotate-12" color="#C9A66B" />
                  <p className="mt-6 font-serif text-2xl font-light italic text-champagne">{h.k}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/65">{h.v}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <MaskLines
          as="p"
          className="mt-28 max-w-4xl font-serif text-3xl font-light leading-snug text-ivory/90 md:text-5xl"
          lines={[
            <span key="a">
              &ldquo;Globally fluent, <span className="italic text-gold">culturally grounded</span>,
            </span>,
            <span key="b">and always made by hand first.&rdquo;</span>,
          ]}
        />
      </div>
    </section>
  );
}
