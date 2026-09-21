import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { BlogEventCarousel, getNextCarouselIndex } from "./BlogEventCarousel";

jest.mock("../../hooks/useTranslation", () => ({
  useTranslation: () => ({ language: "pt" }),
}));

jest.mock("@phosphor-icons/react", () => {
  const mockReact = require("react");
  const Icon = ({ children, ...props }) => mockReact.createElement("svg", props, children);
  return {
    ArrowUpRight: Icon,
    Broadcast: Icon,
    CalendarBlank: Icon,
    CaretLeft: Icon,
    CaretRight: Icon,
    Code: Icon,
    Cpu: Icon,
    Fire: Icon,
    Lightning: Icon,
    Rocket: Icon,
    ShieldCheck: Icon,
    Sparkle: Icon,
  };
});

jest.mock("framer-motion", () => ({
  AnimatePresence: ({ children }) => children,
  motion: { div: "div" },
}));

describe("BlogEventCarousel navigation", () => {
  let container;
  let root;
  let originalRaf;
  let originalCancelRaf;

  beforeAll(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  });

  beforeEach(() => {
    jest.useFakeTimers();
    originalRaf = window.requestAnimationFrame;
    originalCancelRaf = window.cancelAnimationFrame;
    window.requestAnimationFrame = (callback) => window.setTimeout(() => callback(Date.now()), 16);
    window.cancelAnimationFrame = (id) => window.clearTimeout(id);

    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    window.requestAnimationFrame = originalRaf;
    window.cancelAnimationFrame = originalCancelRaf;
    jest.useRealTimers();
  });

  const setupTrackMetrics = () => {
    const track = container.querySelector(".overflow-x-auto");
    const cards = Array.from(container.querySelectorAll(".event-carousel-card"));

    Object.defineProperties(track, {
      clientWidth: { configurable: true, value: 1000 },
      clientLeft: { configurable: true, value: 0 },
      scrollWidth: { configurable: true, value: 2100 },
      scrollLeft: { configurable: true, writable: true, value: 0 },
    });

    cards.forEach((card, index) => {
      Object.defineProperty(card, "offsetLeft", {
        configurable: true,
        value: index * 424,
      });
    });

    track.scrollTo = jest.fn(({ left }) => {
      track.requestedScrollLeft = left;
    });

    return { track, cards };
  };

  const selectedIndex = (cards) =>
    cards.findIndex((card) => card.className.includes("bg-[#f7f4ec]"));

  it("clamps arrow targets instead of wrapping around", () => {
    expect(getNextCarouselIndex(0, "left", 5)).toBe(0);
    expect(getNextCarouselIndex(0, "right", 5)).toBe(1);
    expect(getNextCarouselIndex(4, "right", 5)).toBe(4);
    expect(getNextCarouselIndex(2, "left", 0)).toBe(0);
  });

  it("renders verified product milestones and the planned community opening", () => {
    act(() => {
      root.render(<BlogEventCarousel />);
    });

    const content = container.textContent;
    expect(content).toContain("Aether Runtime Kernel");
    expect(content).toContain("Quintessence e Telegram");
    expect(content).toContain("Código aberto, com governança");
    expect(content).toContain("GitHub público");
    expect(content).not.toContain("Multi-Agent Swarm");
    expect(content).not.toContain("120 FPS");
  });

  it("keeps the latest target when arrows are clicked rapidly", () => {
    act(() => {
      root.render(<BlogEventCarousel />);
    });

    const { track, cards } = setupTrackMetrics();
    act(() => {
      jest.advanceTimersByTime(20);
    });

    const next = container.querySelector('[aria-label="Next card"]');
    act(() => {
      next.click();
      next.click();
    });

    expect(track.scrollTo).toHaveBeenLastCalledWith({ left: 848, behavior: "smooth" });
    expect(selectedIndex(cards)).toBe(2);

    // The first click's old settle timer must not unlock the second movement.
    act(() => {
      jest.advanceTimersByTime(700);
    });
    expect(selectedIndex(cards)).toBe(2);

    track.scrollLeft = 848;
    act(() => {
      track.dispatchEvent(new Event("scroll"));
      jest.advanceTimersByTime(32);
    });
    expect(selectedIndex(cards)).toBe(2);
  });

  it("moves one card at a time in both directions and supports direct indicators", () => {
    act(() => {
      root.render(<BlogEventCarousel />);
    });

    const { track, cards } = setupTrackMetrics();
    act(() => {
      jest.advanceTimersByTime(20);
    });

    const next = container.querySelector('[aria-label="Next card"]');
    const previous = container.querySelector('[aria-label="Previous card"]');

    act(() => next.click());
    expect(selectedIndex(cards)).toBe(1);
    track.scrollLeft = 424;
    act(() => {
      track.dispatchEvent(new Event("scroll"));
      jest.advanceTimersByTime(32);
    });

    act(() => previous.click());
    expect(selectedIndex(cards)).toBe(0);

    const lastIndicator = container.querySelector('[aria-label="Jump to announcement 5"]');
    act(() => lastIndicator.click());
    expect(selectedIndex(cards)).toBe(4);
    track.scrollLeft = 1100;
    act(() => {
      track.dispatchEvent(new Event("scroll"));
      jest.advanceTimersByTime(32);
    });
    expect(next.disabled).toBe(true);
  });

  it("keeps both final cards selectable when they share the end scroll position", () => {
    act(() => {
      root.render(<BlogEventCarousel />);
    });

    const { track, cards } = setupTrackMetrics();
    act(() => {
      jest.advanceTimersByTime(20);
    });

    const next = container.querySelector('[aria-label="Next card"]');

    act(() => {
      next.click();
      next.click();
      next.click();
    });
    expect(selectedIndex(cards)).toBe(3);

    track.scrollLeft = 1100;
    act(() => {
      track.dispatchEvent(new Event("scroll"));
      jest.advanceTimersByTime(32);
    });
    expect(selectedIndex(cards)).toBe(3);

    act(() => next.click());
    expect(selectedIndex(cards)).toBe(4);
    act(() => {
      jest.advanceTimersByTime(32);
    });
    expect(next.disabled).toBe(true);
  });
});
