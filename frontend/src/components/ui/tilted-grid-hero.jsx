import * as React from "react";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../lib/motionPreference";
import "./tilted-grid-hero.css";

// The supplied cylindrical carousel: each image is sixteen fixed facets,
// carried along one transform animation. Facets never animate independently.
const SLICES = 16;
const CAMERA = 1.6;
const MAX_WIDTH = 55;

const arc = (bend) => (CAMERA - 1 + Math.cos(bend)) / (2 * CAMERA * Math.sin(bend));

function measure(width, height, tile, aspect, gap, bend) {
  const h = Math.min((tile / 100) * height, ((MAX_WIDTH / 100) * width) / aspect);
  const radius = width * arc(bend);
  if (!(h > 0) || !(radius > 0)) return { columns: 2, sweep: 0, unit: 0, limit: 0 };
  const deg = (rad) => (rad * 180) / Math.PI;
  const unit = deg(h / radius);
  const pitch = (aspect + gap / 100) * unit;
  const limit = deg(bend) + (aspect * unit) / 2;
  const columns = Math.min(60, Math.max(2, Math.ceil((2 * limit) / pitch)));
  const round = (n) => +n.toFixed(4);
  const sweep = round((columns * pitch) / 2);
  return { columns, sweep, unit: round(unit), limit: round(Math.min(sweep, limit)) };
}

/**
 * Decorative curved image band. Supply ordinary, accessible image controls
 * beside it when the screenshots convey content (as the homepage does).
 * No per-frame JavaScript: resize and invisible wrap events are the only
 * layout/image updates. A paused band retains its finished composition.
 */
export function TiltedGridHero({
  images,
  speed = 4,
  tileHeight = 26,
  aspectRatio = 16 / 9,
  gap = 6,
  axis = 56,
  curve = 80,
  fade = 12,
  paused = false,
  children,
  className,
  style,
  ...props
}) {
  const ref = React.useRef(null);
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const orbit = `tgh-orbit-${id}`;
  const bend = (Math.min(85, Math.max(5, curve)) * Math.PI) / 180;
  const [layout, setLayout] = React.useState(null);
  const [shown, setShown] = React.useState({});
  const [inView, setInView] = React.useState(false);
  const [hasEntered, setHasEntered] = React.useState(false);
  const [documentVisible, setDocumentVisible] = React.useState(() => typeof document === "undefined" || !document.hidden);
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const update = (width, height) => {
      const next = measure(width, height, tileHeight, aspectRatio, gap, bend);
      setLayout((previous) => previous?.columns === next.columns && previous.sweep === next.sweep && previous.unit === next.unit ? previous : next);
    };
    if (typeof ResizeObserver === "undefined") {
      const resize = () => update(el.clientWidth, el.clientHeight);
      resize();
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }
    const observer = new ResizeObserver(([entry]) => update(entry.contentRect.width, entry.contentRect.height));
    observer.observe(el);
    return () => observer.disconnect();
  }, [tileHeight, aspectRatio, gap, bend]);

  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      setHasEntered(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting) setHasEntered(true);
    }, { rootMargin: "80px 0px" });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const visibility = () => setDocumentVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  React.useEffect(() => {
    if (hasEntered) images.forEach(({ src }) => { const img = new Image(); img.src = src; });
  }, [images, hasEntered]);

  const { columns, sweep, unit, limit } = layout ?? measure(1200, 560, tileHeight, aspectRatio, gap, bend);
  const u = (n) => `calc(${+n.toFixed(4)} * min(${tileHeight}cqh, ${+(MAX_WIDTH / aspectRatio).toFixed(4)}cqw))`;
  const r = 100 * arc(bend);
  const radius = `${+r.toFixed(3)}cqw`;
  const turn = (deg) => `translateZ(${radius}) rotateY(${+deg.toFixed(4)}deg) translateZ(-${radius})`;
  const hide = +(((sweep - limit) / (2 * sweep || 1)) * 100).toFixed(4);
  const css = `@keyframes ${orbit}{from{transform:${turn(-sweep)}}to{transform:${turn(sweep)}}0%,${hide}%,${100 - hide}%,100%{visibility:hidden}${hide + 0.001}%,${100 - hide - 0.001}%{visibility:visible}}`;
  const share = aspectRatio / SLICES;
  const duration = columns * Math.max(0.5, speed);
  const mask = `linear-gradient(90deg,transparent,#000 ${fade}%,#000 ${100 - fade}%,transparent)`;
  const isPaused = paused || !inView || !documentVisible || reducedMotion || hovered;

  return (
    <div
      ref={ref}
      className={cn("tilted-grid-hero", className)}
      style={{ containerType: "size", ...style }}
      data-carousel-state={isPaused ? "paused" : "playing"}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      {...props}
    >
      <style>{css}</style>
      <div
        aria-hidden="true"
        className="tilted-grid-band"
        style={{ opacity: layout && hasEntered ? 1 : 0, perspective: `${+(r * CAMERA).toFixed(3)}cqw`, perspectiveOrigin: `50% ${axis}%`, maskImage: mask, WebkitMaskImage: mask }}
      >
        {Array.from({ length: columns }, (_, t) => {
          const first = columns - 1 - t;
          const img = images[(shown[t] ?? first) % Math.max(images.length, 1)];
          return (
            <div
              key={t}
              className="tilted-grid-tile"
              style={{ left: `calc(50% - ${u(aspectRatio / 2)})`, top: `calc(${axis}% - ${u(0.5)})`, width: u(aspectRatio), height: u(1), animationName: orbit, animationDuration: `${duration}s`, animationTimingFunction: "linear", animationDelay: `${-t * Math.max(0.5, speed)}s`, animationIterationCount: "infinite", animationPlayState: isPaused ? "paused" : "running" }}
              onAnimationIteration={(event) => {
                if (event.target !== event.currentTarget) return;
                const lap = Math.round(event.elapsedTime / duration);
                setShown((previous) => {
                  const next = lap * columns + first;
                  return previous[t] === next ? previous : { ...previous, [t]: next };
                });
              }}
            >
              {Array.from({ length: SLICES }, (_, k) => (
                <div
                  key={k}
                  className="tilted-grid-facet"
                  style={{ left: u((aspectRatio - share) / 2), width: k === SLICES - 1 ? u(share) : `calc(${u(share)} + 1px)`, height: u(1), transform: turn((aspectRatio / 2 - (k + 0.5) * share) * unit), borderRadius: k === 0 ? "12px 0 0 12px" : k === SLICES - 1 ? "0 12px 12px 0" : undefined }}
                >
                  {hasEntered && img && <img src={img.src} alt="" draggable={false} decoding="async" style={{ left: u(-k * share), width: u(aspectRatio), height: u(1) }} />}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {children}
    </div>
  );
}

export default TiltedGridHero;
