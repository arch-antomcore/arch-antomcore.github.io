import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { useReducedMotion } from "../../lib/motionPreference";
import { LogoCarousel } from "./infinite-slider";

jest.mock("../../lib/motionPreference", () => ({ useReducedMotion: jest.fn(() => false) }));

jest.mock("framer-motion", () => {
  const ReactModule = jest.requireActual("react");
  const cache = {};
  const motion = new Proxy({}, {
    get: (_target, tag) => {
      if (!cache[tag]) {
        const MockMotion = ReactModule.forwardRef(({
          animate,
          children,
          exit,
          initial,
          transition,
          ...domProps
        }, ref) => ReactModule.createElement(tag, { ...domProps, ref }, children));
        MockMotion.displayName = `MockMotion(${String(tag)})`;
        cache[tag] = MockMotion;
      }
      return cache[tag];
    },
  });

  return {
    AnimatePresence: ({ children }) => children,
    motion,
  };
});

const logos = [
  { id: 1, name: "Rust", src: "/stack/rust.svg" },
  { id: 2, name: "Tokio", src: "/stack/tokio.svg" },
  { id: 3, name: "Axum", src: "/stack/axum.svg" },
  { id: 4, name: "SQLite", src: "/stack/sqlite.webp" },
  { id: 5, name: "React", src: "/stack/react.svg" },
  { id: 6, name: "TypeScript", src: "/stack/typescript.svg" },
];

describe("LogoCarousel playback", () => {
  let container;
  let root;
  let visibilityDescriptor;
  let intersections;
  let disconnect;

  beforeAll(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  });

  beforeEach(() => {
    useReducedMotion.mockReturnValue(false);
    jest.useFakeTimers();
    jest.spyOn(Math, "random").mockReturnValue(0.5);
    visibilityDescriptor = Object.getOwnPropertyDescriptor(document, "hidden");
    Object.defineProperty(document, "hidden", { configurable: true, value: false });
    disconnect = jest.fn();
    global.IntersectionObserver = class {
      constructor(callback) { intersections = callback; }
      observe() { intersections([{ isIntersecting: true }]); }
      disconnect() { disconnect(); }
    };
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    if (root) act(() => root.unmount());
    container.remove();
    if (visibilityDescriptor) Object.defineProperty(document, "hidden", visibilityDescriptor);
    else delete document.hidden;
    delete global.IntersectionObserver;
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  const render = (props = {}) => act(() => root.render(<LogoCarousel columnCount={3} logos={logos} {...props} />));
  const carousel = () => container.querySelector('[data-testid="logo-carousel"]');
  const firstImage = () => container.querySelector('[data-testid="logo-carousel-column"] img').alt;

  it("cycles all three columns in the single animated version", () => {
    act(() => {
      root.render(<LogoCarousel columnCount={3} logos={logos} />);
    });

    const animatedInitialLogo = firstImage();

    expect(carousel().dataset.carouselMode).toBe("animated");
    expect(carousel().dataset.carouselState).toBe("playing");
    expect(carousel().hasAttribute("data-carousel-profile")).toBe(false);
    expect(container.querySelectorAll('[data-testid="logo-carousel-column"]')).toHaveLength(3);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(firstImage()).not.toBe(animatedInitialLogo);

    render({ isStatic: true });
    const staticInitialLogo = firstImage();
    expect(carousel().dataset.carouselMode).toBe("static");
    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(firstImage()).toBe(staticInitialLogo);
  });

  it("freezes the same composition for reduced motion and resumes when allowed", () => {
    useReducedMotion.mockReturnValue(true);
    render();
    const initialLogo = firstImage();
    expect(carousel().dataset.carouselMode).toBe("static");
    expect(carousel().dataset.carouselState).toBe("static");
    act(() => jest.advanceTimersByTime(4000));
    expect(firstImage()).toBe(initialLogo);

    useReducedMotion.mockReturnValue(false);
    render();
    expect(carousel().dataset.carouselMode).toBe("animated");
    act(() => jest.advanceTimersByTime(2000));
    expect(firstImage()).not.toBe(initialLogo);
  });

  it("pauses outside the viewport and resumes from the elapsed cycle time", () => {
    render();
    const initialLogo = firstImage();
    act(() => jest.advanceTimersByTime(1000));
    act(() => intersections([{ isIntersecting: false }]));
    expect(carousel().dataset.carouselState).toBe("paused");
    act(() => jest.advanceTimersByTime(6000));
    expect(firstImage()).toBe(initialLogo);
    act(() => intersections([{ isIntersecting: true }]));
    expect(carousel().dataset.carouselState).toBe("playing");
    act(() => jest.advanceTimersByTime(900));
    expect(firstImage()).toBe(initialLogo);
    act(() => jest.advanceTimersByTime(100));
    expect(firstImage()).not.toBe(initialLogo);
  });

  it("does not advance in a hidden tab or resume while still outside the viewport", () => {
    render();
    const initialLogo = firstImage();
    act(() => {
      Object.defineProperty(document, "hidden", { configurable: true, value: true });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(carousel().dataset.carouselState).toBe("paused");
    act(() => jest.advanceTimersByTime(6000));
    expect(firstImage()).toBe(initialLogo);
    act(() => intersections([{ isIntersecting: false }]));
    act(() => {
      Object.defineProperty(document, "hidden", { configurable: true, value: false });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(carousel().dataset.carouselState).toBe("paused");
    act(() => jest.advanceTimersByTime(2000));
    expect(firstImage()).toBe(initialLogo);
    act(() => intersections([{ isIntersecting: true }]));
    act(() => jest.advanceTimersByTime(2000));
    expect(firstImage()).not.toBe(initialLogo);
  });

  it("cleans up its clock, observer, and tab listener on unmount", () => {
    const removeListener = jest.spyOn(document, "removeEventListener");
    render();
    expect(jest.getTimerCount()).toBe(1);
    act(() => root.unmount());
    root = null;
    expect(jest.getTimerCount()).toBe(0);
    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(removeListener).toHaveBeenCalledWith("visibilitychange", expect.any(Function));
  });
});
