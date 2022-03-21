import { I18n } from "next-translate";

export interface UseTranslationType extends I18n {
  setLanguage(options: SetLanguageType): any;
}

export type SetLanguageType = {
  url?: string;
  as?: string;
  lang: string;
};
