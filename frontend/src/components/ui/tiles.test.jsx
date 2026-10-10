import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { Tiles } from "./tiles";

describe("interactive tiles pointer work", () => {
  let container;
  let root;
  let frames;
  let frameId;
  let originalMatchMedia;

  beforeAll(() => { globalThis.IS_REACT_ACT_ENVIRONMENT = true; });
  beforeEach(() => {
    frames = new Map();
    frameId = 0;
    originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn(() => ({ matches: true }));
    jest.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ left: 0, top: 0, width: 96, height: 96 });
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      const id = ++frameId;
      frames.set(id, callback);
      return id;
    });
    jest.spyOn(window, "cancelAnimationFrame").mockImplementation((id) => frames.delete(id));
    global.ResizeObserver = class { observe() {} disconnect() {} };
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => root.render(<div className="surface"><Tiles /></div>));
  });
  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    window.matchMedia = originalMatchMedia;
    delete global.ResizeObserver;
    jest.restoreAllMocks();
  });

  const pointer = (type, pointerType = "mouse", x = 20) => {
    const event = new MouseEvent(type, { bubbles: true, clientX: x, clientY: 20 });
    Object.defineProperty(event, "pointerType", { value: pointerType });
    act(() => container.firstElementChild.dispatchEvent(event));
  };

  it("coalesces pointer movement and highlights the latest tile", () => {
    pointer("pointermove", "mouse", 20);
    pointer("pointermove", "mouse", 70);
    expect(frames.size).toBe(1);
    act(() => {
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach((callback) => callback(16));
    });
    expect(container.querySelectorAll('[data-active="true"]')).toHaveLength(1);
    expect(container.querySelectorAll(".aether-tiles__cell")[1].dataset.active).toBe("true");
  });

  it.each(["pointerleave", "pointercancel"])("cancels pending work on %s", (type) => {
    pointer("pointermove");
    expect(frames.size).toBe(1);
    pointer(type);
    expect(frames.size).toBe(0);
    expect(container.querySelector('[data-active="true"]')).toBeNull();
  });

  it("cancels a queued mouse highlight when touch input replaces it", () => {
    pointer("pointermove");
    pointer("pointermove", "touch");
    expect(frames.size).toBe(0);
    expect(container.querySelector('[data-active="true"]')).toBeNull();
  });
});
