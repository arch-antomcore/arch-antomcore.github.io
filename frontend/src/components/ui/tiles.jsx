import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../lib/motionPreference";
import "./tiles.css";

const MAX_TILES = 512;
const TILE_SIZES = { sm: [32, 32], md: [36, 48], lg: [48, 64] };

function getGeometry(width, height, tileSize, rows, cols) {
  const sizes = TILE_SIZES[tileSize] || TILE_SIZES.md;
  let size = sizes[width < 640 ? 0 : 1];
  const requestedRows = Number.isFinite(rows) && rows > 0 ? Math.min(MAX_TILES, Math.ceil(rows)) : null;
  const requestedCols = Number.isFinite(cols) && cols > 0 ? Math.min(MAX_TILES, Math.ceil(cols)) : null;
  let rowCount = requestedRows || Math.max(1, Math.ceil(height / size));
  let colCount = requestedCols || Math.max(1, Math.ceil(width / size));

  if (!requestedRows && !requestedCols) {
    while (rowCount * colCount > MAX_TILES) {
      size += 2;
      rowCount = Math.max(1, Math.ceil(height / size));
      colCount = Math.max(1, Math.ceil(width / size));
    }
  } else if (rowCount * colCount > MAX_TILES) {
    const scale = Math.sqrt(MAX_TILES / (rowCount * colCount));
    rowCount = Math.max(1, Math.floor(rowCount * scale));
    colCount = Math.max(1, Math.floor(colCount * scale));
    while (rowCount * colCount > MAX_TILES) {
      if (rowCount > colCount) rowCount -= 1;
      else colCount -= 1;
    }
  }

  return { size, rows: rowCount, cols: colCount };
}

/** Decorative grid. Its parent receives pointer movement, so this layer never blocks links. */
export function Tiles({ className, rows, cols, tileClassName, tileSize = "md", variant = "blue" }) {
  const gridRef = useRef(null);
  const cellsRef = useRef([]);
  const shouldReduceMotion = useReducedMotion();
  const [geometry, setGeometry] = useState({ size: 48, rows: 0, cols: 0 });

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;
    const measure = () => {
      const { width, height } = grid.getBoundingClientRect();
      if (!width || !height) return;
      const next = getGeometry(width, height, tileSize, rows, cols);
      setGeometry((previous) => previous.size === next.size && previous.rows === next.rows && previous.cols === next.cols ? previous : next);
    };
    measure();
    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(measure);
      observer.observe(grid);
      return () => observer.disconnect();
    }
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [rows, cols, tileSize]);

  useEffect(() => {
    const grid = gridRef.current;
    const surface = grid?.parentElement;
    if (!surface || shouldReduceMotion || !geometry.rows) return undefined;
    const finePointer = window.matchMedia?.("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let activeCell = null;
    let pointer = null;
    const clear = () => {
      if (activeCell) activeCell.dataset.active = "false";
      activeCell = null;
    };
    const update = () => {
      frame = 0;
      if (!pointer || document.hidden) { clear(); return; }
      const rect = grid.getBoundingClientRect();
      const x = pointer.x - rect.left;
      const y = pointer.y - rect.top;
      if (x < 0 || y < 0 || x >= rect.width || y >= rect.height) { clear(); return; }
      const col = Math.floor(x / geometry.size);
      const row = Math.floor(y / geometry.size);
      const cell = col < geometry.cols && row < geometry.rows ? cellsRef.current[row * geometry.cols + col] : null;
      if (cell === activeCell) return;
      clear();
      if (cell) { cell.dataset.active = "true"; activeCell = cell; }
    };
    const move = (event) => {
      if (event.pointerType === "touch" || finePointer?.matches === false) { clear(); return; }
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const leave = () => { pointer = null; clear(); };
    surface.addEventListener("pointermove", move, { passive: true });
    surface.addEventListener("pointerleave", leave, { passive: true });
    document.addEventListener("visibilitychange", leave);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      clear();
      surface.removeEventListener("pointermove", move);
      surface.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", leave);
    };
  }, [geometry, shouldReduceMotion]);

  return (
    <div
      ref={gridRef}
      className={cn("aether-tiles", variant === "paper" && "aether-tiles--paper", className)}
      aria-hidden="true"
      data-tile-count={geometry.rows * geometry.cols}
      data-tile-motion={shouldReduceMotion ? "reduced" : "animated"}
      style={{ "--tiles-size": `${geometry.size}px`, "--tiles-columns": geometry.cols }}
    >
      <div className="aether-tiles__grid">
        {Array.from({ length: geometry.rows * geometry.cols }, (_, index) => (
          <div
            key={index}
            ref={(cell) => { cellsRef.current[index] = cell; }}
            className={cn("aether-tiles__cell", tileClassName)}
          />
        ))}
      </div>
    </div>
  );
}

export default Tiles;
