import React, { act } from "react";
import { createRoot } from "react-dom/client";
import SectionRail from "./SectionRail";

jest.mock("react-router-dom", () => ({ useLocation: () => ({ pathname: "/demo-glass" }) }), { virtual: true });
jest.mock("@/hooks/useTranslation", () => ({ useTranslation: () => ({ language: "pt" }) }), { virtual: true });
jest.mock("@/lib/motionPreference", () => ({ useReducedMotion: () => true }), { virtual: true });
jest.mock("framer-motion", () => {
  const ReactModule = jest.requireActual("react");
  return { motion: { span: ({ initial, animate, transition, children, ...props }) => ReactModule.createElement("span", props, children) } };
});

describe("chapter discovery on lazy and utility pages", () => {
  let container;
  let main;
  let root;

  beforeAll(() => { globalThis.IS_REACT_ACT_ENVIRONMENT = true; });
  beforeEach(() => {
    jest.useFakeTimers();
    main = document.createElement("main");
    document.body.appendChild(main);
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => root.render(<SectionRail />));
  });
  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    main.remove();
    jest.useRealTimers();
  });

  it("keeps Intro/End navigation without polling forever on a utility page", () => {
    act(() => jest.runAllTimers());
    expect([...container.querySelectorAll("a")].map((link) => link.getAttribute("href"))).toEqual(["#", "#__bottom"]);
    expect(jest.getTimerCount()).toBe(0);
  });

  it("discovers sections that arrive with a lazy route and then stops retrying", () => {
    act(() => jest.advanceTimersByTime(480));
    const section = document.createElement("section");
    section.id = "later-section";
    main.appendChild(section);
    act(() => jest.advanceTimersByTime(240));
    expect(container.querySelector('a[href="#later-section"]')).not.toBeNull();
    expect(container.querySelector('a[href="#__bottom"]')).toBeNull();
    expect(jest.getTimerCount()).toBe(0);
  });
});
