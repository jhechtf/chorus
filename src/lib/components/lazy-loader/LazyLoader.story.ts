import { createRawSnippet, Snippet } from 'svelte';
import LazyLoad from './lazy-loader.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

const defaultChildren = createRawSnippet(() => {
  return {
    render: () => `
			<p>I show up when the promise is resolved</p>
		`,
  };
});

const defaultLoading = createRawSnippet(() => {
  return {
    render: () => `
			<h1>Loading...</h1>
		`,
  };
});

const error = createRawSnippet((e, a) => {
  return {
    render: () => `
			<h1>Error value: ${a()}</h1>
		`,
  };
});

function waitFor(ms: number, shouldFail = false) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldFail) rej('FAILED');
      else res(ms);
    }, ms);
  });
}

const meta: Meta<typeof LazyLoad> = {
  title: 'Example/LazyLoader',
  component: LazyLoad,
  args: {
    waitFor: waitFor(2000),
    children: defaultChildren,
    fallback: defaultLoading,
  },
};

export default meta;

type Story = StoryObj<typeof LazyLoad>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    waitFor: waitFor(2000, true),
    children: defaultChildren,
    fallback: defaultLoading,
    error,
  },
};

const childrenUsingValues = createRawSnippet((value) => {
  return {
    render: () => `
			<p>The value passed is ${value()}</p>
		`,
  };
});

export const Values: Story = {
  args: {
    waitFor: waitFor(1000),
    children: childrenUsingValues,
    fallback: defaultLoading,
  },
};

const complicatedChildrenUsingValues: Snippet<[{ id: number; name: string }]> =
  createRawSnippet((value) => {
    return {
      render: () => `
			<p>ID: ${value().id}<br/> name: ${value().name}</p>
		`,
    };
  });

export const Complicated: Story = {
  args: {
    waitFor: new Promise((res) =>
      setTimeout(() => res({ id: 1, name: 'Test' }), 2000),
    ),
    children: complicatedChildrenUsingValues,
    fallback: defaultLoading,
  },
};
