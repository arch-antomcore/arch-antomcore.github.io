import React, { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext({
  language: "pt",
  setLanguage: () => {},
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aether-lang");
      if (saved === "pt" || saved === "en") return saved;
    }
    return "pt";
  });

  const setLanguage = (lang) => {
    if (lang === "pt" || lang === "en") {
      setLanguageState(lang);
      if (typeof window !== "undefined") {
        localStorage.setItem("aether-lang", lang);
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
