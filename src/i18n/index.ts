import i18n from "i18n-js";
import { useState } from "react";
import { SetLanguageType } from "./types";

/**
 * Set locale into global i18n instance
 *
 * @param locale - name of locale (en, cn, etc)
 */
const setLanguage = (locale: string): void => {
  i18n.locale = locale ?? "en";
};

/**
 * Only use this hooks within functional component
 *
 * @param screen - locale file name
 * @returns translated string
 *
 */
export const useTranslation = (
  screen?: string
): {
  lang: string;
  t: (key: string, options?: I18n.TranslateOptions) => string;
  setLanguage: (options: SetLanguageType) => void;
} => {
  const [lang, setLang] = useState(i18n.locale || "en");
  return {
    lang,
    t: (key: string, options?: I18n.TranslateOptions): string => {
      const spliting = key.split(":");
      const hasSplit = spliting.length > 1 && spliting.length <= 2;
      const screenKey = hasSplit ? spliting[0] : screen;
      const readKey = hasSplit ? spliting[1] : spliting[0];

      return i18n.t(`${screenKey}.${readKey}`, {
        locale: lang,
        ...(options ?? {})
      });
    },
    setLanguage: ({ lang }): void => {
      setLanguage(lang);
      setLang(lang);
    }
  };
};
