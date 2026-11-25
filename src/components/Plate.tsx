import Image from "next/image";
import type { Img } from "@/content/site";

type Props = {
  img: Img;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** How the image dissolves into the page. */
  feather?: "none" | "radial" | "bottom" | "x";
  /** Colour washed over the image so it sits in the page tone. */
  wash?: string;
  /** Show the "temporary image" note (only appears when img.temp is true). */
  note?: boolean;
  grade?: "soft" | "deep";
};

/**
 * Every image on the site goes through here, so they all share one grade,
 * one wash and one way of dissolving into the background.
 */
export default function Plate({
  img,
  className = "",
  imgClassName = "",
  sizes = "100vw",
  priority,
  feather = "none",
  wash,
  note = true,
  grade = "soft",
}: Props) {
  const featherClass =
    feather === "radial" ? "feather" : feather === "bottom" ? "feather-b" : feather === "x" ? "feather-x" : "";
  return (
    <figure className={`relative overflow-hidden ${featherClass} ${className}`}>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={75}
        className={`object-cover ${grade === "deep" ? "grade-deep" : "grade"} ${imgClassName}`}
        style={{ objectPosition: img.focus ?? "50% 50%" }}
      />
      {/* warm wash + soft light leak */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{ background: wash ?? "rgba(228,211,188,0.28)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_10%,rgba(255,248,236,0.35),transparent_55%)]"
      />
      {img.temp && note && (
        <figcaption className="absolute bottom-2 right-3 z-10 text-[0.55rem] uppercase tracking-[0.2em] text-ivory/80 mix-blend-difference">
          Temporary image · not my design
        </figcaption>
      )}
    </figure>
  );
}
