import { Outlet } from 'react-router-dom';

import { type IContextLanguage, Localize } from '@/context/languages';
import { languageOptions } from '@/languages';

interface IPublicProps {
  language: IContextLanguage;
}

function PublicView({ language }: IPublicProps) {
  return (
    <div className='flex min-h-screen w-screen justify-center bg-main bg-cover bg-no-repeat pb-[105px] pt-[104px]'>
      <div className='flex min-h-[calc(100vh-209px)] w-fit flex-col justify-between self-center rounded-2xl bg-white px-40'>
        <div className='mt-10 flex w-full justify-center gap-12'>
          <select
            name='languages'
            id='languages'
            value={language.userLanguage}
            onChange={e => {
              language.userLanguageChange(e.target.value);
            }}
            className='w-fit px-6 py-3'>
            {languageOptions.map(item => (
              <option
                key={item.value}
                value={item.value}>
                {Localize({ tid: item.value })}
              </option>
            ))}
          </select>
          <a
            href='/login'
            className='px-6 py-3 text-base font-medium'>
            {Localize({ tid: 'contact' })}
          </a>
          <a
            href='/signup'
            className='px-6 py-3 text-base font-medium'>
            {Localize({ tid: 'register' })}
          </a>
        </div>
        <Outlet />
        <div className='mb-6 flex w-full justify-center gap-2'>
          <span>HRM</span>
          <span>&copy;</span>
          <span>2024</span>
          <span>&#8226;</span>
          <span>Stg</span>
          <span>&#8226;</span>
          <span>Version 0.0.1</span>
        </div>
      </div>
    </div>
  );
}

export default PublicView;
