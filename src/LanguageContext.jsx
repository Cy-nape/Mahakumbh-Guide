import React, { createContext, useState, useContext, useEffect } from 'react';
import { getTranslation } from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(null); // null means splash screen

  const setLanguage = (langObj) => {
    setCurrentLang(langObj);
  };

  const t = (key) => {
    if (!currentLang) return key;
    return getTranslation(currentLang.code, key);
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
