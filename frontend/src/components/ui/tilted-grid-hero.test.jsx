import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { TiltedGridHero } from "./tilted-grid-hero";
import { MOTION_STORAGE_KEY, setMotionPreference } from "../../lib/motionPreference";

const images = Array.from({ length: 7 }, (_, index) => ({ src: `/screen-${index}.png`, alt: `Screen ${index}` }));

describe("curved screenshot reel", () => {
  let container;
  let root;
  let visibilityDescriptor;
  let intersections;
  let resize;
  let preference;
  let preferenceListeners;

  beforeAll(() => { globalThis.IS_REACT_ACT_ENVIRONMENT = true; });

  beforeEach(() => {
    window.localStorage.removeItem(MOTION_STORAGE_KEY);
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    visibilityDescriptor = Object.getOwnPropertyDescriptor(document, "hidden");
    Object.defineProperty(document, "hidden", { configurable: true, value: false });
    preferenceListeners = new Set();
    preference = {
      matches: false,
      addEventListener: (_type, listener) => preferenceListeners.add(listener),
      removeEventListener: (_type, listener) => preferenceListeners.delete(listener),
    };
    window.matchMedia = jest.fn(() => preference);
    global.ResizeObserver = class {
      constructor(callback) { this.callback = callback; resize = callback; }
      observe() { this.callback([{ contentRect: { width: 1200, height: 560 } }]); }
      disconnect() {}
    };
    global.IntersectionObserver = class {
      constructor(callback) { intersections = callback; }
      observe() { intersections([{ isIntersecting: true }]); }
      disconnect() {}
    };
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    window.localStorage.removeItem(MOTION_STORAGE_KEY);
    if (visibilityDescriptor) Object.defineProperty(document, "hidden", visibilityDescriptor);
    else delete document.hidden;
    delete global.ResizeObserver;
    delete global.IntersectionObserver;
    jest.restoreAllMocks();
  });

  const render = (props = {}) => act(() => root.render(<TiltedGridHero images={images} {...props} />));
  const reel = () => container.querySelector(".tilted-grid-hero");
  const tiles = () => [...container.querySelectorAll(".tilted-grid-tile")];

  it("keeps every facet on the same screenshot and updates only the wrapping tile", () => {
    render();
    const first = tiles()[0];
    const secondSource = tiles()[1].querySelector("img").getAttribute("src");
    expect(first.querySelectorAll("img")).toHaveLength(16);
    expect(new Set([...first.querySelectorAll("img")].map((img) => img.getAttribute("src"))).size).toBe(1);
    expect(container.querySelector(".tilted-grid-band").getAttribute("aria-hidden")).toBe("true");

    const event = new Event("animationiteration", { bubbles: true });
    Object.defineProperty(event, "elapsedTime", { value: tiles().length * 4 });
    act(() => first.dispatchEvent(event));
    const nextIndex = (tiles().length * 2 - 1) % images.length;
    expect([...first.querySelectorAll("img")].every((img) => img.getAttribute("src") === images[nextIndex].src)).toBe(true);
    expect(tiles()[1].querySelector("img").getAttribute("src")).toBe(secondSource);
  });

  it("preserves its composition while paused manually, offscreen, or in a hidden tab", () => {
    render();
    const initialSources = tiles().map((tile) => tile.querySelector("img").getAttribute("src"));
    expect(reel().dataset.carouselState).toBe("playing");
    render({ paused: true });
    expect(reel().dataset.carouselState).toBe("paused");
    expect(tiles().every((tile) => tile.style.animationPlayState === "paused")).toBe(true);
    render();
    act(() => intersections([{ isIntersecting: false }]));
    expect(reel().dataset.carouselState).toBe("paused");
    act(() => intersections([{ isIntersecting: true }]));
    expect(reel().dataset.carouselState).toBe("playing");
    act(() => {
      Object.defineProperty(document, "hidden", { configurable: true, value: true });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(reel().dataset.carouselState).toBe("paused");
    expect(tiles().map((tile) => tile.querySelector("img").getAttribute("src"))).toEqual(initialSources);
  });

  it("reacts to the system motion preference without removing the band", () => {
    render();
    act(() => { preference.matches = true; preferenceListeners.forEach((listener) => listener()); });
    expect(reel().dataset.carouselState).toBe("paused");
    expect(tiles().length).toBeGreaterThan(1);
    act(() => { preference.matches = false; preferenceListeners.forEach((listener) => listener()); });
    expect(reel().dataset.carouselState).toBe("playing");
  });

  it("keeps the explicit pause state when responsive geometry changes", () => {
    render({ paused: true });
    act(() => resize([{ contentRect: { width: 375, height: 300 } }]));
    expect(reel().dataset.carouselState).toBe("paused");
    expect(tiles().every((tile) => tile.style.animationPlayState === "paused")).toBe(true);
    expect(tiles().every((tile) => tile.style.animationName.startsWith("tgh-orbit-") && tile.style.animationDuration.endsWith("s") && tile.style.animationIterationCount === "infinite")).toBe(true);
    expect(tiles().every((tile) => tile.style.animation === "")).toBe(true);
    render();
    expect(tiles().every((tile) => tile.style.animationPlayState === "running")).toBe(true);
  });

  it("preserves an explicit animation opt-in over a system reduction preference", () => {
    preference.matches = true;
    render();
    expect(reel().dataset.carouselState).toBe("paused");
    act(() => setMotionPreference("animated"));
    expect(reel().dataset.carouselState).toBe("playing");
    act(() => setMotionPreference("reduced"));
    expect(reel().dataset.carouselState).toBe("paused");
    act(() => setMotionPreference("system"));
    expect(reel().dataset.carouselState).toBe("paused");
  });
});
