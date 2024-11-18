import type { Meta, StoryObj } from '@storybook/react';

import Button from '.';

// Update: Use `const` for the default export and explicitly type it as `Meta`.
const meta: Meta = {
  title: 'Components/atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['primary'],
      },
      defaultValue: 'primary',
    },
    sizes: {
      control: {
        type: 'select',
        options: ['h60'],
      },
      defaultValue: 'h60',
    },
    textButton: {
      control: {
        type: 'text',
      },
      defaultValue: 'ĐĂNG KÝ NGAY',
    },
    loading: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    handleClick: { action: 'clicked' },
  },
};

export default meta;

// Define the story using `StoryObj` for better typing.
type Story = StoryObj<typeof meta>;
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Normal: Story = {
  args: {
    textButton: 'ĐĂNG KÝ NGAY',
    sizes: 'h60',
    variant: 'primary',
    loading: false,
    disabled: false,
  },
  render: ({ textButton, sizes, variant, loading, disabled, handleClick }) => (
    <Button
      modifiers={[variant, sizes]}
      isLoading={loading}
      disabled={disabled}
      onClick={handleClick}>
      {textButton}
    </Button>
  ),
};
