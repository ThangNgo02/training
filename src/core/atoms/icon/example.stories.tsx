import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Icon from '.';

const meta: Meta<typeof Icon> = {
  title: 'core/atoms/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: { type: 'text' },
      defaultValue: 'star',
    },
    url: {
      control: { type: 'text' },
      defaultValue: '',
    },
    size: {
      control: { type: 'text' },
      defaultValue: '2rem',
    },
    color: {
      control: { type: 'color' },
      defaultValue: '#000000',
    },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DefaultIcon: Story = {
  args: {
    name: 'reload',
    size: '2rem',
    color: '#D4A056',
    url: '/icons8-reload.svg',
  },
  render: args => <Icon {...args} />,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LargeIcon: Story = {
  args: {
    url: '/icons8-reload.svg',
    size: '4rem',
  },
  render: args => <Icon {...args} />,
};
