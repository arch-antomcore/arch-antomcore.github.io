import React, { act } from "react";
import { createRoot } from "react-dom/client";
import {
  applyMotionPreferenceToDocument,
  getMotionPreference,
  MOTION_STORAGE_KEY,
  prefersReducedMotion,
  setMotionPreference,
  useReducedMotion,
} from "./motionPreference";

let systemReduced;
let mediaListeners;
let container;
let root;
const value = () => container.querySelector('[data-testid="preference"]').textContent;
const render = (element) => {
  act(() => root.render(element));
  return { unmount: () => { act(() => root.unmount()); root = null; } };
};
beforeAll(() => { globalThis.IS_REACT_ACT_ENVIRONMENT = true; });
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  systemReduced = true;
  mediaListeners = new Set();
  window.localStorage.clear();
  window.matchMedia = jest.fn(() => ({
    get matches() { return systemReduced; },
    addEventListener: (_, listener) => mediaListeners.add(listener),
    removeEventListener: (_, listener) => mediaListeners.delete(listener),
  }));
  setMotionPreference("system");
});
afterEach(() => {
  if (root) act(() => root.unmount());
  container.remove();
  jest.restoreAllMocks();
  setMotionPreference("system");
});

function Probe() {
  const reduced = useReducedMotion();
  return <output data-testid="preference">{reduced ? "reduced" : "animated"}</output>;
}

test("uses the accessibility preference of the system on a first visit", () => {
  expect(getMotionPreference()).toBe("system");
  expect(prefersReducedMotion()).toBe(true);
  systemReduced = false;
  expect(prefersReducedMotion()).toBe(false);
});

test("preserves a previously explicit animation opt-in over system reduction", () => {
  window.localStorage.setItem(MOTION_STORAGE_KEY, "animated");
  render(<Probe />);
  expect(value()).toBe("animated");
  applyMotionPreferenceToDocument();
  expect(window.localStorage.getItem(MOTION_STORAGE_KEY)).toBe("animated");
  expect(document.documentElement.dataset.motionPreference).toBe("animated");
  expect(document.documentElement.dataset.motionSource).toBe("animated");
});

test("old reduced product preferences no longer select a second version", () => {
  window.localStorage.setItem(MOTION_STORAGE_KEY, "reduced");
  render(<Probe />);
  expect(getMotionPreference()).toBe("system");
  expect(value()).toBe("reduced");
  systemReduced = false;
  act(() => mediaListeners.forEach((listener) => listener()));
  expect(value()).toBe("animated");
  systemReduced = true;
  act(() => mediaListeners.forEach((listener) => listener()));
  expect(value()).toBe("reduced");
  expect(document.documentElement.dataset.motionPreference).toBe("reduced");
  expect(document.documentElement.dataset.motionSource).toBe("system");
});

test("updates when another tab changes the saved preference", () => {
  render(<Probe />);
  act(() => {
    window.localStorage.setItem(MOTION_STORAGE_KEY, "animated");
    window.dispatchEvent(new StorageEvent("storage", { key: MOTION_STORAGE_KEY }));
  });
  expect(value()).toBe("animated");
});

test("blocked storage still allows a choice in the current tab", () => {
  render(<Probe />);
  jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("blocked"); });
  act(() => setMotionPreference("animated"));
  expect(value()).toBe("animated");
  applyMotionPreferenceToDocument();
  expect(document.documentElement.dataset.motionPreference).toBe("animated");
});

test("removes shared subscriptions when the last consumer unmounts", () => {
  const { unmount } = render(<Probe />);
  expect(mediaListeners.size).toBe(1);
  unmount();
  expect(mediaListeners.size).toBe(0);
});
