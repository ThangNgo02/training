import type { Meta, StoryObj } from '@storybook/react';

import Heading from '.';

// Define meta configuration for the Heading component
const meta: Meta<typeof Heading> = {
  title: 'core/atoms/heading',
  component: Heading,
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      defaultValue: 1,
    },
    color: {
      control: { type: 'color' },
      defaultValue: '#000000', // Default color is black
    },
    className: {
      control: { type: 'text' },
      defaultValue: '',
    },
    children: {
      control: { type: 'text' },
      defaultValue: 'Default Heading',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Primary: Story = {
  args: {
    level: 1,
    color: '#B88E2F',
    children: 'Primary Heading',
  },
  render: ({ level, color, children, className }) => (
    <Heading
      level={level}
      color={color}
      className={className}>
      {children}
    </Heading>
  ),
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Secondary: Story = {
  args: {
    level: 2,
    color: '#4A90E2',
    children: 'Secondary Heading',
  },
  render: ({ level, color, children, className }) => (
    <Heading
      level={level}
      color={color}
      className={className}>
      {children}
    </Heading>
  ),
};
