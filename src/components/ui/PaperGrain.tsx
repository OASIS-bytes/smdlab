// Single high-frequency octave, tiled small. Keeping it to one octave avoids
// the low-frequency blotching that reads as a gradient or glow over large flat
// ink areas. No radial or linear gradient anywhere: this is turbulence noise
// rendered as a flat greyscale layer at very low opacity.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23g)' opacity='0.5'/%3E%3C/svg%3E\")";

type PaperGrainProps = {
  /** Kept very low: the tooth should register on close inspection only. */
  intensity?: "subtle" | "faint";
};

const OPACITY = {
  subtle: 0.035,
  faint: 0.02,
} as const;

export function PaperGrain({ intensity = "subtle" }: PaperGrainProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{
        backgroundImage: GRAIN,
        backgroundRepeat: "repeat",
        backgroundSize: "120px 120px",
        opacity: OPACITY[intensity],
      }}
    />
  );
}