"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Plate from "@/components/Plate";
import { MaskLines, Reveal } from "@/components/Reveal";
import { DotOrbit } from "@/components/Motifs";
import { site } from "@/content/site";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "0%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const channels = [
    { k: "Email", v: site.email, href: `mailto:${site.email}` },
    {
      k: "Instagram",
      v: site.instagramHandle || "Coming soon",
      href: site.instagram || undefined,
    },
    { k: "LinkedIn", v: "Donna Omaboe", href: site.linkedin },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-ivory via-cream to-champagne pb-10 pt-28 md:pt-40"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-y-16 px-5 md:px-10">
        {/* closing composition */}
        <div className="relative col-span-12 md:col-span-5 md:col-start-8 md:row-start-1">
          <motion.div className="absolute -left-16 -top-16 h-[120%] w-[120%] opacity-50" style={{ rotate: rot }}>
            <DotOrbit className="h-full w-full" rings={7} />
          </motion.div>
          <motion.div style={{ y }} className="relative mx-auto w-[78%] md:w-full">
            <div className="arch overflow-hidden">
              <motion.div style={{ scale }}>
                <Plate
                  img={{
                    src: "/images/temp/closing.jpg",
                    alt: "Temporary image: black and white portrait, hair moving in the wind",
                    temp: true,
                    focus: "50% 20%",
                  }}
                  className="aspect-[3/4] w-full"
                  sizes="(min-width: 768px) 40vw, 78vw"
                  feather="bottom"
                  wash="rgba(228,211,188,0.4)"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="col-span-12 md:col-span-7 md:row-start-1 md:pr-10 md:pt-16">
          <Reveal>
            <p className="eyebrow mb-8 flex items-center gap-4 text-clay">
              <span className="h-px w-10 bg-gold" /> Contact
            </p>
          </Reveal>
          <MaskLines
            as="h2"
            className="font-serif text-6xl font-light leading-[0.92] text-espresso md:text-[7.4rem]"
            lines={[
              "Let's Create",
              <span key="s" className="italic text-earth">
                Something
              </span>,
              "Beautiful.",
            ]}
          />
          <span id="contact-title" className="sr-only">
            Contact
          </span>
          <Reveal delay={0.15} className="mt-10 max-w-lg">
            <p className="text-[1.02rem] leading-[1.85] text-earth/85">
              I&apos;m open to creative collaborations, fashion projects, editorial and costume commissions, and
              professional opportunities with studios and houses who care about craft. Write to me and tell me
              what you&apos;re dreaming up.
            </p>
          </Reveal>

          <ul className="mt-14 divide-y divide-taupe/40 border-y border-taupe/40">
            {channels.map((c, i) => (
              <Reveal key={c.k} delay={0.1 * i}>
                <li>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-baseline justify-between gap-6 py-6"
                    >
                      <span className="eyebrow w-28 shrink-0 text-clay">{c.k}</span>
                      <span className="flex-1 break-all font-serif text-2xl font-light text-espresso transition-transform duration-700 ease-silk group-hover:translate-x-3 md:text-3xl">
                        {c.v}
                      </span>
                      <span
                        aria-hidden
                        className="font-serif text-2xl text-gold transition-transform duration-700 ease-silk group-hover:-rotate-45"
                      >
                        →
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-baseline justify-between gap-6 py-6">
                      <span className="eyebrow w-28 shrink-0 text-clay">{c.k}</span>
                      <span className="flex-1 font-serif text-2xl font-light italic text-taupe md:text-3xl">{c.v}</span>
                    </div>
                  )}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <footer className="relative mx-auto mt-32 max-w-[1500px] px-5 md:px-10">
        <p
          aria-hidden
          className="select-none text-center font-serif text-[17vw] font-light uppercase leading-none tracking-[0.04em] text-ivory/70"
        >
          Norkai
        </p>
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-earth/20 pt-6 text-[0.65rem] uppercase tracking-[0.2em] text-earth/70 md:flex-row">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>{site.location}</p>
          <p>Photography marked as temporary is not my design</p>
        </div>
      </footer>
    </section>
  );
}
