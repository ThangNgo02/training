import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '.';

const meta: Meta<typeof Checkbox> = {
  title: 'Core/Atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    label: { control: 'text', defaultValue: 'Example Checkbox' },
    size: { control: 'select', options: ['small', 'medium', 'large'], defaultValue: 'medium' },
    disabled: { control: 'boolean', defaultValue: false },
    color: { control: 'color', defaultValue: '#d4a056' }, // Color picker for dynamic color
    onChange: { action: 'state changed' },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Default: Story = {
  args: {
    label: 'Default Checkbox',
    size: 'medium',
    disabled: false,
    color: '#d4a056',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Small: Story = {
  args: {
    label: 'Small Checkbox',
    size: 'small',
    disabled: false,
    color: '#ff6347', // Tomato color
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Large: Story = {
  args: {
    label: 'Large Checkbox',
    size: 'large',
    disabled: false,
    color: '#4682b4', // Steel blue color
  },
};
