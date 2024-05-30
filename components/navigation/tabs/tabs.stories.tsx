import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

// Import component files
import { Tabs } from 'components';

const tabs = [
  {
    contentId: 'all-recipes',
    label: 'All recipes'
  },
  {
    contentId: 'favourites',
    label: 'Favourites'
  }
];

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ['autodocs'],
  args: {
    tabs
  },
  parameters: {
    previewLayout: 'vertical',
    controls: { hideNoControlsWarning: true }
  }
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {};

export const ExternallyControlledTabs: Story = {
  args: {
    selectedTab: 1
  }
};

export const WithPlayFunction: Story = {
  args: {
    tabs: [
      ...tabs,
      {
        label: 'Current Tab',
        contentId: 'current-tab'
      }
    ],
    selectedTab: 1,
    handleChange: action('handleChange')
  },
  play: async ({ args, canvasElement, step }) => {
    const tabList = within(canvasElement).getByRole('tablist');
    await step('The tabs are rendered', async () => {
      // Expect 3 tabs
      expect(tabList.children.length).toBe(3);
      // Expect the 2nd tab to be selected by default
      expect(tabList.children[1]).toHaveAttribute('aria-selected', 'true');
    });
    await step(
      'Clicking on the 1st tab selects it, deselects the others and calls "handleChange"',
      async () => {
        // Click on the 1st tab
        await userEvent.click(tabList.children[0]);
        // Expect first tab to be selected
        expect(tabList.children[0]).toHaveAttribute('aria-selected', 'true');
        // Expect the 2nd tab to be unselected
        expect(tabList.children[1]).toHaveAttribute('aria-selected', 'false');
        // Expect the 3rd tab to be unselected
        expect(tabList.children[2]).toHaveAttribute('aria-selected', 'false');
        // Expect the handleChange action to have been called
        expect(args.handleChange).toHaveBeenCalled();
      }
    );
  }
};
