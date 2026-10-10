import { useSyncExternalStore } from "react";

export const MOTION_STORAGE_KEY = "aether-motion-preference";
const CHANGE_EVENT = "aether:motion-preference";
const MEDIA_QUERY = "(prefers-reduced-motion: reduce)";
let transientPreference = null;

export function getMotionPreference() {
  if (typeof window === "undefined") return "system";
  if (transientPreference !== null) return transientPreference;
  try {
    const value = window.localStorage.getItem(MOTION_STORAGE_KEY);
    // Preserve an explicit opt-in to animation, including a visitor who already
    // enabled it over their system preference. Old product-level reductions no
    // longer select a second version of the site.
    return value === "animated" ? "animated" : "system";
  } catch {
    return "system";
  }
}

export function prefersReducedMotion() {
  const preference = getMotionPreference();
  if (preference !== "system") return preference === "reduced";
  return typeof window !== "undefined" && Boolean(window.matchMedia?.(MEDIA_QUERY).matches);
}

export function applyMotionPreferenceToDocument() {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.motionPreference = prefersReducedMotion() ? "reduced" : "animated";
  document.documentElement.dataset.motionSource = getMotionPreference();
}

export function setMotionPreference(preference) {
  if (typeof window === "undefined") return;
  try {
    if (preference === "animated") window.localStorage.setItem(MOTION_STORAGE_KEY, preference);
    else window.localStorage.removeItem(MOTION_STORAGE_KEY);
    transientPreference = null;
  } catch {
    // Storage may be blocked. The current tab still receives the change below.
    transientPreference = preference === "animated" ? "animated" : "system";
  }
  applyMotionPreferenceToDocument();
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

const listeners = new Set();
let disconnect;
function subscribe(listener) {
  listeners.add(listener);
  if (listeners.size === 1 && typeof window !== "undefined") {
    const media = window.matchMedia?.(MEDIA_QUERY);
    const notify = () => {
      applyMotionPreferenceToDocument();
      listeners.forEach((callback) => callback());
    };
    media?.addEventListener?.("change", notify);
    window.addEventListener("storage", notify);
    window.addEventListener(CHANGE_EVENT, notify);
    disconnect = () => {
      media?.removeEventListener?.("change", notify);
      window.removeEventListener("storage", notify);
      window.removeEventListener(CHANGE_EVENT, notify);
    };
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size) { disconnect?.(); disconnect = undefined; }
  };
}

export function useReducedMotion() {
  return useSyncExternalStore(subscribe, prefersReducedMotion, () => false);
}

export function useMotionPreference() {
  const preference = useSyncExternalStore(subscribe, getMotionPreference, () => "system");
  const shouldReduceMotion = useReducedMotion();
  return { preference, shouldReduceMotion, setMotionPreference };
}
