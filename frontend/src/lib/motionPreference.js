// The website has one animated composition. System accessibility settings,
// hardware hints and preferences left by older versions do not select a
// different motion runtime. Individual effects still pause when out of view.
export const MOTION_STORAGE_KEY = "aether-motion-preference";

export const getMotionPreference = () => "animated";
export const prefersReducedMotion = () => false;

export function applyMotionPreferenceToDocument() {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.motionPreference = "animated";
  document.documentElement.dataset.motionSource = "animated";
}

// Retain compatibility with old callers without reading storage, installing
// listeners or causing the application tree to remount.
export const setMotionPreference = () => applyMotionPreferenceToDocument();
export const useReducedMotion = () => false;

const motionPreference = Object.freeze({
  preference: "animated",
  shouldReduceMotion: false,
  setMotionPreference,
});

export const useMotionPreference = () => motionPreference;
