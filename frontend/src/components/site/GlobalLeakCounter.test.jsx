import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/motionPreference";
import leakStats from "../../../public/data/leak-stats.json";
import GlobalLeakCounter from "./GlobalLeakCounter";

jest.mock("framer-motion", () => ({ useInView: jest.fn() }));
jest.mock("@/lib/motionPreference", () => ({ useReducedMotion: jest.fn() }), { virtual: true });
jest.mock("@/components/site/primitives", () => ({ Reveal: ({ children }) => children }), { virtual: true });
jest.mock("@/components/animated-blur-number", () => {
  const ReactModule = jest.requireActual("react");
  return {
    __esModule: true,
    default: ({ value, locale }) => ReactModule.createElement("span", {}, value.toLocaleString(locale)),
  };
}, { virtual: true });
jest.mock("@phosphor-icons/react", () => {
  const ReactModule = jest.requireActual("react");
  const Icon = () => ReactModule.createElement("svg", { "aria-hidden": true });
  return { ShieldWarning: Icon, ArrowSquareOut: Icon };
});

describe("GlobalLeakCounter source integrity", () => {
  const fallback = (17667901961).toLocaleString("pt-BR");
  let container;
  let root;
  let originalFetch;

  beforeAll(() => { globalThis.IS_REACT_ACT_ENVIRONMENT = true; });

  beforeEach(() => {
    jest.useFakeTimers();
    useInView.mockReturnValue(true);
    useReducedMotion.mockReturnValue(false);
    originalFetch = global.fetch;
    global.fetch = jest.fn();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    global.fetch = originalFetch;
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  const number = () => container.querySelector("#leak-counter-title").textContent;
  const render = () => act(async () => { root.render(<GlobalLeakCounter />); });

  it("shows the real source value and never invents increments as time passes", async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => leakStats });
    await render();

    expect(global.fetch).toHaveBeenCalledWith("/data/leak-stats.json", { signal: expect.any(AbortSignal) });
    expect(number()).toBe(leakStats.totalPwnCount.toLocaleString("pt-BR"));
    act(() => jest.advanceTimersByTime(10000));
    expect(number()).toBe(leakStats.totalPwnCount.toLocaleString("pt-BR"));
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it.each([0, -1, 12.5, Number.MAX_SAFE_INTEGER + 1, "17845484926", undefined])(
    "retains the fallback when the source count is invalid (%s)",
    async (totalPwnCount) => {
      global.fetch.mockResolvedValue({ ok: true, json: async () => ({ totalPwnCount }) });
      await render();
      expect(number()).toBe(fallback);
      act(() => jest.advanceTimersByTime(10000));
      expect(number()).toBe(fallback);
    },
  );

  it("rejects a non-OK response without reading its body", async () => {
    const json = jest.fn(async () => leakStats);
    global.fetch.mockResolvedValue({ ok: false, json });
    await render();
    expect(json).not.toHaveBeenCalled();
    expect(number()).toBe(fallback);
    act(() => jest.advanceTimersByTime(10000));
    expect(number()).toBe(fallback);
  });

  it("keeps the fallback if the source request fails", async () => {
    global.fetch.mockRejectedValue(new Error("Network unavailable"));
    await render();
    expect(number()).toBe(fallback);
  });

  it("keeps the received value equally stable with reduced motion", async () => {
    useReducedMotion.mockReturnValue(true);
    useInView.mockReturnValue(false);
    global.fetch.mockResolvedValue({ ok: true, json: async () => leakStats });
    await render();
    expect(number()).toBe(leakStats.totalPwnCount.toLocaleString("pt-BR"));
    act(() => jest.advanceTimersByTime(10000));
    expect(number()).toBe(leakStats.totalPwnCount.toLocaleString("pt-BR"));
  });
});
