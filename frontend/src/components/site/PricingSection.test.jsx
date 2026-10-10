import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { PlanCard } from "./PricingSection";

const mockMotionValues = [];
jest.mock("framer-motion", () => {
  const ReactModule = jest.requireActual("react");
  const components = {};
  return {
    motion: new Proxy({}, { get: (_, tag) => components[tag] ||= ReactModule.forwardRef(
      ({ initial, animate, exit, variants, custom, viewport, whileInView, transition, style, ...props }, ref) =>
        ReactModule.createElement(tag, { ...props, ref, style: { ...style, rotateX: undefined, rotateY: undefined } }),
    ) }),
    AnimatePresence: ({ children }) => children,
    useMotionValue: (initial) => {
      const ref = ReactModule.useRef();
      if (!ref.current) {
        let value = initial;
        ref.current = { get: () => value, set: jest.fn((next) => { value = next; }) };
        mockMotionValues.push(ref.current);
      }
      return ref.current;
    },
    useSpring: (value) => value,
  };
});
jest.mock("@/lib/motionPreference", () => ({ useReducedMotion: () => false }), { virtual: true });
jest.mock("@/hooks/useTranslation", () => ({}), { virtual: true });
jest.mock("@/components/site/primitives", () => ({}), { virtual: true });
jest.mock("@/components/ui/tiles", () => ({}), { virtual: true });
jest.mock("@/components/site/interactions", () => ({ Magnetic: ({ children }) => children }), { virtual: true });
jest.mock("react-router-dom", () => {
  const ReactModule = jest.requireActual("react");
  return { Link: ({ to, ...props }) => ReactModule.createElement("a", { ...props, href: to }) };
}, { virtual: true });

describe("pricing pointer work", () => {
  let container, root, card, frames, nextFrame, renders;
  const plan = { id: "go", name: "Go", priceMonthly: 10, priceYearly: 96, features: [] };
  beforeAll(() => { globalThis.IS_REACT_ACT_ENVIRONMENT = true; });
  beforeEach(() => {
    mockMotionValues.length = 0;
    frames = new Map();
    nextFrame = 0;
    renders = jest.fn();
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      const id = ++nextFrame;
      frames.set(id, callback);
      return id;
    });
    jest.spyOn(window, "cancelAnimationFrame").mockImplementation((id) => frames.delete(id));
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => root.render(<React.Profiler id="card" onRender={renders}>
      <PlanCard plan={plan} index={0} isAnnual={false} lang="pt" labels={{ getStarted: "Começar" }} />
    </React.Profiler>));
    card = container.querySelector("[data-plan]");
    card.getBoundingClientRect = jest.fn(() => ({ left: 0, top: 0, width: 200, height: 200 }));
    renders.mockClear();
  });
  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    jest.restoreAllMocks();
  });

  it("coalesces pointer events, uses the newest position and avoids React commits", () => {
    act(() => {
      card.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, clientX: 100, clientY: 100 }));
      card.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, clientX: 200, clientY: 0 }));
    });
    expect(frames.size).toBe(1);
    act(() => { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach((callback) => callback()); });
    expect(card.getBoundingClientRect).toHaveBeenCalledTimes(1);
    expect(mockMotionValues.map((value) => value.get())).toEqual([6, 6]);
    expect(renders).not.toHaveBeenCalled();
  });

  it("cancels pending pointer work when unmounted", () => {
    card.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, clientX: 200, clientY: 0 }));
    expect(frames.size).toBe(1);
    act(() => root.unmount());
    expect(frames.size).toBe(0);
    root = createRoot(container);
  });
});
