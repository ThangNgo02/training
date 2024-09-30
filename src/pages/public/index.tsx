import { useContext } from 'react';

import { LanguageContext } from '@/context/languages';
import { LoggerService } from '@/utils/Logger';

import PublicView from './view';

function PublicIndex() {
  const language = useContext(LanguageContext);
  LoggerService.info(language.userLanguage);
  return <PublicView language={language} />;
}

export default PublicIndex;
