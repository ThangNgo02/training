import { useState } from 'react';

import LoginView from '@/pages/login/view';

function LoginIndex() {
  const [data, setData] = useState<any>();

  const handleLogin = () => {
    console.log('login');
  };

  return (
    <LoginView
      handleCallApi={handleLogin}
      isLoading={false}
      data={data}
    />
  );
}

export default LoginIndex;
