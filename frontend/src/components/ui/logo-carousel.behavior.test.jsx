import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { LogoCarousel } from "./infinite-slider";

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
    useReducedMotion: () => false,
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

describe("LogoCarousel experience profiles", () => {
  let container;
  let root;

  beforeAll(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  });

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(Math, "random").mockReturnValue(0.5);
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it("cycles the animated profile while leaving the light profile static", () => {
    act(() => {
      root.render(<LogoCarousel columnCount={3} logos={logos} />);
    });

    const carousel = container.querySelector('[data-testid="logo-carousel"]');
    const firstImage = () => container.querySelector('[data-testid="logo-carousel-column"] img').alt;
    const animatedInitialLogo = firstImage();

    expect(carousel.dataset.carouselMode).toBe("animated");

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(firstImage()).not.toBe(animatedInitialLogo);

    act(() => {
      root.render(<LogoCarousel columnCount={3} logos={logos} isStatic />);
    });

    const staticInitialLogo = firstImage();
    expect(carousel.dataset.carouselMode).toBe("static");

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(firstImage()).toBe(staticInitialLogo);
  });
});
