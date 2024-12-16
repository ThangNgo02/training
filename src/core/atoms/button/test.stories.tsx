import type { Meta, StoryObj } from '@storybook/react';

import Button from '.';

// Update: Use `const` for the default export and explicitly type it as `Meta`.
const meta: Meta = {
  title: 'core/atoms/button',
  component: Button,
  argTypes: {
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
      defaultValue: 'medium',
    },
    variant: {
      control: { type: 'select', options: ['primary', 'secondary', 'outline'] },
      defaultValue: 'primary',
    },
    align: {
      control: { type: 'select', options: ['left', 'center', 'right'] },
      defaultValue: 'center',
    },
    color: {
      control: { type: 'color' },
      defaultValue: 'white',
    },
    backgroundColor: {
      control: { type: 'color' },
      defaultValue: '#B88E2F',
    },
  },
};

export default meta;

// Define the story using `StoryObj` for better typing.
type Story = StoryObj<typeof meta>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    size: 'medium',
    variant: 'primary',
    align: 'center',
    backgroundColor: '#B88E2F',
    color: 'white',
  },
  render: ({ children, size, variant, align, color, backgroundColor }) => (
    <Button
      size={size}
      variant={variant}
      align={align}
      color={color}
      backgroundColor={backgroundColor}>
      {children}
    </Button>
  ),
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    size: 'medium',
    variant: 'secondary',
    align: 'center',
    color: 'black',
    backgroundColor: '#f0f0f0',
  },
  render: ({ children, size, variant, align, color, backgroundColor }) => (
    <Button
      size={size}
      variant={variant}
      align={align}
      color={color}
      backgroundColor={backgroundColor}>
      {children}
    </Button>
  ),
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'small',
    variant: 'primary',
    align: 'center',
    color: 'white',
    backgroundColor: '#B88E2F',
  },
  render: ({ children, size, variant, align, color, backgroundColor }) => (
    <Button
      size={size}
      variant={variant}
      align={align}
      color={color}
      backgroundColor={backgroundColor}>
      {children}
    </Button>
  ),
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'large',
    variant: 'primary',
    align: 'center',
    color: 'white',
    backgroundColor: '#B88E2F',
  },
  render: ({ children, size, variant, align, color, backgroundColor }) => (
    <Button
      size={size}
      variant={variant}
      align={align}
      color={color}
      backgroundColor={backgroundColor}>
      {children}
    </Button>
  ),
};
