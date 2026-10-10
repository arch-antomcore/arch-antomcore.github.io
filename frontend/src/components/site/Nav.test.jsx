import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "lenis/react";
import { useReducedMotion } from "@/lib/motionPreference";
import Nav from "./Nav";

jest.mock("react-router-dom", () => {
  const ReactModule = jest.requireActual("react");
  return {
    Link: ({ to, children, ...props }) => ReactModule.createElement("a", { href: to, ...props }, children),
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
  };
}, { virtual: true });
jest.mock("lenis/react", () => ({ useLenis: jest.fn() }), { virtual: true });
jest.mock("@/lib/motionPreference", () => ({ useReducedMotion: jest.fn() }), { virtual: true });
jest.mock("@phosphor-icons/react", () => {
  const ReactModule = jest.requireActual("react");
  const Icon = (props) => ReactModule.createElement("svg", { ...props, "aria-hidden": true });
  return Object.fromEntries([
    "List", "X", "ArrowUpRight", "House", "Briefcase", "FileText", "CurrencyDollar", "Cpu",
    "ShieldCheck", "Heart", "Question", "Plant", "User", "PuzzlePiece", "TrendUp",
  ].map((name) => [name, Icon]));
});
jest.mock("framer-motion", () => {
  const ReactModule = jest.requireActual("react");
  const cache = {};
  return {
    AnimatePresence: ({ children }) => children,
    motion: new Proxy({}, {
      get: (_target, tag) => {
        if (!cache[tag]) {
          cache[tag] = ReactModule.forwardRef(({ animate, initial, exit, transition, children, ...props }, ref) =>
            ReactModule.createElement(tag, { ...props, ref }, children));
        }
        return cache[tag];
      },
    }),
  };
});
jest.mock("@/components/site/interactions", () => ({
  ScrollProgress: () => null,
  Magnetic: ({ children }) => children,
}), { virtual: true });
jest.mock("@/components/ui/expandable-tabs", () => {
  const ReactModule = jest.requireActual("react");
  return {
    ExpandableTabs: ({ tabs, activeTab, onChange }) => ReactModule.createElement("div", {
      "data-testid": "navbar-tabs", "data-active-tab": activeTab ?? "",
    }, tabs.map((tab, index) => ReactModule.createElement("button", {
      key: tab.to, "data-nav-route": tab.to, onClick: () => onChange(index),
    }, tab.title))),
  };
}, { virtual: true });
jest.mock("@/components/ui/cascade-text", () => {
  const ReactModule = jest.requireActual("react");
  return { TextReveal: ({ text }) => ReactModule.createElement("span", {}, text) };
}, { virtual: true });
jest.mock("@/hooks/useTranslation", () => ({
  useTranslation: () => ({
    language: "pt", setLanguage: jest.fn(),
    t: {
      BRAND: { name: "AetherCore", tagline: "IA LOCAL" },
      NAV_LINKS: [{ to: "/", label: "Início" }, { to: "/produto", label: "Produto" }],
      FOOTER_LINKS: [{ to: "/faq", label: "FAQ" }],
    },
  }),
}), { virtual: true });

describe("navbar navigation and scroll behavior", () => {
  let container;
  let root;
  let previousMatchMedia;
  let scrollDescriptor;
  let navigate;

  beforeAll(() => { globalThis.IS_REACT_ACT_ENVIRONMENT = true; });
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    navigate = jest.fn();
    useLocation.mockReturnValue({ pathname: "/", hash: "" });
    useNavigate.mockReturnValue(navigate);
    useLenis.mockReturnValue(undefined);
    useReducedMotion.mockReturnValue(true);
    jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    previousMatchMedia = window.matchMedia;
    scrollDescriptor = Object.getOwnPropertyDescriptor(window, "scrollY");
    Object.defineProperty(window, "scrollY", { configurable: true, writable: true, value: 0 });
    window.history.replaceState({}, "", "/");
    window.matchMedia = jest.fn(() => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
    container = document.createElement("div");
    document.body.appendChild(container);
    document.body.style.overflow = "auto";
    root = createRoot(container);
    act(() => root.render(<Nav />));
  });
  afterEach(() => {
    if (root) act(() => root.unmount());
    container.remove();
    document.body.style.overflow = "";
    window.matchMedia = previousMatchMedia;
    Object.defineProperty(window, "scrollY", scrollDescriptor);
    window.history.replaceState({}, "", "/");
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("locks scrolling, keeps Tab inside the dialog, and restores focus on Escape", () => {
    const opener = container.querySelector('[data-testid="menu-open"]');
    act(() => opener.click());
    act(() => jest.runOnlyPendingTimers());
    const menu = container.querySelector('[data-testid="mobile-menu"]');
    const first = menu.querySelector("button");
    const buttons = menu.querySelectorAll("button");
    const last = buttons[buttons.length - 1];
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.activeElement).toBe(first);

    act(() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", shiftKey: true, bubbles: true, cancelable: true })));
    expect(document.activeElement).toBe(last);
    act(() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true })));
    expect(document.activeElement).toBe(first);

    act(() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true })));
    expect(container.querySelector('[data-testid="mobile-menu"]')).toBeNull();
    expect(document.body.style.overflow).toBe("auto");
    expect(document.activeElement).toBe(opener);
  });

  it("restores the previous overflow style when unmounted while open", () => {
    act(() => container.querySelector('[data-testid="menu-open"]').click());
    expect(document.body.style.overflow).toBe("hidden");
    act(() => root.unmount());
    root = null;
    expect(document.body.style.overflow).toBe("auto");
  });

  it("hides on native downward scrolling and returns on upward scrolling or keyboard focus", () => {
    const header = container.querySelector('[data-testid="site-header"]');
    const scroll = (top) => {
      act(() => { window.scrollY = top; window.dispatchEvent(new Event("scroll")); });
      act(() => jest.advanceTimersByTime(20));
    };
    scroll(180);
    expect(header.dataset.navHidden).toBe("true");
    expect(header.dataset.navScrolled).toBe("true");
    scroll(150);
    expect(header.dataset.navHidden).toBe("false");
    scroll(240);
    expect(header.dataset.navHidden).toBe("true");
    act(() => container.querySelector('[data-testid="brand-logo"]').focus());
    expect(header.dataset.navHidden).toBe("false");
    scroll(0);
    expect(header.dataset.navScrolled).toBe("false");
  });

  it("keeps desktop links functional and selects only the matching route family", () => {
    useLocation.mockReturnValue({ pathname: "/produto/details", hash: "" });
    act(() => root.render(<Nav />));
    expect(container.querySelector('[data-testid="navbar-tabs"]').dataset.activeTab).toBe("4");
    act(() => container.querySelector('[data-nav-route="/blog"]').click());
    expect(navigate).toHaveBeenCalledWith("/blog");
    useLocation.mockReturnValue({ pathname: "/produtox", hash: "" });
    act(() => root.render(<Nav />));
    expect(container.querySelector('[data-testid="navbar-tabs"]').dataset.activeTab).toBe("");
  });

  it("executes the mobile home CTA even while the menu has stopped Lenis", () => {
    const target = document.createElement("section");
    target.id = "cta";
    document.body.appendChild(target);
    const instance = {
      isStopped: false,
      stop: jest.fn(() => { instance.isStopped = true; }),
      start: jest.fn(() => {
        if (instance.isStopped) {
          instance.isStopped = false;
          instance.lastTarget = null;
        }
      }),
      scrollTo: jest.fn((element, options) => {
        instance.stoppedAtScroll = instance.isStopped;
        if (!instance.isStopped || options.force) instance.lastTarget = element;
      }),
    };
    useLenis.mockReturnValue(instance);
    useLocation.mockReturnValue({ pathname: "/", hash: "#cta" });
    useReducedMotion.mockReturnValue(false);
    act(() => root.render(<Nav />));
    act(() => container.querySelector('[data-testid="menu-open"]').click());
    expect(instance.isStopped).toBe(true);
    act(() => container.querySelector('[data-testid="mobile-nav-cta"]').click());
    expect(instance.lastTarget).toBe(target);
    expect(instance.stoppedAtScroll).toBe(false);
    expect(instance.start.mock.invocationCallOrder[0]).toBeLessThan(instance.scrollTo.mock.invocationCallOrder[0]);
    expect(instance.scrollTo).toHaveBeenCalledWith(target, expect.objectContaining({ force: true, duration: 1.2, immediate: false }));
    expect(instance.isStopped).toBe(false);
    expect(container.querySelector('[data-testid="mobile-menu"]')).toBeNull();
    expect(navigate).not.toHaveBeenCalled();
    target.remove();
  });

  it.each([true, false])("scrolls native home CTA with effective reduced motion=%s", (reduce) => {
    const target = document.createElement("section");
    target.id = "cta";
    target.scrollIntoView = jest.fn();
    document.body.appendChild(target);
    useReducedMotion.mockReturnValue(reduce);
    useLocation.mockReturnValue({ pathname: "/", hash: "#cta" });
    act(() => root.render(<Nav />));
    act(() => container.querySelector('[data-testid="nav-cta"]').click());
    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: reduce ? "auto" : "smooth", block: "start" });
    target.remove();
  });

  it("routes the CTA to home from another page and closes mobile links after navigation", () => {
    useLocation.mockReturnValue({ pathname: "/blog", hash: "" });
    act(() => root.render(<Nav />));
    act(() => container.querySelector('[data-testid="nav-cta"]').click());
    expect(navigate).toHaveBeenCalledWith("/#cta");
    act(() => container.querySelector('[data-testid="menu-open"]').click());
    act(() => container.querySelector('[data-testid="mobile-nav-produto"]').click());
    expect(navigate).toHaveBeenCalledWith("/produto");
    expect(container.querySelector('[data-testid="mobile-menu"]')).toBeNull();
    expect(document.body.style.overflow).toBe("auto");
  });

  it("synchronizes a new home CTA hash through Router and delegates its scroll to Layout", () => {
    const instance = { start: jest.fn(), stop: jest.fn(), scrollTo: jest.fn() };
    useLenis.mockReturnValue(instance);
    act(() => root.render(<Nav />));
    act(() => container.querySelector('[data-testid="menu-open"]').click());
    act(() => container.querySelector('[data-testid="mobile-nav-cta"]').click());
    expect(navigate).toHaveBeenCalledWith("/#cta");
    expect(instance.start.mock.invocationCallOrder[0]).toBeLessThan(navigate.mock.invocationCallOrder[0]);
    expect(instance.scrollTo).not.toHaveBeenCalled();
    expect(document.body.style.overflow).toBe("auto");
  });

  it("scrolls an already-current route to the top through the active Lenis runtime", () => {
    const instance = { start: jest.fn(), resize: jest.fn(), scrollTo: jest.fn() };
    useLenis.mockReturnValue(instance);
    useLocation.mockReturnValue({ pathname: "/produto", hash: "" });
    useReducedMotion.mockReturnValue(false);
    act(() => root.render(<Nav />));
    act(() => container.querySelector('[data-nav-route="/produto"]').click());
    expect(instance.start.mock.invocationCallOrder[0]).toBeLessThan(instance.scrollTo.mock.invocationCallOrder[0]);
    expect(instance.resize).toHaveBeenCalled();
    expect(instance.scrollTo).toHaveBeenCalledWith(0, { duration: 1.2, immediate: false, force: true });
    expect(navigate).not.toHaveBeenCalled();
  });

  it("returns Home through Router after an anchor, then supports a repeated brand click at Home", () => {
    useLocation.mockReturnValue({ pathname: "/", hash: "#cta" });
    act(() => root.render(<Nav />));
    act(() => container.querySelector('[data-nav-route="/"]').click());
    expect(navigate).toHaveBeenCalledWith("/");
    expect(window.scrollTo).not.toHaveBeenCalled();
    useLocation.mockReturnValue({ pathname: "/", hash: "" });
    act(() => root.render(<Nav />));
    act(() => container.querySelector('[data-testid="brand-logo"]').click());
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
  });
});
