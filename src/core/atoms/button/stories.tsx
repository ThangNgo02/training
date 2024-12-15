import type { Meta, StoryObj } from '@storybook/react';

import Button from '.';

// Use `const` for the meta export and explicitly type it as `Meta`.
const meta: Meta = {
  title: 'Components/atoms/Button',
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
      defaultValue: 'left',
    },
    color: { control: 'color' },
  },
};

export default meta;

// Define the story using `StoryObj` for better typing.
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    size: 'medium',
    variant: 'primary',
  },
  render: ({ children, size, variant, align, color }) => (
    <Button
      size={size}
      variant={variant}
      align={align}
      style={{ color }}>
      {children}
    </Button>
  ),
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    size: 'medium',
    variant: 'secondary',
  },
  render: ({ children, size, variant, align, color }) => (
    <Button
      size={size}
      variant={variant}
      align={align}
      style={{ color }}>
      {children}
    </Button>
  ),
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    size: 'medium',
    variant: 'outline',
  },
  render: ({ children, size, variant, align, color }) => (
    <Button
      size={size}
      variant={variant}
      align={align}
      style={{ color }}>
      {children}
    </Button>
  ),
};

export const CustomColor: Story = {
  args: {
    children: 'Custom Color Button',
    size: 'medium',
    variant: 'primary',
    color: '#ff5733',
  },
  render: ({ children, size, variant, align, color }) => (
    <Button
      size={size}
      variant={variant}
      align={align}
      style={{ color }}>
      {children}
    </Button>
  ),
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'small',
    variant: 'primary',
  },
  render: ({ children, size, variant, align, color }) => (
    <Button
      size={size}
      variant={variant}
      align={align}
      style={{ color }}>
      {children}
    </Button>
  ),
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'large',
    variant: 'primary',
  },
  render: ({ children, size, variant, align, color }) => (
    <Button
      size={size}
      variant={variant}
      align={align}
      style={{ color }}>
      {children}
    </Button>
  ),
};

export const CenterAligned: Story = {
  args: {
    children: 'Center Aligned',
    size: 'medium',
    align: 'center',
  },
  render: ({ children, size, variant, align, color }) => (
    <Button
      size={size}
      variant={variant}
      align={align}
      style={{ color }}>
      {children}
    </Button>
  ),
};

export const LeftAligned: Story = {
  args: {
    children: 'Left Aligned',
    size: 'medium',
    align: 'left',
  },
  render: ({ children, size, variant, align, color }) => (
    <Button
      size={size}
      variant={variant}
      align={align}
      style={{ color }}>
      {children}
    </Button>
  ),
};

export const RightAligned: Story = {
  args: {
    children: 'Right Aligned',
    size: 'medium',
    align: 'right',
  },
  render: ({ children, size, variant, align, color }) => (
    <Button
      size={size}
      variant={variant}
      align={align}
      style={{ color }}>
      {children}
    </Button>
  ),
};
