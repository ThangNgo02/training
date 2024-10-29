interface IHomeView {
  data: any;
}

function HomeView({ data }: IHomeView) {
  return (
    <div>
      <p>Chào mừng bạn đến với trang chủ</p>
      <p>{data?.staffId}</p>
      <p>{data?.fullName}</p>
      <p>{data?.department}</p>
      <p>{data?.username}</p>
      <p>{data?.email}</p>
      <p>{data?.phoneNumber}</p>
    </div>
  );
}

export default HomeView;
