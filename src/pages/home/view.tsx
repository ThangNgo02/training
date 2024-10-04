import { Localize } from '@/context/languages';

interface IHomeView {
  isLoading: boolean;
  handleCallApi: () => void;
  data: any;
}

function HomeView({ isLoading, handleCallApi, data }: IHomeView) {
  return (
    <>
      {/* <div className='home-text_900 flex text-wrap break-words text-red-900'>
        Welcome to our company, {data ? data.fullName : 'employee'}.
      </div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className='w-[calc(100vw-328px)] text-wrap break-words'>{JSON.stringify(data)}</div>
      )}
      <button
        onClick={handleCallApi}
        className='my-3 w-full rounded-md bg-red-800 px-3 py-2 text-white'>
        {Localize({ tid: 'logout' })}
      </button> */}
      1
    </>
  );
}

export default HomeView;
