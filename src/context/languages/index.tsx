/* eslint-disable @typescript-eslint/naming-convention */
import React, { createContext, useContext, useState } from 'react';

import Config from '@/env';
import { dictionaryList, type IDictionaryList, languageOptions } from '@/languages';
export interface IContextLanguage {
  userLanguage: string;
  dictionary: any;
  userLanguageChange: (selected: any) => void;
}
const config = new Config().getState();
const initContextLanguage: IContextLanguage = {
  userLanguage: config.locale,
  dictionary: dictionaryList.en,
  userLanguageChange: (selected: any) => {},
};
export const LanguageContext = createContext(initContextLanguage);
interface IPropsProviderLanguage {
  children: React.ReactNode;
}
export const LanguageProvider = ({ children }: IPropsProviderLanguage) => {
  const defaultLanguage = localStorage.getItem('locale');
  const [userLanguage, setUserLanguage] = useState(defaultLanguage ?? config.locale);

  const value = React.useMemo(
    () => ({
      userLanguage,
      dictionary: dictionaryList[userLanguage as keyof IDictionaryList],
      userLanguageChange: (selected: any) => {
        const find = languageOptions.find(i => i.value === selected);
        const newLanguage = find ? selected : config.locale;
        setUserLanguage(newLanguage);
        localStorage.setItem('locale', newLanguage);
      },
    }),
    [userLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

interface IProps {
  tid: any;
  fallbackText?: string;
}
export const Localize = ({ tid, fallbackText }: IProps) => {
  const languageContext = useContext(LanguageContext);
  return languageContext.dictionary[tid as keyof object] || fallbackText || tid;
};

export function LocalizeTypeFunc(tid: string | undefined): any {
  const languageContext = useContext(LanguageContext);
  return languageContext.dictionary[tid as keyof object] || tid;
}

export const LocalizeContent = () => {
  const languageContext = useContext(LanguageContext);
  const SetLocalizeId = (tid: string) => {
    return languageContext.dictionary[tid as keyof object] || tid;
  };
  return { SetLocalizeId };
};
