import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox } from 'antd';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';

import Form from '@/components/form';
import InputRoot from '@/components/input';

import { type IStaffDataType } from '..';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface AddFormValues {
  code: string;
  fullName: string;
  position: string;
  departmentCode: string;
  birthDate: string;
  email: string;
  gender: string;
  hireDate: string;
  identityCard: string;
  isResigned: boolean;
  issueDateIdentityCard: string;
  issuePlaceIdentityCard: string;
  note: string;
  permanentAddress: string;
  phoneNumber: string;
  resignDate: string;
  socialInsuranceCode: string;
  staffMetaDataLevel: string;
  taxCode: string;
  temporaryAddress: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const AddForm = ({
  onSubmit,
  totalData,
  onClose,
}: {
  onSubmit: (values: AddFormValues) => void;
  totalData: IStaffDataType[];
  onClose: () => void;
}) => {
  const methods = useFormContext();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [disableWorkingDate, setDisableWorkingDate] = useState(false);
  const [formValues, setFormValues] = useState<AddFormValues>({
    code: '',
    fullName: '',
    position: '',
    departmentCode: '',
    staffMetaDataLevel: '',
    phoneNumber: '',
    email: '',
    note: '',
    birthDate: '',
    gender: '',
    socialInsuranceCode: '',
    taxCode: '',
    identityCard: '',
    issueDateIdentityCard: '',
    issuePlaceIdentityCard: '',
    permanentAddress: '',
    temporaryAddress: '',
    hireDate: '',
    resignDate: '',
    isResigned: false,
  });

  // Get all departments from totalData
  const allDepartments = totalData.map((item: IStaffDataType) => ({
    id: item.department!.id,
    code: item.department!.code,
  }));

  const handleInputChange = (fieldName: keyof AddFormValues, value: string) => {
    setFormValues(prev => ({ ...prev, [fieldName]: value }));
    methods?.setValue(fieldName, value); // This updates React Hook Form's state as well
  };

  const handleResetInput = (e: React.MouseEvent<HTMLElement>, fieldName: string) => {
    e.stopPropagation();
    setFormValues(prev => ({ ...prev, [fieldName]: '' }));
    methods?.setValue(fieldName, '');
  };

  const handleResetForm = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const resetValues: AddFormValues = {
      code: '',
      fullName: '',
      position: '',
      departmentCode: '',
      staffMetaDataLevel: '',
      phoneNumber: '',
      email: '',
      note: '',
      birthDate: '',
      gender: '',
      socialInsuranceCode: '',
      taxCode: '',
      identityCard: '',
      issueDateIdentityCard: '',
      issuePlaceIdentityCard: '',
      permanentAddress: '',
      temporaryAddress: '',
      hireDate: '',
      resignDate: '',
      isResigned: false,
    };

    // Update local state
    setFormValues(resetValues);

    // Reset all form values using methods from useFormContext
    for (const key of Object.keys(resetValues)) {
      methods.setValue(key, resetValues[key as keyof AddFormValues], {
        shouldValidate: false, // Prevent validation on reset
        shouldDirty: false, // Reset dirty state
        shouldTouch: false, // Reset touched state
      });
    }

    // Clear all errors
    methods.clearErrors();

    // Reset form state
    methods.reset(resetValues);

    // Reset working date checkbox
    setDisableWorkingDate(false);
  };

  const handleFormSubmit = (data: AddFormValues) => {
    // Combine form data with state values and checkbox state
    const submitData = {
      ...data,
      isResigned: disableWorkingDate,
    };

    console.log('Form data:', submitData);
    onSubmit(submitData);
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='h-screen w-screen overflow-y-auto bg-white '>
        <Form
          onSubmit={handleFormSubmit}
          validator={{
            code: yup
              .string()
              .required('Mã nhân viên không được chứa khoảng trống và tối đa 20 ký tự')
              .trim()
              .max(20, 'Mã nhân viên không được chứa khoảng trống và tối đa 20 ký tự'),
            fullName: yup.string().required('Tên nhân viên không được để trống').trim(),
            departmentCode: yup.string().required('Mã phòng ban không được để trống').trim(),
            gender: yup.string().required('Gioi tinh không được để trống'),
            email: yup.string().email('Email không hợp lệ').nullable(),
            phoneNumber: yup
              .string()
              .matches(/^\d*$/, 'Số điện thoại chỉ được chứa số')
              .nullable()
              .min(9, 'Số điện thoại phải có ít nhất 9 ký tự')
              .trim(),
            identityCard: yup
              .string()
              .matches(/^\d*$/, 'CCCD chỉ được nhập số và tối đa 20 ký tự.')
              .max(20, 'CCCD chỉ được nhập số và tối đa 20 ký tự.')
              .trim(),
          }}>
          <div className='sticky top-0 flex w-full justify-between bg-white p-1'>
            <h1 className='mb-5 bg-white text-3xl font-bold'>Thêm mới hồ sơ nhân viên </h1>

            <div className='flex items-center space-x-4 pr-4'>
              <Button
                className='bg-gray-400 text-white hover:bg-gray-500'
                onClick={e => {
                  e.stopPropagation();
                  onClose();
                  handleResetForm(e);
                }}>
                Đóng
              </Button>

              <Button
                htmlType='submit'
                className='bg-[#4d7bc2] text-white hover:bg-[#3d69b0]'>
                Thêm
              </Button>
            </div>
          </div>

          <hr className='mt-4' />

          <h1 className=' p-4 text-xl font-bold'>Thông tin chi tiết </h1>

          <div
            onClick={e => {
              e.stopPropagation();
            }}
            className='p-4'>
            <div className='grid gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
              {/* first part */}
              <div className='bg-[#e0ecf9]'>
                <div className=' p-4'>
                  <div className='grid gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
                    <div
                      className='w-full'
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <label
                        htmlFor='code'
                        className='mb-1 block text-sm font-bold text-gray-700'>
                        Mã nhân viên
                      </label>
                      <InputRoot
                        type='text'
                        id='code'
                        name='code'
                        placeholder='Nhập mã nhân viên'
                        value={formValues.code}
                        onChange={e => {
                          handleInputChange('code', e.target.value);
                        }}
                        errorString={
                          // eslint-disable-next-line @typescript-eslint/no-base-to-string
                          methods?.formState?.errors?.code ? methods?.formState?.errors?.code?.toString() : ''
                        }
                        className='w-full rounded-md border bg-white px-3 py-2 focus:outline-none'
                      />
                    </div>

                    <div
                      className='mb-1'
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <label
                        htmlFor='fullName'
                        className='mb-1 block text-sm font-bold text-gray-700'>
                        Tên nhân viên
                      </label>

                      <div className=''>
                        <InputRoot
                          type='text'
                          id='fullName'
                          name='fullName'
                          placeholder='Nhập tên nhân viên'
                          value={formValues.fullName}
                          onChange={e => {
                            handleInputChange('fullName', e.target.value);
                          }}
                          errorString={
                            // eslint-disable-next-line @typescript-eslint/no-base-to-string
                            methods?.formState?.errors?.fullName
                              ? // eslint-disable-next-line @typescript-eslint/no-base-to-string
                              methods?.formState?.errors?.fullName?.toString()
                              : ''
                          }
                          className='w-full rounded-md border bg-white px-3 py-2 focus:outline-none'
                        />
                      </div>
                    </div>

                    <div
                      className='w-full'
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <label
                        htmlFor='position'
                        className='mb-1 block text-sm font-bold text-gray-700'>
                        Chức vụ
                      </label>

                      <InputRoot
                        type='text'
                        id='position'
                        name='position'
                        placeholder='Nhập chức vụ'
                        value={formValues.position}
                        onChange={e => {
                          handleInputChange('position', e.target.value);
                        }}
                        className='w-full rounded-md border bg-white px-3 py-2 focus:outline-none'
                      />
                    </div>

                    <div
                      className='static'
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <label
                        htmlFor='departmentCode'
                        className='mb-1 block text-sm font-bold text-gray-700'>
                        Phòng ban
                      </label>

                      <div className='relative w-full'>
                        <select
                          name='departmentCode'
                          id='departmentCode'
                          value={formValues.departmentCode || ''}
                          onChange={e => {
                            handleInputChange('departmentCode', e.target.value);
                          }}
                          className={`w-full appearance-none rounded-md border px-3 py-2 pr-10 font-semibold
        ${(methods?.formState?.errors?.departmentCode ?? formValues.departmentCode === '')
                              ? 'border-red-500'
                              : 'border-gray-400'
                            } focus:outline-none`}>
                          <option
                            value=''
                            className='text-[##a8a8a8]'
                            disabled
                            hidden>
                            Chọn phòng ban
                          </option>
                          {allDepartments.map((dept, index) => (
                            <option
                              key={`${dept?.id}-${dept?.code}-${index}`}
                              value={dept.code}>
                              {dept.code}
                            </option>
                          ))}
                        </select>

                        {/* Icon positioned within the select field */}
                        {formValues.departmentCode && (
                          <CloseCircleOutlined
                            onClick={e => {
                              handleResetInput(e, 'departmentCode');
                            }}
                            className='absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 hover:cursor-pointer'
                            style={{ fontSize: '16px' }}
                          />
                        )}
                      </div>

                      {/* Error message below the select field */}
                      {(methods?.formState?.errors?.departmentCode ?? formValues.departmentCode === '') && (
                        <span className='text-sm text-red-500'>
                          {methods?.formState?.errors?.departmentCode?.message?.toString() ?? 'Vui lòng chọn phòng ban'}
                        </span>
                      )}
                    </div>

                    <div
                      className=''
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <label
                        htmlFor='staffMetaDataLevel'
                        className='mb-1 block text-sm font-bold text-gray-700'>
                        Bậc
                      </label>
                      <div className='relative w-full'>
                        <select
                          name='staffMetaDataLevel'
                          id='staffMetaDataLevel'
                          value={formValues.staffMetaDataLevel || ''}
                          onChange={e => {
                            handleInputChange('staffMetaDataLevel', e.target.value);
                          }}
                          className='w-full rounded-md border border-gray-400 px-3 py-2.5 pr-10 font-semibold'>
                          <option
                            value=''
                            className='text-[##a8a8a8]'
                            disabled
                            hidden>
                            Chọn bậc
                          </option>
                          <option value='LEVEL_0'>0</option>
                          <option value='LEVEL_1'>1</option>
                          <option value='LEVEL_2'>2</option>
                          <option value='LEVEL_3'>3</option>
                          <option value='LEVEL_4'>4</option>
                          <option value='LEVEL_5'>5</option>
                          <option value='LEVEL_6'>6</option>
                          <option value='LEVEL_7'>7</option>
                          <option value='LEVEL_8'>8</option>
                        </select>

                        {formValues.staffMetaDataLevel && (
                          <CloseCircleOutlined
                            onClick={e => {
                              handleResetInput(e, 'staffMetaDataLevel');
                            }}
                            className='absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-500 hover:cursor-pointer'
                            style={{ fontSize: '16px' }}
                          />
                        )}
                      </div>
                    </div>

                    <div
                      className='w-full'
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <label
                        htmlFor='phoneNumber'
                        className='mb-1 block text-sm font-bold text-gray-700'>
                        Số điện thoại
                      </label>

                      <InputRoot
                        type='text'
                        id='phoneNumber'
                        name='phoneNumber'
                        value={formValues.phoneNumber}
                        onChange={e => {
                          const value = e.target.value;
                          // Only allow number in the input
                          if (/^\d*$/.test(value)) {
                            handleInputChange('phoneNumber', value);
                          }
                        }}
                        placeholder='Nhập số điện thoại'
                        className='w-full rounded-md border bg-white px-3 py-2 focus:outline-none'
                      />
                    </div>
                  </div>
                </div>

                <div className='w-full p-4'>
                  <label
                    htmlFor='email'
                    className='mb-1 text-sm font-bold text-gray-700'>
                    Email
                  </label>
                  <InputRoot
                    type='text'
                    id='email'
                    name='email'
                    placeholder='Nhập email'
                    value={formValues.email}
                    onChange={e => {
                      handleInputChange('email', e.target.value);
                    }}
                    className='w-full rounded-md border bg-white px-3 py-2 focus:outline-none'
                  />

                  <label
                    htmlFor='note'
                    className='mb-1 text-sm font-bold text-gray-700'>
                    Ghi chú
                  </label>
                  <textarea
                    id='note'
                    name='note'
                    placeholder='Ghi chú'
                    value={formValues.note}
                    onChange={e => {
                      handleInputChange('note', e.target.value);
                    }}
                    className='min-h-44 w-full rounded-md border bg-white px-3 py-2 focus:outline-none'
                  />
                </div>
              </div>

              {/* second part */}
              <div className='bg-[#e0ecf9] '>
                <div className=' p-4'>
                  <div className='grid gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
                    <div
                      className='w-full'
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <label
                        htmlFor='birthDate'
                        className='mb-1 block text-sm font-bold text-gray-700'>
                        Ngày sinh
                      </label>

                      <InputRoot
                        type={formValues.birthDate ? 'date' : 'text'} // Change type based on whether there's a value
                        id='birthDate'
                        name='birthDate'
                        placeholder='Chọn ngày sinh'
                        value={formValues.birthDate}
                        onFocus={e => {
                          e.target.type = 'date';
                          e.target.showPicker(); // Show date picker when focused
                        }}
                        onBlur={e => {
                          if (!e.target.value) {
                            e.target.type = 'text';
                          }
                        }}
                        onChange={e => {
                          handleInputChange('birthDate', e.target.value);
                        }}
                        className='w-full rounded-md border bg-white px-3 py-2 focus:outline-none'
                        iconEnd={
                          formValues.birthDate && (
                            <CloseCircleOutlined
                              className='hover:cursor-pointer'
                              onClick={e => {
                                handleResetInput(e, 'birthDate');
                              }}
                            />
                          )
                        }
                      />
                    </div>

                    <div
                      className='w-full'
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <label
                        htmlFor='gender'
                        className='mb-1 block text-sm font-bold text-gray-700'>
                        Giới tính
                      </label>

                      <div className='relative w-full'>
                        <select
                          name='gender'
                          id='gender'
                          value={formValues.gender}
                          onChange={e => {
                            handleInputChange('gender', e.target.value);
                          }}
                          className={`w-full rounded-md border ${(methods?.formState?.errors?.gender ?? formValues.gender === '')
                            ? 'border-red-500'
                            : 'border-gray-400'
                            } px-3 py-2.5 pr-10 font-semibold`}>
                          <option
                            value=''
                            disabled
                            hidden>
                            Chọn giới tính
                          </option>
                          <option value='MALE'>Nam</option>
                          <option value='FEMALE'>Nữ</option>
                        </select>

                        {formValues.gender && (
                          <CloseCircleOutlined
                            onClick={e => {
                              handleResetInput(e, 'gender');
                            }}
                            className='absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-500 hover:cursor-pointer'
                            style={{ fontSize: '16px' }}
                          />
                        )}
                      </div>
                      {(methods?.formState?.errors?.gender ?? formValues.gender === '') && (
                        <span className='text-sm text-red-500'>
                          {methods?.formState?.errors?.gender?.message?.toString() ?? 'Vui lòng chọn giới tính'}
                        </span>
                      )}
                    </div>

                    <div
                      className='w-full'
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <label
                        htmlFor='socialInsuranceCode'
                        className='mb-1 block text-sm font-bold text-gray-700'>
                        BHXH
                      </label>

                      <InputRoot
                        type='text'
                        id='socialInsuranceCode'
                        name='socialInsuranceCode'
                        placeholder='Điền BHXH'
                        value={formValues.socialInsuranceCode}
                        onChange={e => {
                          handleInputChange('socialInsuranceCode', e.target.value);
                        }}
                        className='w-full rounded-md border bg-white px-3 py-2 focus:outline-none'
                      />
                    </div>

                    <div
                      className='mb-1'
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <label
                        htmlFor='taxCode'
                        className='mb-1 block text-sm font-bold text-gray-700'>
                        Mã số thuế
                      </label>

                      <div className=''>
                        <InputRoot
                          type='text'
                          id='taxCode'
                          name='taxCode'
                          placeholder='Điền mã số thuế'
                          value={formValues.taxCode}
                          onChange={e => {
                            handleInputChange('taxCode', e.target.value);
                          }}
                          className='w-full rounded-md border bg-white px-3 py-2 focus:outline-none'
                        />
                      </div>
                    </div>

                    <div
                      className='w-full'
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <label
                        htmlFor='identityCard'
                        className='mb-1 block text-sm font-bold text-gray-700'>
                        CCCD
                      </label>
                      <InputRoot
                        type='text'
                        id='identityCard'
                        name='identityCard'
                        placeholder='Điền CCCD'
                        value={formValues.identityCard}
                        onChange={e => {
                          handleInputChange('identityCard', e.target.value);
                        }}
                        className='w-full rounded-md border bg-white px-3 py-2 focus:outline-none'
                      />
                    </div>

                    <div
                      className='mb-1'
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <label
                        htmlFor='issueDateIdentityCard'
                        className='mb-1 block text-sm font-bold text-gray-700'>
                        Ngày cấp
                      </label>

                      <InputRoot
                        type={formValues.issueDateIdentityCard ? 'date' : 'text'}
                        id='issueDateIdentityCard'
                        name='issueDateIdentityCard'
                        placeholder='Điền ngày cấp CCCD'
                        value={formValues.issueDateIdentityCard}
                        onFocus={e => {
                          e.target.type = 'date';
                          e.target.showPicker();
                        }}
                        onBlur={e => {
                          if (!e.target.value) {
                            e.target.type = 'text';
                          }
                        }}
                        onChange={e => {
                          handleInputChange('issueDateIdentityCard', e.target.value);
                        }}
                        className='w-full rounded-md border bg-white px-3 py-2 focus:outline-none'
                        iconEnd={
                          formValues.issueDateIdentityCard && (
                            <CloseCircleOutlined
                              className='hover:cursor-pointer'
                              onClick={e => {
                                handleResetInput(e, 'issueDateIdentityCard');
                              }}
                            />
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className='w-full p-4'>
                  <label
                    htmlFor='issuePlaceIdentityCard'
                    className='mb-1 text-sm font-bold text-gray-700'>
                    Nơi cấp
                  </label>
                  <InputRoot
                    type='text'
                    id='issuePlaceIdentityCard'
                    name='issuePlaceIdentityCard'
                    placeholder='Điền nơi cấp CCCD'
                    value={formValues.issuePlaceIdentityCard}
                    onChange={e => {
                      handleInputChange('issuePlaceIdentityCard', e.target.value);
                    }}
                    className='w-full rounded-md border bg-white px-3 py-2 focus:outline-none'
                  />

                  <label
                    htmlFor='permanentAddress'
                    className='mb-1 text-sm font-bold text-gray-700'>
                    Địa chỉ thường trú
                  </label>
                  <InputRoot
                    type='text'
                    id='permanentAddress'
                    name='permanentAddress'
                    placeholder='Điền địa chỉ thường trú'
                    value={formValues.permanentAddress}
                    onChange={e => {
                      handleInputChange('permanentAddress', e.target.value);
                    }}
                    className='w-full rounded-md border bg-white px-3 py-2 focus:outline-none'
                  />

                  <label
                    htmlFor='temporaryAddress'
                    className='mb-1 text-sm font-bold text-gray-700'>
                    Địa chỉ tạm trú
                  </label>
                  <InputRoot
                    type='text'
                    id='temporaryAddress'
                    name='temporaryAddress'
                    placeholder='Điền địa chỉ tạm trú'
                    value={formValues.temporaryAddress}
                    onChange={e => {
                      handleInputChange('temporaryAddress', e.target.value);
                    }}
                    className='w-full rounded-md border bg-white px-3 py-2 focus:outline-none'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* third part */}
          <hr className='my-4' />

          <h1 className='p-4 text-xl font-bold'>Thời gian làm việc</h1>
          <div
            className='p-4 sm:grid sm:grid-cols-1 lg:flex'
            onClick={e => {
              e.stopPropagation();
            }}>
            <div className='w-[30%]'>
              <label
                htmlFor='hireDate'
                className='ml-4 text-sm font-bold text-gray-700'>
                Ngày bắt đầu làm
              </label>
              <InputRoot
                type={formValues.hireDate ? 'date' : 'text'}
                id='hireDate'
                name='hireDate'
                placeholder='Chọn ngày bắt đầu làm'
                value={formValues.hireDate}
                onFocus={e => {
                  e.target.type = 'date';
                  e.target.showPicker();
                }}
                onBlur={e => {
                  if (!e.target.value) {
                    e.target.type = 'text';
                  }
                }}
                onChange={e => {
                  handleInputChange('hireDate', e.target.value);
                }}
                className='ml-4 w-full rounded-md border bg-white px-3 py-2 focus:outline-none'
                iconEnd={
                  formValues.hireDate && (
                    <CloseCircleOutlined
                      className='hover:cursor-pointer'
                      onClick={e => {
                        handleResetInput(e, 'hireDate');
                      }}
                    />
                  )
                }
              />
            </div>

            <div className='mx-4 w-[30%]'>
              <label
                htmlFor='resignDate'
                className='mx-4 mb-1 text-sm font-bold text-gray-700'>
                Ngày nghỉ việc
              </label>
              <InputRoot
                type={formValues.resignDate ? 'date' : 'text'}
                id='resignDate'
                name='resignDate'
                placeholder='Chọn ngày nghỉ việc'
                value={formValues.resignDate}
                onFocus={e => {
                  e.target.type = 'date';
                  e.target.showPicker();
                }}
                onBlur={e => {
                  if (!e.target.value) {
                    e.target.type = 'text';
                  }
                }}
                onChange={e => {
                  handleInputChange('resignDate', e.target.value);
                }}
                className={` mx-4 w-full rounded-md border px-3 py-2 focus:outline-none ${disableWorkingDate ? 'bg-white' : 'bg-gray-200'
                  }`}
                disabled={!disableWorkingDate}
                iconEnd={
                  formValues.resignDate &&
                  disableWorkingDate && (
                    <CloseCircleOutlined
                      className='hover:cursor-pointer'
                      onClick={e => {
                        handleResetInput(e, 'resignDate');
                      }}
                    />
                  )
                }
              />
            </div>

            <div className='flex items-center justify-center'>
              <Checkbox
                // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
                onChange={e => {
                  setDisableWorkingDate(e.target.checked);
                  handleInputChange('isResigned', e.target.checked.toString());
                }}
                value={formValues.isResigned}
                checked={disableWorkingDate}
                className=' mx-4'>
                Nghỉ việc
              </Checkbox>
            </div>
          </div>

          {/* fourth part */}
          <hr className='my-4' />

          <h1 className='p-4 text-xl font-bold'>Tài liệu, chứng từ</h1>

          <Button
            className='m-4 border-blue-300 bg-white text-blue-600 hover:border-blue-600 '
            onClick={e => {
              e.stopPropagation();
            }}>
            Tải lên
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddForm;
