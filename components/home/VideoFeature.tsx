"use client";

import { useState } from "react";

export function VideoFeature() {
  const [requested, setRequested] = useState(false);

  return (
    <div className="home-video-frame">
      <img src="/home-design/video-poster.png?v=2" alt="Product-thinking talk video poster" width="3740" height="2016" loading="lazy" />
      <button className="home-video-play" type="button" aria-pressed={requested} onClick={() => setRequested(true)}>
        <span className="home-play-glyph" aria-hidden="true" />
        <span>{requested ? "Film coming soon" : "Play"}</span>
      </button>
    </div>
  );
}
