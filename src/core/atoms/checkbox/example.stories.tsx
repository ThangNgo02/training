import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '.';

const meta: Meta<typeof Checkbox> = {
  title: 'core/atoms/checkbox',
  component: Checkbox,
  argTypes: {
    label: {
      control: { type: 'text' },
      defaultValue: 'Example Checkbox',
    },
    checked: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    border: {
      control: { type: 'text' },
      defaultValue: '2px solid #d4a056',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
    color: {
      control: { type: 'color' },
      defaultValue: '#d4a056',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    className: {
      control: { type: 'text' },
    },
    style: {
      control: { type: 'object' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Default: Story = {
  args: {
    label: 'Default Checkbox',
    checked: false,
    size: 'medium',
    border: '2px solid #d4a056',
    color: '#d4a056',
    disabled: false,
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    checked: true,
    size: 'medium',
    border: '2px solid #d4a056',
    color: '#d4a056',
    disabled: false,
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Small: Story = {
  args: {
    label: 'Small Checkbox',
    checked: false,
    size: 'small',
    border: '1.5px solid #d4a056',
    color: '#d4a056',
    disabled: false,
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Large: Story = {
  args: {
    label: 'Large Checkbox',
    checked: false,
    size: 'large',
    border: '3px solid #d4a056',
    color: '#d4a056',
    disabled: false,
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    checked: false,
    size: 'medium',
    border: '2px solid #cccccc',
    color: '#cccccc',
    disabled: true,
  },
};
