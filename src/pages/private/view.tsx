import { CaretDown, CaretRight, CaretUp } from '@phosphor-icons/react';
import { Briefcase } from '@phosphor-icons/react/dist/ssr';
import { type NavigateFunction, Outlet } from 'react-router-dom';

import { type IContextLanguage, Localize } from '@/context/languages';
import { languageOptions } from '@/languages';
import { rootRoutes } from '@/routes';

interface IPublicProps {
  language: IContextLanguage;
  name: string;
  navigate: NavigateFunction;
  profile: any;
}

function PrivateView({ language, profile, navigate, name }: IPublicProps) {
  return (
    <div className='flex w-max min-w-full flex-row'>
      <div className='flex h-screen min-w-[240px] flex-col items-center bg-sidebar pl-4 pr-4 pt-6'>
        <div className='flex w-full flex-row border-b-[1px] border-b-white pb-3'>
          <div className="bg-cotain h-[60px] w-[95px] bg-[url('src/assets/images/tsp-logo.svg')] bg-center bg-no-repeat"></div>
          <div className='my-2 ml-3 flex flex-col justify-center'>
            <span className='text-18x22 font-bold text-white'>HR</span>
            <span className='text-18x22 font-bold text-white'>MANAGER</span>
          </div>
        </div>
        <div className='mt-5 flex h-14 w-full flex-row justify-between rounded-xl bg-white bg-opacity-60 p-2'>
          <div className='flex flex-row'>
            <div className="h-10 w-10 rounded-full border-[1px] border-white bg-[url('src/assets/images/tsp-logo.svg')] bg-cover bg-center bg-no-repeat"></div>
            <div className='ml-2 flex flex-col justify-start pt-[2px]'>
              <span className='text-sm font-medium text-custom-0'>{profile?.fullName ?? 'Không có tên'}</span>
              <span className='text-xs text-secondary'>{profile?.position ?? ''}</span>
            </div>
          </div>
          <div className='relative right-4 flex'>
            <CaretUp
              weight='fill'
              color='#616161'
              className='absolute top-2'
            />
            <CaretDown
              weight='fill'
              color='#616161'
              className='absolute top-4'
            />
          </div>
        </div>
        <div className='mt-4 flex h-fit w-full flex-col'>
          {rootRoutes[1].children?.map(page => (
            <button
              key={page.path}
              onClick={() => {
                navigate(page.path);
              }}
              className='flex h-14 w-full flex-row items-center justify-between rounded-xl px-4 py-[30px]'>
              <div className='flex flex-row items-center'>
                <Briefcase
                  weight='fill'
                  color='#FFFFFF'
                  size={24}
                />
                <div className='ml-2 text-white'>{page.name ? Localize({ tid: page.name }) : page.path}</div>
              </div>
              <CaretRight
                weight='regular'
                color='#667085'
                size={18}
              />
            </button>
          ))}
        </div>
        <select
          name='languages'
          id='languages'
          value={language.userLanguage}
          onChange={e => {
            language.userLanguageChange(e.target.value);
          }}
          className='m-3 h-11 w-full rounded-lg bg-transparent text-white'>
          {languageOptions.map(item => (
            <option
              key={item.value}
              value={item.value}
              className='border-none bg-sidebar'>
              {Localize({ tid: item.value })}
            </option>
          ))}
        </select>
      </div>
      <div className='flex w-full max-w-[calc(100vw-240px)] flex-col'>
        <div className='h-20 w-full content-center border-b-[1px] border-b-devider p-6 text-2xl font-bold'>
          {Localize({
            tid: rootRoutes[1].children?.find(child => child.path === window.location.pathname)?.name ?? 'none',
          })}
        </div>
        <div className='h-full bg-private-background'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default PrivateView;
