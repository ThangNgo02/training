import type { Meta, StoryObj } from '@storybook/react';

import NavBar from '.'; // Adjust the import path to your NavBar component

const meta: Meta<typeof NavBar> = {
  title: 'core/molecules/NavigationBar',
  component: NavBar,
  argTypes: {
    links: {
      control: { type: 'text' },
      defaultValue: [
        { href: 'https://example.com', label: 'Home' },
        { href: 'https://example.com/about', label: 'About' },
        { href: 'https://example.com/contact', label: 'Contact' },
      ],
      description: 'Array of link objects containing href and label.',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
      description: 'The size of the links in the navigation bar.',
    },
    weight: {
      control: { type: 'select' },
      options: ['light', 'normal', 'bold'],
      defaultValue: 'normal',
      description: 'Font weight for the links.',
    },
    linkColor: {
      control: { type: 'color' },
      defaultValue: '#d4a056', // Default link color set to #d4a056
      description: 'Color of the link text.',
    },
    className: {
      control: { type: 'text' },
      description: 'Custom class names for the navigation bar.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Default: Story = {
  args: {
    links: [
      { href: 'https://example.com', label: 'Home' },
      { href: 'https://example.com/shop', label: 'Shop' },
      { href: 'https://example.com/about', label: 'About' },
      { href: 'https://example.com/contact', label: 'Contact' },
    ],
    size: 'medium',
    weight: 'normal',
    linkColor: '#333',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Small: Story = {
  args: {
    links: [
      { href: 'https://example.com', label: 'Home' },
      { href: 'https://example.com/shop', label: 'Shop' },
      { href: 'https://example.com/about', label: 'About' },
      { href: 'https://example.com/contact', label: 'Contact' },
    ],
    size: 'small',
    weight: 'normal',
    linkColor: '#333',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BoldLarge: Story = {
  args: {
    links: [
      { href: 'https://example.com', label: 'Home' },
      { href: 'https://example.com/shop', label: 'Shop' },
      { href: 'https://example.com/about', label: 'About' },
      { href: 'https://example.com/contact', label: 'Contact' },
    ],
    size: 'large',
    weight: 'bold',
    linkColor: '#333',
  },
};
