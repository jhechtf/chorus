import { createRawSnippet } from 'svelte';
import Modal from './modal.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const defaultChildren = createRawSnippet(() => {
  return {
    render: () => `
			<p>Hello there! Hit Escape to close this modal.</p>
		`,
  };
});

const defaultHeader = createRawSnippet(() => {
  return {
    render: () => `
			<h1>Default Header</h1>
		`,
  };
});

const meta: Meta<typeof Modal> = {
  title: 'Example/Modal',
  component: Modal,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    open: true,
    children: defaultChildren,
    header: defaultHeader,
  },
  argTypes: {
    open: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {};

export const Custom: Story = {
  args: {
    backgroundClass: 'backdrop:bg-blue-900/80',
    class: 'bg-orange-800',
  },
};
