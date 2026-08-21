"use client";

import { useState } from "react";
import type { RideSyncMedia } from "@/lib/rideSync";

export function CaseStudyMedia({ media, className = "", priority = false }: { media: RideSyncMedia; className?: string; priority?: boolean }) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const content = media.type === "video" && media.src ? (
    <video
      aria-label={media.alt}
      autoPlay
      loop
      muted
      playsInline
      poster={media.poster}
      preload={priority ? "auto" : "metadata"}
      src={media.src}
      onCanPlay={() => setIsVideoReady(true)}
    />
  ) : media.src ? (
    <img src={media.src} alt={media.alt} loading={priority ? "eager" : "lazy"} decoding="async" />
  ) : (
    <span className="case-study-media-placeholder" aria-hidden="true" />
  );

  return (
    <div className={`case-study-media ridesync-media-${media.id} ${className}`.trim()}>
      <div className="case-study-media-stage" style={{ aspectRatio: media.aspectRatio }} data-media-id={`rideSync.${media.id}`}>
        {content}
        {media.type === "video" && media.src && !isVideoReady ? <span className="video-load-indicator" aria-hidden="true" /> : null}
      </div>
    </div>
  );
}
