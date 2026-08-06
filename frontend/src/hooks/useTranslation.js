import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { CONTENT_PT, CONTENT_EN } from "@/data/content";

export const useTranslation = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const t = language === "en" ? CONTENT_EN : CONTENT_PT;
  return { t, language, setLanguage };
};
