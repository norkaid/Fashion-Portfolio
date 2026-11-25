import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Works from "@/components/sections/Works";
import Process from "@/components/sections/Process";
import Heritage from "@/components/sections/Heritage";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Marquee />
      <About />
      <Works />
      <Process />
      <Heritage />
      <Contact />
    </main>
  );
}
