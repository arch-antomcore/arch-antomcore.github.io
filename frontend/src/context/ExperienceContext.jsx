import React, { createContext, useContext, useLayoutEffect } from "react";
import { applyExperienceToDocument, EXPERIENCE, saveExperience } from "@/lib/experience";

const cinematicExperience = Object.freeze({
  experience: EXPERIENCE.CINEMATIC,
  isCinematicExperience: true,
});

const ExperienceContext = createContext(cinematicExperience);

export const ExperienceProvider = ({ children }) => {
  useLayoutEffect(() => {
    saveExperience();
    applyExperienceToDocument();
  }, []);

  return <ExperienceContext.Provider value={cinematicExperience}>{children}</ExperienceContext.Provider>;
};

export const useExperience = () => useContext(ExperienceContext);
