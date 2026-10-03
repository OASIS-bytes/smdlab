"use client";

import { useEffect, useRef, useState } from "react";

type ShowreelPlayerProps = {
  hasVideo: boolean;
  src: string;
  poster: string;
  label: string;
  note: string;
  help: string;
};

/** Start fetching the file a little before the slot scrolls into view. */
const MARGIN = "200px";

/**
 * 16:9 showreel slot. When the file exists it plays muted, looped and inline;
 * under reduced motion it does not autoplay and shows native controls instead.
 * Without a file it renders a flat branded placeholder.
 *
 * The `src` is withheld until the slot is near the viewport, so the video is
 * never fetched by a visitor who stops reading above it.
 */
export function ShowreelPlayer({ hasVideo, src, poster, label, note, help }: ShowreelPlayerProps) {
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [wanted, setWanted] = useState(false);
  const slot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionAllowed(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = slot.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setWanted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setWanted(true);
        observer.disconnect();
      },
      { rootMargin: MARGIN },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={slot} className="border border-cream/25 bg-cream/5">
      <div className="relative aspect-video w-full">
        {hasVideo ? (
          <>
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={wanted ? src : undefined}
              poster={poster}
              aria-label={label}
              muted
              loop
              playsInline
              autoPlay={motionAllowed}
              controls={!motionAllowed}
              preload="none"
            />
            {/* The poster only shows before playback, so the slot stays labelled
                for anyone who lands here without playing it. */}
            <p className="label-micro pointer-events-none absolute left-4 top-4 bg-ink/80 px-3 py-2 text-cream/80">
              {note}
            </p>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <span
              aria-hidden="true"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-copper/60"
            >
              <svg width="18" height="20" viewBox="0 0 18 20" className="text-copper">
                <polygon points="2,1 17,10 2,19" fill="currentColor" />
              </svg>
            </span>
            <p className="font-display text-lede">{label}</p>
            <p className="label-micro text-cream/70">{note}</p>
            <p className="max-w-md text-sm text-cream/70">{help}</p>
          </div>
        )}
      </div>
    </div>
  );
}
