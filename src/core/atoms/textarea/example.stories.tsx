import type { Meta, StoryObj } from '@storybook/react';

import TextArea from '.';

const meta: Meta<typeof TextArea> = {
  title: 'core/atoms/textarea',
  component: TextArea,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    placeholder: {
      control: { type: 'text' },
      defaultValue: 'Enter text...',
    },
    borderColor: {
      control: { type: 'color' },
      defaultValue: '#d4a056',
    },
    color: {
      control: { type: 'color' },
      defaultValue: '#333333',
    },
    children: {
      control: { type: 'text' },
      defaultValue: '',
    },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Default: Story = {
  args: {
    size: 'medium',
    disabled: false,
    placeholder: 'Enter text...',
    borderColor: '#d4a056',
    color: '#333333',
    children: '',
  },
  render: ({ size, disabled, placeholder, borderColor, color, children }) => (
    <TextArea
      size={size}
      disabled={disabled}
      placeholder={placeholder}
      borderColor={borderColor}
      color={color}>
      {children}
    </TextArea>
  ),
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CustomColors: Story = {
  args: {
    size: 'medium',
    placeholder: 'Custom border and text color...',
    borderColor: '#4CAF50', // Green border
    color: '#FF5722', // Orange text
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Disabled: Story = {
  args: {
    size: 'medium',
    disabled: true,
    placeholder: 'Disabled field...',
    borderColor: '#e0e0e0',
    color: '#a0a0a0',
  },
};
