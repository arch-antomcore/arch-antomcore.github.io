import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { AnimatedVideoBackdrop } from "./CtaSection";

jest.mock("@/hooks/useTranslation", () => ({ useTranslation: jest.fn() }), { virtual: true });
jest.mock("@/components/site/primitives", () => ({}), { virtual: true });
jest.mock("@/components/aether/GlassMedia", () => ({
  MEDIA: { networkVideo: { src: "/video.mp4", poster: "/poster.jpg" } },
}), { virtual: true });

describe("cinematic CTA video lifecycle", () => {
  let container, root, intersect, hidden;
  let previousObserver, hiddenDescriptor;
  let play, pause, disconnect;

  beforeAll(() => { globalThis.IS_REACT_ACT_ENVIRONMENT = true; });
  beforeEach(() => {
    previousObserver = window.IntersectionObserver;
    hiddenDescriptor = Object.getOwnPropertyDescriptor(document, "hidden");
    hidden = false;
    Object.defineProperty(document, "hidden", { configurable: true, get: () => hidden });
    disconnect = jest.fn();
    window.IntersectionObserver = class {
      constructor(callback) { intersect = callback; }
      observe() {}
      disconnect() { disconnect(); }
    };
    play = jest.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    pause = jest.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });
  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    window.IntersectionObserver = previousObserver;
    if (hiddenDescriptor) Object.defineProperty(document, "hidden", hiddenDescriptor);
    else delete document.hidden;
    jest.restoreAllMocks();
  });

  it("plays nearby, pauses while hidden, resumes visibly, and releases playback on unmount", () => {
    act(() => root.render(<AnimatedVideoBackdrop />));
    expect(play).not.toHaveBeenCalled();
    act(() => intersect([{ isIntersecting: true }]));
    expect(play).toHaveBeenCalledTimes(1);
    hidden = true;
    document.dispatchEvent(new Event("visibilitychange"));
    expect(pause).toHaveBeenCalledTimes(2);
    hidden = false;
    document.dispatchEvent(new Event("visibilitychange"));
    expect(play).toHaveBeenCalledTimes(2);
    act(() => intersect([{ isIntersecting: false }]));
    expect(pause).toHaveBeenCalledTimes(3);
    act(() => root.unmount());
    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(pause).toHaveBeenCalledTimes(4);
    document.dispatchEvent(new Event("visibilitychange"));
    expect(pause).toHaveBeenCalledTimes(4);
    root = createRoot(container);
  });

  it("keeps the video playing when IntersectionObserver is unavailable", () => {
    delete window.IntersectionObserver;
    act(() => root.render(<AnimatedVideoBackdrop />));
    expect(play).toHaveBeenCalledTimes(1);
  });
});
