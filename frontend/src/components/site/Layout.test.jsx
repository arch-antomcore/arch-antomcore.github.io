import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { useLocation } from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";
import { initGsapReveals } from "@/lib/gsap";
import { initScrollAnimations } from "@/lib/scrollAnimations";
import Layout from "./Layout";

jest.mock("react-router-dom", () => ({ Outlet: () => null, useLocation: jest.fn() }), { virtual: true });
jest.mock("lenis/react", () => ({ ReactLenis: jest.fn(({ children }) => children), useLenis: jest.fn() }), { virtual: true });
jest.mock("@/lib/motionPreference", () => jest.requireActual("../../lib/motionPreference"), { virtual: true });
jest.mock("@/hooks/useTranslation", () => ({ useTranslation: () => ({ language: "pt" }) }), { virtual: true });
jest.mock("@/context/ExperienceContext", () => ({ ExperienceProvider: ({ children }) => children }), { virtual: true });
jest.mock("@/components/site/Nav", () => () => null, { virtual: true });
jest.mock("@/components/site/Footer", () => () => null, { virtual: true });
jest.mock("@/components/aether/SectionRail", () => () => null, { virtual: true });
jest.mock("@/components/ui/modern-mobile-menu", () => ({ InteractiveMenu: () => null }), { virtual: true });
jest.mock("@/components/ui/tiles", () => ({ Tiles: () => null }), { virtual: true });
jest.mock("@/lib/gsap", () => ({ initGsapReveals: jest.fn(() => () => {}) }), { virtual: true });
jest.mock("@/lib/scrollAnimations", () => ({ initScrollAnimations: jest.fn(() => () => {}) }), { virtual: true });
jest.mock("@/lib/seo", () => ({ applyRouteSeo: jest.fn() }), { virtual: true });

describe("shared route scrolling", () => {
  let container;
  let root;
  let lenis;

  beforeAll(() => { globalThis.IS_REACT_ACT_ENVIRONMENT = true; });
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    ReactLenis.mockImplementation(({ children }) => children);
    jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    lenis = { resize: jest.fn(), scrollTo: jest.fn() };
    useLenis.mockReturnValue(lenis);
    useLocation.mockReturnValue({ pathname: "/", hash: "", key: "initial" });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });
  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    document.getElementById("cta")?.remove();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });
  const render = () => act(() => root.render(<Layout />));

  it("returns to the top when a dock or Link revisits the already-current route", () => {
    render();
    lenis.scrollTo.mockClear();
    useLocation.mockReturnValue({ pathname: "/", hash: "", key: "repeat-home" });
    render();
    expect(lenis.scrollTo).toHaveBeenCalledTimes(1);
    expect(lenis.scrollTo).toHaveBeenCalledWith(0, { immediate: true, force: true });
  });

  it("repeats a current section link and keeps the scroll and reveal runtimes stable", () => {
    const target = document.createElement("section");
    target.id = "cta";
    document.body.appendChild(target);
    useLocation.mockReturnValue({ pathname: "/", hash: "#cta", key: "first-cta" });
    render();
    const initialOptions = ReactLenis.mock.calls[0][0].options;
    expect(initialOptions).toEqual(expect.objectContaining({ smoothWheel: true, lerp: 0.16 }));
    lenis.scrollTo.mockClear();
    useLocation.mockReturnValue({ pathname: "/", hash: "#cta", key: "repeat-cta" });
    render();
    expect(lenis.scrollTo).toHaveBeenCalledTimes(1);
    expect(lenis.scrollTo).toHaveBeenCalledWith(target, { offset: -80, duration: 1.2, immediate: false, force: true });
    lenis.scrollTo.mockClear();
    window.localStorage.setItem("aether-motion-preference", "reduced");
    window.dispatchEvent(new StorageEvent("storage", { key: "aether-motion-preference" }));
    render();
    expect(lenis.scrollTo).not.toHaveBeenCalled();
    expect(ReactLenis.mock.calls.at(-1)[0].options).toBe(initialOptions);
    expect(initGsapReveals).toHaveBeenCalledTimes(1);
    expect(initScrollAnimations).toHaveBeenCalledTimes(1);
    expect(document.documentElement.dataset.motionPreference).toBe("animated");
  });

  it("waits for lazy route content before scrolling to its anchor once", () => {
    useLocation.mockReturnValue({ pathname: "/", hash: "#cta", key: "lazy-cta" });
    render();
    expect(lenis.scrollTo).not.toHaveBeenCalled();
    act(() => jest.advanceTimersByTime(500));
    const target = document.createElement("section");
    target.id = "cta";
    document.body.appendChild(target);
    act(() => jest.advanceTimersByTime(100));
    expect(lenis.resize).toHaveBeenCalledTimes(1);
    expect(lenis.scrollTo).toHaveBeenCalledTimes(1);
    expect(lenis.scrollTo).toHaveBeenCalledWith(target, expect.objectContaining({ force: true, offset: -80 }));
    act(() => jest.advanceTimersByTime(500));
    expect(lenis.scrollTo).toHaveBeenCalledTimes(1);
  });
});
