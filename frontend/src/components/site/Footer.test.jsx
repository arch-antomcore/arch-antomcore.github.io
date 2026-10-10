import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "lenis/react";
import { useReducedMotion } from "@/lib/motionPreference";
import Footer from "./Footer";

jest.mock("react-router-dom", () => {
  const ReactModule = jest.requireActual("react");
  const api = { useLocation: jest.fn(), useNavigate: jest.fn() };
  return {
    ...api,
    Link: ({ to, children, onClick, ...props }) => ReactModule.createElement("a", {
      ...props,
      href: to,
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) api.useNavigate()(to);
        event.preventDefault();
      },
    }, children),
  };
}, { virtual: true });
jest.mock("lenis/react", () => ({ useLenis: jest.fn() }), { virtual: true });
jest.mock("@/lib/motionPreference", () => ({ useReducedMotion: jest.fn() }), { virtual: true });
jest.mock("@phosphor-icons/react", () => ({ ArrowUp: () => null }));
jest.mock("@/components/site/interactions", () => ({
  Magnetic: ({ children }) => children,
  useMotionBudget: () => false,
}), { virtual: true });
jest.mock("framer-motion", () => {
  const ReactModule = jest.requireActual("react");
  return {
    motion: {
      div: ReactModule.forwardRef(({ initial, whileInView, viewport, variants, children, ...props }, ref) =>
        ReactModule.createElement("div", { ...props, ref }, children)),
    },
  };
});
jest.mock("@/hooks/useTranslation", () => ({
  useTranslation: () => ({
    language: "pt", setLanguage: jest.fn(),
    t: { BRAND: { name: "AetherCore", copyright: "AetherCore", version: "Beta" }, FOOTER_LINKS: [] },
  }),
}), { virtual: true });

describe("footer route and anchor scrolling", () => {
  let container;
  let root;
  let navigate;
  let previousMatchMedia;

  beforeAll(() => { globalThis.IS_REACT_ACT_ENVIRONMENT = true; });
  beforeEach(() => {
    jest.clearAllMocks();
    navigate = jest.fn();
    useLocation.mockReturnValue({ pathname: "/", hash: "" });
    useNavigate.mockReturnValue(navigate);
    useLenis.mockReturnValue(undefined);
    useReducedMotion.mockReturnValue(false);
    jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    previousMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn(() => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => root.render(<Footer />));
  });
  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    window.matchMedia = previousMatchMedia;
    jest.restoreAllMocks();
  });

  const clickLink = (to) => act(() => container.querySelector(`a[href="${to}"]`).click());

  it("keeps new anchor URLs in Router and delegates their scrolling to Layout", () => {
    const instance = { start: jest.fn(), resize: jest.fn(), scrollTo: jest.fn() };
    useLenis.mockReturnValue(instance);
    act(() => root.render(<Footer />));
    clickLink("/#cta");
    expect(navigate).toHaveBeenCalledWith("/#cta");
    expect(instance.scrollTo).not.toHaveBeenCalled();
  });

  it("repeats the current anchor through Lenis with the navigation offset", () => {
    const instance = { start: jest.fn(), resize: jest.fn(), scrollTo: jest.fn() };
    const target = document.createElement("section");
    target.id = "cta";
    document.body.appendChild(target);
    useLocation.mockReturnValue({ pathname: "/", hash: "#cta" });
    useLenis.mockReturnValue(instance);
    act(() => root.render(<Footer />));
    clickLink("/#cta");
    expect(instance.start.mock.invocationCallOrder[0]).toBeLessThan(instance.scrollTo.mock.invocationCallOrder[0]);
    expect(instance.resize).toHaveBeenCalled();
    expect(instance.scrollTo).toHaveBeenCalledWith(target, { offset: -80, duration: 1.2, immediate: false, force: true });
    expect(navigate).not.toHaveBeenCalled();
    target.remove();
  });

  it("returns a repeated current route to the top and uses Router to clear an old hash", () => {
    useLocation.mockReturnValue({ pathname: "/produto", hash: "" });
    act(() => root.render(<Footer />));
    clickLink("/produto");
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    expect(navigate).not.toHaveBeenCalled();
    useLocation.mockReturnValue({ pathname: "/produto", hash: "#edicoes" });
    act(() => root.render(<Footer />));
    clickLink("/produto");
    expect(navigate).toHaveBeenCalledWith("/produto");
  });

  it("supports reduced-motion back-to-top and repeated brand links", () => {
    useReducedMotion.mockReturnValue(true);
    act(() => root.render(<Footer />));
    act(() => container.querySelector('[data-testid="footer-back-to-top"]').click());
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
    window.scrollTo.mockClear();
    act(() => container.querySelector('[data-testid="footer-brand-logo"]').click());
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
    expect(navigate).not.toHaveBeenCalled();
  });
});
