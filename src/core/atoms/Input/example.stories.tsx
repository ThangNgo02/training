import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Input from '.';

// Define meta configuration for the Input component
const meta: Meta<typeof Input> = {
  title: 'core/atoms/Input',
  component: Input,
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      defaultValue: 'Enter text...',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline'],
      defaultValue: 'primary',
    },
    color: {
      control: { type: 'color' },
      defaultValue: '#000000',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      defaultValue: 'left',
    },
    border: {
      control: { type: 'text' },
      defaultValue: '1px solid #ccc',
    },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Primary: Story = {
  args: {
    placeholder: 'Enter text...',
    size: 'medium',
    variant: 'primary',
    color: '#D4A056',
    align: 'left',
    border: '1px solid #D4A056',
  },
  render: args => <Input {...args} />,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Secondary: Story = {
  args: {
    placeholder: 'Enter secondary text...',
    size: 'medium',
    variant: 'secondary',
    color: '#333',
    align: 'center',
    border: '1px solid #ccc',
  },
  render: args => <Input {...args} />,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Outline: Story = {
  args: {
    placeholder: 'Enter outline text...',
    size: 'large',
    variant: 'outline',
    color: '#D4A056',
    align: 'right',
    border: '1px dashed #D4A056',
  },
  render: args => <Input {...args} />,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Custom: Story = {
  args: {
    placeholder: 'Custom Input...',
    size: 'small',
    variant: 'primary',
    color: '#4A90E2',
    align: 'center',
    border: '2px solid #4A90E2',
  },
  render: args => <Input {...args} />,
};
