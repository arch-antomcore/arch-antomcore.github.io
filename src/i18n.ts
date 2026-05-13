import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "hero.title": "AetherCore",
      "hero.subtitle": "doesn't just answer.",
      "hero.subtitle_em": "It executes.",
      "hero.description": "Install a local AI runtime that can inspect files, draft outputs, run governed actions, and pause for approval before anything sensitive leaves your device. AetherCore is local-first by default and cloud-optional by design.",
      "hero.cta": "Request Founder Access"
    }
  },
  pt: {
    translation: {
      "hero.title": "AetherCore",
      "hero.subtitle": "não apenas responde.",
      "hero.subtitle_em": "Ele executa.",
      "hero.description": "Instale um runtime de IA local que inspeciona arquivos, rascunha saídas, roda ações governadas e pausa para aprovação antes de dados sensíveis saírem do dispositivo. AetherCore é local-first por padrão.",
      "hero.cta": "Solicitar Acesso"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
