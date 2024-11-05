import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ButtonRoot from '@/components/button';
import FlexRoot from '@/components/flex';
import Heading from '@/components/heading';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import ImageRoot from '@/components/image';
import InputRoot from '@/components/input';

import ImageOtp from '../../../../../public/image-otp.png';
import { LocalizeTypeFunc } from "@/context/languages";

interface IForgotPassword {
  isLoading?: boolean;
  handleSubmitPhone?: () => void;
  setPhoneNumber: (data: any) => void;
  phoneNumber: string;
  setError: (data: any) => void;
  isError: boolean;
  isCheckPhone: boolean;
  setOtpValues: (data: any) => void;
  otpValues: string[];
  timeLeft: number;
  setIsCounting: (data: any) => void;
  setTimeLeft: (data: any) => void;
}

function ForgotPasswordView(props: IForgotPassword) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleInputChange = (index: number, value: string) => {
    props.setOtpValues((prevValues: string[]) => {
      prevValues[index] = value;
      return [...prevValues];
    });
  };

  const handleRefreshOtp = () => {
    if (props.timeLeft < 40) {
      props.setIsCounting(false);
      props.setTimeLeft(59);
      props.setIsCounting(true);
      props.setOtpValues(['', '', '', '', '', '']);

      toast.success(LocalizeTypeFunc('isResendCode'));
    }
  };

  return (
    <>
      <div
        className='absolute top-0 ml-8 mt-8 flex cursor-pointer items-center gap-3'
        onClick={handleGoBack}>
        <IconRoot icon={IconVariable.arrowLeft} />
        <div>{LocalizeTypeFunc('back')}</div>
      </div>
      <div className='mx-[116px] my-[88px]'>
        <div className='flex justify-center'>
          <FlexRoot
            direction='column'
            gap={40}>
            <div className='px-[120px]'>
              <ImageRoot
                src={ImageOtp}
                alt='Image OTP'
              />
            </div>
            <FlexRoot
              direction='column'
              gap={32}>
              <FlexRoot
                gap={12}
                direction='column'>
                <Heading
                  children={LocalizeTypeFunc('verifyPhoneNumber')}
                  className='text-center text-36x44 font-bold text-[#1A1A1A]'
                />
                <div>
                  <h4 className='text-center text-16x20 font-medium text-[#616161]'>
                    {props.isCheckPhone ? (
                      <div>
                        {LocalizeTypeFunc('sendPhoneNumber')}&nbsp;
                        <span className='font-bold text-[#1A1A1A]'>{props.phoneNumber}</span>
                      </div>
                    ) : (
                      LocalizeTypeFunc('enter.verifyPhoneNumber')
                    )}
                  </h4>
                </div>
              </FlexRoot>
              {props.isCheckPhone ? (
                <div className='flex flex-col items-center justify-center'>
                  <div className='font-medium'>{LocalizeTypeFunc('enter.verificationCode')} (OTP)</div>
                  <FlexRoot
                    gap={24}
                    className='mt-4'>
                    {Array.from({ length: 6 }).map((item, index) => (
                      <InputRoot
                        maxLength={1}
                        name={`${index + 1}`}
                        key={index + 1}
                        tabIndex={index + 1}
                        readOnly={false}
                        onChange={e => {
                          let value = e.target.value;
                          value = value.replace(/\D/g, '');
                          handleInputChange(index, value);
                        }}
                        onKeyDown={e => {
                          if (e.key === 'Backspace' && (e.target as HTMLInputElement).value === '' && index > 0) {
                            const prevInput = document.querySelector(`input[name="${index}"]`);
                            if (prevInput && prevInput instanceof HTMLInputElement) {
                              prevInput.focus();
                            }
                          }
                        }}
                        onKeyUp={e => {
                          if ((e.target as HTMLInputElement).value.length === 1 && index < 5) {
                            const nextInput = document.querySelector(`input[name="${index + 2}"]`);
                            if (nextInput && nextInput instanceof HTMLInputElement) {
                              nextInput.focus();
                            }
                          }
                        }}
                        value={props.otpValues[index]}
                        className={`w-[40px] ${props.otpValues[index] ? 'border-[#2DB976]' : ''} focus:border-2 focus:border-[#2DB976]`}
                        classNameInput='text-center border-[#E0E0E0]'
                      />
                    ))}
                  </FlexRoot>
                  <div className='mt-8 flex items-center gap-2 text-[#616161]'>
                    <div>
                      {LocalizeTypeFunc('resendCode')} <span className='text-[#0088E4]'>{props.timeLeft}</span>{' '}
                      {LocalizeTypeFunc('second')}
                    </div>
                    <IconRoot
                      icon={IconVariable.refresh}
                      onClick={handleRefreshOtp}
                    />
                  </div>
                </div>
              ) : (
                <FlexRoot
                  direction='column'
                  gap={32}
                  className='px-[57px]'>
                  <InputRoot
                    readOnly={false}
                    name='phoneNumber'
                    label={LocalizeTypeFunc('phoneNumber')}
                    placeholder={LocalizeTypeFunc('enter.phoneNumber')}
                    iconStart={<IconRoot icon={IconVariable.phone} />}
                    onChange={e => {
                      let value = e.target.value;
                      value = value.replace(/\D/g, '');
                      props.setPhoneNumber(value);
                    }}
                    value={props.phoneNumber}
                    errorString={props.isError ? LocalizeTypeFunc('10PhoneNumber') : undefined}
                  />
                  <ButtonRoot
                    name={LocalizeTypeFunc('continue')}
                    customClassName='h-[54px]'
                    onClick={props.handleSubmitPhone}
                  />
                </FlexRoot>
              )}
            </FlexRoot>
          </FlexRoot>
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordView;
