import { FormProvider, useForm } from 'react-hook-form';

import ResetPasswordView from './view';

function ResetPassword() {
  const methods = useForm();

  const handleLogin = (data: any) => {
    console.log('data', data);
  };

  return (
    <FormProvider {...methods}>
      <ResetPasswordView handleCallApi={handleLogin} />
    </FormProvider>
  );
}

export default ResetPassword;
