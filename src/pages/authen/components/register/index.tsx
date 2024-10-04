import { FormProvider, useForm } from 'react-hook-form';

import RegisterView from './view';

function Register() {
  const methods = useForm();

  const handleLogin = (data: any) => {
    console.log('data', data);
  };

  return (
    <FormProvider {...methods}>
      <RegisterView handleCallApi={handleLogin} />
    </FormProvider>
  );
}

export default Register;
