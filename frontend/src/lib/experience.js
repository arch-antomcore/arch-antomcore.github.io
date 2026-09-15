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

export const prefersLightExperience = () => {
  if (!isBrowser()) return false;

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection?.saveData === true;
  const limitedCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
  const limitedMemory = navigator.deviceMemory && navigator.deviceMemory < 4;

  return Boolean(reducedMotion || saveData || limitedCpu || limitedMemory);
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
