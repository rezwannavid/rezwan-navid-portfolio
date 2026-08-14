"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { CaseStudyShell } from "@/components/work/design-project/DesignProjectPrimitives";
import { motionEase } from "@/lib/motion";

export function ProtectedProjectGate({ slug }: { slug: string }) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const resetTimer = useRef<number | null>(null);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [errorKey, setErrorKey] = useState(0);

  useEffect(() => () => { if (resetTimer.current) window.clearTimeout(resetTimer.current); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!password || status === "submitting") return;
    setStatus("submitting");
    try {
      const response = await fetch("/api/work/access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug, password }),
      });
      if (!response.ok) {
        setPassword("");
        setStatus("error");
        setErrorKey((value) => value + 1);
        resetTimer.current = window.setTimeout(() => { setStatus("idle"); inputRef.current?.focus(); }, 1400);
        return;
      }
      setStatus("success");
      resetTimer.current = window.setTimeout(() => router.push(`/work/${slug}/full`), 300);
    } catch {
      setPassword("");
      setStatus("error");
      setErrorKey((value) => value + 1);
      resetTimer.current = window.setTimeout(() => { setStatus("idle"); inputRef.current?.focus(); }, 1400);
    }
  }

  return (
    <CaseStudyShell as="section" id="protected-access" className="protected-access" aria-labelledby="protected-access-label">
      <p id="protected-access-label" className="protected-access-label">This case study is protected <img src="/home-design/work-lock.svg" alt="" width="14" height="14" /></p>
      <form className="protected-gate-row" onSubmit={submit} noValidate>
        <motion.div className="protected-password-field" key={errorKey} animate={status === "error" && !reduceMotion ? { x: [0, -3, 3, -2, 2, 0] } : { x: 0 }} transition={{ duration: .32, ease: motionEase.snappy }}>
          <label className="sr-only" htmlFor="project-password">Case study password</label>
          <input ref={inputRef} id="project-password" type="password" value={password} placeholder={status === "error" ? "That password didn’t match" : "enter password"} onChange={(event) => { setPassword(event.target.value); if (status === "error") setStatus("idle"); }} autoComplete="current-password" aria-invalid={status === "error"} aria-describedby="password-message" disabled={status === "submitting" || status === "success"} />
        </motion.div>
        <motion.button className="portfolio-download-row protected-submit" type="submit" disabled={!password || status === "submitting" || status === "success"} aria-busy={status === "submitting"} data-status={status} data-cursor="Unlock" whileTap={reduceMotion ? undefined : { scale: .992 }}>
          <Magnetic className="protected-submit-inner" strength={3}><span>{status === "submitting" ? "checking" : status === "success" ? "opening case study" : "view full case study"}</span><img src="/home-design/work-unlock.svg" alt="" width="24" height="24" /></Magnetic>
        </motion.button>
        <span id="password-message" className="sr-only" aria-live="polite">{status === "error" ? "That password didn’t match" : status === "success" ? "Access granted. Opening the full case study." : ""}</span>
      </form>
    </CaseStudyShell>
  );
}
