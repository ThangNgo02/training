import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Select, Switch } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';

import Form, { type IFormRef } from '@/components/form';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';
import SelectRoot from '@/components/Select';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface WorkingTime {
  active: boolean;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  fromBreakTime: string;
  toBreakTime: string;
  totalHours: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface AddFormValues {
  code: string;
  name: string;
  shiftType: 'FIXED' | 'FLEXIBLE';
  departmentList: Array<{ code: string }>;
  note: string;
  overtime: boolean;
  overtimeForMinutes: number;
  workingTimes: WorkingTime[];
}

const validationSchema = {
  code: yup.string().required('Mã ca không được để trống'),
  name: yup.string().required('Tên ca không được để trống'),
  shiftType: yup.string().required('Loại ca không được để trống'),
};

const defaultFormValues: AddFormValues = {
  code: '',
  name: '',
  shiftType: 'FIXED',
  departmentList: [],
  note: '',
  overtime: false,
  overtimeForMinutes: 30,
  workingTimes: [
    {
      active: false,
      dayOfWeek: 'MONDAY',
      startTime: '',
      endTime: '',
      fromBreakTime: '',
      toBreakTime: '',
      totalHours: 0,
    },
    {
      active: false,
      dayOfWeek: 'TUESDAY',
      startTime: '',
      endTime: '',
      fromBreakTime: '',
      toBreakTime: '',
      totalHours: 0,
    },
    {
      active: false,
      dayOfWeek: 'WEDNESDAY',
      startTime: '',
      endTime: '',
      fromBreakTime: '',
      toBreakTime: '',
      totalHours: 0,
    },
    {
      active: false,
      dayOfWeek: 'THURSDAY',
      startTime: '',
      endTime: '',
      fromBreakTime: '',
      toBreakTime: '',
      totalHours: 0,
    },
    {
      active: false,
      dayOfWeek: 'FRIDAY',
      startTime: '',
      endTime: '',
      fromBreakTime: '',
      toBreakTime: '',
      totalHours: 0,
    },
    {
      active: false,
      dayOfWeek: 'SATURDAY',
      startTime: '',
      endTime: '',
      fromBreakTime: '',
      toBreakTime: '',
      totalHours: 0,
    },
    {
      active: false,
      dayOfWeek: 'SUNDAY',
      startTime: '',
      endTime: '',
      fromBreakTime: '',
      toBreakTime: '',
      totalHours: 0,
    },
  ],
};

// Prevent outer scroll
const usePreventScroll = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollPosition = window.pageYOffset;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      const scrollPosition = document.body.style.top;
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('width');
      window.scrollTo(0, Number.parseInt(scrollPosition || '0', 10) * -1);
    }

    return () => {
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('width');
    };
  }, [isOpen]);
};

// Define the weekdays
const weekdays = [
  { key: 'monday', label: 'Thứ Hai', dayOfWeek: 'MONDAY' },
  { key: 'tuesday', label: 'Thứ Ba', dayOfWeek: 'TUESDAY' },
  { key: 'wednesday', label: 'Thứ Tư', dayOfWeek: 'WEDNESDAY' },
  { key: 'thursday', label: 'Thứ Năm', dayOfWeek: 'THURSDAY' },
  { key: 'friday', label: 'Thứ Sáu', dayOfWeek: 'FRIDAY' },
  { key: 'saturday', label: 'Thứ Bảy', dayOfWeek: 'SATURDAY' },
  { key: 'sunday', label: 'Chủ Nhật', dayOfWeek: 'SUNDAY' },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
const AddForm = ({
  onSubmit,
  onClose,
  isOpen,
  totalData,
}: {
  onSubmit: (values: AddFormValues) => void;
  onClose: () => void;
  isOpen: boolean;
  totalData: any[];
}) => {
  const methods = useFormContext();
  const formRef = useRef<IFormRef>(null);
  const [isOvertimeEnabled, setIsOvertimeEnabled] = useState(false);
  const [overtimeMinutes, setOvertimeMinutes] = useState(30);

  const departments = totalData
    .filter(item => item.departmentList && Array.isArray(item.departmentList))
    .flatMap(item =>
      item.departmentList.map((dept: { code: any; name: any }) => ({
        code: dept.code,
        name: dept.name,
      })),
    );

  // Use a single state object to manage time data for each day
  const [times, setTimes] = useState(
    weekdays.reduce<Record<string, any>>((acc, day) => {
      acc[day.key] = {
        enabled: false,
        startTime: '',
        endTime: '',
        fromBreakTime: '',
        toBreakTime: '',
        isTimeError: false,
        isBreakTimeError: false,
      };
      return acc;
    }, {}),
  );

  const timeStringToMinutes = (time: string) => {
    if (!time) return 0;
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    return totalMinutes;
  };

  const handleTimeChange = (dayKey: string, field: string, value: string) => {
    setTimes(prev => {
      // Create new state with the updated time value
      const updatedDay = {
        ...prev[dayKey],
        [field]: value,
      };

      // Calculate total hours immediately
      const start = timeStringToMinutes(updatedDay.startTime);
      const end = timeStringToMinutes(updatedDay.endTime);
      const fromBreak = updatedDay.fromBreakTime ? timeStringToMinutes(updatedDay.fromBreakTime) : 0;
      const toBreak = updatedDay.toBreakTime ? timeStringToMinutes(updatedDay.toBreakTime) : 0;

      const isError = start >= end;
      const isBreakTimeError =
        (fromBreak && !toBreak) || // fromBreak exists but no toBreak
        (!fromBreak && toBreak) || // toBreak exists but no fromBreak
        (fromBreak &&
          toBreak && // both exist, check validity
          (fromBreak < start || toBreak > end || fromBreak > end || fromBreak > toBreak));

      let totalMinutes = end - start;

      if (fromBreak && toBreak && !isBreakTimeError) {
        const breakDuration = toBreak - fromBreak;
        totalMinutes -= breakDuration;
      }

      const totalHours = totalMinutes / 60;
      const roundedHours = Math.round(totalHours * 10) / 10;

      // Set form value
      methods?.setValue(`workingTimes.${dayKey}.${field}`, value);
      methods?.setValue(`workingTimes.${dayKey}.totalHours`, roundedHours);

      // Return new state with all calculations
      return {
        ...prev,
        [dayKey]: {
          ...updatedDay,
          isTimeError: isError,
          isBreakTimeError,
          totalHours: totalMinutes > 0 ? roundedHours : 0,
        },
      };
    });
  };

  const handleOvertimeChange = (value: string) => {
    const numValue = Number(value);
    if (!Number.isNaN(numValue)) {
      setOvertimeMinutes(numValue);
      methods?.setValue('overtimeForMinutes', numValue);
    }
  };

  // Add useEffect for each day
  // useEffect(() => {
  //   for (const day of weekdays) {
  //     calculateTotalHours(day.key);
  //   }
  // }, [times]);

  useEffect(() => {
    if (!isOpen) {
      setTimes(
        weekdays.reduce<Record<string, any>>((acc, day) => {
          acc[day.key] = {
            enabled: false,
            startTime: '',
            endTime: '',
            fromBreakTime: '',
            toBreakTime: '',
            totalHours: 0,
            isTimeError: false,
            isBreakTimeError: false,
          };
          return acc;
        }, {}),
      );
    }
  }, [isOpen]);

  const handleSwitchChange = (dayKey: string, checked: boolean) => {
    setTimes(prev => {
      const newState = {
        ...prev,
        [dayKey]: {
          ...prev[dayKey],
          enabled: checked,
          startTime: '',
          endTime: '',
          fromBreakTime: '',
          toBreakTime: '',
          totalHours: 0,
          isTimeError: false,
          isBreakTimeError: false,
        },
      };

      // Reset form values when switch is turned off
      if (!checked) {
        methods?.setValue(`workingTimes.${dayKey}.startTime`, '');
        methods?.setValue(`workingTimes.${dayKey}.endTime`, '');
        methods?.setValue(`workingTimes.${dayKey}.fromBreakTime`, '');
        methods?.setValue(`workingTimes.${dayKey}.toBreakTime`, '');
        methods?.setValue(`workingTimes.${dayKey}.totalHours`, 0);
      }

      return newState;
    });
  };

  const handleClose = () => {
    setTimes(
      weekdays.reduce<Record<string, any>>((acc, day) => {
        acc[day.key] = {
          enabled: false,
          startTime: '',
          endTime: '',
          fromBreakTime: '',
          toBreakTime: '',
          totalHours: 0,
          isTimeError: false,
          isBreakTimeError: false,
        };
        return acc;
      }, {}),
    );
    formRef.current?.reset(defaultFormValues);
    onClose();
  };

  const handleFormSubmit = (values: AddFormValues) => {
    onSubmit(values);
    formRef.current?.reset(defaultFormValues);
  };
  usePreventScroll(isOpen);

  // Generate time options from 00:00 to 23:30
  const workTimeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2)
      .toString()
      .padStart(2, '0');
    const minute = i % 2 === 0 ? '00' : '30';
    return {
      value: `${hour}:${minute}`,
      label: `${hour}:${minute}`,
    };
  });

  const restTimeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return {
      value: `${hour}:00`,
      label: `${hour}:00`,
    };
  });

  return (
    <div>
      <Modal
        open={isOpen}
        onCancel={handleClose}
        footer={null}
        closeIcon={null}
        width='100%'
        centered
        style={{
          margin: 0,
          padding: 0,
          maxWidth: '100vw',
          maxHeight: '100vh',
          overflow: 'hidden',
          borderRadius: 0,
        }}
        maskClosable={false}
        className='p-0'
        title={null}>
        <div className='inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='h-screen w-screen overflow-y-auto bg-white '>
            <div className='h-full overflow-y-auto'>
              <Form
                ref={formRef}
                onSubmit={handleFormSubmit}
                validator={validationSchema}
                defaultValues={defaultFormValues}>
                <div
                  onClick={e => {
                    e.stopPropagation();
                  }}
                  className=''>
                  <div className='flex justify-between'>
                    <h1 className='text-3xl font-bold'>Thêm mới ca làm việc</h1>

                    <div
                      className='flex items-center justify-end gap-4'
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <Button
                        className='bg-gray-400 text-white hover:bg-gray-500'
                        onClick={handleClose}>
                        Đóng
                      </Button>
                      <Button
                        htmlType='submit'
                        className='bg-[#4d7bc2] text-white hover:bg-[#3d69b0]'>
                        Thêm
                      </Button>
                    </div>
                  </div>

                  <hr className=' mt-3 w-full' />
                </div>
                <div>
                  <div className='px-6 '>
                    <div className='mb-4 grid grid-cols-3 gap-6'>
                      {/* Column 1 */}
                      <div className='space-y-4'>
                        <div>
                          <div className='pointer-events-none mb-1 flex items-center'>
                            <IconRoot
                              icon={IconVariable.required}
                              className='hover:cursor-none'
                            />
                            <label className='text-sm font-medium'>Mã ca</label>
                          </div>
                          <InputRoot
                            name='code'
                            placeholder='Nhập mã ca'
                            className='w-full rounded-md border px-3 py-2'
                          />
                        </div>
                      </div>

                      {/* Column 2 */}
                      <div className='space-y-4'>
                        <div>
                          <div className='pointer-events-none mb-1 flex items-center'>
                            <IconRoot
                              icon={IconVariable.required}
                              className='hover:cursor-none'
                            />
                            <label className='text-sm font-medium'>Tên ca</label>
                          </div>
                          <InputRoot
                            name='name'
                            placeholder='Nhập tên ca'
                            className='w-full rounded-md border px-3 py-2'
                          />
                        </div>
                      </div>

                      {/* Column 3 */}
                      <div className='space-y-4'>
                        <div>
                          <div className='pointer-events-none mb-1 flex items-center'>
                            <IconRoot
                              icon={IconVariable.required}
                              className='hover:cursor-none'
                            />
                            <label className='text-sm font-medium'>Loại ca</label>
                          </div>
                          <SelectRoot
                            name='shiftType'
                            firstValue={{ value: '', label: 'Chọn loại ca' }}
                            className='w-full rounded-md border px-3 py-3 focus:outline-none'
                            options={[
                              { value: 'FIXED', label: 'Cố định' },
                              { value: 'FLEXIBLE', label: 'Linh hoạt' },
                            ]}
                            errorString={methods?.formState?.errors?.shiftType?.toString() ?? ''}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='mb-4 px-6'>
                      <label className='mb-1 ml-2 block text-sm font-medium'>Phòng ban</label>
                      <Select
                        mode='tags'
                        size='large'
                        placeholder='Chọn phòng ban'
                        onChange={value => {
                          methods?.setValue('departmentCode', value);
                          methods?.trigger('departmentCode');
                        }}
                        style={{ width: '100%' }}
                        options={departments.map(dept => ({
                          value: dept.code,
                          label: `${dept.code}`,
                        }))}
                        status={methods?.formState?.errors?.departmentCode ? 'error' : undefined}
                        value={methods?.watch('departmentCode') || undefined}
                        tokenSeparators={[',']}
                        allowClear
                        maxTagCount='responsive'
                      />
                    </div>
                  </div>
                  <div className='px-6 py-4'>
                    <label className='mb-1 ml-2 block text-sm font-medium'>Ghi chú</label>
                    <InputRoot
                      name='note'
                      placeholder='Nhập ghi chú'
                      className='w-full rounded-md border px-3 py-2'
                    />
                  </div>
                </div>

                <hr className='mt-0 w-full' />

                <div className='mb-12 mt-6'>
                  <div className='grid grid-cols-5 gap-4 px-6'>
                    <div className='col-span-4 bg-[#e0ecf9]'>
                      {/* Takes up 4/5 = 80% */}
                      <div>
                        {weekdays.map(day => (
                          <div
                            key={day.key}
                            className='m-4 flex h-20 items-center bg-white px-5'>
                            <h3 className='flex items-center font-medium'>
                              <span className='w-16'>{day.label}</span>
                              <span className='ml-2'>
                                <Switch
                                  onChange={checked => {
                                    handleSwitchChange(day.key, checked);
                                  }}
                                  checked={times[day.key].enabled}
                                />
                              </span>
                            </h3>
                            <hr className='ml-4 h-[80%] border-l border-gray-300' />
                            <div className='ml-4'>
                              {times[day.key].enabled ? (
                                <div className='flex items-center gap-2'>
                                  <div>
                                    <label className='mb-1 block text-sm font-medium'>Giờ vào</label>
                                    <SelectRoot
                                      name={`workingTimes.${day.key}.startTime`}
                                      className={`w-44 rounded-md border px-3 py-3 ${
                                        times[day.key].isTimeError ? 'border-red-500' : ''
                                      }`}
                                      firstValue={{
                                        value: times[day.key].startTime || '',
                                        label: times[day.key].startTime || 'Chọn giờ',
                                      }}
                                      options={workTimeOptions}
                                      onChange={value => {
                                        handleTimeChange(day.key, 'startTime', value);
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <label className='mb-1 block text-sm font-medium'>Giờ ra</label>
                                    <SelectRoot
                                      name={`workingTimes.${day.key}.endTime`}
                                      className={`w-44 rounded-md border px-3 py-3 ${
                                        times[day.key].isTimeError ? 'border-red-500' : ''
                                      }`}
                                      firstValue={{
                                        value: times[day.key].endTime || '',
                                        label: times[day.key].endTime || 'Chọn giờ',
                                      }}
                                      options={workTimeOptions}
                                      onChange={value => {
                                        handleTimeChange(day.key, 'endTime', value);
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <label className='mb-1 block text-sm font-medium'>Giờ nghỉ</label>
                                    <div className='flex items-center gap-2'>
                                      <SelectRoot
                                        name={`workingTimes.${day.key}.fromBreakTime`}
                                        className={`w-44 rounded-md border px-3 py-3 ${
                                          times[day.key].isBreakTimeError ? 'border-red-500' : ''
                                        }`}
                                        firstValue={{
                                          value: times[day.key].fromBreakTime || '',
                                          label: times[day.key].fromBreakTime || 'Chọn giờ',
                                        }}
                                        options={restTimeOptions}
                                        onChange={value => {
                                          handleTimeChange(day.key, 'fromBreakTime', value);
                                        }}
                                      />
                                      <span> - </span>
                                      <SelectRoot
                                        name={`workingTimes.${day.key}.toBreakTime`}
                                        className={`w-44 rounded-md border px-3 py-3 ${
                                          times[day.key].isBreakTimeError ? 'border-red-500' : ''
                                        }`}
                                        firstValue={{
                                          value: times[day.key].toBreakTime || '',
                                          label: times[day.key].toBreakTime || 'Chọn giờ',
                                        }}
                                        options={restTimeOptions}
                                        onChange={value => {
                                          handleTimeChange(day.key, 'toBreakTime', value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label className='mb-1 block text-sm font-medium'>Giờ công</label>
                                    <InputRoot
                                      name={`workingTimes.${day.key}.totalHours`}
                                      className='w-44 rounded border px-3 py-2'
                                      placeholder='Giờ công'
                                      value={times[day.key].totalHours.toFixed(1)}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <span className='text-sm text-gray-500'>Không có giờ làm việc</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='col-span-1'>
                      {/* Takes up 1/5 = 20% */}
                      <div>
                        <h3 className='flex items-center font-medium'>
                          <span className='ml-2'>
                            <Switch
                              checked={isOvertimeEnabled}
                              onChange={checked => {
                                setIsOvertimeEnabled(checked);
                              }}
                            />
                            <span className='ml-4'>Tăng ca cuối giờ</span>
                            <span>
                              <QuestionCircleOutlined
                                className='ml-4'
                                title='Thời gian làm việc sau ca sẽ được tính tăng ca.'
                              />
                            </span>
                          </span>
                        </h3>
                        {isOvertimeEnabled && (
                          <div className='flex items-center gap-1'>
                            <span className='w-22 text-lg'>Nếu làm hơn</span>

                            <span>
                              <InputRoot
                                name='overtimeMinutes'
                                className='mx-3 w-11 px-2 py-1'
                                defaultValue={30}
                                value={overtimeMinutes}
                                onChange={e => {
                                  handleOvertimeChange(e.target.value);
                                }}
                              />
                            </span>

                            <span className='text-lg'> phút</span>
                            <span>
                              <QuestionCircleOutlined
                                className='ml-3'
                                title={`Thời gian làm việc sau ${overtimeMinutes} phút sẽ được tính tăng ca.`}
                              />
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddForm;
