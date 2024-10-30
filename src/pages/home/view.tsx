import { Localize } from '@/context/languages';

interface IHomeView {
  data: any;
}

function HomeView({ data }: IHomeView) {
  return (
    <div className='h-full w-full bg-[#f5f5f5] p-5 text-center'>
      <div className='flex h-full w-full justify-center gap-10 rounded-lg bg-white p-10 text-2xl font-bold'>
        <p>
          <Localize tid={'hello'} />
        </p>
        <p>{data?.staffId}</p>
        <p>{data?.fullName}</p>
        <p>{data?.department}</p>
        <p>{data?.username}</p>
        <p>{data?.email}</p>
        <p>{data?.phoneNumber}</p>
      </div>
    </div>
  );
}

export default HomeView;
