import type { Meta, StoryObj } from '@storybook/react';

import Link from '.';

const meta: Meta<typeof Link> = {
  title: 'core/atoms/Link',
  component: Link,
  argTypes: {
    href: {
      control: { type: 'text' },
      defaultValue: 'https://example.com',
      description: 'The destination URL for the link.',
    },
    children: {
      control: { type: 'text' },
      defaultValue: 'Click here',
      description: 'The content inside the link.',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
      description: 'The size of the link text.',
    },
    weight: {
      control: { type: 'select' },
      options: ['light', 'normal', 'bold'],
      defaultValue: 'normal',
      description: 'The font weight of the link.',
    },
    color: {
      control: { type: 'color' },
      defaultValue: '#007bff',
      description: 'The color of the link text.',
    },
    target: {
      control: { type: 'select' },
      options: ['_blank', '_self', '_parent', '_top'],
      defaultValue: '_self',
      description: 'The target behavior of the link.',
    },
    rel: {
      control: { type: 'text' },
      defaultValue: 'noopener noreferrer',
      description: 'Security and SEO attributes for the link.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Default: Story = {
  args: {
    href: 'https://example.com',
    children: 'Default Link',
    size: 'medium',
    weight: 'normal',
    color: '#007bff',
    target: '_self',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Small: Story = {
  args: {
    href: 'https://example.com',
    children: 'Small Link',
    size: 'small',
    weight: 'normal',
    color: '#007bff',
    target: '_self',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BoldLarge: Story = {
  args: {
    href: 'https://example.com',
    children: 'Bold Large Link',
    size: 'large',
    weight: 'bold',
    color: '#d9534f',
    target: '_blank',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CustomColor: Story = {
  args: {
    href: 'https://example.com',
    children: 'Custom Color Link',
    size: 'medium',
    weight: 'normal',
    color: '#28a745', // Green
    target: '_self',
  },
};
