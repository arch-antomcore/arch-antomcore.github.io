export const EXPERIENCE_STORAGE_KEY = "aether-experience";
export const LEGACY_MOTION_STORAGE_KEY = "aether-motion-override";

export const EXPERIENCE = Object.freeze({
  FULL: "full",
  LIGHT: "light",
});

const isBrowser = () => typeof window !== "undefined";

export const normalizeExperience = (value) => {
  if (value === EXPERIENCE.FULL || value === "high" || value === "medium") {
    return EXPERIENCE.FULL;
  }
  if (value === EXPERIENCE.LIGHT || value === "low") {
    return EXPERIENCE.LIGHT;
  }
  return null;
};

export const getQueryExperience = () => {
  if (!isBrowser()) return null;
  const params = new URLSearchParams(window.location.search);
  return normalizeExperience(params.get("motion") || params.get("experience"));
};

// Restore the visitor's last explicit profile on a full browser entry. Query
// parameters remain an intentional override for previews and QA, while normal
// F5 reloads keep the selected experience instead of reopening the chooser.
export const getInitialExperience = () => getSavedExperience();

export const getSavedExperience = () => {
  if (!isBrowser()) return null;

  try {
    return (
      getQueryExperience() ||
      normalizeExperience(window.localStorage.getItem(EXPERIENCE_STORAGE_KEY)) ||
      normalizeExperience(window.localStorage.getItem(LEGACY_MOTION_STORAGE_KEY))
    );
  } catch {
    return getQueryExperience();
  }
};

const detectWeakGpu = () => {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true }) || canvas.getContext("experimental-webgl");
    if (!gl) return true;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return /swiftshader|llvmpipe|softpipe|software|mesa offscreen|basic render|microsoft basic|intel\(r\) (hd|uhd) graphics [3-6]\d\d\b|intel\(r\) hd graphics$/i.test(renderer);
  } catch {
    return false;
  }
};

export const prefersLightExperience = () => {
  if (!isBrowser()) return false;

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection?.saveData === true;
  const limitedCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
  const limitedMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
  const smallTouch = window.matchMedia?.("(max-width: 767px) and (pointer: coarse)").matches;

  return Boolean(reducedMotion || saveData || limitedCpu || limitedMemory || smallTouch || detectWeakGpu());
};

/* First visit: pick a profile from the device signals instead of blocking the
   page behind a chooser. The visitor can flip it any time (hint pill + footer). */
export const AUTO_EXPERIENCE_KEY = "aether-experience-auto";

export const detectExperience = () => (prefersLightExperience() ? EXPERIENCE.LIGHT : EXPERIENCE.FULL);

export const wasAutoDetected = () => {
  if (!isBrowser()) return false;
  try {
    return window.localStorage.getItem(AUTO_EXPERIENCE_KEY) === "1";
  } catch {
    return false;
  }
};

export const markAutoDetected = (value) => {
  if (!isBrowser()) return;
  try {
    if (value) window.localStorage.setItem(AUTO_EXPERIENCE_KEY, "1");
    else window.localStorage.removeItem(AUTO_EXPERIENCE_KEY);
  } catch {
    // ignore blocked storage
  }
};

export const saveExperience = (experience) => {
  const normalized = normalizeExperience(experience);
  if (!normalized || !isBrowser()) return null;

  try {
    window.localStorage.setItem(EXPERIENCE_STORAGE_KEY, normalized);
    // Preserve the existing debug/testing contract while making the visitor
    // facing preference explicit and easy to understand.
    window.localStorage.setItem(
      LEGACY_MOTION_STORAGE_KEY,
      normalized === EXPERIENCE.LIGHT ? "low" : "high",
    );
  } catch {
    // Storage can be blocked in private contexts. The current session still
    // receives the selected profile through React state.
  }

  return normalized;
};

export const applyExperienceToDocument = (experience) => {
  const normalized = normalizeExperience(experience);
  if (!normalized || !isBrowser()) return;

  const root = document.documentElement;
  root.dataset.aetherExperience = normalized;
  root.classList.toggle("aether-experience-light", normalized === EXPERIENCE.LIGHT);
  root.classList.toggle("aether-experience-full", normalized === EXPERIENCE.FULL);
};
