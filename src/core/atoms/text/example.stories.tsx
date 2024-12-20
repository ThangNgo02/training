import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Text from '.';

const meta: Meta<typeof Text> = {
  title: 'core/atoms/Text',
  component: Text,
  argTypes: {
    children: {
      control: { type: 'text' },
      defaultValue: 'Sample text',
      description: 'Content of the text',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
      description: 'Font size of the text',
    },
    weight: {
      control: { type: 'select' },
      options: ['light', 'normal', 'bold'],
      defaultValue: 'normal',
      description: 'Font weight of the text',
    },
    color: {
      control: { type: 'color' },
      defaultValue: '#333',
      description: 'Text color',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      defaultValue: 'left',
      description: 'Text alignment',
    },
    as: {
      control: { type: 'select' },
      options: ['p', 'span', 'div', 'strong', 'em'],
      defaultValue: 'p',
      description: 'HTML element type',
    },
    // Exclude `className` and `style` from Storybook controls
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Primary: Story = {
  args: {
    children: 'This is a sample text.',
    size: 'medium',
    weight: 'normal',
    color: '#333',
    align: 'left',
    as: 'p',
  },
  render: args => <Text {...args} />,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SmallBold: Story = {
  args: {
    children: 'Small bold text.',
    size: 'small',
    weight: 'bold',
    color: '#555',
    align: 'center',
    as: 'span',
  },
  render: args => <Text {...args} />,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LargeLight: Story = {
  args: {
    children: 'Large light text.',
    size: 'large',
    weight: 'light',
    color: '#999',
    align: 'right',
    as: 'div',
  },
  render: args => <Text {...args} />,
};
