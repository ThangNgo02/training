import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import LoginView from './view';

function Login() {
  const methods = useForm();
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const handleLogin = () => {
    console.log('data', data);
  };

  return (
    <FormProvider {...methods}>
      <LoginView
        handleCallApi={handleLogin}
        setData={setData}
        data={data}
      />
    </FormProvider>
  );
}

export default Login;
