import './style/main.scss';

import { HeartOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';

// eslint-disable-next-line @typescript-eslint/naming-convention
const HomeView1 = () => {
  return (
    <div className='body'>
      {/* Part 1 */}
      <div className='body__part1'>
        <div className='body__part1-background'>
          <div className='body__part1-content'>
            <p>New Arrival</p>
            <h1>Discover Our New Collection</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
            </p>
            <a href='/buy'> Buy now</a>
          </div>
        </div>
      </div>

      {/* Part 2 */}
      <div className='body__part2'>
        <div className='body__part2-background'>
          <div className='body__part2-content'>
            <h1>Browse The Range</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className='cards'>
              <div className='card'>
                <img
                  src='/homepage1_image.png'
                  alt='Dining'
                />
                <p>Dining</p>
              </div>
              <div className='card'>
                <img
                  src='/homepage1_image.png'
                  alt='Living'
                />
                <p>Living</p>
              </div>
              <div className='card'>
                <img
                  src='/homepage1_image.png'
                  alt='Bedroom'
                />
                <p>Bedroom</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part 3 */}
      <div className='body__part3'>
        <div className='body__part3-background'>
          <div className='body__part3-content'>
            <h1>Our Products</h1>
            <div className='cards'>
              <div className='card'>
                <img
                  src='/homepage1_image.png'
                  alt='Dining Chair'
                />
                <div className='card-details'>
                  <h1>Sytherine</h1>
                  <p>Stylish cafe chair</p>
                  <div className='price'>
                    <span className='discounted'>Rp 2.500.000</span>
                    <span className='original'>Rp 3.500.000</span>
                  </div>
                </div>
                <div className='hover-overlay'>
                  <a href='#'>Add to cart</a>
                  <div className='hover__icons'>
                    <UserOutlined className='hover__icon' />
                    <span className=''>share</span>
                    <SearchOutlined className='hover__icon' />
                    <span className=''>Compare</span>
                    <HeartOutlined className='hover__icon' />
                    <span className=''>Like</span>
                  </div>
                </div>
              </div>

              <div className='card'>
                <img
                  src='/homepage1_image.png'
                  alt='Living Chair'
                />
                <div className='card-details'>
                  <h1>Leviosa</h1>
                  <p>Comfortable living chair</p>
                  <div className='price'>
                    <span className='discounted'>Rp 2.000.000</span>
                    <span className='original'>Rp 2.800.000</span>
                  </div>
                </div>
                <div className='hover-overlay'>
                  <a href='#'>Add to cart</a>
                  <div className='hover__icons'>
                    <UserOutlined className='hover__icon' />
                    <span className=''>share</span>
                    <SearchOutlined className='hover__icon' />
                    <span className=''>Compare</span>
                    <HeartOutlined className='hover__icon' />
                    <span className=''>Like</span>
                  </div>
                </div>
              </div>

              <div className='card'>
                <img
                  src='/homepage1_image.png'
                  alt='Living Chair'
                />
                <div className='card-details'>
                  <h1>Leviosa</h1>
                  <p>Comfortable living chair</p>
                  <div className='price'>
                    <span className='discounted'>Rp 2.000.000</span>
                  </div>
                </div>
                <div className='hover-overlay'>
                  <a href='#'>Add to cart</a>
                  <div className='hover__icons'>
                    <UserOutlined className='hover__icon' />
                    <span className=''>share</span>
                    <SearchOutlined className='hover__icon' />
                    <span className=''>Compare</span>
                    <HeartOutlined className='hover__icon' />
                    <span className=''>Like</span>
                  </div>
                </div>
              </div>

              <div className='card'>
                <img
                  src='/homepage1_image.png'
                  alt='Living Chair'
                />
                <div className='card-details'>
                  <h1>Leviosa</h1>
                  <p>Comfortable living chair</p>
                  <div className='price'>
                    <span className='discounted'>Rp 2.000.000</span>
                    <span className='original'>Rp 2.800.000</span>
                  </div>
                </div>
                <div className='hover-overlay'>
                  <a href='#'>Add to cart</a>
                  <div className='hover__icons'>
                    <UserOutlined className='hover__icon' />
                    <span className=''>share</span>
                    <SearchOutlined className='hover__icon' />
                    <span className=''>Compare</span>
                    <HeartOutlined className='hover__icon' />
                    <span className=''>Like</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView1;
