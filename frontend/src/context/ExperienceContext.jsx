import React, { createContext, useContext, useLayoutEffect, useMemo } from "react";
import { applyExperienceToDocument, EXPERIENCE } from "@/lib/experience";

const ExperienceContext = createContext({
  experience: EXPERIENCE.FULL,
  isLightExperience: false,
  setExperience: () => {},
});

export const ExperienceProvider = ({ experience, setExperience, children }) => {
  const isLightExperience = experience === EXPERIENCE.LIGHT;

  useLayoutEffect(() => {
    applyExperienceToDocument(experience);
  }, [experience]);

  const value = useMemo(
    () => ({ experience, isLightExperience, setExperience }),
    [experience, isLightExperience, setExperience],
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
};

export const useExperience = () => useContext(ExperienceContext);
