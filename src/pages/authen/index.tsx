import { useState } from 'react';

import Authen from './view';

function LoginIndex() {
  const [data, setData] = useState<any>();

  const handleLogin = () => {
    console.log('login');
  };

  return (
    <Authen
      handleCallApi={handleLogin}
      isLoading={false}
      data={data}
    />
  );
}

export default LoginIndex;
