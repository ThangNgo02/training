/* eslint-disable @typescript-eslint/no-misused-promises */
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { object, type ObjectShape } from 'yup';

export interface IFormRootProps {
  children: React.ReactNode;
  onSubmit?: (data: any) => void;
  validator?: ObjectShape;
  defaultValues?: DefaultValues<any>;
  className?: string;
}

function FormRoot({ children, onSubmit, validator, defaultValues, className }: IFormRootProps) {
  const methods = useForm({
    resolver: yupResolver(object().shape(validator ?? {})),
    defaultValues,
  });
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(methods.getValues() ?? {});
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>{children}</form>
    </FormProvider>
  );
}

export default FormRoot;
