import type { Meta, StoryObj } from '@storybook/react';

import Button from '.';

// Update: Use `const` for the default export and explicitly type it as `Meta`.
const meta: Meta<typeof Button> = {
  title: 'core/atoms/button',
  component: Button,
  argTypes: {
    size: {
      control: { type: 'select' }, // Control type here
      options: ['small', 'medium', 'large'], // Options separate
      defaultValue: 'medium',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      defaultValue: 'primary',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
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
    border: {
      control: { type: 'text' },
      defaultValue: '2px solid #333',
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
    border: '2px solid #333',
    color: 'white',
  },
  render: ({ children, size, variant, align, color, backgroundColor, border }) => (
    <Button
      size={size}
      variant={variant}
      align={align}
      color={color}
      backgroundColor={backgroundColor}
      border={border}>
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
    border: '2px solid #333',
  },
  render: ({ children, size, variant, align, color, backgroundColor, border }) => (
    <Button
      size={size}
      variant={variant}
      align={align}
      color={color}
      backgroundColor={backgroundColor}
      border={border}>
      {children}
    </Button>
  ),
};
