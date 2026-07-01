import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="max-w-md text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">404</p>
        <h1 className="mt-4 font-headline text-5xl font-bold">Page not found</h1>
        <p className="mt-4 text-sm leading-6 text-on-surface-variant">
          The route you opened does not exist in MuscleTrace.
        </p>
        <Link className="ember-button mt-8 justify-center" to="/">
          Back to Landing
        </Link>
      </div>
    </main>
  );
}
