import type { Meta, StoryObj } from '@storybook/react';
import CommentForm from './CommentForm';

const meta: Meta<typeof CommentForm> = {
  title: 'Components/CommentForm',
  component: CommentForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommentForm>;

export const Default: Story = {};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
