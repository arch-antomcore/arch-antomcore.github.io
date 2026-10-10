export const EXPERIENCE_STORAGE_KEY = "aether-experience";
export const LEGACY_MOTION_STORAGE_KEY = "aether-motion-override";

export const EXPERIENCE = Object.freeze({ CINEMATIC: "cinematic" });

const isBrowser = () => typeof window !== "undefined";

// Legacy URLs still resolve to the single current composition. Accessibility
// preferences control motion independently; they never select another design.
export const normalizeExperience = (value) =>
  [EXPERIENCE.CINEMATIC, "light", "low", "full", "high", "medium"].includes(value)
    ? EXPERIENCE.CINEMATIC
    : null;

export const getQueryExperience = () => {
  if (!isBrowser()) return null;
  const params = new URLSearchParams(window.location.search);
  return normalizeExperience(params.get("motion") || params.get("experience"));
};

export const getInitialExperience = () => EXPERIENCE.CINEMATIC;
export const getSavedExperience = () => EXPERIENCE.CINEMATIC;

export const saveExperience = (experience = EXPERIENCE.CINEMATIC) => {
  const normalized = normalizeExperience(experience);
  if (!normalized) return null;

  if (isBrowser()) {
    try {
      window.localStorage.removeItem(EXPERIENCE_STORAGE_KEY);
      window.localStorage.removeItem(LEGACY_MOTION_STORAGE_KEY);
      window.localStorage.removeItem("aether-experience-auto");
    } catch {
      // Blocked storage does not change the experience of the current page.
    }
  }

  return EXPERIENCE.CINEMATIC;
};

export const applyExperienceToDocument = () => {
  if (!isBrowser()) return;
  const root = document.documentElement;
  root.dataset.aetherExperience = EXPERIENCE.CINEMATIC;
  root.classList.add("aether-experience-cinematic");
  root.classList.remove("aether-experience-light", "aether-experience-full");
};
