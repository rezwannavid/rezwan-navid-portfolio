"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";

export function RideSyncVisual({
  src,
  videoSrc,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: {
  src: string;
  videoSrc?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !videoSrc || reduceMotion) return;
    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setShouldLoadVideo(true);
      preloadObserver.disconnect();
    }, { rootMargin: "500px 0px" });
    preloadObserver.observe(frame);
    return () => preloadObserver.disconnect();
  }, [reduceMotion, videoSrc]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !videoSrc || reduceMotion) return;
    const playbackObserver = new IntersectionObserver(([entry]) => {
      setIsNearViewport(entry.isIntersecting);
    }, { rootMargin: "120px 0px", threshold: .01 });
    playbackObserver.observe(frame);
    return () => playbackObserver.disconnect();
  }, [reduceMotion, videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isNearViewport) void video.play().catch(() => undefined);
    else video.pause();
  }, [isNearViewport, shouldLoadVideo]);

  return (
    <figure ref={frameRef} className={`ridesync-visual ${className}`.trim()} style={{ aspectRatio: `${width} / ${height}` }}>
      <ParallaxMedia className="ridesync-visual-depth" distance={0} xDistance={0} rotateDistance={0} reveal revealOffset={34}>
        {videoSrc && !reduceMotion && shouldLoadVideo ? (
          <video
            ref={videoRef}
            aria-label={alt}
            autoPlay={isNearViewport}
            loop
            muted
            playsInline
            poster={src}
            preload="none"
            src={videoSrc}
            onCanPlay={() => setIsVideoReady(true)}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            sizes="(min-width: 1100px) 1080px, calc(100vw - 40px)"
          />
        )}
        {videoSrc && !reduceMotion && shouldLoadVideo && !isVideoReady ? <span className="video-load-indicator" aria-hidden="true" /> : null}
      </ParallaxMedia>
    </figure>
  );
}
