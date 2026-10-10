import React, { act, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  applyMotionPreferenceToDocument,
  getMotionPreference,
  MOTION_STORAGE_KEY,
  prefersReducedMotion,
  setMotionPreference,
  useMotionPreference,
  useReducedMotion,
} from "./motionPreference";

let container;
let root;
let media;
let mountCount;
const value = () => container.querySelector('[data-testid="preference"]').textContent;
const render = () => act(() => root.render(<Probe />));

beforeAll(() => { globalThis.IS_REACT_ACT_ENVIRONMENT = true; });
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  mountCount = 0;
  window.localStorage.clear();
  window.history.replaceState({}, "", "/");
  media = { matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() };
  window.matchMedia = jest.fn(() => media);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  window.history.replaceState({}, "", "/");
  jest.restoreAllMocks();
});

function Probe() {
  const reduced = useReducedMotion();
  const preference = useMotionPreference();
  useEffect(() => { mountCount += 1; }, []);
  return <output data-testid="preference">{reduced ? "reduced" : preference.preference}</output>;
}

test("always animates on a first visit even when the system requests reduced motion", () => {
  render();
  expect(getMotionPreference()).toBe("animated");
  expect(prefersReducedMotion()).toBe(false);
  expect(value()).toBe("animated");
  expect(window.matchMedia).not.toHaveBeenCalled();
});

test.each(["reduced", "system", "low", "light", "animated"])(
  "ignores the legacy saved %s motion preference and URL overrides",
  (preference) => {
    window.localStorage.setItem(MOTION_STORAGE_KEY, preference);
    window.localStorage.setItem("aether-motion-override", "low");
    window.localStorage.setItem("aether-experience", "light");
    window.history.replaceState({}, "", "/?motion=low&experience=light");
    render();
    applyMotionPreferenceToDocument();
    expect(getMotionPreference()).toBe("animated");
    expect(value()).toBe("animated");
    expect(document.documentElement.dataset.motionPreference).toBe("animated");
    expect(document.documentElement.dataset.motionSource).toBe("animated");
  },
);

test("does not subscribe to changes or remount consumers when legacy settings change", () => {
  const addListener = jest.spyOn(window, "addEventListener");
  render();
  act(() => {
    window.localStorage.setItem(MOTION_STORAGE_KEY, "reduced");
    window.dispatchEvent(new StorageEvent("storage", { key: MOTION_STORAGE_KEY }));
    window.dispatchEvent(new Event("aether:motion-preference"));
    setMotionPreference("reduced");
  });
  render();
  expect(value()).toBe("animated");
  expect(mountCount).toBe(1);
  expect(window.matchMedia).not.toHaveBeenCalled();
  expect(media.addEventListener).not.toHaveBeenCalled();
  expect(addListener).not.toHaveBeenCalled();
});

test("works without browser storage and repairs stale document reduction state", () => {
  jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
  jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("blocked"); });
  document.documentElement.dataset.motionPreference = "reduced";
  document.documentElement.dataset.motionSource = "system";
  render();
  expect(() => setMotionPreference("system")).not.toThrow();
  expect(value()).toBe("animated");
  expect(document.documentElement.dataset.motionPreference).toBe("animated");
  expect(document.documentElement.dataset.motionSource).toBe("animated");
});
