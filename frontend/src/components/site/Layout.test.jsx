import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import { useReducedMotion } from "@/lib/motionPreference";
import Layout from "./Layout";

jest.mock("react-router-dom", () => ({ Outlet: () => null, useLocation: jest.fn() }), { virtual: true });
jest.mock("lenis/react", () => ({ ReactLenis: ({ children }) => children, useLenis: jest.fn() }), { virtual: true });
jest.mock("framer-motion", () => ({ MotionConfig: ({ children }) => children }));
jest.mock("@/lib/motionPreference", () => ({ useReducedMotion: jest.fn(), applyMotionPreferenceToDocument: jest.fn() }), { virtual: true });
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
    jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    lenis = { resize: jest.fn(), scrollTo: jest.fn() };
    useLenis.mockReturnValue(lenis);
    useReducedMotion.mockReturnValue(false);
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

  it("repeats a current section link but preserves position when only accessibility changes", () => {
    const target = document.createElement("section");
    target.id = "cta";
    document.body.appendChild(target);
    useLocation.mockReturnValue({ pathname: "/", hash: "#cta", key: "first-cta" });
    render();
    lenis.scrollTo.mockClear();
    useLocation.mockReturnValue({ pathname: "/", hash: "#cta", key: "repeat-cta" });
    render();
    expect(lenis.scrollTo).toHaveBeenCalledTimes(1);
    expect(lenis.scrollTo).toHaveBeenCalledWith(target, { offset: -80, duration: 1.2, immediate: false, force: true });
    lenis.scrollTo.mockClear();
    useReducedMotion.mockReturnValue(true);
    render();
    expect(lenis.scrollTo).not.toHaveBeenCalled();
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
