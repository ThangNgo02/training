import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { LanguageContext } from '@/context/languages';
import AuthService from '@/utils/Auth';

import PrivateView from './view';

interface IPublicIndexProps {
  name: string;
}

function PrivateIndex({ name }: IPublicIndexProps) {
  const language = useContext(LanguageContext);
  const auth = AuthService.getPackageAuth();
  const navigate = useNavigate();

  return (
    <PrivateView
      language={language}
      name={name}
      navigate={navigate}
      profile={auth ? auth.profileDetails : null}
    />
  );
}

export default PrivateIndex;
