import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { Magnetic, SpotlightCard } from "./interactions";
import { setMotionPreference } from "../../lib/motionPreference";

jest.mock("react-router-dom", () => ({ Link: "a" }), { virtual: true });
jest.mock("@/lib/motionPreference", () => jest.requireActual("../../lib/motionPreference"), { virtual: true });
jest.mock("framer-motion", () => ({
  motion: { div: "div", span: "span" },
  AnimatePresence: ({ children }) => children,
}));

describe("cinematic pointer interactions", () => {
  let container;
  let root;
  let frames;
  let nextFrame;
  let finePointer;
  let previousMatchMedia;
  let hiddenDescriptor;

  beforeAll(() => { globalThis.IS_REACT_ACT_ENVIRONMENT = true; });
  beforeEach(() => {
    frames = new Map();
    nextFrame = 0;
    finePointer = true;
    previousMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn((query) => ({
      matches: query.includes("pointer: fine") ? finePointer : true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    hiddenDescriptor = Object.getOwnPropertyDescriptor(document, "hidden");
    Object.defineProperty(document, "hidden", { configurable: true, value: false });
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      const id = ++nextFrame;
      frames.set(id, callback);
      return id;
    });
    jest.spyOn(window, "cancelAnimationFrame").mockImplementation((id) => frames.delete(id));
    setMotionPreference("animated");
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });
  afterEach(() => {
    if (root) act(() => root.unmount());
    container.remove();
    setMotionPreference("system");
    window.matchMedia = previousMatchMedia;
    if (hiddenDescriptor) Object.defineProperty(document, "hidden", hiddenDescriptor);
    else delete document.hidden;
    jest.restoreAllMocks();
  });

  const render = () => {
    act(() => root.render(<Magnetic strength={0.25}><button type="button">Contact</button></Magnetic>));
    const wrapper = container.firstElementChild;
    wrapper.getBoundingClientRect = () => ({ left: 10, top: 20, width: 100, height: 40 });
    return wrapper;
  };
  const pointer = (element, type, x = 90, y = 60) => {
    const event = new MouseEvent(type, {
      bubbles: true, clientX: x, clientY: y, relatedTarget: type === "pointerout" ? document.body : null,
    });
    Object.defineProperties(event, { pageX: { value: x }, pageY: { value: y } });
    act(() => element.dispatchEvent(event));
  };
  const flushFrames = () => act(() => {
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach((callback) => callback(16));
  });

  it("animates magnetic buttons with a fine pointer and resets on leave", () => {
    const wrapper = render();
    pointer(wrapper, "pointerover");
    expect(wrapper.style.willChange).toBe("transform");
    pointer(wrapper, "pointermove");
    expect(frames.size).toBe(1);
    flushFrames();
    expect(wrapper.style.transform).toMatch(/^translate3d\(-?\d+\.\d{2}px, -?\d+\.\d{2}px, 0\)$/);
    pointer(wrapper, "pointerout");
    expect(wrapper.style.transform).toBe("");
    expect(wrapper.style.willChange).toBe("");
  });

  it("ignores old reduction settings and cancels work on unmount", () => {
    const wrapper = render();
    pointer(wrapper, "pointermove");
    flushFrames();
    expect(wrapper.style.transform).not.toBe("");
    pointer(wrapper, "pointermove");
    expect(frames.size).toBe(1);
    act(() => setMotionPreference("reduced"));
    expect(frames.size).toBe(1);
    expect(wrapper.style.transform).not.toBe("");
    act(() => root.unmount());
    root = null;
    expect(frames.size).toBe(0);
    expect(wrapper.style.transform).toBe("");
    expect(wrapper.style.willChange).toBe("");
  });

  it("coalesces pointer bursts into one frame using the latest coordinates", () => {
    const wrapper = render();
    window.requestAnimationFrame.mockClear();
    window.cancelAnimationFrame.mockClear();
    pointer(wrapper, "pointermove", 70, 40);
    pointer(wrapper, "pointermove", 80, 50);
    pointer(wrapper, "pointermove", 90, 60);
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1);
    expect(window.cancelAnimationFrame).not.toHaveBeenCalled();
    flushFrames();
    expect(wrapper.style.transform).toBe("translate3d(7.50px, 5.00px, 0)");
  });

  it("shares one visibility listener across all interactive elements", () => {
    const addListener = jest.spyOn(document, "addEventListener");
    const removeListener = jest.spyOn(document, "removeEventListener");
    act(() => root.render(<><Magnetic>First</Magnetic><Magnetic>Second</Magnetic><SpotlightCard>Third</SpotlightCard></>));
    expect(addListener.mock.calls.filter(([event]) => event === "visibilitychange")).toHaveLength(1);
    act(() => root.unmount());
    root = null;
    expect(removeListener.mock.calls.filter(([event]) => event === "visibilitychange")).toHaveLength(1);
  });

  it("does not track a coarse pointer or promote its layer", () => {
    finePointer = false;
    const wrapper = render();
    pointer(wrapper, "pointerover");
    pointer(wrapper, "pointermove");
    expect(frames.size).toBe(0);
    expect(wrapper.style.transform).toBe("");
    expect(wrapper.style.willChange).toBe("");
  });

  it("tilts a card with finite pointer work and resets on leave", () => {
    act(() => root.render(<SpotlightCard>Details</SpotlightCard>));
    const card = container.firstElementChild;
    card.getBoundingClientRect = () => ({ left: 10, top: 20, width: 100, height: 40 });
    pointer(card, "pointerover");
    pointer(card, "pointermove");
    expect(frames.size).toBe(1);
    flushFrames();
    expect(card.style.transform).toContain("rotateX(-2.50deg) rotateY(1.50deg)");
    expect(frames.size).toBe(0);
    pointer(card, "pointerout");
    expect(card.style.transform).toBe("");
    expect(card.style.willChange).toBe("");
  });

  it("preserves the 3D transform context alongside caller styles", () => {
    act(() => root.render(<SpotlightCard style={{ opacity: 0.8 }}>Details</SpotlightCard>));
    expect(container.firstElementChild.style.opacity).toBe("0.8");
    expect(container.firstElementChild.style.transformStyle).toBe("preserve-3d");
  });

  it("cancels a pending card tilt when the page becomes hidden", () => {
    act(() => root.render(<SpotlightCard>Details</SpotlightCard>));
    const card = container.firstElementChild;
    card.getBoundingClientRect = () => ({ left: 10, top: 20, width: 100, height: 40 });
    pointer(card, "pointermove");
    expect(frames.size).toBe(1);
    act(() => {
      Object.defineProperty(document, "hidden", { configurable: true, value: true });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(frames.size).toBe(0);
    expect(card.style.transform).toBe("");
    expect(card.style.willChange).toBe("");
  });

  it("does not tilt a card on coarse pointers or when explicitly disabled", () => {
    finePointer = false;
    act(() => root.render(<SpotlightCard>Details</SpotlightCard>));
    const card = container.firstElementChild;
    pointer(card, "pointerover");
    pointer(card, "pointermove");
    expect(frames.size).toBe(0);
    expect(card.style.transform).toBe("");
    expect(card.style.willChange).toBe("");
    act(() => root.render(<SpotlightCard enableTilt={false}>Details</SpotlightCard>));
    pointer(card, "pointermove");
    expect(frames.size).toBe(0);
  });
});
