import { Footer } from "./Footer";

export function AppShell({ title, eyebrow, children, toolbar }) {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <header className="sticky top-0 z-30 border-b border-outline-variant/10 bg-background/85 px-6 py-5 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-on-surface-variant">{eyebrow}</p>
            <h2 className="mt-2 font-headline text-3xl font-bold md:text-5xl">{title}</h2>
          </div>
          {toolbar}
        </div>
      </header>
      <main className="flex-1 px-6 py-8 md:px-8">{children}</main>
      <Footer />
    </div>
  );
}
