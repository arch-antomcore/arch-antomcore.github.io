import {
  EXPERIENCE,
  EXPERIENCE_STORAGE_KEY,
  LEGACY_MOTION_STORAGE_KEY,
  applyExperienceToDocument,
  getInitialExperience,
  getQueryExperience,
  getSavedExperience,
  normalizeExperience,
  saveExperience,
} from "./experience";

describe("the single cinematic experience", () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState({}, "", "/");
    document.documentElement.className = "";
    delete document.documentElement.dataset.aetherExperience;
  });

  it.each(["cinematic", "light", "low", "full", "high", "medium"])(
    "maps the current or legacy %s preference to the same composition",
    (value) => expect(normalizeExperience(value)).toBe(EXPERIENCE.CINEMATIC),
  );

  it("rejects unknown preferences", () => {
    expect(normalizeExperience("unexpected")).toBeNull();
    expect(saveExperience("unexpected")).toBeNull();
  });

  it("uses the same composition on a first visit and despite stale light-mode storage", () => {
    expect(getInitialExperience()).toBe(EXPERIENCE.CINEMATIC);
    localStorage.setItem(EXPERIENCE_STORAGE_KEY, "light");
    localStorage.setItem(LEGACY_MOTION_STORAGE_KEY, "low");
    expect(getSavedExperience()).toBe(EXPERIENCE.CINEMATIC);
    expect(getInitialExperience()).toBe(EXPERIENCE.CINEMATIC);
  });

  it.each(["motion=high", "motion=medium", "experience=full"])(
    "cannot select a second runtime through ?%s",
    (query) => {
      window.history.replaceState({}, "", `/?${query}`);
      expect(getQueryExperience()).toBe(EXPERIENCE.CINEMATIC);
      expect(getSavedExperience()).toBe(EXPERIENCE.CINEMATIC);
      expect(getInitialExperience()).toBe(EXPERIENCE.CINEMATIC);
    },
  );

  it("migrates both storage keys and removes the obsolete chooser hint", () => {
    localStorage.setItem(EXPERIENCE_STORAGE_KEY, "full");
    localStorage.setItem(LEGACY_MOTION_STORAGE_KEY, "high");
    localStorage.setItem("aether-experience-auto", "1");
    expect(saveExperience("full")).toBe(EXPERIENCE.CINEMATIC);
    expect(localStorage.getItem(EXPERIENCE_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem(LEGACY_MOTION_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem("aether-experience-auto")).toBeNull();
  });

  it("keeps the composition active when browser storage is blocked", () => {
    const removeItem = jest.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw new DOMException("Storage blocked", "SecurityError");
    });
    try {
      expect(saveExperience()).toBe(EXPERIENCE.CINEMATIC);
      expect(getInitialExperience()).toBe(EXPERIENCE.CINEMATIC);
    } finally {
      removeItem.mockRestore();
    }
  });

  it("removes stale full-mode document state even for an old caller", () => {
    document.documentElement.classList.add("aether-experience-full", "aether-experience-light");
    applyExperienceToDocument("full");
    expect(document.documentElement.dataset.aetherExperience).toBe("cinematic");
    expect(document.documentElement.classList.contains("aether-experience-cinematic")).toBe(true);
    expect(document.documentElement.classList.contains("aether-experience-light")).toBe(false);
    expect(document.documentElement.classList.contains("aether-experience-full")).toBe(false);
  });
});
