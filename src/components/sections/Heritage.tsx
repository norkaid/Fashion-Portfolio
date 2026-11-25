"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Plate from "@/components/Plate";
import { Reveal, MaskLines } from "@/components/Reveal";
import { DotOrbit, Weave, Dashes, ArchLine, DotWaves } from "@/components/Motifs";
import Aurora, { KenteBand } from "@/components/Aurora";
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
      className="relative overflow-hidden bg-malachite py-28 text-ivory md:py-44"
      aria-labelledby="heritage-title"
    >
      <motion.div className="absolute inset-y-0 right-0 w-full opacity-60 md:w-[55%]" style={{ y }}>
        <Plate
          img={{ src: "/images/temp/gaze.jpg", alt: "Temporary image: portrait at dusk", temp: true, focus: "50% 30%" }}
          className="h-full w-full"
          feather="x"
          grade="deep"
          wash="rgba(21,107,85,0.35)"
          sizes="55vw"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#0C3B30_0%,rgba(12,59,48,0.85)_45%,rgba(30,34,87,0.25)_100%)]" />
      <Aurora colors={["#E9A23B", "#2F9C9A", "#C2416B"]} opacity={0.25} />
      <div className="absolute inset-x-0 top-0"><KenteBand className="h-3" /></div>
      <DotWaves className="pointer-events-none absolute bottom-0 left-0 h-40 w-full opacity-30" colors={["#F2C14E", "#EE8A6B", "#8FD3C9"]} rows={3} />

      <div className="relative mx-auto max-w-[1500px] px-5 md:px-10">
        <Reveal>
          <p className="eyebrow mb-10 flex items-center gap-4 text-saffron">
            <span className="h-px w-10 bg-saffron" /> Afro-contemporary
          </p>
        </Reveal>
        <h2 id="heritage-title" className="font-serif font-light leading-[0.9]">
          <motion.span className="block text-6xl md:text-[8rem]" style={{ x: left }}>
            Between
          </motion.span>
          <motion.span className="iridescent-light block pl-[8vw] pr-6 text-6xl italic md:text-[8rem]" style={{ x: right }}>
            two worlds.
          </motion.span>
        </h2>
        <Reveal delay={0.1} className="mt-10 max-w-xl">
          <p className="text-[1.02rem] leading-[1.85] text-ivory/80">
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
                <div className="group border-t-2 pt-6" style={{ borderColor: ["#F2C14E", "#EE8A6B", "#8FD3C9", "#E89AAE"][i] }}>
                  <Icon className="h-14 w-14 transition-transform duration-1000 ease-silk group-hover:rotate-12" color={["#F2C14E", "#EE8A6B", "#8FD3C9", "#E89AAE"][i]} />
                  <p className="mt-6 font-serif text-2xl font-light italic text-saffron">{h.k}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/75">{h.v}</p>
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
              &ldquo;Globally fluent, <span className="iridescent-light italic">culturally grounded</span>,
            </span>,
            <span key="b">and always made by hand first.&rdquo;</span>,
          ]}
        />
      </div>
    </section>
  );
}
