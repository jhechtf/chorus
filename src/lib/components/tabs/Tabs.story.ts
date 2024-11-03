import { Tabs, Tab } from './index';
import type { Meta, StoryObj } from '@storybook/svelte';

const meta: Meta<typeof Tabs> = {
  title: 'Example/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  subcomponents: {
    Tab,
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

const Default: Story = {};
