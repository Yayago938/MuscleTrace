import { NavLink } from "react-router-dom";
import { navItems } from "../data/siteData";
import { Footer } from "./Footer";

function AppSidebar() {
  return (
    <aside className="hidden h-screen w-72 shrink-0 flex-col rounded-r-shell bg-surface-container-low px-4 py-8 shadow-ambient lg:flex">
      <div className="px-4">
        <h1 className="font-headline text-2xl font-semibold italic text-primary">MuscleTrace</h1>
        <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-on-surface-variant">The Digital Atelier</p>
      </div>
      <nav className="mt-10 flex flex-1 flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              `nav-chip flex items-center gap-3 ${
                isActive ? "bg-ember text-white shadow-soft" : "text-on-surface/70 hover:bg-surface-container-high"
              }`
            }
            key={item.path}
            to={item.path}
          >
            <span className="material-symbols-outlined text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <button className="ember-button w-full justify-center" type="button">
        Start Session
      </button>
    </aside>
  );
}

function MobileBottomNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-1.5rem)] -translate-x-1/2 justify-around rounded-full bg-white/85 px-4 py-3 shadow-ambient backdrop-blur-xl lg:hidden">
      {navItems.map((item) => (
        <NavLink
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.18em] ${
              isActive ? "text-primary" : "text-on-surface-variant"
            }`
          }
          key={item.path}
          to={item.path}
        >
          <span className="material-symbols-outlined text-lg">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export function AppShell({ title, eyebrow, children, toolbar }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AppSidebar />
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
      </div>
      <MobileBottomNav />
    </div>
  );
}
