"use client";

import Link from "next/link";

export default function RouteError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="placeholder-page" role="alert">
      <h1>This page could not load</h1>
      <p>A temporary error interrupted this page.</p>
      <button type="button" onClick={reset}>Try again</button>
      <Link href="/">Return home</Link>
    </main>
  );
}
