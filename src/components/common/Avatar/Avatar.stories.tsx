import Avatar from '@/components/common/Avatar/Avatar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],

  argTypes: {
    username: { control: 'text' },
    size: { control: 'number' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    username: '김철수',
    size: 40,
  },
};
