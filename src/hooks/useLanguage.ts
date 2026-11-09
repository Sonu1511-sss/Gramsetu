import { useState, useEffect } from 'react';
import { getLanguage, setLanguage, t, Language } from '../utils/i18n';

export function useLanguage() {
  const [lang, setLangState] = useState<Language>(getLanguage());

  useEffect(() => {
    const handler = () => setLangState(getLanguage());
    window.addEventListener('gramsetu_lang_change', handler);
    return () => window.removeEventListener('gramsetu_lang_change', handler);
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang);
    setLangState(newLang);
  };

  return { lang, changeLanguage, t };
}

