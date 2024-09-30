/* eslint-disable no-useless-return */
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import ForgotPasswordView from './view';

function ForgotPassword() {
  const methods = useForm();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isError, setError] = useState(false);
  const [isCheckPhone, setCheckPhone] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(59);
  const [isCounting, setIsCounting] = useState(false);

  const handleSubmitPhone = () => {
    // eslint-disable-next-line prettier/prettier
    if(phoneNumber.length !== 10){
      setError(true);
      setPhoneNumber('');

      return;
    }

    setError(false);
    setCheckPhone(true);
    setIsCounting(true);
    setTimeLeft(59);
  };

  useEffect(() => {
    let intervalId: any;

    if (isCounting) {
      intervalId = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          setIsCounting(false);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isCounting, timeLeft]);

  const handleSubmitOtp = (data: string[]) => {
    // eslint-disable-next-line prettier/prettier
    if(data?.join('') !== '999999'){
      return toast.error('Mã OTP không trùng khớp');
    }

    toast.success('Xác thực thành công');
  };

  useEffect(() => {
    if (otpValues.every(value => value !== '')) {
      console.log('otpValues', otpValues);
      handleSubmitOtp(otpValues);
    }
  }, [otpValues]);

  return (
    <FormProvider {...methods}>
      <ForgotPasswordView
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        handleSubmitPhone={handleSubmitPhone}
        setError={setError}
        isError={isError}
        isCheckPhone={isCheckPhone}
        setOtpValues={setOtpValues}
        otpValues={otpValues}
        timeLeft={timeLeft}
        setIsCounting={setIsCounting}
        setTimeLeft={setTimeLeft}
      />
    </FormProvider>
  );
}

export default ForgotPassword;
