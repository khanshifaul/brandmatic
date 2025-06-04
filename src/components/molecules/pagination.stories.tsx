import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta = {
  title: 'Components/Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'The current active page number.',
    },
    totalPages: {
      control: 'number',
      description: 'The total number of pages.',
    },
    onPageChange: {
      action: 'pageChanged',
      description: 'Callback function when the page changes.',
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed:', page),
  },
};

export const WithFewPages: Story = {
  args: {
    currentPage: 1,
    totalPages: 3,
    onPageChange: (page) => console.log('Page changed:', page),
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed:', page),
  },
};
