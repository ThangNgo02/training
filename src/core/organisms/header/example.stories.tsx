import { SmileOutlined } from '@ant-design/icons'; // Import an Ant Design icon
import type { Meta, StoryObj } from '@storybook/react';

import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';

import Header from '.';

const meta: Meta<typeof Header> = {
  title: 'core/organisms/Header',
  component: Header,
  argTypes: {
    navLinks: {
      control: 'object',
      defaultValue: [
        { href: '/', label: 'Home' },
        { href: '/shop', label: 'Shop' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
      ],
      description: 'Array of navigation links for the header.',
    },
    logoIcon: {
      control: 'text',
      defaultValue: 'https://via.placeholder.com/50',
      description: 'The logo element, can be an Ant Design icon or an image URL.',
    },
    title: {
      control: 'text',
      defaultValue: 'Furniro',
      description: 'The title displayed in the header.',
    },
    linkColor: {
      control: 'color',
      defaultValue: '#d4a056',
      description: 'The color of the navigation links.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

// Default Header with Image as Logo
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Default: Story = {
  args: {
    navLinks: [
      { href: '/', label: 'Home' },
      { href: '/shop', label: 'Shop' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
    logoIcon: 'https://via.placeholder.com/50', // Use an image URL
    title: 'Furniro',
    linkColor: '#333',
  },
};

// Header with Ant Design Icon as Logo
// eslint-disable-next-line @typescript-eslint/naming-convention
export const WithAntDesignIcon: Story = {
  args: {
    navLinks: [
      { href: '/', label: 'Home' },
      { href: '/shop', label: 'Shop' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
    logoIcon: <SmileOutlined style={{ fontSize: '2rem', color: '#d4a056' }} />, // Use Ant Design icon here
    title: 'Furniro',
    linkColor: '#333',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const WithCustomIcon: Story = {
  args: {
    navLinks: [
      { href: '/', label: 'Home' },
      { href: '/shop', label: 'Shop' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
    logoIcon: (
      <IconRoot
        icon={IconVariable.companyIcon}
        className='header__logo-icon'
      />
    ),
    title: 'Furniro',
    linkColor: '#333',
  },
};
