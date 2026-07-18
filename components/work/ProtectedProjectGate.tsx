"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function ProtectedProjectGate({ slug, title }: { slug: string; title: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!password || status === "submitting") return;
    setStatus("submitting");
    setError("");
    try {
      const response = await fetch("/api/work/access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug, password }),
      });
      const data = await response.json() as { error?: string };
      if (!response.ok) {
        setStatus("error");
        setError(data.error ?? "Access could not be verified.");
        return;
      }
      setStatus("success");
      window.setTimeout(() => router.refresh(), 350);
    } catch {
      setStatus("error");
      setError("Access could not be verified. Check your connection and try again.");
    }
  }

  return (
    <main className="protected-project-page">
      <section className="protected-gate" aria-labelledby="protected-project-title">
        <p className="eyebrow">Confidential case study</p>
        <h1 id="protected-project-title">{title}</h1>
        <p>This project contains protected client work. Enter the shared password to continue.</p>
        <form onSubmit={submit} noValidate>
          <label htmlFor="project-password">Password</label>
          <div className="protected-password-field">
            <input
              id="project-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => { setPassword(event.target.value); if (status === "error") setStatus("idle"); }}
              autoComplete="current-password"
              aria-invalid={status === "error"}
              aria-describedby="password-message"
              disabled={status === "submitting" || status === "success"}
            />
            <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button>
          </div>
          <p id="password-message" className="protected-message" aria-live="polite">
            {status === "error" ? error : status === "success" ? "Access granted. Opening the case study…" : ""}
          </p>
          <button className="protected-submit" type="submit" disabled={!password || status === "submitting" || status === "success"}>
            {status === "submitting" ? "Checking…" : status === "success" ? "Access granted" : "View case study"}
          </button>
        </form>
        <Link href="/work">Back to selected work</Link>
      </section>
    </main>
  );
}
