import useTranslationNext from "next-translate/useTranslation";
import Router from "next/router";
import { SetLanguageType, UseTranslationType } from "./types";

const setLanguage = (options: SetLanguageType): void => {
  const { as = "/", url = "/", lang } = options;
  Router.push(url, as, { locale: lang });
};

/**
 * Only use this hooks within functional component
 * @param screen - locale file name
 */
export const useTranslation = (screen?: string): UseTranslationType => {
  const { lang, t } = useTranslationNext(screen);
  return { lang, t, setLanguage };
};
