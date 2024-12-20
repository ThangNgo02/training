import type { Meta, StoryObj } from '@storybook/react';

import Image from '.';

const meta: Meta<typeof Image> = {
  title: 'core/atoms/Image',
  component: Image,
  argTypes: {
    src: {
      control: { type: 'text' },
      defaultValue: '/logo1.png',
    },
    alt: {
      control: { type: 'text' },
      description: 'The alternative text for the image.',
      defaultValue: 'Sample Image',
    },
    width: {
      control: { type: 'text' },
      description: 'The width of the image.',
      defaultValue: '300px',
    },
    height: {
      control: { type: 'text' },
      description: 'The height of the image.',
      defaultValue: '200px',
    },
    objectFit: {
      control: { type: 'select' },
      options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      description: 'CSS `object-fit` property to control how the image fits.',
      defaultValue: 'cover',
    },
    className: {
      control: { type: 'text' },
      description: 'Custom class names for the image.',
      defaultValue: '',
    },
    style: {
      control: { type: 'object' },
      description: 'Custom inline styles for the image.',
      defaultValue: {},
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Default: Story = {
  args: {
    src: '/logo1.png', // Example image from public folder
    alt: 'Default Sample Image',
    width: '300px',
    height: '200px',
    objectFit: 'cover',
  },
  render: args => <Image {...args} />,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ContainFit: Story = {
  args: {
    src: '/logo1.png',
    alt: 'Contain Fit Image',
    width: '300px',
    height: '200px',
    objectFit: 'contain',
  },
  render: args => <Image {...args} />,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LargeImage: Story = {
  args: {
    src: '/logo1.png',
    alt: 'Large Sample Image',
    width: '500px',
    height: '400px',
    objectFit: 'cover',
  },
  render: args => <Image {...args} />,
};
