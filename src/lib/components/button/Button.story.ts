import { createRawSnippet } from 'svelte';
import Button from './button.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const defaultChildren = createRawSnippet(() => {
  return {
    render: () => `
			<span>Click Me</span>
		`,
  };
});

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    children: defaultChildren,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};
