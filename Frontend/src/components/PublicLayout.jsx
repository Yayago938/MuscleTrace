import { NavLink } from "react-router-dom";
import { topLinks } from "../data/siteData";
import { Footer } from "./Footer";

export function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-outline-variant/10 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <NavLink className="font-headline text-2xl font-bold italic" to="/">
            MuscleTrace
          </NavLink>
          <nav className="hidden items-center gap-8 md:flex">
            {topLinks.map((item) => (
              <NavLink className="text-sm font-semibold tracking-wide text-on-surface-variant transition hover:text-primary" key={item.path} to={item.path}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <NavLink className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant transition hover:text-primary" to="/login">
              Log In
            </NavLink>
            <NavLink className="ember-button" to="/signup">
              Start Session
            </NavLink>
          </div>
        </div>
      </header>
      {children}
      <Footer />
    </div>
  );
}
