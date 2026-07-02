import en from './en.json';
import vi from './vi.json';

export type Language = 'en' | 'vi';

export const translations: Record<Language, Record<string, any>> = {
  en,
  vi,
};

export { en, vi };
