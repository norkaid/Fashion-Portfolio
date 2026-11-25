import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-screen place-items-center bg-ivory px-6 text-center">
      <div>
        <p className="eyebrow text-clay">404</p>
        <h1 className="mt-6 font-serif text-6xl font-light text-espresso md:text-8xl">
          Lost in the <span className="italic text-earth">fabric</span>.
        </h1>
        <Link href="/" className="link-underline mt-10 inline-block pb-1 text-sm uppercase tracking-wide2 text-espresso">
          Return home
        </Link>
      </div>
    </main>
  );
}
