import { useLanguage } from "../context/LanguageProvider";

export const useTranslation = () => {
  return useLanguage();
};

export default useTranslation;
