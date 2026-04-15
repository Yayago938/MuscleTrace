import { footerLinks } from "../data/siteData";

export function Footer() {
  return (
    <footer className="border-t border-outline-variant/20 bg-surface px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-headline text-xl font-semibold italic">MuscleTrace</p>
          <p className="mt-2 text-xs uppercase tracking-[0.22em] text-on-surface-variant">
            © 2026 MuscleTrace. The Digital Atelier for Human Performance.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-on-surface-variant">
          {footerLinks.map((item) => (
            <button className="transition hover:text-primary" key={item} type="button">
              {item}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
