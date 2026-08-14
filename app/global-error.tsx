"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main style={{ minHeight: "100dvh", display: "grid", placeContent: "center", gap: 16, padding: 24, background: "#040404", color: "#e7e7e7", fontFamily: "Arial, sans-serif" }} role="alert">
          <h1 style={{ margin: 0, fontSize: 32 }}>The site could not load</h1>
          <p style={{ margin: 0, color: "#aaa" }}>A temporary error interrupted the page.</p>
          <button type="button" onClick={reset} style={{ width: "fit-content", padding: "10px 16px", border: 0, borderRadius: 999, cursor: "pointer" }}>Try again</button>
        </main>
      </body>
    </html>
  );
}
