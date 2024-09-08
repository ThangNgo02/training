import { Button } from "antd";

interface IHomeView {
  isLoading: boolean;
  handleCallApi: () => void;
  data: any;
}

function HomeView({ isLoading, handleCallApi, data }: IHomeView) {
  return (
    <div>
      <div className='home-text_900 text-red-900'>Well come to our company</div>
      <button onClick={handleCallApi}>Click here to example call api</button>
      {isLoading ? <div>Loading</div> : <div>{JSON.stringify(data)}</div>}
      <div>
        AntD <br />
        <Button type='primary'>Button</Button>
      </div>
    </div>
  );
}

export default HomeView;
