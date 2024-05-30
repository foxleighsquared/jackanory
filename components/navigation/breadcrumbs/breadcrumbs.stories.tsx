import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

// Import component files
import { Breadcrumbs } from 'components';

const breadcrumbs = [
  {
    label: 'Home',
    href: '#'
  },
  {
    label: 'Recipes',
    href: '#'
  }
];

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
  tags: ['autodocs'],
  args: {
    breadcrumbs
  },
  parameters: {
    previewLayout: 'vertical',
    controls: { hideNoControlsWarning: true }
  }
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {};

export const WithCurrentPage: Story = {
  args: {
    breadcrumbs: [
      ...breadcrumbs,
      {
        label: 'Current Page',
        href: '#',
        current: true
      }
    ]
  }
};

export const WithPlayFunction: Story = {
  args: {
    breadcrumbs: [
      ...breadcrumbs,
      {
        label: 'Current Page',
        href: '#',
        current: true
      }
    ]
  },
  play: async ({ canvasElement }) => {
    const breadcrumbs = within(canvasElement).getByTestId('breadcrumb-list');
    // Expect 3 breadcrumbs (plus 2 separators)
    expect(breadcrumbs.children.length).toBe(5);
    // Expect the anchor tag in the 3rd breadcrumb to have an aria-current attribute
    expect(breadcrumbs.children[4].children[0]).toHaveAttribute(
      'aria-current',
      'page'
    );
  }
};
