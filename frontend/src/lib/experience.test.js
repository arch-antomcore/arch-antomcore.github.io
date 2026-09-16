import {
  EXPERIENCE,
  EXPERIENCE_STORAGE_KEY,
  LEGACY_MOTION_STORAGE_KEY,
  getInitialExperience,
  getQueryExperience,
  getSavedExperience,
  normalizeExperience,
  saveExperience,
} from "./experience";

describe("experience preferences", () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState({}, "", "/");
  });

  it("normalizes supported values and rejects unknown values", () => {
    expect(normalizeExperience("full")).toBe(EXPERIENCE.FULL);
    expect(normalizeExperience("low")).toBe(EXPERIENCE.LIGHT);
    expect(normalizeExperience("unexpected")).toBeNull();
  });

  it("persists a choice in the new key and keeps the legacy motion key in sync", () => {
    expect(saveExperience(EXPERIENCE.LIGHT)).toBe(EXPERIENCE.LIGHT);
    expect(localStorage.getItem(EXPERIENCE_STORAGE_KEY)).toBe(EXPERIENCE.LIGHT);
    expect(localStorage.getItem(LEGACY_MOTION_STORAGE_KEY)).toBe("low");
    expect(getSavedExperience()).toBe(EXPERIENCE.LIGHT);
  });

  it("honors explicit query controls before stored preferences", () => {
    localStorage.setItem(EXPERIENCE_STORAGE_KEY, EXPERIENCE.LIGHT);
    window.history.replaceState({}, "", "/?motion=high");
    expect(getQueryExperience()).toBe(EXPERIENCE.FULL);
    expect(getSavedExperience()).toBe(EXPERIENCE.FULL);
  });

  it("reads the previous low-motion preference", () => {
    localStorage.setItem(LEGACY_MOTION_STORAGE_KEY, "low");
    expect(getSavedExperience()).toBe(EXPERIENCE.LIGHT);
  });

  it("restores the selected profile on a browser reload and honors query overrides", () => {
    localStorage.setItem(EXPERIENCE_STORAGE_KEY, EXPERIENCE.LIGHT);
    expect(getInitialExperience()).toBe(EXPERIENCE.LIGHT);

    window.history.replaceState({}, "", "/?experience=full");
    expect(getInitialExperience()).toBe(EXPERIENCE.FULL);
  });
});
