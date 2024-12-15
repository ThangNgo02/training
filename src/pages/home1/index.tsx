import './style/main.scss';

import Header from './component/Header';
import HomeView1 from './view';

// eslint-disable-next-line @typescript-eslint/naming-convention
const HomePage1 = () => {
  return (
    <div>
      <Header />
      <HomeView1 />
      {/* <Footer></Footer> */}
    </div>
  );
};

export default HomePage1;
