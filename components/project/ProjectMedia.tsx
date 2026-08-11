"use client";

import { useState, type CSSProperties, type SyntheticEvent } from "react";
import type { ResolvedProject } from "@/lib/projectRegistry";
import {
  resolveProjectMedia,
  type ProjectMedia as ProjectMediaDefinition,
  type ProjectMediaContext,
  type ProjectMediaLayer,
  type ProjectMediaViewport,
} from "@/lib/projectMedia";

const transparentPixel = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

function percent(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

function radius(value: number, width: number, height: number) {
  return `${(value / width) * 100}% / ${(value / height) * 100}%`;
}

function ResponsiveAsset({
  src,
  viewport,
  loading,
  objectFit = "fill",
  style,
  onError,
}: {
  src: string;
  viewport: ProjectMediaViewport;
  loading: "eager" | "lazy";
  objectFit?: "cover" | "contain" | "fill";
  style?: CSSProperties;
  onError: (event: SyntheticEvent<HTMLImageElement>) => void;
}) {
  const media = viewport === "desktop"
    ? "(min-width: 768px) and (min-height: 501px), (min-width: 768px) and (orientation: portrait)"
    : "(max-width: 767px), (max-height: 500px) and (orientation: landscape)";
  return (
    <picture className="project-media-picture">
      <source media={media} srcSet={`${encodeURI(src)} 1x`} />
      <img
        src={transparentPixel}
        alt=""
        aria-hidden="true"
        draggable={false}
        loading={loading}
        fetchPriority={loading === "eager" ? "high" : "auto"}
        decoding="async"
        onError={onError}
        style={{ objectFit, ...style }}
      />
    </picture>
  );
}

function Layer({
  layer,
  canvasWidth,
  canvasHeight,
  viewport,
  loading,
  onError,
}: {
  layer: ProjectMediaLayer;
  canvasWidth: number;
  canvasHeight: number;
  viewport: ProjectMediaViewport;
  loading: "eager" | "lazy";
  onError: (event: SyntheticEvent<HTMLImageElement>) => void;
}) {
  const layerStyle: CSSProperties = {
    left: percent(layer.x, canvasWidth),
    top: percent(layer.y, canvasHeight),
    width: percent(layer.width, canvasWidth),
    height: percent(layer.height, canvasHeight),
    overflow: layer.clip ? "hidden" : "visible",
    borderRadius: layer.borderRadius ? radius(layer.borderRadius, layer.width, layer.height) : undefined,
    background: layer.background,
    transform: layer.rotate ? `rotate(${layer.rotate}deg)` : undefined,
  };

  if (!layer.src) return <span className="project-media-layer" style={layerStyle} />;

  if (layer.media) {
    const media = layer.media;
    return (
      <span className="project-media-layer" style={layerStyle}>
        <ResponsiveAsset
          src={layer.src}
          viewport={viewport}
          loading={loading}
          objectFit={media.objectFit ?? layer.objectFit}
          onError={onError}
          style={{
            position: "absolute",
            left: percent(media.x, layer.width),
            top: percent(media.y, layer.height),
            width: percent(media.width, layer.width),
            height: percent(media.height, layer.height),
            borderRadius: media.borderRadius ? radius(media.borderRadius, media.width, media.height) : undefined,
          }}
        />
      </span>
    );
  }

  return (
    <span className="project-media-layer" style={layerStyle}>
      <ResponsiveAsset src={layer.src} viewport={viewport} loading={loading} objectFit={layer.objectFit} onError={onError} />
    </span>
  );
}

function MediaStage({
  media,
  fallback,
  viewport,
  loading,
}: {
  media: ProjectMediaDefinition;
  fallback: ProjectMediaDefinition;
  viewport: ProjectMediaViewport;
  loading: "eager" | "lazy";
}) {
  const [failed, setFailed] = useState(false);
  const selected = failed ? fallback : media;
  const onError = () => { if (!failed) setFailed(true); };

  if (selected.type === "asset") {
    return (
      <span className={`project-media-slot is-${viewport}`}>
        <ResponsiveAsset src={selected.src} viewport={viewport} loading={loading} objectFit={selected.objectFit ?? "cover"} onError={onError} />
      </span>
    );
  }

  return (
    <span className={`project-media-slot is-${viewport}`}>
      <span className="project-media-composition" style={{ background: selected.background }}>
        {selected.layers.map((layer, index) => (
          <Layer
            key={`${layer.src ?? layer.background ?? "layer"}-${index}`}
            layer={layer}
            canvasWidth={selected.width}
            canvasHeight={selected.height}
            viewport={viewport}
            loading={loading}
            onError={onError}
          />
        ))}
      </span>
    </span>
  );
}

export function ProjectMedia({
  project,
  context,
  className = "",
  priority = false,
}: {
  project: ResolvedProject;
  context: ProjectMediaContext;
  className?: string;
  priority?: boolean;
}) {
  const desktop = resolveProjectMedia(project, { context, viewport: "desktop" });
  const mobile = resolveProjectMedia(project, { context, viewport: "mobile" });
  const loading = priority ? "eager" : "lazy";

  return (
    <span className={`project-media-renderer ${className}`.trim()} role="img" aria-label={project.thumbnailAlt}>
      <MediaStage media={desktop} fallback={project.media.fallback} viewport="desktop" loading={loading} />
      <MediaStage media={mobile} fallback={project.media.fallback} viewport="mobile" loading={loading} />
    </span>
  );
}
